"use client";

import { motion } from "motion/react";
import { Bot, Bell, CreditCard, BarChart3 } from "lucide-react";

export default function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-black uppercase tracking-widest text-white/20"
    >
      {[
        { icon: Bot, label: "AI Concierge" },
        { icon: Bell, label: "Auto-Reminders" },
        { icon: CreditCard, label: "Secure Pay" },
        { icon: BarChart3, label: "Progress Intel" },
      ].map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <item.icon className="w-3 h-3 text-accent" /> {item.label}
        </span>
      ))}
    </motion.div>
  );
}
