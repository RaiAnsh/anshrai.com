"use client";

import { motion } from "framer-motion";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

const CLIENT_LOGOS = [
  "RL Contracting",
  "MAP Canada",
  "K Group Ltd",
  "KK Fade Lounge",
  "Five Star Detailing",
  "Sunder Wellness",
  "Delmar Contracting",
  "+4 more",
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10, paddingTop: 88 }}
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-center">

          {/* Left: copy + CTAs */}
          <div>
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-7"
              style={{ color: "#2563eb" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              Toronto, Canada · Canada-wide projects
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
              Websites built to
              <br />
              turn visitors into
              <br />
              <span style={{ color: "#2563eb" }}>customers.</span>
            </motion.h1>

            <motion.p
              className="leading-relaxed mb-10 max-w-xl"
              style={{ color: "#888888", fontSize: "clamp(15px, 1.6vw, 18px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease }}
            >
              I design and build custom websites and digital systems for businesses.
              You work directly with the developer building your project from start to launch.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56, ease }}
            >
              <a
                href="/quote"
                onClick={() => track(Events.QUOTE_STARTED)}
                className="px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                style={{ background: "#2563eb", color: "#ffffff" }}
              >
                Get an Instant Quote
              </a>
              <a
                href="/#work"
                className="text-sm font-semibold transition-colors duration-200 hover:text-fg"
                style={{ color: "#888888" }}
              >
                View My Work →
              </a>
            </motion.div>

            <motion.p
              className="text-xs"
              style={{ color: "rgba(136,136,136,0.45)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72, ease }}
            >
              Developer or recruiter?{" "}
              <a
                href="/technical"
                className="underline underline-offset-2 transition-colors hover:text-fg"
                style={{ color: "rgba(136,136,136,0.6)" }}
              >
                View Technical Work →
              </a>
            </motion.p>
          </div>

          {/* Right: concentric rings visual — desktop only */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
          >
            <div style={{ position: "relative", width: 280, height: 280 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.16)" }} />
              <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.1)" }} />
              <div style={{ position: "absolute", inset: "36%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.06)" }} />
              <div style={{
                position: "absolute", inset: "28%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 7, height: 7, borderRadius: "50%",
                background: "#2563eb",
                boxShadow: "0 0 20px rgba(37,99,235,0.9), 0 0 50px rgba(37,99,235,0.35)",
              }} />
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 3, height: 3, borderRadius: "50%",
                  background: `rgba(37,99,235,${0.5 - i * 0.07})`,
                  transform: `translate(-50%,-50%) rotate(${deg}deg) translateX(${72 + (i % 2) * 50}px)`,
                }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Client logos strip ── */}
        <motion.div
          className="mt-24 md:mt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-xs tracking-[0.16em] uppercase mb-5" style={{ color: "rgba(136,136,136,0.3)" }}>
            Trusted by local businesses across Canada
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {CLIENT_LOGOS.map((name) => (
              <span
                key={name}
                className="text-sm font-medium"
                style={{ color: "rgba(136,136,136,0.28)", letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, rgba(37,99,235,0.6), transparent)",
        }} />
      </motion.div>
    </section>
  );
}
