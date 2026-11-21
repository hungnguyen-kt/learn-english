"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Search,
} from "lucide-react";
import { TRANSLATION_HISTORY } from "@/lib/translation-history";
import { TRANSLATION_ARTICLES } from "@/lib/translation-articles";

const RECENT_PAGE_SIZE = 3;
const ARTICLE_PAGE_SIZE = 4;

const TOPICS = ["Tất cả chủ đề", ...new Set(TRANSLATION_ARTICLES.map(({ topic }) => topic))];
const LEVELS = ["Tất cả trình độ", "Sơ cấp", "Trung cấp"];

function LanguageBadge({ language }: { language: "en" | "ja" }) {
  const isEnglish = language === "en";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
      <span aria-hidden>{isEnglish ? "🇬🇧" : "🇯🇵"}</span>
      Tiếng {isEnglish ? "Anh" : "Nhật"}
    </span>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  label,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Trang trước"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} aria-hidden />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Trang ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Trang sau"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
}

export default function TranslatePage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [query, setQuery] = useState("");
  const [recentPage, setRecentPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return TRANSLATION_ARTICLES.filter((article) => {
      const matchesTopic = topic === TOPICS[0] || article.topic === topic;
      const matchesLevel = level === LEVELS[0] || article.level === level;
      const searchableText = `${article.title} ${article.description} ${article.topic}`.toLocaleLowerCase();
      return matchesTopic && matchesLevel && searchableText.includes(normalizedQuery);
    });
  }, [level, query, topic]);

  const recentPageCount = Math.ceil(TRANSLATION_HISTORY.length / RECENT_PAGE_SIZE);
  const paginatedRecent = TRANSLATION_HISTORY.slice(
    (recentPage - 1) * RECENT_PAGE_SIZE,
    recentPage * RECENT_PAGE_SIZE,
  );
  const articlePageCount = Math.max(1, Math.ceil(filteredArticles.length / ARTICLE_PAGE_SIZE));
  const paginatedArticles = filteredArticles.slice(
    (articlePage - 1) * ARTICLE_PAGE_SIZE,
    articlePage * ARTICLE_PAGE_SIZE,
  );

  return (
    <div className="space-y-10">
      <section aria-labelledby="recent-title">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h1 id="recent-title" className="font-display text-2xl font-bold sm:text-3xl">
              Bài đã dịch gần đây
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              Danh sách những bài bạn đã hoàn thành. Tiếp tục học để xây dựng thói quen mỗi ngày.
            </p>
          </div>
          <Pagination
            currentPage={recentPage}
            totalPages={recentPageCount}
            onPageChange={setRecentPage}
            label="Phân trang bài đã dịch gần đây"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                <th scope="col" className="px-4 py-3">Tiêu đề</th>
                <th scope="col" className="px-4 py-3">Ngôn ngữ</th>
                <th scope="col" className="px-4 py-3">Thời gian</th>
                <th scope="col" className="px-4 py-3">Trạng thái</th>
                <th scope="col" className="px-3 py-3"><span className="sr-only">Mở bài dịch</span></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecent.map((item) => (
                <tr key={item.title} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/translate/${item.slug}`}
                      className="font-semibold text-sm text-ink hover:text-blue-600 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                      <span aria-hidden>{item.flag}</span>{item.language}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{item.time}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CircleCheck size={12} aria-hidden /> Đã hoàn thành
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/translate/${item.slug}`}
                      aria-label={`Mở bản dịch: ${item.title}`}
                      className="inline-flex rounded p-1 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ChevronRight size={16} aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="articles-title">
        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 id="articles-title" className="font-display text-2xl font-bold sm:text-3xl">
              Bài viết để dịch
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Chọn một bài bạn thích, chọn ngôn ngữ và bắt đầu dịch ngay.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="relative">
              <span className="sr-only">Lọc theo chủ đề</span>
              <select
                value={topic}
                onChange={(event) => {
                  setTopic(event.target.value);
                  setArticlePage(1);
                }}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {TOPICS.map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown size={15} aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </label>
            <label className="relative">
              <span className="sr-only">Lọc theo trình độ</span>
              <select
                value={level}
                onChange={(event) => {
                  setLevel(event.target.value);
                  setArticlePage(1);
                }}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                {LEVELS.map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown size={15} aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </label>
            <label className="relative">
              <span className="sr-only">Tìm kiếm bài viết</span>
              <Search size={16} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setArticlePage(1);
                }}
                placeholder="Tìm kiếm bài viết..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedArticles.map((article) => (
              <li key={article.title}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex gap-3">
                    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${article.artwork} text-3xl`} aria-hidden>
                      {article.icon}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-semibold leading-snug text-ink">
                        <Link
                          href={`/translate/${article.slug}`}
                          className="transition-colors hover:text-blue-600 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{article.description}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">{article.topic}</span>
                    <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500">{article.level}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {article.languages.map((language) => <LanguageBadge key={language} language={language} />)}
                    </div>
                    <Link
                      href={`/translate/${article.slug}`}
                      aria-label={`Bắt đầu dịch bài: ${article.title}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
            <p className="font-semibold text-ink">Không tìm thấy bài viết phù hợp</p>
            <p className="mt-1 text-sm text-slate-500">Thử đổi chủ đề, trình độ hoặc từ khóa tìm kiếm.</p>
          </div>
        )}
        <div className="mt-5 flex justify-center">
          <Pagination
            currentPage={articlePage}
            totalPages={articlePageCount}
            onPageChange={setArticlePage}
            label="Phân trang bài viết để dịch"
          />
        </div>
      </section>
    </div>
  );
}
