import { Resend } from "resend";
import { Booking } from "@/types/booking";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking: Booking) {
  return resend.emails.send({
    from: "RYDAX <noreply@rydax.net>",
    to: [booking.email],
    subject: `Lesson Confirmed - ${booking.lessonName} - RYDAX`,
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
            <div class="logo">RYDAX</div>
          </div>
          <div class="content">
            <h2>Your lesson is confirmed!</h2>
            <p>Hi ${booking.customerName},</p>
            <p>Thank you for booking with RYDAX. Your lesson has been confirmed - here's a summary:</p>
            
            <div class="details">
              <h3>Booking Details</h3>
              <ul>
                <li><span class="label">Service:</span> ${booking.lessonName}</li>
                <li><span class="label">Date:</span> ${booking.preferredDate}</li>
                <li><span class="label">Time:</span> ${booking.preferredTime}</li>
                <li><span class="label">Reference:</span> ${booking.id.slice(0, 8).toUpperCase()}</li>
              </ul>
            </div>
            
            <p>Your instructor will call you the day before your lesson to confirm everything.</p>
            
            <p>If you need to reschedule or have any questions, just reply to this email.</p>
            
            <p>See you soon!</p>
            
            <p>— RYDAX Team</p>
          </div>
          <div class="footer">
            <p>RYDAX Driving School</p>
          </div>
        </body>
      </html>
    `,
  });
}