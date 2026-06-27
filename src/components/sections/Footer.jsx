const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raiansh/" },
  { label: "GitHub",   href: "https://github.com/RaiAnsh" },
  { label: "arweb.co", href: "/arweb" },
];

export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-16 py-10 border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="font-heading font-semibold text-fg" style={{ fontSize: 15, letterSpacing: "-0.02em" }}>
          anshrai.{" "}
          <span className="font-normal text-sm" style={{ color: "#555555" }}>
            Toronto, ON
          </span>
        </p>

        <div className="flex items-center gap-7">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-xs font-medium transition-colors duration-150 hover:text-fg"
              style={{ color: "#555555" }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: "rgba(85,85,85,0.6)" }}>
          © {new Date().getFullYear()} Ansh Rai
        </p>
      </div>
    </footer>
  );
}
