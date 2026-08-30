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
      className="relative px-6 md:px-16 lg:px-24 pt-16 pb-10 border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">

          {/* Brand */}
          <div>
            <p
              className="font-heading font-bold mb-2"
              style={{ fontSize: 18, letterSpacing: "-0.03em", color: "#ffffff" }}
            >
              arweb
            </p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#555" }}>
              Custom websites and digital systems for small businesses.
              <br />
              Toronto, Canada — Canada-wide.
            </p>
            <a
              href="mailto:ansh@anshrai.com"
              className="inline-block mt-4 text-xs transition-colors hover:text-fg"
              style={{ color: "#888" }}
            >
              ansh@anshrai.com ↗
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: "#444" }}>
                Site
              </p>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm transition-colors hover:text-fg"
                    style={{ color: "#666" }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: "#444" }}>
                Connect
              </p>
              <div className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-colors hover:text-fg"
                    style={{ color: "#666" }}
                  >
                    {s.label} ↗
                  </a>
                ))}
                <a
                  href="/quote"
                  className="text-sm transition-colors hover:text-fg"
                  style={{ color: "#666" }}
                >
                  Get a Quote →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p className="text-xs" style={{ color: "#444" }}>
            © {new Date().getFullYear()} Ansh Rai · arweb
          </p>
          <p className="text-xs" style={{ color: "#333" }}>
            anshrai.com
          </p>
        </div>
      </div>
    </footer>
  );
}
