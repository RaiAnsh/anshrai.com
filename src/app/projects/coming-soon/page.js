"use client";

import { useSearchParams } from "next/navigation";

export default function ComingSoonPage() {
  const params = useSearchParams();
  const project = params.get("project") || "This project";

  return (
    <main className="container">
      <h1>{project}</h1>
      <p style={{ maxWidth: 700, opacity: 0.9 }}>
        This project page is being built right now. I’ll publish the full case
        study soon — including screenshots, tech details, and results.
      </p>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href="/projects"
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          ← Back to Projects
        </a>

        <a
          href="/"
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}