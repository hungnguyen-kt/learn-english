import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Lock } from "lucide-react";
import { LEVELS, LEVEL0_MODULES, SKILLS, type SkillKey } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";
import SkillIcon from "@/components/SkillIcon";
import SkillChip from "@/components/SkillChip";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ id: String(l.id) }));
}

export default function LevelPage({ params }: { params: { id: string } }) {
  const level = LEVELS.find((l) => String(l.id) === params.id);
  if (!level) notFound();

  const open = level.status === "open";
  const modules = open ? LEVEL0_MODULES : [];
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);
  const minutes = modules.reduce((n, m) => n + m.lessons.reduce((a, l) => a + l.minutes, 0), 0);

  const countBySkill = (k: SkillKey) =>
    modules.reduce((n, m) => n + m.lessons.filter((l) => l.skills.includes(k)).length, 0);

  return (
    <>
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: `Level ${level.id}` }]} />

      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-sea">Level {level.id} · {level.code}</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{level.title}</h1>
          <p className="mt-3 max-w-xl text-lg text-ink/75">{level.summary}</p>
        </div>
        {open && (
          <dl className="flex gap-6 text-sm">
            <div><dt className="text-ink/60">Module</dt><dd className="font-display text-3xl font-bold">{modules.length}</dd></div>
            <div><dt className="text-ink/60">Bài học</dt><dd className="font-display text-3xl font-bold">{lessonCount}</dd></div>
            <div><dt className="text-ink/60">Phút</dt><dd className="font-display text-3xl font-bold">{minutes}</dd></div>
          </dl>
        )}
      </header>

      {open ? (
        <section aria-labelledby="modules" className="mt-12">
          <h2 id="modules" className="font-display text-2xl font-bold">Các module của Level 0</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {modules.map((m, idx) => {
              const mins = m.lessons.reduce((a, l) => a + l.minutes, 0);
              const skills = Array.from(new Set(m.lessons.flatMap((l) => l.skills)));
              return (
                <li key={m.slug}>
                  <Link
                    href={`/level/0/${m.slug}`}
                    className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-mist transition-shadow hover:shadow-md"
                  >
                    <span className="font-display text-5xl font-extrabold text-sun">{idx + 1}</span>
                    <h3 className="mt-2 font-display text-xl font-bold">{m.title}</h3>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-ink/70">{m.description}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-ink/60">
                      <Clock size={14} aria-hidden /> {m.lessons.length} bài, khoảng {mins} phút
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skills.map((s) => <SkillChip key={s} skill={s} />)}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-sea">
                      Vào học <ArrowRight size={16} aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ) : (
        <div className="mt-10 flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-mist">
          <Lock size={20} className="mt-0.5 shrink-0 text-ink/60" aria-hidden />
          <div>
            <p className="font-semibold">Level này sẽ ra mắt sau.</p>
            <p className="text-ink/70">Hoàn thành Level {level.id - 1} để mở khóa khi nội dung sẵn sàng.</p>
            <Link href="/level/0" className="mt-2 inline-block font-semibold text-sea hover:underline">Học Level 0 trước</Link>
          </div>
        </div>
      )}

      <section aria-labelledby="skills" className="mt-12">
        <h2 id="skills" className="font-display text-2xl font-bold">9 phần học trong level này</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => {
            const n = countBySkill(s.key);
            return (
              <li key={s.key} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-mist">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ backgroundColor: `${s.color}18`, color: s.color }}
                >
                  <SkillIcon skill={s.key} size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{s.label}</p>
                  <p className="truncate text-sm text-ink/65">{s.hint}</p>
                </div>
                {open && <span className="text-sm font-medium text-ink/60">{n} bài</span>}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
