"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

interface ParallaxBackgroundProps {
  /** Classes for the blurred floating orb */
  className?: string;
  /** Scroll input range */
  inputRange?: [number, number];
  /** Y-transform output range */
  outputRange?: [number, number];
}

/**
 * Floating background orb that moves on scroll (parallax).
 * Extracts the `useScroll` + `useTransform` pattern into a
 * reusable client component so parent pages stay server-rendered.
 */
export function ParallaxBackground({
  className = "absolute -top-40 -left-40 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[160px] pointer-events-none select-none",
  inputRange = [0, 1000],
  outputRange = [0, 200],
}: ParallaxBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, inputRange, outputRange);

  return <motion.div className={className} style={{ y }} />;
}

/* ───── Parallax grid wrapper (for scroll-linked Y transforms) ───── */

interface ParallaxGridProps {
  children: ReactNode;
  className?: string;
  /** Offset for useScroll target */
  offset?: ["start end", "end start"];
  /** Scroll progress → Y output */
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export function ParallaxGrid({
  children,
  className,
  inputRange = [0, 1],
  outputRange = [60, -60],
}: ParallaxGridProps) {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ───── Opacity fade section (for scroll-linked opacity) ───── */

interface FadeSectionProps {
  children: ReactNode;
  className?: string;
}

export function FadeSection({ children, className }: FadeSectionProps) {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.6, 1, 1, 0.6],
  );

  return (
    <motion.div className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
