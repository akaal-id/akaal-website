import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import Floater from "@/components/floater";
import PageTransition from "@/components/page-transition";
import SmoothScroll from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ThemeScript from "@/components/theme/theme-script";
import {
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_LOGO_APP,
  SITE_LOGO_HEIGHT,
  SITE_LOGO_WIDTH,
  SITE_NAME,
} from "@/lib/constants/brand";
import Footer from "@/app/home/footer";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://akaal.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: SITE_LOGO_APP, type: "image/png" }],
    shortcut: SITE_LOGO_APP,
    apple: SITE_LOGO_APP,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_LOGO,
        width: SITE_LOGO_WIDTH,
        height: SITE_LOGO_HEIGHT,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO],
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
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <Floater />
            <PageTransition />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
