"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Phone, Bot, ArrowRight, ShieldCheck } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Location Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-2 premium-card p-10 overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-accent" />
           </div>
           <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Location Studio</h3>
              <p className="text-lg text-white/50 font-medium">12588 68A Ave, Surrey, BC V3W 1M2</p>
              <div className="flex items-center gap-2 mt-4 text-accent text-xs font-black uppercase tracking-widest cursor-pointer hover:underline">
                 View on Maps <ArrowRight className="w-4 h-4" />
              </div>
           </div>
        </div>
      </motion.div>

      {/* Hours Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card border-white/5 p-10 rounded-[2.5rem]"
      >
        <Clock className="w-10 h-10 text-white/20 mb-8" />
        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Learning Hours</h3>
        <div className="space-y-4">
           <div className="flex justify-between items-center text-sm">
              <span className="text-white/40 font-bold uppercase tracking-wider">Weekdays</span>
              <span className="text-white font-black">08 AM — 08 PM</span>
           </div>
           <div className="flex justify-between items-center text-sm">
              <span className="text-white/40 font-bold uppercase tracking-wider">Saturdays</span>
              <span className="text-white font-black">09 AM — 06 PM</span>
           </div>
           <div className="flex justify-between items-center text-sm">
              <span className="text-white/40 font-bold uppercase tracking-wider">Sundays</span>
              <span className="text-accent font-black">STUDIO CLOSED</span>
           </div>
        </div>
      </motion.div>

      {/* Direct Contact Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-accent rounded-[2.5rem] p-10 flex flex-col justify-between"
      >
        <div>
           <Phone className="w-10 h-10 text-primary/30 mb-8" />
           <h3 className="text-xl font-black text-primary uppercase tracking-tighter mb-2">Quick Access</h3>
           <p className="text-primary/70 text-sm font-bold leading-relaxed mb-8">Direct line for booking confirmation and emergency questions.</p>
        </div>
        <a href="tel:+16040000000" className="text-2xl font-black text-primary hover:underline">
           (604) XXX-XXXX
        </a>
      </motion.div>

      {/* AI Assistant Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="md:col-span-2 glass-card border-white/5 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center justify-between"
      >
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center">
              <Bot className="w-8 h-8 text-secondary-foreground" />
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-tighter">AI Booking Companion</h4>
              <p className="text-sm text-white/40 font-bold">Instantly schedule your next session via voice.</p>
           </div>
        </div>
        <button 
           onClick={() => document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click()}
           className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 group"
        >
           Launch Assistant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Safety Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="md:col-span-2 flex items-center justify-center py-8 opacity-20 hover:opacity-40 transition-opacity"
      >
        <ShieldCheck className="w-6 h-6 text-white mr-3" />
        <span className="text-xs font-black uppercase tracking-[0.4em] text-white">Encrypted Submission Portal</span>
      </motion.div>

    </div>
  );
}
