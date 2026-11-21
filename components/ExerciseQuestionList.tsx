"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type {
  ExerciseQuestion,
  MultipleChoiceQuestion,
  SentenceOrderingQuestion,
} from "@/lib/practice-exercises";

type Answer = number | string | string[];

const QUESTION_TITLES: Record<ExerciseQuestion["kind"], string> = {
  "multiple-choice": "Chọn đáp án đúng",
  "fill-blank": "Điền vào chỗ trống",
  "sentence-ordering": "Sắp xếp thành câu",
  "word-formation": "Hoàn thành từ",
  "error-correction": "Tìm và sửa lỗi",
  "sentence-transformation": "Viết lại câu",
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[.!?]/g, "").replace(/\s+/g, " ").trim();
}

function isCorrect(question: ExerciseQuestion, answer: Answer | undefined): boolean {
  if (question.kind === "multiple-choice") {
    return answer === question.answerIndex;
  }
  if (question.kind === "sentence-ordering") {
    return (
      Array.isArray(answer) &&
      normalize(answer.join(" ")) === normalize(question.answer)
    );
  }
  if (question.kind === "sentence-transformation") {
    return (
      typeof answer === "string" &&
      normalize(`${question.before}${answer}${question.after}`) ===
        normalize(question.answer)
    );
  }
  return (
    typeof answer === "string" &&
    normalize(answer) === normalize(question.answer)
  );
}

function solution(question: ExerciseQuestion): string {
  if (question.kind === "multiple-choice") {
    return question.options[question.answerIndex];
  }
  return question.answer;
}

function canCheck(question: ExerciseQuestion, answer: Answer | undefined): boolean {
  if (question.kind === "multiple-choice") {
    return typeof answer === "number";
  }
  if (question.kind === "sentence-ordering") {
    return Array.isArray(answer) && answer.length === question.words.length;
  }
  return typeof answer === "string" && answer.trim().length > 0;
}

