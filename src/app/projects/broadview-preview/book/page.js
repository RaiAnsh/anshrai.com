export default function Book() {
  return (
    <main className="bvSection">
      <h2 style={{ fontSize: 36, marginBottom: 14 }}>Book</h2>
      <p style={{ opacity: 0.85, fontSize: 18, marginBottom: 28 }}>
        This is a preview page. In the real client site, the Book button links to the
        booking system.
      </p>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <a className="bvBtn" href="https://www.broadviewbarbersalon.ca/" target="_blank" rel="noreferrer">
          Open Live Client Site
        </a>
        <a className="bvBtn" href="/projects">
          Back to Portfolio
        </a>
      </div>
    </main>
  );
}