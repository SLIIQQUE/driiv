import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

function getExistingBookings() {
  if (!fs.existsSync(BOOKINGS_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName, phone, email,
      lessonId, lessonName, lessonPrice,
      preferredDate, preferredTime, notes,
    } = body;

    if (!customerName || !phone || !email || !lessonId || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Phone validation — accept digits, spaces, +, -, parentheses (Canadian phone format)
    const phoneClean = phone.replace(/[\s\-\(\)\+]/g, "");
    if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Lesson ID validation
    const VALID_LESSON_IDS = ["foundation", "power-pack", "mastery"];
    if (!VALID_LESSON_IDS.includes(lessonId)) {
      return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 });
    }

    // Name length
    if (customerName.length > 100) {
      return NextResponse.json({ error: "Name is too long (max 100 characters)" }, { status: 400 });
    }

    // Notes length
    if (notes && notes.length > 500) {
      return NextResponse.json({ error: "Notes are too long (max 500 characters)" }, { status: 400 });
    }

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

    const dir = path.dirname(BOOKINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const existing = getExistingBookings();

    // Check for double-booking
    const isSlotTaken = existing.some(
      (b: Record<string, unknown>) => b.preferredDate === preferredDate && b.preferredTime === preferredTime,
    );
    if (isSlotTaken) {
      return NextResponse.json(
        { error: "This time slot has already been booked. Please choose another time." },
        { status: 409 },
      );
    }

    existing.push(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(existing, null, 2));

    console.log("Booking saved:", booking.id);

    // Send confirmation email (fire-and-forget, never blocks response)
    sendBookingConfirmation(booking).catch((err) => {
      console.error("Failed to send confirmation email for booking", booking.id, ":", err);
    });

    // Create Google Calendar event (never blocks the booking response)
    const calendarResult = await createBookingEvent(booking);
    if (!calendarResult.success) {
      console.error(
        "Calendar event failed for booking",
        booking.id,
        "—",
        calendarResult.error,
      );
    }

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking confirmed! We'll see you on the road.",
      calendar: calendarResult.success ? "synced" : "failed",
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

    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = getExistingBookings();
    return NextResponse.json({ bookings: existing });
  } catch {
    return NextResponse.json(
      { error: "Failed to get bookings" },
      { status: 500 },
    );
  }
}
