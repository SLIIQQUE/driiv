"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { User, Mail, Phone, MessageSquare, ShieldCheck, CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/booking-utils";
import type { Lesson } from "@/types/booking";

interface Props {
  lesson: Lesson | undefined;
  selectedDate: Date | null;
  selectedTime: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangePhone: (v: string) => void;
  onChangeNotes: (v: string) => void;
}

export default function StepDetails({
  lesson, selectedDate, selectedTime,
  name, email, phone, notes,
  onChangeName, onChangeEmail, onChangePhone, onChangeNotes,
}: Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_CLEAN = phone.replace(/[\s\-\(\)\+]/g, "");
  const PHONE_REGEX = /^\d{7,15}$/;

  const getNameError = (): string => {
    if (!touched.name) return "";
    if (!name.trim()) return "Full name is required";
    return "";
  };

  const getEmailError = (): string => {
    if (!touched.email) return "";
    if (!email.trim()) return "Email is required";
    if (!EMAIL_REGEX.test(email)) return "Please enter a valid email";
    return "";
  };

  const getPhoneError = (): string => {
    if (!touched.phone) return "";
    if (!phone.trim()) return "Phone number is required";
    if (!PHONE_REGEX.test(PHONE_CLEAN)) return "Please enter a valid phone number";
    return "";
  };

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/20 bg-accent/10 rounded-full mb-3"
        >
          <User className="w-3 h-3 text-accent" aria-hidden="true" />
          <span className="text-xs font-black uppercase tracking-widest text-accent/70">Almost there</span>
        </motion.div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
          Your <span className="text-accent">Details</span>
        </h2>
        <p className="text-white/40 text-xs mt-2 font-medium">
          We&apos;ll send your confirmation and reminders to these contacts.
        </p>
      </div>

      {lesson && selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-white/5 rounded-xl p-4 mb-6"
        >
          <div className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-3">
            Booking Summary
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs text-white/30 font-black uppercase tracking-widest">Program</div>
                <div className="text-xs font-black text-white truncate">{lesson.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <CalendarDays className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs text-white/30 font-black uppercase tracking-widest">Date</div>
                <div className="text-xs font-black text-white truncate">{formatDate(selectedDate)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Clock className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs text-white/30 font-black uppercase tracking-widest">Time</div>
                <div className="text-xs font-black text-white">{selectedTime}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="glass-card border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center" aria-hidden="true">
                <User className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-xs font-black text-white uppercase tracking-tight">Personal Information</div>
                <div className="text-xs text-white/30 font-medium">How we reach you</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group space-y-1.5">
                <label htmlFor="booking-name" className="text-xs uppercase tracking-[0.3em] font-black text-white/30 ml-3 group-focus-within:text-accent transition-colors">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-accent transition-colors" aria-hidden="true" />
                  <input
                    id="booking-name"
                    type="text" value={name} onChange={(e) => onChangeName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Your legal name"
                    autoComplete="name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                  />
                </div>
                {getNameError() && (
                  <p className="text-red-400 text-[10px] mt-1.5 ml-3 font-medium" role="alert">
                    {getNameError()}
                  </p>
                )}
              </div>
              <div className="group space-y-1.5">
                <label htmlFor="booking-email" className="text-xs uppercase tracking-[0.3em] font-black text-white/30 ml-3 group-focus-within:text-accent transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-accent transition-colors" aria-hidden="true" />
                  <input
                    id="booking-email"
                    type="email" value={email} onChange={(e) => onChangeEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@email.com"
                    autoComplete="email"
                    aria-invalid={!!getEmailError()}
                    aria-describedby={getEmailError() ? "email-error" : undefined}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                  />
                </div>
                {getEmailError() && (
                  <p id="email-error" className="text-red-400 text-[10px] mt-1.5 ml-3 font-medium" role="alert">
                    {getEmailError()}
                  </p>
                )}
              </div>
            </div>

            <div className="group space-y-1.5 mt-4">
              <label htmlFor="booking-phone" className="text-xs uppercase tracking-[0.3em] font-black text-white/30 ml-3 group-focus-within:text-accent transition-colors">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-accent transition-colors" aria-hidden="true" />
                  <input
                    id="booking-phone"
                    type="tel" value={phone} onChange={(e) => onChangePhone(e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="+1 (604) 000-0000"
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                  />
                </div>
                {getPhoneError() && (
                  <p className="text-red-400 text-[10px] mt-1.5 ml-3 font-medium" role="alert">
                    {getPhoneError()}
                  </p>
                )}
              </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center" aria-hidden="true">
                <MessageSquare className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-xs font-black text-white uppercase tracking-tight">Additional Notes</div>
                <div className="text-xs text-white/30 font-medium">Optional</div>
              </div>
            </div>
            <div className="group space-y-1.5">
              <textarea
                value={notes} onChange={(e) => onChangeNotes(e.target.value)}
                rows={2} placeholder="Experience level, special requests, preferred pickup location..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10 resize-none"
              />
            </div>
          </div>
        </div>
      </div>


    </motion.div>
  );
}
