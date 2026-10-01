import Link from "next/link";
import { notFound } from "next/navigation";
import { LEVEL0_MODULES } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";
import SkillChip from "@/components/SkillChip";

export default function LessonPage({ params }: { params: { id: string; module: string; lesson: string } }) {
  const mod = LEVEL0_MODULES.find((m) => m.slug === params.module);
  const lesson = mod?.lessons.find((l) => l.slug === params.lesson);
  if (params.id !== "0" || !mod || !lesson) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Level 0", href: "/level/0" },
          { label: mod.title, href: `/level/0/${mod.slug}` },
          { label: lesson.title },
        ]}
      />
      <h1 className="font-display text-4xl font-extrabold tracking-tight">{lesson.title}</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {lesson.skills.map((s) => <SkillChip key={s} skill={s} />)}
      </div>
      <div className="mt-8 rounded-3xl border-2 border-dashed border-mist bg-white/60 p-10 text-center">
        <p className="font-display text-xl font-bold">Khu vực nội dung bài học</p>
        <p className="mx-auto mt-2 max-w-md text-ink/70">
          Đặt video, bài nghe, thẻ từ vựng hoặc bài tập của bài này tại đây.
        </p>
        <Link href={`/level/0/${mod.slug}`} className="mt-5 inline-block font-semibold text-sea hover:underline">
          Quay lại danh sách bài
        </Link>
      </div>
    </>
  );
}
