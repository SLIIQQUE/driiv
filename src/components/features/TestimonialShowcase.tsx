"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

export function TestimonialShowcase() {
  return (
    <section className="container mb-40 lg:mb-64">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card border-white/5 p-12 lg:p-20 rounded-[4rem] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-secondary-foreground/10" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent mb-6">
            <Star className="w-4 h-4 fill-accent" /> Student Perspectives
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xl text-white/60 italic leading-relaxed mb-6">
                &ldquo;The orchestration is the true differentiator. Booked, paid, tracked — all from a single device. Never wrote a cheque, never waited on hold.&rdquo;
              </p>
              <div className="font-black text-white text-sm">— David Clarke</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Richmond, BC</div>
            </div>
            <div>
              <p className="text-xl text-white/60 italic leading-relaxed mb-6">
                &ldquo;I booked at 11 PM and received confirmation instantly. Never missed a session thanks to the pulses. Progress intelligence revealed compounding improvement every lesson. Pure modern driver education.&rdquo;
              </p>
              <div className="font-black text-white text-sm">— Sarah Mitchell</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Surrey, BC</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
