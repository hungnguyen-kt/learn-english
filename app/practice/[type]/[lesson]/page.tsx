import { notFound } from "next/navigation";
import PracticeLessonRunner from "@/components/PracticeLessonRunner";
import { PRACTICE_TYPES, getPracticeLesson } from "@/lib/practice-exercises";

export function generateStaticParams() {
  return PRACTICE_TYPES.flatMap((exercise) =>
    exercise.lessons.map((lesson) => ({
      type: exercise.id,
      lesson: lesson.id,
    })),
  );
}

export default function PracticeLessonPage({
  params,
}: {
  params: { type: string; lesson: string };
}) {
  const match = getPracticeLesson(params.type, params.lesson);
  if (!match) notFound();

  return (
    <PracticeLessonRunner
      typeId={match.exercise.id}
      typeTitle={match.exercise.title}
      lesson={match.lesson}
      previousLesson={match.previousLesson}
      nextLesson={match.nextLesson}
    />
  );
}
