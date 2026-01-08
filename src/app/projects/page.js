import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <main className="container">
      <h1>Projects</h1>
      <p>Some projects are in progress — more coming soon.</p>

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