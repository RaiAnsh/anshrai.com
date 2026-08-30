"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies } from "../data/caseStudies";
import { track, Events } from "../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

function Tag({ label, accent }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
      style={{
        background: `${accent}14`,
        border: `1px solid ${accent}28`,
        color: accent,
      }}
    >
      {label}
    </span>
  );
}

function DeliverableItem({ text, accent }) {
  return (
    <div className="flex items-start gap-3">
      <span
        style={{
          width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 2,
          background: `${accent}12`, border: `1px solid ${accent}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "block" }} />
      </span>
      <span className="text-sm leading-relaxed" style={{ color: "#888" }}>{text}</span>
    </div>
  );
}

export default function CaseStudyPage({ cs }) {
  const others = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 2);

  return (
    <main className="min-h-screen" style={{ background: "#090909" }}>

      {/* ── Back nav ── */}
      <div
        className="px-6 md:px-16 lg:px-24 pt-28 pb-0"
        style={{ maxWidth: "100%" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:text-fg mb-12"
            style={{ color: "#555" }}
          >
            ← Back to work
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Eyebrow */}
          <motion.p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-6"
            style={{ color: cs.accentColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cs.industry} · {cs.location}
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-heading font-bold leading-[1.06] mb-8"
            style={{
              fontSize: "clamp(32px, 5.5vw, 72px)",
              letterSpacing: "-0.035em",
              color: "#ffffff",
              maxWidth: 900,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            {cs.headline}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.12em] mb-1" style={{ color: "#444" }}>Client</p>
              <p className="text-sm font-semibold" style={{ color: "#fff" }}>{cs.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] mb-1" style={{ color: "#444" }}>Website</p>
              <a
                href={cs.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => track(Events.CLIENT_SITE_VISITED, { client: cs.client })}
                className="text-sm font-semibold transition-colors hover:text-fg"
                style={{ color: cs.accentColor }}
              >
                {cs.display} ↗
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] mb-1" style={{ color: "#444" }}>Industry</p>
              <p className="text-sm font-semibold" style={{ color: "#fff" }}>{cs.industry}</p>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {cs.tags.map((tag) => (
              <Tag key={tag} label={tag} accent={cs.accentColor} />
            ))}
          </motion.div>

          {/* Site mockup / screenshot */}
          <motion.div
            className="w-full rounded-2xl overflow-hidden mb-24"
            style={{
              background: "#0d0d0d",
              border: `1px solid rgba(255,255,255,0.06)`,
              aspectRatio: "16/9",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            {cs.thumb ? (
              <Image
                src={cs.thumb}
                alt={`${cs.client} website screenshot`}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                className="w-full h-full flex flex-col"
                style={{ background: "#0d0d0d" }}
              >
                {/* Browser chrome */}
                <div
                  style={{
                    height: 38,
                    background: "#141414",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    paddingLeft: 14,
                    flexShrink: 0,
                  }}
                >
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                  ))}
                  <span
                    className="text-xs ml-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6,
                      padding: "2px 12px",
                      color: "#444",
                      fontSize: 11,
                    }}
                  >
                    {cs.display}
                  </span>
                </div>
                {/* Content area */}
                <div
                  className="flex-1 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${cs.accentColor}08 0%, transparent 60%)`,
                  }}
                >
                  <div className="text-center">
                    <p
                      className="font-heading font-bold mb-2"
                      style={{ fontSize: "clamp(24px, 3vw, 40px)", color: cs.accentColor, letterSpacing: "-0.03em", opacity: 0.4 }}
                    >
                      {cs.client}
                    </p>
                    <p className="text-xs" style={{ color: "#333" }}>{cs.display}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Body: 2-col on desktop ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">

            {/* Left: narrative */}
            <div>

              {/* Outcome metric (if present) */}
              {cs.outcome.metric && (
                <motion.div
                  className="mb-12 p-8 rounded-2xl"
                  style={{
                    background: `${cs.accentColor}08`,
                    border: `1px solid ${cs.accentColor}20`,
                    borderLeft: `3px solid ${cs.accentColor}`,
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease }}
                >
                  <p
                    className="font-heading font-bold mb-1"
                    style={{ fontSize: "clamp(40px, 6vw, 72px)", color: cs.accentColor, letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {cs.outcome.metric}
                  </p>
                  <p className="font-semibold text-sm mb-3" style={{ color: "#fff" }}>{cs.outcome.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{cs.outcome.context}</p>
                </motion.div>
              )}

              {/* Problem */}
              <section className="mb-12">
                <h2
                  className="font-heading font-bold mb-4"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#fff" }}
                >
                  The challenge
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{cs.problem}</p>
              </section>

              {/* Solution */}
              <section className="mb-12">
                <h2
                  className="font-heading font-bold mb-4"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#fff" }}
                >
                  What I built
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{cs.solution}</p>
              </section>

              {/* Outcome (no metric) */}
              {!cs.outcome.metric && cs.outcome.context && (
                <section className="mb-12">
                  <h2
                    className="font-heading font-bold mb-4"
                    style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.02em", color: "#fff" }}
                  >
                    The result
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#888" }}>{cs.outcome.context}</p>
                </section>
              )}
            </div>

            {/* Right: deliverables sidebar */}
            <div>
              <div
                className="rounded-2xl p-7 sticky top-28"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: "#555" }}>
                  What was delivered
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {cs.deliverables.map((d) => (
                    <DeliverableItem key={d} text={d} accent={cs.accentColor} />
                  ))}
                </div>

                <div
                  className="pt-6 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track(Events.CLIENT_SITE_VISITED, { client: cs.client })}
                    className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
                    style={{ background: cs.accentColor, color: "#fff" }}
                  >
                    Visit live site ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            className="mt-24 pt-16 border-t text-center"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-5" style={{ color: "#555" }}>
              Want results like this?
            </p>
            <h2
              className="font-heading font-bold mb-6"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                letterSpacing: "-0.035em",
                color: "#fff",
              }}
            >
              Let's build something for{" "}
              <span style={{ color: "#2563eb" }}>your business.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px"
                style={{ background: "#2563eb", color: "#fff" }}
              >
                Get an Instant Quote
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-px"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}
              >
                View more work
              </Link>
            </div>
          </div>

          {/* ── Other case studies ── */}
          {others.length > 0 && (
            <div className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-8" style={{ color: "#444" }}>
                More work
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/work/${o.slug}`}
                    className="group block p-7 rounded-2xl transition-all hover:-translate-y-1"
                    style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
                    onClick={() => track(Events.CASE_STUDY_VIEWED, { client: o.client })}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: o.accentColor }}>
                      {o.industry}
                    </p>
                    <p
                      className="font-heading font-semibold mb-2 transition-colors group-hover:text-fg"
                      style={{ fontSize: "clamp(16px, 1.5vw, 20px)", letterSpacing: "-0.02em", color: "#fff" }}
                    >
                      {o.client}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                      {o.headline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
