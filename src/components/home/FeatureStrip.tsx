"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Calendar, Bell, BarChart3, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const features = [
  {
    icon: Bot,
    title: "AI Voice Concierge",
    tagline: "Your 24/7 co-pilot",
    description: "Ask questions, check availability, or book a lesson — all through a conversation. No holds, no voicemail, no friction. Just instant, intelligent assistance.",
    cta: "Try the assistant",
    gradient: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Instant Booking",
    tagline: "Seconds, not phone calls",
    description: "Real-time calendar sync reveals every open slot. Tap your time, confirm, and you're in. Reschedule in a click. Weekend, evening — whenever life allows.",
    cta: "See available slots",
    gradient: "from-secondary-foreground/20 via-secondary-foreground/5 to-transparent",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    tagline: "Never lose a session",
    description: "SMS and email alerts pulse automatically before every lesson. Your instructor's arrival, your pickup point, your prep checklist — all delivered before you need to ask.",
    cta: "How reminders work",
    gradient: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    icon: CreditCard,
    title: "Effortless Payments",
    tagline: "No cash. No chase.",
    description: "Encrypted online payments — card, debit, or e-transfer. Bundles unlock savings up to $100. Receipts land in your inbox instantly. Financial friction, eliminated.",
    cta: "View pricing",
    gradient: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Progress Intelligence",
    tagline: "Your growth, measured",
    description: "After every session, a digital report dissects your performance. See your skills compound session over session. Know the exact moment you're test-ready. No guesswork.",
    cta: "See how it works",
    link: "/features",
    gradient: "from-secondary-foreground/20 via-secondary-foreground/5 to-transparent",
  },
];

export default function FeatureStrip() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="section bg-[#030305] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <motion.div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" style={{ y }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-accent/5 border border-accent/10 rounded-full px-6 py-2 mb-8"
          >
            <Bot className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">The seamless ecosystem</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] max-w-3xl mx-auto">
            Everything synced.{" "}
            <br />
            <span className="text-accent">Nothing to manage.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mt-6 font-medium">
            Book, pay, track, and get reminded — all orchestrated behind the scenes while you focus on mastering the road.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card border-white/5 p-6 lg:p-8 rounded-[2rem] group hover:border-accent/20 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden cursor-default"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all hover:scale-110 hover:rotate-6 duration-300"
                >
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-1">{feature.tagline}</div>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-white/40 font-medium leading-relaxed mb-8">{feature.description}</p>
                <Link
                  href={feature.link || "/contact"}
                  className="text-xs font-black uppercase tracking-widest text-accent group/link inline-flex items-center gap-2"
                >
                  <span>{feature.cta}</span>
                    <span
                    className="inline-block group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}