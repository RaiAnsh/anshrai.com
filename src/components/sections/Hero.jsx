"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const logos = [
  "Broadview Barber",
  "Pull Up Chef",
  "K&K Fade Lounge",
  "Mapcan",
  "Sunder Wellness",
  "Delmar Contracting",
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10, paddingTop: 88 }}
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-center">

          {/* Left: headline + CTAs */}
          <div>
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-7"
              style={{ color: "#2563eb" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              Toronto, Canada
            </motion.p>

            <motion.h1
              className="font-heading font-bold leading-[1.02] mb-7"
              style={{
                fontSize: "clamp(44px, 5.8vw, 82px)",
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
            >
              I build digital
              <br />
              experiences that
              <br />
              <span style={{ color: "#2563eb" }}>drive results.</span>
            </motion.h1>

            <motion.p
              className="leading-relaxed mb-10 max-w-lg"
              style={{ color: "#888888", fontSize: "clamp(15px, 1.6vw, 18px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease }}
            >
              Computer Science student at TMU. Founder of{" "}
              <a href="/arweb" style={{ color: "#ffffff", fontWeight: 500 }}>arweb.co</a>
              . Building websites, software, and data-driven systems for businesses that want to grow.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56, ease }}
            >
              <a
                href="#work"
                className="px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                style={{ background: "#2563eb", color: "#ffffff" }}
              >
                View my work
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#888888" }}
              >
                Let's connect
              </a>
            </motion.div>
          </div>

          {/* Right: abstract concentric rings visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
          >
            <div style={{ position: "relative", width: 320, height: 320 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.18)" }} />
              <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.12)" }} />
              <div style={{ position: "absolute", inset: "36%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.07)" }} />
              <div style={{
                position: "absolute", inset: "28%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
                boxShadow: "0 0 90px rgba(37,99,235,0.18), 0 0 200px rgba(37,99,235,0.06)",
              }} />
              {/* Center dot */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 7, height: 7, borderRadius: "50%",
                background: "#2563eb",
                boxShadow: "0 0 20px rgba(37,99,235,0.9), 0 0 50px rgba(37,99,235,0.4)",
              }} />
              {/* Orbit dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 3, height: 3, borderRadius: "50%",
                  background: `rgba(37,99,235,${0.5 - i * 0.07})`,
                  transform: `translate(-50%,-50%) rotate(${deg}deg) translateX(${80 + (i % 2) * 56}px)`,
                }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Client logos strip ── */}
        <motion.div
          className="mt-24 md:mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <p className="text-xs tracking-[0.16em] uppercase mb-5" style={{ color: "rgba(136,136,136,0.38)" }}>
            Trusted by local businesses to deliver real results
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-medium transition-colors duration-200 hover:text-fg"
                style={{ color: "rgba(136,136,136,0.32)", letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div style={{
          width: 1, height: 52,
          background: "linear-gradient(to bottom, rgba(37,99,235,0.7), transparent)",
        }} />
      </motion.div>
    </section>
  );
}
