"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "../../data/projects";

const ease = [0.16, 1, 0.3, 1];

const statusColor = (s) =>
  s === "Completed" ? "#4ade80" : s === "In Progress" ? "#60a5fa" : "#888888";

function ProjectCard({ p, i }) {
  return (
    <motion.div
      className="rounded-2xl p-7 flex flex-col"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease }}
      whileHover={{
        borderColor: "rgba(37,99,235,0.2)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),transparent)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: "clamp(15px,1.6vw,18px)",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            lineHeight: 1.3,
            flex: 1,
            margin: 0,
          }}
        >
          {p.title}
        </h3>
        <span
          style={{
            flexShrink: 0,
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 9999,
            color: statusColor(p.status),
            background: `${statusColor(p.status)}14`,
            border: `1px solid ${statusColor(p.status)}30`,
          }}
        >
          {p.status}
        </span>
      </div>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "#888888",
          marginBottom: 20,
          flex: 1,
        }}
      >
        {p.desc}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: p.href ? 20 : 0,
        }}
      >
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 11,
              padding: "4px 10px",
              borderRadius: 9999,
              background: "rgba(37,99,235,0.07)",
              border: "1px solid rgba(37,99,235,0.14)",
              color: "#888888",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {p.href && (
        <a
          href={p.href}
          target={p.href.startsWith("http") ? "_blank" : undefined}
          rel={p.href.startsWith("http") ? "noreferrer" : undefined}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: "#2563eb",
            textDecoration: "none",
          }}
        >
          View project ↗
        </a>
      )}
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="work"
      style={{
        padding: "clamp(80px,12vh,120px) clamp(24px,8vw,96px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#2563eb",
            marginBottom: 10,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.p>

        <motion.h2
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: "0 0 48px",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Things I&apos;ve built
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,380px),1fr))",
            gap: 20,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
