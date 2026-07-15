import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { SITE_CONFIG, METADATA_DEFAULTS } from "@/lib/constants";
import { Providers } from "./providers";
import { Navbar, Footer, PageWrapper } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: METADATA_DEFAULTS.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: METADATA_DEFAULTS.description,
  keywords: [...METADATA_DEFAULTS.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: METADATA_DEFAULTS.title,
    description: METADATA_DEFAULTS.description,
  },
  twitter: {
    card: "summary_large_image",
    site: METADATA_DEFAULTS.twitter.site,
    title: METADATA_DEFAULTS.title,
    description: METADATA_DEFAULTS.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold focus:text-background focus:rounded-md focus:font-accent focus:text-sm"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <PageWrapper>
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </PageWrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
