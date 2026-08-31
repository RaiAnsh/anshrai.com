"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      style={{
        position:   "relative",
        minHeight:  "100svh",
        display:    "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow:   "hidden",
        background: "#0b0b0e",
      }}
    >
      {/* ── Abstract background ── CSS only, no photos */}
      {/* Blue radial haze – upper right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 55% at 82% 18%, rgba(37,99,235,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse 40% 30% at 20% 85%, rgba(37,99,235,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle horizontal grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 80px)",
          pointerEvents: "none",
        }}
      />

      {/* Large decorative number — background watermark */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      "absolute",
          right:         "-2vw",
          top:           "50%",
          transform:     "translateY(-54%)",
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(180px, 28vw, 420px)",
          fontWeight:    300,
          letterSpacing: "-0.05em",
          lineHeight:    1,
          color:         "rgba(255,255,255,0.022)",
          userSelect:    "none",
          pointerEvents: "none",
          whiteSpace:    "nowrap",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        arweb
      </motion.div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex:   1,
          padding:  "0 clamp(24px,6vw,96px) clamp(64px,10vh,120px)",
          maxWidth: "64rem",
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
            marginBottom:  "1.5rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Toronto · Canada-wide
        </motion.p>

        {/* Headline line 1 */}
        <div style={{ overflow: "hidden", marginBottom: "0.1em" }}>
          <motion.h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(64px, 10vw, 160px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    0.93,
              color:         "#ffffff",
              margin:        0,
            }}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.05 }}
          >
            Websites
          </motion.h1>
        </div>

        {/* Headline line 2 */}
        <div style={{ overflow: "hidden", marginBottom: "2.75rem" }}>
          <motion.h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(64px, 10vw, 160px)",
              fontWeight:    300,
              fontStyle:     "italic",
              letterSpacing: "-0.03em",
              lineHeight:    0.93,
              color:         "var(--muted)",
              margin:        0,
            }}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.13 }}
          >
            that work.
          </motion.h1>
        </div>

        {/* Sub + CTAs */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "flex-start" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.56 }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(14px, 1.4vw, 17px)",
              color:      "var(--fg-dim)",
              lineHeight: 1.65,
              maxWidth:   380,
              margin:     0,
            }}
          >
            Custom websites for Toronto small businesses. You talk to the developer, not an agency. Launches in 1–2 weeks.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-primary">Get a Quote</Link>
            <Link href="#work" className="btn-ghost">View Work</Link>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{
          position:      "absolute",
          bottom:        40,
          right:         "clamp(24px,6vw,96px)",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           10,
          zIndex:        1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span
          style={{
            writingMode:   "vertical-rl",
            fontFamily:    "var(--font-ui)",
            fontSize:      10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "var(--muted)",
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{ width: 1, height: 52, background: "var(--muted)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        />
      </motion.div>
    </section>
  );
}
