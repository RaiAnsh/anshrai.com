"use client";

import { motion } from "framer-motion";

const word = (text, delay) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {text}
  </motion.span>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(212,168,75,0.07) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(240,237,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl">
        {/* Kicker */}
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-gold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Database Developer · CS Student · Founder
        </motion.p>

        {/* Headline */}
        <h1
          className="font-serif text-fg leading-none mb-8 overflow-hidden"
          style={{ fontSize: "clamp(52px, 9vw, 120px)", letterSpacing: "-0.04em" }}
        >
          <div className="overflow-hidden">{word("Building", 0.2)}&nbsp;{word("data", 0.32)}</div>
          <div className="overflow-hidden">
            {word("systems", 0.44)}&nbsp;
            <span
              className="font-serif"
              style={{ color: "#d4a84b" }}
            >
              {word("&", 0.52)}
            </span>
          </div>
          <div className="overflow-hidden">{word("products", 0.6)}&nbsp;{word("people", 0.68)}</div>
          <div className="overflow-hidden">{word("trust.", 0.76)}</div>
        </h1>

        {/* Sub */}
        <motion.p
          className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: "#706c69" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          TMU Computer Science · Toronto ·{" "}
          <span className="text-fg/70">SQL, Python, PostgreSQL, Next.js</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#work"
            className="px-6 py-3 rounded-full text-sm font-semibold text-bg transition-all duration-150 hover:-translate-y-0.5"
            style={{ background: "#d4a84b" }}
          >
            See my work →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-150 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(240,237,229,0.15)", color: "#706c69" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede5")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#706c69")}
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-6 md:left-10 flex items-center gap-3 text-xs tracking-widest uppercase"
        style={{ color: "#706c69" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="w-px h-12 bg-current opacity-30" />
        Scroll
      </motion.div>
    </section>
  );
}
