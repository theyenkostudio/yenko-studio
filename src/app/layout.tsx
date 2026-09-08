import { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { switzer } from "./fonts/switzer";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import PageTransition from "./components/page-transition";
import SmoothScroll from "./components/smooth-scroll";
import SankofaDial from "./components/sankofa-dial";
import ProgressiveBlur from "./components/progressive-blur";
import { LINKEDIN_URL, INSTAGRAM_URL, EMAIL } from "./data/links";

const TITLE = "Yenko Studio — Digital product studio in Accra & Lagos";

const TAGLINE =
  "Digital product studio in Accra and Lagos. We design and build websites, web apps and custom software for founders and growth-stage teams across Africa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yenko.studio"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: TITLE,
    // Child pages set just their own name; this appends the studio.
    template: "%s — Yenko Studio",
  },
  description: TAGLINE,
  keywords: [
    "digital product studio",
    "web development Accra",
    "software studio Ghana",
    "product design Lagos",
    "web design Nigeria",
    "brand systems",
    "Next.js development",
    "Yenko Studio",
  ],

  openGraph: {
    title: TITLE,
    description: TAGLINE,
    type: "website",
    locale: "en_US",
    images: [

      {
        url: "/yenko_og.webp",
        width: 1200,
        height: 630,
        alt: "Yenko Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: TAGLINE,
    images: ["/yenko_og.webp"],
    creator: "@theyenkostudio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yenko Studio",
  url: "https://yenko.studio",
  logo: "https://yenko.studio/logo.png",
  description: TAGLINE,
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Accra",
    addressRegion: "Greater Accra Region",
    addressCountry: "GH",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+233-59-771-2740",
      contactType: "customer support",
    },
    {
      "@type": "ContactPoint",
      telephone: "+234-70-318-42494",
      contactType: "customer support",
    },
    {
      "@type": "ContactPoint",
      telephone: "+234 816 741 0887",
      contactType: "customer support",
    },
  ],
  email: `mailto:${EMAIL}`,
  sameAs: [
    "https://x.com/theyenkostudio",
    LINKEDIN_URL,
    INSTAGRAM_URL,
  ],
  areaServed: [
    {
      "@type": "Country",
      name: "Ghana",
    },
    {
      "@type": "Country",
      name: "Nigeria",
    },
    {
      "@type": "Place",
      name: "West Africa",
    },
    {
      "@type": "Place",
      name: "Working Globally",
    },
  ],
  hasOffer: [
    {
      "@type": "Offer",
      name: "Build",
      description: "A fixed-scope project, shipped to production and priced against the outcome.",
    },
    {
      "@type": "Offer",
      name: "Run",
      description: "A standing monthly retainer — Yenko as the ongoing technical and creative function.",
    },
    {
      "@type": "Offer",
      name: "Back",
      description: "Cash plus equity, for a small number of early-stage teams a year.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={switzer.variable}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* for MICROSOFT CLARITY */}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
               (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "s7so4lafin");
            `,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <ProgressiveBlur />
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
          <SankofaDial />
        </SmoothScroll>
      </body>
    </html>
  );
}
