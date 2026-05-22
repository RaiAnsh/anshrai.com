"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients } from "../../data/clients";

export default function SelectedWork() {
  const [hovered, setHovered] = useState(null);
  const listRef = useRef(null);

  return (
    <section id="work" className="px-6 md:px-12 py-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-end justify-between mb-16">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Client Work</p>
          <h2
            className="font-serif text-fg"
            style={{ fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Selected work
          </h2>
        </div>
        <a
          href="/arweb"
          className="hidden md:inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border transition-all hover:-translate-y-0.5"
          style={{ borderColor: "rgba(212,168,75,0.3)", color: "#d4a84b" }}
        >
          Start a project ↗
        </a>
      </div>

      {/* List */}
      <div ref={listRef} className="max-w-6xl mx-auto">
        {clients.map((c, i) => (
          <motion.div
            key={c.name}
            className="group relative border-t last:border-b cursor-pointer"
            style={{ borderColor: "rgba(240,237,229,0.07)" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background fill on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: c.bg }}
            />

            <div className="relative flex items-center gap-4 md:gap-8 py-7 md:py-9">
              {/* Number */}
              <span
                className="text-xs tabular-nums flex-shrink-0 w-6 transition-colors duration-200"
                style={{ color: hovered === i ? c.accent : "#706c69" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name + type */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-serif transition-colors duration-200"
                  style={{
                    fontSize: "clamp(22px, 3.5vw, 44px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    color: hovered === i ? "#f0ede5" : "#c8c4be",
                  }}
                >
                  {c.name}
                </div>
                <div
                  className="text-xs mt-1 font-medium tracking-wide transition-colors duration-200"
                  style={{ color: hovered === i ? c.accent : "#706c69" }}
                >
                  {c.type}
                </div>
              </div>

              {/* Tags — desktop only */}
              <div className="hidden lg:flex gap-2 flex-shrink-0">
                {c.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border transition-colors duration-200"
                    style={{
                      borderColor: hovered === i ? c.border : "rgba(240,237,229,0.08)",
                      color: "#706c69",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Visit link */}
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: hovered === i ? c.border : "rgba(240,237,229,0.1)",
                  color: hovered === i ? c.accent : "#706c69",
                }}
              >
                Visit ↗
              </a>
            </div>

            {/* Hover preview — floats over other rows */}
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  className="absolute right-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block"
                  initial={{ opacity: 0, scale: 0.88, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div
                    className="w-80 h-52 rounded-2xl overflow-hidden border shadow-2xl"
                    style={{ borderColor: c.border, background: c.bg, boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${c.border}` }}
                  >
                    <iframe
                      src={c.url}
                      title={c.name}
                      scrolling="no"
                      style={{
                        width: "200%",
                        height: "400px",
                        border: "none",
                        transform: "scale(0.5) translateY(-25%)",
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
