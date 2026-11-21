"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import ExerciseQuestionList from "@/components/ExerciseQuestionList";
import type { PracticeLesson } from "@/lib/practice-exercises";
import {
  isLessonCompleted,
  markLessonCompleted,
} from "@/lib/practice-progress";

export default function PracticeLessonRunner({
  typeId,
  typeTitle,
  lesson,
  previousLesson,
  nextLesson,
}: {
  typeId: string;
  typeTitle: string;
  lesson: PracticeLesson;
  previousLesson?: PracticeLesson;
  nextLesson?: PracticeLesson;
}) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const previousCompleted =
      !previousLesson || isLessonCompleted(typeId, previousLesson.id);
    setUnlocked(previousCompleted);
    setCompleted(isLessonCompleted(typeId, lesson.id));
    setReady(true);
  }, [lesson.id, previousLesson, typeId]);

  function completeLesson() {
    markLessonCompleted(typeId, lesson.id);
    setCompleted(true);
  }

  if (!ready) {
    return <p className="text-sm text-slate-500">Đang kiểm tra tiến độ bài học...</p>;
  }

  if (!unlocked) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <h1 className="font-display text-xl font-bold text-ink">Bài học đang bị khóa</h1>
        <p className="mt-2 text-sm text-slate-600">
          Hãy hoàn thành bài trước để mở bài này.
        </p>
        <Link
          href={`/practice/${typeId}`}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={16} aria-hidden />
          Quay lại danh sách bài
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/practice/${typeId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
      >
        <ArrowLeft size={16} aria-hidden />
        {typeTitle}
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold text-blue-600">{typeTitle.toUpperCase()}</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-slate-600">
          Hoàn thành đúng cả {lesson.questions.length} câu để mở bài tiếp theo.
        </p>
      </header>

      {completed ? (
        <section className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <CheckCircle2 size={30} className="text-emerald-600" aria-hidden />
          <h2 className="mt-3 font-display text-xl font-bold text-emerald-900">
            Bạn đã hoàn thành {lesson.title}!
          </h2>
          <p className="mt-1 text-sm text-emerald-800">
            Làm tốt lắm. Bạn đã sẵn sàng chuyển sang bài tiếp theo.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={nextLesson ? `/practice/${typeId}/${nextLesson.id}` : `/practice/${typeId}`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {nextLesson ? `Bắt đầu ${nextLesson.title}` : "Quay lại dạng bài"}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setCompleted(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100/60"
            >
              <RotateCcw size={16} aria-hidden />
              Làm lại bài này
            </button>
          </div>
        </section>
      ) : (
        <ExerciseQuestionList
          questions={lesson.questions}
          onComplete={completeLesson}
        />
      )}
    </div>
  );
}
