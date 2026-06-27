"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Web Design & Development",
    desc: "Modern, high-performance websites for local businesses and founders. Mobile-first, fast-loading, and built to convert visitors into clients. 8 live sites and counting.",
    tags: ["Next.js", "React", "Tailwind CSS", "SEO", "Mobile-First"],
    accent: "#2563eb",
    stat: "8 live sites delivered",
    href: "/arweb",
    hrefLabel: "See arweb.co ↗",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Database Development",
    desc: "End-to-end relational database design: normalized schemas, Python ETL pipelines, and 20+ analytical SQL queries. Built for data integrity and query performance.",
    tags: ["PostgreSQL", "Python", "ETL", "Star Schema", "SQLAlchemy"],
    accent: "#7c3aed",
    stat: "4 data projects",
    href: "#projects",
    hrefLabel: "See projects ↓",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "Data Analytics",
    desc: "Turn raw data into actionable insights. Tableau KPI dashboards, BigQuery analysis, and Python-powered churn analysis — designed for non-technical stakeholders.",
    tags: ["Tableau", "BigQuery", "pandas", "scikit-learn", "SQL"],
    accent: "#0ea5e9",
    stat: "10K+ row datasets analyzed",
    href: "#projects",
    hrefLabel: "See projects ↓",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 md:px-12 py-28" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What I Build
        </motion.p>

        <motion.h2
          className="font-serif text-fg mb-16"
          style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1 }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Three ways I can<br />
          <span style={{ color: "#2563eb" }}>add value.</span>
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="group relative rounded-2xl p-8 flex flex-col transition-all duration-300"
              style={{
                border: `1px solid ${s.accent}22`,
                background: "rgba(240,237,229,0.02)",
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Top gradient border */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 60px ${s.accent}0a, 0 0 40px ${s.accent}10` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
                style={{ background: `${s.accent}12`, color: s.accent }}
              >
                {s.icon}
              </div>

              {/* Content */}
              <h3
                className="font-semibold text-fg text-lg mb-3 leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#706c69" }}>
                {s.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${s.accent}22`, color: "#706c69" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: `${s.accent}18` }}>
                <span className="text-xs font-semibold" style={{ color: s.accent }}>
                  {s.stat}
                </span>
                <a
                  href={s.href}
                  className="text-xs font-semibold transition-colors duration-150 hover:opacity-80"
                  style={{ color: s.accent }}
                >
                  {s.hrefLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
