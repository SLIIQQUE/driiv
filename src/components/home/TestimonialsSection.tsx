"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Star, Quote, ArrowRight, Bot, Bell, BarChart3, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Surrey",
    text: "I booked my inaugural lesson at 11 PM on a Tuesday and received confirmation before I put my phone down. The automated pulses meant I never once lost a session. After every lesson, the digital dashboard revealed my progress with surgical clarity. Passed my Class 7 on the first attempt. From first click to license — entirely frictionless.",
    rating: 5,
    tag: "Class 7, First Try",
  },
  {
    name: "James Thompson",
    location: "Langley",
    text: "Zero experience to licensed in fourteen days. The AI concierge answered every question before I committed. I paid online, received reminders before each rendezvous, and the progress metrics showed me compounding skill gains session by session. No paperwork. No phone calls. Pure modern mastery.",
    rating: 5,
    tag: "Intensive Graduate",
  },
  {
    name: "Emma Richardson",
    location: "Delta",
    text: "After failing twice with conventional schools, RYDAX diagnosed and corrected my deficiencies in three sessions. The ability to book online, pay by card, and review my progress intelligence after each lesson eliminated every ounce of guesswork. The system works in perfect orchestration.",
    rating: 5,
    tag: "Test Mastery",
  },
  {
    name: "David Clarke",
    location: "Richmond",
    text: "The orchestration is what sets this apart. Booked, paid, tracked — all from a single device. Never wrote a cheque, never waited on hold. The AI answered my inquiries at midnight. This is what driving education should feel like when technology is engineered around the student.",
    rating: 5,
    tag: "Seamless Experience",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="section bg-[#030305] relative overflow-hidden">
      <motion.div className="absolute -right-40 top-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" style={{ y }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
          >
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">The proof is in the progress</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-3xl mx-auto">
            Over a thousand <br />
            <span className="text-accent">success stories.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mt-6 font-medium">
            Students consistently tell us the same thing: the seamless integration transforms the entire experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card border-white/5 p-8 lg:p-10 rounded-[2.5rem] relative group cursor-default hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-accent/10 transition-colors duration-500" />
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent/50 bg-accent/10 px-2 py-1 rounded-full">{t.tag}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8 font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-6 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-black text-white/20 text-sm hover:scale-110 hover:bg-accent/10 transition-all duration-300"
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-black text-white">{t.name}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 gap-8"
        >
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-sm"
          >
            <span>Read All Testimonials</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300"><ArrowRight className="w-4 h-4" /></span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass-card border-white/5 p-6 lg:p-10 rounded-[2.5rem]"
        >
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/30">
            <span className="flex items-center gap-2"><Bot className="w-4 h-4 text-accent" /> AI Booking</span>
            <span className="flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Auto-Reminders</span>
            <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-accent" /> Online Pay</span>
            <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> Progress Intel</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}