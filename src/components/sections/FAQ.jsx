"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const FAQS = [
  {
    q: "How much does a website cost in Toronto?",
    a: "Websites start at $299 for a custom 1–3 page site plus $15/month for hosting and support. Larger sites with more features start at $499 or $599. Use the instant quote tool to get an estimate based on your specific needs. Final pricing is confirmed after a brief project review.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most small business websites are built and ready to launch within 1–2 weeks from when we confirm your project. Larger or more complex builds typically take 2–4 weeks. Timeline depends on how quickly we can gather your content and complete the review process together.",
  },
  {
    q: "Do you work with businesses outside of Toronto?",
    a: "Yes. While I'm based in Toronto, I work with clients all across Canada. Everything is done remotely — calls, design reviews, and launches — so your location doesn't matter.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. If you already have a website that isn't doing what you need it to, I can redesign or rebuild it. We'd start by reviewing what you have and identifying what needs to improve.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "The monthly fee covers hosting, SSL (security), regular backups, and basic maintenance. Depending on your plan, it may also include content updates, analytics monitoring, and ongoing support.",
  },
  {
    q: "Can you connect my existing booking system?",
    a: "Yes. If you use a platform like Square, Acuity, Fresha, or another booking service, I can integrate it directly into your website so customers can book without friction.",
  },
  {
    q: "Do you provide SEO for Toronto businesses?",
    a: "Every website I build includes on-page SEO — proper page titles, meta descriptions, structured headings, and mobile optimization. Local SEO for Toronto is included on Growth and higher plans. More advanced ongoing SEO work is available as an add-on.",
  },
  {
    q: "What happens after I submit a quote request?",
    a: "You'll receive a reference number immediately. I'll review your project details and respond within 1 business day to confirm scope, answer questions, and outline the next steps.",
  },
];

function FAQItem({ faq, index, inView }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      style={{ borderTop: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.04, ease }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width:          "100%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "1.5rem",
          padding:        "1.375rem 0",
          textAlign:      "left",
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          color:          "inherit",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(15px, 1.4vw, 19px)",
            fontWeight:    300,
            letterSpacing: "-0.01em",
            color:         "#ffffff",
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            width:          22,
            height:         22,
            borderRadius:   "50%",
            border:         "1px solid var(--border)",
            flexShrink:     0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       14,
            color:          "var(--muted)",
            transition:     "transform 220ms ease",
            transform:      open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize:   "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.75,
                color:      "var(--fg-dim)",
                maxWidth:   680,
                padding:    "0 0 1.5rem",
                margin:     0,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        background: "var(--ground)",
        padding:    "clamp(96px,14vh,160px) clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap:                 "clamp(48px,8vw,96px)",
          alignItems:          "start",
        }}
      >
        {/* Left: label + intro */}
        <div style={{ position: "sticky", top: 120 }}>
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
            FAQ
          </motion.p>
          <motion.h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(40px, 4.5vw, 64px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              color:         "#ffffff",
              marginBottom:  "1.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Common
            <br />
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>questions.</em>
          </motion.h2>
          <motion.p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.7,
              color:      "var(--fg-dim)",
              margin:     0,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Something else?{" "}
            <Link
              href="/quote"
              style={{
                color:          "var(--fg-dim)",
                textDecoration: "underline",
                textDecorationColor: "var(--border)",
              }}
            >
              Send me a message.
            </Link>
          </motion.p>
        </div>

        {/* Right: accordion */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
