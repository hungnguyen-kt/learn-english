import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, PlayCircle } from "lucide-react";
import { LEVEL0_MODULES, SKILLS } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";
import SkillChip from "@/components/SkillChip";
import SkillIcon from "@/components/SkillIcon";
import AlphabetBoard from "@/components/AlphabetBoard";
import IPAChart from "@/components/IPAChart";
import IrregularVerbTable from "@/components/IrregularVerbTable";

export function generateStaticParams() {
  return LEVEL0_MODULES.map((m) => ({ id: "0", module: m.slug }));
}

export default function ModulePage({ params }: { params: { id: string; module: string } }) {
  if (params.id !== "0") notFound();
  const idx = LEVEL0_MODULES.findIndex((m) => m.slug === params.module);
  if (idx < 0) notFound();

  const mod = LEVEL0_MODULES[idx];
  const prev = LEVEL0_MODULES[idx - 1];
  const next = LEVEL0_MODULES[idx + 1];
  const total = mod.lessons.reduce((a, l) => a + l.minutes, 0);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Level 0", href: "/level/0" },
          { label: `Module ${idx + 1}` },
        ]}
      />

      <header>
        <p className="font-display text-lg font-semibold text-sea">Module {idx + 1} · {mod.short}</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{mod.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink/75">{mod.description}</p>
      </header>

      {mod.slug === "alphabet" && (
        <div className="mt-10">
          <AlphabetBoard />
        </div>
      )}
      {mod.slug === "ipa" && <IPAChart />}
      {mod.slug === "irregular-verbs" && <IrregularVerbTable />}

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_260px]">
        <section aria-labelledby="lessons">
          <h2 id="lessons" className="font-display text-2xl font-bold">Các bài học</h2>
          <ol className="mt-4 space-y-2">
            {mod.lessons.map((l, i) => (
              <li key={l.slug}>
                <Link
                  href={`/level/0/${mod.slug}/${l.slug}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-mist transition-shadow hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper font-display text-lg font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{l.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {l.skills.map((s) => <SkillChip key={s} skill={s} />)}
                    </div>
                  </div>
                  <span className="hidden items-center gap-1 text-sm text-ink/60 sm:flex">
                    <Clock size={14} aria-hidden /> {l.minutes} phút
                  </span>
                  <PlayCircle size={26} strokeWidth={1.6} className="shrink-0 text-sea transition-transform group-hover:scale-110" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <aside aria-labelledby="in-module" className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl bg-ink p-5 text-white">
            <h2 id="in-module" className="font-display text-lg font-bold">Trong module này</h2>
            <p className="mt-1 text-sm text-white/70">{mod.lessons.length} bài, khoảng {total} phút</p>
            <ul className="mt-4 space-y-2.5">
              {SKILLS.map((s) => {
                const n = mod.lessons.filter((l) => l.skills.includes(s.key)).length;
                return (
                  <li key={s.key} className={`flex items-center gap-2.5 text-sm ${n ? "text-white" : "text-white/35"}`}>
                    <SkillIcon skill={s.key} size={16} />
                    <span className="flex-1">{s.label}</span>
                    <span>{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      <nav aria-label="Chuyển module" className="mt-12 flex items-center justify-between gap-4 border-t border-mist pt-6">
        {prev ? (
          <Link href={`/level/0/${prev.slug}`} className="inline-flex items-center gap-2 font-semibold hover:text-sea">
            <ArrowLeft size={18} aria-hidden /> {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/level/0/${next.slug}`} className="inline-flex items-center gap-2 font-semibold hover:text-sea">
            {next.title} <ArrowRight size={18} aria-hidden />
          </Link>
        ) : (
          <Link href="/level/1" className="inline-flex items-center gap-2 font-semibold hover:text-sea">
            Level 1 · A1 <ArrowRight size={18} aria-hidden />
          </Link>
        )}
      </nav>
    </>
  );
}
