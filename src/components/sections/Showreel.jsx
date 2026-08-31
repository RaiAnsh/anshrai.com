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
    headline: "Luxury interiors,\npresented online.",
    result:   "Full-stack site + booking system",
    img:      "/projects/k-group/hero.jpg",
    href:     "/work/k-group",
  },
  {
    slug:     "rl-contracting",
    label:    "General Contractor",
    client:   "RL Contracting",
    headline: "65% more leads\nfrom organic search.",
    result:   "SEO-driven rebuild, no paid ads",
    img:      "/projects/rl-contracting/hero.jpg",
    href:     "/work/rl-contracting",
  },
  {
    slug:     "map-canada",
    label:    "Non-Profit",
    client:   "MAP Canada",
    headline: "Humanitarian reach,\nmodern infrastructure.",
    result:   "Admin backend + public site",
    img:      "/projects/rl-contracting/hero.jpg",
    href:     "/work/map-canada",
  },
  {
    slug:     "kk-fade",
    label:    "Barbershop",
    client:   "K&K Fade Lounge",
    headline: "Book faster.\nFill more chairs.",
    result:   "Private studio booking site",
    img:      "/projects/k-group/hero.jpg",
    href:     "/work/kk-fade",
  },
  {
    slug:     "broadview",
    label:    "Entertainment",
    client:   "Broadview",
    headline: "Atmosphere\nbefore the door.",
    result:   "Event venue digital identity",
    img:      "/projects/broadview-hero.jpg",
    href:     "/work/broadview",
  },
];

/* One sticky scene */
function Scene({ scene, index, total }) {
  const ref      = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Image parallax — travels upward slower than scroll */
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  /* Content fades out near the end of this panel */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <div
      ref={ref}
      id={`scene-${index}`}
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Photography — fills the viewport */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          y: imgY,
          willChange: "transform",
        }}
      >
        <Image
          src={scene.img}
          alt={scene.headline.replace("\n", " ")}
          fill
          priority={index === 0}
          quality={85}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Gradient overlay — text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(11,11,14,0.88) 0%, rgba(11,11,14,0.55) 50%, rgba(11,11,14,0.20) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(32px,6vw,80px) clamp(24px,6vw,96px)",
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {scene.label}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 96px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "#ffffff",
            whiteSpace: "pre-line",
            marginBottom: "1.5rem",
          }}
        >
          {scene.headline}
        </h2>

        {/* Result tag + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-dim)",
              borderLeft: "2px solid var(--accent)",
              paddingLeft: "0.75rem",
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
              letterSpacing: "0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 160ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
          >
            Case study →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function Showreel() {
  return (
    <section id="work" style={{ background: "var(--ground)" }}>
      {/* Section label */}
      <div
        style={{
          padding: "clamp(64px,10vh,120px) clamp(24px,6vw,96px) 0",
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
      </div>

      {/* Scenes */}
      {SCENES.map((scene, i) => (
        <Scene key={scene.slug} scene={scene} index={i} total={SCENES.length} />
      ))}

      {/* Bottom CTA */}
      <div
        style={{
          padding: "clamp(80px,12vh,140px) clamp(24px,6vw,96px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px,4vw,56px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          See the full archive.
        </h3>
        <Link href="/work" className="btn-ghost">
          All case studies →
        </Link>
      </div>
    </section>
  );
}
