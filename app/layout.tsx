import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileBar from "@/components/MobileBar";

const body = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lộ trình tiếng Anh – 7 cấp độ",
  description: "Học tiếng Anh từ Level 0 đến Real English với đủ 9 kỹ năng.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={body.variable}>
      <body suppressHydrationWarning>
        <Sidebar />
        <MobileBar />
        <div className="lg:pl-72">
          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 lg:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
