"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const services = [
  {
    num:    "01",
    title:  "Website Design & Development",
    desc:   "A professional website that represents your business and brings in customers. Custom-built around your brand, designed to load fast, look great on every device, and turn visitors into leads.",
    price:  "Starting from $299",
    cta:    "Get a quote →",
    href:   "/quote",
  },
  {
    num:    "02",
    title:  "Digital Business Systems",
    desc:   "Go beyond a basic website. Lead capture forms, AI chat assistants, automated follow-ups, booking systems, and custom integrations, built to work for your business around the clock.",
    price:  "Starting from $599",
    cta:    "Get a quote →",
    href:   "/quote",
  },
  {
    num:    "03",
    title:  "Ongoing Support & Management",
    desc:   "Hosting, security, updates, and technical support, handled. You focus on running your business; I keep your website performing.",
    price:  "From $15/month",
    cta:    "Get a quote →",
    href:   "/quote",
  },
];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 px-6 md:px-16 lg:px-24" style={{ zIndex: 10 }} ref={ref}>
      <div className="max-w-7xl mx-auto">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#2563eb" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.p>

        <motion.h2
          className="font-heading font-bold mb-16"
          style={{
            fontSize: "clamp(32px, 5vw, 62px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "#ffffff",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          What I build
          <br />
          <span style={{ color: "#2563eb" }}>for your business.</span>
        </motion.h2>

        <div className="flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-8 py-10 border-t last:border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
            >
              {/* Number */}
              <span
                className="text-xs font-semibold tabular-nums flex-shrink-0 w-8"
                style={{ color: "rgba(37,99,235,0.45)" }}
              >
                {s.num}
              </span>

              {/* Title */}
              <h3
                className="font-heading font-semibold flex-shrink-0 transition-colors duration-200 group-hover:text-accent"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  minWidth: "clamp(180px, 24vw, 300px)",
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="flex-1 leading-relaxed text-sm md:text-base"
                style={{ color: "#888888", maxWidth: 440 }}
              >
                {s.desc}
              </p>

              {/* Price + CTA */}
              <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-3">
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "#ffffff" }}
                >
                  {s.price}
                </span>
                <a
                  href={s.href}
                  className="text-xs font-semibold transition-colors hover:text-fg"
                  style={{ color: "#2563eb" }}
                >
                  {s.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="mt-8 text-xs"
          style={{ color: "#555" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Prices are estimates and vary by project scope. Use the{" "}
          <a href="/quote" className="underline underline-offset-2 transition-colors hover:text-fg" style={{ color: "#888" }}>
            instant quote tool
          </a>{" "}
          for a personalized estimate.
        </motion.p>
      </div>
    </section>
  );
}
