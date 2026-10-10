import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/src/lib/supabaseServer";
import { sendEnquiryNotificationEmail } from "@/src/lib/email";

// In-memory rate limiter per IP (window: 10 minutes, max: 5 submissions)
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory duplicate submission cache (window: 60 seconds)
interface DuplicateCacheEntry {
  id?: string;
  timestamp: number;
}
const recentSubmissions = new Map<string, DuplicateCacheEntry>();
const DUPLICATE_WINDOW_MS = 60 * 1000;

function cleanDuplicateCache(now: number) {
  for (const [key, entry] of recentSubmissions.entries()) {
    if (now - entry.timestamp > DUPLICATE_WINDOW_MS) {
      recentSubmissions.delete(key);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequestHistory.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);
  return false;
}

// Zod schema accepting both contact form and external payload field conventions
const contactSchema = z.object({
  // Name (accepts name or fullName)
  name: z.string().trim().max(100).optional(),
  fullName: z.string().trim().max(100).optional(),

  // Email is required
  email: z
    .string()
    .trim()
    .min(1, "Email Address is required")
    .email("Please provide a valid email address")
    .max(150, "Email address exceeds maximum length"),

  // Phone (optional or required depending on UI)
  phone: z.string().trim().max(30).optional().default(""),

  // Company / Organization
  company: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(120).optional(),

  // Service / Inquiry type
  service: z.string().trim().max(100).optional(),
  serviceInterested: z.string().trim().max(100).optional(),
  inquiryType: z.string().trim().max(100).optional(),

  // Message
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(5, "Message must be at least 5 characters")
    .max(3000, "Message exceeds maximum length"),

  preferredContactMethod: z.string().trim().max(50).optional(),

  // Honeypot field - bots will fill this, humans will not
  company_fax_auth: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many enquiries sent from your location. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Payload must be a valid JSON object." },
        { status: 400 }
      );
    }

    // 3. Honeypot verification (silent drop for bots)
    const bodyRecord = rawBody as Record<string, unknown>;
    if (
      bodyRecord.company_fax_auth &&
      String(bodyRecord.company_fax_auth).trim().length > 0
    ) {
      // Silently return success to mislead spam bots without writing to DB or emailing
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // 4. Validate with Zod
    const parsed = contactSchema.safeParse(rawBody);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message || "Please provide all required fields." },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // Normalize mapped fields
    const name = (input.name || input.fullName || "").trim();
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Full Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    const email = input.email.trim().toLowerCase();
    const phone = input.phone.trim() || null;
    const company = (input.company || input.organization || "").trim() || null;
    const service =
      (input.service || input.serviceInterested || input.inquiryType || "").trim() || null;
    const message = input.message.trim();
    const preferredContactMethod = input.preferredContactMethod || "Email";

    // 5. Deduplication check (protect against accidental repeated clicks/submissions)
    const now = Date.now();
    cleanDuplicateCache(now);
    const submissionKey = `${email}|${name.toLowerCase()}|${message}`;
    const duplicateEntry = recentSubmissions.get(submissionKey);

    if (duplicateEntry && now - duplicateEntry.timestamp < DUPLICATE_WINDOW_MS) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you for contacting LOKRYD. Your inquiry has been received and our team will be in touch shortly.",
        id: duplicateEntry.id,
        note: "duplicate_suppressed",
      });
    }

    // 6. Database persistence via Supabase server client (using SUPABASE_SECRET_KEY)
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      console.error(
        "[LOKRYD CONFIG NOTICE] Supabase server client is not configured (check SUPABASE_SECRET_KEY & SUPABASE_URL)."
      );
      return NextResponse.json(
        {
          error:
            "Our inquiry service is momentarily offline for maintenance. Please email info.lokryd@gmail.com directly.",
        },
        { status: 503 }
      );
    }

    const { data: record, error: dbError } = await supabase
      .from("contact_enquiries")
      .insert({
        name,
        company,
        email,
        phone,
        service,
        message,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (dbError || !record?.id) {
      // Log real DB error internally, never expose SQL/schema internals to client
      console.error(
        "[Supabase Contact Enquiry Error]:",
        dbError ? dbError.message : "No record returned"
      );
      return NextResponse.json(
        {
          error:
            "Unable to save your inquiry at this moment. Please try again or contact info.lokryd@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    const savedEnquiryId = record.id;
    const savedCreatedAt = record.created_at;

    // Cache submission key to prevent duplicates
    recentSubmissions.set(submissionKey, {
      id: savedEnquiryId,
      timestamp: now,
    });

    // 6. Send email notification to info.lokryd@gmail.com
    // Handled independently so database-save success is never lost if email delivery encounters issues
    let emailStatus = "skipped";
    try {
      const emailResult = await sendEnquiryNotificationEmail({
        enquiryId: savedEnquiryId,
        name,
        email,
        phone,
        company,
        service,
        message,
        preferredContactMethod,
        createdAt: savedCreatedAt,
        ipAddress: ip,
      });

      if (emailResult.success) {
        emailStatus = "delivered";
      } else {
        console.warn(
          "[LOKRYD CONTACT] Email dispatch notice:",
          emailResult.error
        );
        emailStatus = "failed_or_unconfigured";
      }
    } catch (emailErr) {
      console.error("[LOKRYD CONTACT] Email dispatch unexpected exception:", emailErr);
      emailStatus = "exception";
    }

    // 7. Return clean success response
    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting LOKRYD. Your inquiry has been received and our team will be in touch shortly.",
      id: savedEnquiryId,
      notification: emailStatus,
    });
  } catch (error) {
    console.error("[LOKRYD CONTACT ROUTE EXCEPTION]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your inquiry. Please try again or contact info.lokryd@gmail.com.",
      },
      { status: 500 }
    );
  }
}
