"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle, Bot } from "lucide-react";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export interface VoiceAssistantRef {
  open: () => void;
}

export const VoiceAssistant = forwardRef<VoiceAssistantRef>(function VoiceAssistant(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { state, toggleListening, sendMessage, speak, stopSpeaking, clearMessages } = useVoiceAssistant();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  const handleSend = async () => {
    if (!message.trim() || state.isLoading) return;
    const currentMessage = message;
    setMessage("");
    await sendMessage(currentMessage);
  };

  useEffect(() => {
    if (state.messages.length > 0) {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage.role === "assistant" && isOpen) {
        speak(lastMessage.content);
      }
    }
  }, [state.messages, isOpen, speak]);

  const handleOpenAI = () => {
    setIsOpen(true);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpenAI}
        data-voice-button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg flex items-center justify-center touch-manipulation"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-7 h-7 text-black" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-2 md:bottom-24 md:right-6 z-100 w-[calc(100vw-1rem)] md:w-80 md:lg:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-white/50">Rydax</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" aria-label="Close chat">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {state.messages.length === 0 && (
                <div className="text-center text-white/40 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Hi! How can I help you today?</p>
                  <p className="text-xs mt-2">I can help with lessons, pricing, or bookings.</p>
                </div>
              )}
              
              {state.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-black rounded-br-md"
                      : "bg-white/10 text-white rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {state.isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/50 p-3 rounded-2xl rounded-bl-md text-sm">
                    Thinking...
                  </div>
                </div>
              )}

              {state.error && (
                <div className="text-primary-light text-xs text-center p-2 bg-primary/10 rounded-lg">
                  {state.error}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/50"
                  disabled={state.isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || state.isLoading}
                  className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Send message"
                >
                  <Bot className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleListening}
                    disabled={state.isLoading}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      state.isListening
                        ? "bg-primary animate-pulse"
                        : "bg-white/10"
                    } hover:bg-white/20 disabled:opacity-50`}
                    aria-label={state.isListening ? "Stop listening" : "Start voice input"}
                  >
                    {state.isListening ? (
                      <MicOff className="w-4 h-4 text-white" />
                    ) : (
                      <Mic className="w-4 h-4 text-white/70" />
                    )}
                  </button>

                  <button
                    onClick={() => state.isSpeaking ? stopSpeaking() : null}
                    disabled={!state.isSpeaking && state.messages.length === 0}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30 hover:bg-white/20"
                    aria-label={state.isSpeaking ? "Stop speaking" : "Play audio"}
                  >
                    {state.isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white/50" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={clearMessages}
                    className="text-[10px] uppercase tracking-wider text-white/30 hover:text-white/70 transition-colors"
                    aria-label="Clear chat history"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});