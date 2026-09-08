"use client";

// ─────────────────────────────────────────────────
//  TextTicker
//  Full-width scrolling text strip (à la webinventix).
// ─────────────────────────────────────────────────

const TICKER_TEXT = [
  "Web Design",
  "·",
  "Toronto",
  "·",
  "SEO",
  "·",
  "Custom Builds",
  "·",
  "Lead Generation",
  "·",
  "E-Commerce",
  "·",
  "Branding",
  "·",
  "Business Systems",
  "·",
  "Mobile-First",
  "·",
];

function TickerItem({ text }) {
  return (
    <span
      style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(32px, 5vw, 64px)",
        fontWeight:    300,
        fontStyle:     text === "·" ? "normal" : "italic",
        letterSpacing: "-0.02em",
        color:         text === "·" ? "var(--accent)" : "rgba(255,255,255,0.12)",
        whiteSpace:    "nowrap",
        paddingRight:  "0.75em",
        flexShrink:    0,
        lineHeight:    1,
      }}
    >
      {text}
    </span>
  );
}

export default function TextTicker() {
  // Triple for seamless loop even at large viewports
  const items = [...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT];

  return (
    <div
      style={{
        background:   "#080808",
        borderTop:    "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding:      "clamp(24px,4vh,40px) 0",
        overflow:     "hidden",
      }}
    >
      <div
        className="ticker-track"
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
      >
        {items.map((text, i) => (
          <TickerItem key={i} text={text} />
        ))}
      </div>
    </div>
  );
}
