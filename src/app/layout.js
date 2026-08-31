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
    default: "Ansh Rai — arweb | Websites Built for Small Businesses",
    template: "%s | arweb",
  },
  description:
    "Custom websites and digital systems for small businesses across Canada. Get an instant quote — most projects start at $299 setup + $15/month. Toronto-based developer, Canada-wide.",
  openGraph: {
    siteName: "arweb — anshrai.com",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://anshrai.com",
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
      jobTitle: "Web Developer & Founder",
      worksFor: { "@id": "https://anshrai.com/#organization" },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://anshrai.com/#organization",
      name: "arweb",
      url: "https://anshrai.com",
      email: "ansh@anshrai.com",
      description:
        "Custom websites and digital systems for small businesses across Canada. Starting at $299 setup + $15/month.",
      founder: { "@id": "https://anshrai.com/#person" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      areaServed: "Canada",
      priceRange: "$$",
      serviceType: [
        "Web Design",
        "Web Development",
        "Digital Systems",
        "SEO",
        "Website Maintenance",
      ],
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
