import { notFound } from "next/navigation";
import PracticeLessonRunner from "@/components/PracticeLessonRunner";
import { PRACTICE_TYPES } from "@/lib/practice-exercises";

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
  const exercise = PRACTICE_TYPES.find(({ id }) => id === params.type);
  if (!exercise) notFound();

  const lessonIndex = exercise.lessons.findIndex(({ id }) => id === params.lesson);
  if (lessonIndex < 0) notFound();

  return (
    <PracticeLessonRunner
      typeId={exercise.id}
      typeTitle={exercise.title}
      lesson={exercise.lessons[lessonIndex]}
      previousLesson={exercise.lessons[lessonIndex - 1]}
      nextLesson={exercise.lessons[lessonIndex + 1]}
    />
  );
}
