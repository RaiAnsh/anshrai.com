const projects = [
  {
    title: "Project Placeholder #1",
    desc: "A full-stack app with Next.js + API + database.",
    tags: ["Next.js", "Node", "DB"],
  },
  {
    title: "Project Placeholder #2",
    desc: "A React-based business site with polished UI and responsive layout.",
    tags: ["React", "UI", "Responsive"],
  },
  {
    title: "Project Placeholder #3",
    desc: "A utility app showcasing state, forms, and clean logic.",
    tags: ["Forms", "State", "UX"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="container">
      <h1>Projects</h1>
      <p>Some projects are in progress — more coming soon.</p>

      <section>
        {projects.map((p) => (
          <article key={p.title}>
            <h2>{p.title}</h2>
            <p>{p.desc}</p>
            <p>{p.tags.join(" • ")}</p>
          </article>
        ))}
      </section>
    </main>
  );
}