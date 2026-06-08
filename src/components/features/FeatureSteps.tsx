"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui";
import { Sparkles, Zap, Shield, Bell, BarChart3 } from "lucide-react";

const steps = [
  { step: "01", title: "Select Your Program", desc: "Browse Foundation, Accelerator, or Final Edge. Every program integrates AI booking, online pay, pulses, and progress intelligence." },
  { step: "02", title: "Book Online", desc: "Select your slot from real-time availability, pay with cryptographic security, and receive instantaneous confirmation. Under sixty seconds." },
  { step: "03", title: "Receive Pulses", desc: "Automated alerts fire before every session. You always know when and where — no calendar management required." },
  { step: "04", title: "Drive & Track", desc: "Session by session, your progress is recorded in your nexus. See precisely what you've mastered and what requires attention." },
  { step: "05", title: "Pass Your Examination", desc: "When your test-readiness score reaches 100%, you're prepared for your ICBC road test. 95% of our students succeed on the first attempt." },
];

export function FeatureSteps() {
  return (
    <section className="container mb-40 lg:mb-64">
      <div className="text-center mb-16">
        <Badge icon={<Sparkles className="w-4 h-4 text-accent" />}>The student trajectory</Badge>
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
          From click to certification. <br />
          <span className="text-secondary-foreground">Entirely seamless.</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex gap-8 pb-16 last:pb-0 relative"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center font-black z-10 shadow-2xl shadow-accent/10 text-lg hover:scale-110 hover:rotate-6 transition-transform duration-300"
              >
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  className="w-px flex-1 bg-linear-to-b from-accent/30 to-transparent mt-4"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
            <div className="pt-4">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">{s.title}</h3>
              <p className="text-white/40 font-medium">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 glass-card border-white/5 p-8 rounded-[2rem]"
      >
        <div className="flex flex-wrap justify-center gap-8 text-sm font-black text-white/40">
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> Book in 60 seconds</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Pay securely online</span>
          <span className="flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Auto-pulses</span>
          <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> Track trajectory</span>
        </div>
      </motion.div>
    </section>
  );
}