function MultipleChoiceInput({
  question,
  answer,
  onSelect,
}: {
  question: MultipleChoiceQuestion;
  answer: Answer | undefined;
  onSelect: (index: number) => void;
}) {
  return (
    <fieldset className="mt-4 space-y-2">
      <legend className="mb-2 text-sm text-slate-700">{question.prompt}</legend>
      {question.options.map((option, optionIndex) => (
        <label
          key={option}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
            answer === optionIndex
              ? "border-blue-300 bg-blue-50"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name={question.id}
            checked={answer === optionIndex}
            onChange={() => onSelect(optionIndex)}
            className="accent-blue-600"
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
}

function SentenceOrderingInput({
  question,
  answer,
  onChange,
}: {
  question: SentenceOrderingQuestion;
  answer: Answer | undefined;
  onChange: (words: string[]) => void;
}) {
  const orderedWords = Array.isArray(answer) ? answer : [];
  const usedCounts = new Map<string, number>();
  orderedWords.forEach((word) =>
    usedCounts.set(word, (usedCounts.get(word) ?? 0) + 1),
  );

  const availableIndexes = new Set<number>();
  question.words.forEach((word, wordIndex) => {
    const used = usedCounts.get(word) ?? 0;
    if (used > 0) {
      usedCounts.set(word, used - 1);
    } else {
      availableIndexes.add(wordIndex);
    }
  });

  return (
    <div className="mt-4">
      <p className="text-sm text-slate-600">Chọn các từ theo đúng thứ tự:</p>
      <div className="mt-3 flex min-h-12 flex-wrap items-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-2">
        {orderedWords.length > 0 ? (
          orderedWords.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-sm font-medium text-white"
            >
              {word}
            </span>
          ))
        ) : (
          <span className="px-1 text-sm text-slate-400">
            Câu của bạn sẽ hiển thị ở đây
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {question.words.map((word, wordIndex) => (
          <button
            key={`${word}-${wordIndex}`}
            type="button"
            disabled={!availableIndexes.has(wordIndex)}
            onClick={() => onChange([...orderedWords, word])}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-ink transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-35"
          >
            {word}
          </button>
        ))}
        <button
          type="button"
          disabled={orderedWords.length === 0}
          onClick={() => onChange(orderedWords.slice(0, -1))}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Bỏ từ cuối
        </button>
      </div>
    </div>
  );
}

function InlineBlankInput({
  value,
  onChange,
  ariaLabel,
  className = "w-36 text-center",
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className={`mx-1 border-b-2 border-blue-300 bg-blue-50/60 px-2 py-1 outline-none focus:border-blue-600 ${className}`}
    />
  );
}

export default function ExerciseQuestionList({
  questions,
  onComplete,
}: {
  questions: ExerciseQuestion[];
  onComplete?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function updateAnswer(id: string, answer: Answer) {
    setAnswers((current) => ({ ...current, [id]: answer }));
    setChecked((current) => ({ ...current, [id]: false }));
  }

  function checkAnswer(question: ExerciseQuestion) {
    const nextChecked = { ...checked, [question.id]: true };
    setChecked(nextChecked);

    const allCorrect = questions.every(
      (item) => nextChecked[item.id] && isCorrect(item, answers[item.id]),
    );

    if (allCorrect) {
      onComplete?.();
    }
  }

  function resetQuestion(id: string) {
    setAnswers((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setChecked((current) => ({ ...current, [id]: false }));
  }

  return (
    <ol className="mt-6 space-y-5">
      {questions.map((question, index) => {
        const answer = answers[question.id];
        const stringAnswer = typeof answer === "string" ? answer : "";
        const hasChecked = checked[question.id];
        const correct = hasChecked && isCorrect(question, answer);
        const canSubmit = canCheck(question, answer);

        return (
          <li key={question.id}>
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Câu {index + 1}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-ink">
                    {QUESTION_TITLES[question.kind]}
                  </h2>
                </div>
                {hasChecked &&
                  (correct ? (
                    <Check
                      size={21}
                      className="shrink-0 text-emerald-600"
                      aria-label="Đáp án đúng"
                    />
                  ) : (
                    <X
                      size={21}
                      className="shrink-0 text-rose-600"
                      aria-label="Đáp án chưa đúng"
                    />
                  ))}
              </div>

              {question.kind === "multiple-choice" && (
                <MultipleChoiceInput
                  question={question}
                  answer={answer}
                  onSelect={(optionIndex) => updateAnswer(question.id, optionIndex)}
                />
              )}

              {question.kind === "fill-blank" && (
                <div className="mt-5 flex flex-wrap items-center gap-y-2 text-base leading-relaxed text-ink">
                  <span>{question.before}</span>
                  <InlineBlankInput
                    value={stringAnswer}
                    onChange={(val) => updateAnswer(question.id, val)}
                    ariaLabel={`Đáp án câu ${index + 1}`}
                  />
                  <span>{question.after}</span>
                </div>
              )}

              {question.kind === "sentence-ordering" && (
                <SentenceOrderingInput
                  question={question}
                  answer={answer}
                  onChange={(words) => updateAnswer(question.id, words)}
                />
              )}

              {question.kind === "word-formation" && (
                <div className="mt-4">
                  <p className="text-base leading-relaxed text-ink">
                    {question.before}
                    <InlineBlankInput
                      value={stringAnswer}
                      onChange={(val) => updateAnswer(question.id, val)}
                      ariaLabel={`Đáp án câu ${index + 1}`}
                      className="w-36 text-center uppercase"
                    />
                    {question.after}
                  </p>
                  <p className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-slate-600">
                    {question.root}
                  </p>
                </div>
              )}

              {question.kind === "error-correction" && (
                <div className="mt-4">
                  <p className="text-base text-ink">{question.sentence}</p>
                  <input
                    value={stringAnswer}
                    onChange={(event) =>
                      updateAnswer(question.id, event.target.value)
                    }
                    placeholder="Nhập câu đã sửa..."
                    aria-label={`Câu đã sửa, câu ${index + 1}`}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              {question.kind === "sentence-transformation" && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-700">{question.original}</p>
                  <p className="inline-flex rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold tracking-wide text-amber-800">
                    {question.keyword}
                  </p>
                  <p className="text-base leading-relaxed text-ink">
                    {question.before}
                    <InlineBlankInput
                      value={stringAnswer}
                      onChange={(val) => updateAnswer(question.id, val)}
                      ariaLabel={`Phần còn thiếu, câu ${index + 1}`}
                      className="w-52 max-w-full"
                    />
                    {question.after}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => checkAnswer(question)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Check size={15} aria-hidden />
                  Kiểm tra đáp án
                </button>
                {hasChecked && (
                  <button
                    type="button"
                    onClick={() => resetQuestion(question.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    <RotateCcw size={14} aria-hidden />
                    Làm lại
                  </button>
                )}
              </div>

              {hasChecked && (
                <div
                  role="status"
                  className={`mt-4 rounded-xl p-3 text-sm ${
                    correct
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-rose-50 text-rose-800"
                  }`}
                >
                  <p className="font-semibold">
                    {correct ? "Chính xác!" : `Đáp án: ${solution(question)}`}
                  </p>
                  <p className="mt-1 leading-relaxed">{question.explanation}</p>
                  {question.kind === "error-correction" && !correct && (
                    <p className="mt-1 text-xs">
                      Cụm sai: <strong>{question.mistake}</strong> →{" "}
                      <strong>{question.correction}</strong>
                    </p>
                  )}
                </div>
              )}
            </section>
          </li>
        );
      })}
    </ol>
  );
}
