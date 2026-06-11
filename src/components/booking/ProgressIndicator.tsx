"use client";

import { Check } from "lucide-react";

interface Props {
  stepProgress: number;
}

export default function ProgressIndicator({ stepProgress }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 mb-16">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${
              stepProgress >= s
                ? "bg-accent text-primary shadow-lg shadow-accent/20"
                : "bg-white/5 text-white/20"
            }`}
          >
            {stepProgress > s ? <Check className="w-4 h-4" aria-hidden="true" /> : s}
          </div>
          {s < 4 && (
            <div
              className={`w-12 h-px transition-all duration-500 ${
                stepProgress > s ? "bg-accent/50" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
