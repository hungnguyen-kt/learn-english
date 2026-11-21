"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  BookText,
  Check,
  Clock3,
  Eye,
  FileText,
  Lightbulb,
  PencilLine,
  Send,
  Volume2,
} from "lucide-react";
import type { TranslationArticle } from "@/lib/translation-articles";
import { speak, stopSpeech } from "@/lib/speech";

type Tab = "read" | "vocabulary" | "grammar" | "practice";

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "read", label: "Đọc bài", icon: BookOpen },
  { id: "vocabulary", label: "Từ vựng", icon: BookText },
  { id: "grammar", label: "Ngữ pháp", icon: FileText },
  { id: "practice", label: "Luyện tập", icon: PencilLine },
];

export default function TranslationWorkspace({
  article,
  isCompleted = false,
}: {
  article: TranslationArticle;
  isCompleted?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("read");
  const [translation, setTranslation] = useState(() =>
    isCompleted ? article.translation.join("\n\n") : "",
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isEnglish = article.sourceLanguage === "en";

  function toggleSpeech() {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    speak(article.source.join(" "), {
      lang: isEnglish ? "en-US" : "ja-JP",
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    setIsSpeaking(true);
  }

  function handleSubmit() {
    if (!translation.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="-mx-4 -my-8 min-h-[calc(100vh-4rem)] bg-white sm:-mx-8 lg:-my-12">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        <section aria-labelledby="article-title" className="min-w-0 border-b border-slate-200 lg:border-b-0 lg:border-r-2 lg:border-r-blue-100">
          <div className="px-5 pb-8 pt-5 sm:px-7 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/translate"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                <ArrowLeft size={16} aria-hidden />
                Bài đọc hôm nay
              </Link>
              <button
                type="button"
                aria-label={isSpeaking ? "Dừng nghe bài đọc" : "Nghe bài đọc"}
                aria-pressed={isSpeaking}
                onClick={toggleSpeech}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-blue-600 transition-colors hover:bg-blue-50"
              >
                <Volume2 size={17} aria-hidden />
              </button>
            </div>

            <div className="mt-5 flex gap-4">
              <div className={`grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${article.artwork} text-4xl`} aria-hidden>
                {article.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-600">
                    {isEnglish ? "🇬🇧 English" : "🇯🇵 Japanese"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                    {article.level}
                  </span>
                </div>
                <h1 id="article-title" className="mt-2 font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                  {article.title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">{article.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={13} aria-hidden /> {article.minutes} phút đọc
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileText size={13} aria-hidden /> {article.source.length} đoạn
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookText size={13} aria-hidden /> {article.vocabulary.length} từ vựng
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={13} aria-hidden /> {article.grammar.length} cấu trúc ngữ pháp
              </span>
            </div>
          </div>

          <div role="tablist" aria-label="Nội dung bài học" className="flex gap-1 overflow-x-auto border-y border-slate-100 px-4 py-2 sm:px-6">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls="lesson-panel"
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                  activeTab === id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={15} aria-hidden />
                {label}
              </button>
            ))}
          </div>

          <div
            id="lesson-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="px-5 py-5 sm:px-7 lg:px-8"
          >
            {activeTab === "read" && (
              <div className="space-y-5 text-sm leading-7 text-slate-700 sm:text-[15px]">
                {article.source.map((paragraph, index) => (
                  <p key={paragraph}>
                    {paragraph}
                    <sup className="ml-1 inline-grid h-4 w-4 place-items-center rounded-full bg-blue-50 text-[9px] font-semibold text-blue-600">
                      {index + 1}
                    </sup>
                  </p>
                ))}
              </div>
            )}

            {activeTab === "vocabulary" && (
              <ul className="space-y-3">
                {article.vocabulary.map(({ word, meaning }) => (
                  <li key={word} className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="font-semibold text-blue-700">{word}</p>
                    <p className="mt-1 text-sm text-slate-600">{meaning}</p>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "grammar" && (
              <ul className="space-y-3">
                {article.grammar.map(({ title, explanation, example }) => (
                  <li key={title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{explanation}</p>
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{example}</p>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "practice" && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <h2 className="font-semibold text-ink">Thử sức nhé!</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Hãy chọn một ý trong bài đọc và diễn đạt lại bằng từ ngữ của riêng bạn trong ô dịch.
                  Chú ý áp dụng từ vựng và cấu trúc vừa học.
                </p>
              </div>
            )}
          </div>

          <aside className="mx-5 mb-6 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:mx-7 lg:mx-8">
            <div className="flex gap-3">
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-blue-600" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-blue-800">Gợi ý</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Hãy thử tự dịch trước khi xem đáp án tham khảo. Chú ý các từ vựng và cấu trúc ngữ pháp để chọn cách diễn đạt phù hợp với ngữ cảnh.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section aria-labelledby="translation-heading" className="flex min-w-0 flex-col px-5 pb-6 pt-5 sm:px-7 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <PencilLine size={21} className="mt-0.5 shrink-0 text-blue-600" aria-hidden />
              <div>
                <h2 id="translation-heading" className="font-display text-lg font-bold text-ink">
                  Bản dịch của bạn
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Hãy viết bản dịch tiếng Việt của bạn vào ô bên dưới.
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-pressed={showAnswer}
              onClick={() => setShowAnswer((visible) => !visible)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Eye size={15} aria-hidden />
              {showAnswer ? "Ẩn đáp án" : "Xem đáp án"}
            </button>
          </div>

          <div className="relative mt-5 flex-1">
            <label htmlFor="translation-input" className="sr-only">
              Nhập bản dịch tiếng Việt
            </label>
            <textarea
              id="translation-input"
              value={translation}
              maxLength={2000}
              onChange={(event) => {
                setTranslation(event.target.value);
                setSubmitted(false);
              }}
              placeholder="Nhập bản dịch của bạn tại đây..."
              className="h-full min-h-[360px] w-full resize-y rounded-xl border border-blue-100 bg-white p-4 pb-10 text-sm leading-7 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:min-h-[480px]"
            />
            <span className="pointer-events-none absolute bottom-4 right-4 text-[11px] text-slate-400">
              {translation.length}/2000
            </span>
          </div>

          {showAnswer && (
            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold text-emerald-800">Đáp án tham khảo</p>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-700">
                {article.translation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {submitted ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700" role="status">
                <Check size={15} aria-hidden />
                Bản dịch đã được ghi nhận trong phiên này.
              </span>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={!translation.trim()}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={15} aria-hidden />
              Gửi bản dịch
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
