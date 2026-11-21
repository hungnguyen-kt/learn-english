"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole, Play } from "lucide-react";
import type { PracticeLesson } from "@/lib/practice-exercises";
import { isLessonCompleted } from "@/lib/practice-progress";

export default function PracticeLessonList({
  typeId,
  lessons,
}: {
  typeId: string;
  lessons: PracticeLesson[];
}) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    setCompletedLessons(
      lessons
        .filter((lesson) => isLessonCompleted(typeId, lesson.id))
        .map((lesson) => lesson.id),
    );
  }, [lessons, typeId]);

  return (
    <ol className="mt-7 space-y-3">
      {lessons.map((lesson, index) => {
        const completed = completedLessons.includes(lesson.id);
        const unlocked = index === 0 || completedLessons.includes(lessons[index - 1].id);
        const content = (
          <>
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
              completed ? "bg-emerald-50 text-emerald-600" : unlocked ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
            }`}>
              {completed ? <CheckCircle2 size={21} aria-hidden /> : unlocked ? <Play size={19} aria-hidden /> : <LockKeyhole size={19} aria-hidden />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-display font-bold text-ink">{lesson.title}</span>
                {completed && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Hoàn thành
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                {lesson.questions.length} câu hỏi · Hoàn thành để mở bài tiếp theo
              </span>
            </span>
            {unlocked && <ArrowRight size={18} className="shrink-0 text-blue-600" aria-hidden />}
          </>
        );

        return (
          <li key={lesson.id}>
            {unlocked ? (
              <Link
                href={`/practice/${typeId}/${lesson.id}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-5"
              >
                {content}
              </Link>
            ) : (
              <div aria-disabled="true" className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 opacity-70 sm:p-5">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
