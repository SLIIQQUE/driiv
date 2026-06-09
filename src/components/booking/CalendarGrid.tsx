"use client";

import { useMemo } from "react";
import { isDateDisabled } from "@/lib/booking-utils";

interface Props {
  calendarMonth: Date;
  selectedDate: Date | null;
  onDateClick: (day: number) => void;
}

export default function CalendarGrid({ calendarMonth, selectedDate, onDateClick }: Props) {
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

  const DAYS_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <>
      <div className="grid grid-cols-7 mb-4">
        {DAYS_HEADERS.map((d) => (
          <div key={d} className="text-center text-xs font-black uppercase tracking-widest text-white/20 py-2">
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
              onClick={() => onDateClick(day)}
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
    </>
  );
}
