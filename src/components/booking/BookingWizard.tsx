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
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

export default function BookingWizard() {
  const {
    step, goToStep,
    selectedLesson, setSelectedLesson,
    selectedDate,
    selectedTime, setSelectedTime,
    calendarMonth, prevMonth, nextMonth, handleDateClick,
    name, setName, email, setEmail, phone, setPhone,
    notes, setNotes,
    submitting, error, success, bookingRef, reset,
    lesson, stepProgress,
    canProceedFromLesson, canProceedFromDateTime, canProceedFromDetails,
    handleConfirm,
  } = useBooking();

  const canProceed =
    (step === "lesson" && canProceedFromLesson) ||
    (step === "datetime" && canProceedFromDateTime) ||
    (step === "details" && canProceedFromDetails) ||
    (step === "confirm" && !submitting);

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

        {/* Navigation footer */}
        <div className="mt-10 max-w-md mx-auto" role="group" aria-label={`Booking step: ${step}`}>
          {/* Screen-reader step announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {step === "lesson" && "Step 1: Select a lesson"}
            {step === "datetime" && "Step 2: Choose date and time"}
            {step === "details" && "Step 3: Enter your details"}
            {step === "confirm" && "Step 4: Confirm your booking"}
          </div>

          {step !== "confirm" ? (
            <div className="flex items-center gap-4">
              {step !== "lesson" && (
                <button
                  onClick={() => {
                    if (step === "datetime") goToStep("lesson");
                    if (step === "details") goToStep("datetime");
                  }}
                  disabled={submitting}
                  className="group relative flex-1 py-4 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  if (step === "lesson") goToStep("datetime");
                  if (step === "datetime") goToStep("details");
                  if (step === "details") goToStep("confirm");
                }}
                disabled={!canProceed}
                className={`group relative py-4 bg-accent text-primary rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed ${
                  step === "lesson" ? "w-full" : "flex-1"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Continue <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => goToStep("details")}
                disabled={submitting}
                className="group relative flex-1 py-4 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back
                </span>
              </button>

              <button
                onClick={handleConfirm}
                disabled={submitting}
                className="group relative flex-1 py-4 bg-accent text-primary rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden shadow-2xl shadow-accent/20 disabled:opacity-50"
              >
                {submitting ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Confirm Booking <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
