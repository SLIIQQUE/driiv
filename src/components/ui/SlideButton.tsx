"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SlideButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function SlideButton({ href, children, className = "", showArrow = true }: SlideButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative px-8 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {showArrow && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </span>
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
