export type SkillKey =
  | "grammar" | "vocabulary" | "pronunciation" | "listening" | "speaking"
  | "reading" | "writing" | "review" | "practice";

export type Skill = { key: SkillKey; label: string; hint: string; color: string };

export const SKILLS: Skill[] = [
  { key: "grammar", label: "Ngữ pháp", hint: "Cấu trúc câu và quy tắc dùng từ", color: "#3B5BDB" },
  { key: "vocabulary", label: "Từ vựng", hint: "Từ và cụm từ theo chủ đề", color: "#0F8B8D" },
  { key: "pronunciation", label: "Phát âm", hint: "Âm, trọng âm, ngữ điệu", color: "#9C36B5" },
  { key: "listening", label: "Nghe", hint: "Hội thoại và bài nghe ngắn", color: "#1C7ED6" },
  { key: "speaking", label: "Nói", hint: "Nhắc lại, hỏi đáp, nhập vai", color: "#E4572E" },
  { key: "reading", label: "Đọc", hint: "Bài đọc theo trình độ", color: "#2F9E44" },
  { key: "writing", label: "Viết", hint: "Câu, đoạn văn, thư ngắn", color: "#C2790A" },
  { key: "review", label: "Ôn tập", hint: "Nhắc lại đúng lúc sắp quên", color: "#5C6B7A" },
  { key: "practice", label: "Luyện tập", hint: "Bài tập tổng hợp cuối bài", color: "#D6336C" },
];

export const skillByKey = (k: SkillKey) => SKILLS.find((s) => s.key === k)!;

export type Level = {
  id: number;
  code: string;
  title: string;
  summary: string;
  status: "open" | "soon";
};

export const LEVELS: Level[] = [
  { id: 0, code: "Khởi động", title: "Làm quen tiếng Anh", summary: "Bảng chữ cái, âm cơ bản và những câu đầu tiên.", status: "open" },
  { id: 1, code: "A1", title: "Basic English", summary: "Giao tiếp đơn giản về bản thân, gia đình, sinh hoạt.", status: "soon" },
  { id: 2, code: "A2", title: "Elementary English", summary: "Kể chuyện hằng ngày, mua sắm, hỏi đường, kế hoạch.", status: "soon" },
  { id: 3, code: "B1", title: "Intermediate", summary: "Trao đổi ý kiến, kể trải nghiệm, xử lý tình huống quen thuộc.", status: "soon" },
  { id: 4, code: "B2", title: "Upper Intermediate", summary: "Thảo luận chủ đề rộng, đọc và nghe tài liệu thật.", status: "soon" },
  { id: 5, code: "C1", title: "Advanced", summary: "Diễn đạt trôi chảy, chính xác trong học tập và công việc.", status: "soon" },
  { id: 6, code: "Thực chiến", title: "Fluency / Real English", summary: "Tiếng Anh đời thực: phim, podcast, họp, tranh luận.", status: "soon" },
];

export type Lesson = { slug: string; title: string; minutes: number; skills: SkillKey[] };
export type Module = {
  slug: string;
  title: string;
  short: string;
  description: string;
  lessons: Lesson[];
};

