"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const services = [
  {
    num: "01",
    title: "Web Development",
    desc: "Modern, high-performance websites for local businesses and founders. Mobile-first, SEO-optimized, and built to convert visitors into clients. 8 live sites delivered through arweb.co.",
    tags: ["Next.js", "React", "Tailwind CSS", "SEO", "Mobile-First"],
    stat: "8 live sites",
    href: "/arweb",
    cta: "See arweb.co ↗",
  },
  {
    num: "02",
    title: "Software & Systems",
    desc: "Custom software, automation, and backend solutions. From normalized PostgreSQL schemas and ETL pipelines to full-stack web apps — I build for performance and maintainability.",
    tags: ["PostgreSQL", "Python", "Node.js", "REST APIs", "MongoDB"],
    stat: "4+ projects",
    href: "#work",
    cta: "See projects ↓",
  },
  {
    num: "03",
    title: "Data & Analytics",
    desc: "Turn raw data into actionable insights. SQL-powered ETL pipelines, Tableau KPI dashboards, and Python-driven analysis — designed for decision-makers, not just engineers.",
    tags: ["SQL", "Python", "Tableau", "BigQuery", "pandas"],
    stat: "10K+ rows analyzed",
    href: "#work",
    cta: "See projects ↓",
  },
];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }} ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What I Do
        </motion.p>

        <motion.h2
          className="font-heading font-bold mb-16"
          style={{
            fontSize: "clamp(32px, 5vw, 62px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "#ffffff",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Technology that solves
          <br />
          <span style={{ color: "#2563eb" }}>real business problems.</span>
        </motion.h2>

        {/* Service rows — horizontal premium layout */}
        <div className="flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              className="group flex flex-col md:flex-row items-start md:items-center gap-8 py-10 border-t last:border-b transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease }}
            >
              {/* Number */}
              <span
                className="text-xs font-semibold tabular-nums flex-shrink-0 w-8 pt-1"
                style={{ color: "rgba(37,99,235,0.5)" }}
              >
                {s.num}
              </span>

              {/* Title */}
              <h3
                className="font-heading font-semibold flex-shrink-0 transition-colors duration-200 group-hover:text-accent"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  minWidth: "clamp(180px, 22vw, 280px)",
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="flex-1 leading-relaxed text-sm md:text-base"
                style={{ color: "#888888", maxWidth: 420 }}
              >
                {s.desc}
              </p>

              {/* Tags + CTA */}
              <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-4">
                <div className="flex flex-wrap gap-2">
                  {s.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(37,99,235,0.08)",
                        border: "1px solid rgba(37,99,235,0.15)",
                        color: "#888888",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="text-xs font-semibold" style={{ color: "#2563eb" }}>
                    {s.stat}
                  </span>
                  <a
                    href={s.href}
                    className="text-xs font-semibold transition-colors hover:text-fg"
                    style={{ color: "#888888" }}
                  >
                    {s.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
