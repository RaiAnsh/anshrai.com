"use client";

import { useRef, useState } from "react";
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
    a: "Yes. While I'm based in Toronto, I work with clients all across Canada. Everything is done remotely, calls, design reviews, and launches, so your location doesn't matter.",
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
    a: "Every website I build includes on-page SEO, proper page titles, meta descriptions, structured headings, and mobile optimization. Local SEO for Toronto is included on Growth and higher plans. More advanced ongoing SEO work is available as an add-on.",
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
      className="border-t last:border-b"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.05, ease }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span
          className="font-heading font-semibold text-sm md:text-base"
          style={{ color: "#ffffff", letterSpacing: "-0.01em" }}
        >
          {faq.q}
        </span>
        <span
          style={{
            width: 22, height: 22, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#888",
            transition: "transform 220ms ease, border-color 220ms ease",
            transform: open ? "rotate(45deg)" : "none",
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
              className="text-sm leading-relaxed pb-6"
              style={{ color: "#888888", maxWidth: 680 }}
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
      className="relative py-32 px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">

          {/* Left: label + intro */}
          <div>
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-8"
              style={{ color: "#2563eb" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              FAQ
            </motion.p>
            <motion.h2
              className="font-heading font-bold leading-[1.08]"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              Common
              <br />
              questions.
            </motion.h2>
            <motion.p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: "#888" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Something else on your mind?{" "}
              <a
                href="/quote"
                className="underline underline-offset-2 transition-colors hover:text-fg"
                style={{ color: "#888" }}
              >
                Send me a message.
              </a>
            </motion.p>
          </div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
