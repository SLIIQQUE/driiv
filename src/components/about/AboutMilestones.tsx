"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const milestones = [
  { year: "2019", event: "RYDAX founded in Surrey", detail: "A single dual-control vehicle and a vision: prove that driver education can be as sophisticated as the vehicles on the road." },
  { year: "2021", event: "500 Students Certified", detail: "93% first-attempt pass rate achieved through pure instructional excellence — still operating on paper logs." },
  { year: "2023", event: "AI Concierge Launched", detail: "Students could finally book, reschedule, and inquire 24/7 without a single phone call. The friction started to dissolve." },
  { year: "2024", event: "1,000+ Students Served", detail: "Expansion to six cities. Automated reminders, encrypted payments, and progress intelligence became standard equipment." },
  { year: "2025", event: "Ecosystem Complete", detail: "AI booking, secure pay, auto-reminders, and progress intelligence — all orchestrated seamlessly. One click from inquiry to license." },
];

export function AboutMilestones() {
  return (
    <section className="mb-40 lg:mb-64">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Our trajectory</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            The Evolution
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex gap-8 pb-16 last:pb-0 relative"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center font-black z-10 shadow-2xl shadow-accent/10 text-sm hover:scale-110 hover:rotate-6 transition-transform duration-300"
                >
                  {m.year.slice(2)}
                </div>
                {i < milestones.length - 1 && (
                  <motion.div
                    className="w-px flex-1 bg-linear-to-b from-accent/30 to-transparent mt-4"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
              <div className="pt-4">
                <div className="text-xs font-black uppercase tracking-widest text-accent mb-2">{m.year}</div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">{m.event}</h3>
                <p className="text-white/40 font-medium">{m.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
