import Link from "next/link";
import VehicleGradePreview from "../../components/VehicleGradePreview";

export const metadata = {
  title: "Technical Portfolio | Ansh Rai",
  description:
    "CS student at Toronto Metropolitan University. Full-stack developer with experience in Next.js, React, databases, and data analysis. Founder of arweb.",
};

const SKILLS = [
  {
    category: "Languages",
    items: ["JavaScript / TypeScript", "Python", "SQL", "Java", "C"],
  },
  {
    category: "Frontend",
    items: ["React / Next.js", "Tailwind CSS", "Framer Motion", "HTML / CSS"],
  },
  {
    category: "Backend & Databases",
    items: ["Node.js", "PostgreSQL", "MySQL", "Firebase", "REST APIs"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git / GitHub", "Vercel", "Figma", "Formspree", "Google Analytics"],
  },
];

const PROJECTS = [
  {
    name: "VehicleGrade",
    status: "In development",
    desc: "A data-driven platform for grading and comparing used vehicles based on public listing data. Aggregates listings, normalizes condition/mileage/price signals, and scores vehicles against comparable market inventory. Built to help buyers make smarter purchase decisions without dealership pressure.",
    tech: ["Next.js", "PostgreSQL", "Python", "Data Pipeline", "Web Scraping", "REST API"],
    github: null,
    url: null,
    highlight: true,
  },
  {
    name: "arweb.co",
    status: "Live",
    desc: "Founded and built a freelance web development agency serving 10+ clients across 7+ industries. Full project pipeline: inquiry → scoping → design → development → launch → support. Handles CRM-style client tracking internally.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: null,
    url: "https://arweb.co",
  },
  {
    name: "MAP Canada — Admin Backend",
    status: "Live",
    desc: "Full admin backend for a humanitarian non-profit. Member management, event tracking, media library, subscriber management, contact submission tracking, and audit logging. Built for non-technical staff with a clean, accessible interface.",
    tech: ["Next.js", "PostgreSQL", "Authentication", "Admin Dashboard"],
    github: null,
    url: null,
  },
  {
    name: "RL Contracting — Lead System",
    status: "Live",
    desc: "Rebuilt website with integrated AI chat assistant, SEO structure, and automated lead routing. 65% increase in monthly leads from organic search — no paid ads.",
    tech: ["Next.js", "AI Integration", "On-page SEO", "Lead Management"],
    github: null,
    url: "https://rlcontracting.ca",
  },
  {
    name: "anshrai.com",
    status: "Live",
    desc: "This site. Particle canvas, Lenis + GSAP smooth scroll, Framer Motion animations throughout, 5-step quote wizard with live pricing calculation, Formspree integration, and GA4 analytics.",
    tech: ["Next.js 16", "React 19", "Framer Motion", "Canvas API", "Lenis + GSAP"],
    github: "https://github.com/RaiAnsh/anshrai.com",
    url: "https://anshrai.com",
  },
];

export default function TechnicalPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-24">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#2563eb" }}
          >
            Technical Portfolio
          </p>
          <h1
            className="font-heading font-bold leading-[1.06] mb-6"
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            Ansh Rai
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: "#888", lineHeight: 1.7 }}>
            CS student at Toronto Metropolitan University. I build production software — web apps, data pipelines, and full-stack systems. Founder of arweb, targeting database developer and data analyst roles.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.linkedin.com/in/raiansh/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:brightness-125"
              style={{ color: "#2563eb" }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/RaiAnsh"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:brightness-125"
              style={{ color: "#2563eb" }}
            >
              GitHub ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:text-fg"
              style={{ color: "#555" }}
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>

        {/* ── Education ── */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-6"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Education
          </h2>
          <div
            className="p-7 rounded-2xl"
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold mb-1" style={{ color: "#ffffff", fontSize: 16 }}>
                  Toronto Metropolitan University
                </p>
                <p className="text-sm" style={{ color: "#888" }}>
                  Bachelor of Science — Computer Science
                </p>
              </div>
              <span
                className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                style={{
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "#6b9df7",
                }}
              >
                In progress
              </span>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-6"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Technical skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#444" }}>
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "#888",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-6"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Projects
          </h2>
          <div className="flex flex-col gap-5">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="p-7 rounded-2xl"
                style={{
                  background: "#111111",
                  border: project.highlight
                    ? "1px solid rgba(37,99,235,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold" style={{ color: "#ffffff", fontSize: 16 }}>
                      {project.name}
                    </h3>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{
                        background: project.status === "In development"
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(34,197,94,0.1)",
                        border: project.status === "In development"
                          ? "1px solid rgba(245,158,11,0.2)"
                          : "1px solid rgba(34,197,94,0.2)",
                        color: project.status === "In development" ? "#f59e0b" : "#22c55e",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs transition-colors"
                        style={{ color: "#555" }}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs transition-colors"
                        style={{ color: "#2563eb" }}
                      >
                        Visit ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs"
                      style={{
                        background: "rgba(37,99,235,0.08)",
                        border: "1px solid rgba(37,99,235,0.15)",
                        color: "#6b9df7",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* VehicleGrade: live multi-page preview */}
                {project.highlight && <VehicleGradePreview />}
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer links ── */}
        <div
          className="flex flex-col sm:flex-row items-start gap-5 pt-10 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <Link
            href="/"
            className="text-sm font-semibold transition-colors hover:text-fg"
            style={{ color: "#555" }}
          >
            ← Back to main site
          </Link>
          <Link
            href="/work"
            className="text-sm font-semibold transition-colors"
            style={{ color: "#888" }}
          >
            View client work →
          </Link>
          <Link
            href="/quote"
            className="text-sm font-semibold transition-colors"
            style={{ color: "#2563eb" }}
          >
            Get a quote →
          </Link>
        </div>
      </div>
    </main>
  );
}
