"use client";

// ─────────────────────────────────────────────────
//  LogosMarquee — scrolling client logo strip
//  Rules: logos ONLY (no text). If img is null the
//  slot is hidden entirely until a file is provided.
// ─────────────────────────────────────────────────

const LOGOS = [
  { name: "KK Fade Lounge",          href: "https://www.kkfadelounge.com",           img: "/logos/kkfadelounge.png" },
  { name: "K Group Ltd",             href: "https://www.kgroupltd.ca",               img: "/logos/kgroup.png"      },
  { name: "Delmar Contracting",      href: "https://www.delmarcontracting.ca",        img: "/logos/delmar.png"      },
  { name: "Five Star Detailing",     href: "https://www.fivestarmobiledetailing.ca",  img: "/logos/fivestar.png"    },
  { name: "HighLife Express",        href: "#",                                       img: "/logos/highlife.png"    },
  { name: "MAP Canada",              href: "https://mapcan.ca",                       img: "/logos/mapcan.webp"     },
  // pending — add file to public/logos/ and uncomment:
  // { name: "Redline Contracting",  href: "#",                                       img: "/logos/redline.png"     },
  // { name: "UTBC",                 href: "https://unitedtea-baggerscoalition.com",  img: "/logos/utbc.png"        },
  // { name: "RL Contracting",       href: "https://rlcontracting.ca",                img: "/logos/rl.png"          },
  // { name: "Directway Movers",     href: "#",                                       img: "/logos/directway.png"   },
];

// Only render logos that have an image file
const ACTIVE = LOGOS.filter((l) => l.img !== null);

function LogoItem({ logo }) {
  return (
    <a
      href={logo.href}
      target={logo.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      title={logo.name}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        height:         52,
        padding:        "0 1.25rem",
        borderRadius:   12,
        border:         "1px solid rgba(255,255,255,0.07)",
        background:     "rgba(255,255,255,0.05)",
        textDecoration: "none",
        flexShrink:     0,
        transition:     "opacity 220ms ease, border-color 220ms ease",
        opacity:        0.55,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity      = "1";
        e.currentTarget.style.borderColor  = "rgba(255,255,255,0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity      = "0.55";
        e.currentTarget.style.borderColor  = "rgba(255,255,255,0.07)";
      }}
    >
      <img
        src={logo.img}
        alt={logo.name}
        style={{
          height:    34,
          maxWidth:  110,
          objectFit: "contain",
          display:   "block",
        }}
      />
    </a>
  );
}

export default function LogosMarquee() {
  if (ACTIVE.length === 0) return null;

  // Triple for a seamless loop regardless of viewport width
  const items = [...ACTIVE, ...ACTIVE, ...ACTIVE];

  return (
    <div
      style={{
        background:  "#080808",
        borderTop:   "1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:     "clamp(32px,4.5vh,48px) 0",
        overflow:    "hidden",
      }}
    >
      <p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--muted)",
          textAlign:     "center",
          marginBottom:  "clamp(16px,2.5vh,24px)",
        }}
      >
        Trusted by businesses across Canada
      </p>

      <div
        style={{
          position:        "relative",
          overflow:        "hidden",
          maskImage:       "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
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
