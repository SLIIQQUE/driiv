"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight, Calendar, Bot, Shield, Award, Bell, BarChart3, CreditCard, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={sectionRef} className="section bg-[#030305] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,0,0.08),transparent_50%)]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="glass-card border-white/10 rounded-[3rem] p-12 lg:p-20 overflow-hidden relative"
          style={{ scale }}
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Your journey begins with a single click</span>
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                Your inaugural session is{" "}
                <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">moments away.</span>
              </h2>
              <p className="text-lg text-white/40 leading-relaxed max-w-lg mb-10 font-medium">
                No phone calls. No cash. No administrative friction. Simply select your time, complete payment, and arrive. The ecosystem handles the orchestration — you handle the mastery.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon: Calendar, label: "Book 24/7" },
                  { icon: CreditCard, label: "Pay Online" },
                  { icon: Bell, label: "Auto-Reminders" },
                  { icon: BarChart3, label: "Track Progress" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <item.icon className="w-3 h-3 text-accent" /> {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-6 opacity-40 text-xs font-black uppercase tracking-widest">
                <div className="flex items-center gap-2 hover-x"><Shield className="w-4 h-4 text-accent" /> ICBC Licensed</div>
                <div className="flex items-center gap-2 hover-x"><Award className="w-4 h-4 text-accent" /> 95% Pass Rate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-accent rounded-[3rem] p-12 lg:p-16 text-primary shadow-2xl shadow-accent/20 flex flex-col items-center text-center hover-lift">
                <div>
                  <Calendar className="w-16 h-16 mb-8 text-primary/80" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Claim Your First Session</h3>
                <p className="text-primary/70 font-bold mb-2">From $55/hr in Surrey, BC.</p>
                <p className="text-primary/50 text-sm font-bold mb-10">Instant confirmation. Zero phone calls. Seamless from start to finish.</p>

                <Link
                  href="/contact"
                  className="group relative w-full bg-primary text-accent py-5 rounded-2xl flex items-center justify-center gap-3 text-xl font-black overflow-hidden shadow-xl shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    CLAIM YOUR SLOT <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <div className="mt-8 flex items-center gap-3 py-3 px-6 bg-primary/5 rounded-full border border-primary/10">
                  <Calendar className="w-5 h-5 text-primary/60" />
                  <span className="text-sm font-black">Available this week — book online now</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-accent/20 rounded-[3rem] -z-10" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
