"use client";

// ─────────────────────────────────────────────────────────────
//  EtransferInvoice — Client Component
//  Shown on /pay/[token] when arweb_type === "etransfer"
//  Displays itemised invoice + e-transfer instructions
// ─────────────────────────────────────────────────────────────
import { useState } from "react";

function fmtCAD(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(Number(n));
}

function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        "0.4rem",
        padding:    "0.5rem 1rem",
        borderRadius: 9999,
        border:     copied ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(168,85,247,0.35)",
        background: copied ? "rgba(34,197,94,0.1)"           : "rgba(168,85,247,0.1)",
        color:      copied ? "#22c55e"                        : "#c084fc",
        fontFamily: "var(--font-ui, system-ui)",
        fontSize:   13,
        fontWeight: 600,
        cursor:     "pointer",
        transition: "all 180ms ease",
        flexShrink: 0,
      }}
    >
      {copied ? <>✓ Copied!</> : <>⎘ Copy email</>}
    </button>
  );
}

export default function EtransferInvoice({ quote }) {
  const invoiceRef = quote.etransferEmail ? `INV-${Date.now().toString(36).toUpperCase().slice(-6)}` : "INV";
  const today = new Date().toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });

  const isPaid    = quote.status === "paid";
  const lineItems = quote.lineItems ?? [];
  const total     = quote.amount;

  return (
    <>
      {/* Paid banner */}
      {isPaid && (
        <div style={{
          background:   "rgba(34,197,94,0.12)",
          borderBottom: "1px solid rgba(34,197,94,0.2)",
          padding:      "1rem 1.75rem",
          display:      "flex",
          alignItems:   "center",
          gap:          "0.75rem",
        }}>
          <span style={{ fontSize: 18 }}>✓</span>
          <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "#22c55e", margin: 0 }}>
            Payment received — thank you! Reach out if you have any questions.
          </p>
        </div>
      )}

      <div style={{ padding: "clamp(28px,5vw,48px)" }}>

        {/* Invoice header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>
              Invoice
            </p>
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              {today}
            </p>
          </div>
          <span style={{
            alignSelf:  "flex-start",
            fontFamily: "var(--font-ui, system-ui)", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.3rem 0.8rem", borderRadius: 9999,
            background: isPaid ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.12)",
            color:      isPaid ? "#22c55e"              : "#f59e0b",
            border:     isPaid ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(245,158,11,0.2)",
          }}>{isPaid ? "Paid" : "Due upon receipt"}</span>
        </div>

        {/* Billed to */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>Billed to</p>
          <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: "0.15rem" }}>{quote.name}</p>
          <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>{quote.email}</p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: "1.25rem" }} />

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 1rem", marginBottom: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Description</span>
          <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "right" }}>Amount</span>
        </div>

        {/* Line items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {lineItems.length > 0 ? lineItems.map((item, i) => {
            const isFree = Number(item.amount ?? 0) === 0;
            return (
              <div
                key={i}
                style={{
                  display:       "grid",
                  gridTemplateColumns: "1fr auto",
                  gap:           "0 1rem",
                  alignItems:    "start",
                  padding:       "0.85rem 1rem",
                  background:    "rgba(255,255,255,0.03)",
                  borderRadius:  10,
                  border:        "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, fontWeight: 500, color: "#fff", margin: "0 0 0.15rem" }}>
                    {item.name}
                  </p>
                  {item.desc && (
                    <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  )}
                </div>
                <span style={{
                  fontFamily:     "var(--font-ui, system-ui)",
                  fontSize:       isFree ? 13 : 15,
                  fontWeight:     isFree ? 600 : 700,
                  color:          isFree ? "#22c55e" : "#fff",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace:     "nowrap",
                  paddingTop:     "0.1rem",
                }}>
                  {isFree ? "Free" : fmtCAD(item.amount)}
                </span>
              </div>
            );
          }) : (
            <div style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
              <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, fontWeight: 500, color: "#fff", margin: 0 }}>Services rendered</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.25rem" }} />

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Total due</span>
          <span style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "clamp(22px,4vw,30px)", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em" }}>
            {fmtCAD(total)}{" "}
            <span style={{ fontSize: "0.45em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-ui, system-ui)", fontWeight: 400, letterSpacing: 0 }}>CAD</span>
          </span>
        </div>

        {/* E-transfer payment instructions */}
        {!isPaid && (
          <div style={{
            padding:      "1.5rem",
            background:   "rgba(168,85,247,0.07)",
            border:       "1px solid rgba(168,85,247,0.18)",
            borderRadius: 16,
            marginBottom: "1.5rem",
          }}>
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(168,85,247,0.8)", marginBottom: "1rem", fontWeight: 700 }}>
              💸 How to pay
            </p>
            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: "1rem", lineHeight: 1.6 }}>
              Send an <strong style={{ color: "#fff" }}>Interac e-Transfer</strong> of{" "}
              <strong style={{ color: "#c084fc" }}>{fmtCAD(total)} CAD</strong> to:
            </p>

            {/* Email + copy */}
            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              flexWrap:       "wrap",
              gap:            "0.75rem",
              padding:        "0.85rem 1.1rem",
              background:     "rgba(255,255,255,0.04)",
              border:         "1px solid rgba(255,255,255,0.08)",
              borderRadius:   12,
              marginBottom:   "1rem",
            }}>
              <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "0.01em" }}>
                {quote.etransferEmail}
              </span>
              <CopyEmailButton email={quote.etransferEmail} />
            </div>

            <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.6 }}>
              No password needed — auto-deposit is enabled. Include your name in the message if possible.
            </p>
          </div>
        )}

        {/* Fine print */}
        <p style={{ fontFamily: "var(--font-ui, system-ui)", fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.6 }}>
          Issued by arweb &middot; Questions?{" "}
          <a href="mailto:info@anshrai.com" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>info@anshrai.com</a>
        </p>
      </div>
    </>
  );
}
