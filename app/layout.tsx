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
            <nav className="flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="relative px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-in-out"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
              </Link>
              <Link
                href="/ask-question"
                className="relative px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-in-out"
              >
                Ask Question
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
              </Link>
              <Link
                href="/practice"
                className="relative px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-in-out"
              >
                Practice
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
              </Link>
              <Link
                href="/flashcards"
                className="relative px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all duration-300 ease-in-out"
              >
                Flashcards
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0" />
              </Link>
            </nav>
        </div>
      </header>
      <main className="px-4 py-8">
        {children}
      </main>
    </body>
    </html >
  );
}