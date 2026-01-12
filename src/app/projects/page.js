import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <main className="container">
      <h1>Projects</h1>
      <p style={{ opacity: 0.9, maxWidth: 750 }}>
      A mix of analytics and software projects — focused on turning data into
      decision-ready insights (SQL, Python, dashboards) and building clear, usable
      interfaces when needed.
    </p>

      <section>
        {projects.map((p) => (
          <article key={p.slug}>
            <h2>{p.title}</h2>
            <p>{p.desc}</p>
            <p>{p.tags.join(" • ")}</p>
            <p>Status: {p.status}</p>
            {p.href && <a href={p.href}>Open</a>}
          </article>
        ))}
      </section>
    </main>
  );
}