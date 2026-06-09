"use client";

import { motion } from "motion/react";
import { Check, ShieldCheck, CalendarDays, User, Mail, Phone, MessageSquare } from "lucide-react";
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
  error: string;
}

export default function StepConfirm({
  lesson, selectedDate, selectedTime,
  name, email, phone, notes,
  error,
}: Props) {
  return (
    <motion.div
      key="confirm"
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
          <Check className="w-3 h-3 text-accent" />
          <span className="text-xs font-black uppercase tracking-widest text-accent/70">Final step</span>
        </motion.div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
          Confirm Your <span className="text-accent">Booking</span>
        </h2>
        <p className="text-white/40 text-xs mt-2 font-medium">
          Review everything before we lock it in.
        </p>
      </div>

      <div className="glass-card border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {lesson && (
            <div className="p-5 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-accent/60">Program</div>
                    <h3 className="text-base font-black text-white uppercase tracking-tighter">{lesson.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white tracking-tighter">{lesson.price}</div>
                  <div className="text-xs text-white/30 font-black uppercase tracking-widest">{lesson.period}</div>
                </div>
              </div>
              {lesson.savings && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 rounded-full mb-4">
                  <span className="text-[11px] font-black text-accent uppercase tracking-widest">{lesson.savings}</span>
                </div>
              )}
              <div className="grid grid-cols-1 gap-1.5">
                {lesson.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs font-bold text-white/50">
                    <Check className="w-3 h-3 text-accent shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-accent/60">Schedule</div>
                  <div className="text-xs font-black text-white">{formatDate(selectedDate)} at {selectedTime}</div>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <User className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-accent/60">Your Details</div>
                <div className="text-xs font-black text-white">{name}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-white/50 font-medium mt-2 ml-12">
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-accent" /> {email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-accent" /> {phone}</span>
            </div>
          </div>

          {notes && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-black uppercase tracking-widest text-accent/60">Notes</span>
              </div>
              <p className="text-xs text-white/50 font-medium">{notes}</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}
        </div>
      </div>


    </motion.div>
  );
}
