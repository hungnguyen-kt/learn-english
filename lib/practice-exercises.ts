export type ExerciseQuestion =
  | {
      id: string;
      kind: "multiple-choice";
      prompt: string;
      options: string[];
      answerIndex: number;
      explanation: string;
    }
  | {
      id: string;
      kind: "fill-blank";
      before: string;
      after: string;
      answer: string;
      explanation: string;
    }
  | {
      id: string;
      kind: "sentence-ordering";
      words: string[];
      answer: string;
      explanation: string;
    }
  | {
      id: string;
      kind: "word-formation";
      before: string;
      root: string;
      after: string;
      answer: string;
      explanation: string;
    }
  | {
      id: string;
      kind: "error-correction";
      sentence: string;
      mistake: string;
      correction: string;
      answer: string;
      explanation: string;
    }
  | {
      id: string;
      kind: "sentence-transformation";
      original: string;
      keyword: string;
      before: string;
      after: string;
      answer: string;
      explanation: string;
    };

export type MultipleChoiceQuestion = Extract<ExerciseQuestion, { kind: "multiple-choice" }>;
export type SentenceOrderingQuestion = Extract<ExerciseQuestion, { kind: "sentence-ordering" }>;
export type FillBlankQuestion = Extract<ExerciseQuestion, { kind: "fill-blank" }>;
export type WordFormationQuestion = Extract<ExerciseQuestion, { kind: "word-formation" }>;
export type ErrorCorrectionQuestion = Extract<ExerciseQuestion, { kind: "error-correction" }>;
export type SentenceTransformationQuestion = Extract<ExerciseQuestion, { kind: "sentence-transformation" }>;

type PracticeTypeSeed = {
  id: string;
  title: string;
  description: string;
  example: string;
  questions: ExerciseQuestion[];
};

export type PracticeLesson = {
  id: string;
  title: string;
  questions: ExerciseQuestion[];
};

export type PracticeType = Omit<PracticeTypeSeed, "questions"> & {
  lessons: PracticeLesson[];
};

