"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Lock, Menu, X } from "lucide-react";
import { LEVELS } from "@/lib/data";
import { NAV } from "@/components/Sidebar";

export default function MobileBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const activeLevel = pathname.startsWith("/level/")
    ? Number(pathname.split("/")[2])
    : null;

  const activeNavigationIndex = NAV.findIndex(({ href }) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`),
  );

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/95 backdrop-blur lg:hidden">
        {/* Top bar: Brand + Drawer Toggle */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sun shadow-sm">
              <GraduationCap size={18} />
            </span>
            <span className="font-display text-base font-bold text-ink sm:text-lg">
              English · <span className="text-xs font-normal text-ink/70 sm:text-sm">Học từ A đến Z</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsDrawerOpen((open) => !open)}
            aria-label={isDrawerOpen ? "Đóng menu" : "Mở menu chính"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-mist bg-white text-ink shadow-sm transition-colors hover:bg-mist/50"
          >
            {isDrawerOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {/* Phần NAV: Trang chủ, Từ điển, Ôn tập, Luyện tập, Dịch văn bản */}
        <nav
          aria-label="Menu chính"
          className="flex items-center gap-1.5 overflow-x-auto border-t border-mist/60 px-4 py-2"
        >
          {NAV.map(({ href, label, icon: Icon }, index) => {
            const active = activeNavigationIndex === index;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                  active
                    ? "bg-ink text-white shadow-sm"
                    : "border border-mist/70 bg-white/80 text-ink/75 hover:bg-white hover:text-ink"
                }`}
              >
                <Icon size={14} aria-hidden />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Phần LEVELS: 7 cấp độ (Level 0 .. Level 6) */}
        <nav
          aria-label="Cấp độ"
          className="flex items-center gap-1.5 overflow-x-auto border-t border-mist/40 bg-white/50 px-4 py-2"
        >
          <span className="mr-1 shrink-0 text-[11px] font-bold uppercase tracking-wider text-ink/50">
            Cấp độ:
          </span>
          {LEVELS.map((lv) => {
            const active = activeLevel === lv.id;
            const open = lv.status === "open";
            return (
              <Link
                key={lv.id}
                href={`/level/${lv.id}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "border-sea bg-sea font-semibold text-white shadow-sm"
                    : open
                    ? "border-mist bg-white text-ink hover:border-sea hover:text-sea"
                    : "border-mist/70 bg-white/70 text-ink/55 hover:bg-white"
                }`}
              >
                <span>Level {lv.id}</span>
                {!open && <Lock size={10} className="opacity-60" aria-label="Sắp ra mắt" />}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Slide-out Sidebar Drawer for Tablet / Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            aria-label="Menu điều hướng chi tiết"
            className="relative flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto bg-ink px-5 py-6 text-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-2.5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun text-ink">
                  <GraduationCap size={20} strokeWidth={2.2} />
                </span>
                <span className="font-display text-base font-bold leading-tight">
                  English <br />
                  <span className="text-xs font-normal text-white/70">
                    Học tiếng Anh từ A đến Z
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Đóng menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* NAV section inside drawer */}
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              Menu chính
            </p>
            <nav className="mb-6 flex flex-col gap-1">
              {NAV.map(({ href, label, icon: Icon }, index) => {
                const active = activeNavigationIndex === index;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsDrawerOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-lime-300 font-semibold text-ink shadow-sm"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* LEVELS section inside drawer */}
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              7 cấp độ học
            </p>
            <ol className="relative ml-[18px] border-l-2 border-white/15 pb-4">
              {LEVELS.map((lv) => {
                const open = lv.status === "open";
                const active = activeLevel === lv.id;
                return (
                  <li key={lv.id} className="relative pl-5">
                    <span
                      aria-hidden
                      className={`absolute -left-[7px] top-3.5 h-3 w-3 rounded-full border-2 border-ink ${
                        active ? "bg-lime-300" : open ? "bg-sea" : "bg-white/25"
                      }`}
                    />
                    <Link
                      href={`/level/${lv.id}`}
                      onClick={() => setIsDrawerOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`my-0.5 block rounded-lg px-2.5 py-1.5 transition-colors ${
                        active
                          ? "bg-lime-300 text-ink"
                          : open
                          ? "text-white hover:bg-white/8"
                          : "text-white/50 hover:bg-white/5"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between text-xs font-medium ${
                          active ? "text-ink/80 font-bold" : "text-white/60"
                        }`}
                      >
                        <span>Level {lv.id} · {lv.code}</span>
                        {!open && <Lock size={11} aria-label="Sắp ra mắt" />}
                      </div>
                      <span className="block text-xs font-semibold leading-snug">
                        {lv.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      )}
    </>
  );
}
