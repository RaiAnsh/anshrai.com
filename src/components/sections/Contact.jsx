"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const links = [
  {
    label: "Work Together",
    href: "mailto:anshr792@gmail.com",
    primary: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raiansh/",
    primary: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/RaiAnsh",
    primary: false,
  },
  {
    label: "arweb.co ↗",
    href: "/arweb",
    primary: false,
  },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative py-40 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      {/* Fade-to-solid overlay: makes background calmer near the end */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(9,9,9,0.85) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Let's Work Together
        </motion.p>

        <motion.h2
          className="font-heading font-bold mb-7"
          style={{
            fontSize: "clamp(38px, 6vw, 82px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            color: "#ffffff",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          Let's build something
          <br />
          <span style={{ color: "#2563eb" }}>meaningful.</span>
        </motion.h2>

        <motion.p
          className="text-base leading-relaxed mb-12 max-w-lg mx-auto"
          style={{ color: "#888888" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease }}
        >
          Whether you need a developer for your team or a website for your business — let's build something great. I reply within 24 hours.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.34, ease }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
              style={
                l.primary
                  ? { background: "#2563eb", color: "#ffffff" }
                  : { border: "1px solid rgba(255,255,255,0.09)", color: "#888888" }
              }
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        <motion.p
          className="mt-16 text-xs"
          style={{ color: "rgba(136,136,136,0.35)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Based in Toronto, ON · Open to remote
        </motion.p>
      </div>
    </section>
  );
}
