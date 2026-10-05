"use client";

import { useState } from "react";
import { ALPHABET } from "@/lib/data";
import SpeakButton from "@/components/SpeakButton";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
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
                speak(l.toLowerCase());
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
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-mist pt-4">
        <div>
          <p className="font-display text-2xl font-bold">
            {letter}{" "}
            <span className="text-base font-medium text-ink/55">{viet}</span>
          </p>
          <p className="mt-1 text-sm text-ink/70">
            <span className="font-semibold text-ink">{word}</span> · {meaning}
          </p>
        </div>
        <SpeakButton
          text={`${letter.toLowerCase()}. ${word}`}
          label={`Đọc chữ ${letter} và từ ${word}`}
        />
      </div>
    </section>
  );
}
