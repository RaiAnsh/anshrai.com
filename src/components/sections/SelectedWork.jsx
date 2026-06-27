"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients } from "../../data/clients";
import { projects } from "../../data/projects";
import Link from "next/link";

const tabs = [
  { id: "all",  label: "All" },
  { id: "web",  label: "Web Design" },
  { id: "data", label: "Data & Analytics" },
];

const statusColor = (s) =>
  s === "Completed" ? "#4ade80" : s === "Planned" ? "#7c3aed" : "#60a5fa";

function WebRow({ c, i, hovered, setHovered }) {
  return (
    <motion.div
      className="group relative border-t last:border-b cursor-pointer"
      style={{ borderColor: "rgba(240,237,229,0.07)" }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered === i ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: c.bg }}
      />

      <div className="relative flex items-center gap-4 md:gap-8 py-7 md:py-9">
        <span
          className="text-xs tabular-nums flex-shrink-0 w-6 transition-colors duration-200"
          style={{ color: hovered === i ? c.accent : "#706c69" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div
            className="font-serif transition-colors duration-200"
            style={{
              fontSize: "clamp(22px, 3.5vw, 44px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: hovered === i ? "#f0ede5" : "#c8c4be",
            }}
          >
            {c.name}
          </div>
          <div
            className="text-xs mt-1 font-medium tracking-wide transition-colors duration-200"
            style={{ color: hovered === i ? c.accent : "#706c69" }}
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
                borderColor: hovered === i ? c.border : "rgba(240,237,229,0.08)",
                color: "#706c69",
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
            borderColor: hovered === i ? c.border : "rgba(240,237,229,0.1)",
            color: hovered === i ? c.accent : "#706c69",
          }}
        >
          Visit ↗
        </a>
      </div>

      {/* Hover iframe preview */}
      <AnimatePresence>
        {hovered === i && (
          <motion.div
            className="absolute right-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block"
            initial={{ opacity: 0, scale: 0.88, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              className="w-80 h-52 rounded-2xl overflow-hidden border shadow-2xl"
              style={{
                borderColor: c.border,
                background: c.bg,
                boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${c.border}`,
              }}
            >
              <iframe
                src={c.url}
                title={c.name}
                scrolling="no"
                style={{
                  width: "200%",
                  height: "400px",
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

function DataCard({ p, i }) {
  return (
    <motion.div
      className="group border rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "rgba(37,99,235,0.15)",
        background: "rgba(37,99,235,0.03)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        borderColor: "rgba(37,99,235,0.3)",
        background: "rgba(37,99,235,0.06)",
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-fg leading-snug flex-1">{p.title}</h3>
        <span
          className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full"
          style={{
            color: statusColor(p.status),
            background: `${statusColor(p.status)}18`,
            border: `1px solid ${statusColor(p.status)}30`,
          }}
        >
          {p.status}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#706c69" }}>{p.desc}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full border"
            style={{ borderColor: "rgba(37,99,235,0.2)", color: "#706c69" }}
          >
            {t}
          </span>
        ))}
      </div>

      {p.href && (
        <Link
          href={p.href}
          className="inline-flex items-center gap-1 text-xs font-semibold hover:underline underline-offset-2 transition-colors"
          style={{ color: "#2563eb" }}
        >
          View case study →
        </Link>
      )}
    </motion.div>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState(null);

  const showWeb  = filter === "all" || filter === "web";
  const showData = filter === "all" || filter === "data";

  return (
    <section id="work" className="px-6 md:px-12 py-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#2563eb" }}>
            Portfolio
          </p>
          <h2
            className="font-serif text-fg"
            style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Featured work
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-full self-start md:self-auto"
          style={{ background: "rgba(240,237,229,0.05)", border: "1px solid rgba(240,237,229,0.08)" }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setFilter(t.id); setHovered(null); }}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: filter === t.id ? "#2563eb" : "transparent",
                color: filter === t.id ? "#fff" : "#706c69",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Web Design — row list */}
        <AnimatePresence mode="wait">
          {showWeb && (
            <motion.div
              key="web-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showData && (
                <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#706c69" }}>
                  Web Design · {clients.length} sites
                </p>
              )}
              <div>
                {clients.map((c, i) => (
                  <WebRow key={c.name} c={c} i={i} hovered={hovered} setHovered={setHovered} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider between web + data when both showing */}
        {showWeb && showData && (
          <div className="my-16 flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: "rgba(240,237,229,0.07)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#706c69" }}>Data & Analytics</span>
            <div className="flex-1 h-px" style={{ background: "rgba(240,237,229,0.07)" }} />
          </div>
        )}

        {/* Data projects — card grid */}
        <AnimatePresence mode="wait">
          {showData && (
            <motion.div
              key="data-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!showWeb && (
                <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#706c69" }}>
                  Data & Analytics · {projects.length} projects
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((p, i) => (
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
