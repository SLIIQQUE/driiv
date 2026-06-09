"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  BookOpen,
  CreditCard,
  Shield,
  Clock,
  MessageCircle,
  Bot,
  Bell,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Booking & Scheduling",
    icon: BookOpen,
    items: [
      {
        q: "How do I book a session?",
        a: "Navigate to any 'Book a Lesson' interface or engage our AI concierge via the voice button. You'll access real-time calendar visibility and receive instantaneous confirmation — no telephone calls, no waiting periods.",
      },
      {
        q: "Can I reschedule or cancel online?",
        a: "Absolutely. Access your portal and adjust your booking up to 24 hours before your session. Automated pulses maintain your cadence. Modifications are immediate — entirely self-service.",
      },
      {
        q: "Are weekend and evening sessions available?",
        a: "Yes. Our calendar operates seven days per week with early morning through evening availability. Online booking reveals all open slots in real time.",
      },
    ],
  },
  {
    category: "Payments",
    icon: CreditCard,
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "All major credit cards, debit, and e-transfers. Every transaction processes through our encrypted portal. Physical currency is never required.",
      },
      {
        q: "Do you offer session packages?",
        a: "Yes. The Power Pack (5 sessions, save $25) and Mastery Bundle (10 sessions, save $100) represent our optimal investments. Foundation Pass ($55/session) is available for pay-as-you-go learners.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Full reimbursement for cancellations 48+ hours before a session. Packages are reimbursed pro-rata. All refunds return to your original payment method — no cheques.",
      },
    ],
  },
  {
    category: "Licensing & Examinations",
    icon: Shield,
    items: [
      {
        q: "Do you prepare for ICBC road tests?",
        a: "Absolutely. Our Final Edge program includes test circuit simulation, nerve-calibrating techniques, and a comprehensive skills audit. We provide our dual-control vehicle for your actual examination.",
      },
      {
        q: "What is your first-attempt pass rate?",
        a: "95% of our students pass their ICBC Class 7 or Class 5 road examination on the first attempt. Your test-readiness score is visible in your progress nexus in real time.",
      },
      {
        q: "Can I use your vehicle for my road test?",
        a: "Yes. Our dual-control fleet is ICBC-inspected and comprehensively insured for road examinations. Vehicle provision can be arranged with any of our programs.",
      },
    ],
  },
  {
    category: "The Experience",
    icon: Clock,
    items: [
      {
        q: "Do I need prior driving experience?",
        a: "None whatsoever. Foundation Training is architected for absolute novices. We commence in empty parking lots and progress systematically. Book your first session online.",
      },
      {
        q: "How does the AI concierge function?",
        a: "Engage the voice interface on any page to inquire, check availability, or book sessions. It operates 24/7 and handles every interaction instantaneously.",
      },
      {
        q: "Which areas do you serve?",
        a: "Surrey, Langley, Delta, Richmond, Burnaby, New Westminster, and surrounding Metro Vancouver communities. Pickup and drop-off are included.",
      },
    ],
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <section className="container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          {faqs.map((group, gi) => (
            <div
              key={gi}
              className="glass-card border-white/5 p-8 lg:p-10 rounded-[2rem]"
            >
              <div className="flex items-center gap-3 mb-8">
                <group.icon className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">{group.category}</h2>
              </div>

              <div className="space-y-1">
                {group.items.map((item, ii) => {
                  const idx = `${gi}-${ii}`;
                  const isOpen = openIndex === idx;
                  return (
                    <div key={ii} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between py-6 text-left group"
                      >
                        <span className="text-base font-bold text-white/70 group-hover:text-white transition-colors pr-4">{item.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-white/30 shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-white/40 pb-6 text-sm font-medium leading-relaxed">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
          <div className="glass-card border-white/5 p-8 lg:p-12 rounded-[2rem]">
            <MessageCircle className="w-12 h-12 text-accent mb-8" />
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Still Have Questions?</h3>
            <p className="text-white/40 text-sm font-medium mb-8">Our AI concierge operates 24/7. Or send us a message.</p>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="group relative w-full py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 overflow-hidden shadow-2xl shadow-accent/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Contact Us
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <div className="text-center text-[10px] font-black uppercase tracking-widest text-white/20">Or call: (604) 123-4567</div>
            </div>
          </div>

          <div className="glass-card border-white/5 p-8 lg:p-10 rounded-[2rem]">
            <div className="text-center">
              <div className="text-xs font-black uppercase tracking-widest text-accent mb-4">Every booking includes</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Bot, label: "AI Concierge" },
                  { icon: Bell, label: "Reminders" },
                  { icon: CreditCard, label: "Online Pay" },
                  { icon: BarChart3, label: "Progress Intel" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-accent mb-2" />
                    <span className="text-[10px] font-bold text-white/30 uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
