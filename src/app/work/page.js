import Link from "next/link";
import { caseStudies } from "../../data/caseStudies";

export const metadata = {
  title: "Work — Case Studies | arweb",
  description:
    "See how arweb has helped small businesses across Canada build websites and digital systems that actually bring in customers.",
};

export default function WorkPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#2563eb" }}
          >
            Featured Work
          </p>
          <h1
            className="font-heading font-bold leading-[1.06]"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            Real businesses.
            <br />
            <span style={{ color: "#2563eb" }}>Real results.</span>
          </h1>
        </div>

        {/* Case study grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Accent bar */}
              <div style={{ height: 3, background: cs.accentColor }} />

              <div className="p-8">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: cs.accentColor }}
                >
                  {cs.industry} · {cs.location}
                </p>
                <h2
                  className="font-heading font-bold mb-3 leading-[1.1] transition-colors group-hover:text-fg"
                  style={{
                    fontSize: "clamp(20px, 2vw, 26px)",
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                  }}
                >
                  {cs.client}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#888" }}>
                  {cs.headline}
                </p>

                {/* Outcome metric */}
                {cs.outcome.metric && (
                  <div
                    className="inline-flex items-baseline gap-2 mb-6 px-4 py-2 rounded-xl"
                    style={{
                      background: `${cs.accentColor}0d`,
                      border: `1px solid ${cs.accentColor}22`,
                    }}
                  >
                    <span
                      className="font-heading font-bold"
                      style={{ fontSize: 28, letterSpacing: "-0.04em", color: cs.accentColor }}
                    >
                      {cs.outcome.metric}
                    </span>
                    <span className="text-xs" style={{ color: "#888" }}>
                      {cs.outcome.label}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#555",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  className="text-sm font-semibold transition-colors"
                  style={{ color: cs.accentColor }}
                >
                  View case study →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-20 pt-16 border-t text-center"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <h2
            className="font-heading font-bold mb-6"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            Ready to be next?
          </h2>
          <Link
            href="/quote"
            className="inline-block px-8 py-4 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Get an Instant Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
