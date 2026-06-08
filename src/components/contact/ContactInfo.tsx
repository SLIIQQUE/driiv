"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Phone, Bot, ArrowRight, ShieldCheck, Car, Award, Bell, CreditCard, BarChart3 } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="md:col-span-2 premium-card p-10 overflow-hidden relative group"
      >
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
           <motion.div
             className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
             whileHover={{ scale: 1.1, rotate: 5 }}
           >
             <MapPin className="w-8 h-8 text-accent" />
           </motion.div>
           <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Serving Metro Vancouver</h3>
              <p className="text-lg text-white/50 font-medium">Surrey, Langley, Delta, Richmond, Burnaby, New Westminster — pickup included. Book online for instantaneous confirmation.</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-accent text-[10px] font-black uppercase tracking-widest"><Car className="w-3 h-3" /> Pickup Included</div>
                <div className="flex items-center gap-1.5 text-accent text-[10px] font-black uppercase tracking-widest"><Bot className="w-3 h-3" /> AI Concierge 24/7</div>
              </div>
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="glass-card border-white/5 p-10 rounded-[2.5rem]"
      >
        <Clock className="w-10 h-10 text-white/20 mb-8" />
        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Session Hours</h3>
        <div className="space-y-4">
           <motion.div className="flex justify-between items-center text-sm" whileHover={{ x: 4 }}>
             <span className="text-white/40 font-bold uppercase tracking-wider">Mon - Fri</span>
             <span className="text-white font-black">7 AM - 8 PM</span>
           </motion.div>
           <motion.div className="flex justify-between items-center text-sm" whileHover={{ x: 4 }}>
             <span className="text-white/40 font-bold uppercase tracking-wider">Saturday</span>
             <span className="text-white font-black">8 AM - 6 PM</span>
           </motion.div>
           <motion.div className="flex justify-between items-center text-sm" whileHover={{ x: 4 }}>
             <span className="text-white/40 font-bold uppercase tracking-wider">Sunday</span>
             <span className="text-accent font-black">By Request</span>
           </motion.div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            <Bell className="w-3 h-3 text-accent" /> Automated pulses for every booking
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="bg-accent rounded-[2.5rem] p-10 flex flex-col justify-between"
      >
        <div>
           <motion.div className="flex items-center gap-3 mb-6" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
             <Phone className="w-8 h-8 text-primary/40" />
             <CreditCard className="w-8 h-8 text-primary/40" />
             <BarChart3 className="w-8 h-8 text-primary/40" />
           </motion.div>
           <h3 className="text-xl font-black text-primary uppercase tracking-tighter mb-2">Book Today</h3>
           <p className="text-primary/70 text-sm font-bold leading-relaxed mb-8">Book online, pay securely, and track your trajectory. Instantaneous confirmation — no telephone call required.</p>
        </div>
        <a href="tel:+16041234567" className="text-2xl font-black text-primary hover:underline">(604) 123-4567</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="md:col-span-2 glass-card border-white/5 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center justify-between"
      >
        <div className="flex items-center gap-6">
           <motion.div
             className="w-14 h-14 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center"
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
           >
             <Bot className="w-8 h-8 text-secondary-foreground" />
           </motion.div>
           <div>
              <h4 className="text-white font-black uppercase tracking-tighter">AI Concierge</h4>
              <p className="text-sm text-white/40 font-bold">Inquire about programs, check availability, or book instantaneously. Available 24/7.</p>
           </div>
        </div>
        <motion.button
           onClick={() => document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click()}
           className="group relative px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-sm uppercase tracking-widest overflow-hidden"
           whileHover={{ scale: 1.05 }}
        >
           <span className="relative z-10 flex items-center gap-2">
             Try AI Voice <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </span>
           <motion.div className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="md:col-span-2 flex items-center justify-center gap-6 py-6"
      >
        {[
          { icon: Car, label: "Dual-Control" },
          { icon: Award, label: "ICBC Licensed" },
          { icon: ShieldCheck, label: "Fully Insured" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity"
            whileHover={{ y: -2 }}
          >
            <item.icon className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}