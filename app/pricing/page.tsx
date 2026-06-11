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
import { PROGRAMS } from "@/data/programs";
import type { LucideIcon } from "lucide-react";

const programIcons: Record<string, LucideIcon> = {
  foundation: ShieldCheck,
  "power-pack": Zap,
  mastery: Star,
};

const programCta: Record<string, string> = {
  foundation: "Book a session",
  "power-pack": "Book 5 sessions",
  mastery: "Book 10 sessions",
};

const pricingTiers: PricingCardData[] = PROGRAMS.map((p) => ({
  name: p.name,
  price: p.price,
  period: `/ ${p.period}`,
  tagline: p.tagline,
  description: p.description,
  features: p.features,
  cta: programCta[p.id],
  popular: p.popular ?? false,
  popularLabel: p.id === "power-pack" ? "Optimal Value" : undefined,
  icon: programIcons[p.id],
}));

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
