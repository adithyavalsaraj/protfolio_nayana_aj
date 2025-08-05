import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { ClientLayoutWrapper } from "./components/client-layout-wrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Nayana AJ - Astrophysicist & Researcher",
    template: "%s | Dr. Nayana AJ",
  },
  description:
    "Professional portfolio of Dr. Nayana AJ, astrophysicist specializing in explosive transients, supernovae, gamma-ray bursts, and multi-wavelength astronomy. Postdoctoral Scholar at UC Berkeley.",
  keywords: [
    "astrophysics",
    "astrophysicist",
    "supernovae",
    "gamma-ray bursts",
    "explosive transients",
    "multi-wavelength astronomy",
    "stellar evolution",
    "fast blue optical transients",
    "gravitational waves",
    "radio astronomy",
    "UC Berkeley",
    "Nayana AJ",
    "research",
    "publications",
    "astronomy",
  ],
  authors: [
    { name: "Dr. Nayana AJ", url: "https://orcid.org/0000-0002-8070-5400" },
  ],
  creator: "Dr. Nayana AJ",
  publisher: "Dr. Nayana AJ",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-actual-domain.com",
    title: "Dr. Nayana AJ - Astrophysicist & Researcher",
    description:
      "Professional portfolio showcasing cutting-edge research in explosive transients, supernovae, and multi-wavelength astrophysics by Dr. Nayana AJ, Postdoctoral Scholar at UC Berkeley.",
    siteName: "Dr. Nayana AJ Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Nayana AJ - Astrophysicist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nayana AJ - Astrophysicist & Researcher",
    description:
      "Professional portfolio showcasing cutting-edge research in explosive transients and stellar astrophysics.",
    images: ["/og-image.jpg"],
    creator: "@nayana_aj",
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  alternates: {
    canonical: "https://your-actual-domain.com",
  },
  category: "science",
  classification: "Academic Portfolio",
  other: {
    "academic-field": "Astrophysics",
    "research-focus":
      "Explosive Transients, Supernovae, Multi-wavelength Astronomy",
    institution: "University of California, Berkeley",
    orcid: "0000-0002-8070-5400",
  },
  generator: "v0.dev",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Nayana AJ",
  jobTitle: "Postdoctoral Scholar",
  affiliation: {
    "@type": "Organization",
    name: "University of California, Berkeley",
    url: "https://www.berkeley.edu",
  },
  url: "https://nayana-aj-portfolio.netlify.app",
  sameAs: [
    "https://orcid.org/0000-0002-8070-5400",
    "https://scholar.google.com/citations?user=63zBs60AAAAJ&hl=en",
    "https://www.linkedin.com/in/nayana-a-j-29b726138",
    "https://ui.adsabs.harvard.edu/search/p_=0&q=docs(library%2FucoKF0gWQImVPLgZJ5pdlw)",
  ],
  knowsAbout: [
    "Astrophysics",
    "Supernovae",
    "Gamma-ray Bursts",
    "Explosive Transients",
    "Multi-wavelength Astronomy",
    "Radio Astronomy",
    "Stellar Evolution",
  ],
  alumniOf: [
    {
      "@type": "Organization",
      name: "NCRA-TIFR",
      url: "http://www.ncra.tifr.res.in/",
    },
  ],
  email: "nayana@berkeley.edu",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cambridge",
    addressRegion: "MA",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/documents/Nayana_AJ_CV.pdf" as="document" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//ui.adsabs.harvard.edu" />
        <link rel="dns-prefetch" href="//scholar.google.com" />
        <link rel="dns-prefetch" href="//orcid.org" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Additional meta tags for performance */}
        <meta name="theme-color" content="#9333ea" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />

        {/* Academic-specific meta tags */}
        <meta name="citation_author" content="Nayana, A. J." />
        <meta
          name="citation_author_institution"
          content="University of California, Berkeley"
        />
        <meta name="DC.creator" content="Nayana, A. J." />
        <meta
          name="DC.subject"
          content="Astrophysics; Supernovae; Gamma-ray Bursts; Explosive Transients"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
