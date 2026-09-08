"use client";

import { useState, useEffect } from "react";
import { track, Events } from "../lib/analytics";

const NAV_LINKS = [
  { label: "Work",      href: "/#work" },
  { label: "Services",  href: "/#services" },
  { label: "About",     href: "/#about" },
  { label: "Pricing",   href: "/quote" },
  { label: "Technical", href: "/technical" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Main nav wrapper ── */}
      <nav
        aria-label="Main navigation"
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          display:        "flex",
          justifyContent: "center",
          padding:        scrolled ? "12px 24px" : "24px 24px",
          transition:     "padding 400ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents:  "none",
        }}
      >
        {/* Inner pill / bar */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            width:          "100%",
            maxWidth:       scrolled ? 900 : 1280,
            padding:        scrolled ? "0.6rem 1.25rem" : "0 clamp(24px,4vw,48px)",
            borderRadius:   scrolled ? 9999 : 0,
            background:     scrolled ? "rgba(8,8,8,0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            border:         scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            transition:     "max-width 400ms cubic-bezier(0.16,1,0.3,1), padding 400ms cubic-bezier(0.16,1,0.3,1), background 400ms, border-radius 400ms, border-color 400ms",
            pointerEvents:  "auto",
          }}
        >
          {/* Logo / Wordmark */}
          <a
            href="/"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.55rem",
              textDecoration: "none",
              flexShrink:     0,
            }}
          >
            {/* Gradient icon — matches arweb logo */}
            <svg
              width={scrolled ? 22 : 26}
              height={scrolled ? 22 : 26}
              viewBox="0 0 32 32"
              fill="none"
              style={{ transition: "width 300ms, height 300ms", flexShrink: 0 }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arweb-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38b6ff" />
                  <stop offset="100%" stopColor="#c77dff" />
                </linearGradient>
              </defs>
              {/* Power button ring */}
              <path
                d="M16 4 L16 10"
                stroke="url(#arweb-g)" strokeWidth="3" strokeLinecap="round"
              />
              <path
                d="M10.5 7.5 A9 9 0 1 0 21.5 7.5"
                stroke="url(#arweb-g)" strokeWidth="3" strokeLinecap="round" fill="none"
              />
            </svg>
            {/* Wordmark */}
            <span
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      scrolled ? 16 : 19,
                fontWeight:    700,
                letterSpacing: "-0.02em",
                background:    "linear-gradient(135deg, #38b6ff 0%, #c77dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition:    "font-size 300ms",
              }}
            >
              arweb
            </span>
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: scrolled ? "1.75rem" : "2.25rem", transition: "gap 300ms" }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily:     "var(--font-ui)",
                  fontSize:       13,
                  fontWeight:     400,
                  letterSpacing:  "0.01em",
                  color:          "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition:     "color 160ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/quote"
              onClick={() => track(Events.NAV_QUOTE_CLICKED)}
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.4rem",
                background:    "#ffffff",
                color:         "#080808",
                padding:       "0.5rem 1.1rem",
                borderRadius:  9999,
                fontSize:      13,
                fontWeight:    600,
                fontFamily:    "var(--font-ui)",
                textDecoration:"none",
                transition:    "opacity 180ms ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start a Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "#fff", borderRadius: 2, transition: "transform 220ms ease", transform: menuOpen ? "rotate(45deg) translate(0,6px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "#fff", borderRadius: 2, transition: "opacity 220ms ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "#fff", borderRadius: 2, transition: "transform 220ms ease", transform: menuOpen ? "rotate(-45deg) translate(0,-6px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-40 md:hidden flex flex-col"
        style={{
          background:    "#080808",
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform:     menuOpen ? "none" : "translateY(-12px)",
          transition:    "opacity 280ms ease, transform 280ms ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "clamp(96px,14vh,140px) clamp(24px,6vw,48px) 3rem", gap: "0.5rem" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(32px,9vw,52px)",
                fontWeight:    300,
                letterSpacing: "-0.025em",
                color:         "#ffffff",
                textDecoration:"none",
                padding:       "0.4rem 0",
                borderBottom:  "1px solid rgba(255,255,255,0.05)",
                transition:    "color 160ms",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/quote"
            onClick={close}
            className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: "1.5rem", fontSize: 14 }}
          >
            Start a Project
          </a>
        </div>
      </div>
    </>
  );
}
