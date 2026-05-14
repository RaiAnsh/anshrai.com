"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "I'm a CS student at TMU with a focus on",
  "database architecture and analytics —",
  "the kind of work that turns raw data",
  "into decisions that actually matter.",
];

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const spans = containerRef.current.querySelectorAll(".reveal-line");
    gsap.fromTo(
      spans,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section className="px-6 md:px-10 py-28 max-w-5xl mx-auto" ref={containerRef}>
      <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-10">About</p>

      <p
        className="font-serif leading-tight mb-16"
        style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.025em" }}
      >
        {lines.map((line, i) => (
          <span key={i} className="reveal-line block" style={{ color: "#f0ede5" }}>
            {line}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Degree", value: "B.Sc. Computer Science", sub: "Toronto Metropolitan University · 2027" },
          { label: "Internship", value: "Open to roles", sub: "Data analyst · DB developer · Full-stack" },
          { label: "Side venture", value: "arweb.co", sub: "4 live client sites delivered" },
        ].map((item) => (
          <div
            key={item.label}
            className="border rounded-2xl p-6"
            style={{ borderColor: "rgba(240,237,229,0.08)", background: "rgba(240,237,229,0.02)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#d4a84b" }}>{item.label}</p>
            <p className="text-base font-semibold text-fg mb-1">{item.value}</p>
            <p className="text-sm" style={{ color: "#706c69" }}>{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
