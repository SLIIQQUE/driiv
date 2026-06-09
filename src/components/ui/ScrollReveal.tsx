"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
  distance?: number;
}

const directionMap: Record<
  string,
  { initial: Record<string, number>; animate: Record<string, number> }
> = {
  up: { initial: { y: 20 }, animate: { y: 0 } },
  down: { initial: { y: -20 }, animate: { y: 0 } },
  left: { initial: { x: 20 }, animate: { x: 0 } },
  right: { initial: { x: -20 }, animate: { x: 0 } },
  scale: { initial: { scale: 0.95 }, animate: { scale: 1 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
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
  distance = 20,
}: ScrollRevealProps) {
  const dir = directionMap[direction] ?? directionMap.up;
  const initial: Record<string, number> = { opacity: 0, ...dir.initial };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{
        opacity: 1,
        ...Object.fromEntries(
          Object.entries(dir.animate).map(([k, v]) => [
            k,
            k === "y" || k === "x" ? 0 : v,
          ]),
        ),
      }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
