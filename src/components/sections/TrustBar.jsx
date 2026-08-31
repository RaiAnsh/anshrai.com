"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const ITEMS = [
  { number: "10+",         desc: "websites delivered" },
  { number: "7+",          desc: "industries served" },
  { number: "Canada-wide", desc: "projects welcome" },
  { number: "< 1 day",     desc: "typical response" },
];

export default function TrustBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background:   "var(--ground)",
        padding:      "clamp(56px,8vh,88px) clamp(24px,6vw,96px)",
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap:                 "clamp(32px,4vw,0px)",
        }}
      >
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.number}
            style={{
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              textAlign:     "center",
              borderRight:   i < ITEMS.length - 1 ? "1px solid var(--border)" : "none",
              padding:       "0 clamp(16px,2vw,32px)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08, ease }}
          >
            <p
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(28px, 3.5vw, 48px)",
                fontWeight:    300,
                letterSpacing: "-0.03em",
                lineHeight:    1,
                color:         "#ffffff",
                marginBottom:  "0.5rem",
              }}
            >
              {item.number}
            </p>
            <p
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "var(--muted)",
                margin:        0,
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
