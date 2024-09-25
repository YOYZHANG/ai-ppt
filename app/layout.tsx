import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { PostHogProvider } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "AI RevealJS",
  description: "Generate RevealJS PPT by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body className={inter.className}>
          {children}
        </body>
      </PostHogProvider>
    </html>
  );
}
