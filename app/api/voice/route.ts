import { NextResponse } from "next/server";
import { buildSystemPrompt, VOICE_TOOLS, BUSINESS_INFO } from "@/lib/voice-prompt";
import type { GroqMessage } from "@/types/voice";

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
    (p) => `- ${p.name}: ${p.price} ${p.period}${p.savings ? ` (${p.savings})` : ""} — ${p.tagline}`,
  );
  return `Available programs:\n${lines.join("\n")}`;
}

function executeGetServiceAreas(): string {
  const areas = BUSINESS_INFO.serviceAreas;
  return `Service areas: ${areas.join(", ")}. We cover these ${areas.length} areas across Greater Sydney.`;
}

async function executeBooking(args: Record<string, unknown>) {
  const serviceType = String(args.serviceType || "foundation");

  // Map service type to lesson data
  const lessonMap: Record<string, { id: string; name: string; price: string }> = {
    foundation: { id: "foundation", name: "Foundation Pass", price: "$55" },
    "power-pack": { id: "power-pack", name: "Power Pack", price: "$250" },
    mastery: { id: "mastery", name: "Mastery Bundle", price: "$450" },
  };

  const lesson = lessonMap[serviceType] || lessonMap.foundation;

  const bookingPayload = {
    customerName: String(args.name || ""),
    phone: String(args.phone || ""),
    email: String(args.email || ""),
    lessonId: lesson.id,
    lessonName: lesson.name,
    lessonPrice: lesson.price,
    preferredDate: String(args.preferredDate || ""),
    preferredTime: String(args.preferredTime || ""),
    notes: String(args.notes || ""),
  };

  // Validate required fields
  if (!bookingPayload.customerName || !bookingPayload.phone) {
    return {
      success: false,
      error: "Missing required booking information (name and phone are required).",
    };
  }

  try {
    // Call the internal booking API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        bookingRef: data.booking.id.slice(0, 8).toUpperCase(),
        data: {
          ...data.booking,
          id: data.booking.id.slice(0, 8).toUpperCase(),
        },
      };
    }

    return {
      success: false,
      error: data.error || "Booking could not be completed. Please try again.",
    };
  } catch (err) {
    console.error("Booking execution error:", err);
    return {
      success: false,
      error: "Could not complete the booking due to a system error. Please try again.",
    };
  }
}

export async function POST(request: Request) {
  try {
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

    let bookingResult = null;

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
    const toolResults: ToolCallResult[] = [];

    for (const toolCall of toolCalls) {
      if (toolCall.function.name === "book_lesson") {
        try {
          const args = JSON.parse(toolCall.function.arguments);
          bookingResult = await executeBooking(args);
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
      }

      if (toolCall.function.name === "get_pricing") {
        const pricingInfo = executeGetPricing();
        toolResults.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: pricingInfo,
        });
      }

      if (toolCall.function.name === "get_service_areas") {
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
      { status: 200 }, // Return 200 with graceful message so UI doesn't break
    );
  }
}
