"use client";

const NAV_LINKS = [
  { label: "Work",      href: "/#work" },
  { label: "Services",  href: "/#services" },
  { label: "Pricing",   href: "/quote" },
  { label: "Technical", href: "/technical" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raiansh/" },
  { label: "GitHub",   href: "https://github.com/RaiAnsh" },
];

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      style={{
        background:  "var(--ground)",
        borderTop:   "1px solid var(--border)",
        padding:     "clamp(56px,8vh,96px) clamp(24px,6vw,96px) clamp(32px,4vh,56px)",
        zIndex:      10,
        position:    "relative",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display:        "flex",
          flexWrap:       "wrap",
          justifyContent: "space-between",
          gap:            "clamp(40px,6vw,64px)",
          marginBottom:   "clamp(48px,7vh,80px)",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 300 }}>
          <p
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      18,
              fontWeight:    400,
              letterSpacing: "-0.02em",
              color:         "#ffffff",
              marginBottom:  "0.75rem",
            }}
          >
            anshrai.
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   13,
              lineHeight: 1.65,
              color:      "var(--muted)",
              margin:     0,
              marginBottom: "1.25rem",
            }}
          >
            Custom websites and digital systems for small businesses.
            Toronto-based, Canada-wide.
          </p>
          <a
            href="mailto:ansh@anshrai.com"
            style={{
              fontFamily:     "var(--font-ui)",
              fontSize:       13,
              color:          "var(--fg-dim)",
              textDecoration: "none",
              transition:     "color 160ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
          >
            ansh@anshrai.com ↗
          </a>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap" }}>
          <div>
            <p
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--muted)",
                marginBottom:  "1.25rem",
              }}
            >
              Site
            </p>
            <nav aria-label="Footer navigation">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      fontFamily:     "var(--font-ui)",
                      fontSize:       13,
                      color:          "var(--fg-dim)",
                      textDecoration: "none",
                      transition:     "color 160ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <div>
            <p
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--muted)",
                marginBottom:  "1.25rem",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily:     "var(--font-ui)",
                    fontSize:       13,
                    color:          "var(--fg-dim)",
                    textDecoration: "none",
                    transition:     "color 160ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
                >
                  {s.label} ↗
                </a>
              ))}
              <a
                href="/quote"
                style={{
                  fontFamily:     "var(--font-ui)",
                  fontSize:       13,
                  color:          "var(--fg-dim)",
                  textDecoration: "none",
                  transition:     "color 160ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
              >
                Get a Quote →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display:        "flex",
          flexWrap:       "wrap",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "0.75rem",
          paddingTop:     "clamp(24px,3vh,36px)",
          borderTop:      "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize:   12,
            color:      "var(--muted)",
            margin:     0,
          }}
        >
          © {new Date().getFullYear()} Ansh Rai · arweb
        </p>
        <a
          href="/privacy"
          style={{
            fontFamily:     "var(--font-ui)",
            fontSize:       12,
            color:          "var(--muted)",
            textDecoration: "none",
            opacity:        0.6,
            transition:     "opacity 160ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
