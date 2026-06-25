"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BusinessCard3D from "../BusinessCard3D";

const ease = [0.16, 1, 0.3, 1];

export default function BusinessCardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 md:px-12 py-24 overflow-hidden" ref={ref}>
      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(212,168,75,0.13) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 60% at 85% 30%, rgba(168,85,247,0.07) 0%, transparent 55%), " +
            "rgba(240,237,229,0.02)",
          border: "1px solid rgba(212,168,75,0.18)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 p-10 md:p-16">

          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <motion.p
              className="text-xs font-semibold tracking-widest uppercase text-gold mb-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              The card in your hand
            </motion.p>

            <motion.h2
              className="font-serif text-fg mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 54px)", letterSpacing: "-0.035em", lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Every site starts<br />
              <span style={{ color: "#d4a84b" }}>with a conversation.</span>
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: "#706c69" }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Got my card? You're already in the right place. I'm Ansh — web designer, database developer, and CS student at TMU. Let's build something great together.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="#contact"
                className="inline-flex text-sm font-semibold text-bg px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: "#d4a84b" }}
              >
                Get in touch →
              </a>
              <a
                href="/arweb"
                className="inline-flex text-sm font-semibold px-6 py-3 rounded-full border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(212,168,75,0.3)", color: "#d4a84b" }}
              >
                arweb.co ↗
              </a>
            </motion.div>
          </div>

          {/* Right — 3D card */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            <BusinessCard3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
