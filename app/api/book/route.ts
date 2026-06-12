import { NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";
import { saveBooking, getBookings } from "@/lib/bookings";
import { isDateDisabled } from "@/lib/booking-utils";
import { validateOrigin } from "@/lib/csrf";

const VALID_LESSON_IDS = ["foundation", "power-pack", "mastery"] as const;

function validateBookingBody(body: Record<string, unknown>): string | null {
  const { customerName, phone, email, lessonId, preferredDate, preferredTime, notes } = body;

  if (!customerName || !phone || !email || !lessonId || !preferredDate || !preferredTime) {
    return "Missing required fields";
  }

  if (typeof customerName !== "string" || customerName.length > 100) {
    return "Name is too long (max 100 characters)";
  }

  if (typeof phone !== "string") {
    return "Invalid phone number";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email as string)) {
    return "Invalid email format";
  }

  // Phone validation — accept digits, spaces, +, -, parentheses (Canadian phone format)
  const phoneClean = (phone as string).replace(/[\s\-\(\)\+]/g, "");
  if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
    return "Invalid phone number format";
  }

  // Lesson ID validation
  if (!VALID_LESSON_IDS.includes(lessonId as typeof VALID_LESSON_IDS[number])) {
    return "Invalid lesson ID";
  }

  // Notes length
  if (notes && typeof notes === "string" && notes.length > 500) {
    return "Notes are too long (max 500 characters)";
  }

  // Server-side date validation
  if (typeof preferredDate === "string") {
    // Parse YYYY-MM-DD using local-time constructor to avoid UTC date shift
    const parts = preferredDate.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      return "Invalid date format";
    }
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    if (isDateDisabled(dateObj)) {
      return "Selected date is unavailable (Sundays, past dates, and dates beyond 60 days are not bookable)";
    }
  }

  // Server-side time validation
  if (typeof preferredTime === "string") {
    const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i;
    const match = preferredTime.match(timeRegex);
    if (!match) {
      return "Invalid time format";
    }
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridian = (match[3] || "").toUpperCase();
    // Validate hour range based on 12/24-hour format
    if (meridian) {
      if (hours < 1 || hours > 12) return "Invalid hour value (1-12 for AM/PM)";
    } else {
      if (hours < 0 || hours > 23) return "Invalid hour value (0-23 for 24-hour format)";
    }
    if (minutes < 0 || minutes > 59) return "Invalid minute value (0-59)";
  }

  return null; // No validation error
}

export async function POST(request: Request) {
  try {
    // CSRF protection: validate Origin/Referer header
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_BASE_URL || "https://driiv.net",
    ];
    const originCheck = validateOrigin(request, allowedOrigins);
    if (!originCheck.valid) {
      console.warn(`[CSRF] Rejected booking request: ${originCheck.reason}`);
      return NextResponse.json(
        { error: "CSRF validation failed" },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validate inputs
    const validationError = validateBookingBody(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 },
      );
    }

    const {
      customerName, phone, email,
      lessonId, lessonName, lessonPrice,
      preferredDate, preferredTime, notes,
    } = body as {
      customerName: string;
      phone: string;
      email: string;
      lessonId: string;
      lessonName: string;
      lessonPrice: string;
      preferredDate: string;
      preferredTime: string;
      notes?: string;
    };

    const booking = {
      id: crypto.randomUUID(),
      customerName,
      phone,
      email,
      lessonId,
      lessonName,
      lessonPrice,
      preferredDate,
      preferredTime,
      notes: notes || "",
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage FIRST (includes double-booking check).
    // This ensures we never create a calendar event for a duplicate booking.
    try {
      await saveBooking(booking);
    } catch (saveError) {
      const msg = saveError instanceof Error ? saveError.message : String(saveError);
      console.error("Failed to save booking locally:", booking.id, ":", msg);
      if (msg.includes("already been booked")) {
        return NextResponse.json(
          { error: msg },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "Failed to save booking" },
        { status: 500 },
      );
    }

    // Create the calendar event AFTER local save.
    // If this fails the booking is still valid — it just needs manual
    // calendar sync. Admin can follow up via the dashboard.
    const calendarResult = await createBookingEvent(booking);
    if (!calendarResult.success) {
      console.error(
        "Calendar event failed for booking",
        booking.id,
        "—",
        calendarResult.error,
      );
    }

    // Send confirmation email (fire-and-forget, never blocks response)
    let emailStatus: string;
    try {
      await sendBookingConfirmation(booking);
      emailStatus = "sent";
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Failed to send confirmation email for booking", booking.id, ":", errMsg);
      emailStatus = `failed: ${errMsg}`;
    }

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking confirmed! We'll see you on the road.",
      calendar: calendarResult.success ? "synced" : "failed",
      email: emailStatus,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminKey = process.env.ADMIN_API_KEY;

    // Fail-closed: if ADMIN_API_KEY is not configured, deny all requests
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await getBookings();
    return NextResponse.json({ bookings: existing });
  } catch {
    return NextResponse.json(
      { error: "Failed to get bookings" },
      { status: 500 },
    );
  }
}
