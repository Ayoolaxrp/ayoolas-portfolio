import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/chrome/site-header";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SkipLink } from "@/components/chrome/skip-link";
import { Atmosphere } from "@/components/anim/atmosphere";
import { CustomCursor } from "@/components/anim/custom-cursor";
import { Preloader } from "@/components/anim/preloader";
import { SmoothScroll } from "@/components/anim/smooth-scroll";
import { ScrollProgress } from "@/components/anim/scroll-progress";

import {
  DEFAULT_METADATA,
  ROLE,
  SITE_NAME_LONG,
  SITE_URL,
} from "@/config/site.config";

/* --------------------------------------------------------------------------
 * Fonts (BRAND §2.1, TOKENS §2.1): Inter + JetBrains Mono via next/font.
 * Newsreader is the editorial serif used for narrative accents (V5 design
 * direction: documentary pacing, serif for story, sans for information).
 * Self-hosted by Next.js; preloaded; no FOIT.
 * ------------------------------------------------------------------------ */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

/* --------------------------------------------------------------------------
 * Metadata (PHASE_4_CHECKLIST §15)
 * ------------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_METADATA.title,
    template: `%s · ${SITE_NAME_LONG}`,
  },
  description: DEFAULT_METADATA.description,
  applicationName: SITE_NAME_LONG,
  authors: [{ name: DEFAULT_METADATA.author }],
  generator: "Next.js",
  keywords: [
    "Awodeyi Ayoolamikun",
    "founder",
    "AI automation",
    "systems builder",
    "business automation",
    "workflow automation",
    "Next.js",
    "React",
    "TypeScript",
    "Elion",
    "lead generation",
    "intelligent systems",
  ],
  referrer: "origin-when-cross-origin",
  creator: DEFAULT_METADATA.author,
  publisher: DEFAULT_METADATA.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME_LONG,
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME_LONG} — ${ROLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

/* --------------------------------------------------------------------------
 * Root layout
 * - Skip-to-content link (UX_PRINCIPLES §5.2)
 * - Site chrome: header + main + footer
 * - Fonts applied via CSS variables on <html>
 * ------------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-canvas text-text-primary antialiased">
        <Atmosphere />
        <CustomCursor />
        <SmoothScroll />
        <ScrollProgress />
        <SkipLink />
        <Preloader />
        <div className="relative flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
