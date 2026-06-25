"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "I'm a CS student at TMU with a",
  "focus on database architecture,",
  "analytics — and building websites",
  "businesses are proud to share.",
];

const cards = [
  {
    label: "Education",
    value: "B.Sc. Computer Science",
    sub: "Toronto Metropolitan University · 2027",
    accent: "#d4a84b",
  },
  {
    label: "Seeking",
    value: "Internship / Co-op",
    sub: "Data Analyst · DB Developer · IT Operations",
    accent: "#9333ea",
  },
  {
    label: "Business",
    value: "arweb.co",
    sub: "8 live client websites delivered",
    accent: "#e11d48",
  },
];

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const spans = containerRef.current.querySelectorAll(".reveal-line");
    gsap.fromTo(
      spans,
      { opacity: 0.12, color: "#706c69" },
      {
        opacity: 1,
        color: "#f0ede5",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 45%",
          scrub: 0.8,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section className="px-6 md:px-12 py-28 max-w-6xl mx-auto" ref={containerRef}>
      <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-10">About</p>

      <p
        className="font-serif leading-tight mb-16"
        style={{ fontSize: "clamp(28px, 4.8vw, 58px)", letterSpacing: "-0.03em" }}
      >
        {lines.map((line, i) => (
          <span key={i} className="reveal-line block" style={{ color: "#706c69" }}>
            {line}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((item) => (
          <div
            key={item.label}
            className="border rounded-2xl p-6 transition-colors duration-200 group"
            style={{
              borderColor: `${item.accent}22`,
              background: `${item.accent}08`,
            }}
          >
            <div
              className="w-8 h-1 rounded-full mb-4"
              style={{ background: item.accent }}
            />
            <p className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: item.accent }}>
              {item.label}
            </p>
            <p className="text-base font-semibold text-fg mb-1">{item.value}</p>
            <p className="text-sm" style={{ color: "#706c69" }}>{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
