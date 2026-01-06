import TypingRoles from "../components/TypingRoles";

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

        <article>
          <h3>Discrete Structures Visualizer</h3>
          <p>
            An interactive web tool for exploring foundational discrete
            mathematics concepts such as set operations.
          </p>
          <p>Status: In progress</p>
          <a href="/projects/discrete-visualizer">View project</a>
        </article>

        <article>
          <h3>Business Website Rebuild</h3>
          <p>
            A modern, responsive business website rebuilt from scratch with a
            focus on layout, usability, and clean design.
          </p>
          <p>Status: Planned</p>
          <a href="/projects/business-rebuild">View project</a>
        </article>

        <article>
          <h3>Utility / Dashboard App</h3>
          <p>
            A small web application focused on logic, state management, and
            practical UI patterns.
          </p>
          <p>Status: Planned</p>
          <a href="/projects/utility-app">View project</a>
        </article>
      </section>
    </main>
  );
}