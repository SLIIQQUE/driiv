"use client";

import { motion } from "motion/react";
import { Check, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { LESSONS } from "@/types/booking";

interface Props {
  selectedLesson: string | null;
  onSelectLesson: (id: string) => void;
}

export default function StepLesson({ selectedLesson, onSelectLesson }: Props) {
  return (
    <motion.div
      key="lesson"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/20 bg-accent/10 rounded-full mb-3"
        >
          <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
          <span className="text-xs font-black uppercase tracking-widest text-accent/70">
            Choose your program
          </span>
        </motion.div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
          Select a <span className="text-accent">Lesson</span> Package
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {LESSONS.map((l, i) => (
          <motion.button
            type="button"
            key={l.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => onSelectLesson(l.id)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectLesson(l.id);
              }
            }}
            className={`premium-card p-5 flex flex-col group relative overflow-hidden cursor-pointer text-left transition-all duration-500 ${
              selectedLesson === l.id
                ? "border-accent/50 bg-accent/[0.03] ring-1 ring-accent/30 shadow-2xl shadow-accent/10"
                : "hover:border-accent/20"
            }`}
          >
            {l.popular && (
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-0.5 bg-accent text-primary text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20">
                  Best Value
                </span>
              </div>
            )}

            <div
              className={`w-10 h-10 rounded-xl bg-linear-to-br ${l.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
            >
              <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>

            <div className="mb-4">
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-accent/60 mb-0.5">
                {l.period}
              </div>
              <h3 className="text-base font-black text-white uppercase tracking-tighter">
                {l.name}
              </h3>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-black text-white tracking-tighter">
                {l.price}
              </span>
              {l.savings && (
                <span className="text-xs font-black text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                  {l.savings}
                </span>
              )}
            </div>

            <p className="text-xs text-white/40 font-medium leading-relaxed mb-4 line-clamp-2">
              {l.description}
            </p>

            <div className="space-y-1.5 mb-5 flex-1">
              {l.features.slice(0, 4).map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-xs font-bold text-white/50">
                  <Check className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                  {f}
                </div>
              ))}
            </div>

            <div
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                selectedLesson === l.id
                  ? "bg-accent text-primary shadow-lg shadow-accent/20"
                  : "bg-white/5 text-white/60 group-hover:bg-white/10"
              }`}
            >
              {selectedLesson === l.id ? "Selected" : "Select"}
              <ArrowRight className="w-3 h-3" />
            </div>
            </motion.button>
        ))}
      </div>


    </motion.div>
  );
}
