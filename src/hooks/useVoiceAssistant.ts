"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { VoiceMessage, VoiceState, VoiceAPIResponse } from "@/types/voice";
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "@/types/speech-recognition";

const SUGGESTED_REPLIES_MAP: Record<string, string[]> = {
  greeting: ["Tell me about your programs", "How do I book?", "What areas do you serve?"],
  pricing: ["Tell me about Foundation Pass", "What's the Power Pack?", "Book a lesson"],
  booking: ["Foundation Pass", "Power Pack", "Mastery Bundle"],
  contact: ["What's your phone number?", "Where are you located?", "What are your hours?"],
  default: ["View Pricing", "Book a Lesson", "Service Areas"],
};

function getSuggestedReplies(content: string): string[] {
  const lower = content.toLowerCase();
  if (lower.includes("program") || lower.includes("package") || lower.includes("pricing") || lower.includes("cost") || lower.includes("$")) {
    return SUGGESTED_REPLIES_MAP.pricing;
  }
  if (lower.includes("book") || lower.includes("schedule") || lower.includes("lesson") || lower.includes("name") || lower.includes("phone") || lower.includes("email") || lower.includes("date") || lower.includes("time")) {
    return SUGGESTED_REPLIES_MAP.booking;
  }
  if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey") || lower.includes("welcome") || lower.includes("help")) {
    return SUGGESTED_REPLIES_MAP.greeting;
  }
  if (lower.includes("area") || lower.includes("location") || lower.includes("phone") || lower.includes("hour") || lower.includes("contact")) {
    return SUGGESTED_REPLIES_MAP.contact;
  }
  return SUGGESTED_REPLIES_MAP.default;
}

function getSpeechRecognitionAPI(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  return (
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition ||
    null
  );
}

function getSpeechSynthesisAPI(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis || null;
}

// Preferred TTS voices in priority order (tries each until one matches)
const PREFERRED_VOICES = [
  "Samantha",
  "Google UK English Female",
  "Google US English",
  "Karen",
  "Daniel",
  "Alex",
  "Microsoft Zira",
  "Microsoft David",
];

function findPreferredVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const name of PREFERRED_VOICES) {
    const match = voices.find(
      (v) => v.name === name || v.name.includes(name),
    );
    if (match) return match;
  }
  // Fallback: pick a voice with lang en-US if available
  return voices.find((v) => v.lang.startsWith("en-US")) || voices.find((v) => v.lang.startsWith("en")) || null;
}

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isLoading: false,
    messages: [],
    error: null,
    bookingInProgress: false,
    suggestedReplies: [],
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesRef = useRef<VoiceMessage[]>([]);

  // Detect voice support once on mount
  const [voiceSupport] = useState(() => {
    const sr = getSpeechRecognitionAPI();
    const ss = getSpeechSynthesisAPI();
    return {
      speechRecognition: sr !== null,
      speechSynthesis: ss !== null,
    };
  });

  // Store whether a TTS utterance is currently active
  const speakingRef = useRef(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const voicesLoadedRef = useRef(false);

  // Load voices once (they load asynchronously on some browsers)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        voicesRef.current = voices;
        voicesLoadedRef.current = true;
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.addEventListener("voiceschanged", loadVoices);
    }

    return () => {
      if (synth.onvoiceschanged !== undefined) {
        synth.removeEventListener("voiceschanged", loadVoices);
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Try to pick a natural-sounding voice
    if (voicesRef.current.length > 0) {
      const preferred = findPreferredVoice(voicesRef.current);
      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onstart = () => {
      speakingRef.current = true;
      setState((s) => ({ ...s, isSpeaking: true }));
    };
    utterance.onend = () => {
      speakingRef.current = false;
      setState((s) => ({ ...s, isSpeaking: false }));
    };
    utterance.onerror = () => {
      speakingRef.current = false;
      setState((s) => ({ ...s, isSpeaking: false }));
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    speakingRef.current = false;
    setState((s) => ({ ...s, isSpeaking: false }));
  }, []);

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
      "Contact": "How can I contact you?",
      "Foundation Pass": "Tell me about the Foundation Pass",
      "Power Pack": "Tell me about the Power Pack",
      "Mastery Bundle": "Tell me about the Mastery Bundle",
      "Book Now": "I'd like to book a lesson",
      "What are your hours?": "What are your operating hours?",
      "Where are you located?": "What is your address?",
      "What's your phone number?": "What's your phone number?",
      "How do I book?": "How do I book a driving lesson?",
      "Tell me about your programs": "What programs do you offer?",
      "What areas do you serve?": "What service areas do you cover?",
      "Book a session": "I'd like to book a session",
    };
    sendMessage(actionMap[action] || action);
  }, [sendMessage]);

  const startListening = useCallback(async () => {
    const SpeechRecognitionAPI = getSpeechRecognitionAPI();

    if (!SpeechRecognitionAPI) {
      setState((s) => ({
        ...s,
        error: "Speech recognition requires Chrome, Edge, or Safari.",
      }));
      return;
    }

    // Request mic permission once. Don't stop tracks until recognition ends.
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setState((s) => ({
            ...s,
            error: "Microphone access denied. Check your browser settings.",
          }));
          return;
        }
      }
      setState((s) => ({
        ...s,
        error: "Could not access microphone. Check your system settings.",
      }));
      return;
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }

    const recognition = new SpeechRecognitionAPI() as unknown as SpeechRecognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setState((s) => ({ ...s, isListening: true, error: null }));
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result[0]?.transcript) {
          transcript += result[0].transcript;
        }
      }

      const isFinal = event.results[event.results.length - 1]?.isFinal;

      if (isFinal && transcript.trim()) {
        await sendMessage(transcript);
      } else if (isFinal && !transcript.trim()) {
        setState((s) => ({ ...s, isListening: false, error: "No speech detected. Try again." }));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMap: Record<string, string> = {
        "not-allowed": "Microphone access denied.",
        "no-speech": "No speech detected. Try again.",
        network: "A network error occurred.",
        aborted: "Listening was cancelled.",
      };
      setState((s) => ({
        ...s,
        isListening: false,
        error: errorMap[event.error] || `Microphone error: ${event.error}`,
      }));
    };

    recognition.onend = () => {
      setState((s) => ({ ...s, isListening: false }));
      // Release the mic stream after recognition ends
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error("recognition.start() failed:", err);
      setState((s) => ({ ...s, isListening: false, error: "Could not start listening." }));
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    }
  }, [sendMessage]);

  const toggleListening = useCallback(() => {
    if (state.isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    } else {
      startListening();
    }
  }, [state.isListening, startListening]);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch { /* ignore */ }
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    state,
    voiceSupport,
    toggleListening,
    sendMessage,
    sendQuickAction,
    speak,
    stopSpeaking,
    clearMessages,
  };
}
