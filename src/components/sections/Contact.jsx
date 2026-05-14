"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="px-6 md:px-10 py-32 max-w-5xl mx-auto" ref={ref}>
      <div
        className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
        style={{
          border: "1px solid rgba(212,168,75,0.2)",
          background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,75,0.07) 0%, transparent 65%)",
        }}
      >
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-gold mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Let's talk
        </motion.p>

        <motion.h2
          className="font-serif text-fg mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Open to internships<br />& new clients.
        </motion.h2>

        <motion.p
          className="text-base mb-10 max-w-md leading-relaxed"
          style={{ color: "#706c69" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you need a database developer for a team or a website built for your business — get in touch. I reply within 24 hours.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          <a
            href="mailto:anshr792@gmail.com"
            className="px-6 py-3 rounded-full text-sm font-semibold text-bg transition-all hover:-translate-y-0.5"
            style={{ background: "#d4a84b" }}
          >
            anshr792@gmail.com →
          </a>
          <a
            href="https://www.linkedin.com/in/anshrai"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(240,237,229,0.15)", color: "#706c69" }}
          >
            LinkedIn ↗
          </a>
        </motion.div>

        {/* Footer note */}
        <p className="mt-12 text-xs" style={{ color: "rgba(112,108,105,0.5)" }}>
          Based in Toronto, ON · anshrai.com
        </p>
      </div>
    </section>
  );
}
