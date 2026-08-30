"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

export default function QuoteTeaser() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      className="relative py-32 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 60%, transparent 100%)",
            border: "1px solid rgba(37,99,235,0.14)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <motion.p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#2563eb" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Instant Quote
          </motion.p>

          <motion.h2
            className="font-heading font-bold mb-5"
            style={{
              fontSize: "clamp(30px, 4.5vw, 58px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Get your estimate in
            <br />
            <span style={{ color: "#2563eb" }}>about 60 seconds.</span>
          </motion.h2>

          <motion.p
            className="mb-8 max-w-lg mx-auto"
            style={{ color: "#888888", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.65 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            Tell me about your business and what you need — get an instant price estimate.
            No commitment. No sales call.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.34 }}
          >
            <a
              href="/quote"
              onClick={() => track(Events.QUOTE_STARTED)}
              className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px"
              style={{ background: "#2563eb", color: "#ffffff" }}
            >
              Get My Instant Quote
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-xs"
            style={{ color: "#555" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.44 }}
          >
            Most projects start at $299 setup + $15/month.
            Estimates are free and arrive instantly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
