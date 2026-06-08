import { NextRequest, NextResponse } from "next/server";
import { saveBooking } from "@/lib/bookings";
import { sendBookingConfirmation } from "@/lib/email";
import { Booking } from "@/types/booking";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = [
      "customerName",
      "phone",
      "email",
      "lessonId",
      "lessonName",
      "lessonPrice",
      "preferredDate",
      "preferredTime",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      customerName: body.customerName,
      phone: body.phone,
      email: body.email,
      lessonId: body.lessonId,
      lessonName: body.lessonName,
      lessonPrice: body.lessonPrice,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      notes: body.notes || "",
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    await saveBooking(newBooking);

    try {
      await sendBookingConfirmation(newBooking);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { getBookings } = await import("@/lib/bookings");
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to get bookings:", error);
    return NextResponse.json(
      { error: "Failed to get bookings" },
      { status: 500 },
    );
  }
}
