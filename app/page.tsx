import Link from "next/link";
import { ArrowRight, Lock, PlayCircle } from "lucide-react";
import { LEVELS, LEVEL0_MODULES, SKILLS } from "@/lib/data";
import SkillIcon from "@/components/SkillIcon";
import SkillChip from "@/components/SkillChip";

export default function Home() {
  const next = LEVEL0_MODULES[0].lessons[0];

  return (
    <>
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Từ chữ cái A đến tiếng Anh đời thực.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
            Bảy cấp độ, mỗi cấp đều có đủ ngữ pháp, từ vựng, phát âm, nghe, nói, đọc, viết, ôn tập và luyện tập.
          </p>
          <Link
            href="/level/0"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-sea"
          >
            Bắt đầu Level 0 <ArrowRight size={18} aria-hidden />
          </Link>
        </div>

        <Link
          href="/level/0/alphabet"
          className="group rounded-3xl bg-sun p-6 transition-transform hover:-translate-y-0.5"
        >
          <p className="text-sm font-semibold text-ink/70">Bài đầu tiên</p>
          <p className="mt-1 font-display text-2xl font-bold">{next.title}</p>
          <p className="mt-1 text-sm text-ink/70">Module 1 · English Alphabet · {next.minutes} phút</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="flex flex-wrap gap-1.5">
              {next.skills.map((s) => <SkillChip key={s} skill={s} />)}
            </span>
            <PlayCircle size={40} strokeWidth={1.6} className="shrink-0 transition-transform group-hover:scale-110" aria-hidden />
          </div>
        </Link>
      </section>

      {/* Trail */}
      <section aria-labelledby="trail" className="mt-16">
        <h2 id="trail" className="font-display text-3xl font-bold">Lộ trình 7 cấp độ</h2>
        <p className="mt-2 text-ink/70">Học lần lượt từ trên xuống. Level 0 đã mở, các cấp còn lại sẽ được thêm dần.</p>

        <ol className="mt-8 space-y-3">
          {LEVELS.map((lv) => {
            const open = lv.status === "open";
            return (
              <li key={lv.id}>
                <div
                  className={`grid gap-4 rounded-3xl p-5 sm:grid-cols-[88px_1fr] sm:p-6 ${
                    open ? "bg-white shadow-sm ring-1 ring-mist" : "bg-white/50 ring-1 ring-mist/70"
                  }`}
                >
                  <div
                    className={`font-display text-6xl font-extrabold leading-none sm:text-7xl ${
                      open ? "text-sea" : "text-ink/25"
                    }`}
                    aria-hidden
                  >
                    {lv.id}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className={`font-display text-2xl font-bold ${open ? "" : "text-ink/60"}`}>
                        <Link href={`/level/${lv.id}`} className="hover:underline">{lv.title}</Link>
                      </h3>
                      <span className="rounded-md bg-mist px-2 py-0.5 text-sm font-semibold">{lv.code}</span>
                      {!open && (
                        <span className="inline-flex items-center gap-1 text-sm text-ink/55">
                          <Lock size={13} aria-hidden /> Sắp ra mắt
                        </span>
                      )}
                    </div>
                    <p className={`mt-1 ${open ? "text-ink/75" : "text-ink/50"}`}>{lv.summary}</p>

                    {open ? (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                        {LEVEL0_MODULES.map((m, idx) => (
                          <li key={m.slug}>
                            <Link
                              href={`/level/0/${m.slug}`}
                              className="block h-full rounded-2xl bg-paper p-3 transition-colors hover:bg-mist"
                            >
                              <span className="text-xs font-medium text-ink/60">Module {idx + 1}</span>
                              <span className="block font-semibold leading-snug">{m.title}</span>
                              <span className="text-sm text-ink/60">{m.lessons.length} bài</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-3 flex gap-2 text-ink/30">
                        {SKILLS.map((s) => <SkillIcon key={s.key} skill={s.key} size={16} />)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="mt-16">
        <h2 id="skills" className="font-display text-3xl font-bold">Mỗi cấp độ gồm 9 phần</h2>
        <p className="mt-2 text-ink/70">Ngữ pháp chỉ là một phần. Bạn sẽ nghe, nói, đọc, viết ngay từ bài đầu tiên.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => (
            <li key={s.key} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-mist">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{ backgroundColor: `${s.color}18`, color: s.color }}
              >
                <SkillIcon skill={s.key} size={20} />
              </span>
              <div>
                <p className="font-semibold">{s.label}</p>
                <p className="text-sm text-ink/65">{s.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
