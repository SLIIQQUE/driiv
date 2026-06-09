"use client";

import { motion } from "motion/react";
import {
  Star,
  ShieldCheck,
  Zap,
  Bot,
  Bell,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { PageHero, PageTitle, PageDescription, PricingCard, ScrollReveal } from "@/components/ui";
import type { PricingCardData } from "@/components/ui";

const pricingTiers: PricingCardData[] = [
  {
    name: "Foundation Pass",
    price: "$55",
    period: "/ session",
    tagline: "Pay-as-you-go mastery",
    description:
      "Ideal for targeted refinement or refresher sessions. Book individual hours with instant confirmation, pay with cryptographic security, and receive progress intelligence after every session.",
    features: [
      "One-on-one dual-control mentorship",
      "24/7 online booking — instantaneous",
      "Automated SMS & email pulses",
      "Digital progress report after each session",
    ],
    cta: "Book a session",
    popular: false,
    icon: ShieldCheck,
  },
  {
    name: "Power Pack",
    price: "$250",
    period: "/ 5 sessions",
    tagline: "Optimal momentum",
    description:
      "Save $25 and unlock priority scheduling. The recommended launch package for new learners. Complete booking in under sixty seconds across our ecosystem.",
    features: [
      "Save $25 versus per-session rate",
      "Priority calendar access",
      "AI concierge support — 24/7",
      "Mock assessment included",
      "Full progress nexus dashboard",
    ],
    cta: "Book 5 sessions",
    popular: true,
    icon: Zap,
    popularLabel: "Optimal Value",
  },
  {
    name: "Mastery Bundle",
    price: "$450",
    period: "/ 10 sessions",
    tagline: "Maximum velocity",
    description:
      "Our apex value. Save $100 and receive everything required to progress from novice to test-ready. Two mock examinations, complete curriculum coverage, and your private progress nexus.",
    features: [
      "Save $100 versus per-session rate",
      "Complete curriculum immersion",
      "2 mock road tests with surgical scoring",
      "Test-readiness dashboard",
      "Auto-pay available — configure once",
    ],
    cta: "Book 10 sessions",
    popular: false,
    icon: Star,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl">
          <PageHero label="Investment" />

          <h1 className="sr-only">
            Driving Lesson Prices & Packages in Surrey BC
          </h1>
          <PageTitle>
            Radical <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              clarity.
            </span>
            <br />
            Zero surprises.
          </PageTitle>

          <PageDescription>
            No concealed fees. No contractual entanglement. Book online, pay
            with cryptographic security, and save up to $100 with curated
            bundles.
          </PageDescription>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-20">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PricingCard tier={tier} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mt-20">
        <ScrollReveal className="text-center mt-20">
          <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8">
            Every booking includes
          </h3>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { icon: Bot, label: "AI Concierge" },
              { icon: Bell, label: "Auto-Reminders" },
              { icon: CreditCard, label: "Secure Pay" },
              { icon: BarChart3, label: "Progress Intel" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-bold text-white/40 hover:-translate-y-0.5 hover:text-accent transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-accent" /> {item.label}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
