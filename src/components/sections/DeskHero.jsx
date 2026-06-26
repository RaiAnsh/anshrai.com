"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── Monitor screen content ─── */
const termLines = [
  { text: "const ansh = new Developer()", color: "#60a5fa" },
  { text: 'ansh.role = "Web Design + Data Analytics"', color: "#93c5fd" },
  { text: "ansh.skills = ['Python','SQL','React','PostgreSQL']", color: "#93c5fd" },
  { text: "ansh.clients = 8  // live websites", color: "#64748b" },
  { text: 'ansh.seeking = "Internship / Co-op · 2025"', color: "#93c5fd" },
  { text: "ansh.deploy() // → anshrai.com", color: "#00d4ff" },
];

/* ─── Carbon‑fiber desk surface ─── */
function DeskSurface({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: 880,
        height: 480,
        background: "#0b0b14",
        backgroundImage: `
          repeating-linear-gradient(45deg,  rgba(255,255,255,0.013) 0px, transparent 1px, transparent 13px, rgba(255,255,255,0.013) 14px),
          repeating-linear-gradient(-45deg, rgba(255,255,255,0.013) 0px, transparent 1px, transparent 13px, rgba(255,255,255,0.013) 14px)
        `,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: `
          0 0 0 1px rgba(0,130,255,0.14),
          0 0 60px rgba(0,110,255,0.20),
          0 0 130px rgba(0,80,220,0.13),
          0 0 240px rgba(0,60,200,0.08),
          inset 0 0 120px rgba(0,100,255,0.04)
        `,
      }}
    >
      {/* RGB strip — bottom edge */}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          left: "8%",
          width: "84%",
          height: 5,
          background:
            "linear-gradient(90deg,#0050ff,#00b4ff,#00ffee,#00b4ff,#0050ff)",
          borderRadius: 4,
          filter: "blur(7px)",
          opacity: 0.85,
          animation: "rgbShift 4s linear infinite",
        }}
      />
      {/* RGB strip — left edge */}
      <div
        style={{
          position: "absolute",
          left: -4,
          top: "15%",
          width: 5,
          height: "70%",
          background:
            "linear-gradient(180deg,#0050ff,#00b4ff,#00ffee,#00b4ff,#0050ff)",
          borderRadius: 4,
          filter: "blur(6px)",
          opacity: 0.55,
          animation: "rgbShift 4s linear infinite reverse",
        }}
      />
      {/* RGB strip — right edge */}
      <div
        style={{
          position: "absolute",
          right: -4,
          top: "15%",
          width: 5,
          height: "70%",
          background:
            "linear-gradient(180deg,#0050ff,#00b4ff,#00ffee,#00b4ff,#0050ff)",
          borderRadius: 4,
          filter: "blur(6px)",
          opacity: 0.55,
          animation: "rgbShift 4s linear infinite",
        }}
      />
      {children}
    </div>
  );
}

/* ─── Monitor ─── */
function Monitor() {
  return (
    <>
      {/* Monitor riser shelf */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 58,
          width: 764,
          height: 58,
          background: "#07070e",
          borderRadius: "8px 8px 0 0",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 7px 0 #04040a, 0 0 28px rgba(0,80,255,0.1)",
          zIndex: 2,
        }}
      />

      {/* Monitor screen */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 76,
          width: 728,
          height: 338,
          background: "linear-gradient(160deg,#020510 0%,#030a1c 50%,#020810 100%)",
          borderRadius: "3px 3px 0 0",
          border: "1px solid rgba(0,100,255,0.22)",
          boxShadow: `
            inset 0 0 70px rgba(0,100,255,0.11),
            inset 0 0 140px rgba(0,60,200,0.06),
            0 0 45px rgba(0,130,255,0.28),
            0 0 90px rgba(0,90,200,0.16)
          `,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Screen scanline texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
          }}
        />
        {/* Terminal content */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ marginBottom: 14, opacity: 0.4 }}>
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", marginRight: 6 }} />
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#febc2e", marginRight: 6 }} />
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          </div>
          {termLines.map((l, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12.5,
                color: l.color,
                marginBottom: 9,
                letterSpacing: "0.03em",
                opacity: 0.9,
              }}
            >
              {l.text}
              {i === termLines.length - 1 && (
                <span style={{ animation: "termBlink 1s step-end infinite", color: "#00d4ff" }}>▌</span>
              )}
            </div>
          ))}
        </div>
        {/* Screen ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 50% at 50% 25%,rgba(0,100,255,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Monitor stand neck */}
      <div
        style={{
          position: "absolute",
          top: 358,
          left: "50%",
          transform: "translateX(-50%)",
          width: 110,
          height: 18,
          background: "#09090f",
          borderRadius: "0 0 5px 5px",
          border: "1px solid rgba(255,255,255,0.05)",
          zIndex: 3,
        }}
      />
    </>
  );
}

