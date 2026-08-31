"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const DIFFERENTIATORS = [
  "You work directly with me, the developer building your project.",
  "No agency overhead. No account managers. No handoffs.",
  "Custom work tailored to your business, not a template.",
  "Fast turnaround without cutting corners.",
  "Ongoing support built into every plan.",
  "Honest pricing with nothing hidden.",
];

export default function WhoIAm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: identity ── */}
          <div>
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
              style={{ color: "#2563eb" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Who you're working with
            </motion.p>

            {/* Monogram */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="font-heading font-bold"
                  style={{ fontSize: 24, letterSpacing: "-0.04em", color: "#2563eb" }}
                >
                  AR
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="font-heading font-bold mb-6 leading-[1.08]"
              style={{
                fontSize: "clamp(28px, 3.8vw, 48px)",
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              Hi, I'm Ansh.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p className="leading-relaxed mb-5 text-sm md:text-base" style={{ color: "#888888" }}>
                I'm a Computer Science student and the developer behind arweb. I work directly
                with businesses, from initial planning and design through development, launch,
                and ongoing support.
              </p>
              <p className="leading-relaxed text-sm md:text-base" style={{ color: "#888888" }}>
                I started arweb because I saw local businesses losing customers to competitors
                with better websites, and realized I could fix that. Now I build the kind of
                digital experiences that actually make a difference.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              <a
                href="/technical"
                className="text-sm font-semibold transition-colors hover:text-fg"
                style={{ color: "#2563eb" }}
              >
                View technical background →
              </a>
            </motion.div>
          </div>

          {/* ── Right: differentiators ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-7" style={{ color: "#555" }}>
              Why work with me
            </p>
            <div className="flex flex-col gap-4">
              {DIFFERENTIATORS.map((d, i) => (
                <motion.div
                  key={d}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + i * 0.06, ease }}
                >
                  <span
                    style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.22)",
                      flexShrink: 0,
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb", display: "block" }} />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#888888" }}>
                    {d}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
