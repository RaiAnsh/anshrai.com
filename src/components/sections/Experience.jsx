"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const jobs = [
  {
    company: "arweb Solutions",
    url: "https://arwebsolutions.ca",
    role: "Founder & Full Stack Developer",
    period: "2024 – Present",
    location: "Toronto, ON",
    bullets: [
      "Managed the full lifecycle of technical projects for 15+ small business clients — requirements gathering, development, testing, and deployment — without missing a client deadline",
      "Served as the primary client and technical contact; one client saw a 65% increase in leads after their site launched",
      "Run B2B sales and outreach including cold email campaigns, lead tracking, and proposals to find and win new clients",
      "Troubleshot and resolved production issues involving DNS, domains, hosting, and deployment configuration",
    ],
  },
  {
    company: "Alpha Healthcare",
    url: null,
    role: "Data Entry",
    period: "July 2025 – Present",
    location: "North York, ON",
    bullets: [
      "Process patient and laboratory information across multiple internal systems following data-entry, privacy, and compliance procedures in a regulated healthcare environment",
      "Coordinate with laboratory and administrative staff to investigate and resolve data discrepancies across operational workflows",
    ],
  },
  {
    company: "Z3 Education Centre",
    url: null,
    role: "Technical Instructor & Business Outreach Coordinator",
    period: "Apr 2024 – Sept 2024",
    location: "Toronto, ON",
    bullets: [
      "Delivered technical instruction to 20+ students while coordinating communication and relationships with 10+ external organizations",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
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
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>

        <motion.h2
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: "0 0 56px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          Where I&apos;ve worked
        </motion.h2>

        <div>
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px,220px) 1fr",
                gap: "clamp(24px,4vw,48px)",
                padding: "clamp(24px,3vw,36px) 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Left: company + meta */}
              <div style={{ paddingTop: 2 }}>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#ffffff",
                    margin: "0 0 6px",
                  }}
                >
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {job.company}{" "}
                      <span style={{ color: "#2563eb", fontSize: 12 }}>↗</span>
                    </a>
                  ) : (
                    job.company
                  )}
                </p>
                <p style={{ fontSize: 12, color: "#5a5a6c", margin: "0 0 2px" }}>
                  {job.period}
                </p>
                <p style={{ fontSize: 12, color: "#5a5a6c", margin: 0 }}>
                  {job.location}
                </p>
              </div>

              {/* Right: role + bullets */}
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "#888898",
                    margin: "0 0 14px",
                  }}
                >
                  {job.role}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: 14,
                        color: "#5a5a6c",
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          marginTop: 8,
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "#2563eb",
                          flexShrink: 0,
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
