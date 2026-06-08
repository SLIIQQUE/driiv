"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  title: string[];
  highlight?: string;
  description: string;
  className?: string;
}

export function PageHero({ label, title, highlight, description, className = "" }: PageHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8 ${className}`}
    >
      <div className="w-12 h-px bg-accent" />
      {label}
    </motion.div>
  );
}

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface PageDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function PageDescription({ children, className = "" }: PageDescriptionProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium ${className}`}
    >
      {children}
    </motion.p>
  );
}

interface PageHeaderSectionProps {
  label: string;
  badge?: ReactNode;
  title: string | string[];
  highlight?: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeaderSection({ label, badge, title, highlight, description, children }: PageHeaderSectionProps) {
  const titleParts = Array.isArray(title) ? title : [title];

  return (
    <div className="max-w-4xl relative z-10">
      {badge || <PageHero label={label} title={titleParts} highlight={highlight} description={description || ""} />}

      <PageTitle>
        {titleParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < titleParts.length - 1 && <br />}
          </span>
        ))}
      </PageTitle>

      {description && <PageDescription>{description}</PageDescription>}
      {children}
    </div>
  );
}
