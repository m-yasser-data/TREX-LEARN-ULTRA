import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "T-REX LEARN ULTRA",
  description: "منصة تعليمية مجانية لطلاب نظم المعلومات الإدارية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-amber-50/30 text-gray-900 antialiased">
        <header className="border-b border-amber-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
