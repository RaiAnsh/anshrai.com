import QuoteBuilder from "../../components/QuoteBuilder";

export const metadata = {
  title: "Get an Instant Quote | arweb",
  description:
    "Answer a few questions and get an instant price estimate for your website. No commitment, no sales call.",
};

export default function QuotePage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: "#2563eb" }}
          >
            Instant Quote
          </p>
          <h1
            className="font-heading font-bold leading-[1.06]"
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            What can I build for you?
          </h1>
          <p className="mt-4 text-sm" style={{ color: "#888", maxWidth: 480, margin: "16px auto 0" }}>
            Takes about 60 seconds. Get a real estimate based on your project.
          </p>
        </div>

        <QuoteBuilder />
      </div>
    </main>
  );
}
