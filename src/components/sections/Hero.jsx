"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      style={{
        position:      "relative",
        minHeight:     "100svh",
        display:       "flex",
        flexDirection: "column",
        justifyContent:"center",
        overflow:      "hidden",
        background:    "#080808",
      }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          opacity:    0.28,
          pointerEvents: "none",
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay gradient ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset:    0,
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 40%, rgba(8,8,8,0.80) 80%, #080808 100%), " +
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          pointerEvents:   "none",
          opacity:         0.6,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position:  "relative",
          zIndex:    1,
          maxWidth:  "1280px",
          margin:    "0 auto",
          width:     "100%",
          padding:   "0 clamp(24px,6vw,96px)",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Green/blue availability dot */}
          <span
            style={{
              width:        8,
              height:       8,
              borderRadius: "50%",
              background:   "#22c55e",
              display:      "block",
              boxShadow:    "0 0 8px rgba(34,197,94,0.6)",
            }}
          />
          <span
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "var(--fg-dim)",
            }}
          >
            Available for new projects · Toronto, Canada
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: "2.5rem" }}>
          {/* Line 1 — bright */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(56px, 9.5vw, 148px)",
                fontWeight:    300,
                letterSpacing: "-0.035em",
                lineHeight:    0.92,
                color:         "#ffffff",
                margin:        0,
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease, delay: 0.05 }}
            >
              Websites that
            </motion.h1>
          </div>

          {/* Line 2 — italic dim */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(56px, 9.5vw, 148px)",
                fontWeight:    300,
                fontStyle:     "italic",
                letterSpacing: "-0.035em",
                lineHeight:    0.92,
                color:         "rgba(255,255,255,0.25)",
                margin:        0,
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease, delay: 0.12 }}
            >
              actually
            </motion.h1>
          </div>

          {/* Line 3 — bright again */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(56px, 9.5vw, 148px)",
                fontWeight:    300,
                letterSpacing: "-0.035em",
                lineHeight:    0.92,
                color:         "#ffffff",
                margin:        0,
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease, delay: 0.19 }}
            >
              work.
            </motion.h1>
          </div>
        </div>

        {/* Sub + CTAs row */}
        <motion.div
          style={{
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(14px, 1.3vw, 17px)",
              color:      "var(--fg-dim)",
              lineHeight: 1.7,
              maxWidth:   400,
              margin:     0,
            }}
          >
            Custom websites for Toronto small businesses.
            You talk directly to the developer — not an agency middleman.
            Live in&nbsp;1–2&nbsp;weeks.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flexShrink: 0 }}>
            <Link
              href="/quote"
              className="btn-primary"
              style={{ fontSize: 14, padding: "0.8rem 1.75rem" }}
            >
              Start a Project
            </Link>
            <Link
              href="#work"
              className="btn-ghost"
              style={{ fontSize: 14, padding: "0.8rem 1.75rem" }}
            >
              View Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <motion.div
        style={{
          position:      "absolute",
          bottom:        40,
          left:          "50%",
          transform:     "translateX(-50%)",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           10,
          zIndex:        1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <motion.div
          style={{
            width:        24,
            height:       38,
            borderRadius: 12,
            border:       "1px solid rgba(255,255,255,0.15)",
            display:      "flex",
            justifyContent: "center",
            paddingTop:   6,
          }}
        >
          <motion.div
            style={{
              width:        4,
              height:       4,
              borderRadius: "50%",
              background:   "#fff",
            }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
