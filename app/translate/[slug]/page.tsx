import { notFound } from "next/navigation";
import TranslationWorkspace from "@/components/TranslationWorkspace";
import { TRANSLATION_ARTICLES } from "@/lib/translation-articles";
import { TRANSLATION_HISTORY } from "@/lib/translation-history";

export function generateStaticParams() {
  return [
    ...TRANSLATION_ARTICLES.map(({ slug }) => ({ slug })),
    ...TRANSLATION_HISTORY.map(({ slug }) => ({ slug })),
  ];
}

export default function TranslationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = TRANSLATION_ARTICLES.find(({ slug }) => slug === params.slug);
  if (article) return <TranslationWorkspace key={article.slug} article={article} />;

  const historyEntry = TRANSLATION_HISTORY.find(({ slug }) => slug === params.slug);
  if (!historyEntry) notFound();

  return (
    <TranslationWorkspace
      key={historyEntry.slug}
      isCompleted
      article={{
        slug: historyEntry.slug,
        title: historyEntry.title,
        description: historyEntry.subtitle,
        topic: "Kỹ năng sống",
        level: "Trung cấp · B1",
        languages: ["en", "ja"],
        sourceLanguage: historyEntry.sourceLanguage === "Tiếng Anh" ? "en" : "ja",
        artwork: "from-blue-100 to-indigo-100",
        icon: "📚",
        minutes: 8,
        source: [...historyEntry.source],
        translation: [...historyEntry.translation],
        vocabulary: [],
        grammar: [],
      }}
    />
  );
}
