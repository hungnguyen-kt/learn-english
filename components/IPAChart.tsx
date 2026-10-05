"use client";

import { useState } from "react";
import SpeakButton from "@/components/SpeakButton";

type Sound = {
  symbol: string;
  example: string;
  phonetic: string;
  note?: string;
};
type SoundGroup = { title: string; note: string; sounds: Sound[] };

const GROUPS: SoundGroup[] = [
  {
    title: "Nguyên âm đơn",
    note: "Ví dụ theo IPA Anh-Anh phổ biến; một số từ có phiên âm khác trong Anh-Mỹ.",
    sounds: [
      { symbol: "iː", example: "sheep", phonetic: "/ʃiːp/" },
      { symbol: "ɪ", example: "ship", phonetic: "/ʃɪp/" },
      { symbol: "ʊ", example: "book", phonetic: "/bʊk/" },
      { symbol: "uː", example: "food", phonetic: "/fuːd/" },
      { symbol: "e", example: "bed", phonetic: "/bed/" },
      { symbol: "ə", example: "about", phonetic: "/əˈbaʊt/", note: "schwa" },
      {
        symbol: "ɜː",
        example: "bird",
        phonetic: "/bɜːd/",
        note: "AmE thường /ɝː/",
      },
      { symbol: "ɔː", example: "thought", phonetic: "/θɔːt/" },
      { symbol: "æ", example: "cat", phonetic: "/kæt/" },
      { symbol: "ʌ", example: "cup", phonetic: "/kʌp/" },
      { symbol: "ɑː", example: "car", phonetic: "/kɑː/" },
      {
        symbol: "ɒ",
        example: "hot",
        phonetic: "/hɒt/",
        note: "AmE thường /ɑː/",
      },
    ],
  },
  {
    title: "Nguyên âm đôi",
    note: "Ba âm cuối thường được thể hiện khác nhau giữa Anh-Anh và Anh-Mỹ.",
    sounds: [
      { symbol: "eɪ", example: "day", phonetic: "/deɪ/" },
      { symbol: "aɪ", example: "my", phonetic: "/maɪ/" },
      { symbol: "ɔɪ", example: "boy", phonetic: "/bɔɪ/" },
      { symbol: "aʊ", example: "now", phonetic: "/naʊ/" },
      {
        symbol: "əʊ",
        example: "go",
        phonetic: "/ɡəʊ/",
        note: "AmE thường /oʊ/",
      },
      {
        symbol: "ɪə",
        example: "near",
        phonetic: "/nɪə/",
        note: "BrE; AmE thường có /r/",
      },
      {
        symbol: "eə",
        example: "square",
        phonetic: "/skweə/",
        note: "BrE; AmE thường có /r/",
      },
      {
        symbol: "ʊə",
        example: "cure",
        phonetic: "/kjʊə/",
        note: "BrE; biến thể theo giọng",
      },
    ],
  },
  {
    title: "Phụ âm",
    note: "Đọc âm cuối rõ, đặc biệt với các cặp chỉ khác nhau ở độ rung dây thanh.",
    sounds: [
      { symbol: "p", example: "pen", phonetic: "/pen/" },
      { symbol: "b", example: "bed", phonetic: "/bed/" },
      { symbol: "t", example: "tea", phonetic: "/tiː/" },
      { symbol: "d", example: "day", phonetic: "/deɪ/" },
      { symbol: "k", example: "key", phonetic: "/kiː/" },
      { symbol: "ɡ", example: "go", phonetic: "/ɡəʊ/" },
      { symbol: "tʃ", example: "chair", phonetic: "/tʃeə/" },
      { symbol: "dʒ", example: "jam", phonetic: "/dʒæm/" },
      { symbol: "f", example: "fan", phonetic: "/fæn/" },
      { symbol: "v", example: "van", phonetic: "/væn/" },
      { symbol: "θ", example: "thin", phonetic: "/θɪn/" },
      { symbol: "ð", example: "this", phonetic: "/ðɪs/" },
      { symbol: "s", example: "sip", phonetic: "/sɪp/" },
      { symbol: "z", example: "zip", phonetic: "/zɪp/" },
      { symbol: "ʃ", example: "ship", phonetic: "/ʃɪp/" },
      { symbol: "ʒ", example: "measure", phonetic: "/ˈmeʒə/" },
      { symbol: "h", example: "hat", phonetic: "/hæt/" },
      { symbol: "m", example: "map", phonetic: "/mæp/" },
      { symbol: "n", example: "net", phonetic: "/net/" },
      { symbol: "ŋ", example: "sing", phonetic: "/sɪŋ/" },
      { symbol: "l", example: "leg", phonetic: "/leɡ/" },
      { symbol: "r", example: "red", phonetic: "/red/" },
      { symbol: "j", example: "yes", phonetic: "/jes/" },
      { symbol: "w", example: "wet", phonetic: "/wet/" },
    ],
  },
];

export default function IPAChart() {
  const [active, setActive] = useState(0);
  const group = GROUPS[active];

  return (
    <section
      aria-labelledby="ipa-chart-title"
      className="mt-10 rounded-2xl bg-white p-4 ring-1 ring-mist sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-sea">Tra cứu âm</p>
          <h2
            id="ipa-chart-title"
            className="mt-1 font-display text-2xl font-bold"
          >
            Bảng âm IPA tiếng Anh
          </h2>
        </div>
        <div
          className="flex flex-wrap gap-1 rounded-xl bg-paper p-1"
          role="tablist"
          aria-label="Nhóm âm IPA"
        >
          {GROUPS.map((item, index) => (
            <button
              key={item.title}
              id={`ipa-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="ipa-panel"
              onClick={() => setActive(index)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${active === index ? "bg-ink text-white" : "text-ink/70 hover:bg-mist"}`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div id="ipa-panel" role="tabpanel" aria-labelledby={`ipa-tab-${active}`}>
        <p className="mt-3 text-sm text-ink/65">{group.note}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {group.sounds.map((sound) => (
            <div
              key={sound.symbol}
              className="flex min-w-0 items-center gap-3 rounded-xl bg-paper p-3"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white font-display text-2xl font-bold text-sea ring-1 ring-mist">
                /{sound.symbol}/
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {sound.example}{" "}
                  <span className="font-normal text-ink/55">
                    {sound.phonetic}
                  </span>
                </p>
                {sound.note && (
                  <p className="text-xs text-ink/55">{sound.note}</p>
                )}
              </div>
              <SpeakButton
                text={sound.example}
                label={`Nghe từ ${sound.example}`}
                className="text-sea"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
