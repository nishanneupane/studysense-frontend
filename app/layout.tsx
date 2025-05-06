import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudySense | Smarter Way to Learn",
  description: "Level up your study game with StudySense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-lg font-bold tracking-tight">
              <Link href="/" className="hover:text-gray-300 transition">StudySense</Link>
            </div>
            <nav className="flex gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-gray-300 transition">Home</Link>
              <Link href="/ask-question" className="hover:text-gray-300 transition">Ask Question</Link>
              <Link href="/practice" className="hover:text-gray-300 transition">Practice</Link>
              <Link href="/flashcards" className="hover:text-gray-300 transition">Flashcards</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
