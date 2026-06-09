"use client";

import { motion } from "motion/react";
import { CalendarDays, Clock } from "lucide-react";
import { getAvailableSlots, formatDate } from "@/lib/booking-utils";

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export default function TimeSlotGrid({ selectedDate, selectedTime, onTimeSelect }: Props) {
  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  return (
    <div className="glass-card border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-accent" />
        <span className="text-sm font-black text-white uppercase tracking-tight">
          Available Slots
        </span>
      </div>

      {!selectedDate ? (
        <div className="flex flex-col items-center justify-center py-10 text-white/20">
          <CalendarDays className="w-10 h-10 mb-3" />
          <p className="text-xs font-bold">Select a date first</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-white/20">
          <Clock className="w-10 h-10 mb-3" />
          <p className="text-xs font-bold">No availability on this day</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeSelect(slot)}
              className={`py-3 rounded-xl text-xs font-black tracking-wide transition-all duration-200 ${
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
          className="mt-5 p-4 bg-white/5 rounded-xl border border-white/5"
        >
          <div className="text-xs font-black uppercase tracking-widest text-accent mb-1.5">
            Selected Slot
          </div>
          <div className="text-sm font-bold flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5 text-accent" />
            {formatDate(selectedDate)}
            <span className="text-white/30">|</span>
            <Clock className="w-3.5 h-3.5 text-accent" />
            {selectedTime}
          </div>
        </motion.div>
      )}
    </div>
  );
}
