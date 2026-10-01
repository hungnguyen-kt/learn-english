import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Vị trí hiện tại" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink/60">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {it.href ? <Link href={it.href} className="hover:text-ink hover:underline">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
          {i < items.length - 1 && <ChevronRight size={14} aria-hidden />}
        </span>
      ))}
    </nav>
  );
}
