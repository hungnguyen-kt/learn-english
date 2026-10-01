import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { LEVELS } from "@/lib/data";

export default function MobileBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-mist bg-paper/95 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2 px-4 pt-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sun">
          <GraduationCap size={18} />
        </span>
        <Link href="/" className="font-display text-lg font-bold">Lộ trình tiếng Anh</Link>
      </div>
      <nav aria-label="Cấp độ" className="flex gap-2 overflow-x-auto px-4 py-3">
        {LEVELS.map((lv) => (
          <Link
            key={lv.id}
            href={`/level/${lv.id}`}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium ${
              lv.status === "open" ? "border-sea bg-sea text-white" : "border-mist bg-white text-ink/70"
            }`}
          >
            Level {lv.id}
          </Link>
        ))}
      </nav>
    </header>
  );
}