export const LEVEL0_MODULES: Module[] = [
  {
    slug: "alphabet",
    title: "English Alphabet",
    short: "Bảng chữ cái",
    description: "Học 26 chữ cái: tên gọi, cách viết và từ ví dụ đầu tiên cho mỗi chữ.",
    lessons: [
      { slug: "a-e", title: "Chữ cái A đến E", minutes: 8, skills: ["pronunciation", "vocabulary", "writing"] },
      { slug: "f-j", title: "Chữ cái F đến J", minutes: 8, skills: ["pronunciation", "vocabulary", "writing"] },
      { slug: "k-o", title: "Chữ cái K đến O", minutes: 8, skills: ["pronunciation", "vocabulary", "writing"] },
      { slug: "p-t", title: "Chữ cái P đến T", minutes: 8, skills: ["pronunciation", "vocabulary", "writing"] },
      { slug: "u-z", title: "Chữ cái U đến Z", minutes: 8, skills: ["pronunciation", "vocabulary", "writing"] },
      { slug: "spell-name", title: "Đánh vần tên của bạn", minutes: 10, skills: ["listening", "speaking"] },
      { slug: "alphabet-check", title: "Kiểm tra cuối module", minutes: 10, skills: ["review", "practice"] },
    ],
  },
  {
    slug: "sounds",
    title: "Sounds",
    short: "Âm tiếng Anh",
    description: "Làm quen các âm người Việt hay nhầm và cách đặt trọng âm cho từ.",
    lessons: [
      { slug: "vowels", title: "Nguyên âm ngắn và dài", minutes: 12, skills: ["pronunciation", "listening"] },
      { slug: "consonants", title: "Phụ âm dễ nhầm: th, r, s, sh", minutes: 12, skills: ["pronunciation", "speaking"] },
      { slug: "final-sounds", title: "Âm cuối: -s, -ed, -t, -d", minutes: 10, skills: ["pronunciation", "listening"] },
      { slug: "word-stress", title: "Trọng âm của từ", minutes: 10, skills: ["pronunciation", "practice"] },
      { slug: "minimal-pairs", title: "Nghe và phân biệt cặp âm", minutes: 10, skills: ["listening", "practice"] },
      { slug: "sounds-check", title: "Kiểm tra cuối module", minutes: 10, skills: ["review", "practice"] },
    ],
  },
  {
    slug: "first-sentences",
    title: "Những câu đầu tiên",
    short: "Câu đầu tiên",
    description: "Chào hỏi, giới thiệu bản thân và nói được vài câu trọn vẹn ngay từ tuần đầu.",
    lessons: [
      { slug: "greetings", title: "Chào hỏi", minutes: 10, skills: ["vocabulary", "listening", "speaking"] },
      { slug: "introduce", title: "Giới thiệu bản thân", minutes: 12, skills: ["grammar", "speaking", "writing"] },
      { slug: "name-origin", title: "Hỏi tên và quê quán", minutes: 12, skills: ["grammar", "listening", "speaking"] },
      { slug: "thanks-sorry", title: "Cảm ơn và xin lỗi", minutes: 8, skills: ["vocabulary", "speaking"] },
      { slug: "numbers", title: "Số từ 1 đến 20", minutes: 10, skills: ["vocabulary", "listening", "reading"] },
      { slug: "first-dialogue", title: "Hội thoại đầu tiên", minutes: 12, skills: ["reading", "speaking", "practice"] },
      { slug: "sentences-check", title: "Kiểm tra cuối module", minutes: 10, skills: ["review", "practice"] },
    ],
  },
  {
    slug: "ipa",
    title: "Phát âm chuẩn IPA",
    short: "Phát âm IPA",
    description: "Làm quen bảng phiên âm quốc tế IPA để nhận diện và phát âm chính xác các âm tiếng Anh.",
    lessons: [
      { slug: "ipa-vowels", title: "Nguyên âm đơn trong IPA", minutes: 12, skills: ["pronunciation", "listening"] },
      { slug: "ipa-consonants", title: "Phụ âm trong IPA", minutes: 12, skills: ["pronunciation", "speaking"] },
      { slug: "ipa-diphthongs", title: "Nguyên âm đôi", minutes: 10, skills: ["pronunciation", "listening"] },
      { slug: "voiced-unvoiced", title: "Phân biệt âm hữu thanh và vô thanh", minutes: 10, skills: ["pronunciation", "listening", "practice"] },
      { slug: "ipa-word-stress", title: "Đọc phiên âm và xác định trọng âm", minutes: 12, skills: ["pronunciation", "reading"] },
      { slug: "ipa-practice", title: "Luyện đọc phiên âm từ vựng", minutes: 12, skills: ["pronunciation", "speaking", "practice"] },
    ],
  },
  {
    slug: "irregular-verbs",
    title: "Bảng 360 động từ bất quy tắc trong tiếng Anh",
    short: "Table of irregular verbs",
    description: "Tra cứu và ghi nhớ động từ bất quy tắc qua dạng nguyên thể, quá khứ đơn, quá khứ phân từ và cách dùng.",
    lessons: [
      { slug: "verb-forms", title: "Ba dạng của động từ bất quy tắc", minutes: 10, skills: ["grammar", "vocabulary"] },
      { slug: "same-forms", title: "Nhóm động từ có ba dạng giống nhau", minutes: 12, skills: ["vocabulary", "reading"] },
      { slug: "past-same-participle", title: "Nhóm có quá khứ đơn và phân từ giống nhau", minutes: 12, skills: ["vocabulary", "grammar"] },
      { slug: "vowel-changes", title: "Nhóm biến đổi nguyên âm", minutes: 12, skills: ["vocabulary", "pronunciation"] },
      { slug: "other-patterns", title: "Các nhóm biến đổi đặc biệt", minutes: 12, skills: ["vocabulary", "grammar"] },
      { slug: "verb-usage", title: "Dùng động từ trong câu quá khứ và hoàn thành", minutes: 15, skills: ["grammar", "writing", "practice"] },
      { slug: "verbs-review", title: "Ôn tập động từ bất quy tắc", minutes: 15, skills: ["review", "practice"] },
    ],
  },
];

export const ALPHABET = [
  ["A", "ây", "Apple", "quả táo"], ["B", "bi", "Book", "quyển sách"], ["C", "xi", "Cat", "con mèo"],
  ["D", "đi", "Dog", "con chó"], ["E", "i", "Egg", "quả trứng"], ["F", "ép", "Fish", "con cá"],
  ["G", "gi", "Green", "màu xanh lá"], ["H", "ây-ch", "Hat", "cái mũ"], ["I", "ai", "Ice", "đá lạnh"],
  ["J", "giây", "Juice", "nước ép"], ["K", "kây", "Kite", "con diều"], ["L", "eo", "Lemon", "quả chanh"],
  ["M", "em", "Moon", "mặt trăng"], ["N", "en", "Nose", "cái mũi"], ["O", "âu", "Orange", "quả cam"],
  ["P", "pi", "Pen", "cây bút"], ["Q", "kiu", "Queen", "nữ hoàng"], ["R", "a", "Rain", "cơn mưa"],
  ["S", "ét", "Sun", "mặt trời"], ["T", "ti", "Tree", "cái cây"], ["U", "iu", "Umbrella", "cái ô"],
  ["V", "vi", "Van", "xe tải nhỏ"], ["W", "đấp-bồ-iu", "Water", "nước"], ["X", "ếch", "X-ray", "tia X"],
  ["Y", "quai", "Yellow", "màu vàng"], ["Z", "di", "Zebra", "ngựa vằn"],
] as const;
