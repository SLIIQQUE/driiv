import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function GlassCard({ children, className = "", as: Component = "div" }: GlassCardProps) {
  return (
    <Component className={`glass-card border-white/5 ${className}`}>
      {children}
    </Component>
  );
}
