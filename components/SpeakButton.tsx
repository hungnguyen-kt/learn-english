"use client";

import { Volume2 } from "lucide-react";

export default function SpeakButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label: string;
  className?: string;
}) {
  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label}
      title={label}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ink/55 hover:bg-mist hover:text-sea ${className}`}
    >
      <Volume2 size={16} aria-hidden="true" />
    </button>
  );
}
