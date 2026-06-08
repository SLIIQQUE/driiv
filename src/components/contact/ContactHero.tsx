"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Phone, MessageSquare, Bot, Bell, CreditCard, BarChart3 } from "lucide-react";

export function ContactHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#030305] pt-32 pb-32 lg:pb-48">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-accent/5 rounded-full blur-[150px]"
          style={{ y }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Inaugurate Your Journey
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card border-white/10 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden"
          >
             <div
              className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none"
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10"
            >
              Book your first <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">session.</span>
              <br />
              In sixty seconds.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12 font-medium"
            >
              No telephone calls. No cash. No administrative friction. Book online, pay with cryptographic security, and receive automated pulses — all from your device.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 items-center justify-center lg:justify-start mb-10"
            >
              {[
                { icon: Bot, label: "AI Concierge" },
                { icon: CreditCard, label: "Online Pay" },
                { icon: Bell, label: "Pulses" },
                { icon: BarChart3, label: "Progress Intel" },
              ].map((item, i) => (
                  <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 text-accent" /> {item.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 items-center pt-8 border-t border-white/5"
            >
              <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-white font-bold tracking-tight">(604) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-white font-bold tracking-tight">hello@rydax.net</span>
              </div>
              <div className="hidden md:flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-white font-bold tracking-tight">Same-Day Response</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}