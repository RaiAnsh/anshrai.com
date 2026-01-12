export default function AboutPage() {
  return (
    <main className="container">
      <section className="sectionCard">
        <h1>About</h1>

        <p style={{ maxWidth: 820, opacity: 0.92 }}>
          I’m a third-year Computer Science student focused on{" "}
          <strong>data analytics</strong> and building tools that turn complex
          information into clear, decision-ready insights.
        </p>

        <p style={{ maxWidth: 820, opacity: 0.9 }}>
          I work with <strong>SQL</strong>, <strong>Python</strong>, and
          dashboards to clean data, analyze trends, and communicate findings in a
          way that’s useful to both technical and non-technical stakeholders.
          I’m especially interested in analytics that supports real-world
          operations—workflows, reporting, and business decision-making.
        </p>

        <p style={{ maxWidth: 820, opacity: 0.9 }}>
          Outside of analytics, I’ve worked directly with clients and delivered
          projects end-to-end (requirements → design → deployment). That
          experience has made me strong at translating ambiguous needs into
          practical solutions, and presenting work clearly.
        </p>

        <p style={{ maxWidth: 820, opacity: 0.88, marginBottom: 0 }}>
          My technical foundation is supported by coursework in{" "}
          <strong>database systems</strong>, <strong>data structures</strong>,{" "}
          <strong>computer security</strong>, and <strong>operating systems</strong>.
          I’m currently building an{" "}
          <strong>HR / Employee Attrition Analytics</strong> project to deepen my
          analytics skills and produce a portfolio-grade case study.
        </p>
      </section>
    </main>
  );
}