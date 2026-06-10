"use client";

import { useState, useCallback, useRef } from "react";
import type { VoiceMessage, VoiceState, VoiceAPIResponse } from "@/types/voice";

const SUGGESTED_REPLIES_MAP: Record<string, string[]> = {
  greeting: ["Tell me about your programs", "How do I book?", "What areas do you serve?"],
  pricing: ["Tell me about Foundation Pass", "What's the Power Pack?", "Book a lesson"],
  booking: ["Foundation Pass", "Power Pack", "Mastery Bundle"],
  default: ["View Pricing", "Book a Lesson", "Service Areas"],
};

function getSuggestedReplies(content: string): string[] {
  const lower = content.toLowerCase();
  if (lower.includes("program") || lower.includes("package") || lower.includes("pricing") || lower.includes("cost") || lower.includes("$")) {
    return SUGGESTED_REPLIES_MAP.pricing;
  }
  if (lower.includes("book") || lower.includes("schedule") || lower.includes("lesson") || lower.includes("name") || lower.includes("date") || lower.includes("time")) {
    return SUGGESTED_REPLIES_MAP.booking;
  }
  if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey") || lower.includes("welcome") || lower.includes("help")) {
    return SUGGESTED_REPLIES_MAP.greeting;
  }
  if (lower.includes("area")) {
    return SUGGESTED_REPLIES_MAP.default;
  }
  return SUGGESTED_REPLIES_MAP.default;
}

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceState>({
    isLoading: false,
    messages: [],
    error: null,
    bookingInProgress: false,
    suggestedReplies: [],
  });

  const messagesRef = useRef<VoiceMessage[]>([]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };

    messagesRef.current = [...messagesRef.current, userMessage];
    setState((s) => ({
      ...s,
      messages: [...messagesRef.current],
      isLoading: true,
      error: null,
      suggestedReplies: [],
    }));

    try {
      const payload = messagesRef.current.map(({ role, content }) => ({ role, content }));
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const data: VoiceAPIResponse = await response.json();

      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "I can help you with that!",
        timestamp: Date.now(),
        booking: data.booking
          ? {
              name: data.booking.data?.customerName as string,
              phone: data.booking.data?.phone as string,
              email: data.booking.data?.email as string,
              preferredDate: data.booking.data?.preferredDate as string,
              preferredTime: data.booking.data?.preferredTime as string,
              lessonName: data.booking.data?.lessonName as string,
              lessonPrice: data.booking.data?.lessonPrice as string,
            }
          : undefined,
        toolCallResult: data.booking || undefined,
      };

      messagesRef.current = [...messagesRef.current, assistantMessage];

      const suggestedReplies = getSuggestedReplies(data.content);

      setState((s) => ({
        ...s,
        messages: [...messagesRef.current],
        isLoading: false,
        bookingInProgress: !!data.booking?.success || false,
        suggestedReplies,
      }));
    } catch {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: "Failed to get response. Please check your connection.",
      }));
    }
  }, []);

  const sendQuickAction = useCallback((action: string) => {
    const actionMap: Record<string, string> = {
      "Book a Lesson": "I'd like to book a driving lesson",
      "View Pricing": "What are your prices and programs?",
      "Pricing": "Tell me about your programs and pricing",
      "Service Areas": "What areas do you serve?",
      "Foundation Pass": "Tell me about the Foundation Pass",
      "Power Pack": "Tell me about the Power Pack",
      "Mastery Bundle": "Tell me about the Mastery Bundle",
      "Book Now": "I'd like to book a lesson",
      "How do I book?": "How do I book a driving lesson?",
      "Tell me about your programs": "What programs do you offer?",
      "What areas do you serve?": "What service areas do you cover?",
      "Book a session": "I'd like to book a session",
    };
    sendMessage(actionMap[action] || action);
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setState((s) => ({
      ...s,
      messages: [],
      error: null,
      bookingInProgress: false,
      suggestedReplies: [],
    }));
  }, []);

  return {
    state,
    sendMessage,
    sendQuickAction,
    clearMessages,
  };
}
