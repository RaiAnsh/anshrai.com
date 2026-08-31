"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    num:   "01",
    title: "Website Design & Development",
    desc:  "A professional website that represents your business and brings in customers. Custom-built around your brand, designed to load fast, look great on every device, and turn visitors into leads.",
    price: "From $299",
    href:  "/quote",
  },
  {
    num:   "02",
    title: "Digital Business Systems",
    desc:  "Go beyond a basic website. Lead capture forms, AI chat assistants, automated follow-ups, booking systems, and custom integrations — built to work for your business around the clock.",
    price: "From $599",
    href:  "/quote",
  },
  {
    num:   "03",
    title: "Ongoing Support & Management",
    desc:  "Hosting, security, updates, and technical support — handled. You focus on running your business; I keep your website performing.",
    price: "From $15/mo",
    href:  "/quote",
  },
];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: "var(--ground)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display:         "flex",
          alignItems:      "flex-end",
          justifyContent:  "space-between",
          flexWrap:        "wrap",
          gap:             "2rem",
          marginBottom:    "clamp(56px,8vh,96px)",
        }}
      >
        <div>
          <motion.p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "1.25rem",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.p>

          <motion.h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 5.5vw, 80px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              color:         "#ffffff",
              margin:        0,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            What I build
            <br />
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>for your business.</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/quote" className="btn-primary">Get an Instant Quote</Link>
        </motion.div>
      </div>

      {/* Service rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            style={{
              display:       "grid",
              gridTemplateColumns: "3rem 1fr auto",
              gap:           "clamp(16px, 3vw, 48px)",
              alignItems:    "start",
              padding:       "clamp(28px,4vh,48px) 0",
              borderTop:     "1px solid var(--border)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 + i * 0.1, ease }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      11,
                letterSpacing: "0.1em",
                color:         "rgba(37,99,235,0.5)",
                paddingTop:    "0.35em",
              }}
            >
              {s.num}
            </span>

            {/* Content */}
            <div>
              <h3
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(22px, 2.4vw, 34px)",
                  fontWeight:    300,
                  letterSpacing: "-0.02em",
                  lineHeight:    1.1,
                  color:         "#ffffff",
                  marginBottom:  "0.875rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize:   "clamp(13px, 1.1vw, 15px)",
                  lineHeight: 1.7,
                  color:      "var(--fg-dim)",
                  maxWidth:   520,
                  margin:     0,
                }}
              >
                {s.desc}
              </p>
            </div>

            {/* Price + CTA — right column */}
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                alignItems:    "flex-end",
                gap:           "0.75rem",
                textAlign:     "right",
                flexShrink:    0,
              }}
            >
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(18px, 1.8vw, 24px)",
                  fontWeight:    300,
                  letterSpacing: "-0.02em",
                  color:         "#ffffff",
                  whiteSpace:    "nowrap",
                }}
              >
                {s.price}
              </span>
              <Link
                href={s.href}
                style={{
                  fontFamily:    "var(--font-ui)",
                  fontSize:      12,
                  letterSpacing: "0.04em",
                  color:         "var(--accent)",
                  textDecoration: "none",
                  whiteSpace:    "nowrap",
                  transition:    "opacity 140ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
              >
                Get a quote →
              </Link>
            </div>
          </motion.div>
        ))}

        {/* Last border */}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Footnote */}
      <motion.p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize:   12,
          color:      "var(--muted)",
          marginTop:  "2rem",
          opacity:    0.7,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Prices are estimates and vary by scope.{" "}
        <Link
          href="/quote"
          style={{ color: "var(--fg-dim)", textDecoration: "underline", textDecorationColor: "var(--border)" }}
        >
          Use the quote tool
        </Link>{" "}
        for a personalized estimate.
      </motion.p>
    </section>
  );
}
