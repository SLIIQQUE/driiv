"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { MONTHS, getBusySlotsForDate, formatDateParam } from "@/lib/booking-utils";
import CalendarGrid from "./CalendarGrid";
import TimeSlotGrid from "./TimeSlotGrid";

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  calendarMonth: Date;
  onDateClick: (day: number) => void;
  onTimeSelect: (time: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function StepDateTime({
  selectedDate, selectedTime, calendarMonth,
  onDateClick, onTimeSelect, onPrevMonth, onNextMonth,
}: Props) {
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setBusySlots([]);
      return;
    }

    const dateStr = formatDateParam(selectedDate);
    let cancelled = false;

    setIsCheckingAvailability(true);

    getBusySlotsForDate(dateStr).then((slots) => {
      if (!cancelled) {
        setBusySlots(slots);
        setIsCheckingAvailability(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  return (
    <motion.div
      key="datetime"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/20 bg-accent/10 rounded-full mb-3"
        >
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-xs font-black uppercase tracking-widest text-accent/70">
            Pick your moment
          </span>
        </motion.div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">
          Choose <span className="text-accent">Date</span> & Time
        </h2>
      </div>

      <div className="space-y-6">
        <div className="glass-card border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onPrevMonth}
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-white/60" />
            </button>
            <div className="text-sm font-black text-white uppercase tracking-tight">
              {MONTHS[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
            </div>
            <button
              onClick={onNextMonth}
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-white/60" />
            </button>
          </div>
          <CalendarGrid
            calendarMonth={calendarMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>

        <TimeSlotGrid
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
          busySlots={busySlots}
          isCheckingAvailability={isCheckingAvailability}
        />
      </div>
    </motion.div>
  );
}
