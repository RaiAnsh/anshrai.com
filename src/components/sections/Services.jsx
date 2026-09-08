"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    num:   "01",
    title: "Website Design & Development",
    desc:  "Custom-coded websites that load fast, rank on Google, and turn visitors into customers. No templates, no page builders.",
    tags:  ["Next.js", "React", "Tailwind", "Framer Motion"],
    icon:  "🖥",
  },
  {
    num:   "02",
    title: "Business Systems & Dashboards",
    desc:  "Internal tools, admin panels, and client portals with authentication, databases, and real-time data management.",
    tags:  ["PostgreSQL", "Auth", "APIs", "Admin Panels"],
    icon:  "⚙",
  },
  {
    num:   "03",
    title: "SEO & Performance",
    desc:  "Technical SEO setup, on-page optimization, and performance tuning to get your business found and keep visitors engaged.",
    tags:  ["SEO", "Core Web Vitals", "Analytics", "Indexing"],
    icon:  "📈",
  },
  {
    num:   "04",
    title: "AI Integrations",
    desc:  "AI chat assistants, lead qualification bots, and smart automation that work around the clock — while you don't.",
    tags:  ["AI Chat", "Lead Capture", "24/7 Automation"],
    icon:  "🤖",
  },
  {
    num:   "05",
    title: "Ongoing Support & Retainers",
    desc:  "Monthly hosting, updates, security patches, and priority support so your site stays fast, fresh, and issue-free.",
    tags:  ["Hosting", "Maintenance", "Priority Support"],
    icon:  "🛡",
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="services"
      style={{
        position:   "relative",
        background: "linear-gradient(180deg, #080808 0%, #090d1a 40%, #080808 100%)",
        padding:    "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
        overflow:   "hidden",
      }}
    >
      {/* Background blue glow */}
      <div
        aria-hidden="true"
        style={{
          position:    "absolute",
          top:         "30%",
          right:       "-20%",
          width:       "60vw",
          height:      "60vw",
          borderRadius:"50%",
          background:  "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          filter:      "blur(40px)",
        }}
      />

      <div
        style={{
          display:   "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:       "clamp(48px,8vw,120px)",
          alignItems:"start",
          position:  "relative",
        }}
      >
        {/* ── Left: header ── */}
        <div style={{ position: "sticky", top: 120 }}>
          <p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              marginBottom:  "1.25rem",
            }}
          >
            What I Do
          </p>
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 4.5vw, 72px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    1.0,
              color:         "#ffffff",
              marginBottom:  "1.5rem",
            }}
          >
            Explore{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
              our services.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              maxWidth:   340,
              marginBottom: "2rem",
            }}
          >
            From a simple landing page to a full business platform — every project is custom-built, optimized, and delivered on time.
          </p>
          <Link href="/quote" className="btn-primary" style={{ fontSize: 13 }}>
            Get a Quote
          </Link>
        </div>

        {/* ── Right: numbered list ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding:    "clamp(20px,3vh,32px) 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor:     "default",
                transition: "border-color 200ms ease",
                borderColor: active === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display:     "flex",
                  alignItems:  "flex-start",
                  gap:         "1.5rem",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "clamp(28px, 3.5vw, 48px)",
                    fontWeight:    300,
                    letterSpacing: "-0.04em",
                    color:         active === i ? "var(--accent)" : "rgba(255,255,255,0.10)",
                    lineHeight:    1,
                    transition:    "color 250ms ease",
                    flexShrink:    0,
                    width:         "2.5ch",
                  }}
                >
                  {svc.num}
                </span>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily:    "var(--font-ui)",
                        fontSize:      "clamp(15px, 1.4vw, 19px)",
                        fontWeight:    500,
                        color:         active === i ? "#ffffff" : "rgba(255,255,255,0.7)",
                        margin:        0,
                        transition:    "color 200ms ease",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize:   "clamp(12px, 1vw, 14px)",
                            lineHeight: 1.7,
                            color:      "var(--fg-dim)",
                            marginBottom: "0.875rem",
                          }}
                        >
                          {svc.desc}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {svc.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontFamily:   "var(--font-ui)",
                                fontSize:     10,
                                padding:      "0.2rem 0.65rem",
                                borderRadius: 9999,
                                background:   "rgba(37,99,235,0.08)",
                                border:       "1px solid rgba(37,99,235,0.20)",
                                color:        "rgba(37,99,235,0.8)",
                                letterSpacing:"0.04em",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}

          {/* Starting price note */}
          <p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      12,
              color:         "var(--muted)",
              marginTop:     "1.5rem",
              letterSpacing: "0.01em",
            }}
          >
            Starting from{" "}
            <span style={{ color: "var(--fg-dim)", fontWeight: 500 }}>$299 setup + $15/month</span>
            {" "}— custom quotes available.
          </p>
        </div>
      </div>
    </section>
  );
}
