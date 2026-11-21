"use client";

import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";

export default function SpeakButton({
  text,
  label,
  lang = "en-US",
  className = "",
}: {
  text: string;
  label: string;
  lang?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => speak(text, { lang })}
      aria-label={label}
      title={label}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ink/55 hover:bg-mist hover:text-sea ${className}`}
    >
      <Volume2 size={16} aria-hidden="true" />
    </button>
  );
}
