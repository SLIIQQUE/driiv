"use client";

import { motion, AnimatePresence } from "motion/react";
import { useBooking } from "@/hooks/useBooking";
import ProgressIndicator from "./ProgressIndicator";
import StepLesson from "./StepLesson";
import StepDateTime from "./StepDateTime";
import StepDetails from "./StepDetails";
import StepConfirm from "./StepConfirm";
import BookingSuccess from "./BookingSuccess";
import TrustBadges from "./TrustBadges";

export default function BookingWizard() {
  const {
    step,
    selectedLesson, setSelectedLesson,
    selectedDate,
    selectedTime, setSelectedTime,
    calendarMonth, prevMonth, nextMonth, handleDateClick,
    name, setName, email, setEmail, phone, setPhone,
    notes, setNotes,
    error, success, bookingRef, reset,
    lesson, stepProgress,
  } = useBooking();

  if (success) {
    return (
      <BookingSuccess
        bookingRef={bookingRef}
        lesson={lesson}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        name={name}
        email={email}
        phone={phone}
        notes={notes}
        onBookAnother={reset}
      />
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
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">Session.</span>
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

      <div className="my-8">
        <ProgressIndicator stepProgress={stepProgress} />
      </div>

      <section className="container">
        <AnimatePresence mode="wait">
          {step === "lesson" && (
            <StepLesson
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
            />
          )}
          {step === "datetime" && (
            <StepDateTime
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              calendarMonth={calendarMonth}
              onDateClick={handleDateClick}
              onTimeSelect={setSelectedTime}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
            />
          )}
          {step === "details" && (
            <StepDetails
              lesson={lesson}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              name={name} email={email} phone={phone} notes={notes}
              onChangeName={setName}
              onChangeEmail={setEmail}
              onChangePhone={setPhone}
              onChangeNotes={setNotes}
            />
          )}
          {step === "confirm" && (
            <StepConfirm
              lesson={lesson}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              name={name} email={email} phone={phone} notes={notes}
              error={error}
            />
          )}
        </AnimatePresence>

        <TrustBadges />
      </section>
    </main>
  );
}