/* ─── Keyboard ─── */
function Keyboard() {
  const rows = [13, 14, 13, 9]; // keys per row (approx)
  return (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 80,
        width: 536,
        height: 68,
        background: "#0e0e1a",
        borderRadius: 7,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 24px rgba(0,80,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
        overflow: "hidden",
        zIndex: 4,
      }}
    >
      {rows.map((count, row) => (
        <div
          key={row}
          style={{
            position: "absolute",
            top: 8 + row * 14,
            left: 10 + row * 5,
            right: 10,
            height: 9,
            display: "flex",
            gap: 3,
          }}
        >
          {Array.from({ length: count }).map((_, k) => (
            <div
              key={k}
              style={{
                flex: k === 0 && row > 0 ? `0 0 ${14 + row * 5}px` : 1,
                height: "100%",
                background: "#16162a",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      ))}
      {/* RGB underglow */}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          left: "8%",
          width: "84%",
          height: 4,
          background: "linear-gradient(90deg,#0050ff,#00d4ff,#00ffee,#0050ff)",
          filter: "blur(5px)",
          opacity: 0.65,
          animation: "rgbShift 3s linear infinite",
        }}
      />
    </div>
  );
}

/* ─── Mouse ─── */
function Mouse() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 46,
        right: 110,
        width: 40,
        height: 64,
        background: "#0e0e1a",
        borderRadius: "20px 20px 16px 16px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 18px rgba(0,80,255,0.2)",
        zIndex: 4,
      }}
    >
      {/* Scroll wheel */}
      <div
        style={{
          position: "absolute",
          top: 17,
          left: "50%",
          transform: "translateX(-50%)",
          width: 7,
          height: 13,
          background: "#202034",
          borderRadius: 4,
        }}
      />
      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          width: 1,
          height: 22,
          background: "rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

/* ─── Mousepad ─── */
function Mousepad() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: 64,
        width: 600,
        height: 90,
        background: "#080810",
        borderRadius: 9,
        border: "1px solid rgba(255,255,255,0.05)",
        zIndex: 3,
      }}
    />
  );
}

/* ─── Business card ─── */
function BusinessCard() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 166,
        width: 108,
        height: 65,
        background:
          "linear-gradient(135deg,#18110a 0%,#241808 45%,#18110a 100%)",
        borderRadius: 6,
        border: "1px solid rgba(212,168,75,0.48)",
        boxShadow:
          "0 0 22px rgba(212,168,75,0.14),inset 0 0 18px rgba(212,168,75,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 10px",
        zIndex: 5,
      }}
    >
      <div
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 9,
          color: "#d4a84b",
          letterSpacing: "0.07em",
          marginBottom: 4,
        }}
      >
        ANSH RAI
      </div>
      <div
        style={{
          fontSize: 6.5,
          color: "rgba(212,168,75,0.55)",
          letterSpacing: "0.09em",
          marginBottom: 3,
        }}
      >
        WEB DESIGN · DATA
      </div>
      <div
        style={{
          fontSize: 6.5,
          color: "rgba(212,168,75,0.4)",
          letterSpacing: "0.07em",
        }}
      >
        arweb.co
      </div>
    </div>
  );
}

