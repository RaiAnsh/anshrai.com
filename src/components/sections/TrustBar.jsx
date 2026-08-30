"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const STATS = [
  { value: "10+",         label: "Websites delivered" },
  { value: "7+",          label: "Industries served" },
  { value: "Canada-wide", label: "Projects welcome" },
  { value: "1 business",  label: "Day typical response", suffix: " day" },
];

// Simpler stat list — cleaner presentation
const ITEMS = [
  { number: "10+",         desc: "websites delivered" },
  { number: "7+",          desc: "industries served" },
  { number: "Canada-wide", desc: "projects welcome" },
  { number: "< 1 day",     desc: "typical response time" },
];

export default function TrustBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-16"
      style={{ zIndex: 10 }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          borderTop:    "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "40px 0",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.number}
              className="flex flex-col md:items-center md:text-center"
              style={{
                borderRight: i < ITEMS.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
                paddingRight: i < ITEMS.length - 1 ? 32 : 0,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <p
                className="font-heading font-bold mb-1"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 34px)",
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                {item.number}
              </p>
              <p
                className="text-xs tracking-wide"
                style={{ color: "#555555" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
