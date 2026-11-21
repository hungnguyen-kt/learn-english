import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import PracticeLessonList from "@/components/PracticeLessonList";
import { PRACTICE_TYPES, getPracticeType } from "@/lib/practice-exercises";

export function generateStaticParams() {
  return PRACTICE_TYPES.map(({ id }) => ({ type: id }));
}

export default function PracticeTypePage({
  params,
}: {
  params: { type: string };
}) {
  const exercise = getPracticeType(params.type);
  if (!exercise) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
      >
        <ArrowLeft size={16} aria-hidden />
        Tất cả dạng bài
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold text-blue-600">LUYỆN TẬP</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {exercise.title}
        </h1>
        <p className="mt-2 text-slate-600">{exercise.description}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200">
          <BookOpenCheck size={15} className="text-blue-600" aria-hidden />
          {exercise.lessons.length} bài · {exercise.lessons[0].questions.length} câu mỗi bài
        </div>
      </header>

      <PracticeLessonList typeId={exercise.id} lessons={exercise.lessons} />
    </div>
  );
}
