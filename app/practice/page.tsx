import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  PencilLine,
  Repeat,
  Search,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PRACTICE_TYPES } from "@/lib/practice-exercises";

const ICONS: Record<string, LucideIcon> = {
  "multiple-choice": Check,
  "fill-in-the-blank": PencilLine,
  "sentence-ordering": ArrowUpDown,
  "word-formation": Type,
  "error-correction": Search,
  "sentence-transformation": Repeat,
};

export default function PracticePage() {
  return (
    <div>
      <header>
        <p className="text-sm font-semibold text-blue-600">LUYỆN TẬP TIẾNG ANH</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Chọn dạng bài tập
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/70">
          Chọn một dạng bài để bắt đầu luyện tập. Mỗi phần có các câu hỏi ngắn kèm đáp án và giải thích.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PRACTICE_TYPES.map((exercise) => {
          const Icon = ICONS[exercise.id];
          return (
            <li key={exercise.id}>
              <Link
                href={`/practice/${exercise.id}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={21} aria-hidden />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    {exercise.lessons.length} bài
                    <ArrowRight size={14} className="text-blue-600 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-blue-700">
                  {exercise.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{exercise.description}</p>
                <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-700">
                  {exercise.example}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {exercise.lessons.length} bài học · {exercise.lessons[0].questions.length} câu mỗi bài
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Luyện ngay
                  <ArrowRight size={15} aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
