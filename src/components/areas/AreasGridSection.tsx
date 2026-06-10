"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Shield, Building2, ArrowRight, Car, CheckCircle } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";
import { EcosystemGrid, ScrollReveal } from "@/components/ui";

interface Area {
  city: string;
  description: string;
  image: string;
  color: string;
}

const areas: Area[] = [
  {
    city: "Surrey",
    description: "Our founding city. Serving South Surrey, Guildford, Newton, Fleetwood, and Whalley. Pickup and drop-off at your location. Book online for instantaneous confirmation.",
    image: "SR",
    color: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    city: "Delta",
    description: "North Delta, Ladner, Tsawwassen — fully covered. AI booking available 24/7. Instant confirmation, automated reminders, seamless orchestration.",
    image: "DT",
    color: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    city: "Richmond",
    description: "Complete coverage including Steveston and Bridgeport. ICBC test circuit specialists with real-time progress intelligence.",
    image: "RM",
    color: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    city: "Burnaby",
    description: "Metrotown, Brentwood, Lougheed, SFU corridor. Book online, pay with cryptographic security, track your trajectory after every session.",
    image: "BB",
    color: "from-secondary-foreground/ la-foreground/20 via-secondary-foreground/5 to-transparent",
  },
  {
    city: "New Westminster",
    description: "Queensborough, Sapperton, and the entire Royal City. Automated pulses maintain your cadence. The full ecosystem, everywhere we operate.",
    image: "NW",
    color: "from-primary/20 via-primary/5 to-transparent",
  },
];

export function AreasGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="container mb-20">
      <ScrollReveal
        direction="up"
        delay={0}
        className="flex flex-wrap gap-6 items-center justify-center lg:justify-start opacity-40 mb-16"
      >
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Car className="w-4 h-4 text-accent" /> Pickup {'\u0026'} Drop-off</div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Shield className="w-4 h-4 text-accent" /> ICBC Licensed</div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Building2 className="w-4 h-4 text-accent" /> All Neighbourhoods</div>
      </ScrollReveal>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ y }}>
        {areas.map((area, i) => (
          <motion.div
            key={area.city}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card border-white/5 p-8 lg:p-10 rounded-[2rem] group relative overflow-hidden hover:border-accent/20 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 cursor-default"
          >
            <div className={`absolute inset-0 bg-linear-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all hover:scale-110 hover:rotate-6 duration-300"
              >
                <span className="font-black text-2xl text-white/30 group-hover:text-accent transition-colors">{area.image}</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors">{area.city}</h3>
              <p className="text-white/40 font-medium text-sm leading-relaxed mb-6">{area.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Pickup Included
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Online Booking
                </div>
              </div>
              <BookNowTrigger className="inline-flex items-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-accent hover:underline group/link">
                Book in {area.city} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </BookNowTrigger>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
