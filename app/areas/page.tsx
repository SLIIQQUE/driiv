"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  MapPin,
  Shield,
  Building2,
  ArrowRight,
  Car,
  CheckCircle,
  Bot,
  Bell,
  CreditCard,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const areas = [
  {
    city: "Surrey",
    description: "Our founding city. Serving South Surrey, Guildford, Newton, Fleetwood, and Whalley. Pickup and drop-off at your location. Book online for instantaneous confirmation.",
    image: "SR",
    color: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    city: "Langley",
    description: "Comprehensive coverage of Langley, Brookswood, Walnut Grove, Willoughby, and Fort Langley. Our AI concierge handles your booking. We'll meet you wherever you are.",
    image: "LG",
    color: "from-secondary-foreground/20 via-secondary-foreground/5 to-transparent",
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

export default function AreasPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Coverage
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
              Our Driving Lesson Service Areas in BC
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
          >
            Pickup and drop-off included across Metro Vancouver. Book online, pay securely, receive automated pulses — wherever you&apos;re located.
          </motion.p>
        </div>
      </section>

      <section ref={sectionRef} className="container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-6 items-center justify-center lg:justify-start opacity-40 mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Car className="w-4 h-4 text-accent" /> Pickup & Drop-off</div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Shield className="w-4 h-4 text-accent" /> ICBC Licensed</div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Building2 className="w-4 h-4 text-accent" /> All Neighbourhoods</div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ y }}>
          {areas.map((area, i) => (
            <motion.div
              key={area.city}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card border-white/5 p-8 lg:p-10 rounded-[2.5rem] group relative overflow-hidden hover:border-accent/20 transition-all duration-500 cursor-default"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="font-black text-2xl text-white/30 group-hover:text-accent transition-colors">{area.image}</span>
                </motion.div>
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
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-accent hover:underline group/link"
                >
                  Book in {area.city} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 p-10 lg:p-14 rounded-[3rem] relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="text-center mb-8 relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Every service area includes</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {[
              { icon: Bot, label: "AI Concierge", sub: "24/7" },
              { icon: CreditCard, label: "Online Pay", sub: "Cashless" },
              { icon: Bell, label: "Reminders", sub: "Automated" },
              { icon: BarChart3, label: "Progress Intel", sub: "After each" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}>
                <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-sm font-black uppercase tracking-wider text-white/40">{item.label}</div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="premium-card p-12 lg:p-20 rounded-[4rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-secondary-foreground/10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.95]">
                Your Area Not Listed?
              </h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed">
                We&apos;re expanding rapidly. Contact us to verify availability — and if we can&apos;t reach you, we&apos;ll recommend the nearest pickup point.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Link
                href="/contact"
                className="group relative px-14 py-6 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 overflow-hidden shadow-2xl shadow-accent/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Check Availability <ArrowRight className="w-5 h-5" />
                </span>
                <motion.div className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
