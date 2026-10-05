"use client";

import { useDeferredValue, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import verbData from "node-english-irregular-verbs";
import irregularVerbData from "@/lib/irregular-verbs.json";

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

const ADDITIONAL_MEANINGS: Record<string, string> = {
  backslide: "sa sút, quay lại thói quen xấu",
  bid: "đặt giá, đấu thầu; ra lệnh",
  breed: "nuôi; sinh sản",
  browbeat: "hăm dọa, bắt nạt",
  burn: "đốt, cháy",
  burst: "vỡ tung, bùng nổ",
  bust: "đập vỡ; bắt giữ",
  clothe: "mặc quần áo cho",
  crossbreed: "lai giống",
  daydream: "mơ mộng ban ngày",
  disprove: "bác bỏ, chứng minh là sai",
  dive: "lặn; lao xuống",
  forego: "từ bỏ, không dùng đến",
  foresee: "thấy trước, dự đoán",
  foretell: "tiên đoán",
  forgive: "tha thứ",
  forsake: "từ bỏ, ruồng bỏ",
  frostbite: "làm cóng, bị tê cóng",
  grind: "nghiền, xay",
  "hand-feed": "đút, cho ăn bằng tay",
  handwrite: "viết tay",
  hew: "đẽo, chặt",
  inbreed: "giao phối cận huyết",
  inlay: "khảm, dát",
  input: "nhập dữ liệu",
  interbreed: "lai giống",
  interweave: "đan xen, kết hợp",
  interwind: "quấn vào nhau",
  "jerry-build": "xây dựng cẩu thả",
  "lip-read": "đọc khẩu hình",
  miscast: "phân vai sai",
  misdeal: "chia bài sai",
  misdo: "làm sai",
  mishear: "nghe nhầm",
  mislay: "để thất lạc",
  mislead: "đánh lừa",
  mislearn: "học sai",
  misread: "đọc nhầm",
  misset: "đặt sai, cài đặt sai",
  misspeak: "nói nhầm",
  misspell: "viết sai chính tả",
  misspend: "tiêu xài hoang phí",
  mistake: "nhầm lẫn",
  misteach: "dạy sai",
  misunderstand: "hiểu lầm",
  miswrite: "viết sai",
  offset: "bù đắp, đối trọng",
  outbid: "trả giá cao hơn",
  outbreed: "sinh sản nhiều hơn",
  outdo: "vượt trội hơn",
  outdraw: "rút nhanh hơn; thu hút hơn",
  outdrink: "uống nhiều hơn",
  outdrive: "lái xa hơn; đánh xa hơn",
  outfight: "chiến đấu giỏi hơn",
  outfly: "bay nhanh hoặc xa hơn",
  outgrow: "lớn vượt; không còn phù hợp",
  outleap: "nhảy xa hơn",
  outride: "cưỡi lâu hoặc giỏi hơn",
  outrun: "chạy nhanh hơn",
  outsell: "bán chạy hơn",
  outshine: "vượt trội, tỏa sáng hơn",
  outshoot: "bắn giỏi hơn",
  outsing: "hát hay hơn",
  outsit: "ngồi lâu hơn",
  outsleep: "ngủ lâu hơn",
  outsmell: "ngửi thính hơn",
  outspeak: "nói giỏi hơn",
  outspeed: "vượt tốc độ",
  outspend: "chi tiêu nhiều hơn",
  outswear: "chửi thề nhiều hơn",
  outswim: "bơi nhanh hơn",
  outthink: "suy nghĩ vượt trội hơn",
  outthrow: "ném xa hơn",
  outwrite: "viết hay hoặc nhiều hơn",
  overbid: "trả giá quá cao",
  overbreed: "nhân giống quá mức",
  overbuild: "xây dựng quá mức",
  overbuy: "mua quá nhiều",
  overcome: "vượt qua",
  overdo: "làm quá mức",
  overdraw: "rút quá số dư; phác họa quá mức",
  overdrink: "uống quá nhiều",
  overeat: "ăn quá nhiều",
  overfeed: "cho ăn quá nhiều",
  overhang: "nhô ra, phủ lên",
  overhear: "nghe thấy tình cờ",
  overlay: "phủ lên",
  overpay: "trả quá nhiều",
  override: "ghi đè; bác bỏ",
  overrun: "tràn ngập; vượt quá",
  oversee: "giám sát",
  oversell: "bán quá mức; quảng cáo quá lời",
  oversew: "khâu phủ mép",
  overshoot: "vượt quá mục tiêu",
  oversleep: "ngủ quên",
  overspeak: "nói quá nhiều",
  overspend: "tiêu quá tay",
  overspill: "tràn ra",
  overtake: "vượt qua, bắt kịp",
  overthink: "nghĩ quá nhiều",
  overthrow: "lật đổ",
  overwind: "lên dây cót quá mức",
  overwrite: "ghi đè",
  partake: "tham gia; dùng (đồ ăn, thức uống)",
  plead: "van xin; biện hộ",
  prebuild: "xây dựng trước",
  predo: "làm trước",
  premake: "làm sẵn",
  prepay: "trả trước",
  presell: "bán trước",
  preset: "cài đặt sẵn",
  preshrink: "làm co trước",
  proofread: "đọc soát lỗi",
  "quick-freeze": "cấp đông nhanh",
  reawake: "đánh thức lại; tỉnh lại",
  rebid: "đấu giá lại",
  rebind: "buộc lại; đóng lại (sách)",
  rebroadcast: "phát lại",
  rebuild: "xây dựng lại",
  recast: "đúc lại; phân vai lại",
  recut: "cắt lại",
  redeal: "chia lại",
  redo: "làm lại",
  redraw: "vẽ lại; rút lại",
  refit: "lắp lại; sửa sang lại",
  regrind: "nghiền lại",
  regrow: "mọc lại",
  rehang: "treo lại",
  rehear: "nghe lại; xét xử lại",
  reknit: "đan lại",
  relay: "chuyển tiếp; chạy tiếp sức",
  relearn: "học lại",
  relight: "thắp sáng lại",
  remake: "làm lại",
  repay: "hoàn trả",
  reread: "đọc lại",
  rerun: "chạy lại; phát lại",
  resell: "bán lại",
  resend: "gửi lại",
  reset: "đặt lại, thiết lập lại",
  resew: "khâu lại",
  retake: "làm lại; chiếm lại",
  reteach: "dạy lại",
  retear: "xé lại",
  retell: "kể lại",
  rethink: "suy nghĩ lại",
  retread: "đắp lại lốp; đi lại đường cũ",
  retrofit: "cải tiến, trang bị bổ sung",
  rewake: "đánh thức lại",
  rewear: "mặc lại",
  reweave: "dệt lại",
  rewed: "kết hôn lại",
  rewet: "làm ướt lại",
  rewin: "thắng lại",
  rewind: "cuộn lại; tua lại",
  rewrite: "viết lại",
  rid: "giải thoát, loại bỏ",
  roughcast: "trát vữa thô",
  "sand-cast": "đúc khuôn cát",
  shave: "cạo, gọt",
  shit: "đại tiện (tục)",
  "sight-read": "đọc nhạc tại chỗ",
  slay: "giết, hạ sát",
  slink: "lẻn đi",
  slit: "rạch, xẻ",
  sneak: "lẻn, lén lút",
  "spoon-feed": "đút ăn bằng thìa; hướng dẫn quá kỹ",
  strew: "rải, vương vãi",
  stride: "sải bước",
  string: "xâu, xâu chuỗi",
  sublet: "cho thuê lại",
  sunburn: "làm cháy nắng",
  sweat: "đổ mồ hôi",
  telecast: "phát sóng truyền hình",
  "test-drive": "lái thử",
  "test-fly": "bay thử",
  typecast: "đóng khung vai diễn",
  typeset: "xếp chữ, dàn trang",
  typewrite: "đánh máy",
  unbend: "duỗi thẳng; bớt nghiêm nghị",
  unbind: "tháo dây, giải phóng",
  unclothe: "cởi quần áo",
  underbid: "trả giá thấp hơn",
  undercut: "bán rẻ hơn; cắt giảm",
  underfeed: "cho ăn thiếu",
  undergo: "trải qua, chịu đựng",
  underlie: "là nền tảng của",
  undersell: "bán rẻ hơn; đánh giá thấp",
  underspend: "chi tiêu ít hơn dự kiến",
  undertake: "đảm nhận, cam kết",
  underwrite: "bảo lãnh; tài trợ",
  undo: "tháo bỏ; hoàn tác",
  unfreeze: "làm tan băng; giải phóng",
  unhang: "gỡ xuống",
  unhide: "hiện lại",
  unknit: "tháo len đã đan",
  unlearn: "bỏ thói quen hoặc kiến thức cũ",
  unsew: "tháo đường may",
  unsling: "tháo khỏi vai",
  unspin: "tháo sợi; làm mất tác dụng",
  unstick: "gỡ ra",
  unstring: "tháo dây; làm mất bình tĩnh",
  unweave: "tháo mối dệt",
  unwind: "tháo cuộn; thư giãn",
  uphold: "ủng hộ; duy trì",
  upset: "làm buồn; lật đổ",
  waylay: "chặn đường, phục kích",
  wed: "kết hôn",
  withdraw: "rút lui, rút tiền",
  withhold: "giữ lại, khấu lưu",
};

const CORRECTIONS: Record<string, Partial<Verb>> = {
  read: { past_simple: "read (/red/)", past_participle: "read (/red/)" },
  kneel: { past_simple: "knelt/kneeled", past_participle: "knelt/kneeled" },
  sew: { past_simple: "sewed", past_participle: "sewn/sewed" },
};

const existingVerbs = new Map(
  verbData.verbs.map((verb) => [verb.infinitive, verb]),
);
const VERBS: Verb[] = Object.entries(irregularVerbData)
  .slice(0, 360)
  .map(([infinitive, forms]) => {
    const existing = existingVerbs.get(infinitive);
    const formAt = (index: number) =>
      [...new Set(forms.map((form) => form[index]))].join("/");
    return {
      infinitive,
      past_simple: existing?.past_simple ?? formAt(0),
      past_participle: existing?.past_participle ?? formAt(1),
      ...CORRECTIONS[infinitive],
      meaning: MEANINGS[infinitive] ?? ADDITIONAL_MEANINGS[infinitive] ?? "",
    };
  })
  .sort((first, second) => first.infinitive.localeCompare(second.infinitive));
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
          <SpeakButton
            text={form === "read" && pronunciation === "/red/" ? "red" : form}
            label={`Phát âm ${form}`}
            className="size-7"
          />
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
      <div>
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
            {VERBS.length} động từ, sắp xếp A–Z
          </p>
        </div>
      </div>

      <div className="mt-5 border-y border-mist py-4">
        <h3 className="font-semibold">Động từ bất quy tắc là gì?</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">
          Động từ bất quy tắc (Irregular Verbs) là những động từ có dạng quá khứ
          đơn (V2) và quá khứ phân từ (V3) không được tạo theo quy tắc thông
          thường thêm -ed; hình thức của chúng có thể thay đổi hoặc giữ nguyên
          tùy động từ.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Vì không có một quy tắc thống nhất áp dụng cho tất cả, người học cần
          ghi nhớ từng dạng. Mỗi động từ thường được tra theo ba dạng: nguyên
          thể (V1), quá khứ đơn (V2) và quá khứ phân từ (V3).
        </p>
      </div>

      <label className="mt-4 block w-full sm:max-w-xs">
        <span className="sr-only">Tìm động từ</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm theo V1, V2 hoặc V3"
          className="w-full rounded-lg border border-mist bg-white px-3 py-2 text-sm outline-none focus:border-sea"
        />
      </label>

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
        Dấu / phân cách các dạng thay thế. Danh sách gồm 360 động từ, bao gồm
        một số động từ ghép và tiền tố. Nguồn dữ liệu: Ludan Stoecklé ({" "}
        <a
          className="underline underline-offset-2 hover:text-sea"
          href="https://github.com/RosaeNLG/rosaenlg/tree/master/packages/english-verbs-irregular"
        >
          Apache 2.0
        </a>
        ) và Franceskynov ({" "}
        <a
          className="underline underline-offset-2 hover:text-sea"
          href="https://github.com/Franceskynov/node-english-irregular-verbs"
        >
          MIT
        </a>
        ).
      </p>
    </section>
  );
}