const PRACTICE_TYPE_SEEDS: PracticeTypeSeed[] = [
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    description: "Chọn đáp án đúng để hoàn thành câu.",
    example: "She _____ here since 2020.",
    questions: [
      {
        id: "mc-1",
        kind: "multiple-choice",
        prompt: "She _____ here since 2020.",
        options: ["lives", "lived", "has lived", "is living"],
        answerIndex: 2,
        explanation: "Dùng hiện tại hoàn thành với “since” để nói về việc bắt đầu trong quá khứ và vẫn tiếp diễn.",
      },
      {
        id: "mc-2",
        kind: "multiple-choice",
        prompt: "They _____ each other for ten years.",
        options: ["know", "knew", "have known", "are knowing"],
        answerIndex: 2,
        explanation: "“For ten years” diễn tả khoảng thời gian kéo dài đến hiện tại, nên dùng hiện tại hoàn thành.",
      },
      {
        id: "mc-3",
        kind: "multiple-choice",
        prompt: "I _____ my homework yet.",
        options: ["don't finish", "didn't finish", "haven't finished", "am not finishing"],
        answerIndex: 2,
        explanation: "“Yet” thường đi với hiện tại hoàn thành trong câu phủ định.",
      },
    ],
  },
  {
    id: "fill-in-the-blank",
    title: "Fill in the blank",
    description: "Điền từ còn thiếu để hoàn chỉnh câu.",
    example: "I have ________ here since 2020.",
    questions: [
      {
        id: "blank-1",
        kind: "fill-blank",
        before: "I have ",
        after: " here since 2020.",
        answer: "lived",
        explanation: "“Live” ở dạng quá khứ phân từ là “lived”.",
      },
      {
        id: "blank-2",
        kind: "fill-blank",
        before: "She has ",
        after: " her homework already.",
        answer: "finished",
        explanation: "Sau “has” dùng quá khứ phân từ “finished”.",
      },
      {
        id: "blank-3",
        kind: "fill-blank",
        before: "We haven't ",
        after: " that movie before.",
        answer: "seen",
        explanation: "“See” có quá khứ phân từ bất quy tắc là “seen”.",
      },
    ],
  },
  {
    id: "sentence-ordering",
    title: "Sentence ordering",
    description: "Sắp xếp các từ để tạo thành câu đúng.",
    example: "been / I / never / London / have / to",
    questions: [
      {
        id: "order-1",
        kind: "sentence-ordering",
        words: ["been", "I", "never", "London", "have", "to"],
        answer: "I have never been to London.",
        explanation: "Trật tự đúng: chủ ngữ + have + trạng từ + quá khứ phân từ + địa điểm.",
      },
      {
        id: "order-2",
        kind: "sentence-ordering",
        words: ["finished", "has", "already", "He", "work", "his"],
        answer: "He has already finished his work.",
        explanation: "Trạng từ “already” đứng sau trợ động từ “has” và trước động từ chính.",
      },
      {
        id: "order-3",
        kind: "sentence-ordering",
        words: ["you", "ever", "Have", "tried", "sushi"],
        answer: "Have you ever tried sushi?",
        explanation: "Câu hỏi hiện tại hoàn thành bắt đầu bằng “Have” + chủ ngữ + ever + quá khứ phân từ.",
      },
    ],
  },
  {
    id: "word-formation",
    title: "Word formation",
    description: "Biến đổi từ gợi ý để phù hợp với vị trí trong câu.",
    example: "His ______ surprised everyone. (DECIDE)",
    questions: [
      {
        id: "word-1",
        kind: "word-formation",
        before: "His ",
        root: "DECIDE",
        after: " surprised everyone.",
        answer: "decision",
        explanation: "Sau tính từ sở hữu “his” cần một danh từ. “Decide” chuyển thành “decision”.",
      },
      {
        id: "word-2",
        kind: "word-formation",
        before: "The team celebrated their ",
        root: "SUCCEED",
        after: ".",
        answer: "success",
        explanation: "Sau “their” cần danh từ. “Succeed” chuyển thành “success”.",
      },
      {
        id: "word-3",
        kind: "word-formation",
        before: "She answered the question ",
        root: "CONFIDENT",
        after: ".",
        answer: "confidently",
        explanation: "Từ bổ nghĩa cho động từ “answered” là trạng từ “confidently”.",
      },
    ],
  },
  {
    id: "error-correction",
    title: "Error correction",
    description: "Tìm và sửa lỗi ngữ pháp trong câu.",
    example: "She has went to London.",
    questions: [
      {
        id: "error-1",
        kind: "error-correction",
        sentence: "She has went to London.",
        mistake: "has went",
        correction: "has gone",
        answer: "She has gone to London.",
        explanation: "Sau “has” cần quá khứ phân từ. “Go” có dạng quá khứ phân từ là “gone”.",
      },
      {
        id: "error-2",
        kind: "error-correction",
        sentence: "I have saw that film before.",
        mistake: "have saw",
        correction: "have seen",
        answer: "I have seen that film before.",
        explanation: "Sau “have” dùng quá khứ phân từ “seen”, không dùng quá khứ đơn “saw”.",
      },
      {
        id: "error-3",
        kind: "error-correction",
        sentence: "He has lived here since five years.",
        mistake: "since five years",
        correction: "for five years",
        answer: "He has lived here for five years.",
        explanation: "Dùng “for” với khoảng thời gian; dùng “since” với mốc thời gian bắt đầu.",
      },
    ],
  },
  {
    id: "sentence-transformation",
    title: "Sentence transformation",
    description: "Viết lại câu theo từ khóa mà không đổi nghĩa.",
    example: "I started studying English three years ago. (FOR)",
    questions: [
      {
        id: "transform-1",
        kind: "sentence-transformation",
        original: "I started studying English three years ago.",
        keyword: "FOR",
        before: "I ",
        after: " English for three years.",
        answer: "I have been studying English for three years.",
        explanation: "Dùng hiện tại hoàn thành tiếp diễn với “for” để nhấn mạnh hành động bắt đầu trong quá khứ và còn tiếp diễn.",
      },
      {
        id: "transform-2",
        kind: "sentence-transformation",
        original: "The last time we met was two months ago.",
        keyword: "FOR",
        before: "We haven't met ",
        after: ".",
        answer: "We haven't met for two months.",
        explanation: "Đổi “The last time ... was” thành hiện tại hoàn thành phủ định với “for”.",
      },
      {
        id: "transform-3",
        kind: "sentence-transformation",
        original: "I last visited Paris in 2022.",
        keyword: "SINCE",
        before: "I haven't visited Paris ",
        after: ".",
        answer: "I haven't visited Paris since 2022.",
        explanation: "Dùng “since” trước mốc thời gian bắt đầu.",
      },
    ],
  },
];

