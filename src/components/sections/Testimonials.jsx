"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────
//  REVIEWS
//  Phase 2: replace placeholder text with verbatim client quotes + photos.
// ─────────────────────────────────────────────────
const REVIEWS = [
  {
    name:     "Jamal B.",
    company:  "RL Contracting",
    location: "Canada",
    rating:   5,
    quote:    "Our leads jumped 65% after launching the new site. Ansh understood our business immediately and built something that actually brings in customers — not just looks pretty.",
    initials: "JB",
    accent:   "#2563eb",
  },
  {
    name:     "Alex D.",
    company:  "Delmar Contracting",
    location: "Toronto, ON",
    rating:   5,
    quote:    "We needed a professional website fast. Ansh had us live in under two weeks and the quality was better than what agencies quoted us at triple the price. Couldn't be happier.",
    initials: "AD",
    accent:   "#3b82f6",
  },
  {
    name:     "Jim E.",
    company:  "United Tea Baggers Coalition",
    location: "Canada / USA",
    rating:   5,
    quote:    "Ansh nailed the look we were going for — edgy, bold, and exactly on-brand. The site loads fast and looks great on mobile. Exactly what we asked for, delivered on time.",
    initials: "JE",
    accent:   "#ef4444",
  },
  {
    name:     "Mohammad A.",
    company:  "Directway Movers",
    location: "Toronto, ON",
    rating:   5,
    quote:    "Since launching our new website we've had a noticeable increase in online bookings. Ansh handled everything — design, setup, SEO — and was easy to reach throughout the whole process.",
    initials: "MA",
    accent:   "#22c55e",
  },
  {
    name:     "Areen A.",
    company:  "MAP Canada",
    location: "Toronto, ON",
    rating:   5,
    quote:    "Ansh built our entire platform from scratch — public site, admin backend, database, the works. Everything worked on launch day. We couldn't have asked for a better result.",
    initials: "AA",
    accent:   "#22c55e",
  },
  {
    name:     "Kenny M.",
    company:  "KK Fade Lounge",
    location: "Toronto, ON",
    rating:   5,
    quote:    "The website finally matches the quality of the cuts inside the shop. Modern, sharp, and our clients always comment on how clean it looks. Ansh delivered exactly what we envisioned.",
    initials: "KM",
    accent:   "#a855f7",
  },
  {
    name:     "Trung T.",
    company:  "HighLife Express",
    location: "Ontario",
    rating:   5,
    quote:    "Our old site was embarrassing. Ansh gave us something professional that our customers actually trust. Clean, fast, and built to convert. Exactly what the business needed.",
    initials: "TT",
    accent:   "#f59e0b",
  },
];

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
        padding:       "clamp(24px,3.5vw,36px)",
        display:       "flex",
        flexDirection: "column",
        gap:           "1.25rem",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.07 }}
    >
      {/* Stars */}
      <StarRating count={review.rating} />

      {/* Quote */}
      <blockquote
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(15px, 1.5vw, 20px)",
          fontWeight:    300,
          fontStyle:     "italic",
          letterSpacing: "-0.01em",
          lineHeight:    1.55,
          color:         "rgba(255,255,255,0.82)",
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
              fontFamily:    "var(--font-ui)",
              fontSize:      11,
              fontWeight:    700,
              color:         review.accent,
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
  const [showAll, setShowAll] = useState(false);
  const INITIAL = 3;
  const visible = showAll ? REVIEWS : REVIEWS.slice(0, INITIAL);

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
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.28)" }}>
            actually say.
          </em>
        </h2>
      </div>

      {/* Cards grid — first 3 visible, rest behind "show more" */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap:                 "clamp(12px,1.8vw,20px)",
        }}
      >
        {visible.map((review, i) => (
          <ReviewCard key={review.company} review={review} index={i} />
        ))}
      </div>

      {/* Show more toggle */}
      {!showAll && REVIEWS.length > INITIAL && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              fontFamily:  "var(--font-ui)",
              fontSize:    13,
              color:       "var(--fg-dim)",
              background:  "rgba(255,255,255,0.04)",
              border:      "1px solid rgba(255,255,255,0.08)",
              borderRadius:9999,
              padding:     "0.6rem 1.5rem",
              cursor:      "pointer",
              transition:  "color 160ms ease, border-color 160ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-dim)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            Show {REVIEWS.length - INITIAL} more reviews
          </button>
        </div>
      )}

      {/* Phase 2 note */}
      <p
        style={{
          fontFamily:    "var(--font-ui)",
          fontSize:      10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.10)",
          textAlign:     "center",
          marginTop:     "2rem",
        }}
      >
        Phase 2 · Real verbatim quotes will replace these placeholders
      </p>
    </section>
  );
}
