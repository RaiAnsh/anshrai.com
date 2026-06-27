"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const categories = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "HTML & CSS", "Framer Motion", "GSAP"],
  },
  {
    label: "Backend",
    items: ["Python", "Node.js", "Flask", "REST APIs", "Authentication"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "BigQuery", "SQL", "SQLAlchemy", "Schema Design"],
  },
  {
    label: "Data & Analytics",
    items: ["pandas", "scikit-learn", "Tableau", "Google Sheets", "ETL Pipelines", "Data Visualization"],
  },
  {
    label: "Tools & Cloud",
    items: ["Git & GitHub", "Vercel", "Google Cloud", "VS Code", "Figma"],
  },
  {
    label: "Business",
    items: ["Web Design", "SEO", "UX Thinking", "Client Communication", "Project Management"],
  },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }} ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Skills & Tools
        </motion.p>

        <motion.h2
          className="font-heading font-bold mb-16"
          style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#ffffff",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Built with the right tools
          <br />
          <span style={{ color: "#2563eb" }}>for every job.</span>
        </motion.h2>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              className="p-8 group"
              style={{ background: "#090909" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-5 rounded-full" style={{ background: "#2563eb" }} />
                <p
                  className="font-heading font-semibold text-sm uppercase tracking-wider"
                  style={{ color: "#ffffff", letterSpacing: "0.08em" }}
                >
                  {cat.label}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 group/item"
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                      style={{ background: "rgba(37,99,235,0.4)" }}
                    />
                    <span
                      className="text-sm transition-colors duration-200 group-hover/item:text-fg"
                      style={{ color: "#888888" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