const QUESTIONS_PER_LESSON = 50;
const LESSON_COUNT = 2;

const subjects = [
  { text: "I", auxiliary: "have", be: "am" },
  { text: "She", auxiliary: "has", be: "is" },
  { text: "We", auxiliary: "have", be: "are" },
  { text: "He", auxiliary: "has", be: "is" },
  { text: "They", auxiliary: "have", be: "are" },
  { text: "My sister", auxiliary: "has", be: "is" },
  { text: "The students", auxiliary: "have", be: "are" },
  { text: "Our teacher", auxiliary: "has", be: "is" },
  { text: "Daniel", auxiliary: "has", be: "is" },
  { text: "My friends", auxiliary: "have", be: "are" },
];

const mcVerbs = [
  { base: "live", thirdPerson: "lives", past: "lived", participle: "lived", ing: "living", object: "here" },
  { base: "work", thirdPerson: "works", past: "worked", participle: "worked", ing: "working", object: "at this company" },
  { base: "study", thirdPerson: "studies", past: "studied", participle: "studied", ing: "studying", object: "English" },
  { base: "teach", thirdPerson: "teaches", past: "taught", participle: "taught", ing: "teaching", object: "at this school" },
  { base: "play", thirdPerson: "plays", past: "played", participle: "played", ing: "playing", object: "for this team" },
];

const blankVerbs = [
  { base: "live", participle: "lived", object: "here" },
  { base: "work", participle: "worked", object: "at this company" },
  { base: "study", participle: "studied", object: "English" },
  { base: "teach", participle: "taught", object: "art" },
  { base: "go", participle: "gone", object: "to London" },
  { base: "see", participle: "seen", object: "that movie" },
  { base: "eat", participle: "eaten", object: "sushi" },
  { base: "write", participle: "written", object: "three articles" },
  { base: "visit", participle: "visited", object: "Japan" },
  { base: "finish", participle: "finished", object: "the project" },
];

const orderingVerbs = [
  { participle: "seen", object: "that film" },
  { participle: "tried", object: "sushi" },
  { participle: "visited", object: "Japan" },
  { participle: "read", object: "the book" },
  { participle: "finished", object: "the report" },
  { participle: "met", object: "the new manager" },
  { participle: "written", object: "three emails" },
  { participle: "completed", object: "the course" },
  { participle: "bought", object: "a new laptop" },
  { participle: "traveled", object: "to Canada" },
];

const wordFamilies = [
  { root: "DECIDE", answer: "decision", sentence: "His _____ surprised everyone.", explanation: "“Decide” là động từ; vị trí này cần danh từ “decision”." },
  { root: "SUCCEED", answer: "success", sentence: "Her _____ inspired the whole class.", explanation: "“Succeed” chuyển thành danh từ “success”." },
  { root: "HAPPY", answer: "happiness", sentence: "Music brings _____ to many people.", explanation: "Tính từ “happy” chuyển thành danh từ “happiness”." },
  { root: "EDUCATE", answer: "education", sentence: "A good _____ can open new opportunities.", explanation: "“Educate” chuyển thành danh từ “education”." },
  { root: "CONFIDENT", answer: "confidence", sentence: "Practice helped build her _____.", explanation: "Tính từ “confident” chuyển thành danh từ “confidence”." },
  { root: "CREATE", answer: "creation", sentence: "The _____ of the new website took two weeks.", explanation: "Động từ “create” chuyển thành danh từ “creation”." },
  { root: "POSSIBLE", answer: "possibility", sentence: "There is a _____ that the train will be late.", explanation: "Tính từ “possible” chuyển thành danh từ “possibility”." },
  { root: "DEVELOP", answer: "development", sentence: "The _____ of the project is going well.", explanation: "“Develop” chuyển thành danh từ “development”." },
  { root: "IMPROVE", answer: "improvement", sentence: "We noticed a big _____ in his writing.", explanation: "“Improve” chuyển thành danh từ “improvement”." },
  { root: "ARRANGE", answer: "arrangement", sentence: "They made an _____ to meet after class.", explanation: "“Arrange” chuyển thành danh từ “arrangement”." },
];

