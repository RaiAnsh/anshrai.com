"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const coursework = [
  "Artificial Intelligence I",
  "Software Engineering I",
  "Big Data Systems",
  "Database Design",
  "Cybersecurity",
];

const skills = [
  { label: "Languages", items: "Python, SQL, JavaScript, TypeScript, Lua" },
  { label: "Data & Analysis", items: "Tableau, Excel, pandas, relational databases, statistics" },
  { label: "Development", items: "React, Next.js, Node.js, Flask, Tailwind CSS, REST APIs" },
  { label: "Databases", items: "MongoDB, PostgreSQL, IndexedDB" },
  { label: "Tools", items: "Git, GitHub Actions, Vercel, Railway, Vitest, Microsoft 365" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(80px,12vh,120px) clamp(24px,8vw,96px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px,6vw,80px)",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <motion.p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2563eb",
              marginBottom: 10,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          <motion.h2
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: "0 0 24px",
              lineHeight: 1.08,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            Student.{" "}
            <span style={{ color: "#2563eb" }}>Builder.</span>{" "}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Founder.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "#5a5a6c",
                margin: "0 0 16px",
              }}
            >
              I&apos;m a CS student at Toronto Metropolitan University with
              hands-on experience building production apps and data systems for
              real clients. I got into tech building websites for local
              businesses that were losing customers online — and kept going from
              there.
            </p>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "#5a5a6c",
                margin: 0,
              }}
            >
              I run arweb Solutions on the side, targeting Database Developer
              and Data Analyst roles while completing my degree in 2028.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{
              marginTop: 32,
              padding: "20px 24px",
              borderRadius: 16,
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5a5a6c",
                margin: "0 0 10px",
              }}
            >
              Education
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", margin: "0 0 2px" }}>
              Toronto Metropolitan University
            </p>
            <p style={{ fontSize: 13, color: "#888898", margin: "0 0 14px" }}>
              B.Sc. Computer Science · Expected April 2028
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {coursework.map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#5a5a6c",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5a5a6c",
              margin: "0 0 20px",
            }}
          >
            Technical Skills
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {skills.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "#888898",
                    paddingTop: 1,
                  }}
                >
                  {s.label}
                </span>
                <span style={{ fontSize: 13, color: "#5a5a6c", lineHeight: 1.5 }}>
                  {s.items}
                </span>
              </div>
            ))}
          </div>

          {/* Target roles */}
          <div
            style={{
              marginTop: 28,
              padding: "20px 24px",
              borderRadius: 16,
              background: "rgba(37,99,235,0.05)",
              border: "1px solid rgba(37,99,235,0.14)",
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#2563eb",
                margin: "0 0 12px",
              }}
            >
              Seeking
            </p>
            {["Database Developer", "Data Analyst", "Junior Full-Stack Developer"].map((role) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#2563eb",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                  {role}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
