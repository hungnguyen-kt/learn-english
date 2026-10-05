"use client";

import { useDeferredValue, useState } from "react";
import { Volume2 } from "lucide-react";
import verbData from "node-english-irregular-verbs";

type Verb = {
  infinitive: string;
  past_simple: string;
  past_participle: string;
  meaning: string;
};
type Filter = "all" | "same" | "past-participle" | "changed" | "variants";

const MEANINGS: Record<string, string> = {
  arise: "phát sinh, xuất hiện",
  awake: "thức tỉnh",
  be: "thì, là, ở",
  bear: "mang, chịu, sinh",
  beat: "đánh, đập",
  become: "trở nên, trở thành",
  begin: "bắt đầu",
  bend: "uốn cong",
  bet: "cá cược",
  bind: "buộc, ràng buộc",
  bite: "cắn",
  bleed: "chảy máu",
  blow: "thổi",
  break: "làm vỡ, phá vỡ",
  bring: "mang đến",
  broadcast: "phát sóng",
  build: "xây dựng",
  buy: "mua",
  cast: "ném, đúc",
  catch: "bắt, chụp",
  choose: "chọn",
  cling: "bám chặt",
  come: "đến",
  cost: "có giá, tốn",
  creep: "bò, trườn",
  cut: "cắt",
  deal: "giải quyết, giao dịch",
  dig: "đào",
  do: "làm",
  draw: "vẽ, kéo",
  dream: "mơ",
  drink: "uống",
  drive: "lái xe",
  dwell: "cư trú, sống",
  eat: "ăn",
  fall: "ngã, rơi",
  feed: "cho ăn",
  feel: "cảm thấy",
  fight: "chiến đấu",
  find: "tìm thấy",
  fit: "vừa, phù hợp",
  flee: "chạy trốn",
  fling: "quăng mạnh",
  fly: "bay",
  forbid: "cấm",
  forecast: "dự báo",
  forget: "quên",
  freeze: "đóng băng",
  get: "nhận, đạt được",
  give: "đưa, cho",
  go: "đi",
  grow: "phát triển, trồng",
  hang: "treo",
  have: "có",
  hear: "nghe",
  hide: "giấu, trốn",
  hit: "đánh, va vào",
  hold: "giữ, cầm",
  hurt: "làm đau, bị đau",
  keep: "giữ",
  kneel: "quỳ",
  knit: "đan",
  know: "biết",
  lay: "đặt, đẻ trứng",
  lead: "dẫn dắt",
  lean: "dựa, nghiêng",
  leap: "nhảy vọt",
  learn: "học",
  leave: "rời đi, để lại",
  lend: "cho mượn",
  let: "để, cho phép",
  lie: "nằm",
  light: "thắp sáng",
  lose: "mất, thua",
  make: "làm, tạo ra",
  mean: "có nghĩa, muốn nói",
  meet: "gặp",
  mow: "cắt cỏ",
  pay: "trả tiền",
  prove: "chứng minh",
  put: "đặt, để",
  quit: "bỏ, dừng",
  read: "đọc",
  ride: "cưỡi, đi xe",
  ring: "reo, rung chuông",
  rise: "tăng, mọc",
  run: "chạy, vận hành",
  saw: "cưa",
  say: "nói",
  see: "nhìn, thấy",
  seek: "tìm kiếm",
  sell: "bán",
  send: "gửi",
  set: "đặt, thiết lập",
  sew: "may",
  shake: "lắc, rung",
  shear: "xén, cắt lông",
  shed: "rụng, trút bỏ",
  shine: "chiếu sáng",
  shoot: "bắn",
  show: "cho xem, trình bày",
  shrink: "co lại",
  shut: "đóng",
  sing: "hát",
  sink: "chìm",
  sit: "ngồi",
  sleep: "ngủ",
  slide: "trượt",
  sling: "ném, quăng",
  smell: "ngửi, có mùi",
  sow: "gieo hạt",
  speak: "nói",
  speed: "tăng tốc",
  spell: "đánh vần",
  spend: "tiêu, dành (thời gian)",
  spin: "quay, xoay",
  spit: "nhổ",
  spill: "làm đổ",
  split: "tách, chẻ",
  spoil: "làm hỏng",
  spread: "lan truyền, trải rộng",
  spring: "bật nhảy, phát sinh",
  stand: "đứng",
  steal: "ăn cắp",
  stick: "dán, bám",
  stink: "bốc mùi",
  strike: "đánh, đình công",
  sting: "chích, đốt",
  strive: "phấn đấu",
  swear: "thề, chửi thề",
  sweep: "quét",
  swell: "sưng, phồng lên",
  swim: "bơi",
  swing: "đung đưa, vung",
  take: "lấy, mang",
  teach: "dạy",
  tear: "xé",
  tell: "kể, bảo",
  think: "nghĩ",
  throw: "ném",
  thrust: "đẩy mạnh, đâm",
  tread: "giẫm, đạp",
  understand: "hiểu",
  wake: "thức dậy, đánh thức",
  wear: "mặc, đeo",
  weave: "dệt, đan",
  weep: "khóc",
  wet: "làm ướt",
  win: "thắng",
  wind: "quấn, cuộn",
  wring: "vắt, xoắn",
  write: "viết",
};

const CORRECTIONS: Record<string, Partial<Verb>> = {
  read: { past_simple: "read (/red/)", past_participle: "read (/red/)" },
  kneel: { past_simple: "knelt/kneeled", past_participle: "knelt/kneeled" },
  sew: { past_simple: "sewed", past_participle: "sewn/sewed" },
};

