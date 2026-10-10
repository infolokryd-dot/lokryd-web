import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface EnquiryNotificationData {
  enquiryId?: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  preferredContactMethod?: string | null;
  createdAt?: string;
  ipAddress?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  provider?: "resend" | "smtp" | "console";
  messageId?: string;
  error?: string;
}

/**
 * Builds the HTML content for the enquiry notification email.
 */
function buildEnquiryEmailHtml(data: EnquiryNotificationData): string {
  const dateFormatted = data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " (IST)"
    : new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " (IST)";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New LOKRYD Enquiry</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #F6F8FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #16224E;">
  <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(22, 34, 78, 0.05);">
    <!-- Header -->
    <div style="background-color: #16224E; padding: 28px 32px; border-bottom: 3px solid #1DAFC8;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.06em; color: #ffffff;">LOKRYD</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #1DAFC8; letter-spacing: 0.04em; text-transform: uppercase;">
        New Contact & Corporate Mobility Enquiry
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <p style="margin: 0 0 20px 0; font-size: 15px; color: #16224E; line-height: 1.5;">
        A new contact enquiry has been submitted on the LOKRYD website:
      </p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
        ${data.enquiryId ? `
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; width: 160px; font-weight: 500;">Enquiry ID:</td>
          <td style="padding: 10px 0; font-family: monospace; font-size: 12px; color: #16224E;">${data.enquiryId}</td>
        </tr>` : ""}
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; width: 160px; font-weight: 500;">Full Name:</td>
          <td style="padding: 10px 0; font-weight: 600; color: #16224E;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Email:</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${data.email}" style="color: #1DAFC8; text-decoration: none; font-weight: 500;">
              ${data.email}
            </a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Phone:</td>
          <td style="padding: 10px 0; color: #16224E;">
            ${data.phone ? `<a href="tel:${data.phone.replace(/\\s/g, "")}" style="color: #16224E; text-decoration: none; font-weight: 500;">${data.phone}</a>` : "—"}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Company / Org:</td>
          <td style="padding: 10px 0; color: #16224E;">${data.company || "—"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Service Requested:</td>
          <td style="padding: 10px 0; color: #16224E;">${data.service || "—"}</td>
        </tr>
        ${data.preferredContactMethod ? `
        <tr style="border-bottom: 1px solid #F1F5F9;">
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Preferred Method:</td>
          <td style="padding: 10px 0; color: #16224E;">${data.preferredContactMethod}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px 0; color: #64748B; font-weight: 500;">Submission Time:</td>
          <td style="padding: 10px 0; color: #64748B; font-size: 13px;">${dateFormatted}</td>
        </tr>
      </table>

      <!-- Message block -->
      <div style="margin-top: 20px; padding: 20px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em;">
          Message
        </p>
        <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #16224E; line-height: 1.6;">
          ${data.message}
        </p>
      </div>

      <!-- Quick Reply Action -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: LOKRYD Mobility Enquiry - ${data.name}`)}"
           style="display: inline-block; background-color: #16224E; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-size: 14px; font-weight: 500;">
          Reply to ${data.name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F1F5F9; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center; border-top: 1px solid #E2E8F0;">
      LOKRYD Notification System • Delivered to <a href="mailto:info.lokryd@gmail.com" style="color: #64748B;">info.lokryd@gmail.com</a>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Builds the plain text content for the email.
 */
function buildEnquiryEmailPlainText(data: EnquiryNotificationData): string {
  return `
NEW LOKRYD CONTACT ENQUIRY
==========================
${data.enquiryId ? `Enquiry ID: ${data.enquiryId}\n` : ""}Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Company: ${data.company || "N/A"}
Service: ${data.service || "N/A"}
Preferred Contact Method: ${data.preferredContactMethod || "N/A"}
Timestamp: ${data.createdAt || new Date().toISOString()}

Message:
--------
${data.message}
`.trim();
}

/**
 * Dispatches an email notification to the official company email (info.lokryd@gmail.com).
 * Uses Resend if configured, falls back to SMTP if configured, or logs in development.
 *
 * NOTE: This function does not throw errors so database saves are never aborted if email fails.
 */
export async function sendEnquiryNotificationEmail(
  data: EnquiryNotificationData
): Promise<EmailDispatchResult> {
  const toEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    "info.lokryd@gmail.com";
  // The verified sender must come from a verified domain on Resend (or onboarding@resend.dev for testing)
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    process.env.CONTACT_FROM_EMAIL ||
    "LOKRYD Inquiries <onboarding@resend.dev>";
  const resendApiKey = process.env.RESEND_API_KEY;

  const subject = `New LOKRYD Enquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const html = buildEnquiryEmailHtml(data);
  const text = buildEnquiryEmailPlainText(data);

  // 1. Primary provider: Resend
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const resendResult = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject,
        html,
        text,
      });

      if (resendResult.error) {
        console.error("[Resend API Error]:", resendResult.error);
        return {
          success: false,
          provider: "resend",
          error: resendResult.error.message,
        };
      }

      return {
        success: true,
        provider: "resend",
        messageId: resendResult.data?.id,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[Resend Dispatch Exception]:", errorMsg);
      return {
        success: false,
        provider: "resend",
        error: errorMsg,
      };
    }
  }

  // 2. Secondary fallback: SMTP if configured
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const info = await transporter.sendMail({
        from: fromEmail || SMTP_USER,
        to: toEmail,
        replyTo: data.email,
        subject,
        text,
        html,
      });

      return {
        success: true,
        provider: "smtp",
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[SMTP Dispatch Exception]:", errorMsg);
      return {
        success: false,
        provider: "smtp",
        error: errorMsg,
      };
    }
  }

  // 3. Fallback: No email provider configured
  console.warn(
    "[LOKRYD EMAIL NOTICE] Neither RESEND_API_KEY nor SMTP credentials configured. Email notification skipped."
  );
  return {
    success: false,
    provider: "console",
    error: "No transactional email service configured (set RESEND_API_KEY).",
  };
}
