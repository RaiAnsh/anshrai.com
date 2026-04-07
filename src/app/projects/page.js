import Window from "../../components/Window";
import Link from "next/link";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <Window title="Projects" wide>
      <p className="sectionLabel">Work</p>
      <h2 style={{ margin: "0 0 6px", fontSize: 26, letterSpacing: "-0.02em" }}>
        Projects
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 24px" }}>
        Analytics, databases, and client work — built end-to-end.
      </p>

      <div>
        {projects.map((p) => (
          <div key={p.slug} className="projectCard">
            <div className="projectCardHeader">
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{p.title}</h3>
                <span className="statusBadge" style={{ marginTop: 6, marginBottom: 8, display: "inline-block" }}>
                  {p.status}
                </span>
                <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                <div className="tagRow" style={{ marginTop: 0 }}>
                  {p.tags.map((t) => (
                    <span key={t} className="tagPill">{t}</span>
                  ))}
                </div>
              </div>
              {p.thumb && (
                <div style={{
                  width: 120,
                  height: 80,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  flexShrink: 0,
                  marginLeft: 16,
                }}>
                  <img src={p.thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            {p.href && (
              <div style={{ marginTop: 12 }}>
                <Link href={p.href} className="btnGhost" style={{ fontSize: 13, padding: "6px 14px" }}>
                  View →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </Window>
  );
}
