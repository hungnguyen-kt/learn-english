"use client";

import { FormEvent, useState } from "react";
import {
  Bookmark,
  Search,
  Volume2,
  X,
} from "lucide-react";

type DictionaryEntry = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  ukPhonetic: string;
  usPhonetic: string;
  meaning: string;
  definitions: {
    definition: string;
    translation: string;
    example: string;
    exampleTranslation: string;
  }[];
};

const ENTRIES: DictionaryEntry[] = [
  {
    word: "dictionary",
    phonetic: "/ˈdɪkʃənəri/",
    partOfSpeech: "danh từ",
    ukPhonetic: "/ˈdɪkʃənəri/",
    usPhonetic: "/ˈdɪkʃəneri/",
    meaning: "từ điển; sách tra từ; cuốn từ điển",
    definitions: [
      {
        definition: "A book or digital resource that explains the meanings of words, usually in alphabetical order.",
        translation: "Một cuốn sách hoặc tài nguyên số giải thích nghĩa của các từ, thường được sắp xếp theo thứ tự chữ cái.",
        example: "I looked up the word in the dictionary.",
        exampleTranslation: "Tôi tra từ đó trong từ điển.",
      },
      {
        definition: "A collection of words and their meanings for a particular subject or area of study.",
        translation: "Tập hợp các từ và nghĩa của chúng trong một lĩnh vực hoặc môn học cụ thể.",
        example: "The dictionary contains many technical terms.",
        exampleTranslation: "Từ điển này có chứa nhiều thuật ngữ chuyên ngành.",
      },
      {
        definition: "A person who collects, records, or studies words and their meanings.",
        translation: "Người sưu tầm, ghi chép hoặc nghiên cứu các từ và nghĩa của chúng.",
        example: "She is a dictionary editor.",
        exampleTranslation: "Cô ấy là biên tập viên từ điển.",
      },
    ],
  },
  {
    word: "procrastinate",
    phonetic: "/prəˈkræstɪneɪt/",
    partOfSpeech: "động từ",
    ukPhonetic: "/prəˈkræstɪneɪt/",
    usPhonetic: "/proʊˈkræstɪneɪt/",
    meaning: "trì hoãn; chần chừ; lần lữa",
    definitions: [
      {
        definition: "To delay doing something that you need to do, often because it feels difficult or unpleasant.",
        translation: "Trì hoãn việc cần làm, thường vì việc đó có vẻ khó khăn hoặc không dễ chịu.",
        example: "I always procrastinate when I have a big project.",
        exampleTranslation: "Tôi luôn trì hoãn khi có một dự án lớn.",
      },
      {
        definition: "To put off an action or decision until a later time.",
        translation: "Để một hành động hoặc quyết định sang một thời điểm sau.",
        example: "Don't procrastinate; start with one small step.",
        exampleTranslation: "Đừng chần chừ; hãy bắt đầu bằng một bước nhỏ.",
      },
    ],
  },
  {
    word: "habit",
    phonetic: "/ˈhæbɪt/",
    partOfSpeech: "danh từ",
    ukPhonetic: "/ˈhæbɪt/",
    usPhonetic: "/ˈhæbɪt/",
    meaning: "thói quen; tập quán",
    definitions: [
      {
        definition: "Something that you do often and regularly, sometimes without thinking about it.",
        translation: "Việc bạn thường xuyên làm một cách đều đặn, đôi khi gần như không cần suy nghĩ.",
        example: "Reading before bed is a good habit.",
        exampleTranslation: "Đọc sách trước khi ngủ là một thói quen tốt.",
      },
      {
        definition: "A usual way of behaving or doing something.",
        translation: "Cách cư xử hoặc thực hiện một việc theo lề thói.",
        example: "She has a habit of taking notes during class.",
        exampleTranslation: "Cô ấy có thói quen ghi chép trong giờ học.",
      },
    ],
  },
];

function speak(text: string, accent: "en-GB" | "en-US") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = accent;
  window.speechSynthesis.speak(utterance);
}

function PronunciationCard({
  country,
  label,
  phonetic,
  accent,
  word,
}: {
  country: string;
  label: string;
  phonetic: string;
  accent: "en-GB" | "en-US";
  word: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
      <span className="text-2xl" aria-hidden>{country}</span>
      <button
        type="button"
        aria-label={`Nghe phát âm ${label}`}
        onClick={() => speak(word, accent)}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
      >
        <Volume2 size={20} aria-hidden />
      </button>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm text-slate-500">{phonetic}</p>
      </div>
    </div>
  );
}

