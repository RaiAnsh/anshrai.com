"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    num:   "01",
    title: "Get your estimate",
    desc:  "Answer a few quick questions and get an instant price estimate — no commitment, no sales call.",
  },
  {
    num:   "02",
    title: "Confirm your project",
    desc:  "We review your requirements together and agree on scope, timeline, and final pricing.",
  },
  {
    num:   "03",
    title: "Design & build",
    desc:  "I design and build your website, keeping you in the loop at every stage of the process.",
  },
  {
    num:   "04",
    title: "Review & launch",
    desc:  "You review and approve the finished site before anything goes live. No surprises.",
  },
  {
    num:   "05",
    title: "Ongoing support",
    desc:  "Depending on your plan, I handle hosting, updates, and technical support going forward.",
  },
];

export default function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: "var(--ground)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      {/* Header */}
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
        How it works
      </motion.p>

      <motion.h2
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(40px, 5.5vw, 80px)",
          fontWeight:    300,
          letterSpacing: "-0.03em",
          lineHeight:    0.95,
          color:         "#ffffff",
          marginBottom:  "clamp(56px,8vh,96px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        Simple from start
        <br />
        <em style={{ fontStyle: "italic", color: "var(--muted)" }}>to launch.</em>
      </motion.h2>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            style={{
              display:    "flex",
              gap:        "clamp(24px, 4vw, 72px)",
              padding:    "clamp(24px,3.5vh,40px) 0",
              borderTop:  "1px solid var(--border)",
              alignItems: "flex-start",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(28px, 3.5vw, 44px)",
                fontWeight:    300,
                letterSpacing: "-0.04em",
                color:         "rgba(37,99,235,0.2)",
                lineHeight:    1,
                flexShrink:    0,
                minWidth:      "clamp(40px,4vw,60px)",
                marginTop:     2,
              }}
            >
              {step.num}
            </span>

            <div>
              <h3
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(18px, 1.8vw, 24px)",
                  fontWeight:    300,
                  letterSpacing: "-0.02em",
                  color:         "#ffffff",
                  marginBottom:  "0.6rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize:   "clamp(13px, 1.1vw, 15px)",
                  lineHeight: 1.7,
                  color:      "var(--fg-dim)",
                  maxWidth:   520,
                  margin:     0,
                }}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* CTA */}
      <motion.div
        style={{ marginTop: "clamp(40px,5vh,64px)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <Link href="/quote" className="btn-primary">
          Start with step one →
        </Link>
      </motion.div>
    </section>
  );
}
