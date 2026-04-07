import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import PageTransition from "@/components/page-transition";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AKAAL",
  description: "AKAAL website",
  icons: {
    icon: "/images/icon-white-rgb.png",
    shortcut: "/images/icon-white-rgb.png",
    apple: "/images/icon-white-rgb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <PageTransition />
      </body>
    </html>
  );
}
