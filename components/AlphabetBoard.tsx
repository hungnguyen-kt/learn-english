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
    <section aria-labelledby="alphabet-title" className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-mist sm:p-6">
      <h2 id="alphabet-title" className="mb-4 font-display text-xl font-bold">Thử ngay: chạm vào một chữ cái</h2>
      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <div className="grid grid-cols-7 gap-2 sm:grid-cols-9 md:grid-cols-7 lg:grid-cols-9">
          {ALPHABET.map(([l], idx) => (
            <button
              key={l}
              onClick={() => { setI(idx); speak(l.toLocaleLowerCase()); }}
              aria-pressed={idx === i}
              className={`aspect-square rounded-xl font-display text-xl font-bold transition-colors ${
                idx === i ? "bg-ink text-sun" : "bg-paper text-ink hover:bg-mist"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-ink p-5 text-white" aria-live="polite">
          <div className="flex items-end gap-3">
            <span className="font-display text-7xl font-extrabold leading-none text-sun">{letter}</span>
            <span className="pb-1 font-display text-4xl font-bold leading-none text-white/70">{letter.toLowerCase()}</span>
          </div>
          <p className="mt-4 text-sm text-white/70">Đọc gần giống</p>
          <p className="text-2xl font-semibold">“{viet}”</p>
          <div className="mt-4 border-t border-white/15 pt-4">
            <p className="text-lg font-semibold">{word}</p>
            <p className="text-sm text-white/70">{meaning}</p>
          </div>
          <button
            onClick={() => speak(`${letter}. ${word}`)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-ink hover:brightness-95"
          >
            <Volume2 size={16} aria-hidden /> Nghe chữ và từ
          </button>
        </div>
      </div>
    </section>
  );
}
