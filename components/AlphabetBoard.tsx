"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { ALPHABET } from "@/lib/data";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 1;
  window.speechSynthesis.speak(u);
}

export default function AlphabetBoard() {
  const [i, setI] = useState(0);
  const [letter, viet, word, meaning] = ALPHABET[i];

  return (
    <section
      aria-labelledby="alphabet-title"
      className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-mist sm:p-6"
    >
      <h2 id="alphabet-title" className="mb-4 font-display text-xl font-bold">
        Thử ngay: chạm vào một chữ cái
      </h2>
      <div className="grid">
        <div className="grid grid-cols-9 gap-6">
          {ALPHABET.map(([l], idx) => (
            <button
              key={l}
              onClick={() => {
                setI(idx);
                speak(l.toLocaleLowerCase());
              }}
              aria-pressed={idx === i}
              className={`aspect-square rounded-xl font-display text-xl font-bold transition-colors ${
                idx === i
                  ? "bg-ink text-sun"
                  : "bg-paper text-ink hover:bg-mist"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
