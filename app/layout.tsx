import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle, Book, FileText } from "lucide-react";

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
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg hidden md:block">
            <div className="p-6">
              <div className="text-2xl font-bold tracking-tight mb-8">
                <Link href="/" className="hover:text-gray-300 transition">
                  StudySense
                </Link>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  href="/ask-question"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                  Ask Question
                </Link>
                <Link
                  href="/practice"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                >
                  <Book className="w-5 h-5" />
                  Practice
                </Link>
                <Link
                  href="/flashcards"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Flashcards
                </Link>
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden">
            <input type="checkbox" id="sidebar-toggle" className="hidden" />
            <label
              htmlFor="sidebar-toggle"
              className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg cursor-pointer md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 md:hidden">
              <div className="p-6">
                <div className="text-2xl font-bold tracking-tight mb-8">
                  <Link href="/" className="hover:text-gray-300 transition">
                    StudySense
                  </Link>
                </div>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    Home
                  </Link>
                  <Link
                    href="/ask-question"
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5" />
                    Ask Question
                  </Link>
                  <Link
                    href="/practice"
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  >
                    <Book className="w-5 h-5" />
                    Practice
                  </Link>
                  <Link
                    href="/flashcards"
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Flashcards
                  </Link>
                </nav>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className="flex-1 md:ml-64 max-w-6xl mx-auto px-4 py-8">
            {children}
            <Toaster />
          </main>
        </div>
      </body>
    </html>
  );
}