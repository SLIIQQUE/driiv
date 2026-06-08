"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, ArrowRight, Loader2, Calendar, Bot, Bell, CreditCard, BarChart3, Sparkles } from "lucide-react";

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.name,
          phone: data.phone,
          email: data.email,
          serviceType: data.program,
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: "Flexible",
          notes: data.message,
        }),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="premium-card p-12 lg:p-20 text-center flex flex-col items-center justify-center min-h-[600px]"
          >
            <motion.div
              className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-accent/20"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Booking Request Received</h2>
            <p className="text-xl text-white/50 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
              We&apos;ll confirm your slot within 24 hours. Meanwhile, explore our programs or engage our AI concierge.
            </p>
            <motion.button
              onClick={() => setFormState("idle")}
              className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2 group"
              whileHover={{ x: 4 }}
            >
              New Request <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-6"
               >
                 <Sparkles className="w-4 h-4 text-accent" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Your journey begins here</span>
               </motion.div>
               <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Claim Your <br /> Inaugural Session</h2>
               <p className="text-white/40 mb-12 font-medium">Submit your details and we&apos;ll match you with the optimal time slot. Instantaneous confirmation via email & SMS.</p>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <motion.div className="group space-y-2" whileHover={{ x: 4 }}>
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Full Name</label>
                        <div className="relative">
                           <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                           <input
                              name="name"
                              type="text"
                              required
                              placeholder="Your name"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                           />
                        </div>
                     </motion.div>

                     <motion.div className="group space-y-2" whileHover={{ x: 4 }}>
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Email Address</label>
                        <div className="relative">
                           <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                           <input
                              name="email"
                              type="email"
                              required
                              placeholder="you@email.com"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                           />
                        </div>
                     </motion.div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <motion.div className="group space-y-2" whileHover={{ x: 4 }}>
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Phone Number</label>
                        <div className="relative">
                           <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                           <input
                              name="phone"
                              type="tel"
                              required
                              placeholder="+1 (604) 000-0000"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                           />
                        </div>
                     </motion.div>

                     <motion.div className="group space-y-2" whileHover={{ x: 4 }}>
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Program</label>
                        <div className="relative">
                           <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors pointer-events-none" />
                           <select
                              name="program"
                              defaultValue=""
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white appearance-none focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold"
                           >
                              <option value="" disabled>Select a program</option>
                              <option value="foundation" className="bg-[#030305]">Foundation Training ($55/hr)</option>
                              <option value="intensive" className="bg-[#030305]">The Accelerator ($650)</option>
                              <option value="test-prep" className="bg-[#030305]">Final Edge ($350)</option>
                              <option value="refresher" className="bg-[#030305]">The Polisher ($55/hr)</option>
                              <option value="power-five" className="bg-[#030305]">Power Pack ($250)</option>
                              <option value="mastery-ten" className="bg-[#030305]">Mastery Bundle ($450)</option>
                              <option value="general" className="bg-[#030305]">General Inquiry</option>
                           </select>
                        </div>
                     </motion.div>
                  </div>

                  <motion.div className="group space-y-2" whileHover={{ x: 4 }}>
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Message</label>
                     <textarea
                        name="message"
                        rows={4}
                        placeholder="Your experience level, preferred session times, or any inquiries..."
                        className="w-full bg-white/5 border border-white/10 rounded-4xl py-6 px-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10 resize-none"
                     />
                  </motion.div>

                  <motion.button
                     type="submit"
                     disabled={formState === "submitting"}
                     className="group relative w-full bg-accent text-primary py-6 rounded-2xl flex items-center justify-center gap-4 text-xl font-black overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-50"
                     whileHover={{ scale: 1.02 }}
                  >
                      {formState === "submitting" ? (
                         <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            TRANSMITTING...
                         </>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center gap-4">
                            REQUEST BOOKING <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                          <motion.div className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                        </>
                      )}
                  </motion.button>
               </form>

               <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20"
               >
                 {[
                   { icon: Bot, label: "AI Concierge" },
                   { icon: CreditCard, label: "Secure Pay" },
                   { icon: Bell, label: "Auto-Pulses" },
                   { icon: BarChart3, label: "Progress Intel" },
                 ].map((item, i) => (
                   <span key={i} className="flex items-center gap-1.5"><item.icon className="w-3 h-3 text-accent" /> {item.label}</span>
                 ))}
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}