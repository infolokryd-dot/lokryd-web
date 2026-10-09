import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// In-memory rate limiter (per IP)
// Note: In Phase 1, in-memory rate limiting is used. On multi-instance serverless deployments,
// this rate-limits per serverless instance; a distributed store (e.g. Redis/Upstash) can replace this in later phases.
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

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

const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name exceeds maximum length"),
  email: z
    .string()
    .trim()
    .min(1, "Email Address is required")
    .email("Please provide a valid email address")
    .max(150, "Email exceeds maximum length"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone Number is required")
    .min(6, "Please provide a valid phone number")
    .max(30, "Phone number exceeds maximum length"),
  organization: z.string().trim().max(120).optional().default(""),
  inquiryType: z.enum([
    "Corporate Services",
    "Individual Booking",
    "Partnership",
    "Support",
    "Other",
  ]),
  serviceInterested: z
    .enum([
      "Employee Transportation",
      "Shuttle Services",
      "Car Rental",
      "Event Transport",
      "Other",
      "",
    ])
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(5, "Message must be at least 5 characters")
    .max(2500, "Message exceeds maximum length"),
  preferredContactMethod: z
    .enum(["Email", "Phone", "WhatsApp"])
    .optional()
    .default("Email"),
  // Honeypot field - must be empty
  company_fax_auth: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many inquiries sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    // 2. Body parsing
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    // 3. Honeypot verification
    if (body.company_fax_auth && String(body.company_fax_auth).trim().length > 0) {
      // Silently accept honeypot triggers without sending email
      return NextResponse.json({ success: true, filtered: true });
    }

    // 4. Schema validation with Zod
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || "Please correct the required fields." },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 5. Environment variable check
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      LEAD_FROM_EMAIL,
      LEAD_TO_EMAIL,
      NODE_ENV,
    } = process.env;

    const hasSmtpConfig = Boolean(
      SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && LEAD_TO_EMAIL
    );

    const subject = `New LOKRYD enquiry — ${data.inquiryType} — ${data.fullName}`;

    const plainText = `
NEW LOKRYD ENQUIRY
==================
Inquiry Type: ${data.inquiryType}
Full Name: ${data.fullName}
Email Address: ${data.email}
Phone Number: ${data.phone}
Organization: ${data.organization || "N/A"}
Service Interested In: ${data.serviceInterested || "Not Specified"}
Preferred Contact Method: ${data.preferredContactMethod}

Message:
--------
${data.message}

Timestamp: ${new Date().toISOString()}
Origin IP: ${ip}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F8FA; margin: 0; padding: 32px 16px; color: #16224E;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 4px; overflow: hidden;">
    <div style="background-color: #16224E; padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em;">LOKRYD</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #1DAFC8;">New Corporate & Mobility Inquiry</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
        <tr>
          <td style="padding: 8px 0; color: #64748B; width: 180px; font-weight: 500;">Inquiry Type:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #16224E;">${data.inquiryType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Full Name:</td>
          <td style="padding: 8px 0; color: #16224E;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Email Address:</td>
          <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1DAFC8; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Phone Number:</td>
          <td style="padding: 8px 0; color: #16224E;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Organization:</td>
          <td style="padding: 8px 0; color: #16224E;">${data.organization || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Service Interested In:</td>
          <td style="padding: 8px 0; color: #16224E;">${data.serviceInterested || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B; font-weight: 500;">Preferred Contact:</td>
          <td style="padding: 8px 0; color: #16224E;">${data.preferredContactMethod}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #F1F5F9;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <p style="margin: 0; white-space: pre-wrap; font-size: 15px; color: #16224E; background: #F6F8FA; padding: 16px; border-radius: 4px; line-height: 1.6;">${data.message}</p>
      </div>

      <div style="margin-top: 32px; font-size: 12px; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 16px;">
        Received from IP ${ip} at ${new Date().toUTCString()}
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // 6. Handle dispatch or dev fallback
    if (!hasSmtpConfig) {
      if (NODE_ENV === "production") {
        console.error(
          "[LOKRYD LEAD ERROR] Missing SMTP environment variables in production environment."
        );
        return NextResponse.json(
          {
            error:
              "The inquiry service is momentarily offline for maintenance. Please email corporate@lokryd.com directly.",
          },
          { status: 500 }
        );
      } else {
        // Development mode: log cleanly to server console
        console.log("\n=======================================================");
        console.log(`[DEV MODE LEAD LOG] ${subject}`);
        console.log("-------------------------------------------------------");
        console.log(plainText);
        console.log("=======================================================\n");

        return NextResponse.json({
          success: true,
          devMode: true,
          message: "Inquiry logged to server console (development mode).",
        });
      }
    }

    // 7. Dispatch via Nodemailer
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: LEAD_FROM_EMAIL || SMTP_USER,
      to: LEAD_TO_EMAIL,
      replyTo: data.email,
      subject,
      text: plainText,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LOKRYD LEAD DISPATCH EXCEPTION]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry." },
      { status: 500 }
    );
  }
}
