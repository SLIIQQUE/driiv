"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  value: string;
  label: string;
  delay?: number;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatCard({ icon: Icon, value, label, delay = 0, valueClassName, labelClassName }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="hover:scale-105 transition-transform duration-300"
    >
      {Icon && <Icon className="w-8 h-8 text-accent mx-auto mb-4" />}
      <motion.div
        className={`text-4xl font-black text-white tracking-tighter mb-1 ${valueClassName ?? ""}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay }}
      >
        {value}
      </motion.div>
      <div className={`text-[10px] font-black uppercase tracking-widest text-white/30 ${labelClassName ?? ""}`}>{label}</div>
    </motion.div>
  );
}

interface StatCardGridProps {
  stats: { icon?: LucideIcon; value: string; label: string }[];
  columns?: number;
}

export function StatCardGrid({ stats, columns = 2 }: StatCardGridProps) {
  const cols = columns === 4 ? "grid-cols-4" : "grid-cols-2";
  return (
    <div className={`grid ${cols} gap-12 text-center relative z-10`}>
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} delay={0.4 + i * 0.1} />
      ))}
    </div>
  );
}