const VERBS: Verb[] = verbData.verbs.map((verb) => ({
  ...verb,
  ...CORRECTIONS[verb.infinitive],
  meaning: MEANINGS[verb.infinitive] ?? "",
}));
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
  if (filter === "changed")
    return base !== past && past !== participle && base !== participle;
  if (filter === "variants") return `${past} ${participle}`.includes("/");
  return true;
}

function speakWord(word: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

function exampleFor(verb: Verb, form: "base" | "past" | "participle") {
  const word = verb[
    form === "base"
      ? "infinitive"
      : form === "past"
        ? "past_simple"
        : "past_participle"
  ]
    .replace(/\s*\([^)]*\)/g, "")
    .split("/")[0]
    .trim();

  if (verb.infinitive === "be") {
    if (form === "base") return "I want to be kind.";
    if (form === "past") return "I was kind yesterday.";
    return "I have been kind.";
  }
  if (verb.infinitive === "have") {
    if (form === "base") return "I want to have a dog.";
    if (form === "past") return "I had a dog.";
    return "I have had a dog.";
  }
  if (verb.infinitive === "cost") {
    if (form === "base") return "It may cost five dollars.";
    if (form === "past") return "It cost five dollars yesterday.";
    return "It has cost five dollars.";
  }

  if (form === "base") return `I want to ${word}.`;
  if (form === "past") return `I ${word} yesterday.`;
  return `I have ${word}.`;
}

function PronouncedForms({ value }: { value: string }) {
  const pronunciation = value.match(/\(([^)]+)\)/)?.[1];
  const forms = value
    .replace(/\s*\([^)]*\)/g, "")
    .split("/")
    .map((form) => form.trim());

  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
      {forms.map((form, index) => (
        <span
          key={`${form}-${index}`}
          className="inline-flex items-center gap-1"
        >
          {index > 0 && <span aria-hidden="true">/</span>}
          <span>{form}</span>
          <button
            type="button"
            onClick={() =>
              speakWord(
                form === "read" && pronunciation === "/red/" ? "red" : form,
              )
            }
            aria-label={`Phát âm ${form}`}
            title={`Phát âm ${form}`}
            className="inline-flex size-7 items-center justify-center rounded-md text-ink/55 hover:bg-mist hover:text-sea"
          >
            <Volume2 size={15} aria-hidden="true" />
          </button>
        </span>
      ))}
      {pronunciation && <span className="text-ink/55">({pronunciation})</span>}
    </span>
  );
}

export default function IrregularVerbTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filtered = VERBS.filter((verb) => {
    const searchable =
      `${verb.infinitive} ${verb.past_simple} ${verb.past_participle} ${verb.meaning}`.toLowerCase();
    return searchable.includes(deferredQuery) && matchesFilter(verb, filter);
  });

  return (
    <section
      aria-labelledby="verb-table-title"
      className="mt-10 rounded-2xl bg-white p-4 ring-1 ring-mist sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sea">
            Bảng tra cứu
          </p>
          <h2
            id="verb-table-title"
            className="mt-1 font-display text-2xl font-bold"
          >
            Động từ bất quy tắc
          </h2>
          <p className="mt-1 text-sm text-ink/65">
            {VERBS.length} mục gốc trong dữ liệu tra cứu
          </p>
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

      <div
        className="mt-4 flex gap-1 overflow-x-auto pb-1"
        aria-label="Lọc theo mẫu biến đổi"
      >
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

      <p className="mt-3 text-sm text-ink/65" aria-live="polite">
        Hiển thị {filtered.length} / {VERBS.length} mục
      </p>
      <div className="mt-2 max-h-[34rem] overflow-auto rounded-lg border border-mist">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-paper text-ink/70">
            <tr>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Nguyên thể (V1)
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Quá khứ (V2)
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Phân từ II (V3)
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Nghĩa tiếng Việt
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((verb) => (
              <tr
                key={verb.infinitive}
                className="border-t border-mist odd:bg-white even:bg-paper/50"
              >
                <th scope="row" className="px-3 py-2.5 font-semibold">
                  <PronouncedForms value={verb.infinitive} />
                  <span className="mt-1 block text-xs font-normal leading-relaxed text-ink/55">
                    {exampleFor(verb, "base")}
                  </span>
                </th>
                <td className="px-3 py-2.5">
                  <PronouncedForms value={verb.past_simple} />
                  <span className="mt-1 block text-xs leading-relaxed text-ink/55">
                    {exampleFor(verb, "past")}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <PronouncedForms value={verb.past_participle} />
                  <span className="mt-1 block text-xs leading-relaxed text-ink/55">
                    {exampleFor(verb, "participle")}
                  </span>
                </td>
                <td className="px-3 py-2.5">{verb.meaning}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-ink/60">
                  Không tìm thấy động từ phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/55">
        Dấu / phân cách các dạng thay thế. Bảng gồm 152 động từ gốc, không tính
        mọi động từ ghép, biến thể cổ hoặc các mục hiếm. Dữ liệu gốc:
        Franceskynov,{" "}
        <a
          className="underline underline-offset-2 hover:text-sea"
          href="https://github.com/Franceskynov/node-english-irregular-verbs"
        >
          node-english-irregular-verbs
        </a>
        , MIT License.
      </p>
    </section>
  );
}
