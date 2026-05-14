"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const statusColor = (s) =>
  s === "Completed" ? "#4ade80" : s === "Planned" ? "#d4a84b" : "#60a5fa";

export default function CaseStudies() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="projects" className="px-6 md:px-10 py-28 max-w-5xl mx-auto" ref={containerRef}>
      <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Analytics & Database</p>
      <h2
        className="font-serif text-fg mb-12"
        style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="project-card group border rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderColor: "rgba(240,237,229,0.08)",
              background: "rgba(240,237,229,0.02)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold text-fg leading-snug flex-1">{p.title}</h3>
              <span
                className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full"
                style={{
                  color: statusColor(p.status),
                  background: `${statusColor(p.status)}18`,
                  border: `1px solid ${statusColor(p.status)}30`,
                }}
              >
                {p.status}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: "#706c69" }}>{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "rgba(240,237,229,0.1)", color: "#706c69" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <Link
                href={p.href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline underline-offset-2"
              >
                View case study →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
