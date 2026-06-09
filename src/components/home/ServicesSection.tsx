"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Car, Zap, Star } from "lucide-react";
import { useRef } from "react";
import { Badge, EcosystemGrid, PricingCard } from "@/components/ui";
import type { PricingCardData } from "@/components/ui";

const services: PricingCardData[] = [
  {
    icon: Car,
    name: "Foundation Pass",
    subtitle: "Pay-as-you-go mastery",
    tagline: "Master the essentials",
    price: "$55",
    period: "/ session",
    description: "One-on-one mentorship in a dual-control cockpit. Book single hours online, pay securely, and watch your progress compound with every session. Zero commitment, maximum flexibility.",
    features: ["24/7 online booking — no calls ever", "Pay by card or e-transfer upfront", "Auto-reminders before every rendezvous", "Digital progress report after each session"],
    popular: false,
    cta: "Book a session",
  },
  {
    icon: Zap,
    name: "Power Pack",
    subtitle: "Save $25 — optimal momentum",
    tagline: "Our most popular program",
    price: "$250",
    period: "/ 5 sessions",
    description: "Five sessions with priority scheduling, mock assessment, and a full progress dashboard. Save $25 versus per-session pricing. The ideal launch package for new learners.",
    features: ["Save $25 versus per-session rate", "Priority calendar access", "Mock assessment included", "Full progress dashboard"],
    popular: true,
    cta: "Book 5 sessions",
  },
  {
    icon: Star,
    name: "Mastery Bundle",
    subtitle: "Save $100 — maximum velocity",
    tagline: "Our apex value",
    price: "$450",
    period: "/ 10 sessions",
    description: "Ten sessions covering the complete curriculum with two mock road tests. Save $100 versus à la carte and progress from novice to test-ready with surgical precision.",
    features: ["Save $100 versus per-session rate", "Complete curriculum coverage", "2 mock road tests", "Test-readiness dashboard"],
    popular: false,
    cta: "Book 10 sessions",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.6, 1, 1, 0.6]);

  return (
    <section ref={sectionRef} className="section bg-[#030305] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge icon={<Star className="w-4 h-4" />} className="mb-8">
            All programs. One destination: mastery.
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-3xl mx-auto">
            Choose your <br />
            <span className="text-accent">trajectory.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mt-6 font-medium">
            Every program connects to the same seamless ecosystem — AI booking, online payments, automated reminders, and progress intelligence.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" style={{ opacity }}>
          {services.map((tier, i) => (
            <PricingCard key={i} tier={tier} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-card border-white/5 p-8 lg:p-10 rounded-[3rem]"
        >
          <EcosystemGrid />
        </motion.div>
      </div>
    </section>
  );
}