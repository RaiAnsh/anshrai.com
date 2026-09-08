"use client";

// arweb social links
const ARWEB_SOCIALS = [
  {
    label: "Instagram",
    href:  "http://instagram.com/arweb.co/",
    icon:  (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href:  "https://www.facebook.com/profile.php?id=61592689970339",
    icon:  (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href:  "http://ca.linkedin.com/company/arwebsite",
    icon:  (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

// Ansh personal socials
const ANSH_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raiansh/" },
  { label: "GitHub",   href: "https://github.com/RaiAnsh" },
];

const NAV_LINKS = [
  { label: "Work",      href: "/#work" },
  { label: "Services",  href: "/#services" },
  { label: "About",     href: "/#about" },
  { label: "Pricing",   href: "/quote" },
  { label: "Technical", href: "/technical" },
];

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      style={{
        background:  "#080808",
        borderTop:   "1px solid rgba(255,255,255,0.05)",
        padding:     "clamp(56px,8vh,96px) clamp(24px,5vw,80px) clamp(32px,4vh,56px)",
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
        {/* Brand + arweb socials */}
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
              fontFamily:  "var(--font-ui)",
              fontSize:    13,
              lineHeight:  1.65,
              color:       "var(--muted)",
              margin:      0,
              marginBottom:"1.25rem",
            }}
          >
            Custom websites and digital systems for small businesses.
            Toronto-based, Canada-wide.
          </p>
          <a
            href="mailto:info@anshrai.com"
            style={{
              fontFamily:     "var(--font-ui)",
              fontSize:       13,
              color:          "var(--fg-dim)",
              textDecoration: "none",
              display:        "block",
              marginBottom:   "1.5rem",
              transition:     "color 160ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
          >
            info@anshrai.com ↗
          </a>

          {/* arweb social icons */}
          <div>
            <p
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "var(--muted)",
                marginBottom:  "0.75rem",
              }}
            >
              arweb
            </p>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {ARWEB_SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`arweb on ${s.label}`}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    width:          36,
                    height:         36,
                    borderRadius:   "50%",
                    border:         "1px solid rgba(255,255,255,0.08)",
                    background:     "rgba(255,255,255,0.03)",
                    color:          "var(--muted)",
                    textDecoration: "none",
                    transition:     "color 160ms ease, border-color 160ms ease, background 160ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color       = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.background  = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color       = "var(--muted)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links columns */}
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
              {ANSH_SOCIALS.map((s) => (
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
                  color:          "var(--accent)",
                  textDecoration: "none",
                  transition:     "opacity 160ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Start a project →
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
          borderTop:      "1px solid rgba(255,255,255,0.05)",
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
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
