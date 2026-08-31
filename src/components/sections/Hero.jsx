"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end"
      style={{ background: "var(--ground)", paddingBottom: "clamp(64px, 10vh, 120px)" }}
    >
      {/* Eyebrow ── floats at top-left */}
      <motion.p
        className="absolute top-[clamp(120px,15vh,160px)] left-6 md:left-16 lg:left-24"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Toronto · Canada-wide
      </motion.p>

      {/* Main content ── bottom-anchored */}
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl">
        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-display font-light leading-none"
            style={{
              fontSize: "clamp(56px, 9vw, 148px)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.1 }}
          >
            Websites
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--muted)" }}>
              that work.
            </span>
          </motion.h1>
        </div>

        {/* Subline + CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              color: "var(--fg-dim)",
              lineHeight: 1.65,
              maxWidth: 360,
            }}
          >
            Custom websites for Toronto small businesses. You talk to the developer. Launches in 1–2 weeks.
          </p>

          <div className="flex gap-4 flex-shrink-0">
            <Link href="/quote" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/work" className="btn-ghost">
              View Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: 1,
            height: 48,
            background: "var(--muted)",
            transformOrigin: "top",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        />
      </motion.div>
    </section>
  );
}
