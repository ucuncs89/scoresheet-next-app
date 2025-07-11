import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scoresheet",
  description: "Scoresheet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full flex justify-center py-4 bg-gray-100 dark:bg-zinc-800 mb-4">
          <a href="/" className="text-indigo-600 hover:underline font-semibold">
            Scoresheet
          </a>
        </nav>
        <main>{children}</main>
        <footer className="w-full text-center text-xs text-gray-400 py-4 bg-transparent mt-auto border-t border-gray-200 dark:border-zinc-800">
          &copy; ucun.dev
        </footer>
      </body>
    </html>
  );
}
