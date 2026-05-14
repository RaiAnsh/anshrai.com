"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,9,9,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(240,237,229,0.07)" : "1px solid transparent",
      }}
    >
      <a href="#" className="font-serif text-lg text-fg tracking-tight">
        Ansh Rai
      </a>

      <div className="flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-muted hover:text-fg transition-colors duration-150"
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/arweb"
          className="text-sm px-4 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-bg transition-all duration-150"
        >
          arweb.co ↗
        </Link>
      </div>
    </nav>
  );
}
