"use client";

import { useState, useCallback, useRef } from "react";

export interface VoiceMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  messages: VoiceMessage[];
  error: string | null;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isLoading: false,
    messages: [],
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesRef = useRef<VoiceMessage[]>([]);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      setState((s) => ({
        ...s,
        error: "Text-to-speech not supported in this browser",
      }));
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setState((s) => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState((s) => ({ ...s, isSpeaking: false }));
    utterance.onerror = () => setState((s) => ({ ...s, isSpeaking: false }));

    synth.speak(utterance);
    synthRef.current = synth;
  }, []);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setState((s) => ({ ...s, isSpeaking: false }));
    }
  }, []);

  const handleBooking = useCallback(
    async (bookingData: Record<string, unknown>) => {
      try {
        const response = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          throw new Error("Booking failed");
        }
      } catch {
        // Booking failed silently
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        return;
      }

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
      }));

      try {
        const payload = messagesRef.current.map(({ role, content }) => ({
          role,
          content,
        }));

        const response = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.toolCalls) && data.toolCalls.length > 0) {
          for (const toolCall of data.toolCalls) {
            if (toolCall?.function?.name === "book_lesson") {
              try {
                const args = JSON.parse(toolCall.function.arguments);
                await handleBooking(args);
              } catch {
                // Silently ignore parse errors
              }
            }
          }
        }

        const assistantMessage: VoiceMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "I can help you with that!",
          timestamp: Date.now(),
        };

        messagesRef.current = [...messagesRef.current, assistantMessage];
        setState((s) => ({
          ...s,
          messages: [...messagesRef.current],
          isLoading: false,
        }));

        if (data.content) {
          speak(data.content);
        }
      } catch {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: "Failed to get response",
        }));
      }
    },
    [handleBooking, speak],
  );

  const startListening = useCallback(async () => {
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setState((s) => ({
        ...s,
        error: "Microphone access requires a secure context (HTTPS or localhost). Your current connection is insecure.",
      }));
      return;
    }

    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionAPI) {
      setState((s) => ({
        ...s,
        error: "Speech recognition not supported. Please use Chrome, Edge, or Safari.",
      }));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setState((s) => ({
          ...s,
          error: "Microphone access denied. Please click the Lock icon in your address bar and set Microphone to 'Allow'.",
        }));
        return;
      }
      setState((s) => ({
        ...s,
        error: "Could not access microphone. Please check your system settings.",
      }));
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition =
      new SpeechRecognitionAPI() as unknown as SpeechRecognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onstart = () => {
      setState((s) => ({ ...s, isListening: true, error: null }));
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = Array.from({ length: event.results.length })
        .map((_, i) => event.results[i][0].transcript)
        .join("");

      const isFinal = event.results[event.results.length - 1]?.isFinal;

      if (isFinal && transcript.trim()) {
        await sendMessage(transcript);
      } else if (isFinal && !transcript.trim()) {
        setState((s) => ({
          ...s,
          isListening: false,
          error: "No speech detected. Please try again.",
        }));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMessage = `Microphone error: ${event.error}`;
      
      if (event.error === "not-allowed") {
        errorMessage = "Microphone access denied. Please ensure your site is running on localhost or HTTPS.";
      } else if (event.error === "no-speech") {
        errorMessage = "No speech detected. Please try again.";
      } else if (event.error === "network") {
        errorMessage = "A network error occurred. Please check your connection.";
      }

      setState((s) => ({
        ...s,
        isListening: false,
        error: errorMessage,
      }));
    };

    recognition.onend = () => {
      setState((s) => ({ ...s, isListening: false }));
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error(err);
    }
  }, [sendMessage]);

  const toggleListening = useCallback(() => {
    if (state.isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      startListening();
    }
  }, [state.isListening, startListening]);

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setState((s) => ({ ...s, messages: [], error: null }));
  }, []);

  return {
    state,
    startListening,
    toggleListening,
    sendMessage,
    speak,
    stopSpeaking,
    clearMessages,
  };
}