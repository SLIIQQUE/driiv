"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBookingContext } from "@/contexts/BookingContext";
import { useBooking } from "@/hooks/useBooking";
import { SidesheetHeader } from "./SidesheetHeader";
import SidesheetFooter from "./SidesheetFooter";
import StepLesson from "./StepLesson";
import StepDateTime from "./StepDateTime";
import StepDetails from "./StepDetails";
import StepConfirm from "./StepConfirm";
import BookingSuccess from "./BookingSuccess";
import TrustBadges from "./TrustBadges";

export default function BookingSidesheet() {
  const { isOpen, closeBooking } = useBookingContext();
  const booking = useBooking();

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeBooking();
    },
    [closeBooking],
  );

  const panelRef = useRef<HTMLDivElement>(null);

  // Reset booking state when sidesheet closes + scroll lock
  useEffect(() => {
    if (!isOpen) {
      booking.reset();
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus the panel when it opens
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  const handlePanelKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeBooking();
      return;
    }

    // Simple focus trap
    if (e.key === "Tab") {
      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, [closeBooking]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={handleBackdropClick}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full md:w-[60vw] lg:w-[35vw] h-full bg-[#0a0f1a] border-l border-white/5 shadow-2xl flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        role="dialog"
        aria-modal="true"
        aria-label="Book a driving lesson"
        onKeyDown={handlePanelKeyDown}
      >
        <SidesheetHeader
          step={booking.step}
          stepProgress={booking.stepProgress}
          onClose={closeBooking}
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-6">
          {booking.success ? (
            <BookingSuccess
              bookingRef={booking.bookingRef}
              lesson={booking.lesson}
              selectedDate={booking.selectedDate}
              selectedTime={booking.selectedTime}
              name={booking.name}
              email={booking.email}
              phone={booking.phone}
              notes={booking.notes}
              onReturnHome={closeBooking}
              onBookAnother={() => booking.reset()}
            />
          ) : (
            <AnimatePresence mode="wait">
              {booking.step === "lesson" && (
                <StepLesson
                  key="lesson"
                  selectedLesson={booking.selectedLesson}
                  onSelectLesson={booking.setSelectedLesson}
                />
              )}
              {booking.step === "datetime" && (
                <StepDateTime
                  key="datetime"
                  selectedDate={booking.selectedDate}
                  selectedTime={booking.selectedTime}
                  calendarMonth={booking.calendarMonth}
                  onDateClick={booking.handleDateClick}
                  onTimeSelect={booking.setSelectedTime}
                  onPrevMonth={booking.prevMonth}
                  onNextMonth={booking.nextMonth}
                  onCalendarError={(hasError) => booking.setCalendarError(hasError)}
                />
              )}
              {booking.step === "details" && (
                <StepDetails
                  key="details"
                  lesson={booking.lesson}
                  selectedDate={booking.selectedDate}
                  selectedTime={booking.selectedTime}
                  name={booking.name}
                  email={booking.email}
                  phone={booking.phone}
                  notes={booking.notes}
                  onChangeName={booking.setName}
                  onChangeEmail={booking.setEmail}
                  onChangePhone={booking.setPhone}
                  onChangeNotes={booking.setNotes}
                />
              )}
              {booking.step === "confirm" && (
                <StepConfirm
                  key="confirm"
                  lesson={booking.lesson}
                  selectedDate={booking.selectedDate}
                  selectedTime={booking.selectedTime}
                  name={booking.name}
                  email={booking.email}
                  phone={booking.phone}
                  notes={booking.notes}
                  error={booking.error}
                />
              )}
            </AnimatePresence>
          )}

          {!booking.success && <TrustBadges />}
        </div>

        {/* Sticky footer with navigation buttons */}
        {!booking.success && (
          <SidesheetFooter
            step={booking.step}
            canProceed={
              (booking.step === "lesson" && booking.canProceedFromLesson) ||
              (booking.step === "datetime" && booking.canProceedFromDateTime) ||
              (booking.step === "details" && booking.canProceedFromDetails) ||
              (booking.step === "confirm" && !booking.submitting)
            }
            submitting={booking.submitting}
            onBack={() => {
              if (booking.step === "datetime") booking.goToStep("lesson");
              if (booking.step === "details") booking.goToStep("datetime");
              if (booking.step === "confirm") booking.goToStep("details");
            }}
            onNext={() => {
              if (booking.step === "lesson") booking.goToStep("datetime");
              if (booking.step === "datetime") booking.goToStep("details");
              if (booking.step === "details") booking.goToStep("confirm");
            }}
            onConfirm={booking.handleConfirm}
          />
        )}
      </motion.div>
    </div>
  );
}
