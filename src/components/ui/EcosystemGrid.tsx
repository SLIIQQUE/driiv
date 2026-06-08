import { Bot, Bell, CreditCard, BarChart3 } from "lucide-react";

interface Feature {
  icon: typeof Bot;
  label: string;
  sub: string;
}

const defaultFeatures: Feature[] = [
  { icon: Bot, label: "AI Concierge", sub: "24/7, instantaneous" },
  { icon: CreditCard, label: "Online Pay", sub: "Cashless" },
  { icon: Bell, label: "Reminders", sub: "Never miss" },
  { icon: BarChart3, label: "Progress Intel", sub: "After every session" },
];

interface EcosystemGridProps {
  features?: Feature[];
  columns?: 2 | 4;
}

export function EcosystemGrid({ features = defaultFeatures, columns = 4 }: EcosystemGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-10 text-center relative z-10`}>
      {features.map((item, i) => (
        <div key={i} className="hover:-translate-y-1 transition-transform duration-300">
          <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
          <div className="text-sm font-black uppercase tracking-wider">{item.label}</div>
          <div className="text-[11px] text-white/30 font-bold">{item.sub}</div>
        </div>
      ))}
    </div>
  );
}
