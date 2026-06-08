import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, email, serviceType, preferredDate, preferredTime, notes } = body;

    if (!customerName || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields: customerName, phone, email" },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual booking system (e.g., email, CRM, database)
    console.log("Booking request received:", {
      customerName,
      phone,
      email,
      serviceType,
      preferredDate,
      preferredTime,
      notes,
    });

    return NextResponse.json({
      success: true,
      message: "Booking request received. We will confirm your slot within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
