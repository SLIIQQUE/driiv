"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import BookNowTrigger from "@/components/BookNowTrigger";

interface CTASectionProps {
  title: ReactNode;
  description: string;
  buttonText?: string;
  className?: string;
  overlay?: ReactNode;
  wrapperClassName?: string;
  noContainer?: boolean;
}

export function CTASection({ title, description, buttonText = "Book a Session", className = "", overlay, wrapperClassName = "bg-accent/5", noContainer = false }: CTASectionProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`premium-card p-12 lg:p-20 text-center relative overflow-hidden ${wrapperClassName}`}
    >
      {overlay}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
          {title}
        </h2>
        <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium">
          {description}
        </p>
        <BookNowTrigger className="group relative px-12 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest overflow-hidden shadow-2xl shadow-accent/20 inline-flex items-center gap-3">
          <span className="relative z-10 flex items-center gap-3">
            {buttonText} <ArrowRight className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </BookNowTrigger>
      </div>
    </motion.div>
  );

  if (noContainer) return content;

  return <section className={`container ${className}`}>{content}</section>;
}
