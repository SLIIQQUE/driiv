"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, ArrowRight, Loader2 } from "lucide-react";

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
          serviceType: data.service,
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
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Transmission Received</h2>
            <p className="text-xl text-white/50 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
              We&apos;ve received your request. One of our lead instructors will reach out via phone or email within 4 business hours.
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2 group"
            >
              New Submission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
               <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Secure Your <br /> Road Test</h2>
               <p className="text-white/40 mb-12 font-medium">Professional instruction in Surrey, BC. Start your journey today.</p>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="group space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                          <input 
                             name="name"
                             type="text" 
                             required 
                             placeholder="Kerry Hare"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                          />
                       </div>
                    </div>

                    {/* Email Input */}
                    <div className="group space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Email Address</label>
                       <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                          <input 
                             name="email"
                             type="email" 
                             required 
                             placeholder="kerry@example.com"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone Input */}
                    <div className="group space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Phone Number</label>
                       <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                          <input 
                             name="phone"
                             type="tel" 
                             required 
                             placeholder="(604) 000-0000"
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                          />
                       </div>
                    </div>

                    {/* Service Selection */}
                    <div className="group space-y-2">
                       <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Selected Service</label>
                       <div className="relative">
                          <MessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors pointer-events-none" />
                          <select 
                             name="service"
                             defaultValue=""
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white appearance-none focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold"
                          >
                             <option value="" disabled>Select course type</option>
                             <option value="standard" className="bg-[#030305]">Standard Driving Lessons</option>
                             <option value="intensive" className="bg-[#030305]">Intensive Driving Course</option>
                             <option value="block" className="bg-[#030305]">Block Booking</option>
                             <option value="pass-plus" className="bg-[#030305]">Pass Plus</option>
                             <option value="refresher" className="bg-[#030305]">Refresher Lessons</option>
                          </select>
                       </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">Additional Notes</label>
                    <textarea 
                       name="message"
                       rows={4}
                       placeholder="I haven't driven in 5 years and I'm very nervous..."
                       className="w-full bg-white/5 border border-white/10 rounded-4xl py-6 px-8 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                     type="submit"
                     disabled={formState === "submitting"}
                     className="w-full bg-accent text-primary py-6 rounded-2xl flex items-center justify-center gap-4 text-xl font-black group shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                     {formState === "submitting" ? (
                        <>
                           <Loader2 className="w-6 h-6 animate-spin" />
                           PROCESSING REQUEST...
                        </>
                     ) : (
                        <>
                           INITIALIZE BOOKING <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                     )}
                  </motion.button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
