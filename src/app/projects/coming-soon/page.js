"use client";

import { useSearchParams } from "next/navigation";
import { projects } from "../../../data/projects";
import Link from "next/link";

export default function ComingSoon() {
  const params = useSearchParams();
  const slug = params.get("project");

  const project = projects.find((p) => p.slug === slug);

  return (
    <main className="container">
      <section className="sectionCard">
        <h1 style={{ marginBottom: 8 }}>
          {project ? project.title : "This project"}
        </h1>

        <p style={{ opacity: 0.9 }}>
          This project page is still in progress.
        </p>

        <p style={{ opacity: 0.85 }}>
          I’m currently building this project. Check back soon for a full
          write-up, screenshots, and a live demo.
        </p>

        <div className="btnRow">
          <Link className="btnPrimary" href="/projects">
            ← Back to Projects
          </Link>
          <Link className="btnGhost" href="/">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}