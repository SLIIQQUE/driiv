import { NextResponse } from "next/server";
import { buildSystemPrompt, VOICE_TOOLS, BUSINESS_INFO } from "@/lib/voice-prompt";
import type { GroqMessage } from "@/types/voice";
import { saveBooking } from "@/lib/bookings";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";
import { PROGRAMS } from "@/data/programs";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ToolCallResult {
  role: "tool";
  tool_call_id: string;
  content: string;
}

const GROQ_API_BASE = "https://api.groq.com/openai/v1";

const VALID_SERVICE_TYPES = ["foundation", "power-pack", "mastery"] as const;

async function callGroq(
  messages: GroqMessage[],
): Promise<{
  content: string;
  toolCalls?: Array<{
    id: string;
    function: { name: string; arguments: string };
  }>;
}> {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "qwen-2.5-32b";

  if (!apiKey) {
    return {
      content: "I'm sorry, the AI system hasn't been configured yet. Please contact support to set up my brain.",
    };
  }

  const response = await fetch(`${GROQ_API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      tools: VOICE_TOOLS,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Groq API error:", response.status, errorBody);
    throw new Error(`Groq API returned ${response.status}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];

  if (!choice) {
    throw new Error("No response from Groq");
  }

  const content = choice.message?.content || "";
  const toolCalls = choice.message?.tool_calls?.map((tc: { id: string; function: { name: string; arguments: string } }) => ({
    id: tc.id,
    function: {
      name: tc.function.name,
      arguments: tc.function.arguments,
    },
  }));

  return { content, toolCalls };
}

function executeGetPricing(): string {
  const programs = BUSINESS_INFO.programs;
  const lines = programs.map(
    (p) => `${p.name}: ${p.price} ${p.period}${p.savings ? ` (${p.savings})` : ""} — ${p.tagline}`,
  );
  return `Available programs:\n${lines.join("\n")}`;
}

function executeGetServiceAreas(): string {
  const areas = BUSINESS_INFO.serviceAreas;
  return `Service areas: ${areas.join(", ")}. We cover these ${areas.length} areas across Metro Vancouver.`;
}

/**
 * Validate booking payload from the voice assistant.
 * Returns an error string if invalid, or null if valid.
 */
function validateVoiceBooking(args: Record<string, unknown>): string | null {
  const { name, phone, email, serviceType, notes, preferredDate, preferredTime } = args;

  if (!name || !phone) {
    return "Missing required booking information (name and phone are required).";
  }

  if (typeof name !== "string" || name.length > 100) {
    return "Name is too long (max 100 characters).";
  }

  if (typeof phone !== "string") {
    return "Invalid phone number format.";
  }

  const phoneClean = phone.replace(/[\s\-\(\)\+]/g, "");
  if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
    return "Invalid phone number format.";
  }

  if (email && typeof email === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
  }

  if (serviceType && typeof serviceType === "string" && !VALID_SERVICE_TYPES.includes(serviceType as typeof VALID_SERVICE_TYPES[number])) {
    return `Invalid program selected. Please choose one of: ${VALID_SERVICE_TYPES.join(", ")}.`;
  }

  if (notes && typeof notes === "string" && notes.length > 500) {
    return "Notes are too long (max 500 characters).";
  }

  // Validate preferredDate format
  if (preferredDate && typeof preferredDate === "string") {
    // Accept YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      const d = new Date(preferredDate);
      if (isNaN(d.getTime())) {
        return "Please provide a valid date (e.g., 'June 15, 2026').";
      }
    }
  }

  // Validate preferredTime format and range
  if (preferredTime && typeof preferredTime === "string") {
    const timeMatch = preferredTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i);
    if (!timeMatch) {
      return "Please provide a valid time (e.g., '10:00 AM' or '14:00').";
    }
    const hrs = parseInt(timeMatch[1], 10);
    const mins = parseInt(timeMatch[2], 10);
    const meridiem = (timeMatch[3] || "").toUpperCase();
    if (meridiem && (hrs < 1 || hrs > 12)) {
      return "Hour must be between 1 and 12 for AM/PM format.";
    }
    if (!meridiem && (hrs < 0 || hrs > 23)) {
      return "Hour must be between 0 and 23 for 24-hour format.";
    }
    if (mins < 0 || mins > 59) {
      return "Minutes must be between 0 and 59.";
    }
  }

  return null;
}

