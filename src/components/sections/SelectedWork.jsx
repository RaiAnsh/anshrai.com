"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients } from "../../data/clients";

export default function SelectedWork() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" className="px-6 md:px-10 py-28 max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Client Work</p>
          <h2
            className="font-serif text-fg"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Websites built
          </h2>
        </div>
        <a
          href="/arweb"
          className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5"
          style={{ borderColor: "rgba(212,168,75,0.35)", color: "#d4a84b" }}
        >
          arweb.co ↗
        </a>
      </div>

      <div className="divide-y" style={{ borderColor: "rgba(240,237,229,0.07)" }}>
        {clients.map((c, i) => (
          <div
            key={c.name}
            className="group relative flex items-center justify-between py-6 cursor-pointer transition-colors duration-200"
            style={{ color: hovered === i ? "#f0ede5" : "#706c69" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Number */}
            <span className="text-xs w-8 flex-shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>

            {/* Name + type */}
            <div className="flex-1 min-w-0 px-4">
              <span
                className="block text-base md:text-lg font-semibold transition-colors duration-200"
                style={{ color: hovered === i ? "#f0ede5" : "#d0cdc8", letterSpacing: "-0.01em" }}
              >
                {c.name}
              </span>
              <span className="text-xs" style={{ color: c.accent, opacity: 0.85 }}>{c.type}</span>
            </div>

            {/* Tags (desktop) */}
            <div className="hidden md:flex gap-2 flex-shrink-0 mr-8">
              {c.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "rgba(240,237,229,0.1)", color: "#706c69" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all duration-150"
              style={{
                borderColor: hovered === i ? c.border : "rgba(240,237,229,0.08)",
                color: hovered === i ? c.accent : "#706c69",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Visit ↗
            </a>

            {/* Hover preview image */}
            <AnimatePresence>
              {hovered === i && c.url && (
                <motion.div
                  className="absolute right-28 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.92, y: "-45%" }}
                  animate={{ opacity: 1, scale: 1, y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.92, y: "-45%" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div
                    className="w-72 h-44 rounded-xl overflow-hidden border shadow-2xl"
                    style={{ borderColor: c.border, background: c.bg }}
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
          </div>
        ))}
      </div>
    </section>
  );
}
