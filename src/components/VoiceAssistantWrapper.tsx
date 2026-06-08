"use client";

import dynamic from "next/dynamic";

const VoiceAssistantInner = dynamic(
  () => import("@/components/VoiceAssistant").then((mod) => ({ default: mod.VoiceAssistant })),
  { ssr: false }
);

export default function VoiceAssistantWrapper() {
  return <VoiceAssistantInner />;
}
