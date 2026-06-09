"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui";
import { Sparkles, Zap, Shield, Bell, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Select Your Program",
    desc: "Browse Foundation, Accelerator, or Final Edge. Every program integrates AI booking, online pay, pulses, and progress intelligence.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Book Online",
    desc: "Select your slot from real-time availability, pay with cryptographic security, and receive instantaneous confirmation. Under sixty seconds.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Receive Pulses",
    desc: "Automated alerts fire before every session. You always know when and where — no calendar management required.",
    icon: Bell,
  },
  {
    number: "04",
    title: "Drive & Track",
    desc: "Session by session, your progress is recorded in your nexus. See precisely what you've mastered and what requires attention.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Pass Your Examination",
    desc: "When your test-readiness score reaches 100%, you're prepared for your ICBC road test. 95% of our students succeed on the first attempt.",
    icon: Shield,
  },
];

export function FeatureSteps() {
  return (
    <section className="container mb-20 lg:mb-32">
      <div className="text-center my-16">
        <Badge icon={<Sparkles className="w-4 h-4 text-accent" />}>
          The student trajectory
        </Badge>
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mt-10">
          From click to certification. <br />
          <span className="text-secondary-foreground">Entirely seamless.</span>
        </h2>
      </div>

      {/* Stepped wizard — horizontal on desktop, stacked on mobile */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-linear-to-r from-accent/40 via-accent/20 to-accent/40" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center font-black text-xl z-10 relative shadow-2xl shadow-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {s.number}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Card body */}
                <div className="glass-card border-white/5 p-6 rounded-2xl w-full flex-1 flex flex-col items-center hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
                  <Icon className="w-5 h-5 text-accent mb-3" />
                  <h3 className="text-sm font-black text-white uppercase tracking-tighter mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs text-white/40 font-medium leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Connector arrow between steps (mobile/tablet) */}
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-accent/30 mt-4 block lg:hidden rotate-90 md:rotate-0" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 glass-card border-white/5 p-8 rounded-[2rem]"
      >
        <div className="flex flex-wrap justify-center gap-8 text-sm font-black text-white/40">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /> Book in 60 seconds
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" /> Pay securely online
          </span>
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent" /> Auto-pulses
          </span>
          <span className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" /> Track trajectory
          </span>
        </div>
      </motion.div>
    </section>
  );
}
