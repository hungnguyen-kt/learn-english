"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { LessonMaterial } from "@/lib/lesson-materials";
import SpeakButton from "@/components/SpeakButton";

function spokenExample(example: string) {
  const text = example
    .replace(/^(?:Đọc liền|Đọc gọn|Luyện liền):\s*/i, "")
    .replace(/\/[^/]+\//g, " ")
    .replace(/\([^)]*\)/g, " ")
    .split(/:\s*/)[0]
    .replace(/[–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text && !/[\p{M}đĐ]/u.test(text.normalize("NFD")) ? text : null;
}

export default function LessonStudy({
  material,
}: {
  material: LessonMaterial;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === material.check.answer;

  return (
    <div className="mt-8 space-y-6">
      <p className="max-w-3xl text-lg leading-relaxed text-ink/75">
        {material.introduction}
      </p>
      {material.sections.map((section, index) => (
        <section
          key={section.title}
          aria-labelledby={`lesson-section-${index}`}
          className="border-t border-mist pt-5"
        >
          <h2
            id={`lesson-section-${index}`}
            className="font-display text-xl font-bold"
          >
            {section.title}
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink/75">
            {section.body}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {section.examples.map((example) => {
              const text = spokenExample(example);
              return (
                <li
                  key={example}
                  className="flex items-start justify-between gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium ring-1 ring-mist"
                >
                  <span className="min-w-0 flex-1">{example}</span>
                  {text && <SpeakButton text={text} label={`Đọc: ${text}`} />}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section
        aria-labelledby="lesson-check"
        className="rounded-2xl bg-ink p-5 text-white sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sun">Tự kiểm tra</p>
            <h2
              id="lesson-check"
              className="mt-1 font-display text-xl font-bold"
            >
              {material.check.prompt}
            </h2>
          </div>
          {checked &&
            (correct ? (
              <Check
                className="shrink-0 text-emerald-300"
                aria-label="Đáp án đúng"
              />
            ) : (
              <X
                className="shrink-0 text-rose-300"
                aria-label="Đáp án chưa đúng"
              />
            ))}
        </div>
        <fieldset className="mt-4 space-y-2">
          <legend className="sr-only">Chọn một đáp án</legend>
          {material.check.options.map((option, index) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors ${selected === index ? "border-sun bg-white/10" : "border-white/15 hover:bg-white/5"}`}
            >
              <input
                type="radio"
                name="lesson-check"
                value={index}
                checked={selected === index}
                onChange={() => {
                  setSelected(index);
                  setChecked(false);
                }}
                className="accent-yellow-300"
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        {checked && (
          <p
            className={`mt-4 text-sm leading-relaxed ${correct ? "text-emerald-200" : "text-rose-200"}`}
            aria-live="polite"
          >
            {correct ? "Chính xác. " : "Chưa đúng. "}
            {material.check.explanation}
          </p>
        )}
        <button
          type="button"
          disabled={selected === null}
          onClick={() => setChecked(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sun px-4 py-2.5 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checked ? (
            <RotateCcw size={16} aria-hidden />
          ) : (
            <Check size={16} aria-hidden />
          )}
          {checked ? "Kiểm tra lại" : "Kiểm tra đáp án"}
        </button>
      </section>
    </div>
  );
}
