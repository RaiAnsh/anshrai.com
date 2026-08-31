"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const SCENES = [
  {
    slug:     "k-group",
    label:    "Interior Design",
    client:   "K Group",
    headline: ["Luxury interiors,", "presented online."],
    result:   "Full-stack site + booking system",
    img:      "/projects/k-group/hero.jpg",
    href:     "/work/k-group",
    pos:      "65% center",
  },
  {
    slug:     "rl-contracting",
    label:    "General Contractor",
    client:   "RL Contracting",
    headline: ["65% more leads", "from organic search."],
    result:   "SEO-driven rebuild, no paid ads",
    img:      "/projects/rl-contracting/hero.jpg",
    href:     "/work/rl-contracting",
    pos:      "50% center",
  },
  {
    slug:     "map-canada",
    label:    "Non-Profit",
    client:   "MAP Canada",
    headline: ["Humanitarian reach,", "modern infrastructure."],
    result:   "Admin backend + public site",
    img:      "/projects/k-group/detail-raw.jpg",
    href:     "/work/map-canada",
    pos:      "center 30%",
  },
  {
    slug:     "kk-fade",
    label:    "Barbershop",
    client:   "K&K Fade Lounge",
    headline: ["Book faster.", "Fill more chairs."],
    result:   "Private studio booking site",
    img:      "/projects/rl-contracting/hero.jpg",
    href:     "/work/kk-fade",
    pos:      "30% center",
  },
  {
    slug:     "broadview",
    label:    "Entertainment Venue",
    client:   "Broadview",
    headline: ["Atmosphere", "before the door."],
    result:   "Event venue digital identity",
    img:      "/projects/broadview-hero.jpg",
    href:     "/work/broadview",
    pos:      "center 40%",
  },
];

/* Individual scene — receives parent scroll progress */
function Scene({ scene, index, total, scrollYProgress }) {
  const start   = index / total;
  const end     = (index + 1) / total;
  const inStart = Math.max(0, start - 0.02);
  const outEnd  = index === total - 1 ? 1 : end;

  const opacity = useTransform(
    scrollYProgress,
    [inStart, start + 0.04, end - 0.08, outEnd],
    [0,       1,             1,           index === total - 1 ? 1 : 0]
  );

  const imgY = useTransform(scrollYProgress, [start, end], ["0%", "12%"]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Photo */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-8% 0",
          y: imgY,
          willChange: "transform",
        }}
      >
        <Image
          src={scene.img}
          alt={scene.headline.join(" ")}
          fill
          quality={85}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: scene.pos }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(11,11,14,0.92) 0%, rgba(11,11,14,0.65) 50%, rgba(11,11,14,0.22) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "35%",
            background: "linear-gradient(to top, rgba(11,11,14,1) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Text content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(32px,6vw,80px) clamp(24px,6vw,96px)",
          pointerEvents: "auto",
        }}
      >
        {/* Counter */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1.25rem",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} &mdash; {scene.label}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 7vw, 112px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 0.97,
            color: "#ffffff",
            marginBottom: "1.75rem",
          }}
        >
          {scene.headline[0]}
          <br />
          <em style={{ fontStyle: "italic", color: "var(--muted)" }}>{scene.headline[1]}</em>
        </h2>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-dim)",
              borderLeft: "2px solid var(--accent)",
              paddingLeft: "0.875rem",
            }}
          >
            {scene.result}
          </span>
          <Link
            href={scene.href}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 500,
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.6,
              transition: "opacity 160ms",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
          >
            Case study →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* Dot progress indicator */
function ProgressDots({ scrollYProgress, total }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "clamp(24px,4vw,56px)",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 20,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const start = i / total;
        const end   = (i + 1) / total;
        return (
          <ProgressDot key={i} scrollYProgress={scrollYProgress} start={start} end={end} />
        );
      })}
    </div>
  );
}

function ProgressDot({ scrollYProgress, start, end }) {
  const scale   = useTransform(scrollYProgress, [start, start + 0.04, end - 0.04, end], [1, 1.5, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.04, end - 0.04, end], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      style={{
        width: 3,
        height: 3,
        borderRadius: "50%",
        background: "#fff",
        scale,
        opacity,
      }}
    />
  );
}

export default function Showreel() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });

  return (
    <section id="work" style={{ background: "var(--ground)" }}>

      {/* Section label row */}
      <div
        style={{
          padding: "clamp(72px,10vh,120px) clamp(24px,6vw,96px) clamp(40px,5vh,72px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Selected Work
        </p>
        <Link
          href="/work"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
            transition: "color 160ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          All projects →
        </Link>
      </div>

      {/* ── Sticky scroll container ── */}
      <div
        ref={containerRef}
        style={{ height: `${SCENES.length * 100}vh`, position: "relative" }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "var(--ground)",
          }}
        >
          {SCENES.map((scene, i) => (
            <Scene
              key={scene.slug}
              scene={scene}
              index={i}
              total={SCENES.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Progress dots */}
          <ProgressDots scrollYProgress={scrollYProgress} total={SCENES.length} />
        </div>
      </div>

      {/* Bottom transition out */}
      <div
        style={{
          padding: "clamp(80px,12vh,140px) clamp(24px,6vw,96px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px,5vw,72px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          See the full archive.
        </h3>
        <Link href="/work" className="btn-ghost">All case studies →</Link>
      </div>
    </section>
  );
}
