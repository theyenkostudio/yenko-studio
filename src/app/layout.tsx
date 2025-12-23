import { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yenko.studio"),
  alternates: {
    canonical: "/",
  },
  title: "Yenko Studio | Engineered to Last, Designed to Perfection",
  description:
    "We build robust, scalable software that solves real business problems—combining technical excellence with user-focused design to deliver products that drive growth and stand the test of time.",
  keywords: "web development, mobile apps, custom software, SaaS platforms, API development, digital agency, software engineering, Yenko Studio",

  openGraph: {
    title: "Yenko Studio | Engineered to Last, Designed to Perfection",
    description:
      "We build robust, scalable software that solves real business problems—combining technical excellence with user-focused design to deliver products that drive growth and stand the test of time.",
    type: "website",
    locale: "en_US",
    images: [

      {
        url: "/yenko_og.webp",
        width: 1200,
        height: 630,
        alt: "Yenko Studio - Engineered to Last, Designed to Perfection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yenko Studio | Engineered to Last, Designed to Perfection",
    description:
      "We build robust, scalable software that solves real business problems—combining technical excellence with user-focused design to deliver products that drive growth and stand the test of time.",
    images: ["/yenko-og.jpg"],
    creator: "@theyenkostudio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yenko Studio",
  url: "https://yenko.studio",
  logo: "https://yenko.studio/logo.png",
  description:
    "We build robust, scalable software that solves real business problems—combining technical excellence with user-focused design to deliver products that drive growth and stand the test of time.",
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
  email: "mailto:hello@yenko.studio",
  sameAs: [
    "https://x.com/theyenkostudio",
    "https://www.linkedin.com/company/yenkostudio/",
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
      "t@type": "Place",
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
      itemOffered: {
        "@type": "Service",
        name: "E-commerce Websites",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom App Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Web Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "App Development",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolageGrotesque.variable}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/bankgothic-md-bt"
          rel="stylesheet"
        />
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
      <body className="font-bricolage-grotesque">{children}</body>
    </html>
  );
}
