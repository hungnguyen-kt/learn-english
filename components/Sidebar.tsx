"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, RotateCcw, Dumbbell, Lock, GraduationCap } from "lucide-react";
import { LEVELS } from "@/lib/data";

const NAV = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/review", label: "Ôn tập", icon: RotateCcw },
  { href: "/practice", label: "Luyện tập", icon: Dumbbell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const activeLevel = pathname.startsWith("/level/") ? Number(pathname.split("/")[2]) : null;

  return (
    <aside
      aria-label="Điều hướng chính"
      className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-y-auto bg-ink px-5 py-6 text-white lg:flex"
    >
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sun text-ink">
          <GraduationCap size={22} strokeWidth={2.2} />
        </span>
        <span className="font-display text-xl font-bold leading-none">
          English <br />
          <span className="text-white/70 text-base font-medium">
            Học tiếng Anh từ A đến Z
          </span>
        </span>
      </Link>

      <nav className="mb-8 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={18} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mb-3 px-3 text-sm font-semibold text-white/60">7 cấp độ</p>
      <ol className="relative ml-[22px] border-l-2 border-white/15 pb-2">
        {LEVELS.map((lv) => {
          const open = lv.status === "open";
          const active = activeLevel === lv.id;
          return (
            <li key={lv.id} className="relative pl-6">
              <span
                aria-hidden
                className={`absolute -left-[9px] top-4 grid h-4 w-4 place-items-center rounded-full border-2 border-ink ${
                  active ? "bg-sun" : open ? "bg-sea" : "bg-white/25"
                }`}
              />
              <Link
                href={`/level/${lv.id}`}
                aria-current={active ? "page" : undefined}
                className={`my-0.5 block rounded-lg px-3 py-2 transition-colors ${
                  active ? "bg-white/12" : "hover:bg-white/8"
                } ${open ? "text-white" : "text-white/55"}`}
              >
                <span className="flex items-center justify-between text-xs font-medium text-white/60">
                  Level {lv.id} · {lv.code}
                  {!open && <Lock size={12} aria-label="Sắp ra mắt" />}
                </span>
                <span className="block text-sm font-semibold leading-snug">{lv.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
