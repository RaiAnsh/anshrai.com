"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────
//  RecruiterSection
//  For tech recruiters — CS student at TMU
//  Targeting: Database Developer · Data Analyst
// ─────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1];

const SKILLS = [
  { label: "SQL / PostgreSQL",   level: 90 },
  { label: "Python",             level: 82 },
  { label: "React / Next.js",    level: 95 },
  { label: "Database Design",    level: 88 },
  { label: "Data Analysis",      level: 80 },
  { label: "Node.js / REST APIs",level: 85 },
];

const TAGS = [
  "PostgreSQL", "MySQL", "SQLite",
  "Python", "Pandas", "NumPy",
  "React", "Next.js", "TypeScript",
  "Node.js", "REST APIs", "GraphQL",
  "Git", "Linux", "Vercel",
  "Tailwind CSS", "Framer Motion",
];

function SkillBar({ label, level, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--fg-dim)" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)" }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height:       3,
          borderRadius: 9999,
          background:   "rgba(255,255,255,0.06)",
          overflow:     "hidden",
        }}
      >
        <motion.div
          style={{
            height:       "100%",
            borderRadius: 9999,
            background:   "linear-gradient(90deg, var(--accent), rgba(37,99,235,0.6))",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.0, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
    </div>
  );
}

export default function RecruiterSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="recruiter"
      style={{
        background: "#080808",
        padding:    "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Section label */}
      <motion.p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--accent)",
          marginBottom:  "1.25rem",
          display:       "flex",
          alignItems:    "center",
          gap:           "0.5rem",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
      >
        <span
          style={{
            width:     7,
            height:    7,
            borderRadius:"50%",
            background:"#22c55e",
            display:   "block",
            boxShadow: "0 0 6px rgba(34,197,94,0.6)",
          }}
        />
        For Tech Recruiters
      </motion.p>

      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "clamp(48px,8vw,120px)",
          alignItems:          "start",
        }}
      >
        {/* ── Left: bio ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(36px, 4.5vw, 64px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
              color:         "#ffffff",
              marginBottom:  "1.5rem",
            }}
          >
            CS student.{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
              Builder.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "1.5rem",
            }}
          >
            Computer Science student at Toronto Metropolitan University (TMU) with hands-on experience
            building production web applications and data-driven systems for real clients.
            Currently seeking opportunities as a <strong style={{ color: "#ffffff", fontWeight: 500 }}>Database Developer</strong> or{" "}
            <strong style={{ color: "#ffffff", fontWeight: 500 }}>Data Analyst</strong>.
          </p>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "2rem",
            }}
          >
            I don't just study computer science — I apply it. From managing PostgreSQL databases to building
            full-stack platforms with authentication and dashboards, every project here is something a real
            business paid for and uses today.
          </p>

          {/* Target roles */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "0.75rem",
              marginBottom:  "2rem",
              padding:       "1.5rem",
              background:    "rgba(37,99,235,0.05)",
              border:        "1px solid rgba(37,99,235,0.14)",
              borderRadius:  16,
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: 0 }}>
              Target Roles
            </p>
            {["Database Developer", "Data Analyst", "Junior Full-Stack Developer"].map((role) => (
              <div key={role} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", display: "block", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  {role}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://github.com/RaiAnsh"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: 13 }}
            >
              GitHub Profile ↗
            </a>
            <a
              href="mailto:info@anshrai.com?subject=Recruitment Opportunity"
              className="btn-ghost"
              style={{ fontSize: 13 }}
            >
              Contact me
            </a>
          </div>
        </motion.div>

        {/* ── Right: skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          {/* Skill bars */}
          <div
            style={{
              background:    "#0f0f0f",
              border:        "1px solid rgba(255,255,255,0.06)",
              borderRadius:  20,
              padding:       "clamp(24px,4vw,40px)",
              marginBottom:  "1.25rem",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
              Core Skills
            </p>
            {SKILLS.map((sk, i) => (
              <SkillBar key={sk.label} label={sk.label} level={sk.level} index={i} />
            ))}
          </div>

          {/* Tech tags */}
          <div
            style={{
              background:    "#0f0f0f",
              border:        "1px solid rgba(255,255,255,0.06)",
              borderRadius:  20,
              padding:       "clamp(20px,3vw,32px)",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
              Technologies
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {TAGS.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily:   "var(--font-ui)",
                    fontSize:     11,
                    padding:      "0.25rem 0.7rem",
                    borderRadius: 9999,
                    background:   "rgba(255,255,255,0.04)",
                    border:       "1px solid rgba(255,255,255,0.07)",
                    color:        "var(--fg-dim)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
