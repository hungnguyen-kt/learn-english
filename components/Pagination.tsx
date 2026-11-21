import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
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
