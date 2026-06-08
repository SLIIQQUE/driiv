"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge: ReactNode;
  title: string;
  description?: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      {badge}
      <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
        {title}
      </h2>
      {description && (
        <p className="text-white/40 text-lg mt-6 max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  );
}
