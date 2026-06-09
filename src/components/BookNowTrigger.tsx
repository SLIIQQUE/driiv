"use client";

import { type ReactNode } from "react";
import { useBookingContext } from "@/contexts/BookingContext";

interface BookNowTriggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Renders a button that opens the booking sidesheet.
 * Use this anywhere you previously had a link to "/?book=1".
 * Accepts children and className to match surrounding styling.
 */
export default function BookNowTrigger({ children, className }: BookNowTriggerProps) {
  const { openBooking } = useBookingContext();
  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
