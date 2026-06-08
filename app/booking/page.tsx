"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays, Clock, User, Mail, Phone,
  Check, ArrowRight, ArrowLeft, Sparkles,
  ChevronLeft, ChevronRight, Bot, Bell,
  CreditCard, BarChart3, Car, ShieldCheck,
  Loader2, MessageSquare, Star,
} from "lucide-react";
import Link from "next/link";
import { LESSONS } from "@/types/booking";

type Step = "lesson" | "datetime" | "details" | "confirm";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getAvailableSlots(date: Date): string[] {
  const day = date.getDay();
  if (day === 0) return [];
  if (day === 6) {
    return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  }
  return [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];
}

function isDateDisabled(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  if (d <= today) return true;
  if (d.getDay() === 0) return true;
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  return d > maxDate;
}

export default function BookingPage() {
  const [step, setStep] = useState<Step>("lesson");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");

  const lesson = LESSONS.find((l) => l.id === selectedLesson);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay();
    const days: (number | null)[] = [];

    for (let i = 0; i < startPad; i++) days.push(null);

    for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);

    while (days.length % 7 !== 0) days.push(null);

    return days;
  }, [calendarMonth]);

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  const formatDate = (d: Date) =>
    `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  const canProceedFromLesson = selectedLesson !== null;
  const canProceedFromDateTime = selectedDate !== null && selectedTime !== null;
  const canProceedFromDetails = name.trim() && email.trim() && phone.trim();

  const handleConfirm = async () => {
    if (!lesson || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          lessonId: lesson.id,
          lessonName: lesson.name,
          lessonPrice: lesson.price,
          preferredDate: formatDate(selectedDate),
          preferredTime: selectedTime,
          notes,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setBookingRef(data.booking.id.slice(0, 8).toUpperCase());
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepProgress = { lesson: 1, datetime: 2, details: 3, confirm: 4 }[step];

  const renderProgressIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-16">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${
              stepProgress >= s
                ? "bg-accent text-primary shadow-lg shadow-accent/20"
                : "bg-white/5 text-white/20"
            }`}
          >
            {stepProgress > s ? <Check className="w-4 h-4" /> : s}
          </div>
          {s < 4 && (
            <div
              className={`w-12 h-px transition-all duration-500 ${
                stepProgress > s ? "bg-accent/50" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (success) {
    return (
      <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden min-h-screen flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-card p-12 lg:p-20 text-center max-w-2xl mx-auto relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <motion.div
                className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent/20"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Car className="w-12 h-12 text-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                  Booking <span className="text-accent">Confirmed</span>
                </h1>
                <p className="text-xl text-white/50 max-w-md mx-auto mb-8 font-medium leading-relaxed">
                  You&apos;re on the road to mastery. We&apos;ve received your booking and will send a confirmation to your email shortly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass-card border-white/5 rounded-[2rem] p-8 mb-10 max-w-sm mx-auto"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                  Reference
                </div>
                <div className="text-3xl font-black text-white tracking-tighter font-mono">
                  #{bookingRef}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-4"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 group"
                >
                  Return Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20 mt-8">
                  <span className="flex items-center gap-1.5"><Bot className="w-3 h-3 text-accent" /> AI Concierge</span>
                  <span className="flex items-center gap-1.5"><Bell className="w-3 h-3 text-accent" /> Auto-Reminders</span>
                  <span className="flex items-center gap-1.5"><CreditCard className="w-3 h-3 text-accent" /> Secure Pay</span>
                  <span className="flex items-center gap-1.5"><BarChart3 className="w-3 h-3 text-accent" /> Progress Intel</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-20 lg:mb-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Book Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-6"
          >
            Secure Your <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Session.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
          >
            Book online in under sixty seconds. Instant confirmation, zero friction, cryptographic security.
          </motion.p>
        </div>
      </section>

      {renderProgressIndicator()}

      <section className="container">
        <AnimatePresence mode="wait">
          {step === "lesson" && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-4"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Choose your program</span>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                  Select a <span className="text-accent">Lesson</span> Package
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LESSONS.map((l, i) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => setSelectedLesson(l.id)}
                    className={`premium-card p-8 lg:p-10 flex flex-col group relative overflow-hidden cursor-pointer transition-all duration-500 ${
                      selectedLesson === l.id
                        ? "border-accent/50 bg-accent/[0.03] ring-1 ring-accent/30 shadow-2xl shadow-accent/10"
                        : "hover:border-accent/20"
                    }`}
                  >
                    {l.popular && (
                      <div className="absolute top-6 right-6">
                        <span className="px-3 py-1 bg-accent text-primary text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20">
                          Best Value
                        </span>
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${l.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>

                    <div className="mb-6">
                      <div className="text-[9px] font-black uppercase tracking-[0.25em] text-accent/60 mb-1">
                        {l.period}
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                        {l.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-black text-white tracking-tighter">
                        {l.price}
                      </span>
                      {l.savings && (
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                          {l.savings}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-white/40 font-medium leading-relaxed mb-6 line-clamp-2">
                      {l.description}
                    </p>

                    <div className="space-y-2.5 mb-8 flex-1">
                      {l.features.slice(0, 4).map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-xs font-bold text-white/50">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                      selectedLesson === l.id
                        ? "bg-accent text-primary shadow-lg shadow-accent/20"
                        : "bg-white/5 text-white/60 group-hover:bg-white/10"
                    }`}>
                      {selectedLesson === l.id ? "Selected" : "Select"} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-12"
              >
                <button
                  onClick={() => setStep("datetime")}
                  disabled={!canProceedFromLesson}
                  className="group relative px-14 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === "datetime" && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-4"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Pick your moment</span>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                  Choose <span className="text-accent">Date</span> & Time
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="glass-card border-white/5 rounded-[2.5rem] p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={prevMonth}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-white/60" />
                    </button>
                    <div className="text-lg font-black text-white uppercase tracking-tight">
                      {MONTHS[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                    </div>
                    <button
                      onClick={nextMonth}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-white/60" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 mb-4">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-white/20 py-2">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, i) => {
                      if (day === null) return <div key={`empty-${i}`} />;
                      const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                      const disabled = isDateDisabled(date);
                      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                      const today = new Date();
                      const isToday = date.toDateString() === today.toDateString();

                      return (
                        <button
                          key={i}
                          onClick={() => handleDateClick(day)}
                          disabled={disabled}
                          className={`w-full aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                            isSelected
                              ? "bg-accent text-primary shadow-lg shadow-accent/20"
                              : isToday
                              ? "text-accent border border-accent/30"
                              : disabled
                              ? "text-white/10 cursor-not-allowed"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="glass-card border-white/5 rounded-[2.5rem] p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-lg font-black text-white uppercase tracking-tight">
                      Available Slots
                    </span>
                  </div>

                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center py-16 text-white/20">
                      <CalendarDays className="w-12 h-12 mb-4" />
                      <p className="text-sm font-bold">Select a date first</p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-white/20">
                      <Clock className="w-12 h-12 mb-4" />
                      <p className="text-sm font-bold">No availability on this day</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-4 rounded-2xl text-sm font-black tracking-wide transition-all duration-200 ${
                            selectedTime === slot
                              ? "bg-accent text-primary shadow-lg shadow-accent/20"
                              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Selected Slot</div>
                      <div className="text-white font-bold flex items-center gap-3">
                        <CalendarDays className="w-4 h-4 text-accent" />
                        {formatDate(selectedDate)}
                        <span className="text-white/30">|</span>
                        <Clock className="w-4 h-4 text-accent" />
                        {selectedTime}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={() => setStep("lesson")}
                  className="group relative px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden hover:bg-white/10 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </span>
                </button>
                <button
                  onClick={() => setStep("details")}
                  disabled={!canProceedFromDateTime}
                  className="group relative px-14 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-4"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Almost there</span>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                  Your <span className="text-accent">Details</span>
                </h2>
              </div>

              <div className="glass-card border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                        />
                      </div>
                    </div>

                    <div className="group space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (604) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-4 group-focus-within:text-accent transition-colors">
                      Notes <span className="text-white/10">(optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-5 top-5 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Anything we should know? Experience level, special requests..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold placeholder:text-white/10 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={() => setStep("datetime")}
                  className="group relative px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden hover:bg-white/10 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </span>
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  disabled={!canProceedFromDetails}
                  className="group relative px-14 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Review Booking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-4"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Final step</span>
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                  Confirm Your <span className="text-accent">Booking</span>
                </h2>
              </div>

              <div className="glass-card border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[120px] pointer-events-none" />

                <div className="relative z-10 space-y-8">
                  {lesson && (
                    <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                        Program
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                            {lesson.name}
                          </h3>
                          <p className="text-sm text-white/40 font-medium">{lesson.period}</p>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tighter">
                          {lesson.price}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                        Schedule
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <CalendarDays className="w-4 h-4 text-accent" />
                          {formatDate(selectedDate)}
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Clock className="w-4 h-4 text-accent" />
                          {selectedTime}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">
                      Your Details
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <User className="w-3.5 h-3.5 text-accent" />
                        {name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail className="w-3.5 h-3.5 text-accent" />
                        {email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Phone className="w-3.5 h-3.5 text-accent" />
                        {phone}
                      </div>
                    </div>
                  </div>

                  {notes && (
                    <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">
                        Notes
                      </div>
                      <p className="text-sm text-white/50 font-medium">{notes}</p>
                    </div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={() => setStep("details")}
                  disabled={submitting}
                  className="group relative px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </span>
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="group relative px-14 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="relative z-10 flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-3">
                        Confirm Booking <Check className="w-4 h-4" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20"
        >
          {[
            { icon: Bot, label: "AI Concierge" },
            { icon: Bell, label: "Auto-Reminders" },
            { icon: CreditCard, label: "Secure Pay" },
            { icon: BarChart3, label: "Progress Intel" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <item.icon className="w-3 h-3 text-accent" /> {item.label}
            </span>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
