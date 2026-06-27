"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Work",     href: "#work" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(9,9,9,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <a
        href="#"
        className="font-heading font-semibold text-fg"
        style={{ fontSize: 17, letterSpacing: "-0.02em" }}
      >
        anshrai.
      </a>

      <div className="hidden md:flex items-center gap-7">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: "#888888" }}
            onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.target.style.color = "#888888")}
          >
            {l.label}
          </a>
        ))}
        <a
          href="mailto:anshr792@gmail.com"
          className="text-sm px-4 py-2 rounded-full font-semibold transition-all duration-150 hover:brightness-110"
          style={{ background: "#2563eb", color: "#ffffff" }}
        >
          Let's talk
        </a>
      </div>

      {/* Mobile: just email CTA */}
      <a
        href="mailto:anshr792@gmail.com"
        className="md:hidden text-sm px-4 py-2 rounded-full font-semibold"
        style={{ background: "#2563eb", color: "#ffffff" }}
      >
        Let's talk
      </a>
    </nav>
  );
}
