import { Resend } from "resend";
import { Booking } from "@/types/booking";

const fromAddress = process.env.RESEND_FROM_EMAIL || "DRIIV <noreply@driiv.net>";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

/**
 * HTML-escape a string to prevent XSS in email templates.
 * Replaces: & < > " ' with their HTML entity equivalents.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Short human-readable booking reference (first 8 chars of UUID). */
function bookingRef(id: string): string {
  return escapeHtml(id.slice(0, 8).toUpperCase());
}

export async function sendBookingConfirmation(booking: Booking) {
  const resend = getResend();

  // HTML-escape all user-supplied values before inserting into the template.
  // This prevents stored XSS attacks via email client HTML rendering.
  const safeName = escapeHtml(booking.customerName);
  const safeLesson = escapeHtml(booking.lessonName);
  const safeDate = escapeHtml(booking.preferredDate);
  const safeTime = escapeHtml(booking.preferredTime);
  const safeRef = bookingRef(booking.id);

  const subject = `Lesson Confirmed - ${safeLesson} - DRIIV`;

  return resend.emails.send({
    from: fromAddress,
    to: [booking.email],
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #FFD700; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; }
            .logo span { color: #FFD700; }
            .content { padding: 20px 0; }
            .details { background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .details h3 { margin-top: 0; color: #FFD700; }
            .details ul { list-style: none; padding: 0; margin: 0; }
            .details li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .details li:last-child { border-bottom: none; }
            .label { font-weight: 600; }
            .cta { display: inline-block; background: linear-gradient(135deg, #FFD700, #1A2B48); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">DRIIV</div>
          </div>
          <div class="content">
            <h2>Your lesson is confirmed!</h2>
            <p>Hi ${safeName},</p>
            <p>Thank you for booking with DRIIV. Your lesson has been confirmed - here's a summary:</p>
            
            <div class="details">
              <h3>Booking Details</h3>
              <ul>
                <li><span class="label">Service:</span> ${safeLesson}</li>
                <li><span class="label">Date:</span> ${safeDate}</li>
                <li><span class="label">Time:</span> ${safeTime}</li>
                <li><span class="label">Reference:</span> ${safeRef}</li>
              </ul>
            </div>
            
            <p>Your instructor will call you the day before your lesson to confirm everything.</p>
            
            <p>If you need to reschedule or have any questions, just reply to this email.</p>
            
            <p>See you soon!</p>
            
            <p>— DRIIV Team</p>
          </div>
          <div class="footer">
            <p>DRIIV Driving School</p>
          </div>
        </body>
      </html>
    `,
  });
}