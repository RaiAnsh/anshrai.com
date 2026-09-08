"use client";

// ─────────────────────────────────────────────────
//  LogosMarquee
//  Scrolling brand/client logo strip.
//  Phase 2: replace PLACEHOLDER_LOGOS with real logo images.
// ─────────────────────────────────────────────────

// Placeholder: text-based logos until real assets arrive
const PLACEHOLDER_LOGOS = [
  { name: "RL Contracting",        href: "https://rlcontracting.ca" },
  { name: "MAP Canada",            href: "https://mapcan.ca" },
  { name: "K Group Ltd",           href: "https://www.kgroupltd.ca" },
  { name: "KK Fade Lounge",        href: "https://www.kkfadelounge.com" },
  { name: "Broadview Barber",      href: "https://www.broadviewbarbersalon.ca" },
  { name: "Five Star Detailing",   href: "https://www.fivestarmobiledetailing.ca" },
  { name: "Sunder Wellness",       href: "https://sunderwellness.ca" },
  { name: "Delmar Contracting",    href: "https://www.delmarcontracting.ca" },
  { name: "Bradshaw Plumbing",     href: "https://www.bradshawplumbing.com" },
];

function LogoItem({ name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        padding:       "0.6rem 1.75rem",
        borderRadius:  9999,
        border:        "1px solid rgba(255,255,255,0.08)",
        background:    "rgba(255,255,255,0.03)",
        fontFamily:    "var(--font-ui)",
        fontSize:      13,
        fontWeight:    500,
        color:         "rgba(255,255,255,0.35)",
        letterSpacing: "0.01em",
        textDecoration:"none",
        whiteSpace:    "nowrap",
        transition:    "color 200ms ease, border-color 200ms ease",
        flexShrink:    0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color        = "rgba(255,255,255,0.7)";
        e.currentTarget.style.borderColor  = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color        = "rgba(255,255,255,0.35)";
        e.currentTarget.style.borderColor  = "rgba(255,255,255,0.08)";
      }}
    >
      {name}
    </a>
  );
}

export default function LogosMarquee() {
  // Duplicate items for seamless infinite loop
  const items = [...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS];

  return (
    <div
      style={{
        background:  "#080808",
        borderTop:   "1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:     "clamp(36px,5vh,56px) 0",
        overflow:    "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--muted)",
          textAlign:     "center",
          marginBottom:  "clamp(20px,3vh,32px)",
        }}
      >
        Trusted by businesses across Canada
      </p>

      {/* Marquee track */}
      <div
        style={{
          position:   "relative",
          overflow:   "hidden",
          maskImage:  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="logos-track" style={{ display: "flex", gap: "1rem", width: "max-content" }}>
          {items.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} href={logo.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
