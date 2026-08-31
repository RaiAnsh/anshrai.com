"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "../../data/caseStudies";
import { track, Events } from "../../lib/analytics";
import BrowserPreview from "../BrowserPreview";

const ease = [0.16, 1, 0.3, 1];

/* ── Individual case study entry ── */
function CaseStudyEntry({ cs, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20 md:py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease }}
    >
      {/* ── Text column ── */}
      <div className="flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {/* Number + industry */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-heading font-bold tabular-nums"
              style={{ fontSize: "clamp(48px,6vw,72px)", color: "rgba(255,255,255,0.04)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span
                className="text-xs font-semibold tracking-[0.12em] uppercase block mb-1"
                style={{ color: cs.accentColor }}
              >
                {cs.industry}
              </span>
              <span className="text-xs" style={{ color: "#555" }}>
                {cs.location}
              </span>
            </div>
          </div>

          {/* Client name */}
          <p className="font-heading font-semibold mb-3" style={{ fontSize: "clamp(13px,1.2vw,15px)", color: "#555555", letterSpacing: "0.02em" }}>
            {cs.client}
          </p>

          {/* Headline */}
          <h3
            className="font-heading font-bold mb-5 leading-[1.1]"
            style={{
              fontSize: "clamp(24px, 3.2vw, 42px)",
              letterSpacing: "-0.025em",
              color: "#ffffff",
            }}
          >
            {cs.headline}
          </h3>

          {/* Outcome metric, only if available */}
          {cs.outcome.metric && (
            <div
              className="flex items-baseline gap-3 mb-6"
              style={{ borderLeft: `3px solid ${cs.accentColor}`, paddingLeft: 16 }}
            >
              <span
                className="font-heading font-bold"
                style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 1 }}
              >
                {cs.outcome.metric}
              </span>
              <span style={{ fontSize: 14, color: "#888", lineHeight: 1.4, maxWidth: 160 }}>
                {cs.outcome.label}
              </span>
            </div>
          )}

          {/* Solution summary */}
          <p className="leading-relaxed mb-6 text-sm md:text-base" style={{ color: "#888888" }}>
            {cs.solution}
          </p>

          {/* Outcome context (no metric) */}
          {!cs.outcome.metric && (
            <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#555" }}>
              {cs.outcome.context}
            </p>
          )}

          {/* Deliverables */}
          <div className="flex flex-wrap gap-2 mb-8">
            {cs.deliverables.slice(0, 5).map((d) => (
              <span
                key={d}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: `${cs.accentColor}0d`,
                  border: `1px solid ${cs.accentColor}22`,
                  color: "#888888",
                }}
              >
                {d}
              </span>
            ))}
            {cs.deliverables.length > 5 && (
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#555" }}>
                +{cs.deliverables.length - 5} more
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-6 flex-wrap">
            <a
              href={`/work/${cs.slug}`}
              onClick={() => track(Events.CASE_STUDY_VIEWED, { client: cs.client })}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#ffffff" }}
            >
              View case study →
            </a>
            <a
              href={cs.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => track(Events.CLIENT_SITE_VISITED, { client: cs.client })}
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#555" }}
            >
              Visit {cs.display} ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Preview column ── */}
      <motion.div
        className="flex items-center"
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

/* ── Client strip (remaining sites) ── */
function ClientStrip() {
  const STRIP_CLIENTS = [
    { name: "Broadview Barber",       url: "https://www.broadviewbarbersalon.ca" },
    { name: "Five Star Detailing",    url: "https://www.fivestarmobiledetailing.ca" },
    { name: "Sunder Wellness",        url: "https://sunderwellness.ca" },
    { name: "Delmar Contracting",     url: "https://www.delmarcontracting.ca" },
    { name: "The Pull Up Chef",       url: "https://www.thepullupchef.com" },
    { name: "Bradshaw Plumbing",      url: "https://www.bradshawplumbing.com" },
    { name: "United Tea Baggers Coalition", url: "https://unitedtea-baggerscoalition.com" },
  ];

  return (
    <div
      className="pt-12 pb-4 mt-4"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="text-xs tracking-[0.14em] uppercase mb-5" style={{ color: "#444" }}>
        Also built by arweb
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {STRIP_CLIENTS.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => track(Events.CLIENT_SITE_VISITED, { client: c.name })}
            className="text-sm transition-colors duration-150"
            style={{ color: "#444" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            {c.name} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Section ── */
export default function HomeCaseStudies() {
  return (
    <section
      id="work"
      className="relative px-6 md:px-16 lg:px-24"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="pt-16 pb-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "#2563eb" }}>
            Featured Work
          </p>
          <h2
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(32px, 4.5vw, 58px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#ffffff",
            }}
          >
            Real businesses.
            <br />
            <span style={{ color: "#2563eb" }}>Real results.</span>
          </h2>
        </div>

        {/* Case study entries */}
        {caseStudies.filter((cs) => cs.featured).map((cs, i) => (
          <CaseStudyEntry key={cs.slug} cs={cs} index={i} />
        ))}

        {/* Client strip */}
        <ClientStrip />

      </div>
    </section>
  );
}
