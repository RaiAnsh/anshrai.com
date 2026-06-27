import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raiansh/" },
  { label: "GitHub",   href: "https://github.com/RaiAnsh" },
  { label: "arweb.co", href: "/arweb" },
];

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-12 border-t"
      style={{ borderColor: "rgba(240,237,229,0.07)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div>
          <p className="font-serif text-fg text-base" style={{ letterSpacing: "-0.02em" }}>
            Ansh Rai
          </p>
          <p className="text-xs mt-1" style={{ color: "#706c69" }}>
            Toronto, ON · CS Student · Founder
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-xs font-medium transition-colors duration-150 hover:text-fg"
              style={{ color: "#706c69" }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: "rgba(112,108,105,0.5)" }}>
          © {new Date().getFullYear()} Ansh Rai
        </p>
      </div>
    </footer>
  );
}
