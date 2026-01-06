export default function ContactPage() {
  return (
    <main className="container">
      <h1>Contact</h1>

      <p style={{ maxWidth: 600, marginTop: 12 }}>
        I’m always open to discussing new projects, opportunities, or
        collaborations. The best way to reach me is by email.
      </p>

      <ul style={{ marginTop: 24, lineHeight: 1.8 }}>
        <li>
          Email:{" "}
          <a href="mailto:anshr792@gmail.com">
            anshr792@gmail.com
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href="https://github.com/raiansh" target="_blank">
            github.com/raiansh
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/raiansh/"
            target="_blank"
          >
            linkedin.com/in/raiansh
          </a>
        </li>
      </ul>
    </main>
  );
}