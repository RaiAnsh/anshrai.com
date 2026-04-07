import Window from "../components/Window";
import Link from "next/link";

export default function Home() {
  return (
    <Window title="README.md — Ansh Rai">
      {/* Name + title */}
      <p className="sectionLabel">Welcome</p>

      <h1>
        Hi, I'm{" "}
        <span className="gradientText">Ansh Rai.</span>
      </h1>

      <p style={{ fontSize: 18, color: "var(--muted)", margin: "6px 0 0", lineHeight: 1.5 }}>
        Database Developer &nbsp;·&nbsp; CS Student &nbsp;·&nbsp; Founder,{" "}
        <Link href="/arweb" style={{ color: "rgba(168,85,247,0.9)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          arweb.co
        </Link>
      </p>

      <hr className="divider" />

      {/* Bio */}
      <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 640, margin: 0, lineHeight: 1.7 }}>
        Business-oriented Computer Science student at{" "}
        <strong style={{ color: "var(--text)" }}>Toronto Metropolitan University</strong> with
        hands-on experience in data operations, analytics, and translating business requirements
        into technical solutions. I work with SQL, Python, and BI tools to turn messy data into
        clear, decision-ready insights.
      </p>

      {/* Stat chips */}
      <div className="chipRow">
        <span className="chip">🎓 TMU · CS · Expected 2027</span>
        <span className="chip">📍 Toronto, ON</span>
        <span className="chip">💼 Open to internships</span>
      </div>

      {/* CTAs */}
      <div className="btnRow">
        <Link href="/projects" className="btnPrimary">View Projects →</Link>
        <Link href="/experience" className="btnGhost">Experience</Link>
        <Link href="/contact" className="btnGhost">Contact</Link>
      </div>

      <hr className="divider" />

      {/* Quick skills preview */}
      <p className="sectionLabel" style={{ marginBottom: 12 }}>Core Tools</p>
      <div className="tagRow">
        {["Python", "SQL", "BigQuery", "Tableau", "PostgreSQL", "pandas", "Google Sheets", "Git", "Flask"].map((t) => (
          <span key={t} className="tagPill">{t}</span>
        ))}
      </div>
    </Window>
  );
}
