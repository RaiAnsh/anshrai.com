"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "../../data/caseStudies";
import { track, Events } from "../../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

const STRIP_CLIENTS = [
  { name: "Broadview Barber",            url: "https://www.broadviewbarbersalon.ca" },
  { name: "Five Star Detailing",         url: "https://www.fivestarmobiledetailing.ca" },
  { name: "Sunder Wellness",             url: "https://sunderwellness.ca" },
  { name: "Delmar Contracting",          url: "https://www.delmarcontracting.ca" },
  { name: "The Pull Up Chef",            url: "https://www.thepullupchef.com" },
  { name: "Bradshaw Plumbing",           url: "https://www.bradshawplumbing.com" },
  { name: "United Tea Baggers Coalition",url: "https://unitedtea-baggerscoalition.com" },
];

// Big dark rounded card for each case study (webinventix-style)
function CaseStudyCard({ cs, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       "grid",
        gridTemplateColumns: "1fr 1fr",
        background:    "#0f0f0f",
        borderRadius:  24,
        border:        "1px solid rgba(255,255,255,0.06)",
        overflow:      "hidden",
        minHeight:     520,
        transition:    "border-color 300ms ease",
        borderColor:   hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
    >
      {/* ── Left: text content ── */}
      <div
        style={{
          padding:       "clamp(40px,5vw,64px)",
          display:       "flex",
          flexDirection: "column",
          justifyContent:"space-between",
        }}
      >
        <div>
          {/* Number + industry pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <span
              style={{
                fontFamily:    "var(--font-ui)",
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         cs.accentColor,
                background:    `${cs.accentColor}18`,
                padding:       "0.3rem 0.85rem",
                borderRadius:  9999,
                border:        `1px solid ${cs.accentColor}35`,
              }}
            >
              {cs.industry}
            </span>
          </div>

          {/* Headline */}
          <h3
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(26px, 2.6vw, 40px)",
              fontWeight:    300,
              letterSpacing: "-0.025em",
              lineHeight:    1.1,
              color:         "#ffffff",
              marginBottom:  "1.5rem",
            }}
          >
            {cs.headline}
          </h3>

          {/* Solution snippet */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "2rem",
            }}
          >
            {cs.solution}
          </p>

          {/* Deliverable tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {cs.deliverables.slice(0, 4).map((d) => (
              <span
                key={d}
                style={{
                  fontFamily:   "var(--font-ui)",
                  fontSize:     11,
                  padding:      "0.25rem 0.75rem",
                  borderRadius: 9999,
                  background:   "rgba(255,255,255,0.04)",
                  border:       "1px solid rgba(255,255,255,0.07)",
                  color:        "var(--muted)",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: metric + CTA */}
        <div style={{ marginTop: "2.5rem" }}>
          {cs.outcome.metric && (
            <div
              style={{
                marginBottom: "1.5rem",
                paddingLeft:  "1rem",
                borderLeft:   `3px solid ${cs.accentColor}`,
              }}
            >
              <div
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(40px, 5vw, 60px)",
                  fontWeight:    300,
                  letterSpacing: "-0.04em",
                  color:         "#ffffff",
                  lineHeight:    1,
                }}
              >
                {cs.outcome.metric}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize:   13,
                  color:      "var(--fg-dim)",
                  marginTop:  "0.25rem",
                }}
              >
                {cs.outcome.label}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href={`/work/${cs.slug}`}
              onClick={() => track(Events.CASE_STUDY_VIEWED, { client: cs.client })}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "0.5rem",
                fontFamily:     "var(--font-ui)",
                fontSize:       13,
                fontWeight:     500,
                color:          "#ffffff",
                textDecoration: "none",
                background:     "rgba(255,255,255,0.07)",
                border:         "1px solid rgba(255,255,255,0.10)",
                borderRadius:   9999,
                padding:        "0.55rem 1.25rem",
                transition:     "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            >
              View case study →
            </Link>
            <a
              href={cs.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => track(Events.CLIENT_SITE_VISITED, { client: cs.client })}
              style={{
                fontFamily:     "var(--font-ui)",
                fontSize:       13,
                color:          "var(--muted)",
                textDecoration: "none",
                transition:     "color 140ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Visit site ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── Right: screenshot ── */}
      <div
        style={{
          position:   "relative",
          overflow:   "hidden",
          background: "#0a0a0a",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          minHeight:  320,
        }}
      >
        {cs.screenshot ? (
          /* Real screenshot */
          <img
            src={cs.screenshot}
            alt={`${cs.client} website screenshot`}
            style={{
              position:   "absolute",
              inset:      0,
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              objectPosition: "top center",
              transition: "transform 500ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          /* Fallback placeholder */
          <>
            <div
              aria-hidden="true"
              style={{
                position:        "absolute",
                inset:           0,
                background:      `linear-gradient(135deg, ${cs.accentColor}08 0%, ${cs.accentColor}03 50%, #0a0a0a 100%)`,
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, ${cs.accentColor}08 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, ${cs.accentColor}08 40px)`,
                pointerEvents:   "none",
              }}
            />
            <div
              style={{
                position:       "absolute",
                inset:          0,
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                justifyContent: "center",
                padding:        "clamp(32px,4vw,56px)",
              }}
            >
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      64,
                  fontWeight:    300,
                  color:         `${cs.accentColor}40`,
                  letterSpacing: "-0.04em",
                  lineHeight:    1,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: `${cs.accentColor}60`, marginTop: "1rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {cs.client}
              </p>
            </div>
          </>
        )}

        {/* Gradient fade from left so it blends into text column */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to right, #0f0f0f 0%, transparent 18%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.article>
  );
}

export default function HomeCaseStudies() {
  return (
    <section
      id="work"
      style={{
        background: "#080808",
        padding:    "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Section header */}
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
          Featured Work
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
          Work that{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
            backs our claims.
          </em>
        </h2>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>
        {caseStudies.filter((cs) => cs.featured).map((cs, i) => (
          <CaseStudyCard key={cs.slug} cs={cs} index={i} />
        ))}
      </div>

      {/* Also-built strip */}
      <div
        style={{
          marginTop:     "clamp(40px,6vh,64px)",
          paddingTop:    "clamp(24px,4vh,40px)",
          borderTop:     "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-ui)",
            fontSize:      10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "var(--muted)",
            marginBottom:  "1rem",
          }}
        >
          Also built by arweb
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1.5rem" }}>
          {STRIP_CLIENTS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => track(Events.CLIENT_SITE_VISITED, { client: c.name })}
              style={{
                fontFamily:     "var(--font-ui)",
                fontSize:       13,
                color:          "var(--muted)",
                textDecoration: "none",
                transition:     "color 140ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {c.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
