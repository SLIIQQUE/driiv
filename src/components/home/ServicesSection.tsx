"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Car, Zap, Star, ArrowRight, CheckCircle2, Bot, Bell, BarChart3, CreditCard } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Car,
    title: "Foundation Pass",
    subtitle: "Pay-as-you-go mastery",
    tagline: "Master the essentials",
    price: "$55 / session",
    description: "One-on-one mentorship in a dual-control cockpit. Book single hours online, pay securely, and watch your progress compound with every session. Zero commitment, maximum flexibility.",
    features: ["24/7 online booking — no calls ever", "Pay by card or e-transfer upfront", "Auto-reminders before every rendezvous", "Digital progress report after each session"],
    popular: false,
    cta: "Book a session",
  },
  {
    icon: Zap,
    title: "Power Pack",
    subtitle: "Save $25 — optimal momentum",
    tagline: "Our most popular program",
    price: "$250 / 5 sessions",
    description: "Five sessions with priority scheduling, mock assessment, and a full progress dashboard. Save $25 versus per-session pricing. The ideal launch package for new learners.",
    features: ["Save $25 versus per-session rate", "Priority calendar access", "Mock assessment included", "Full progress dashboard"],
    popular: true,
    cta: "Book 5 sessions",
  },
  {
    icon: Star,
    title: "Mastery Bundle",
    subtitle: "Save $100 — maximum velocity",
    tagline: "Our apex value",
    price: "$450 / 10 sessions",
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
          >
            <Star className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">All programs. One destination: mastery.</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-3xl mx-auto">
            Choose your <br />
            <span className="text-accent">trajectory.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mt-6 font-medium">
            Every program connects to the same seamless ecosystem — AI booking, online payments, automated reminders, and progress intelligence.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" style={{ opacity }}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`premium-card p-10 lg:p-16 flex flex-col group relative overflow-hidden cursor-default hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 ${service.popular ? "border-accent/30 bg-accent/[0.02]" : ""}`}
            >
              {service.popular && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-6 right-6 px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20"
                >
                  Most Popular
                </motion.div>
              )}

              <div
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 hover:scale-110 hover:rotate-6 transition-transform duration-300"
              >
                <service.icon className="w-8 h-8 text-accent" />
              </div>

              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-2">{service.tagline}</div>
              <div className="text-xs font-black uppercase tracking-widest text-accent mb-2">{service.subtitle}</div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{service.title}</h3>
              <p className="text-white/40 font-medium text-sm leading-relaxed mb-6">{service.description}</p>

              <div className="mb-10">
                <span className="text-5xl font-black text-white tracking-tighter">{service.price}</span>
              </div>

              <div className="space-y-3 mb-10 flex-1">
                {service.features.map((f, j) => (
                  <motion.div
                    key={j}
                    className="flex items-center gap-3 text-sm font-bold text-white/50"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${service.popular ? "text-accent" : "text-white/20"}`} /> {f}
                  </motion.div>
                ))}
              </div>

              <Link
                href="/booking"
                className={`group relative py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 overflow-hidden transition-all ${service.popular ? "bg-accent text-primary shadow-2xl shadow-accent/20" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {service.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-card border-white/5 p-8 lg:p-10 rounded-[3rem]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Bot, label: "AI Concierge", sub: "24/7" },
              { icon: CreditCard, label: "Secure Pay", sub: "No cash" },
              { icon: Bell, label: "Auto-Reminders", sub: "Always" },
              { icon: BarChart3, label: "Progress Intel", sub: "After every session" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-xs font-black uppercase tracking-wider text-white/40">{item.label}</div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}