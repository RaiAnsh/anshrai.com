"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

export default function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-32 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Blue top bar */}
          <div style={{ height: 3, background: "#2563eb" }} />

          <div className="px-10 md:px-20 py-20 md:py-24 text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-6"
              style={{ color: "#2563eb" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Ready to get started?
            </motion.p>

            <motion.h2
              className="font-heading font-bold leading-[1.06] mb-6"
              style={{
                fontSize: "clamp(34px, 5vw, 68px)",
                letterSpacing: "-0.035em",
                color: "#ffffff",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Let's build something
              <br />
              <span style={{ color: "#2563eb" }}>that works for you.</span>
            </motion.h2>

            <motion.p
              className="mb-10 mx-auto max-w-lg"
              style={{
                color: "#888888",
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              Get an instant estimate, then let's review your project together. No commitment, no sales call.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              <a
                href="/quote"
                onClick={() => track(Events.QUOTE_STARTED)}
                className="px-9 py-4 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px"
                style={{ background: "#2563eb", color: "#ffffff" }}
              >
                Get an Instant Quote
              </a>
              <a
                href="mailto:ansh@anshrai.com"
                onClick={() => track(Events.CONTACT_EMAIL_CLICKED)}
                className="px-9 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-px"
                style={{
                  background: "transparent",
                  color: "#888888",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Email me directly
              </a>
            </motion.div>

            <motion.p
              className="mt-8 text-xs"
              style={{ color: "#444" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.44 }}
            >
              Most inquiries receive a response within 1 business day.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
