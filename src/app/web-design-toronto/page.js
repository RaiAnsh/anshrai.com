import Link from "next/link";

export const metadata = {
  title: "Web Designer Toronto | Custom Websites for Toronto Businesses — arweb",
  description:
    "Looking for a web designer in Toronto? arweb builds custom websites for Toronto small businesses that turn visitors into customers. Fast turnaround. You work directly with the developer. Get a quote today.",
  keywords: [
    "web designer toronto",
    "toronto web designer",
    "web design toronto",
    "website designer toronto",
    "web developer toronto",
    "toronto website design",
    "small business website toronto",
    "custom website toronto",
    "professional website toronto",
    "toronto web development",
    "affordable web design toronto",
    "local web designer toronto",
    "GTA web design",
    "toronto digital agency",
  ],
  alternates: {
    canonical: "https://anshrai.com/web-design-toronto",
  },
  openGraph: {
    title: "Web Designer Toronto | arweb — Custom Websites for Toronto Businesses",
    description:
      "Toronto-based web designer building sites that turn visitors into customers. Direct developer contact. Fast turnaround. Starting at $299.",
    url: "https://anshrai.com/web-design-toronto",
  },
};

const INDUSTRIES = [
  "Contractors & Trades",
  "Barbershops & Salons",
  "Restaurants & Food",
  "Wellness & Health",
  "Non-Profits",
  "Real Estate",
  "Retail & E-Commerce",
  "Professional Services",
];

const BENEFITS = [
  {
    icon: "🤝",
    title: "You talk to the developer",
    desc: "No account managers, no middlemen. You work directly with the person building your website, from first call to launch.",
  },
  {
    icon: "⚡",
    title: "Live in 1–2 weeks",
    desc: "Most Toronto small business websites go from kickoff to live in 1–2 weeks. No dragged-out projects.",
  },
  {
    icon: "📍",
    title: "Toronto-based, Canada-wide",
    desc: "Based in Toronto. I understand the local market and can meet in person if needed. I also work with clients across Canada remotely.",
  },
  {
    icon: "📈",
    title: "Built to rank on Google",
    desc: "Every site includes on-page SEO from day one. Local businesses in Toronto need to show up when customers search. That's built in.",
  },
  {
    icon: "💰",
    title: "Transparent pricing",
    desc: "Websites start at $299 setup + $15/month. No hidden fees, no surprise invoices. You know the price before we start.",
  },
  {
    icon: "🔒",
    title: "Ongoing support included",
    desc: "Hosting, backups, SSL, and basic updates are included monthly. Your site is looked after after launch.",
  },
];

const FAQS = [
  {
    q: "How much does a website cost in Toronto?",
    a: "A custom small business website starts at $299 setup plus $15/month for hosting and support. More complex sites (with e-commerce, booking, admin systems, etc.) start at $499 or $599. Use the quote tool to get an instant estimate.",
  },
  {
    q: "How long does it take to get a website built in Toronto?",
    a: "Most projects go from kickoff to launch in 1–2 weeks. Larger builds take 2–4 weeks. Once you submit a quote request, I'll respond within 1 business day.",
  },
  {
    q: "Do you do local SEO for Toronto businesses?",
    a: "Yes. On-page SEO is included in every project. Growth and higher plans include local SEO setup specifically aimed at ranking in Toronto and nearby areas.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Absolutely. If your current site isn't performing, I can rebuild it from the ground up or redesign it with better structure, speed, and SEO.",
  },
  {
    q: "Do you work with businesses outside Toronto?",
    a: "Yes. I'm based in Toronto but work with clients across Ontario and Canada. Everything is handled remotely.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Web Designer Toronto",
  url: "https://anshrai.com/web-design-toronto",
  description:
    "Toronto web design services for small businesses. Custom websites starting at $299.",
  provider: {
    "@type": "LocalBusiness",
    name: "arweb",
    url: "https://anshrai.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function WebDesignTorontoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32" style={{ background: "#07070e" }}>
        <div className="max-w-4xl mx-auto">

          {/* ── Hero ── */}
          <div className="mb-24">
            <p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "#2563eb" }}
            >
              Toronto, Ontario · Canada-wide
            </p>
            <h1
              className="font-heading font-bold leading-[1.04] mb-7"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Web Designer in{" "}
              <span style={{ color: "#2563eb" }}>Toronto</span>
            </h1>
            <p
              className="leading-relaxed mb-10 max-w-2xl"
              style={{ color: "#888888", fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.7 }}
            >
              I build custom websites for Toronto small businesses that turn visitors into customers.
              You work directly with the developer, not an agency middleman.
              Fast turnaround, transparent pricing, built to rank on Google.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="btn-glow px-7 py-3.5 rounded-full text-sm font-semibold"
                style={{ background: "#2563eb", color: "#ffffff" }}
              >
                Get an Instant Quote
              </Link>
              <Link
                href="/work"
                className="px-7 py-3.5 rounded-full text-sm font-semibold transition-colors"
                style={{
                  color: "#888",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                View My Work →
              </Link>
            </div>
          </div>

          {/* ── Industries ── */}
          <section className="mb-24">
            <h2
              className="font-heading font-semibold mb-3"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Toronto businesses I work with
            </h2>
            <p className="text-sm mb-8" style={{ color: "#666" }}>
              From contractors in Scarborough to salons in Etobicoke, I&apos;ve built websites for local businesses across Toronto and the GTA.
            </p>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: "rgba(37,99,235,0.07)",
                    border: "1px solid rgba(37,99,235,0.15)",
                    color: "#6b9df7",
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </section>

          {/* ── Why arweb ── */}
          <section className="mb-24">
            <h2
              className="font-heading font-semibold mb-10"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Why Toronto businesses choose arweb
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "#0e0e18",
                    border: "1px solid rgba(255,255,255,0.055)",
                  }}
                >
                  <span className="text-2xl mb-4 block">{b.icon}</span>
                  <h3 className="font-semibold mb-2" style={{ color: "#ffffff", fontSize: 15 }}>
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Proven results ── */}
          <section
            className="mb-24 p-8 rounded-2xl"
            style={{
              background: "#0e0e18",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: "#2563eb" }}>
              Real result
            </p>
            <p
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#ffffff", letterSpacing: "-0.03em" }}
            >
              65% more leads
            </p>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#888" }}>
              RL Contracting, a general contracting company, went from zero web presence to a 65% increase in monthly leads, driven entirely by organic search. No paid ads. No Google Maps listing. Just a well-built website with proper SEO.
            </p>
          </section>

          {/* ── FAQ ── */}
          <section className="mb-24">
            <h2
              className="font-heading font-semibold mb-10"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
            >
              Web design in Toronto, frequently asked
            </h2>
            <div className="flex flex-col">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="py-6 border-t last:border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <h3 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: 15 }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section
            className="p-10 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(109,40,217,0.06) 100%)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <h2
              className="font-heading font-bold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#ffffff", letterSpacing: "-0.025em" }}
            >
              Ready to get started?
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "#888" }}>
              Get an instant quote for your Toronto website. Most projects start within a week.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="btn-glow px-8 py-3.5 rounded-full text-sm font-semibold"
                style={{ background: "#2563eb", color: "#ffffff" }}
              >
                Get an Instant Quote
              </Link>
              <Link
                href="/"
                className="px-8 py-3.5 rounded-full text-sm font-semibold transition-colors"
                style={{ color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Back to Home
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
