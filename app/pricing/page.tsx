"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  Check,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  Bot,
  Bell,
  CreditCard,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const pricingTiers = [
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
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.6, 1, 1, 0.6],
  );

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Investment
          </motion.div>

          <h1 className="sr-only">
            Driving Lesson Prices & Packages in Surrey BC
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10"
          >
            Radical <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              clarity.
            </span>
            <br />
            Zero surprises.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
          >
            No concealed fees. No contractual entanglement. Book online, pay
            with cryptographic security, and save up to $100 with curated
            bundles.
          </motion.p>
        </div>
      </section>

      <section ref={sectionRef} className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-20"
          style={{ opacity }}
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`premium-card p-10 flex flex-col group relative overflow-hidden cursor-default hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 ${tier.popular ? "border-accent/30 bg-accent/[0.02]" : "bg-white/2"}`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-8 right-8"
                >
                  <span className="px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20">
                    Optimal Value
                  </span>
                </motion.div>
              )}

              <div className="mb-12">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${tier.popular ? "bg-accent text-primary" : "bg-white/5 text-white/40"} hover:scale-110 hover:rotate-6 transition-transform duration-300`}
                >
                  <tier.icon className="w-7 h-7" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-2">
                  {tier.tagline}
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
                <div className="w-12 h-1 bg-accent/20 rounded-full group-hover:w-12 transition-all duration-300" />
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {tier.features.map((feature, j) => (
                  <motion.div
                    key={j}
                    className="flex items-center gap-3 text-sm font-bold text-white/60"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.04 }}
                  >
                    <Check
                      className={`w-4 h-4 ${tier.popular ? "text-accent" : "text-white/20"}`}
                    />
                    {feature}
                  </motion.div>
                ))}
              </div>

              <Link
                href="/booking"
                className={`group relative py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest overflow-hidden transition-all ${tier.popular ? "bg-accent text-primary shadow-2xl shadow-accent/20" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {tier.cta}{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-20"
        >
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
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm font-bold text-white/40 hover:-translate-y-0.5 hover:text-accent transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-accent" /> {item.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
