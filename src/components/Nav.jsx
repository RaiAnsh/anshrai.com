"use client";

import { useState, useEffect } from "react";
import { track, Events } from "../lib/analytics";

const NAV_LINKS = [
  { label: "Work",      href: "/#work" },
  { label: "Services",  href: "/#services" },
  { label: "Pricing",   href: "/quote" },
  { label: "Technical", href: "/technical" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
      {/* ── Main navbar ── */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6 transition-all duration-500"
        style={{
          background:     scrolled ? "rgba(11,11,14,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          anshrai.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 160ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/quote"
            onClick={() => track(Events.NAV_QUOTE_CLICKED)}
            className="btn-primary"
            style={{ fontSize: 13, padding: "0.55rem 1.25rem" }}
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span style={{ display:"block", width:22, height:1, background:"#fff", transition:"transform 220ms ease", transform: menuOpen ? "rotate(45deg) translate(0,6px)" : "none" }} />
          <span style={{ display:"block", width:22, height:1, background:"#fff", transition:"opacity 220ms ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display:"block", width:22, height:1, background:"#fff", transition:"transform 220ms ease", transform: menuOpen ? "rotate(-45deg) translate(0,-6px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300"
        style={{
          background:    "var(--ground)",
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform:     menuOpen ? "none" : "translateY(-8px)",
        }}
      >
        <div className="flex flex-col px-6 pt-28 pb-10 gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,9vw,48px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/quote"
            onClick={close}
            className="btn-primary mt-4"
            style={{ alignSelf: "flex-start" }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
}
