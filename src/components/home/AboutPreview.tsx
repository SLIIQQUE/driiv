"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Quote,
} from "lucide-react";
import { useRef } from "react";

export default function AboutPreview() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="section bg-[#030305] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
            >
              <Quote className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">The RYDAX difference</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-8">
              Metro Vancouver&apos;s <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">most sophisticated</span>
              <br />
              driving academy.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed font-medium mb-10">
              We dismantled everything frustrating about learning to drive — the phone tag, the cash, the forgotten sessions, the black-box progress — and engineered a seamless technological ecosystem around what matters: masterful instruction.
            </p>
            <div className="space-y-5 mb-12">
              {[
                "AI assistant books your sessions in seconds, any hour",
                "Encrypted online payments — cash is a relic",
                "Automated pulses so you never lose a session",
                "Digital intelligence reports after every lesson",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-4 text-sm font-bold text-white/60"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> {item}
                </motion.div>
              ))}
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm text-white hover:bg-white/10 transition-all"
            >
              <span>Our Philosophy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
              <div className="grid grid-cols-2 gap-10 text-center mb-12 relative z-10">
                {[
                  { value: "95%", label: "First-Try Pass" },
                  { value: "1K+", label: "Drivers Forged" },
                  { value: "5+", label: "Seasons Of Excellence" },
                  { value: "6", label: "Cities Covered" },
                ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="hover:scale-105 transition-transform duration-300"
            >
                    <motion.div
                      className="text-5xl font-black text-white mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-accent">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-8">
                <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>ICBC Licensed • Dual-Control Fleet • Fully Insured</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}