/* ─── Coffee mug (top‑down) ─── */
function Mug() {
  return (
    <div
      style={{
        position: "absolute",
        top: 398,
        left: 30,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "#0a0a14",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 22px rgba(200,110,30,0.13)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 4,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "#12121e",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
    </div>
  );
}

/* ─── Headphones (top‑down U‑shape) ─── */
function Headphones() {
  return (
    <div style={{ position: "absolute", top: 380, left: 88, zIndex: 4 }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "26px 26px 0 0",
          border: "5px solid #161626",
          borderBottom: "none",
          boxShadow: "0 0 12px rgba(0,80,255,0.1)",
        }}
      />
      {/* Ear cups */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: -7,
          width: 18,
          height: 18,
          borderRadius: 4,
          background: "#161626",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -10,
          right: -7,
          width: 18,
          height: 18,
          borderRadius: 4,
          background: "#161626",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

/* ─── Sticky note ─── */
function StickyNote() {
  return (
    <div
      style={{
        position: "absolute",
        top: 392,
        left: 158,
        width: 46,
        height: 46,
        background: "#1a1a08",
        border: "1px solid rgba(212,168,75,0.22)",
        borderRadius: 3,
        transform: "rotate(-4deg)",
        boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        padding: "7px 6px",
        zIndex: 4,
      }}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 1,
            background: "rgba(212,168,75,0.25)",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floor shadow (below desk) ─── */
function FloorShadow() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -50,
        left: "5%",
        width: "90%",
        height: 70,
        background: "rgba(0,0,0,0.7)",
        filter: "blur(35px)",
        borderRadius: "50%",
        zIndex: 0,
      }}
    />
  );
}

/* ═══════════════════════════════════════
   Main export
═══════════════════════════════════════ */
export default function DeskHero() {
  const wrapperRef = useRef(null);
  const sceneRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const fadeOutRef = useRef(null);

  /* Responsive wrapper height */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      el.style.height = window.innerWidth >= 768 ? "380vh" : "100vh";
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* Zoom the desk scene */
      gsap.fromTo(
        sceneRef.current,
        { scale: 0.26 },
        {
          scale: 4.8,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        }
      );

      /* Headline fades out first quarter */
      gsap.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "26% bottom",
            scrub: 1,
          },
        }
      );

      /* CTA fades faster */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "16% bottom",
            scrub: 1,
          },
        }
      );

      /* Bottom fade-to-bg at end */
      gsap.fromTo(
        fadeOutRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "78% top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(sceneRef.current, { scale: 0.54 });
      return () => {};
    });
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef}>
      {/* ── Sticky viewport ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Room floor */}
        <div
          className="absolute inset-0"
          style={{
            background: "#040406",
            backgroundImage: `radial-gradient(circle, rgba(0,80,255,0.055) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 55%,rgba(0,70,200,0.09) 0%,transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 95% 95% at 50% 50%,transparent 42%,rgba(4,4,6,0.82) 100%)",
          }}
        />

        {/* ── Headline ── */}
        <div
          ref={headlineRef}
          className="absolute inset-0 z-20 flex flex-col items-center pointer-events-none"
          style={{ paddingTop: "16vh", gap: 18 }}
        >
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
            style={{
              borderColor: "rgba(212,168,75,0.25)",
              background: "rgba(212,168,75,0.07)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#d4a84b" }}
            >
              Open for internships &amp; new projects
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-center"
            style={{
              fontSize: "clamp(42px,8.5vw,112px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ color: "#f0ede5" }}>Websites</span>
            <br />
            <span style={{ color: "#d4c8b8" }}>businesses</span>
            <br />
            <span style={{ color: "#d4a84b" }}>love.</span>
          </motion.h1>

          <motion.p
            className="text-center text-sm md:text-base"
            style={{ color: "#706c69" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
          >
            Web design · Database development · Data analytics
          </motion.p>
        </div>

        {/* ── CTA + scroll hint ── */}
        <motion.div
          ref={ctaRef}
          className="absolute bottom-9 left-0 right-0 z-20 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
        >
          <div className="flex gap-3 flex-wrap justify-center px-4">
            <a
              href="#work"
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: "#d4a84b", color: "#0a0909" }}
            >
              See my work →
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "rgba(240,237,229,0.15)", color: "#706c69" }}
            >
              Get in touch
            </a>
          </div>
          <div
            className="flex flex-col items-center gap-2 text-xs tracking-widest uppercase"
            style={{ color: "#706c69" }}
          >
            Scroll to explore
            <div className="w-px h-10 bg-current opacity-40" />
          </div>
        </motion.div>

        {/* ── Desk scene (GSAP scales this) ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingTop: "10vh" }}
        >
          <div
            ref={sceneRef}
            style={{ position: "relative", transformOrigin: "center 28%" }}
          >
            <FloorShadow />
            <DeskSurface>
              <Monitor />
              <Mousepad />
              <Keyboard />
              <Mouse />
              <BusinessCard />
              <Mug />
              <Headphones />
              <StickyNote />
            </DeskSurface>
          </div>
        </div>

        {/* ── Bottom fade — dissolves into next section ── */}
        <div
          ref={fadeOutRef}
          className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-0"
          style={{
            height: "55vh",
            background:
              "linear-gradient(to bottom,transparent 0%,#0a0909 75%)",
            zIndex: 30,
          }}
        />
      </div>
    </section>
  );
}
