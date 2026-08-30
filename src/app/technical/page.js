import { track, Events } from "../../lib/analytics";

export const metadata = {
  title: "Technical Portfolio | Ansh Rai",
  description:
    "CS student at Toronto Metropolitan University. Full-stack developer with experience in Next.js, React, databases, and data analysis. Founder of arweb.",
};

export default function TechnicalPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#2563eb" }}
          >
            Technical background
          </p>
          <h1
            className="font-heading font-bold leading-[1.06] mb-6"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            Ansh Rai
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#888" }}>
            Computer Science student at Toronto Metropolitan University, targeting database developer and data analyst roles. Founder of arweb, where I build production websites and digital systems for businesses.
          </p>
          <div className="flex flex-wrap gap-5 mt-7">
            <a
              href="https://www.linkedin.com/in/raiansh/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:text-fg"
              style={{ color: "#2563eb" }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/RaiAnsh"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:text-fg"
              style={{ color: "#2563eb" }}
            >
              GitHub ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold transition-colors hover:text-fg"
              style={{ color: "#888" }}
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-8"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Technical skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
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
            ].map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: "#555" }}>
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

        {/* Education */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-8"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Education
          </h2>
          <div
            className="p-7 rounded-2xl"
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="font-semibold mb-1" style={{ color: "#ffffff" }}>
              Toronto Metropolitan University
            </p>
            <p className="text-sm mb-1" style={{ color: "#888" }}>
              Bachelor of Science — Computer Science
            </p>
            <p className="text-xs" style={{ color: "#555" }}>
              Toronto, ON · In progress
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2
            className="font-heading font-semibold mb-8"
            style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Projects
          </h2>

          <div className="flex flex-col gap-6">
            {[
              {
                name: "arweb.co",
                desc: "Founded and built a freelance web development agency serving 10+ clients across 7+ industries. Built on Next.js, Tailwind, and Framer Motion. Handles CRM-style client pipeline, inquiry tracking, and project delivery.",
                tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
                url: "https://arweb.co",
              },
              {
                name: "MAP Canada — Admin Backend",
                desc: "Designed and built a full admin backend for a humanitarian non-profit organization. Includes member management, event tracking, content control, and reporting dashboards. Built entirely from scratch with a focus on accessibility and ease of use for non-technical staff.",
                tags: ["Next.js", "PostgreSQL", "Admin Dashboard", "Authentication"],
              },
              {
                name: "RL Contracting — Lead Generation System",
                desc: "Rebuilt the business website with an integrated AI chat assistant, SEO optimization, and automated lead routing. Resulted in a 65% increase in monthly leads tracked through the site.",
                tags: ["Next.js", "AI Integration", "SEO", "Lead Management"],
              },
              {
                name: "anshrai.com",
                desc: "This site — a full custom portfolio and client-facing business site. Particle canvas, smooth scroll via Lenis + GSAP, Framer Motion animations, 5-step quote builder with live pricing calculation, and Formspree integration.",
                tags: ["Next.js 16", "React 19", "Framer Motion", "Canvas API", "Lenis"],
                url: "https://anshrai.com",
              },
            ].map((project) => (
              <div
                key={project.name}
                className="p-7 rounded-2xl"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold" style={{ color: "#ffffff", fontSize: 16 }}>
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs transition-colors flex-shrink-0"
                      style={{ color: "#2563eb" }}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
              </div>
            ))}
          </div>
        </section>

        {/* Back to main site */}
        <div
          className="flex flex-col sm:flex-row items-start gap-5 pt-10 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <a
            href="/"
            className="text-sm font-semibold transition-colors"
            style={{ color: "#888" }}
          >
            ← Back to main site
          </a>
          <a
            href="/quote"
            className="text-sm font-semibold transition-colors"
            style={{ color: "#2563eb" }}
          >
            Get a quote for your project →
          </a>
        </div>
      </div>
    </main>
  );
}
