import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GuitarEdu - Guitar Learning Game",
  description: "Interactive guitar education game for learning notes, music theory, and fretboard mastery. Smart-board friendly.",
  keywords: ["guitar", "music education", "learning game", "fretboard", "music theory", "guitar lessons", "interactive"],
  authors: [{ name: "GuitarEdu Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GuitarEdu - Guitar Learning Game",
    description: "Interactive guitar education game for learning notes and music theory",
    url: "https://guitaredu.app",
    siteName: "GuitarEdu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuitarEdu - Guitar Learning Game",
    description: "Interactive guitar education game for learning notes and music theory",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
