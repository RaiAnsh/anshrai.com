"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const valueProp = [
  {
    title: "Clean Code & Modern Design",
    desc: "Fast, responsive websites built with best practices.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Data That Drives Growth",
    desc: "From databases to dashboards, I help turn data into action.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "Reliable & Collaborative",
    desc: "Clear communication, on-time delivery, and long-term support.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "5+",  label: "Happy Clients" },
  { value: "2+",  label: "Years Building" },
];

export default function About() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }} ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.p>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">

          {/* Headline */}
          <motion.h2
            className="font-heading font-bold leading-[1.08]"
            style={{
              fontSize: "clamp(32px, 4.2vw, 56px)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            I turn ideas into
            <br />scalable solutions
            <br />with{" "}
            <span style={{ color: "#2563eb" }}>clean code</span>
            <br />and{" "}
            <span style={{ color: "#2563eb" }}>smart data.</span>
          </motion.h2>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <p className="leading-relaxed mb-5" style={{ color: "#888888" }}>
              I'm a Computer Science student at TMU and the founder of arweb — a web and database development business helping local businesses build their online presence and make data-driven decisions.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: "#888888" }}>
              I got into tech because I saw local businesses losing customers to competitors with better websites — and realized I could fix that. Now I build the kind of digital experiences that actually move the needle.
            </p>
            <p className="leading-relaxed" style={{ color: "#888888" }}>
              Whether it's a performant web app, a normalized PostgreSQL schema, or a Tableau dashboard that reveals hidden patterns — I build technology that solves real business problems.
            </p>
          </motion.div>
        </div>

        {/* Value props mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {valueProp.map((v, i) => (
            <motion.div
              key={v.title}
              className="rounded-2xl p-6"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(37,99,235,0.1)", color: "#2563eb" }}
              >
                {v.icon}
              </div>
              <p className="font-semibold text-fg text-sm mb-1.5 leading-snug">{v.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-8 pt-10 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <p
                className="font-heading font-bold mb-1"
                style={{ fontSize: "clamp(28px, 4vw, 50px)", letterSpacing: "-0.04em", color: "#ffffff" }}
              >
                {s.value}
              </p>
              <p className="text-xs tracking-wide uppercase" style={{ color: "#888888" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
