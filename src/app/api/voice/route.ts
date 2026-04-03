import { NextRequest, NextResponse } from "next/server";
import { VOICE_SYSTEM_PROMPT, VOICE_TOOLS } from "@/lib/voice-prompt";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request body: messages array is required" },
        { status: 400 },
      );
    }

    const { messages } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const groqMessages = [
      { role: "system", content: VOICE_SYSTEM_PROMPT },
      ...messages.map(
        ({ role, content }: { role: string; content: string }) => ({
          role,
          content: content ?? "",
        }),
      ),
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        tools: VOICE_TOOLS,
        tool_choice: "auto",
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Groq API error: ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      content: assistantMessage.content ?? "",
      toolCalls: assistantMessage.tool_calls ?? [],
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}