"use client";
import TypingRoles from "../components/TypingRoles";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="container">
      {/* HERO */}
      <section
        className="heroWrap"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          e.currentTarget.style.setProperty("--x", `${x}%`);
          e.currentTarget.style.setProperty("--y", `${y}%`);
        }}
      >
        <div className="heroPanel">
          <div className="heroContent">
            <h1 className="heroTitle">Hi, I’m Ansh Rai</h1>
            <p className="heroSubtitle">
              <TypingRoles />
            </p>

            <div className="btnRow">
              <a className="btnPrimary" href="/projects">
                View Projects
              </a>
              <a className="btnGhost" href="/contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="sectionCard">
        <h2>What I Do</h2>

        <p>
         I’m a Computer Science student focused on <strong>data analytics</strong> and
          turning messy information into clear, decision-ready insights.
        </p>
        <p>
          I work with <strong>SQL</strong>, <strong>Python</strong>, and spreadsheets to
          clean data, analyze trends, and communicate results through dashboards and
          concise write-ups.
        </p>
        <p>
          I also have hands-on experience delivering client projects end-to-end
          (requirements → design → deployment), which helps me present technical work
          in a way stakeholders actually understand.
        </p>

        <p style={{ opacity: 0.85, marginBottom: 0 }}>
          Currently building: an <strong>HR / Employee Attrition Analytics</strong>{" "}
          project (analysis + dashboard + recommendations).
        </p>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="sectionCard">
        <h2>Featured Projects</h2>

        {projects
          .filter((p) => p.featured)
          .map((p) => (
              <article
                key={p.slug}
                className="projectCard"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const px = (e.clientX - r.left) / r.width;
                  const py = (e.clientY - r.top) / r.height;

                  // For the glow position (CSS variables)
                  el.style.setProperty("--mx", `${px * 100}%`);
                  el.style.setProperty("--my", `${py * 100}%`);

                  // Subtle tilt
                  const rotY = (px - 0.5) * 8; // left/right
                  const rotX = (0.5 - py) * 8; // up/down
                  el.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.removeProperty("--mx");
                  el.style.removeProperty("--my");
                  el.style.transform = "";
                }}
              >
              <h3>{p.title}</h3>
              <p>{p.desc}</p>

              <span className="statusBadge">{p.status}</span>

              <div className="tagRow">
                {p.tags.map((t) => (
                  <span key={t} className="tagPill">
                    {t}
                  </span>
                ))}
              </div>

              {p.href && (
                <div style={{ marginTop: "12px" }}>
                  <a className="btnGhost" href={p.href}>
                    View project →
                  </a>
                </div>
              )}

              {/* Hover preview */}
              {p.thumb && (
                <div className="hoverPreview">
                  <img src={p.thumb} alt={`${p.title} preview`} />
                </div>
              )}
            </article>
          ))}
      </section>
    </main>
  );
}