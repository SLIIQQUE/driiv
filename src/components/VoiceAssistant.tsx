"use client";

import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Bot,
  Send,
  Sparkles,
  CheckCircle,
  Calendar,
  Clock,
  User,
  BookOpen,
} from "lucide-react";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export interface VoiceAssistantRef {
  open: () => void;
}

const QUICK_ACTIONS = [
  { label: "Book a Lesson", icon: BookOpen },
  { label: "Pricing", icon: Sparkles },
  { label: "Service Areas", icon: Calendar },
  { label: "Contact", icon: User },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-black" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1">
          <motion.span
            className="w-2 h-2 bg-accent/60 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 bg-accent/60 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          />
          <motion.span
            className="w-2 h-2 bg-accent/60 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

function BookingConfirmationCard({
  bookingRef,
  lessonName,
  lessonPrice,
  preferredDate,
  preferredTime,
  name,
}: {
  bookingRef?: string;
  lessonName?: string;
  lessonPrice?: string;
  preferredDate?: string;
  preferredTime?: string;
  name?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-2 border border-accent/20 bg-accent/[0.03] rounded-2xl p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight">Booking Confirmed</p>
          <p className="text-[10px] font-black text-accent/70 uppercase tracking-widest">
            Ref: {bookingRef || "—"}
          </p>
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-white/60">
        {name && (
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-accent/60" />
            <span>{name}</span>
          </div>
        )}
        {lessonName && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-3 h-3 text-accent/60" />
            <span>{lessonName}{lessonPrice ? ` — ${lessonPrice}` : ""}</span>
          </div>
        )}
        {preferredDate && (
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-accent/60" />
            <span>{preferredDate}</span>
          </div>
        )}
        {preferredTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-accent/60" />
            <span>{preferredTime}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export const VoiceAssistant = forwardRef<VoiceAssistantRef>(function VoiceAssistant(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, voiceSupport, toggleListening, sendMessage, sendQuickAction, speak, stopSpeaking, clearMessages } =
    useVoiceAssistant();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // TTS for new AI messages — only speaks once per message
  const lastSpokenRef = useRef<string | null>(null);
  useEffect(() => {
    if (state.messages.length > 0) {
      const lastMessage = state.messages[state.messages.length - 1];
      if (
        lastMessage.role === "assistant" &&
        isOpen &&
        !lastMessage.toolCallResult &&
        lastMessage.id !== lastSpokenRef.current
      ) {
        lastSpokenRef.current = lastMessage.id;
        speak(lastMessage.content);
      }
    }
  }, [state.messages, isOpen, speak]);

  const handleSend = async () => {
    if (!message.trim() || state.isLoading) return;
    const currentMessage = message;
    setMessage("");
    await sendMessage(currentMessage);
  };

  const handleOpenAI = () => {
    setIsOpen(true);
  };

  const getStatusText = () => {
    if (state.isLoading) return "Thinking...";
    if (state.isSpeaking) return "Speaking...";
    if (state.isListening) return "Listening...";
    return "Online";
  };

  const getStatusColor = () => {
    if (state.isLoading || state.isSpeaking || state.isListening) return "bg-accent";
    return "bg-emerald-400";
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpenAI}
        data-voice-button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent via-accent to-primary shadow-2xl shadow-accent/30 rounded-full flex items-center justify-center touch-manipulation hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-7 h-7 text-black" />
        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-accent/30 animate-ping opacity-25" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-2 md:bottom-24 md:right-6 z-100 w-[calc(100vw-1rem)] md:w-[28rem] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
            style={{ maxHeight: "min(680px, calc(100vh - 120px))" }}
          >
            {/* ── Header ── */}
            <div className="bg-gradient-to-r from-accent/20 via-primary/10 to-transparent px-5 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-tight">RYDAX AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`} />
                      <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
                        {getStatusText()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-2 px-4 py-3 border-b border-white/5 overflow-x-auto shrink-0"
            >
              {QUICK_ACTIONS.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  onClick={() => {
                    sendQuickAction(action.label);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/20 rounded-full text-[10px] font-bold text-white/60 hover:text-accent uppercase tracking-wider whitespace-nowrap transition-all duration-200"
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </motion.button>
              ))}
            </motion.div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {state.messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/10 flex items-center justify-center">
                    <Bot className="w-8 h-8 text-accent/70" />
                  </div>
                  <p className="text-sm font-bold text-white/80 tracking-tight mb-1">
                    How can I help you?
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto">
                    I&apos;m your AI concierge. Ask me about programs, pricing, booking, or anything about RYDAX.
                  </p>
                </motion.div>
              )}

              {state.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-gradient-to-r from-accent to-accent/90 text-primary p-3.5 rounded-2xl rounded-br-md text-sm font-medium shadow-lg shadow-accent/10">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md p-3.5 text-sm text-white/80 leading-relaxed">
                          {msg.content}
                        </div>
                        {/* Booking confirmation card */}
                        {msg.toolCallResult?.success && (
                          <BookingConfirmationCard
                            bookingRef={msg.toolCallResult.bookingRef}
                            lessonName={msg.booking?.lessonName}
                            lessonPrice={msg.booking?.lessonPrice}
                            preferredDate={msg.booking?.preferredDate}
                            preferredTime={msg.booking?.preferredTime}
                            name={msg.booking?.name}
                          />
                        )}
                        {/* Booking error */}
                        {msg.toolCallResult && !msg.toolCallResult.success && (
                          <div className="mt-2 border border-red-500/20 bg-red-500/5 rounded-2xl p-3">
                            <p className="text-xs text-red-400/80">{msg.toolCallResult.error}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {state.isLoading && <TypingIndicator />}

              {/* Error */}
              {state.error && (
                <div className="flex justify-center">
                  <div className="text-[11px] font-medium text-primary-light bg-primary/10 rounded-lg px-4 py-2 max-w-xs text-center">
                    {state.error}
                  </div>
                </div>
              )}

              {/* Suggested replies */}
              {!state.isLoading && state.suggestedReplies.length > 0 && state.messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {state.suggestedReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => sendQuickAction(reply)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/20 rounded-full text-[10px] font-bold text-white/50 hover:text-accent uppercase tracking-wider transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="px-4 py-3 border-t border-white/5 bg-black/40 shrink-0">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-1 focus-within:border-accent/30 focus-within:bg-white/[0.07] transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-white/20 focus:outline-none"
                  disabled={state.isLoading}
                />
                <button
                  onClick={toggleListening}
                  disabled={state.isLoading || !voiceSupport.speechRecognition}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    state.isListening
                      ? "bg-accent/20 text-accent"
                      : !voiceSupport.speechRecognition
                        ? "bg-white/5 text-white/10 cursor-not-allowed"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                  } disabled:opacity-30`}
                  aria-label={state.isListening ? "Stop listening" : "Start voice input"}
                  title={
                    !voiceSupport.speechRecognition
                      ? "Voice input not supported in this browser"
                      : state.isListening
                        ? "Stop listening"
                        : "Voice input"
                  }
                >
                  {state.isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || state.isLoading}
                  className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity hover:bg-accent/90"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-primary" />
                </button>
              </div>

              {/* Bottom controls */}
              <div className="flex items-center justify-between mt-2 px-1">
                <button
                  onClick={() => (state.isSpeaking ? stopSpeaking() : null)}
                  disabled={!voiceSupport.speechSynthesis || (!state.isSpeaking && state.messages.length === 0)}
                  className="text-[10px] text-white/20 hover:text-white/50 transition-colors disabled:opacity-20 flex items-center gap-1"
                  aria-label={state.isSpeaking ? "Stop speaking" : "Read aloud"}
                  title={!voiceSupport.speechSynthesis ? "Text-to-speech not supported" : ""}
                >
                  {state.isSpeaking ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3" />
                  )}
                  {state.isSpeaking ? "Mute" : "Audio"}
                </button>
                <button
                  onClick={clearMessages}
                  className="text-[10px] text-white/20 hover:text-white/50 transition-colors"
                >
                  Clear chat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
