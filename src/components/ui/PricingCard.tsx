"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";

export interface PricingCardData {
  icon: LucideIcon;
  name: string;
  price: string;
  period: string;
  tagline: string;
  subtitle?: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  popularLabel?: string;
}

interface PricingCardProps {
  tier: PricingCardData;
  index: number;
}

export function PricingCard({ tier, index }: PricingCardProps) {
  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`premium-card p-10 lg:p-16 flex flex-col group relative overflow-hidden cursor-default hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 ${tier.popular ? "border-accent/30 bg-accent/[0.02]" : ""}`}
    >
      {tier.popular && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6 px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20"
        >
          {tier.popularLabel || "Most Popular"}
        </motion.div>
      )}

      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 hover:scale-110 hover:rotate-6 transition-transform duration-300 group-hover:bg-accent/10 group-hover:border-accent/20">
        <Icon className="w-8 h-8 text-accent" />
      </div>

      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-2">{tier.tagline}</div>
      {tier.subtitle && (
        <div className="text-xs font-black uppercase tracking-widest text-accent mb-2">{tier.subtitle}</div>
      )}
      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{tier.name}</h3>
      <p className="text-white/40 font-medium text-sm leading-relaxed mb-6">{tier.description}</p>

      <div className="mb-10">
        <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
        <span className="text-white/60 font-bold uppercase text-xs tracking-widest ml-2">{tier.period}</span>
        <div className="w-12 h-1 bg-accent/20 rounded-full mt-4 group-hover:w-16 transition-all duration-300" />
      </div>

      <div className="space-y-3 mb-10 flex-1">
        {tier.features.map((f, j) => (
          <motion.div
            key={j}
            className="flex items-center gap-3 text-sm font-bold text-white/50"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + j * 0.05 }}
          >
            <Check className={`w-4 h-4 shrink-0 ${tier.popular ? "text-accent" : "text-white/50"}`} />
            {f}
          </motion.div>
        ))}
      </div>

      <BookNowTrigger
        className={`group relative py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 overflow-hidden transition-all w-full ${tier.popular ? "bg-accent text-primary shadow-2xl shadow-accent/20" : "bg-white/5 text-white hover:bg-white/10"}`}
      >
        <span className="relative z-10 flex items-center gap-3">
          {tier.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
      </BookNowTrigger>
    </motion.div>
  );
}
