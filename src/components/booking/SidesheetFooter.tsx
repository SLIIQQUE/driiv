"use client";

import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface SidesheetFooterProps {
  step: "lesson" | "datetime" | "details" | "confirm";
  canProceed: boolean;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onConfirm: () => void;
}

export default function SidesheetFooter({
  step,
  canProceed,
  submitting,
  onBack,
  onNext,
  onConfirm,
}: SidesheetFooterProps) {
  return (
    <div className="sticky bottom-0 z-10 bg-[#0a0f1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-5">
      {step !== "confirm" ? (
        <div className="flex items-center gap-4">
          {step !== "lesson" && (
            <button
              onClick={onBack}
              disabled={submitting}
              className="group relative flex-1 py-4 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </span>
            </button>
          )}

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`group relative py-4 bg-accent text-primary rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed ${
              step === "lesson" ? "w-full" : "flex-1"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Continue <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            disabled={submitting}
            className="group relative flex-1 py-4 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </span>
          </button>

          <button
            onClick={onConfirm}
            disabled={submitting}
            className="group relative flex-1 py-4 bg-accent text-primary rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-50"
          >
            {submitting ? (
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Booking...
              </span>
            ) : (
              <>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Confirm Booking <Check className="w-3.5 h-3.5" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
