import { NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing required field: messages (non-empty array)" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const text = lastMessage.content.toLowerCase();

    let responseText = "";
    const toolCalls: Array<{ function: { name: string; arguments: string } }> = [];

    if (text.includes("book") || text.includes("schedule") || text.includes("lesson")) {
      responseText =
        "I can help you book a session! I'll need your full name, phone number, and email address. Would you like to book a single session or a package?";
    } else if (text.includes("price") || text.includes("cost") || text.includes("package")) {
      responseText =
        "Our programs start at $55 per session. The Power Pack (5 sessions) is $250, and the Mastery Bundle (10 sessions) is $450. Would you like details on any specific program?";
    } else if (text.includes("foundation") || text.includes("beginner") || text.includes("single")) {
      responseText =
        "The Foundation Pass is perfect for beginners and pay-as-you-go learners. One-on-one dual-control sessions at $55/hour. Book online with instant confirmation. No commitment required.";
    } else if (text.includes("power") || text.includes("pack")) {
      responseText =
        "The Power Pack is 5 sessions for $250 — save $25 versus the per-session rate. Includes priority scheduling, a mock assessment, and full progress dashboard.";
    } else if (text.includes("mastery") || text.includes("bundle")) {
      responseText =
        "The Mastery Bundle is 10 sessions for $450 — save $100 versus the per-session rate. Includes complete curriculum coverage, 2 mock road tests, and auto-pay.";
    } else if (text.includes("icbc") || text.includes("test") || text.includes("exam") || text.includes("pass") || text.includes("rate")) {
      responseText =
        "95% of our students pass their ICBC road test on the first attempt. Our instructors prepare you thoroughly with mock examinations and test-ready progress tracking.";
    } else if (text.includes("hello") || text.includes("hi ") || text.includes("hey") || text.includes("help")) {
      responseText =
        "Hello! I'm the RYDAX AI concierge. I can help you book lessons, explain our programs, check pricing, or answer any questions about our driving school. What would you like to know?";
    } else {
      responseText =
        "I'm here to help! You can ask me about our programs, pricing, service areas, booking, or anything about RyDax Driving School. What would you like to know?";
    }

    return NextResponse.json({
      content: responseText,
      toolCalls,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
