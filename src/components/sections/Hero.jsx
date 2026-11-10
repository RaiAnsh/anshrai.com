"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px,12vh,140px) clamp(24px,8vw,96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 20% 10%, black 30%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 20% 10%, black 30%, transparent 100%)",
        }}
      />

      {/* Accent glow behind name */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 9999,
            border: "1px solid rgba(34,197,94,0.25)",
            background: "rgba(34,197,94,0.06)",
            marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.7)",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#22c55e",
            }}
          >
            Open to opportunities · Toronto, ON
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          style={{
            fontSize: "clamp(56px, 10vw, 128px)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            color: "#ffffff",
            margin: "0 0 28px",
          }}
        >
          Ansh Rai
        </motion.h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          style={{
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "#888898",
            margin: "0 0 28px",
            letterSpacing: "-0.01em",
          }}
        >
          CS Student ·{" "}
          <span style={{ color: "rgba(255,255,255,0.55)" }}>Full-Stack Developer</span>{" "}
          ·{" "}
          <span style={{ color: "#2563eb" }}>Data & Databases</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease }}
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            lineHeight: 1.75,
            color: "#5a5a6c",
            maxWidth: 540,
            margin: "0 0 48px",
          }}
        >
          Computer Science student at Toronto Metropolitan University. I build
          production web apps and data systems for real clients — 15+ projects delivered
          through arweb Solutions. Seeking Database Developer and Data Analyst roles.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <a href="#work" className="btn-primary">
            View Projects →
          </a>
          <a
            href="https://github.com/RaiAnsh"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/raiansh"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            LinkedIn ↗
          </a>
        </motion.div>

        {/* Education strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            marginTop: 60,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 1,
              height: 44,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div>
            <p
              style={{
                fontSize: 11,
                color: "#5a5a6c",
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Toronto Metropolitan University
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#888898",
                margin: "2px 0 0",
              }}
            >
              B.Sc. Computer Science · Expected April 2028
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
