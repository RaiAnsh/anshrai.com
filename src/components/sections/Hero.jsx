"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-24 pb-20">

      {/* ── Animated gradient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="blob blob-gold" />
        <div className="blob blob-purple" />
        <div className="blob blob-rose" />
      </div>

      {/* ── Film grain overlay ── */}
      <div className="grain-overlay" aria-hidden />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl">

        {/* Availability badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#706c69" }}>
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-serif text-fg overflow-hidden mb-8"
          style={{ fontSize: "clamp(56px, 10vw, 140px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
        >
          {["Websites", "businesses", "love."].map((word, i) => (
            <div className="overflow-hidden" key={word}>
              <motion.span
                className="block"
                style={{ color: i === 2 ? "#d4a84b" : "#f0ede5" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.1, ease }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl max-w-lg leading-relaxed mb-12"
          style={{ color: "#706c69" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
        >
          I design and build fast, modern websites for local businesses — and data systems for teams that run on insights.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
        >
          <a
            href="#work"
            className="group relative px-7 py-3.5 rounded-full text-sm font-semibold text-bg overflow-hidden transition-transform hover:-translate-y-0.5"
            style={{ background: "#d4a84b" }}
          >
            See my work →
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5 hover:border-fg/30"
            style={{ borderColor: "rgba(240,237,229,0.12)", color: "#706c69" }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="flex flex-wrap gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { n: "6+", label: "Websites built" },
            { n: "100%", label: "On-time delivery" },
            { n: "Toronto", label: "Based" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-fg" style={{ fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.03em" }}>{s.n}</div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#706c69" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-3 text-xs tracking-widest uppercase"
        style={{ color: "#706c69" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        Scroll
        <div className="w-px h-12 bg-current opacity-30" />
      </motion.div>
    </section>
  );
}
