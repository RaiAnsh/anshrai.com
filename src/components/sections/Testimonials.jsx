"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────
//  Testimonials
//  Phase 2: replace PLACEHOLDER_REVIEWS with real client quotes.
// ─────────────────────────────────────────────────

const PLACEHOLDER_REVIEWS = [
  {
    name:     "R. Lassri",
    company:  "RL Contracting",
    location: "Canada",
    rating:   5,
    quote:    "Our leads increased by 65% since launching the new website. Ansh delivered exactly what he promised — fast, professional, and built for results.",
    initials: "RL",
    accent:   "#2563eb",
  },
  {
    name:     "MAP Canada Team",
    company:  "MAP Canada",
    location: "Toronto, ON",
    rating:   5,
    quote:    "Ansh built our entire digital platform from scratch — public site, admin backend, and database. Everything worked on launch day. Remarkable work.",
    initials: "MC",
    accent:   "#22c55e",
  },
  {
    name:     "K. Group",
    company:  "K Group Ltd",
    location: "Canada",
    rating:   5,
    quote:    "Professional, fast, and affordable. Our renovation portfolio finally looks as good as the work we do. Highly recommend for any business serious about their online presence.",
    initials: "KG",
    accent:   "#f59e0b",
  },
];

const ease = [0.16, 1, 0.3, 1];

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: "0.2rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.2 3.8 11l.6-3.6L2 4.8l3.6-.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      style={{
        background:    "#0f0f0f",
        borderRadius:  20,
        border:        "1px solid rgba(255,255,255,0.06)",
        padding:       "clamp(28px,4vw,40px)",
        display:       "flex",
        flexDirection: "column",
        gap:           "1.25rem",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
    >
      {/* Stars */}
      <StarRating count={review.rating} />

      {/* Quote */}
      <blockquote
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(16px, 1.6vw, 22px)",
          fontWeight:    300,
          fontStyle:     "italic",
          letterSpacing: "-0.01em",
          lineHeight:    1.5,
          color:         "rgba(255,255,255,0.85)",
          margin:        0,
          flex:          1,
        }}
      >
        "{review.quote}"
      </blockquote>

      {/* Reviewer */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginTop: "auto" }}>
        <div
          style={{
            width:          40,
            height:         40,
            borderRadius:   "50%",
            background:     `${review.accent}20`,
            border:         `1px solid ${review.accent}35`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   11,
              fontWeight: 700,
              color:      review.accent,
              letterSpacing: "0.05em",
            }}
          >
            {review.initials}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "#ffffff", margin: 0 }}>
            {review.name}
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--muted)", margin: 0 }}>
            {review.company} · {review.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      style={{
        background: "#080808",
        padding:    "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "clamp(40px,6vh,64px)" }}>
        <p
          style={{
            fontFamily:    "var(--font-ui)",
            fontSize:      11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "var(--muted)",
            marginBottom:  "1.25rem",
          }}
        >
          Client Feedback
        </p>
        <h2
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(40px, 5.5vw, 80px)",
            fontWeight:    300,
            letterSpacing: "-0.03em",
            lineHeight:    0.95,
            color:         "#ffffff",
            margin:        0,
          }}
        >
          What clients{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
            actually say.
          </em>
        </h2>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap:                 "clamp(12px,2vw,20px)",
        }}
      >
        {PLACEHOLDER_REVIEWS.map((review, i) => (
          <ReviewCard key={review.company} review={review} index={i} />
        ))}
      </div>

      {/* Phase 2 note */}
      <p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.12)",
          textAlign:     "center",
          marginTop:     "2.5rem",
        }}
      >
        Phase 2 · Real client quotes and photos will replace these placeholders
      </p>
    </section>
  );
}
