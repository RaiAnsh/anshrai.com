import "./globals.css";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://anshrai.com"),
  title: {
    default: "Ansh Rai — Developer & CS Student",
    template: "%s | Ansh Rai",
  },
  description:
    "Ansh Rai is a CS student at Toronto Metropolitan University targeting database developer and data analyst roles. Full-stack developer with experience in React, Next.js, PostgreSQL, and Python.",
  keywords: [
    "Ansh Rai",
    "CS student Toronto",
    "database developer",
    "data analyst",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "PostgreSQL",
    "Toronto Metropolitan University",
    "TMU",
  ],
  openGraph: {
    siteName: "Ansh Rai",
    locale: "en_CA",
    type: "website",
    title: "Ansh Rai — Developer & CS Student",
    description:
      "CS student at TMU. Full-stack developer targeting database developer and data analyst roles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Rai — Developer & CS Student",
    description:
      "CS student at TMU. Full-stack developer targeting database developer and data analyst roles.",
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
  "@type": "Person",
  "@id": "https://anshrai.com/#person",
  name: "Ansh Rai",
  url: "https://anshrai.com",
  sameAs: [
    "https://www.linkedin.com/in/raiansh/",
    "https://github.com/RaiAnsh",
  ],
  jobTitle: "Software Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Toronto Metropolitan University",
  },
  knowsAbout: [
    "Database Development",
    "Data Analysis",
    "Full-Stack Development",
    "Next.js",
    "React",
    "PostgreSQL",
    "Python",
    "SQL",
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
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
