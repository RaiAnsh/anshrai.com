"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

export default function QuoteTeaser() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: "var(--surface)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      {/* Two-column layout: headline left, details right */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap:                 "clamp(48px,8vw,120px)",
          alignItems:          "center",
        }}
      >
        {/* Left */}
        <div>
          <motion.p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "1.25rem",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Instant Quote
          </motion.p>

          <motion.h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(44px, 5.5vw, 80px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              color:         "#ffffff",
              margin:        0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Your estimate
            <br />
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>in 60 seconds.</em>
          </motion.h2>
        </div>

        {/* Right */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(14px, 1.3vw, 16px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              margin:     0,
            }}
          >
            Tell me about your business and what you need, get an instant price estimate.
            No commitment. No sales call. Most projects start at{" "}
            <span style={{ color: "#ffffff" }}>$299 setup + $15/month.</span>
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/quote"
              onClick={() => track(Events.QUOTE_STARTED)}
              className="btn-primary"
            >
              Get My Instant Quote
            </Link>
          </div>

          <p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.04em",
              color:         "var(--muted)",
              margin:        0,
              opacity:       0.7,
            }}
          >
            Estimates are free and arrive instantly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
