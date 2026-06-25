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
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full border"
          style={{ borderColor: "rgba(212,168,75,0.25)", background: "rgba(212,168,75,0.07)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#d4a84b" }}>
            Open for internships & new projects
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-serif text-fg mb-8"
          style={{ fontSize: "clamp(54px, 10.5vw, 148px)", lineHeight: 0.9, letterSpacing: "-0.045em" }}
        >
          {[
            { text: "Websites", color: "#f0ede5" },
            { text: "businesses", color: "#d4c8b8" },
            { text: "love.", color: "#d4a84b" },
          ].map(({ text, color }, i) => (
            <div className="overflow-hidden" key={text}>
              <motion.span
                className="block"
                style={{ color }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.25 + i * 0.1, ease }}
              >
                {text}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl max-w-lg leading-relaxed mb-4"
          style={{ color: "#9a9490" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
        >
          Web designer & database developer. I build sites for local businesses and data systems for teams — and I'm actively seeking data analyst & IT roles.
        </motion.p>

        {/* Role chips */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {["Web Design", "Database Dev", "Data Analytics", "IT Operations"].map((r) => (
            <span
              key={r}
              className="text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{ borderColor: "rgba(212,168,75,0.2)", color: "#a09890", background: "rgba(212,168,75,0.05)" }}
            >
              {r}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88, ease }}
        >
          <a
            href="#work"
            className="px-7 py-3.5 rounded-full text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: "#d4a84b" }}
          >
            See my work →
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5 hover:border-fg/30 hover:text-fg"
            style={{ borderColor: "rgba(240,237,229,0.14)", color: "#706c69" }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap gap-10 md:gap-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          {[
            { n: "8+", label: "Websites delivered" },
            { n: "100%", label: "On-time delivery" },
            { n: "Toronto", label: "Based" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.03em", color: "#f0ede5" }}>
                {s.n}
              </div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#706c69" }}>
                {s.label}
              </div>
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
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Scroll
        <div className="w-px h-12 bg-current opacity-30" />
      </motion.div>
    </section>
  );
}
