"use client";

import { useEffect, useReducer } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, XCircle } from "lucide-react";
import { MONTHS, getBusySlotsForDate, formatDateParam } from "@/lib/booking-utils";
import CalendarGrid from "./CalendarGrid";
import TimeSlotGrid from "./TimeSlotGrid";

interface SlotState {
  busySlots: string[];
  isChecking: boolean;
  error: string | null;
}

type SlotAction =
  | { type: "checking" }
  | { type: "loaded"; slots: string[]; error?: string | null }
  | { type: "clear" };

function slotReducer(state: SlotState, action: SlotAction): SlotState {
  switch (action.type) {
    case "checking":
      return { busySlots: [], isChecking: true, error: null };
    case "loaded":
      return { busySlots: action.slots, isChecking: false, error: action.error ?? null };
    case "clear":
      return { busySlots: [], isChecking: false, error: null };
  }
}

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  calendarMonth: Date;
  onDateClick: (day: number) => void;
  onTimeSelect: (time: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onCalendarError?: (hasError: boolean) => void;
}

export default function StepDateTime({
  selectedDate, selectedTime, calendarMonth,
  onDateClick, onTimeSelect, onPrevMonth, onNextMonth,
  onCalendarError,
}: Props) {
  const [slotState, dispatch] = useReducer(slotReducer, {
    busySlots: [],
    isChecking: false,
    error: null,
  });

  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = formatDateParam(selectedDate);
    let cancelled = false;

    dispatch({ type: "checking" });
    onCalendarError?.(false); // Reset error while checking

    getBusySlotsForDate(dateStr).then((result) => {
      if (!cancelled) {
        dispatch({ type: "loaded", slots: result.busySlots, error: result.error });
        onCalendarError?.(result.error !== null);
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
          <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
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
              aria-label="Previous month"
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-white/60" aria-hidden="true" />
            </button>
            <div className="text-sm font-black text-white uppercase tracking-tight">
              {MONTHS[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
            </div>
            <button
              onClick={onNextMonth}
              aria-label="Next month"
              className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-white/60" aria-hidden="true" />
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
          busySlots={slotState.busySlots}
          isCheckingAvailability={slotState.isChecking}
          hasCalendarError={!!slotState.error}
        />

        {slotState.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
            role="alert"
          >
            <p className="text-xs font-bold text-red-400 flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{slotState.error}</span>
            </p>
            <p className="text-[10px] text-red-400/60 font-medium mt-1.5 ml-5.5">
              Please try reloading the page or contact us to book.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
