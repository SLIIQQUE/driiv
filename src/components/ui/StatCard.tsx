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
    <div
      className="animate-fade-up hover:scale-105 transition-transform duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      {Icon && <Icon className="w-8 h-8 text-accent mx-auto mb-4" />}
      <div
        className={`text-4xl font-black text-white tracking-tighter mb-1 animate-fade-in ${valueClassName ?? ""}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {value}
      </div>
      <div className={`text-[10px] font-black uppercase tracking-widest text-white/60 ${labelClassName ?? ""}`}>{label}</div>
    </div>
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
