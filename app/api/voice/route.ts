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
    } else if (text.includes("foundation") || text.includes("beginner")) {
      responseText =
        "The Foundation program is perfect for beginners. One-on-one dual-control sessions at $55/hour. Book online with instant confirmation. No commitment required.";
    } else if (text.includes("accelerator") || text.includes("intensive")) {
      responseText =
        "The Accelerator program gets you from zero to licensed in 14 days with 10 hours of concentrated training, mock examinations, and vehicle provision for your ICBC test. It's $650.";
    } else if (text.includes("refresher") || text.includes("polisher")) {
      responseText =
        "The Polisher program is for post-license refinement — highway merging, night navigation, all-weather control. $55 per session with no package pressure.";
    } else if (text.includes("area") || text.includes("surrey") || text.includes("langley") || text.includes("delta") || text.includes("richmond") || text.includes("burnaby") || text.includes("new west")) {
      responseText =
        "We serve Surrey, Langley, Delta, Richmond, Burnaby, and New Westminster. Pickup and drop-off are included. You can book online and we'll come to you.";
    } else if (text.includes("pass") || text.includes("rate") || text.includes("icbc")) {
      responseText =
        "95% of our students pass their ICBC road test on the first attempt. Our Final Edge program ($350) includes vehicle provision for the actual examination.";
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
