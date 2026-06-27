"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clients } from "../../data/clients";
import { projects } from "../../data/projects";

const ease = [0.16, 1, 0.3, 1];

const tabs = [
  { id: "all",      label: "All" },
  { id: "web",      label: "Web Development" },
  { id: "data",     label: "Data & Analytics" },
  { id: "database", label: "Databases" },
];

const statusColor = (s) =>
  s === "Completed" ? "#4ade80" : s === "Planned" ? "#888888" : "#60a5fa";

/* ── Web client card (full-width row) ── */
function WebCard({ c, i, hovered, setHovered }) {
  const isHov = hovered === `web-${i}`;
  return (
    <motion.div
      className="group relative border-t last:border-b"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setHovered(`web-${i}`)}
      onMouseLeave={() => setHovered(null)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05, ease }}
    >
      {/* Hover bg */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{ background: "rgba(37,99,235,0.04)", opacity: isHov ? 1 : 0 }}
      />

      <div className="relative flex items-center gap-4 md:gap-8 py-7 md:py-8">
        <span
          className="text-xs tabular-nums flex-shrink-0 w-6 transition-colors duration-200"
          style={{ color: isHov ? "#2563eb" : "rgba(136,136,136,0.4)" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div
            className="font-heading font-semibold transition-colors duration-200"
            style={{
              fontSize: "clamp(20px, 3vw, 40px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: isHov ? "#ffffff" : "#aaaaaa",
            }}
          >
            {c.name}
          </div>
          <div
            className="text-xs mt-1 font-medium tracking-wide transition-colors duration-200"
            style={{ color: isHov ? "#2563eb" : "#555555" }}
          >
            {c.type}
          </div>
        </div>

        <div className="hidden lg:flex gap-2 flex-shrink-0">
          {c.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full border transition-colors duration-200"
              style={{
                borderColor: isHov ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.06)",
                color: "#555555",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={c.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105"
          style={{
            borderColor: isHov ? "rgba(37,99,235,0.35)" : "rgba(255,255,255,0.07)",
            color: isHov ? "#2563eb" : "#555555",
          }}
        >
          Visit ↗
        </a>
      </div>

      {/* Hover iframe preview */}
      <AnimatePresence>
        {isHov && c.url && (
          <motion.div
            className="absolute right-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden xl:block"
            initial={{ opacity: 0, scale: 0.88, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="w-72 h-48 rounded-2xl overflow-hidden"
              style={{
                background: "#111111",
                border: "1px solid rgba(37,99,235,0.2)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,99,235,0.15)",
              }}
            >
              <iframe
                src={c.url}
                title={c.name}
                scrolling="no"
                style={{
                  width: "200%", height: "384px",
                  border: "none",
                  transform: "scale(0.5) translateY(-25%)",
                  transformOrigin: "top left",
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
  const [filter, setFilter]   = useState("all");
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  const showWeb  = filter === "all" || filter === "web";
  const showData = filter === "all" || filter === "data" || filter === "database";

  const dataProjects = filter === "database"
    ? projects.filter((p) => p.tags.some((t) => ["PostgreSQL", "SQL", "BigQuery", "MongoDB", "DB Design"].includes(t)))
    : filter === "data"
    ? projects.filter((p) => p.tags.some((t) => ["Tableau", "pandas", "scikit-learn", "Google Sheets"].includes(t)))
    : projects;

  return (
    <section id="work" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }} ref={ref}>
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

        {/* Web clients list */}
        <AnimatePresence mode="wait">
          {showWeb && (
            <motion.div
              key="web"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {showData && (
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#555555" }}>
                  Web Design · {clients.length} sites
                </p>
              )}
              {clients.map((c, i) => (
                <WebCard key={c.name} c={c} i={i} hovered={hovered} setHovered={setHovered} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {showWeb && showData && (
          <div className="flex items-center gap-6 my-14">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#555555" }}>Data & Analytics</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        )}

        {/* Data projects grid */}
        <AnimatePresence mode="wait">
          {showData && (
            <motion.div
              key="data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {!showWeb && (
                <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#555555" }}>
                  Data & Analytics · {dataProjects.length} projects
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                {dataProjects.map((p, i) => (
                  <DataCard key={p.slug} p={p} i={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
