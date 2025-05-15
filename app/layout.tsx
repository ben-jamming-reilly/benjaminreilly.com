import "css/tailwind.css";
import "pliny/search/algolia.css";

import { Courier_Prime, Jost } from "next/font/google";
import { Analytics, AnalyticsConfig } from "pliny/analytics";
import { SearchProvider, SearchConfig } from "pliny/search";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import Footer from "@/components/Footer";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";
import { Metadata } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const courier_prime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

const jost = Jost({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
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
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${courier_prime.variable} ${jost.variable} font-serif scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="icon" type="image/png" href="/static/images/logo.png" />
      <link rel="apple-touch-icon" href="/static/images/logo.png" />
      <link rel="shortcut icon" href="/static/images/logo.png" />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white font-serif text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics
            analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
          />
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
              <SearchProvider
                searchConfig={siteMetadata.search as SearchConfig}
              >
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
              <VercelAnalytics />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
