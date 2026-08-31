"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "../../data/caseStudies";
import { track, Events } from "../../lib/analytics";
import BrowserPreview from "../BrowserPreview";

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

function CaseStudyEntry({ cs, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      style={{
        display:    "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap:        "clamp(40px,6vw,96px)",
        padding:    "clamp(56px,8vh,96px) 0",
        borderTop:  "1px solid var(--border)",
        alignItems: "center",
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease }}
    >
      {/* ── Text column ── */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {/* Number + industry */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(48px,6vw,72px)",
                fontWeight:    300,
                color:         "rgba(255,255,255,0.04)",
                letterSpacing: "-0.04em",
                lineHeight:    1,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span
                style={{
                  fontFamily:    "var(--font-ui)",
                  fontSize:      10,
                  fontWeight:    600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         cs.accentColor,
                  display:       "block",
                  marginBottom:  "0.25rem",
                }}
              >
                {cs.industry}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--muted)" }}>
                {cs.location}
              </span>
            </div>
          </div>

          {/* Client name */}
          <p
            style={{
              fontFamily:    "var(--font-ui)",
              fontSize:      12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "0.75rem",
            }}
          >
            {cs.client}
          </p>

          {/* Headline */}
          <h3
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(24px, 2.8vw, 38px)",
              fontWeight:    300,
              letterSpacing: "-0.025em",
              lineHeight:    1.1,
              color:         "#ffffff",
              marginBottom:  "1.5rem",
            }}
          >
            {cs.headline}
          </h3>

          {/* Outcome metric */}
          {cs.outcome.metric && (
            <div
              style={{
                display:     "flex",
                alignItems:  "baseline",
                gap:         "0.875rem",
                marginBottom: "1.5rem",
                borderLeft:  `2px solid var(--accent)`,
                paddingLeft: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(36px, 5vw, 56px)",
                  fontWeight:    300,
                  letterSpacing: "-0.04em",
                  color:         "#ffffff",
                  lineHeight:    1,
                }}
              >
                {cs.outcome.metric}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize:   14,
                  color:      "var(--fg-dim)",
                  lineHeight: 1.4,
                  maxWidth:   160,
                }}
              >
                {cs.outcome.label}
              </span>
            </div>
          )}

          {/* Solution */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize:   "clamp(13px, 1.1vw, 15px)",
              lineHeight: 1.75,
              color:      "var(--fg-dim)",
              marginBottom: "1.5rem",
            }}
          >
            {cs.solution}
          </p>

          {/* Deliverable tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
            {cs.deliverables.slice(0, 5).map((d) => (
              <span
                key={d}
                style={{
                  fontFamily:   "var(--font-ui)",
                  fontSize:     11,
                  padding:      "0.25rem 0.75rem",
                  borderRadius: 9999,
                  background:   `${cs.accentColor}0d`,
                  border:       `1px solid ${cs.accentColor}28`,
                  color:        "var(--fg-dim)",
                }}
              >
                {d}
              </span>
            ))}
            {cs.deliverables.length > 5 && (
              <span
                style={{
                  fontFamily:   "var(--font-ui)",
                  fontSize:     11,
                  padding:      "0.25rem 0.75rem",
                  borderRadius: 9999,
                  background:   "rgba(255,255,255,0.03)",
                  border:       "1px solid var(--border)",
                  color:        "var(--muted)",
                }}
              >
                +{cs.deliverables.length - 5} more
              </span>
            )}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href={`/work/${cs.slug}`}
              onClick={() => track(Events.CASE_STUDY_VIEWED, { client: cs.client })}
              style={{
                fontFamily:     "var(--font-ui)",
                fontSize:       13,
                fontWeight:     500,
                color:          "#ffffff",
                textDecoration: "none",
                transition:     "opacity 140ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Visit {cs.display} ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Preview column ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <BrowserPreview
          url={cs.previewUrl ?? cs.url}
          displayUrl={cs.display}
          accentColor={cs.accentColor}
          thumb={cs.thumb}
          aspectRatio="16/10"
          scale={0.38}
        />
      </motion.div>
    </motion.article>
  );
}

export default function HomeCaseStudies() {
  return (
    <section
      id="work"
      style={{
        background: "var(--ground)",
        padding:    "0 clamp(24px,6vw,96px)",
        borderTop:  "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div style={{ paddingTop: "clamp(72px,10vh,120px)", paddingBottom: "clamp(16px,2vh,24px)" }}>
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
          Real businesses.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--muted)" }}>Real results.</em>
        </h2>
      </div>

      {/* Case study entries */}
      {caseStudies.filter((cs) => cs.featured).map((cs, i) => (
        <CaseStudyEntry key={cs.slug} cs={cs} index={i} />
      ))}

      {/* Client strip */}
      <div
        style={{
          paddingTop:    "clamp(32px,4vh,48px)",
          paddingBottom: "clamp(56px,8vh,80px)",
          marginTop:     "clamp(8px,1vh,16px)",
          borderTop:     "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-ui)",
            fontSize:      10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "var(--muted)",
            marginBottom:  "1.25rem",
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
