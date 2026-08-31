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
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-300"
        style={{
          background:   scrolled ? "rgba(9,9,9,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="font-heading font-semibold text-fg"
          style={{ fontSize: 17, letterSpacing: "-0.02em" }}
        >
          anshrai.
        </a>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: "#888888" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/quote"
            onClick={() => track(Events.NAV_QUOTE_CLICKED)}
            className="text-sm px-5 py-2.5 rounded-full font-semibold transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Get an Instant Quote
          </a>
        </div>

        {/* ── Mobile: hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
        >
          <span
            style={{
              display: "block", width: 22, height: 1.5,
              background: "#fff",
              transition: "transform 220ms ease",
              transform: menuOpen ? "rotate(45deg) translate(2px, 6.5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 1.5,
              background: "#fff",
              transition: "opacity 220ms ease",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 1.5,
              background: "#fff",
              transition: "transform 220ms ease",
              transform: menuOpen ? "rotate(-45deg) translate(2px, -6.5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300"
        style={{
          background:  "#090909",
          opacity:     menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform:   menuOpen ? "translateX(0)" : "translateX(20px)",
        }}
      >
        <div className="flex flex-col px-6 pt-24 pb-10 gap-7 flex-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-heading font-semibold text-fg"
              style={{ fontSize: "clamp(28px,8vw,40px)", letterSpacing: "-0.025em" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA at bottom of drawer */}
        <div className="px-6 pb-12">
          <a
            href="/quote"
            onClick={() => { close(); track(Events.NAV_QUOTE_CLICKED); }}
            className="block w-full text-center py-4 rounded-full font-semibold text-base"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Get an Instant Quote
          </a>
          <p className="text-center text-xs mt-4" style={{ color: "#555" }}>
            Most inquiries receive a response within 1 business day.
          </p>
        </div>
      </div>
    </>
  );
}
