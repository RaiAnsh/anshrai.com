"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── Terminal lines shown on the monitor screen ─── */
const termLines = [
  { text: "→ const ansh = new Developer()",           color: "#60a5fa" },
  { text: '   role: "Web Design + Data Analytics"',   color: "#93c5fd" },
  { text: "   skills: ['Python','SQL','React','Next']",color: "#93c5fd" },
  { text: "   clients: 8,   // live websites",        color: "#475569" },
  { text: '   seeking: "Internship · Co-op 2025"',    color: "#93c5fd" },
  { text: "→ ansh.deploy()  // anshrai.com",          color: "#00d4ff" },
];

/* ─── Full-viewport front-view desk scene ─── */
function DeskScene() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>

      {/* ── Ambient monitor glow on ceiling/wall ── */}
      <div style={{
        position: "absolute",
        top: 0, left: "20%", width: "60%", height: "55%",
        background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0,100,255,0.07) 0%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {/* ── MONITOR FRAME ── */}
      <div style={{
        position: "absolute",
        top: "6vh",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(72vw, 1020px)",
        height: "56vh",
        background: "#07070d",
        borderRadius: "10px 10px 4px 4px",
        border: "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: `
          0 0 0 1px rgba(0,100,255,0.12),
          0 0 60px rgba(0,110,255,0.22),
          0 0 140px rgba(0,80,200,0.14),
          0 0 260px rgba(0,60,180,0.08)
        `,
      }}>

        {/* Monitor bezel inner */}
        <div style={{
          position: "absolute",
          inset: 10,
          background: "linear-gradient(160deg,#020510 0%,#030b1e 50%,#020810 100%)",
          borderRadius: 5,
          boxShadow: "inset 0 0 80px rgba(0,100,255,0.1), inset 0 0 160px rgba(0,60,200,0.06)",
          overflow: "hidden",
        }}>
          {/* Scanline texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 4px)",
            pointerEvents: "none",
          }} />

          {/* Terminal content */}
          <div style={{ padding: "clamp(18px,2.5vh,32px) clamp(22px,3vw,40px)" }}>
            {/* Mac-style traffic lights */}
            <div style={{ display: "flex", gap: 7, marginBottom: "clamp(12px,1.8vh,22px)", opacity: 0.5 }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </div>
            {termLines.map((l, i) => (
              <div key={i} style={{
                fontFamily: "'Courier New',monospace",
                fontSize: "clamp(11px,1.2vw,15px)",
                color: l.color,
                marginBottom: "clamp(7px,0.9vh,11px)",
                letterSpacing: "0.025em",
                opacity: 0.92,
              }}>
                {l.text}
                {i === termLines.length - 1 && (
                  <span style={{ animation: "termBlink 1s step-end infinite", color: "#00d4ff" }}>▌</span>
                )}
              </div>
            ))}
          </div>

          {/* Screen ambient glow overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 45% at 50% 20%,rgba(0,110,255,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Thin top bezel camera dot */}
        <div style={{
          position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
          width: 6, height: 6, borderRadius: "50%", background: "#0f0f1a",
          border: "1px solid rgba(255,255,255,0.1)",
        }} />
      </div>

      {/* ── MONITOR STAND NECK ── */}
      <div style={{
        position: "absolute",
        bottom: "19.5vh",
        left: "50%",
        transform: "translateX(-50%)",
        width: 14,
        height: "12.5vh",
        background: "linear-gradient(to bottom,#0d0d16,#090910)",
      }} />

      {/* ── STAND BASE ── */}
      <div style={{
        position: "absolute",
        bottom: "19vh",
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(120px,16vw,220px)",
        height: 10,
        background: "#0a0a12",
        borderRadius: "8px 8px 4px 4px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }} />

      {/* ── DESK SURFACE ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "20vh",
        background: "#0b0b14",
        backgroundImage: `
          repeating-linear-gradient(45deg,  rgba(255,255,255,0.012) 0, transparent 1px, transparent 13px, rgba(255,255,255,0.012) 14px),
          repeating-linear-gradient(-45deg, rgba(255,255,255,0.012) 0, transparent 1px, transparent 13px, rgba(255,255,255,0.012) 14px)
        `,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* RGB underglow strip along desk top edge */}
        <div style={{
          position: "absolute",
          top: -4, left: "5%", width: "90%", height: 5,
          background: "linear-gradient(90deg,#0050ff,#00b4ff,#00ffee,#00b4ff,#0050ff)",
          borderRadius: 4,
          filter: "blur(6px)",
          opacity: 0.75,
          animation: "rgbShift 4s linear infinite",
        }} />

        {/* Side glow — left */}
        <div style={{
          position: "absolute",
          left: -4, top: 0, width: 5, height: "100%",
          background: "linear-gradient(to bottom,#0050ff,#00b4ff,transparent)",
          filter: "blur(6px)", opacity: 0.4,
          animation: "rgbShift 4s linear infinite reverse",
        }} />

        {/* Side glow — right */}
        <div style={{
          position: "absolute",
          right: -4, top: 0, width: 5, height: "100%",
          background: "linear-gradient(to bottom,#0050ff,#00b4ff,transparent)",
          filter: "blur(6px)", opacity: 0.4,
          animation: "rgbShift 4s linear infinite",
        }} />

        {/* ── KEYBOARD ── */}
        <div style={{
          position: "absolute",
          top: "2.5vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px,38vw,560px)",
          height: "clamp(40px,5.5vh,70px)",
          background: "#0d0d1a",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 20px rgba(0,80,255,0.1)",
          overflow: "hidden",
        }}>
          {[12,13,11,8].map((count, row) => (
            <div key={row} style={{
              position: "absolute",
              top: `${16 + row * 22}%`,
              left: `${2 + row * 1.5}%`,
              right: "2%",
              height: "18%",
              display: "flex", gap: 2,
            }}>
              {Array.from({ length: count }).map((_, k) => (
                <div key={k} style={{
                  flex: k === 0 && row > 0 ? `0 0 ${6 + row * 2}%` : 1,
                  height: "100%",
                  background: "#151528",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.04)",
                }} />
              ))}
            </div>
          ))}
          {/* KB RGB strip */}
          <div style={{
            position: "absolute", bottom: -3, left: "8%", width: "84%", height: 3,
            background: "linear-gradient(90deg,#0050ff,#00d4ff,#0050ff)",
            filter: "blur(4px)", opacity: 0.6,
            animation: "rgbShift 3s linear infinite",
          }} />
        </div>

        {/* ── MOUSE ── */}
        <div style={{
          position: "absolute",
          top: "2vh",
          left: "calc(50% + clamp(150px, 20vw, 300px))",
          width: "clamp(26px,3vw,44px)",
          height: "clamp(42px,5.5vh,64px)",
          background: "#0d0d1a",
          borderRadius: "50% 50% 40% 40%",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 16px rgba(0,80,255,0.18)",
        }}>
          <div style={{
            position: "absolute", top: "26%", left: "50%", transform: "translateX(-50%)",
            width: "30%", height: "28%",
            background: "#1e1e30", borderRadius: 3,
          }} />
        </div>

        {/* ── SMALL DECORATIVE ITEMS (right side) ── */}
        {/* Headphone stand silhouette */}
        <div style={{
          position: "absolute",
          top: "1.5vh",
          left: "calc(50% - clamp(200px,26vw,380px))",
          width: "clamp(22px,2.5vw,36px)",
          height: "clamp(38px,5vh,58px)",
          background: "#0d0d1a",
          borderRadius: "12px 12px 4px 4px",
          border: "1px solid rgba(255,255,255,0.06)",
          opacity: 0.7,
        }} />
        {/* Small mug right side */}
        <div style={{
          position: "absolute",
          top: "2vh",
          right: "clamp(40px,6vw,100px)",
          width: "clamp(24px,2.8vw,40px)",
          height: "clamp(24px,2.8vw,40px)",
          borderRadius: "50%",
          background: "#0a0a14",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 14px rgba(200,110,30,0.1)",
        }} />
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════
   Main export
═══════════════════════════════════════════ */
export default function DeskHero() {
  const wrapperRef  = useRef(null);
  const sceneRef    = useRef(null);
  const cornerRef   = useRef(null);
  const scrollHintRef = useRef(null);
  const fadeOutRef  = useRef(null);

  /* Responsive wrapper height */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      el.style.height = window.innerWidth >= 768 ? "450vh" : "100vh";
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* ── Main zoom: scene starts at 0.75 (fills viewport nicely),
            zooms all the way into the monitor ── */
      gsap.fromTo(sceneRef.current,
        { scale: 0.75 },
        {
          scale: 6,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      /* Corner text fades out in first third */
      gsap.fromTo(cornerRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "22% bottom",
            scrub: 1,
          },
        }
      );

      /* Scroll hint fades faster */
      gsap.fromTo(scrollHintRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "12% bottom",
            scrub: 1,
          },
        }
      );

      /* Bottom dissolve near end */
      gsap.fromTo(fadeOutRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "80% top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(sceneRef.current, { scale: 0.75 });
      return () => {};
    });
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef}>
      {/* ── Sticky 100vh viewport ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#050408" }}>

        {/* Edge vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%,transparent 50%,rgba(5,4,8,0.65) 100%)",
        }} />

        {/* Bottom-left dark gradient — makes corner text always readable */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: "55%", height: "48%",
          background: "linear-gradient(to right, rgba(5,4,8,0.88) 0%, rgba(5,4,8,0.4) 60%, transparent 100%)",
          pointerEvents: "none", zIndex: 11,
        }} />

        {/* ── Corner text (wearebrand style) ── */}
        <div ref={cornerRef} style={{ position: "absolute", bottom: 60, left: 44, zIndex: 20, maxWidth: 340 }}>
          <motion.p
            style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4a84b", marginBottom: 10 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#d4a84b", marginRight: 10, verticalAlign: "middle" }} />
            Open for internships
          </motion.p>
          <motion.h1
            className="font-serif"
            style={{
              fontSize: "clamp(36px,4.5vw,60px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#f0ede5",
              margin: 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Websites<br />
            <span style={{ color: "#d4c8b8" }}>businesses</span><br />
            <span style={{ color: "#d4a84b" }}>love.</span>
          </motion.h1>
          <motion.p
            style={{ fontSize: 13, color: "#706c69", marginTop: 14, fontStyle: "italic" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Not just beautiful — built to convert.
          </motion.p>
          <motion.div
            style={{ display: "flex", gap: 12, marginTop: 22 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <a href="#work" style={{
              display: "inline-block", padding: "10px 24px",
              borderRadius: 100, fontSize: 13, fontWeight: 600,
              background: "#d4a84b", color: "#0a0909",
              textDecoration: "none",
            }}>
              See my work →
            </a>
            <a href="#contact" style={{
              display: "inline-block", padding: "10px 24px",
              borderRadius: 100, fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(240,237,229,0.15)",
              color: "#706c69", textDecoration: "none",
            }}>
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* ── Scroll hint — bottom right ── */}
        <motion.div
          ref={scrollHintRef}
          style={{
            position: "absolute", bottom: 38, right: 44, zIndex: 20,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            color: "#706c69", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div style={{ width: 1, height: 44, background: "rgba(112,108,105,0.35)" }} />
          Scroll
        </motion.div>

        {/* ── Desk scene — this gets GSAP-scaled ── */}
        <div
          ref={sceneRef}
          style={{
            position: "absolute", inset: 0,
            /* Zoom toward the monitor center (~35% from top of viewport) */
            transformOrigin: "50% 33%",
          }}
        >
          <DeskScene />
        </div>

        {/* ── Bottom dissolve → next section ── */}
        <div
          ref={fadeOutRef}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "60vh",
            background: "linear-gradient(to bottom,transparent 0%,#0a0909 70%)",
            zIndex: 30,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
