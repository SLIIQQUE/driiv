"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui";
import {
  Sparkles,
  CheckCircle2,
  Bot,
  Calendar,
  CreditCard,
  BarChart3,
  Bell,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Voice Concierge",
    tagline: "Your 24/7 co-pilot",
    description:
      "Inquire, check availability, or book a session — all through natural conversation. No holds, no voicemail, no friction. The concierge integrates directly with our live calendar, revealing real-time availability instantaneously.",
    highlights: [
      "Answers inquiries on pricing, availability, programs",
      "Books sessions without human intervention",
      "Integrates with live calendar — zero conflicts",
      "Transfers to a human when required",
    ],
    stat: "60s",
    statLabel: "Average booking velocity",
  },
  {
    icon: Calendar,
    title: "Intelligent Scheduling",
    tagline: "Your rhythm, your calendar",
    description:
      "Real-time visibility into every open slot. Book a single session or an entire bundle — online, instantaneous. Reschedule with 24-hour notice. Automated confirmations lock your entire cadence.",
    highlights: [
      "Real-time slot visibility — no guesswork",
      "Seven-day calendar including weekends",
      "Online rescheduling — entirely self-service",
      "Instantaneous SMS & email confirmations",
    ],
    stat: "24/7",
    statLabel: "Booking availability",
  },
  {
    icon: CreditCard,
    title: "Encrypted Payments",
    tagline: "Cashless. Frictionless.",
    description:
      "All transactions process through our encrypted portal. Card, debit, or e-transfer — your preference. Automated receipts delivered instantaneously. Bundles unlock savings up to $100.",
    highlights: [
      "Encrypted transaction processing",
      "Credit card, debit & e-transfer accepted",
      "Instantaneous digital receipts",
      "Bundle discounts up to $100",
    ],
    stat: "100%",
    statLabel: "Digital transactions",
  },
  {
    icon: Bell,
    title: "Automated Pulses",
    tagline: "Never lose a session",
    description:
      "SMS and email alerts fire automatically before every rendezvous. Your instructor's arrival time, your pickup coordinates, your preparation checklist — all delivered before you need to ask.",
    highlights: [
      "24-hour advance SMS pulse",
      "Email confirmation with pickup details",
      "Instructor arrival notification",
      "Reschedule link in every reminder",
    ],
    stat: "0",
    statLabel: "Missed sessions with pulses",
  },
  {
    icon: BarChart3,
    title: "Progress Intelligence",
    tagline: "Your trajectory, measured",
    description:
      "After every session, your instructor logs your performance in our digital nexus. Watch your skills compound session by session. Know the precise moment you're examination-ready.",
    highlights: [
      "Digital report after every session",
      "Skill-by-skill dissection (parking, highway, etc.)",
      "Test-readiness score — know when you're ready",
      "Share trajectory with parents or guardians",
    ],
    stat: "95%",
    statLabel: "First-attempt pass rate",
  },
  {
    icon: Smartphone,
    title: "Unified Ecosystem",
    tagline: "One interface. Everything.",
    description:
      "Booking, payments, pulses, and progress — all orchestrated through a single, cohesive experience. No disparate applications, no cross-platform logins. Everything converges seamlessly.",
    highlights: [
      "Single portal governing everything",
      "Functions on any device — phone, tablet, laptop",
      "No separate applications required",
      "All features interoperate seamlessly",
    ],
    stat: "1",
    statLabel: "Platform for everything",
  },
];

export function FeatureCards() {
  return (
    <section className="container mb-20 lg:mb-32">
      <div className="text-center my-16">
        <Badge icon={<Sparkles className="w-4 h-4 text-accent" />}>
          The full ecosystem
        </Badge>
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mt-10">
          Everything <span className="text-accent">orchestrated.</span>
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto mt-4 font-medium">
          Each component converges seamlessly. Book → Pay → Pulse → Track. Zero
          gaps, zero friction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card border-white/5 p-8 lg:p-10 rounded-[2rem] group hover:border-accent/20 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 cursor-default"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all hover:scale-110 hover:rotate-6 duration-300">
              <item.icon className="w-7 h-7 text-accent" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-1">
              {item.tagline}
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-white/40 font-medium leading-relaxed mb-6">
              {item.description}
            </p>
            <div className="space-y-2 pt-6 border-t border-white/5 mb-6">
              {item.highlights.map((h, j) => (
                <div
                  key={j}
                  className="flex items-start gap-2 text-xs font-bold text-white/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />{" "}
                  {h}
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-1 hover:translate-x-1 transition-transform duration-300">
              <span className="text-3xl font-black text-accent">
                {item.stat}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                {item.statLabel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