const correctionVerbs = [
  { base: "go", wrong: "went", correct: "gone", object: "to London" },
  { base: "see", wrong: "saw", correct: "seen", object: "that film" },
  { base: "eat", wrong: "ate", correct: "eaten", object: "dinner" },
  { base: "write", wrong: "wrote", correct: "written", object: "three emails" },
  { base: "take", wrong: "took", correct: "taken", object: "the wrong train" },
  { base: "do", wrong: "did", correct: "done", object: "their homework" },
  { base: "speak", wrong: "spoke", correct: "spoken", object: "to the teacher" },
  { base: "break", wrong: "broke", correct: "broken", object: "the old chair" },
  { base: "choose", wrong: "chose", correct: "chosen", object: "a blue dress" },
  { base: "forget", wrong: "forgot", correct: "forgotten", object: "my name" },
];

const transformationVerbs = [
  { gerund: "studying", object: "English" },
  { gerund: "working", object: "at this school" },
  { gerund: "learning", object: "Spanish" },
  { gerund: "living", object: "in this town" },
  { gerund: "waiting", object: "for the bus" },
  { gerund: "practicing", object: "the piano" },
  { gerund: "teaching", object: "here" },
  { gerund: "training", object: "for a race" },
  { gerund: "collecting", object: "stamps" },
  { gerund: "playing", object: "the guitar" },
];

function questionId(typeId: string, lessonNumber: number, index: number) {
  return `${typeId}-${lessonNumber}-${index + 1}`;
}

function generatedQuestion(
  typeId: string,
  lessonNumber: number,
  index: number,
): ExerciseQuestion {
  const id = questionId(typeId, lessonNumber, index);
  const subject = subjects[index % subjects.length];
  const context = lessonNumber === 1 ? "since 2020" : "for the past six years";

  switch (typeId) {
    case "multiple-choice": {
      const verb = mcVerbs[Math.floor(index / subjects.length) % mcVerbs.length];
      return {
        id,
        kind: "multiple-choice",
        prompt: `${subject.text} _____ ${verb.object} ${context}.`,
        options: [
          subject.auxiliary === "has" ? verb.thirdPerson : verb.base,
          verb.past,
          `${subject.auxiliary} ${verb.participle}`,
          `${subject.be} ${verb.ing}`,
        ],
        answerIndex: 2,
        explanation: "Dùng hiện tại hoàn thành với khoảng thời gian bắt đầu trong quá khứ và còn tiếp diễn.",
      };
    }
    case "fill-in-the-blank": {
      const verb = blankVerbs[Math.floor(index / 5) % blankVerbs.length];
      const itemSubject = subjects[index % 5];
      return {
        id,
        kind: "fill-blank",
        before: `${itemSubject.text} ${itemSubject.auxiliary} `,
        after: ` ${verb.object} ${context}.`,
        answer: verb.participle,
        explanation: `Quá khứ phân từ của “${verb.base}” là “${verb.participle}”.`,
      };
    }
    case "sentence-ordering": {
      const verb = orderingVerbs[Math.floor(index / 5) % orderingVerbs.length];
      const itemSubject = subjects[index % 5];
      const adverbs = lessonNumber === 1
        ? ["never", "already", "just", "recently", "once"]
        : ["often", "always", "not", "ever", "finally"];
      const answer = `${itemSubject.text} ${itemSubject.auxiliary} ${adverbs[Math.floor(index / 10) % adverbs.length]} ${verb.participle} ${verb.object}.`;
      const tokens = answer.replace(/[?.!]$/, "").split(" ");
      const pivot = (index % (tokens.length - 1)) + 1;
      return {
        id,
        kind: "sentence-ordering",
        words: [...tokens.slice(pivot), ...tokens.slice(0, pivot)],
        answer,
        explanation: "Sắp xếp theo trật tự chủ ngữ + have/has + trạng từ + quá khứ phân từ + phần còn lại.",
      };
    }
    case "word-formation": {
      const family = wordFamilies[index % wordFamilies.length];
      const prefixes = lessonNumber === 1
        ? ["", "During the meeting, ", "In our English class, ", "According to the report, ", "At yesterday's event, "]
        : ["", "This morning, ", "For many students, ", "At the conference, ", "In the final review, "];
      const prefix = prefixes[Math.floor(index / wordFamilies.length) % prefixes.length];
      const sentence = `${prefix}${family.sentence}`;
      const [before, after] = sentence.split("_____");
      return {
        id,
        kind: "word-formation",
        before,
        root: family.root,
        after,
        answer: family.answer,
        explanation: family.explanation,
      };
    }
    case "error-correction": {
      const verb = correctionVerbs[Math.floor(index / 5) % correctionVerbs.length];
      const itemSubject = subjects[index % 5];
      const adverb = lessonNumber === 1 ? "" : " already";
      const wrongPhrase = `${itemSubject.auxiliary}${adverb} ${verb.wrong}`;
      const correctPhrase = `${itemSubject.auxiliary}${adverb} ${verb.correct}`;
      const sentence = `${itemSubject.text} ${wrongPhrase} ${verb.object}.`;
      const answer = `${itemSubject.text} ${correctPhrase} ${verb.object}.`;
      return {
        id,
        kind: "error-correction",
        sentence,
        mistake: wrongPhrase,
        correction: correctPhrase,
        answer,
        explanation: `Sau “${itemSubject.auxiliary}” cần quá khứ phân từ “${verb.correct}”, không dùng “${verb.wrong}”.`,
      };
    }
    case "sentence-transformation": {
      const verb = transformationVerbs[Math.floor(index / 5) % transformationVerbs.length];
      const itemSubject = subjects[index % 5];
      const duration = lessonNumber === 1
        ? ["three years", "five years", "six months", "two years", "a decade"][index % 5]
        : ["four years", "eight months", "seven years", "a year", "twelve years"][index % 5];
      const keyword = lessonNumber === 1 ? "FOR" : "SINCE";
      const before = `${itemSubject.text} ${itemSubject.auxiliary} been `;
      const after = ` ${verb.object} ${keyword === "FOR" ? "for" : "since"} ${keyword === "FOR" ? duration : "2020"}.`;
      const original = `${itemSubject.text} started ${verb.gerund} ${verb.object} ${keyword === "FOR" ? `${duration} ago` : "in 2020"}.`;
      const answer = `${before}${verb.gerund}${after}`;
      return {
        id,
        kind: "sentence-transformation",
        original,
        keyword,
        before,
        after,
        answer,
        explanation: `Dùng hiện tại hoàn thành tiếp diễn với “${keyword.toLowerCase()}” để diễn tả hành động bắt đầu trong quá khứ và còn tiếp diễn.`,
      };
    }
    default:
      throw new Error(`Unknown practice type: ${typeId}`);
  }
}

