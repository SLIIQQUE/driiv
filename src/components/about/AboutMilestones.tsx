"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui";
import { Sparkles, Rocket, Users, Bot, MapPin, Orbit } from "lucide-react";

const milestones = [
  {
    year: "2019",
    event: "DRIIV Founded",
    detail:
      "A single dual-control vehicle and a vision: prove that driver education can be as sophisticated as the vehicles on the road.",
    icon: Rocket,
  },
  {
    year: "2021",
    event: "500 Students Certified",
    detail:
      "93% first-attempt pass rate achieved through pure instructional excellence — still operating on paper logs.",
    icon: Users,
  },
  {
    year: "2023",
    event: "AI Concierge Launched",
    detail:
      "Students could finally book, reschedule, and inquire 24/7 without a single phone call. The friction started to dissolve.",
    icon: Bot,
  },
  {
    year: "2024",
    event: "1,000+ Students Served",
    detail:
      "Expansion to six cities. Automated reminders, encrypted payments, and progress intelligence became standard equipment.",
    icon: MapPin,
  },
  {
    year: "2025",
    event: "Ecosystem Complete",
    detail:
      "AI booking, secure pay, auto-reminders, and progress intelligence — all orchestrated seamlessly. One click from inquiry to license.",
    icon: Orbit,
  },
];

export function AboutMilestones() {
  return (
    <section>
      <div className="container">
        <div className="text-center mb-16">
          <Badge icon={<Sparkles className="w-4 h-4 text-accent" />}>
            Our trajectory
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mt-10">
            The <span className="text-secondary-foreground">Evolution</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-linear-to-r from-accent/40 via-accent/20 to-accent/40" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Year circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center font-black text-lg z-10 relative shadow-2xl shadow-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {m.year.slice(2)}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>

                  {/* Card body */}
                  <div className="glass-card border-white/5 p-6 rounded-2xl w-full flex-1 flex flex-col items-start text-left hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter mb-2 leading-tight">
                      {m.event}
                    </h3>
                    <p className="text-xs text-white/40 font-medium leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
