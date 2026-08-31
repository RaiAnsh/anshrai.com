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
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ zIndex: 10, paddingTop: 88 }}
    >
      {/* ── Aurora background glows ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Primary blue orb — top left */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "65%",
          height: "75%",
          background: "radial-gradient(ellipse at 30% 40%, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse-glow 8s ease-in-out infinite",
        }} />
        {/* Violet orb — top right */}
        <div style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "45%",
          height: "55%",
          background: "radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
          animationDelay: "3s",
          animation: "pulse-glow 10s ease-in-out infinite",
        }} />
        {/* Subtle cyan shimmer — bottom center */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "30%",
          width: "40%",
          height: "30%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />
        {/* Horizontal light streak */}
        <div style={{
          position: "absolute",
          top: "38%",
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.15) 30%, rgba(109,40,217,0.1) 60%, transparent 100%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto w-full" style={{ position: "relative", zIndex: 10 }}>

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
              Toronto Web Designer · Canada-wide
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
              <span style={{
                color: "#2563eb",
                textShadow: "0 0 60px rgba(37,99,235,0.4)",
              }}>customers.</span>
            </motion.h1>

            <motion.p
              className="leading-relaxed mb-10 max-w-xl"
              style={{ color: "#888888", fontSize: "clamp(15px, 1.6vw, 18px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease }}
            >
              Toronto-based web designer and developer building custom websites for small businesses.
              You work directly with the person building your site, from first call to launch.
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
                className="btn-glow px-7 py-3.5 rounded-full text-sm font-semibold"
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

          {/* Right: concentric rings visual, desktop only */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
          >
            <div style={{ position: "relative", width: 280, height: 280 }}>
              {/* Outer glow */}
              <div style={{
                position: "absolute", inset: "-30%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
                filter: "blur(20px)",
              }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.2)" }} />
              <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.12)" }} />
              <div style={{ position: "absolute", inset: "36%", borderRadius: "50%", border: "1px solid rgba(37,99,235,0.07)" }} />
              <div style={{
                position: "absolute", inset: "28%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(109,40,217,0.04) 60%, transparent 100%)",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 8, height: 8, borderRadius: "50%",
                background: "#2563eb",
                boxShadow: "0 0 20px rgba(37,99,235,1), 0 0 60px rgba(37,99,235,0.5), 0 0 120px rgba(37,99,235,0.2)",
              }} />
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 4, height: 4, borderRadius: "50%",
                  background: `rgba(37,99,235,${0.6 - i * 0.08})`,
                  boxShadow: `0 0 8px rgba(37,99,235,${0.4 - i * 0.05})`,
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
          background: "linear-gradient(to bottom, rgba(37,99,235,0.7), transparent)",
          boxShadow: "0 0 8px rgba(37,99,235,0.4)",
        }} />
      </motion.div>
    </section>
  );
}