async function executeBooking(args: Record<string, unknown>) {
  // Validate inputs
  const validationError = validateVoiceBooking(args);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const serviceType = String(args.serviceType || "foundation");

  // Look up program from canonical data source
  const program = PROGRAMS.find((p) => p.id === serviceType);
  if (!program) {
    return {
      success: false,
      error: `Invalid program "${serviceType}". Please choose Foundation Pass, Power Pack, or Mastery Bundle.`,
    };
  }

  const bookingPayload = {
    customerName: String(args.name || ""),
    phone: String(args.phone || ""),
    email: String(args.email || ""),
    lessonId: program.id,
    lessonName: program.name,
    lessonPrice: program.price,
    preferredDate: String(args.preferredDate || ""),
    preferredTime: String(args.preferredTime || ""),
    notes: String(args.notes || ""),
  };

  const bookingId = crypto.randomUUID();
  const bookingRef = bookingId.slice(0, 8).toUpperCase();

  const booking = {
    id: bookingId,
    customerName: bookingPayload.customerName,
    phone: bookingPayload.phone,
    email: bookingPayload.email,
    lessonId: bookingPayload.lessonId,
    lessonName: bookingPayload.lessonName,
    lessonPrice: bookingPayload.lessonPrice,
    preferredDate: bookingPayload.preferredDate,
    preferredTime: bookingPayload.preferredTime,
    notes: bookingPayload.notes,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  // IMPORTANT: Do NOT save the booking here. Return the data and let
  // the caller save it after the second Groq call succeeds.
  // This prevents orphaned bookings if the LLM follow-up fails.
  return {
    success: true,
    bookingRef,
    data: {
      ...booking,
      id: bookingRef,
      _bookingId: bookingId, // full UUID for persistBooking to use
    },
  };
}

/**
 * Persist the booking: save to local storage, create calendar event,
 * and send confirmation email. Called after the Groq conversation completes.
 * Uses the same booking ID generated in executeBooking for consistency.
 */
async function persistBooking(bookingData: Record<string, unknown>) {
  // Use the UUID generated in executeBooking so the booking ref the LLM
  // told the user matches the one persisted to disk.
  const bookingId = String(bookingData._bookingId || crypto.randomUUID());

  const booking = {
    id: bookingId,
    customerName: String(bookingData.customerName || ""),
    phone: String(bookingData.phone || ""),
    email: String(bookingData.email || ""),
    lessonId: String(bookingData.lessonId || ""),
    lessonName: String(bookingData.lessonName || ""),
    lessonPrice: String(bookingData.lessonPrice || ""),
    preferredDate: String(bookingData.preferredDate || ""),
    preferredTime: String(bookingData.preferredTime || ""),
    notes: String(bookingData.notes || ""),
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  // Save to local storage (includes double-booking check with retry)
  await saveBooking(booking);

  // Fire-and-forget calendar event creation
  createBookingEvent(booking).catch((err) => {
    console.error("Calendar event failed for voice booking", booking.id, ":", err);
  });

  // Fire-and-forget confirmation email
  sendBookingConfirmation(booking).catch((err) => {
    console.error("Confirmation email failed for voice booking", booking.id, ":", err);
  });

  // Shorten for display — match the ref the user was told
  const bookingRef = bookingId.slice(0, 8).toUpperCase();
  return { bookingRef };
}

export async function POST(request: Request) {
  try {
    // CSRF protection: validate Origin/Referer header
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_BASE_URL || "https://driiv.net",
    ];
    const originCheck = validateOrigin(request, allowedOrigins);
    if (!originCheck.valid) {
      console.warn(`[CSRF] Rejected voice request: ${originCheck.reason}`);
      return NextResponse.json(
        { error: "CSRF validation failed" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing required field: messages (non-empty array)" },
        { status: 400 },
      );
    }

    // Build the Groq conversation with system prompt
    const groqMessages: GroqMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    // First LLM call
    const { content, toolCalls } = await callGroq(groqMessages);

    // If no tool calls, return the response directly
    if (!toolCalls || toolCalls.length === 0) {
      return NextResponse.json({
        content,
        toolCalls: [],
        booking: null,
      });
    }

    // Handle tool calls: execute each and collect results
    // Use else-if chain to prevent multiple tools executing for one message
    const toolResults: ToolCallResult[] = [];
    let bookingResult = null;
    let bookingDataForPersist: Record<string, unknown> | null = null;

    for (const toolCall of toolCalls) {
      if (toolCall.function.name === "book_lesson") {
        try {
          const args = JSON.parse(toolCall.function.arguments);
          bookingResult = await executeBooking(args);
          if (bookingResult.success) {
            bookingDataForPersist = bookingResult.data as Record<string, unknown>;
          }
          toolResults.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(bookingResult),
          });
        } catch (parseErr) {
          console.error("Failed to parse book_lesson args:", parseErr);
          const errResult = { success: false, error: "Could not process the booking information. Please try again." };
          bookingResult = errResult;
          toolResults.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(errResult),
          });
        }
      } else if (toolCall.function.name === "get_pricing") {
        const pricingInfo = executeGetPricing();
        toolResults.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: pricingInfo,
        });
      } else if (toolCall.function.name === "get_service_areas") {
        const areasInfo = executeGetServiceAreas();
        toolResults.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: areasInfo,
        });
      }
    }

    // Second LLM call with tool results to generate natural language response
    const groqMessagesWithTools: GroqMessage[] = [
      ...groqMessages,
      {
        role: "assistant",
        content: content || null,
        tool_calls: toolCalls.map((tc) => ({
          id: tc.id,
          type: "function" as const,
          function: tc.function,
        })),
      },
      ...toolResults,
    ];

    const secondResponse = await callGroq(groqMessagesWithTools);

    // Only persist the booking AFTER both Groq calls succeed
    if (bookingDataForPersist) {
      try {
        const persistResult = await persistBooking(bookingDataForPersist);
        // Update booking result with the real reference
        bookingResult = {
          ...bookingResult,
          bookingRef: persistResult.bookingRef,
        };
      } catch (persistErr) {
        const msg = persistErr instanceof Error ? persistErr.message : String(persistErr);
        console.error("Failed to persist voice booking:", msg);
        bookingResult = {
          success: false,
          error: msg.includes("already been booked")
            ? msg
            : "We couldn't complete your booking due to a system error. Please try again or book online.",
        };
      }
    }

    return NextResponse.json({
      content: secondResponse.content,
      toolCalls: toolCalls.map((tc) => ({
        function: tc.function,
      })),
      booking: bookingResult,
    });
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json(
      {
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        toolCalls: [],
        booking: null,
      },
      // Return 200 with graceful message so UI doesn't break
      { status: 200 },
    );
  }
}
