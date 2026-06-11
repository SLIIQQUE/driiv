"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
}

const DIRECTION_CONFIG: Record<
  string,
  { offset: number }
> = {
  up: { offset: 20 },
  down: { offset: -20 },
  left: { offset: 20 },
  right: { offset: -20 },
  scale: { offset: 0 },
  fade: { offset: 0 },
};

/**
 * Client component that wraps children in a `motion.div` with
 * a whileInView entrance animation. Keeps the parent server component
 * free of "use client".
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
}: ScrollRevealProps) {
  const dir = DIRECTION_CONFIG[direction] ?? DIRECTION_CONFIG.up;
  const initial: Record<string, number> = { opacity: 0 };

  // Add directional offset to initial state for non-fade/scale directions
  if (direction === "up" || direction === "down") initial.y = dir.offset;
  if (direction === "left" || direction === "right") initial.x = dir.offset;

  const animate: Record<string, number> = { opacity: 1 };
  if (direction === "scale") animate.scale = 1;
  if (initial.y !== undefined) animate.y = 0;
  if (initial.x !== undefined) animate.x = 0;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
