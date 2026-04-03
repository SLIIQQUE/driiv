"use client";

import { motion } from "motion/react";
import { Check, Star, ArrowRight, ShieldCheck, Zap, Info } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Foundation Hour",
    price: "$55",
    period: "/ 60 min",
    description: "Ideal for refresher sessions or targeted skill refinement.",
    features: [
      "1-on-1 Instruction",
      "Dual-Control Safety",
      "Pickup & Dropoff",
      "Progress Report",
    ],
    cta: "Book Hour",
    popular: false,
    icon: ShieldCheck,
  },
  {
    name: "Power Five",
    price: "$250",
    period: "/ 5 hours",
    description: "The perfect start for new learners. Strategic and efficient.",
    features: [
      "Save $25",
      "Priority Booking",
      "Test Prep Modules",
      "Mock Assessment",
      "Consistent Vehicle",
    ],
    cta: "Book 5 Hours",
    popular: true,
    icon: Zap,
  },
  {
    name: "Mastery Ten",
    price: "$450",
    period: "/ 10 hours",
    description: "Complete immersion for those seeking total road confidence.",
    features: [
      "Save $100",
      "Full Curriculum",
      "2x Mock Tests",
      "Pass Simulation",
      "Weekend Option",
    ],
    cta: "Book 10 Hours",
    popular: false,
    icon: Star,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Pricing Strategy
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Absolute <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              Transparency.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            Investment in your safety shouldn&apos;t be a guessing game. Premium
            instruction with simple, value-driven tiers.
          </p>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Pricing Grid */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`
                premium-card p-10 flex flex-col group relative overflow-hidden
                ${tier.popular ? "border-accent/30 bg-accent/2" : "bg-white/2"}
              `}
            >
              {tier.popular && (
                <div className="absolute top-8 right-8">
                  <span className="px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    Best Choice
                  </span>
                </div>
              )}

              <div className="mb-12">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${tier.popular ? "bg-accent text-primary" : "bg-white/5 text-white/40"}`}
                >
                  <tier.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-white/40 font-medium leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-white tracking-tighter">
                    {tier.price}
                  </span>
                  <span className="text-white/30 font-bold uppercase text-xs tracking-widest">
                    {tier.period}
                  </span>
                </div>
                <div className="w-12 h-1 bg-accent/20 rounded-full" />
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {tier.features.map((feature, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 text-sm font-bold text-white/60"
                  >
                    <Check
                      className={`w-4 h-4 ${tier.popular ? "text-accent" : "text-white/20"}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className={`
                  w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all
                  ${tier.popular ? "bg-accent text-primary hover:scale-[1.02] shadow-2xl shadow-accent/20" : "bg-white/5 text-white hover:bg-white/10"}
               `}
              >
                {tier.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Road Test Bundle - High Impact Banner */}
      <section className="container mt-24">
        <motion.div
          className="glass-card border-white/5 p-12 lg:p-16 rounded-[3rem] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-secondary-foreground/20 via-transparent to-accent/20" />
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
            <div className="max-w-xl text-center lg:text-left">
              <div className="flex items-center gap-2 text-secondary-foreground font-black uppercase tracking-widest text-xs mb-4 justify-center lg:justify-start">
                <Info className="w-4 h-4" /> Recommended for ICBC Tests
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                The Road Test Package
              </h2>
              <p className="text-white/50 font-medium text-lg leading-relaxed">
                Everything you need for the final hurdle. Includes 5 precision
                lessons + a dedicated mock road test session.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-7xl font-black text-white tracking-tighter mb-1">
                $350
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-secondary-foreground mb-8">
                All-Inclusive
              </div>
              <Link
                href="/contact"
                className="px-12 py-5 bg-secondary-foreground text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-secondary-foreground/20"
              >
                Secure Package
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
