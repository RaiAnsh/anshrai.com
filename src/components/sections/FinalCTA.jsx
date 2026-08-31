"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

export default function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--ground)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      {/* Eyebrow */}
      <motion.p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--muted)",
          marginBottom:  "clamp(32px,5vh,56px)",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Ready to get started?
      </motion.p>

      {/* Giant headline */}
      <motion.h2
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(52px, 8vw, 128px)",
          fontWeight:    300,
          letterSpacing: "-0.035em",
          lineHeight:    0.95,
          color:         "#ffffff",
          margin:        0,
          marginBottom:  "clamp(40px,6vh,72px)",
          maxWidth:      "14ch",
        }}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.08, ease }}
      >
        Let's build something
        <br />
        <em style={{ fontStyle: "italic", color: "var(--muted)" }}>that works for you.</em>
      </motion.h2>

      {/* Body + CTAs */}
      <motion.div
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "flex-start",
          gap:           "2rem",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.24, ease }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize:   "clamp(14px, 1.4vw, 17px)",
            lineHeight: 1.7,
            color:      "var(--fg-dim)",
            maxWidth:   480,
            margin:     0,
          }}
        >
          Get an instant estimate, then let's review your project together. No commitment, no sales call.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href="/quote"
            onClick={() => track(Events.QUOTE_STARTED)}
            className="btn-primary"
          >
            Get an Instant Quote
          </Link>
          <a
            href="mailto:ansh@anshrai.com"
            onClick={() => track(Events.CONTACT_EMAIL_CLICKED)}
            className="btn-ghost"
          >
            Email me directly
          </a>
        </div>

        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize:   11,
            letterSpacing: "0.04em",
            color:      "var(--muted)",
            margin:     0,
            opacity:    0.7,
          }}
        >
          Most inquiries receive a response within 1 business day.
        </p>
      </motion.div>
    </section>
  );
}