export default function DictionaryPage() {
  const [query, setQuery] = useState("dictionary");
  const [searchedWord, setSearchedWord] = useState("dictionary");
  const [savedWords, setSavedWords] = useState<string[]>([]);

  const entry = ENTRIES.find(({ word }) => word === searchedWord);
  const isSaved = entry ? savedWords.includes(entry.word) : false;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchedWord(query.trim().toLocaleLowerCase());
  }

  function toggleSavedWord() {
    if (!entry) return;
    setSavedWords((saved) =>
      isSaved
        ? saved.filter((word) => word !== entry.word)
        : [...saved, entry.word],
    );
  }

  return (
    <main className="mx-auto max-w-xl">
      <form onSubmit={handleSearch} className="flex gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Tìm từ tiếng Anh</span>
          <Search size={19} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nhập từ cần tra..."
            className="h-11 w-full rounded-lg border border-blue-500 bg-white pl-11 pr-10 text-sm text-ink shadow-sm outline-none transition focus:ring-2 focus:ring-blue-100"
          />
          {query && (
            <button
              type="button"
              aria-label="Xóa từ tìm kiếm"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={15} aria-hidden />
            </button>
          )}
        </label>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-5"
        >
          <Search size={16} aria-hidden />
          <span className="hidden sm:inline">Tìm kiếm</span>
        </button>
      </form>

      {entry ? (
        <article className="mt-4" aria-live="polite">
          <header>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {entry.word}
              </h1>
              <button
                type="button"
                aria-label={isSaved ? "Bỏ lưu từ" : "Lưu từ"}
                aria-pressed={isSaved}
                onClick={toggleSavedWord}
                className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                  isSaved ? "text-blue-600" : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} aria-hidden />
              </button>
            </div>
            <p className="mt-1 text-base text-slate-500">{entry.phonetic}</p>
            <span className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="rounded-md bg-blue-100 px-2 py-1 font-semibold text-blue-700">
                {entry.partOfSpeech}
              </span>
            </span>
          </header>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <PronunciationCard
              country="🇬🇧"
              label="UK / British English"
              phonetic={entry.ukPhonetic}
              accent="en-GB"
              word={entry.word}
            />
            <PronunciationCard
              country="🇺🇸"
              label="US / American English"
              phonetic={entry.usPhonetic}
              accent="en-US"
              word={entry.word}
            />
          </div>

          <section aria-labelledby="meaning-title" className="mt-4 border-t border-slate-100 pt-3">
            <h2 id="meaning-title" className="font-display text-base font-bold text-ink">
              Nghĩa tiếng Việt
            </h2>
            <p className="mt-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-ink">
              {entry.meaning}
            </p>
          </section>

          <section aria-labelledby="definitions-title" className="mt-3">
            <h2 id="definitions-title" className="font-display text-base font-bold text-ink">
              Định nghĩa chi tiết
            </h2>
            <ol className="mt-1">
              {entry.definitions.map((definition, index) => (
                <li key={definition.definition} className="border-b border-slate-100 py-3 last:border-b-0">
                  <div className="flex gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 font-display text-lg font-bold text-blue-600">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-ink">{definition.definition}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{definition.translation}</p>
                      <div className="mt-2 flex items-center gap-3 rounded-lg bg-slate-50 p-2.5">
                        <span className="shrink-0 text-xs text-slate-500">Ví dụ</span>
                        <button
                          type="button"
                          aria-label={`Nghe ví dụ: ${definition.example}`}
                          onClick={() => speak(definition.example, "en-GB")}
                          className="shrink-0 text-blue-600 transition-colors hover:text-blue-800"
                        >
                          <Volume2 size={17} aria-hidden />
                        </button>
                        <div className="min-w-0">
                          <p className="text-xs text-ink">{definition.example}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{definition.exampleTranslation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </article>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center" role="status">
          <Search size={28} className="mx-auto text-slate-300" aria-hidden />
          <h1 className="mt-3 font-display text-lg font-bold text-ink">
            Không tìm thấy “{searchedWord}”
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Hãy kiểm tra chính tả hoặc thử từ khác.
          </p>
        </div>
      )}
    </main>
  );
}
