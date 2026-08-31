import Link from "next/link";

export const metadata = {
  title: "Quote Request Received | arweb",
  description: "Your quote request has been received. We'll be in touch within 1 business day.",
};

export default function QuoteConfirmationPage({ searchParams }) {
  const ref     = searchParams?.ref     ?? null;
  const setup   = searchParams?.setup   ? Number(searchParams.setup)   : null;
  const monthly = searchParams?.monthly ? Number(searchParams.monthly) : null;
  const isCustom  = searchParams?.custom  === "1";
  const isUnknown = searchParams?.unknown === "1";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-xl w-full text-center">

        {/* Checkmark icon */}
        <div
          className="mx-auto mb-8 flex items-center justify-center"
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(37,99,235,0.1)",
            border: "1px solid rgba(37,99,235,0.22)",
          }}
        >
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <path d="M2 11L10 19L26 2" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="font-heading font-bold mb-4"
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          Quote request received.
        </h1>

        {/* Ref */}
        {ref && (
          <p className="mb-6 text-sm" style={{ color: "#555" }}>
            Reference:{" "}
            <span className="font-semibold" style={{ color: "#888" }}>
              {ref}
            </span>
          </p>
        )}

        {/* Price estimate */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {isUnknown ? (
            <>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: "#555" }}>
                Your estimate
              </p>
              <p className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#fff", letterSpacing: "-0.03em" }}>
                Starting from $299
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                Websites start at $299 setup + $15/month. The right package depends on your scope, I'll confirm after reviewing your project.
              </p>
            </>
          ) : isCustom ? (
            <>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: "#555" }}>
                Your project
              </p>
              <p className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#fff", letterSpacing: "-0.03em" }}>
                Custom pricing required
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                Your project includes features that require a custom quote. I'll review your requirements and send a tailored proposal.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: "#555" }}>
                Your estimate
              </p>
              <p className="font-heading font-bold mb-1" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", letterSpacing: "-0.04em" }}>
                ${setup?.toLocaleString()}
              </p>
              <p className="text-sm mb-3" style={{ color: "#888" }}>
                setup + ${monthly}/month
              </p>
              <p className="text-xs" style={{ color: "#555" }}>
                This is an estimate based on your selections. Final pricing is confirmed after a brief project review.
              </p>
            </>
          )}
        </div>

        {/* Next steps */}
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "#888" }}>
          I'll review your details and respond within{" "}
          <span style={{ color: "#fff" }}>1 business day</span> to confirm scope, answer questions, and outline next steps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Back to home
          </Link>
          <a
            href="mailto:ansh@anshrai.com"
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#888",
            }}
          >
            Email me directly
          </a>
        </div>
      </div>
    </main>
  );
}
