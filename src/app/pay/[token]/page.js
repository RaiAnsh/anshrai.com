// ─────────────────────────────────────────────────────────────
//  /pay/[token]  — Client-facing payment page
//
//  Server Component: fetches quote data from Stripe at request time.
//  The token is stored in Stripe Customer metadata, looked up via
//  stripe.customers.search().
//
//  States:
//    • Valid pending quote  → show personalized quote + Pay button
//    • Already paid        → show confirmation message
//    • ?success=1          → show "Payment received" banner
//    • ?cancelled=1        → show "Payment cancelled" banner
//    • Not found           → 404-style message
// ─────────────────────────────────────────────────────────────
import stripe from "@/lib/stripe";
import PayButton from "./PayButton";

export const dynamic = "force-dynamic"; // always fresh — no caching

export async function generateMetadata({ params }) {
  return { title: "Your Quote — arweb" };
}

async function getQuote(token) {
  try {
    const search = await stripe.customers.search({
      query: `metadata['arweb_token']:'${token}'`,
      limit: 1,
    });
    if (search.data.length === 0) return null;

    const c = search.data[0];
    return {
      name:     c.name,
      email:    c.email,
      setup:    parseFloat(c.metadata.arweb_setup   ?? "0"),
      monthly:  parseFloat(c.metadata.arweb_monthly ?? "0"),
      desc:     c.metadata.arweb_desc     ?? "",
      status:   c.metadata.arweb_status   ?? "pending",
    };
  } catch {
    return null;
  }
}

