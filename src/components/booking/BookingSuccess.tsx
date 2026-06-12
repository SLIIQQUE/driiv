"use client";

import { motion } from "motion/react";
import { Check, ShieldCheck, CalendarDays, Clock, Mail, Bell, Car, User, Phone, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/booking-utils";
import type { Lesson } from "@/types/booking";

interface Props {
  bookingRef: string;
  lesson: Lesson | undefined;
  selectedDate: Date | null;
  selectedTime: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
  /** Called when "Return Home" is clicked (e.g. to close the sidesheet) */
  onReturnHome?: () => void;
  /** Called when "Book Another" is clicked (e.g. to reset booking state) */
  onBookAnother?: () => void;
}

export default function BookingSuccess({
  bookingRef, lesson, selectedDate, selectedTime,
  name, email, phone, notes,
  onReturnHome, onBookAnother,
}: Props) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start gap-3 mb-5">
          <motion.div
            className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 shrink-0 mt-0.5 relative"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            <div className="absolute inset-0 rounded-xl bg-accent/20 blur-md" />
            <Check className="w-5 h-5 text-primary relative z-10" />
          </motion.div>
          <div className="relative">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-1">
              <div className="w-5 h-px bg-accent/60" />
              Booking Confirmed
            </div>
            <h1 className="text-lg font-black text-white leading-[1.1] tracking-tighter">
              You&apos;re all set, <span className="text-accent">{name.split(" ")[0]}</span>
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border-white/5 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px bg-accent/40" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/60">Booking Details</span>
              </div>

              {lesson && (
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-xl bg-accent/10 blur-sm" />
                      <ShieldCheck className="w-5 h-5 text-accent relative z-10" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{lesson.name}</div>
                      <div className="text-xs text-white/40 font-medium">{lesson.period}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-white tracking-tighter">{lesson.price}</div>
                    {lesson.savings && (
                      <div className="inline-block mt-0.5 px-2 py-0.5 bg-accent/10 rounded-full text-[11px] font-black text-accent uppercase tracking-widest">{lesson.savings}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDate && selectedTime && (
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Date</div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-black text-white">{formatDate(selectedDate)}</span>
                    </div>
                  </div>
                )}
                {selectedTime && (
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Time</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-black text-white">{selectedTime}</span>
                    </div>
                  </div>
                )}
              </div>

              {lesson?.features && lesson.features.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-px bg-accent/30" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/50">What&apos;s Included</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {lesson.features.slice(0, 4).map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-bold text-white/50 group hover:text-white/70 transition-colors">
                        <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Check className="w-2.5 h-2.5 text-accent" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="glass-card border-white/5 rounded-2xl p-5 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px bg-accent/40" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent/60">Reference</span>
              </div>
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 rounded-xl border border-accent/10" />
                <div className="text-xl font-black text-white tracking-tighter font-mono relative">#{bookingRef}</div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 p-2 bg-white/[0.02] rounded-lg">
                  <User className="w-3 h-3 text-accent" />
                  <span className="text-xs font-bold text-white/70 truncate max-w-[90px]">{name}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-white/[0.02] rounded-lg">
                  <Mail className="w-3 h-3 text-accent" />
                  <span className="text-xs font-bold text-white/70 truncate max-w-[110px]">{email}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-white/[0.02] rounded-lg">
                  <Phone className="w-3 h-3 text-accent" />
                  <span className="text-xs font-bold text-white/70">{phone}</span>
                </div>
              </div>

              {notes && (
                <div className="pt-4 mt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare className="w-3 h-3 text-accent" />
                    <span className="text-xs font-black uppercase tracking-widest text-accent/60">Notes</span>
                  </div>
                  <p className="text-xs text-white/50 font-medium leading-relaxed p-2.5 bg-white/[0.02] rounded-lg">{notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              { step: "01", label: "Confirmation Email", desc: "Receipt on its way", icon: Mail },
              { step: "02", label: "Auto-Reminders", desc: "48h and 2h before your session", icon: Bell },
              { step: "03", label: "Show Up & Drive", desc: "Meet your instructor at the arranged time", icon: Car },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-accent/40 uppercase tracking-widest">{item.step}</div>
                    <div className="text-[11px] font-black text-white">{item.label}</div>
                    <div className="text-xs text-white/40 font-medium">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-6">
          <Link
            href="/"
            onClick={onReturnHome}
            className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-primary rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden shadow-lg shadow-accent/15"
          >
            <span className="relative z-10 flex items-center gap-2">
              Return Home <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          <button
            type="button"
            onClick={onBookAnother}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
          >
            Book Another
          </button>
        </div>
      </motion.div>
    </div>
  );
}
