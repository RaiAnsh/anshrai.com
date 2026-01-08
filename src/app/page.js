import TypingRoles from "../components/TypingRoles";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="container">
      {/* Hero */}
      <section>
        <h1 className="heroTitle">Hi, I’m Ansh Rai</h1>

        <p className="heroSubtitle">
          <TypingRoles />
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "14px" }}>
          <a href="/projects">View Projects</a>
          <a href="/contact">Contact</a>
        </div>
      </section>

      {/* What I Do */}
      <section style={{ marginTop: "60px" }}>
        <h2>What I Do</h2>

        <p>I build modern web applications using React and Next.js.</p>
        <p>
          I’ve worked directly with clients, taking projects from concept to
          delivery while balancing user needs, communication, and timelines.
        </p>
        <p>
          I’m building a strong foundation through coursework in computer
          security, database systems, data structures, and operating systems.
        </p>
      </section>

      {/* Featured Projects */}
      <section style={{ marginTop: "60px" }}>
        
        <h2>Featured Projects</h2>

            {projects
      .filter((p) => p.featured)
      .map((p) => (
        <article key={p.slug} className="projectCard">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <p>Status: {p.status}</p>
          {p.href && <a href={p.href}>View project</a>}

          {/* Hover preview */}
          {p.thumb && (
            <div className="hoverPreview">
              <img
                src={p.thumb}
                alt={`${p.title} preview`}
              />
            </div>
          )}
        </article>
      ))}
      </section>
    </main>
  );
}