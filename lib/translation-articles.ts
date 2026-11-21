export type TranslationArticle = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  level: string;
  languages: ("en" | "ja")[];
  sourceLanguage: "en" | "ja";
  artwork: string;
  icon: string;
  minutes: number;
  source: string[];
  translation: string[];
  vocabulary: { word: string; meaning: string }[];
  grammar: { title: string; explanation: string; example: string }[];
};

export const TRANSLATION_ARTICLES: TranslationArticle[] = [
  {
    slug: "future-of-remote-work",
    title: "The Future of Remote Work",
    description: "Làm việc từ xa đang thay đổi cách chúng ta sống và làm việc như thế nào?",
    topic: "Công nghệ",
    level: "Trung cấp",
    languages: ["en", "ja"],
    sourceLanguage: "en",
    artwork: "from-blue-100 to-amber-50",
    icon: "💻",
    minutes: 8,
    source: [
      "Remote work has changed the way many people organize their day. Without a daily commute, workers can spend more time with family or focus on personal projects.",
      "However, working from home also requires clear routines. Taking regular breaks and keeping in touch with teammates can help people stay productive and feel connected.",
    ],
    translation: [
      "Làm việc từ xa đã thay đổi cách nhiều người sắp xếp ngày của mình. Không phải đi làm mỗi ngày, người lao động có thể dành nhiều thời gian hơn cho gia đình hoặc tập trung vào các dự án cá nhân.",
      "Tuy nhiên, làm việc tại nhà cũng đòi hỏi những thói quen rõ ràng. Nghỉ giải lao thường xuyên và giữ liên lạc với đồng nghiệp có thể giúp mọi người làm việc hiệu quả và cảm thấy gắn kết.",
    ],
    vocabulary: [
      { word: "commute", meaning: "đi lại giữa nhà và nơi làm việc" },
      { word: "productive", meaning: "có năng suất, làm việc hiệu quả" },
    ],
    grammar: [
      {
        title: "Without + danh từ",
        explanation: "Dùng “without” trước danh từ để diễn tả việc thiếu hoặc không có điều gì đó.",
        example: "Without a daily commute, workers have more free time.",
      },
    ],
  },
  {
    slug: "journey-to-the-south",
    title: "A Journey to the South",
    description: "Chuyến đi khám phá vùng đất phía Nam với những trải nghiệm đáng nhớ.",
    topic: "Du lịch",
    level: "Sơ cấp",
    languages: ["en", "ja"],
    sourceLanguage: "en",
    artwork: "from-cyan-100 to-blue-200",
    icon: "🏝️",
    minutes: 6,
    source: [
      "Last summer, my friends and I traveled south by train. We visited a quiet beach, tried local food, and watched the sun set over the water.",
      "The journey was simple, but every day brought something new. I came home with great memories and a promise to explore more places.",
    ],
    translation: [
      "Mùa hè năm ngoái, tôi và bạn bè đi tàu về phía Nam. Chúng tôi ghé thăm một bãi biển yên bình, thử các món ăn địa phương và ngắm mặt trời lặn trên mặt biển.",
      "Chuyến đi thật giản dị nhưng ngày nào cũng có điều mới mẻ. Tôi trở về nhà với nhiều kỷ niệm đẹp và lời hứa sẽ khám phá thêm nhiều nơi.",
    ],
    vocabulary: [
      { word: "local", meaning: "thuộc về địa phương" },
      { word: "explore", meaning: "khám phá" },
    ],
    grammar: [
      {
        title: "Thì quá khứ đơn",
        explanation: "Dùng quá khứ đơn cho sự việc đã xảy ra và kết thúc trong quá khứ.",
        example: "We visited a quiet beach last summer.",
      },
    ],
  },
  {
    slug: "healthy-eating",
    title: "Healthy Eating for a Better Life",
    description: "Chế độ ăn uống lành mạnh giúp chúng ta có cuộc sống tốt hơn như thế nào?",
    topic: "Sức khỏe",
    level: "Trung cấp",
    languages: ["en", "ja"],
    sourceLanguage: "en",
    artwork: "from-lime-100 to-orange-100",
    icon: "🥗",
    minutes: 7,
    source: [
      "A balanced diet gives the body the energy it needs throughout the day. Fresh vegetables, fruit, and whole grains are simple choices that support good health.",
      "Healthy eating does not mean giving up every favorite meal. Small changes, such as drinking more water or adding vegetables to lunch, can become lasting habits.",
    ],
    translation: [
      "Một chế độ ăn cân bằng cung cấp cho cơ thể năng lượng cần thiết suốt cả ngày. Rau củ tươi, trái cây và ngũ cốc nguyên hạt là những lựa chọn đơn giản giúp duy trì sức khỏe tốt.",
      "Ăn uống lành mạnh không có nghĩa là phải từ bỏ mọi món ăn yêu thích. Những thay đổi nhỏ, như uống thêm nước hoặc bổ sung rau vào bữa trưa, có thể trở thành thói quen lâu dài.",
    ],
    vocabulary: [
      { word: "balanced diet", meaning: "chế độ ăn uống cân bằng" },
      { word: "lasting", meaning: "lâu dài, bền vững" },
    ],
    grammar: [
      {
        title: "Such as + ví dụ",
        explanation: "Dùng “such as” để đưa ra một hoặc nhiều ví dụ cụ thể.",
        example: "Small changes, such as drinking more water, can help.",
      },
    ],
  },
  {
    slug: "technology-and-the-future",
    title: "テクノロジーが変える未来",
    description: "Công nghệ đang thay đổi tương lai của chúng ta ra sao?",
    topic: "Công nghệ",
    level: "Trung cấp",
    languages: ["en", "ja"],
    sourceLanguage: "ja",
    artwork: "from-sky-100 to-indigo-200",
    icon: "🌆",
    minutes: 7,
    source: [
      "テクノロジーの進歩によって、私たちの生活は大きく変わっています。スマートフォンを使えば、遠くにいる人とも簡単に連絡できます。",
      "これからは、便利さだけでなく、人と人とのつながりも大切にする技術が求められるでしょう。",
    ],
    translation: [
      "Nhờ sự phát triển của công nghệ, cuộc sống của chúng ta đang thay đổi đáng kể. Chỉ cần dùng điện thoại thông minh, chúng ta cũng có thể dễ dàng liên lạc với người ở xa.",
      "Trong tương lai, chúng ta sẽ cần những công nghệ không chỉ tiện lợi mà còn coi trọng sự kết nối giữa con người với nhau.",
    ],
    vocabulary: [
      { word: "進歩（しんぽ）", meaning: "sự tiến bộ, phát triển" },
      { word: "つながり", meaning: "sự kết nối, mối liên hệ" },
    ],
    grammar: [
      {
        title: "〜によって",
        explanation: "Diễn tả nguyên nhân hoặc phương tiện, có nghĩa là “nhờ vào” hoặc “bởi”.",
        example: "テクノロジーの進歩によって、生活が変わりました。",
      },
    ],
  },
  {
    slug: "art-of-traveling-alone",
    title: "The Art of Traveling Alone",
    description: "Những bài học quý giá từ những chuyến đi một mình.",
    topic: "Kỹ năng sống",
    level: "Trung cấp",
    languages: ["en", "ja"],
    sourceLanguage: "en",
    artwork: "from-emerald-100 to-amber-100",
    icon: "🏕️",
    minutes: 8,
    source: [
      "Traveling alone gives you the freedom to choose your own pace. You can spend an afternoon in a museum or change your plans whenever you like.",
      "It also teaches you to solve problems independently. A little preparation can make a solo trip safer and help you enjoy each moment with confidence.",
    ],
    translation: [
      "Du lịch một mình cho bạn tự do lựa chọn nhịp độ riêng. Bạn có thể dành cả buổi chiều trong viện bảo tàng hoặc thay đổi kế hoạch bất cứ lúc nào.",
      "Điều đó cũng dạy bạn tự giải quyết vấn đề. Một chút chuẩn bị có thể giúp chuyến đi một mình an toàn hơn và giúp bạn tận hưởng từng khoảnh khắc với sự tự tin.",
    ],
    vocabulary: [
      { word: "pace", meaning: "nhịp độ, tốc độ" },
      { word: "independently", meaning: "một cách độc lập" },
    ],
    grammar: [
      {
        title: "Whenever + mệnh đề",
        explanation: "Dùng “whenever” để nói “bất cứ khi nào” một việc xảy ra.",
        example: "You can change your plans whenever you like.",
      },
    ],
  },
  {
    slug: "japanese-food-culture",
    title: "日本の食文化",
    description: "Văn hóa ẩm thực đặc sắc của Nhật Bản.",
    topic: "Văn hóa",
    level: "Sơ cấp",
    languages: ["en", "ja"],
    sourceLanguage: "ja",
    artwork: "from-orange-100 to-rose-100",
    icon: "🍱",
    minutes: 6,
    source: [
      "日本の食文化には、季節の食材を大切にする考え方があります。春には山菜、秋にはきのこなど、その時期ならではの味を楽しみます。",
      "食事の前に「いただきます」と言う習慣もあります。食べ物や、それを作った人への感謝を表す言葉です。",
    ],
    translation: [
      "Trong văn hóa ẩm thực Nhật Bản, người ta coi trọng các nguyên liệu theo mùa. Họ thưởng thức những hương vị đặc trưng của từng thời điểm, như rau dại vào mùa xuân và nấm vào mùa thu.",
      "Trước bữa ăn, người Nhật cũng có thói quen nói “itadakimasu”. Đây là lời thể hiện sự biết ơn đối với thức ăn và những người đã làm ra món ăn.",
    ],
    vocabulary: [
      { word: "食材（しょくざい）", meaning: "nguyên liệu nấu ăn" },
      { word: "習慣（しゅうかん）", meaning: "thói quen, phong tục" },
    ],
    grammar: [
      {
        title: "〜ならでは",
        explanation: "Diễn tả nét đặc trưng chỉ có ở một nơi hoặc thời điểm nhất định.",
        example: "その時期ならではの味を楽しみます。",
      },
    ],
  },
  {
    slug: "good-study-habits",
    title: "How to Build Good Study Habits",
    description: "Làm thế nào để hình thành thói quen học tập tốt mỗi ngày?",
    topic: "Học tập",
    level: "Trung cấp",
    languages: ["en", "ja"],
    sourceLanguage: "en",
    artwork: "from-amber-100 to-stone-200",
    icon: "📖",
    minutes: 7,
    source: [
      "Good study habits are easier to build when you have a regular time and a quiet place to learn. A short daily session can be more useful than a long session once a week.",
      "Before you begin, decide on one small goal. When you finish, take a short break and notice what you have learned. This makes it easier to return tomorrow.",
    ],
    translation: [
      "Thói quen học tập tốt sẽ dễ hình thành hơn nếu bạn có thời gian cố định và một nơi yên tĩnh để học. Một buổi học ngắn mỗi ngày có thể hữu ích hơn một buổi học dài mỗi tuần.",
      "Trước khi bắt đầu, hãy chọn một mục tiêu nhỏ. Khi hoàn thành, hãy nghỉ ngắn và để ý xem mình đã học được gì. Điều này giúp bạn dễ quay lại học vào ngày mai.",
    ],
    vocabulary: [
      { word: "regular", meaning: "đều đặn, thường xuyên" },
      { word: "session", meaning: "buổi học, khoảng thời gian hoạt động" },
    ],
    grammar: [
      {
        title: "When + hiện tại đơn",
        explanation: "Dùng mệnh đề với “when” để nói về thời điểm một việc xảy ra.",
        example: "When you finish, take a short break.",
      },
    ],
  },
  {
    slug: "first-trip-to-japan",
    title: "はじめての日本旅行",
    description: "Lần đầu tiên du lịch Nhật Bản, bạn nên chuẩn bị những gì?",
    topic: "Du lịch",
    level: "Sơ cấp",
    languages: ["en", "ja"],
    sourceLanguage: "ja",
    artwork: "from-rose-100 to-orange-100",
    icon: "🚶",
    minutes: 6,
    source: [
      "はじめて日本を旅行するなら、電車の乗り方を調べておくと安心です。駅では案内表示を見て、分からないときは駅員に聞きましょう。",
      "旅行の予定を詰め込みすぎず、休む時間も作りましょう。ゆっくり歩くと、町の小さな魅力にも気づくことができます。",
    ],
    translation: [
      "Nếu lần đầu du lịch Nhật Bản, bạn sẽ yên tâm hơn nếu tìm hiểu trước cách đi tàu. Ở nhà ga, hãy xem các biển chỉ dẫn và hỏi nhân viên nhà ga nếu chưa rõ.",
      "Đừng sắp xếp lịch trình quá dày đặc, hãy dành cả thời gian nghỉ ngơi. Khi thong thả đi bộ, bạn cũng có thể nhận ra những nét thú vị nhỏ bé của thành phố.",
    ],
    vocabulary: [
      { word: "案内表示（あんないひょうじ）", meaning: "biển chỉ dẫn" },
      { word: "詰め込む（つめこむ）", meaning: "nhồi nhét, sắp xếp quá dày" },
    ],
    grammar: [
      {
        title: "〜なら",
        explanation: "Dùng để nêu giả định hoặc điều kiện, có nghĩa là “nếu”.",
        example: "はじめて日本を旅行するなら、準備しておきましょう。",
      },
    ],
  },
];
