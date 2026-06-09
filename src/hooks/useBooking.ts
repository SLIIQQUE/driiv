"use client";

import { useState } from "react";
import { LESSONS } from "@/types/booking";
import { formatDate } from "@/lib/booking-utils";
import type { Step } from "@/lib/booking-utils";

export function useBooking() {
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
  const stepProgress = { lesson: 1, datetime: 2, details: 3, confirm: 4 }[step];
  const canProceedFromLesson = selectedLesson !== null;
  const canProceedFromDateTime = selectedDate !== null && selectedTime !== null;
  const canProceedFromDetails = !!(name.trim() && email.trim() && phone.trim());

  const prevMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const date = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const goToStep = (s: Step) => setStep(s);

  const reset = () => {
    setStep("lesson");
    setSelectedLesson(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCalendarMonth(() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setSubmitting(false);
    setSuccess(false);
    setBookingRef("");
    setError("");
  };

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

  return {
    step, goToStep,
    selectedLesson, setSelectedLesson,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    calendarMonth, prevMonth, nextMonth, handleDateClick,
    name, setName, email, setEmail, phone, setPhone,
    notes, setNotes,
    submitting, error, success, bookingRef,
    lesson, stepProgress,
    canProceedFromLesson, canProceedFromDateTime, canProceedFromDetails,
    handleConfirm, reset,
  };
}
