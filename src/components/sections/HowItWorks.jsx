"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    num:   "01",
    title: "Get your estimate",
    desc:  "Answer a few quick questions and get an instant price estimate, no commitment, no sales call.",
  },
  {
    num:   "02",
    title: "Confirm your project",
    desc:  "We review your requirements together and agree on scope, timeline, and final pricing.",
  },
  {
    num:   "03",
    title: "Design & build",
    desc:  "I design and build your website, keeping you in the loop at every stage of the process.",
  },
  {
    num:   "04",
    title: "Review & launch",
    desc:  "You review and approve the finished site before anything goes live. No surprises.",
  },
  {
    num:   "05",
    title: "Ongoing support",
    desc:  "Depending on your plan, I handle hosting, updates, and technical support going forward.",
  },
];

export default function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          How it works
        </motion.p>

        <motion.h2
          className="font-heading font-bold mb-16"
          style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#ffffff",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          Simple from start
          <br />
          <span style={{ color: "#2563eb" }}>to launch.</span>
        </motion.h2>

        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex gap-8 md:gap-14 py-7 border-t last:border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
            >
              {/* Number */}
              <span
                className="font-heading font-bold flex-shrink-0 tabular-nums"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  letterSpacing: "-0.04em",
                  color: "rgba(37,99,235,0.18)",
                  lineHeight: 1,
                  marginTop: 2,
                  minWidth: 56,
                }}
              >
                {step.num}
              </span>

              <div>
                <h3
                  className="font-heading font-semibold mb-2"
                  style={{
                    fontSize: "clamp(17px, 1.8vw, 22px)",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#888888", maxWidth: 520 }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:brightness-110 hover:-translate-y-px"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Start with step one →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
