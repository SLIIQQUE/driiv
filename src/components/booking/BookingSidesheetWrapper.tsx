"use client";

import dynamic from "next/dynamic";

const BookingSidesheet = dynamic(
  () => import("@/components/booking/BookingSidesheet"),
  { ssr: false }
);

export default function BookingSidesheetWrapper() {
  return <BookingSidesheet />;
}
