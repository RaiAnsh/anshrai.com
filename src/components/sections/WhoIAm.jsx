"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const DIFFERENTIATORS = [
  "You work directly with me — the developer actually building your project.",
  "No agency overhead. No account managers. No handoffs.",
  "Custom work tailored to your business, not a template.",
  "Fast turnaround without cutting corners.",
  "Honest pricing with nothing hidden.",
];

export default function WhoIAm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "var(--ground)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap:                 "clamp(48px,8vw,120px)",
          alignItems:          "start",
        }}
      >
        {/* ── Left ── */}
        <div>
          <motion.p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "clamp(40px,6vh,72px)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Who you're working with
          </motion.p>

          <motion.h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(44px, 5.5vw, 80px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              color:         "#ffffff",
              marginBottom:  "clamp(28px,4vh,48px)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Hi, I'm Ansh.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>The developer.</em>
          </motion.h2>

          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize:   "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.75,
                color:      "var(--fg-dim)",
                margin:     0,
              }}
            >
              I'm a Computer Science student and the developer behind arweb. I work directly
              with businesses — from initial planning and design through development, launch,
              and ongoing support.
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize:   "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.75,
                color:      "var(--fg-dim)",
                margin:     0,
              }}
            >
              I started arweb because I saw local businesses losing customers to competitors
              with better websites, and realized I could fix that. Now I build the kind of
              digital experiences that actually make a difference.
            </p>
          </motion.div>

          <motion.div
            style={{ marginTop: "2.5rem" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.34 }}
          >
            <Link
              href="/technical"
              style={{
                fontFamily:     "var(--font-ui)",
                fontSize:       13,
                color:          "var(--accent)",
                textDecoration: "none",
                transition:     "opacity 140ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            >
              View technical background →
            </Link>
          </motion.div>
        </div>

        {/* ── Right: differentiators ── */}
        <div style={{ paddingTop: "clamp(0px, 4vw, 80px)" }}>
          <motion.p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "2.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Why work with me
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={d}
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        "1.25rem",
                  padding:    "1.25rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.28 + i * 0.07, ease }}
              >
                <div
                  style={{
                    width:        20,
                    height:       20,
                    borderRadius: "50%",
                    background:   "rgba(37,99,235,0.08)",
                    border:       "1px solid rgba(37,99,235,0.2)",
                    flexShrink:   0,
                    marginTop:    2,
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize:   "clamp(13px, 1.1vw, 15px)",
                    lineHeight: 1.65,
                    color:      "var(--fg-dim)",
                  }}
                >
                  {d}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
