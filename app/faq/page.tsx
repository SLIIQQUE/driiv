"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What do I need for my first lesson?",
        a: "You must bring your valid BC Learner's License (Class 7L) and wear comfortable, flat-soled shoes. We provide the vehicle (fully insured with dual-controls) for all training sessions.",
      },
      {
        q: "How many lessons will I need to pass?",
        a: "This varies significantly between students. On average, beginners require 10-15 hours of professional instruction combined with private practice. Our instructors will give you a personalized assessment after your first session.",
      },
    ],
  },
  {
    category: "The Road Test",
    questions: [
      {
        q: "Can I use the school car for my ICBC road test?",
        a: "Yes! We offer a specific 'Road Test Package' which includes a warm-up lesson and use of our vehicle for the actual test. Booking this ensures you're driving the car you've trained in.",
      },
      {
        q: "Where do we meet for lessons?",
        a: "We offer door-to-door service across Surrey, Langley, and Delta. We can pick you up from home, school, or work and drop you off at the same or a different location within our service area.",
      },
    ],
  },
  {
    category: "Policies & Safety",
    questions: [
      {
        q: "What is your cancellation policy?",
        a: "We require 24 hours notice for all cancellations or rescheduling. This allows us to offer the slot to other students. Cancellations with less than 24h notice may be subject to a fee.",
      },
      {
        q: "Are the instructors ICBC certified?",
        a: "Absolutely. Every Rydax instructor is fully licensed and bonded by ICBC. We undergo regular training audits to ensure our curriculum stays at the highest level of provincial safety standards.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Cinematic Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Knowledge Hub
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Common <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              Inquiries.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            Everything you need to know about starting your driving journey,
            road test protocols, and our studio standards.
          </p>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Grid Layout: Quick Info + Accordions */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Quick Support Cards (Left Column) */}
          <div className="lg:col-span-4 space-y-6">
            {[
              {
                icon: MessageSquare,
                title: "Live Support",
                desc: "Available 8am - 8pm daily",
                color: "text-accent",
              },
              {
                icon: ShieldCheck,
                title: "Verified Safety",
                desc: "ICBC Licensed & Bonded",
                color: "text-white",
              },
              {
                icon: Zap,
                title: "Fast Booking",
                desc: "Immediate slot confirmation",
                color: "text-accent",
              },
              {
                icon: Globe,
                title: "Language Support",
                desc: "English, Punjabi, Hindi",
                color: "text-white",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card border-white/5 p-8 rounded-[2.5rem] group"
              >
                <card.icon className={`w-8 h-8 mb-4 ${card.color}`} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-white/40 font-medium">{card.desc}</p>
              </motion.div>
            ))}

            <div className="pt-8">
              <Link
                href="/contact"
                className="w-full py-6 bg-accent text-primary rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-accent/20"
              >
                Ask a Custom Question <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Accordion Content (Right Column) */}
          <div className="lg:col-span-8 space-y-16">
            {faqs.map((group, groupIdx) => (
              <div key={groupIdx}>
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-10 pb-4 border-b border-white/5 flex items-center gap-3">
                  <span className="text-accent italic font-mono text-sm">
                    0{groupIdx + 1}
                  </span>{" "}
                  {group.category}
                </h2>

                <div className="space-y-4">
                  {group.questions.map((faq, i) => {
                    const id = `${groupIdx}-${i}`;
                    const isOpen = activeQuestion === id;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`
                          group glass-card border-white/5 overflow-hidden transition-all duration-500
                          ${isOpen ? "bg-white/5 border-accent/20" : "hover:border-white/10"}
                        `}
                        style={{ borderRadius: "2rem" }}
                      >
                        <button
                          onClick={() => setActiveQuestion(isOpen ? null : id)}
                          className="w-full p-8 lg:p-10 flex items-center justify-between text-left"
                        >
                          <span
                            className={`text-xl font-black transition-colors ${isOpen ? "text-accent" : "text-white"}`}
                          >
                            {faq.q}
                          </span>
                          <div
                            className={`
                            w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500
                            ${isOpen ? "bg-accent text-primary rotate-180" : "bg-white/5 text-white/40"}
                          `}
                          >
                            {isOpen ? (
                              <Minus className="w-5 h-5" />
                            ) : (
                              <Plus className="w-5 h-5" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                              <div className="px-8 lg:px-10 pb-10">
                                <div className="w-full h-px bg-white/5 mb-8" />
                                <p className="text-lg text-white/50 leading-relaxed font-medium">
                                  {faq.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Trust Sign off */}
      <section className="container mt-40">
        <div className="premium-card p-12 lg:p-20 text-center border-white/5 bg-accent/5">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-8">
            Still have{" "}
            <span className="text-accent italic underline decoration-accent/20 decoration-8 underline-offset-12">
              doubts?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-white/60 font-bold">
              <HelpCircle className="w-5 h-5 text-accent" /> Personalized
              consults available
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <Link
              href="/contact"
              className="text-white font-black uppercase tracking-widest text-sm hover:text-accent transition-colors"
            >
              Contact Instructor Direct →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
