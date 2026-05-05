import Window from "../components/Window";
import Link from "next/link";
import { clients } from "../data/clients";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <Window title="ansh.dev — README.md" wide>

      {/* ── HERO ─────────────────────────────────────────── */}
      <p className="sectionLabel">Welcome</p>
      <h1>
        Hi, I'm <span className="gradientText">Ansh Rai.</span>
      </h1>
      <p style={{ fontSize: 17, color: "var(--muted)", margin: "6px 0 0", lineHeight: 1.5 }}>
        Database Developer &nbsp;·&nbsp; CS Student &nbsp;·&nbsp; Founder,{" "}
        <Link href="/arweb" style={{ color: "rgba(168,85,247,0.95)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          arweb.co
        </Link>
      </p>

      <div className="chipRow">
        <span className="chip">🎓 TMU · CS · Expected 2027</span>
        <span className="chip">📍 Toronto, ON</span>
        <span className="chip">💼 Open to internships</span>
      </div>

      <div className="btnRow">
        <Link href="/experience" className="btnPrimary">Experience →</Link>
        <Link href="/skills" className="btnGhost">Skills</Link>
        <Link href="/contact" className="btnGhost">Contact</Link>
      </div>

      {/* ── WEBSITES BUILT ───────────────────────────────── */}
      <hr className="divider" />
      <p className="sectionLabel">Websites Built</p>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 20, letterSpacing: "-0.01em" }}>Client Work</h2>
        <Link href="/arweb" style={{ fontSize: 12, color: "rgba(168,85,247,0.8)", display: "flex", alignItems: "center", gap: 4 }}>
          arweb.co ↗
        </Link>
      </div>

      <div className="clientGrid">
        {clients.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            className="clientCard"
            style={{ "--card-accent": c.accent, "--card-border": c.border, "--card-bg": c.bg }}
          >
            <div className="clientCardTop">
              <div>
                <div className="clientCardName">{c.name}</div>
                <div className="clientCardType" style={{ color: c.accent }}>{c.type}</div>
              </div>
              <span className="clientCardArrow">↗</span>
            </div>
            <p className="clientCardDesc">{c.desc}</p>
            <div className="tagRow" style={{ marginTop: 0 }}>
              {c.tags.map((t) => (
                <span key={t} className="tagPill">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* ── ANALYTICS & DB PROJECTS ──────────────────────── */}
      <hr className="divider" />
      <p className="sectionLabel">Analytics & Database</p>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 20, letterSpacing: "-0.01em" }}>Projects</h2>
        <Link href="/projects" style={{ fontSize: 12, color: "rgba(56,189,248,0.8)" }}>
          View all →
        </Link>
      </div>

      <div>
        {projects.map((p) => (
          <div key={p.slug} className="projectCard">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</span>
                  <span className="statusBadge" style={{ marginTop: 0, fontSize: 10, padding: "2px 8px" }}>{p.status}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.6 }}>{p.desc}</p>
                <div className="tagRow" style={{ marginTop: 0 }}>
                  {p.tags.map((t) => <span key={t} className="tagPill">{t}</span>)}
                </div>
              </div>
              {p.thumb && (
                <div style={{ width: 80, height: 56, borderRadius: 6, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
                  <img src={p.thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
            {p.href && (
              <div style={{ marginTop: 10 }}>
                <Link href={p.href} className="btnGhost" style={{ fontSize: 12, padding: "5px 12px" }}>View case study →</Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── CORE TOOLS ───────────────────────────────────── */}
      <hr className="divider" />
      <p className="sectionLabel" style={{ marginBottom: 10 }}>Core Tools</p>
      <div className="tagRow">
        {["Python", "SQL", "PostgreSQL", "BigQuery", "Tableau", "pandas", "Next.js", "MongoDB", "Flask", "Git"].map((t) => (
          <span key={t} className="tagPill">{t}</span>
        ))}
      </div>

    </Window>
  );
}
