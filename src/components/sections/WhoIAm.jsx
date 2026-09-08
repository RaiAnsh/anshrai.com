"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const DIFFERENTIATORS = [
  {
    title:  "You talk to the builder.",
    desc:   "No account managers, no middlemen. Every decision goes through the person actually writing the code.",
  },
  {
    title:  "Launched in 1–2 weeks.",
    desc:   "No bloated timelines. Scoped clearly, built fast, reviewed together, delivered on time.",
  },
  {
    title:  "SEO-built from the start.",
    desc:   "Technical SEO, on-page optimization, and Core Web Vitals handled in the initial build — not bolted on later.",
  },
  {
    title:  "Transparent, flat pricing.",
    desc:   "Setup fee + $15/month hosting. No surprise invoices, no hidden agency markup.",
  },
];

export default function WhoIAm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: "#080808",
        padding:    "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
      }}
    >
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
          transition={{ duration: 0.7, ease }}
        >
          <p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "1.25rem",
            }}
          >
            About
          </p>

          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 5vw, 72px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    1.02,
              color:         "#ffffff",
              marginBottom:  "2rem",
            }}
          >
            Hi, I'm Ansh.{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
              The developer.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "1.25rem",
            }}
          >
            I'm a CS student and freelance web developer based in Toronto. I started{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 500 }}>arweb</strong> to give
            small businesses what agencies charge five figures for — custom, fast, professional websites
            that actually bring in customers.
          </p>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "2.5rem",
            }}
          >
            Every project I take on is built with production-quality code, proper SEO, and a direct
            line to me — not a ticket queue. My clients get results, not deliverables.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-primary" style={{ fontSize: 13 }}>
              Work with me
            </Link>
            <a
              href="mailto:info@anshrai.com"
              className="btn-ghost"
              style={{ fontSize: 13 }}
            >
              info@anshrai.com
            </a>
          </div>
        </motion.div>

        {/* ── Right: differentiators ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          {DIFFERENTIATORS.map((d, i) => (
            <div
              key={d.title}
              style={{
                padding:      "1.5rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display:        "flex",
                  alignItems:     "flex-start",
                  gap:            "1.25rem",
                }}
              >
                {/* Index */}
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      20,
                    fontWeight:    300,
                    color:         "rgba(255,255,255,0.10)",
                    lineHeight:    1,
                    flexShrink:    0,
                    marginTop:     "0.1em",
                    letterSpacing: "-0.03em",
                    width:         "1.8ch",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily:    "var(--font-ui)",
                      fontSize:      "clamp(14px, 1.3vw, 17px)",
                      fontWeight:    500,
                      color:         "#ffffff",
                      letterSpacing: "-0.01em",
                      marginBottom:  "0.5rem",
                      margin:        0,
                      marginBottom:  "0.5rem",
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize:   "clamp(12px, 1vw, 14px)",
                      lineHeight: 1.7,
                      color:      "var(--fg-dim)",
                      margin:     0,
                    }}
                  >
                    {d.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
