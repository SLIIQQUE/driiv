"use client";

import { motion } from "motion/react";
import { Bot, CreditCard, Bell, BarChart3 } from "lucide-react";

const items = [
  { icon: Bot, label: "AI Concierge", sub: "24/7, instantaneous" },
  { icon: CreditCard, label: "Online Pay", sub: "Cashless" },
  { icon: Bell, label: "Reminders", sub: "Never miss" },
  { icon: BarChart3, label: "Progress Intel", sub: "After every session" },
];

export function AboutIncludes() {
  return (
    <section className="mb-40 lg:mb-64">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="text-center mb-10 relative z-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Every student receives</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10">
            {items.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}>
                <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <div className="text-sm font-black uppercase tracking-wider">{item.label}</div>
                <div className="text-[11px] text-white/30 font-bold">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
