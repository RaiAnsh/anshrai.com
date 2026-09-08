"use client";

// ─────────────────────────────────────────────────
//  LogosMarquee
//  Scrolling client logo marquee.
//
//  Phase 2: Add real logo image file paths to LOGOS.
//  Each logo can have:
//    img: "/logos/filename.png"  — use real file
//    name: "Client Name"         — fallback text if img is null
//    href: "https://..."         — click target
//    invert: true                — CSS invert filter for dark-bg logos
// ─────────────────────────────────────────────────

const LOGOS = [
  {
    name:   "KK Fade Lounge",
    href:   "https://www.kkfadelounge.com",
    img:    "/logos/kk-fade.png",
    invert: false,        // already dark bg, gold logo — looks good
  },
  {
    name:   "Delmar Contracting",
    href:   "https://www.delmarcontracting.ca",
    img:    "/logos/delmar.png",
    invert: true,         // white bg logo — invert to look good on dark strip
  },
  {
    name:   "Five Star Mobile Detailing",
    href:   "https://www.fivestarmobiledetailing.ca",
    img:    "/logos/five-star.png",
    invert: true,
  },
  {
    name:   "HighLife Express",
    href:   "#",
    img:    "/logos/highlife.png",
    invert: false,
  },
  {
    name:   "MAP Canada",
    href:   "https://mapcan.ca",
    img:    "/logos/map-canada.png",
    invert: true,
  },
  {
    name:   "Redline Contracting",
    href:   "#",
    img:    "/logos/redline.png",
    invert: false,
  },
  {
    name:   "United Tea Baggers Coalition",
    href:   "https://unitedtea-baggerscoalition.com",
    img:    "/logos/utbc.png",
    invert: false,
  },
  {
    name:   "K Group Ltd",
    href:   "https://www.kgroupltd.ca",
    img:    "/logos/k-group.png",
    invert: true,
  },
  {
    name:   "RL Contracting",
    href:   "https://rlcontracting.ca",
    img:    null,         // no logo image yet
    invert: false,
  },
  {
    name:   "Directway Movers",
    href:   "#",
    img:    null,
    invert: false,
  },
];

function LogoItem({ logo }) {
  const hasImg = logo.img !== null;

  return (
    <a
      href={logo.href}
      target={logo.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        height:         48,
        padding:        hasImg ? "0 1.5rem" : "0.5rem 1.5rem",
        borderRadius:   9999,
        border:         "1px solid rgba(255,255,255,0.07)",
        background:     "rgba(255,255,255,0.03)",
        textDecoration: "none",
        flexShrink:     0,
        transition:     "border-color 200ms ease, background 200ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
      }}
    >
      {hasImg ? (
        // Real logo image
        <img
          src={logo.img}
          alt={logo.name}
          style={{
            height:    32,
            maxWidth:  120,
            objectFit: "contain",
            filter:    logo.invert
              ? "brightness(0) invert(1) opacity(0.45)"
              : "opacity(0.55)",
            transition: "filter 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = logo.invert
              ? "brightness(0) invert(1) opacity(0.85)"
              : "opacity(0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = logo.invert
              ? "brightness(0) invert(1) opacity(0.45)"
              : "opacity(0.55)";
          }}
        />
      ) : (
        // Fallback text pill until real logo arrives
        <span
          style={{
            fontFamily:    "var(--font-ui)",
            fontSize:      12,
            fontWeight:    500,
            color:         "rgba(255,255,255,0.30)",
            letterSpacing: "0.02em",
            whiteSpace:    "nowrap",
          }}
        >
          {logo.name}
        </span>
      )}
    </a>
  );
}

export default function LogosMarquee() {
  // Duplicate for seamless infinite loop
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      style={{
        background:  "#080808",
        borderTop:   "1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:     "clamp(32px,5vh,52px) 0",
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
          marginBottom:  "clamp(18px,2.5vh,28px)",
        }}
      >
        Trusted by businesses across Canada
      </p>

      {/* Marquee track */}
      <div
        style={{
          position:   "relative",
          overflow:   "hidden",
          maskImage:  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="logos-track"
          style={{ display: "flex", gap: "0.75rem", width: "max-content", alignItems: "center" }}
        >
          {items.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
