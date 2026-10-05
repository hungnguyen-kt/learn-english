"use client";

import { useDeferredValue, useState } from "react";
import verbData from "node-english-irregular-verbs";

type Verb = { infinitive: string; past_simple: string; past_participle: string };
type Filter = "all" | "same" | "past-participle" | "changed" | "variants";

const CORRECTIONS: Record<string, Partial<Verb>> = {
  read: { past_simple: "read (/red/)", past_participle: "read (/red/)" },
  kneel: { past_simple: "knelt/kneeled", past_participle: "knelt/kneeled" },
  sew: { past_simple: "sewed", past_participle: "sewn/sewed" },
};

const VERBS: Verb[] = verbData.verbs.map((verb) => ({ ...verb, ...CORRECTIONS[verb.infinitive] }));
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "same", label: "Ba dạng giống nhau" },
  { id: "past-participle", label: "V2 = V3" },
  { id: "changed", label: "Ba dạng đổi khác" },
  { id: "variants", label: "Có biến thể" },
];

function matchesFilter(verb: Verb, filter: Filter) {
  const base = verb.infinitive.toLowerCase();
  const past = verb.past_simple.toLowerCase();
  const participle = verb.past_participle.toLowerCase();
  if (filter === "same") return base === past && past === participle;
  if (filter === "past-participle") return past === participle && base !== past;
  if (filter === "changed") return base !== past && past !== participle && base !== participle;
  if (filter === "variants") return `${past} ${participle}`.includes("/");
  return true;
}

export default function IrregularVerbTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filtered = VERBS.filter((verb) => {
    const searchable = `${verb.infinitive} ${verb.past_simple} ${verb.past_participle}`.toLowerCase();
    return searchable.includes(deferredQuery) && matchesFilter(verb, filter);
  });

  return (
    <section aria-labelledby="verb-table-title" className="mt-10 rounded-2xl bg-white p-4 ring-1 ring-mist sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sea">Bảng tra cứu</p>
          <h2 id="verb-table-title" className="mt-1 font-display text-2xl font-bold">Động từ bất quy tắc</h2>
          <p className="mt-1 text-sm text-ink/65">{VERBS.length} mục gốc trong dữ liệu tra cứu</p>
        </div>
        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Tìm động từ</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo V1, V2 hoặc V3"
            className="w-full rounded-lg border border-mist bg-white px-3 py-2 text-sm outline-none focus:border-sea"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1" aria-label="Lọc theo mẫu biến đổi">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${filter === item.id ? "bg-ink text-white" : "bg-paper text-ink/70 hover:bg-mist"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-ink/65" aria-live="polite">Hiển thị {filtered.length} / {VERBS.length} mục</p>
      <div className="mt-2 max-h-[34rem] overflow-auto rounded-lg border border-mist">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-paper text-ink/70">
            <tr>
              <th scope="col" className="px-3 py-2.5 font-semibold">Nguyên thể (V1)</th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Quá khứ (V2)</th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Phân từ II (V3)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((verb) => (
              <tr key={verb.infinitive} className="border-t border-mist odd:bg-white even:bg-paper/50">
                <th scope="row" className="px-3 py-2.5 font-semibold">{verb.infinitive}</th>
                <td className="px-3 py-2.5">{verb.past_simple}</td>
                <td className="px-3 py-2.5">{verb.past_participle}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="px-3 py-8 text-center text-ink/60">Không tìm thấy động từ phù hợp.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/55">
        Dấu / phân cách các dạng thay thế. Bảng gồm 152 động từ gốc, không tính mọi động từ ghép, biến thể cổ hoặc các mục hiếm. Dữ liệu gốc: Franceskynov, <a className="underline underline-offset-2 hover:text-sea" href="https://github.com/Franceskynov/node-english-irregular-verbs">node-english-irregular-verbs</a>, MIT License.
      </p>
    </section>
  );
}
