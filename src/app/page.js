import TypingRoles from "../components/TypingRoles";

export default function Home() {
  return (
    <main className="container">
      {/* Hero */}
      <section>
        <h1>Hi, I’m Ansh Rai</h1>
        <p>
          <TypingRoles />
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "14px" }}>
          <a href="/projects">View Projects</a>
          <a href="/contact">Contact</a>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ marginTop: "60px" }}>
        <h2>Featured Projects</h2>

        <article>
          <h3>Project Placeholder #1</h3>
          <p>
            Full-stack web application showcasing API integration, state
            management, and clean UI.
          </p>
        </article>

        <article>
          <h3>Project Placeholder #2</h3>
          <p>
            Business website rebuilt from scratch with responsive layout and
            modern design.
          </p>
        </article>
      </section>
    </main>
  );
}