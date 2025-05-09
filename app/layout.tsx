import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import { Home, HelpCircle, Book, FileText } from "lucide-react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Meta info
export const metadata: Metadata = {
  title: "StudySense | Smarter Way to Learn",
  description: "Level up your study game with StudySense.",
};

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 h-screen w-16 md:w-64 bg-gray-900 text-white shadow-lg">
            <div className="p-4 md:p-6">
              {/* Logo */}
              <div className="text-lg md:text-2xl font-bold tracking-tight mb-6 md:mb-8">
                <Link href="/" className="hover:text-gray-300 transition">
                  <span className="md:inline hidden">StudySense</span>
                  <span className="inline md:hidden">SS</span>
                </Link>
              </div>

              {/* Nav links */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-2 md:px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  aria-label="Home"
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden md:inline">Home</span>
                </Link>
                <Link
                  href="/ask-question"
                  className="flex items-center gap-3 px-2 md:px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  aria-label="Ask Question"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="hidden md:inline">Ask Question</span>
                </Link>
                <Link
                  href="/practice"
                  className="flex items-center gap-3 px-2 md:px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  aria-label="Practice"
                >
                  <Book className="w-5 h-5" />
                  <span className="hidden md:inline">Practice</span>
                </Link>
                <Link
                  href="/flashcards"
                  className="flex items-center gap-3 px-2 md:px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  aria-label="Flashcards"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden md:inline">Flashcards</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 ml-16 md:ml-64 p-4 md:p-8">
            {children}
          </main>
        </div>

        {/* Toasts */}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
