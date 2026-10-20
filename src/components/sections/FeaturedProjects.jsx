"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "../../data/projects";

const ease = [0.16, 1, 0.3, 1];

const tabs = [
  { id: "all",      label: "All" },
  { id: "data",     label: "Data & Analytics" },
  { id: "database", label: "Databases" },
  { id: "web",      label: "Web" },
];

const statusColor = (s) =>
  s === "Completed" ? "#4ade80" : s === "Planned" ? "#888888" : "#60a5fa";

/* ── Data project card ── */
function DataCard({ p, i }) {
  return (
    <motion.div
      className="group rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: i * 0.08, ease }}
      whileHover={{ borderColor: "rgba(37,99,235,0.2)", transition: { duration: 0.2 } }}
    >
      {/* Top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),transparent)" }}
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-heading font-semibold text-fg leading-snug flex-1" style={{ fontSize: "clamp(15px,1.6vw,18px)", letterSpacing: "-0.02em" }}>
          {p.title}
        </h3>
        <span
          className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full"
          style={{
            color: statusColor(p.status),
            background: `${statusColor(p.status)}14`,
            border: `1px solid ${statusColor(p.status)}30`,
          }}
        >
          {p.status}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#888888" }}>{p.desc}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {p.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full"
            style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.14)", color: "#888888" }}
          >
            {t}
          </span>
        ))}
      </div>

      {p.href && (
        <Link
          href={p.href}
          className="inline-flex items-center gap-1 text-xs font-semibold hover:underline underline-offset-2"
          style={{ color: "#2563eb" }}
        >
          View project →
        </Link>
      )}
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [filter, setFilter] = useState("all");

  const dataProjects = filter === "database"
    ? projects.filter((p) => p.tags.some((t) => ["PostgreSQL", "SQL", "BigQuery", "MongoDB", "DB Design"].includes(t)))
    : filter === "data"
    ? projects.filter((p) => p.tags.some((t) => ["Tableau", "pandas", "scikit-learn", "Google Sheets"].includes(t)))
    : filter === "web"
    ? projects.filter((p) => p.tags.some((t) => ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"].includes(t)))
    : projects;

  return (
    <section id="work" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "#2563eb" }}>
              Featured Work
            </p>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1, color: "#ffffff" }}
            >
              A selection of projects
              <br />
              <span style={{ color: "#2563eb" }}>that create impact.</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-full self-start md:self-auto flex-shrink-0"
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setFilter(t.id); setHovered(null); }}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: filter === t.id ? "#2563eb" : "transparent",
                  color: filter === t.id ? "#ffffff" : "#888888",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#555555" }}>
              {dataProjects.length} project{dataProjects.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
              {dataProjects.map((p, i) => (
                <DataCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
