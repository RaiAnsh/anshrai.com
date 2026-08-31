import "./globals.css";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://anshrai.com"),
  title: {
    default: "Web Designer Toronto | Custom Websites for Small Businesses — arweb",
    template: "%s | arweb — Toronto Web Designer",
  },
  description:
    "Toronto web designer and developer building custom websites for small businesses. Get a professional website that turns visitors into customers. Quote in minutes. Serving Toronto, the GTA, and all of Canada.",
  keywords: [
    "web designer toronto",
    "web developer toronto",
    "website design toronto",
    "toronto website designer",
    "small business website toronto",
    "custom website toronto",
    "web design GTA",
    "affordable website toronto",
    "professional website toronto",
    "toronto web design agency",
    "website developer near me",
    "local web designer toronto",
  ],
  openGraph: {
    siteName: "arweb — Toronto Web Designer",
    locale: "en_CA",
    type: "website",
    title: "Web Designer Toronto | arweb — Websites for Small Businesses",
    description:
      "Toronto-based web designer building custom websites that turn visitors into customers. Fast turnaround. Direct developer contact. Starting at $299.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Designer Toronto | arweb",
    description:
      "Custom websites for Toronto small businesses. Quote in minutes.",
  },
  alternates: {
    canonical: "https://anshrai.com",
  },
  other: {
    "google-site-verification": "R3wg1oa6FFzf-4UIi1YPTLB9wj983PMVggXiSxL0SRs",
    "geo.region": "CA-ON",
    "geo.placename": "Toronto, Ontario",
    "geo.position": "43.6532;-79.3832",
    ICBM: "43.6532, -79.3832",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://anshrai.com/#person",
      name: "Ansh Rai",
      url: "https://anshrai.com",
      sameAs: [
        "https://www.linkedin.com/in/raiansh/",
        "https://github.com/RaiAnsh",
      ],
      jobTitle: "Web Designer & Developer",
      worksFor: { "@id": "https://anshrai.com/#organization" },
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Search Engine Optimization",
        "Next.js",
        "React",
        "Small Business Websites",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://anshrai.com/#organization",
      name: "arweb",
      url: "https://anshrai.com",
      email: "ansh@anshrai.com",
      description:
        "Toronto web designer and developer building custom websites and digital systems for small businesses across Canada. You work directly with the developer from first call to launch.",
      founder: { "@id": "https://anshrai.com/#person" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
        postalCode: "M5V",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.6532,
        longitude: -79.3832,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Toronto",
        },
        {
          "@type": "State",
          name: "Ontario",
        },
        {
          "@type": "Country",
          name: "Canada",
        },
      ],
      priceRange: "$$",
      serviceType: [
        "Web Design",
        "Web Development",
        "Custom Website Design",
        "Small Business Websites",
        "SEO",
        "Website Maintenance",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Design Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starter Website",
              description: "Professional website for small businesses",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Growth Website",
              description: "Lead generation website with full SEO setup",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Web App",
              description: "Custom web application with backend",
            },
          },
        ],
      },
    },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="font-sans">
        {/* Google Analytics — only loads when env var is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
