import type { ReactNode } from "react";

interface BadgeProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export function Badge({ icon, children, className = "", animated = true }: BadgeProps) {
  const base = "inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full text-[10px] font-black uppercase tracking-widest text-accent/70";

  return (
    <div className={`${base} ${className} ${animated ? "animate-scale-in" : ""}`}>
      {icon && <span className="w-4 h-4 text-accent">{icon}</span>}
      {children}
    </div>
  );
}
