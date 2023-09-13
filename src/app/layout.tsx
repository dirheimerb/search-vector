import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenAI Search",
  description: "A search engine for OpenAI's GPT-3 API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-white dark:bg-black text-black dark:text-white"
    >
      <body className={`font-sans ${inter}`}>{children}</body>
    </html>
  );
}
