import Window from "../../components/Window";
import Link from "next/link";

export default function AboutPage() {
  return (
    <Window title="About — Ansh Rai">
      <p className="sectionLabel">About Me</p>
      <h2 style={{ margin: "0 0 20px", fontSize: 26, letterSpacing: "-0.02em" }}>
        Who I Am
      </h2>

      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, margin: "0 0 14px" }}>
        I'm a third-year Computer Science student at{" "}
        <strong style={{ color: "var(--text)" }}>Toronto Metropolitan University</strong> focused
        on database development and data analytics — turning complex information into clear,
        decision-ready insights.
      </p>

      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, margin: "0 0 14px" }}>
        I work with <strong style={{ color: "var(--text)" }}>SQL</strong>,{" "}
        <strong style={{ color: "var(--text)" }}>Python</strong>, and BI tools to clean data,
        analyze trends, and communicate findings to both technical and non-technical stakeholders.
        I'm especially drawn to analytics that supports real-world operations — workflows,
        reporting, and business decision-making.
      </p>

      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, margin: "0 0 14px" }}>
        Outside of analytics, I founded{" "}
        <Link href="/arweb" style={{ color: "rgba(168,85,247,0.9)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          arweb.co
        </Link>{" "}
        — a freelance web development agency where I've delivered 2 client projects end-to-end,
        from requirements gathering through to deployment. That experience made me strong at
        translating ambiguous needs into practical solutions.
      </p>

      <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
        My technical foundation is supported by coursework in{" "}
        <strong style={{ color: "var(--text)" }}>database systems</strong>,{" "}
        <strong style={{ color: "var(--text)" }}>data structures</strong>,{" "}
        <strong style={{ color: "var(--text)" }}>computer security</strong>, and{" "}
        <strong style={{ color: "var(--text)" }}>systems analysis</strong>.
      </p>

      <hr className="divider" />

      <div className="btnRow" style={{ marginTop: 0 }}>
        <Link href="/experience" className="btnPrimary">View Experience →</Link>
        <Link href="/skills" className="btnGhost">Skills</Link>
        <Link href="/contact" className="btnGhost">Contact</Link>
      </div>
    </Window>
  );
}
