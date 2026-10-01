import type { Metadata } from "next";
import { Bricolage_Grotesque, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileBar from "@/components/MobileBar";

const display = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});
const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lộ trình tiếng Anh – 7 cấp độ",
  description: "Học tiếng Anh từ Level 0 đến Real English với đủ 9 kỹ năng.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`}>
      <body>
        <Sidebar />
        <MobileBar />
        <div className="lg:pl-72">
          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 lg:py-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
