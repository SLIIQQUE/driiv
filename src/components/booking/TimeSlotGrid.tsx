"use client";

import { motion } from "motion/react";
import { CalendarDays, Clock, Loader2, XCircle } from "lucide-react";
import { getAvailableSlots, formatDate } from "@/lib/booking-utils";

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  busySlots?: string[];
  isCheckingAvailability?: boolean;
  hasCalendarError?: boolean;
}

export default function TimeSlotGrid({
  selectedDate, selectedTime, onTimeSelect,
  busySlots = [], isCheckingAvailability = false, hasCalendarError = false,
}: Props) {
  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  return (
    <div className="glass-card border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-accent" aria-hidden="true" />
        <span className="text-sm font-black text-white uppercase tracking-tight">
          Available Slots
        </span>
        {isCheckingAvailability && (
          <span className="inline-flex items-center gap-1.5 ml-auto text-[10px] font-bold uppercase tracking-wider text-white/60">
            <Loader2 className="w-3 h-3 animate-spin" />
            Checking availability
          </span>
        )}
      </div>

      {!selectedDate ? (
        <div className="flex flex-col items-center justify-center py-10 text-white/50">
          <CalendarDays className="w-10 h-10 mb-3" />
          <p className="text-xs font-bold">Select a date first</p>
        </div>
      ) : hasCalendarError ? (
        <div className="flex flex-col items-center justify-center py-10 text-red-400/60">
          <XCircle className="w-8 h-8 mb-3" />
          <p className="text-xs font-bold text-center">Calendar temporarily unavailable</p>
          <p className="text-[10px] text-red-400/40 mt-1">Please try again later or contact us.</p>
        </div>
      ) : isCheckingAvailability ? (
        <div className="flex flex-col items-center justify-center py-10 text-white/50">
          <Loader2 className="w-8 h-8 mb-3 animate-spin" />
          <p className="text-xs font-bold">Checking calendar availability...</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-white/50">
          <Clock className="w-10 h-10 mb-3" />
          <p className="text-xs font-bold">No availability on this day</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => {
            const isBusy = busySlots.includes(slot);
            return (
              <button
                key={slot}
                onClick={() => {
                  if (!isBusy) onTimeSelect(slot);
                }}
                disabled={isBusy}
                className={`py-3 rounded-xl text-xs font-black tracking-wide transition-all duration-200 relative ${
                  selectedTime === slot
                    ? "bg-accent text-primary shadow-lg shadow-accent/20"
                    : isBusy
                      ? "bg-white/[0.03] text-white/15 cursor-not-allowed line-through"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {slot}
                {isBusy && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 bg-white/10 text-[9px] font-bold uppercase tracking-wider text-white/60 px-1.5 py-0.5 rounded-md">
                    <XCircle className="w-2.5 h-2.5" />
                    Busy
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedDate && selectedTime && !isCheckingAvailability && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 p-4 bg-white/5 rounded-xl border border-white/5"
        >
          <div className="text-xs font-black uppercase tracking-widest text-accent mb-1.5">
            Selected Slot
          </div>
          <div className="text-sm font-bold flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5 text-accent" />
            {formatDate(selectedDate)}
            <span className="text-white/60">|</span>
            <Clock className="w-3.5 h-3.5 text-accent" />
            {selectedTime}
          </div>
        </motion.div>
      )}
    </div>
  );
}
