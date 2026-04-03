"use client";

import { motion } from "motion/react";
import {
  MapPin,
  CheckCircle,
  Navigation2,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const areas = [
  {
    name: "Surrey",
    info: "Main Studio Hub",
    status: "Primary",
    size: "large",
    color: "from-accent/20 to-transparent",
  },
  {
    name: "Langley",
    info: "Extended Service",
    status: "Covered",
    size: "medium",
    color: "from-white/5 to-transparent",
  },
  {
    name: "Delta",
    info: "North & South",
    status: "Covered",
    size: "small",
    color: "from-white/5 to-transparent",
  },
  {
    name: "Richmond",
    info: "Test Route Expert",
    status: "Primary",
    size: "medium",
    color: "from-accent/20 to-transparent",
  },
  {
    name: "Burnaby",
    info: "Highway Focus",
    status: "Covered",
    size: "small",
    color: "from-white/5 to-transparent",
  },
  {
    name: "New West",
    info: "Urban Training",
    status: "Covered",
    size: "small",
    color: "from-white/5 to-transparent",
  },
  {
    name: "Coquitlam",
    info: "Commuter Routes",
    status: "Extended",
    size: "medium",
    color: "from-white/5 to-transparent",
  },
  {
    name: "White Rock",
    info: "Coastal Circuit",
    status: "Covered",
    size: "small",
    color: "from-white/5 to-transparent",
  },
];

export default function AreasPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Cinematic Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Service Perimeter
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Greater <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              Surrey.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            Professional mobile instruction delivered directly to your doorstep.
            Our studio radius covers the most high-demand training zones in the
            Lower Mainland.
          </p>
        </div>
      </section>

      {/* Stats / Radius Banner */}
      <section className="container mb-20">
        <div className="flex flex-wrap gap-12 border-y border-white/5 py-12">
          {[
            { label: "Surrey HQ", value: "Primary Hub", icon: MapPin },
            { label: "Coverage", value: "30km Radius", icon: Navigation2 },
            { label: "Transit", value: "Mobile Studio", icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  {stat.label}
                </div>
                <div className="text-xl font-black text-white">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Areas */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {areas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid glass-card border-white/5 p-8 lg:p-10 rounded-[3rem] group relative overflow-hidden flex flex-col"
            >
              {/* Card Glow */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-br ${area.color} blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`
                        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${area.status === "Primary" ? "bg-accent text-primary" : "bg-white/10 text-white/50"}
                     `}
                  >
                    {area.status}
                  </div>
                  <Navigation2 className="w-5 h-5 text-white/10 group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                  {area.name}
                </h3>
                <p className="text-sm text-white/40 font-medium mb-8">
                  {area.info}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-4 h-4" /> Full Service Coverage
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Final Inquiry Section */}
      <section className="container mt-32">
        <div className="premium-card p-12 lg:p-20 rounded-[4rem] text-center bg-accent/5">
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Outside the{" "}
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Perimeter?
            </span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto mb-10 font-medium">
            We often extend our services for block bookings or intensive
            courses. Contact the studio to discuss your location.
          </p>
          <Link
            href="/contact"
            className="px-10 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-110 transition-all inline-flex items-center gap-3"
          >
            Request Location Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
