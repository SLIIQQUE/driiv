"use client";

import { X } from "lucide-react";
import type { Step } from "@/lib/booking-utils";

interface SidesheetHeaderProps {
  step: Step;
  stepProgress: number;
  onClose: () => void;
}

const stepLabels: Record<Step, string> = {
  lesson: "Select Program",
  datetime: "Date & Time",
  details: "Your Details",
  confirm: "Confirm Booking",
};

const steps: Step[] = ["lesson", "datetime", "details", "confirm"];

const stepShortLabels: Record<Step, string> = {
  lesson: "Program",
  datetime: "Schedule",
  details: "Info",
  confirm: "Confirm",
};

export function SidesheetHeader({ step, stepProgress, onClose }: SidesheetHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-accent">
            Step {stepProgress} of 4
          </p>
          <h2 className="text-lg font-black text-white tracking-tight mt-0.5">
            {stepLabels[step]}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Close booking"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 px-6 pb-5">
        {steps.map((s, i) => {
          const isActive = s === step;
          const currentIdx = steps.indexOf(step);
          const isComplete = currentIdx > i;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-accent shadow-lg shadow-accent/30 scale-125"
                    : isComplete
                    ? "bg-accent/60"
                    : "bg-white/20"
                }`}
              />
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isActive ? "text-accent" : isComplete ? "text-white/40" : "text-white/50"
                }`}
              >
                {stepShortLabels[s]}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-6 h-px ${
                    isComplete ? "bg-accent/40" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