export const PRACTICE_TYPES: PracticeType[] = PRACTICE_TYPE_SEEDS.map((seed) => ({
  id: seed.id,
  title: seed.title,
  description: seed.description,
  example: seed.example,
  lessons: Array.from({ length: LESSON_COUNT }, (_, lessonIndex) => {
    const lessonNumber = lessonIndex + 1;
    const initialQuestions = lessonNumber === 1 ? seed.questions : [];
    const generatedQuestions = Array.from(
      { length: QUESTIONS_PER_LESSON - initialQuestions.length },
      (_, index) => generatedQuestion(seed.id, lessonNumber, index + initialQuestions.length),
    );
    const questions = [
      ...initialQuestions.map((question, index) => ({
        ...question,
        id: questionId(seed.id, lessonNumber, index),
      })),
      ...generatedQuestions,
    ];

    return {
      id: `lesson-${lessonNumber}`,
      title: `Bài ${lessonNumber}`,
      questions,
    };
  }),
}));

export function getPracticeType(typeId: string): PracticeType | undefined {
  return PRACTICE_TYPES.find(({ id }) => id === typeId);
}

export function getPracticeLesson(typeId: string, lessonId: string) {
  const exercise = getPracticeType(typeId);
  if (!exercise) return undefined;

  const lessonIndex = exercise.lessons.findIndex(({ id }) => id === lessonId);
  if (lessonIndex < 0) return undefined;

  return {
    exercise,
    lesson: exercise.lessons[lessonIndex],
    lessonIndex,
    previousLesson: exercise.lessons[lessonIndex - 1],
    nextLesson: exercise.lessons[lessonIndex + 1],
  };
}
