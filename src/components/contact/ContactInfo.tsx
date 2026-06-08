"use client";

import { motion } from "motion/react";
import {
  Mail, MapPin, Clock, Phone, Bot, ArrowRight,
  Car, Award, ShieldCheck, MessageSquare,
} from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+234 810 341 3970",
    href: "tel:+2348103413970",
    description: "Speak directly with Kerry during business hours.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@rydax.net",
    href: "mailto:hello@rydax.net",
    description: "Expect a response within 2–4 hours during business days.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surrey, BC, Canada",
    href: null,
    description: "Pickup available across Metro Vancouver.",
  },
  {
    icon: MessageSquare,
    label: "AI Concierge",
    value: "Available 24/7",
    href: null,
    description: "Ask about programs, pricing, or book instantly via voice.",
    accent: true,
  },
];

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 8:00 PM" },
  { day: "Saturday", time: "8:00 AM – 6:00 PM" },
  { day: "Sunday", time: "By Request" },
];

const serviceAreas = [
  "Surrey", "Langley", "Delta", "Richmond",
  "Burnaby", "New Westminster", "White Rock",
];

export function ContactInfo() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactDetails.map((item, i) => {
          const Content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 ${
                item.accent
                  ? "bg-accent"
                  : "glass-card border-white/5"
              }`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.accent
                    ? "bg-primary/10 text-primary"
                    : "bg-white/5 text-accent"
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${
                    item.accent ? "text-primary/60" : "text-accent"
                  }`}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-lg font-black tracking-tight hover:underline ${
                        item.accent ? "text-primary" : "text-white"
                      }`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className={`text-lg font-black tracking-tight ${
                      item.accent ? "text-primary" : "text-white"
                    }`}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
              <p className={`text-sm font-medium leading-relaxed ${
                item.accent ? "text-primary/70" : "text-white/40"
              }`}>
                {item.description}
              </p>
              {item.accent && (
                <button
                  onClick={() =>
                    document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click()
                  }
                  className="mt-5 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary group"
                >
                  Try AI Voice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          );

          return item.href ? (
            <a key={i} href={item.href} className="block">
              {Content}
            </a>
          ) : (
            <div key={i}>{Content}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="glass-card border-white/5 p-10 rounded-[2rem]"
        >
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
              Session Hours
            </h3>
          </div>
          <div className="space-y-4">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between items-center text-sm hover:translate-x-1 transition-transform duration-300"
              >
                <span className="text-white/40 font-bold uppercase tracking-wider">
                  {h.day}
                </span>
                <span className={`font-black ${
                  h.time === "By Request" ? "text-accent" : "text-white"
                }`}>
                  {h.time}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            <Car className="w-3 h-3 text-accent" /> Pickup included within service areas
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="glass-card border-white/5 p-10 rounded-[2rem]"
        >
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
              Service Areas
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/60 hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/40 font-medium leading-relaxed">
            Pickup and drop-off included within all listed areas. Contact us if your location isn&apos;t listed — we may still be able to accommodate.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="glass-card border-white/5 p-10 rounded-[2rem]"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
              <Bot className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-tighter">
                Need help now?
              </h4>
              <p className="text-sm text-white/40 font-medium">
                Book a session online in under 60 seconds — no phone call needed.
              </p>
            </div>
          </div>
          <Link
            href="/booking"
            className="group relative px-10 py-4 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-lg shadow-accent/20 shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-8 py-4"
      >
        {[
          { icon: Car, label: "Dual-Control Vehicles" },
          { icon: Award, label: "ICBC Licensed" },
          { icon: ShieldCheck, label: "Fully Insured" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 opacity-30 hover:opacity-60 hover:-translate-y-0.5 transition-all duration-300"
          >
            <item.icon className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