function fmt(n) {
  return new Intl.NumberFormat("en-CA", {
    style:    "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function PayPage({ params, searchParams }) {
  const { token } = params;
  const success   = searchParams?.success   === "1";
  const cancelled = searchParams?.cancelled === "1";

  const quote = await getQuote(token);

  return (
    <main
      style={{
        minHeight:      "100svh",
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "clamp(32px,6vw,80px) clamp(20px,5vw,40px)",
      }}
    >
      {/* Logo / brand */}
      <a
        href="https://anshrai.com"
        style={{
          fontFamily:    "var(--font-ui, system-ui)",
          fontSize:      15,
          fontWeight:    700,
          color:         "#fff",
          textDecoration:"none",
          letterSpacing: "0.04em",
          marginBottom:  "clamp(40px,6vh,64px)",
          opacity:       0.7,
        }}
      >
        arweb
      </a>

      {/* Card */}
      <div
        style={{
          width:        "100%",
          maxWidth:     480,
          background:   "#111118",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          overflow:     "hidden",
        }}
      >
        {/* ── Success banner ── */}
        {success && (
          <div
            style={{
              background:  "rgba(34,197,94,0.12)",
              borderBottom:"1px solid rgba(34,197,94,0.2)",
              padding:     "1rem 1.75rem",
              display:     "flex",
              alignItems:  "center",
              gap:         "0.75rem",
            }}
          >
            <span style={{ fontSize: 18 }}>✓</span>
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "#22c55e", margin: 0 }}>
              Payment received — thank you! You&apos;ll receive a confirmation email shortly.
            </p>
          </div>
        )}

        {/* ── Cancelled banner ── */}
        {cancelled && !success && (
          <div
            style={{
              background:  "rgba(245,158,11,0.10)",
              borderBottom:"1px solid rgba(245,158,11,0.18)",
              padding:     "1rem 1.75rem",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "#f59e0b", margin: 0 }}>
              Payment was cancelled. You can try again below whenever you&apos;re ready.
            </p>
          </div>
        )}

        <div style={{ padding: "clamp(28px,5vw,48px)" }}>

          {/* ── Not found ── */}
          {!quote && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
                Quote not found
              </p>
              <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
                This link may be invalid or expired. Contact{" "}
                <a href="mailto:info@anshrai.com" style={{ color: "#2563eb" }}>info@anshrai.com</a>.
              </p>
            </div>
          )}

          {/* ── Already paid ── */}
          {quote?.status === "paid" && !success && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: 40, marginBottom: "1rem" }}>✅</div>
              <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
                Already paid
              </p>
              <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
                This quote has already been settled. Questions?{" "}
                <a href="mailto:info@anshrai.com" style={{ color: "#2563eb" }}>info@anshrai.com</a>
              </p>
            </div>
          )}

          {/* ── Active quote ── */}
          {quote && (quote.status !== "paid" || success) && (
            <>
              {/* Eyebrow */}
              <p
                style={{
                  fontFamily:    "var(--font-ui, system-ui)",
                  fontSize:      11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.35)",
                  marginBottom:  "1rem",
                }}
              >
                Your quote from arweb
              </p>

              {/* Client name */}
              <h1
                style={{
                  fontFamily:    "var(--font-display, Georgia, serif)",
                  fontSize:      "clamp(26px, 5vw, 36px)",
                  fontWeight:    300,
                  letterSpacing: "-0.02em",
                  color:         "#ffffff",
                  margin:        "0 0 0.25rem",
                }}
              >
                {quote.name}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-ui, system-ui)",
                  fontSize:   13,
                  color:      "rgba(255,255,255,0.35)",
                  marginBottom:"2rem",
                }}
              >
                {quote.email}
              </p>

              {/* Description */}
              {quote.desc && (
                <p
                  style={{
                    fontFamily:   "var(--font-ui, system-ui)",
                    fontSize:     14,
                    lineHeight:   1.7,
                    color:        "rgba(255,255,255,0.55)",
                    marginBottom: "2rem",
                    padding:      "1rem 1.25rem",
                    background:   "rgba(255,255,255,0.04)",
                    borderRadius: 12,
                    border:       "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {quote.desc}
                </p>
              )}

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "0 0 1.5rem" }} />

              {/* Pricing breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                    Setup fee <span style={{ fontSize: 11, opacity: 0.6 }}>(one-time)</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                    {fmt(quote.setup)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                    Monthly maintenance
                  </span>
                  <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
                    {fmt(quote.monthly)}<span style={{ fontWeight: 400, fontSize: 12, opacity: 0.6 }}>/mo</span>
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "0 0 1.5rem" }} />

              {/* What's included */}
              <div style={{ marginBottom: "2rem" }}>
                {[
                  "Custom website built for your business",
                  "Fast, mobile-responsive design",
                  "Hosted & maintained monthly",
                  "Direct support — you talk to me, not a call centre",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display:     "flex",
                      alignItems:  "flex-start",
                      gap:         "0.75rem",
                      marginBottom:"0.625rem",
                    }}
                  >
                    <span style={{ color: "#22c55e", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pay button — client component */}
              {!success && <PayButton token={token} amount={fmt(quote.setup)} />}

              {success && (
                <div
                  style={{
                    textAlign:    "center",
                    padding:      "1rem",
                    background:   "rgba(34,197,94,0.08)",
                    borderRadius: 12,
                    border:       "1px solid rgba(34,197,94,0.15)",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "#22c55e", margin: 0 }}>
                    🎉 You&apos;re all set — I&apos;ll be in touch shortly to get started.
                  </p>
                </div>
              )}

              {/* Fine print */}
              <p
                style={{
                  fontFamily:  "var(--font-ui, system-ui)",
                  fontSize:    11,
                  color:       "rgba(255,255,255,0.22)",
                  textAlign:   "center",
                  marginTop:   "1.5rem",
                  lineHeight:  1.6,
                }}
              >
                Secured by Stripe · CAD · Cancel anytime after the first month
              </p>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          fontFamily:  "var(--font-ui, system-ui)",
          fontSize:    12,
          color:       "rgba(255,255,255,0.2)",
          marginTop:   "2rem",
          textAlign:   "center",
        }}
      >
        Questions?{" "}
        <a href="mailto:info@anshrai.com" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
          info@anshrai.com
        </a>
      </p>
    </main>
  );
}
