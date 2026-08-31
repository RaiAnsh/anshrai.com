"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--ground)" }}
    >
      {/* ── Photography panel ── right half, bleeds in */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/projects/k-group/hero.jpg"
          alt="K Group luxury interior — arweb portfolio"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "65% center" }}
        />
        {/* Strong gradient: solid ground left → transparent right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0b0b0e 42%, rgba(11,11,14,0.80) 62%, rgba(11,11,14,0.28) 82%, rgba(11,11,14,0.10) 100%)",
          }}
        />
        {/* Bottom fade so text stays legible */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "40%",
            background: "linear-gradient(to top, #0b0b0e 0%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "20%",
            background: "linear-gradient(to bottom, #0b0b0e 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(24px,6vw,96px) clamp(64px,10vh,120px)",
          maxWidth: "56rem",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1.5rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Toronto · Canada-wide
        </motion.p>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: "0.15em" }}>
          <motion.h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(60px, 9.5vw, 152px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#ffffff",
              margin: 0,
            }}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.05 }}
          >
            Websites
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
          <motion.h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(60px, 9.5vw, 152px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--muted)",
              margin: 0,
            }}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.12 }}
          >
            that work.
          </motion.h1>
        </div>

        {/* Sub + CTAs */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "flex-start" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              color: "var(--fg-dim)",
              lineHeight: 1.65,
              maxWidth: 380,
              margin: 0,
            }}
          >
            Custom websites for Toronto small businesses. You talk to the developer, not an agency. Launches in 1–2 weeks.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/quote" className="btn-primary">Get a Quote</Link>
            <Link href="/work" className="btn-ghost">View Work</Link>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll line ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 40,
          right: "clamp(24px,6vw,96px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
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
            height: 52,
            background: "var(--muted)",
            transformOrigin: "top",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        />
      </motion.div>

      {/* ── Client credit chip ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 40,
          left: "clamp(24px,6vw,96px)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div style={{ width: 20, height: 1, background: "var(--muted)" }} />
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          K Group · Interior Design
        </span>
      </motion.div>
    </section>
  );
}
