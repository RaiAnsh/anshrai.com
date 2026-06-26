"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── Deterministic star positions (no Math.random → no hydration mismatch) ─── */
const STARS = Array.from({ length: 240 }, (_, i) => ({
  x: ((i * 37.103 + 13.7) % 100).toFixed(2),
  y: ((i * 53.719 + 27.3) % 100).toFixed(2),
  r: i % 11 === 0 ? 2.2 : i % 5 === 0 ? 1.6 : 1.0,
  o: (0.28 + (i % 9) * 0.08).toFixed(2),
  twinkle: i % 4 === 0,
}));

/* ─── Deterministic city light positions ─── */
const LIGHTS = Array.from({ length: 550 }, (_, i) => {
  const phi   = i * 2.39996; // golden angle
  const rho   = Math.sqrt(i / 550);
  const cx = 50, cy = 42, sx = 42, sy = 34;
  const x = cx + Math.cos(phi) * rho * sx;
  const y = cy + Math.sin(phi) * rho * sy;
  const density = 1 - rho;
  // Financial district: warm lights. Elsewhere: mix warm/cool
  const warm = (x > 44 && x < 56 && y > 36 && y < 50);
  const r = warm ? 255 : 200 + (i % 55);
  const g = warm ? 155 + (i % 60) : 195 + (i % 45);
  const b = warm ? 35 + (i % 45) : 245 + (i % 10);
  const a = Math.min(1, 0.38 + density * 0.65).toFixed(2);
  const sz = density > 0.72 ? 3 : density > 0.44 ? 2 : 1.2;
  return { x: x.toFixed(1), y: y.toFixed(1), sz, r, g, b, a };
}).filter(l => +l.x > 1 && +l.x < 99 && +l.y > 4 && +l.y < 92);

/* ════════════════════════════════════
   Visual layers
════════════════════════════════════ */

/* 1. Deep space — stars */
function StarField({ layerRef }) {
  return (
    <div
      ref={layerRef}
      style={{ position: "absolute", inset: 0, background: "#01020a", zIndex: 1 }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top:  `${s.y}%`,
            width:  s.r,
            height: s.r,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o,
            animation: s.twinkle ? `starTwinkle ${2 + (i % 3)}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
      {/* Milky way haze */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 40% at 60% 40%, rgba(80,60,160,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* 2. Earth sphere */
function Earth({ layerRef }) {
  return (
    <div
      ref={layerRef}
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "70vmin", height: "70vmin",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      {/* Atmosphere glow ring */}
      <div style={{
        position: "absolute",
        inset: "-14%",
        borderRadius: "50%",
        boxShadow: "0 0 40px 24px rgba(60,140,240,0.18), 0 0 90px 50px rgba(40,100,200,0.08)",
        pointerEvents: "none",
      }} />
      {/* Planet body */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: `
          radial-gradient(circle at 34% 30%, rgba(255,255,255,0.16) 0%, transparent 26%),
          radial-gradient(circle at 70% 22%, rgba(255,255,255,0.09) 0%, transparent 16%),
          radial-gradient(circle at 50% 62%, rgba(255,255,255,0.05) 0%, transparent 20%),
          linear-gradient(135deg,
            #1e6090 0%,  #2880b0 10%,
            #1a4a38 20%, #2d6b4f 32%,
            #3a8060 38%, #2877a8 46%,
            #1e5a88 54%, #2d6b4f 62%,
            #1a4a38 70%, #1e6090 80%,
            #2877a8 90%, #1e5a88 100%
          )
        `,
        boxShadow: `
          inset -70px -35px 130px rgba(0,0,20,0.88),
          inset 20px 10px 60px rgba(60,140,240,0.1),
          0 0 80px rgba(40,110,200,0.30),
          0 0 180px rgba(40,100,200,0.12)
        `,
        overflow: "hidden",
      }}>
        {/* Cloud streaks */}
        <div style={{
          position: "absolute", top: "18%", left: "5%", width: "55%", height: "12%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 60%, transparent)",
          filter: "blur(4px)",
        }} />
        <div style={{
          position: "absolute", top: "42%", left: "30%", width: "45%", height: "8%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.09) 40%, rgba(255,255,255,0.13) 70%, transparent)",
          filter: "blur(3px)",
        }} />
      </div>
    </div>
  );
}

/* 3. Earth surface close-up (Canada / Ontario) */
function EarthSurface({ layerRef }) {
  return (
    <div
      ref={layerRef}
      style={{ position: "absolute", inset: 0, zIndex: 3, opacity: 0 }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(175deg,
            #0a1a2e 0%,
            #122a18 18%,
            #1a3f22 32%,
            #163618 46%,
            #1a3f22 55%,
            #0d2a4a 68%,
            #08152e 80%,
            #040e1e 100%
          )
        `,
      }}>
        {/* Atmospheric haze at top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "22%",
          background: "linear-gradient(to bottom, rgba(60,120,200,0.35) 0%, transparent 100%)",
        }} />
        {/* Cloud cover */}
        <div style={{
          position: "absolute", top: "10%", left: "10%", right: "5%", height: "18%",
          background: "linear-gradient(90deg, transparent, rgba(200,220,240,0.1) 25%, rgba(200,220,240,0.16) 55%, rgba(200,220,240,0.08) 80%, transparent)",
          filter: "blur(12px)",
        }} />
        <div style={{
          position: "absolute", top: "28%", left: 0, right: "20%", height: "12%",
          background: "linear-gradient(90deg, rgba(200,220,240,0.07) 0%, rgba(200,220,240,0.12) 40%, transparent 100%)",
          filter: "blur(8px)",
        }} />
        {/* Lake Ontario — dark water strip */}
        <div style={{
          position: "absolute", bottom: "15%", left: "20%", right: "10%", height: "20%",
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, #071422 0%, #050e1a 60%, transparent 100%)",
          filter: "blur(6px)",
        }} />
        {/* City glow from far above — Toronto warmth */}
        <div style={{
          position: "absolute", top: "38%", left: "38%", width: "24%", height: "18%",
          background: "radial-gradient(ellipse, rgba(255,160,50,0.09) 0%, transparent 70%)",
          filter: "blur(18px)",
        }} />
      </div>
    </div>
  );
}

/* 4. Toronto at night — aerial grid */
function TorontoCity({ layerRef }) {
  return (
    <div
      ref={layerRef}
      style={{ position: "absolute", inset: 0, zIndex: 4, opacity: 0 }}
    >
      {/* Dark base — night sky */}
      <div style={{ position: "absolute", inset: 0, background: "#04060e" }} />

      {/* Street grid — major roads */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,175,55,0.18) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,175,55,0.18) 1px, transparent 1px)
        `,
        backgroundSize: "110px 110px",
      }} />
      {/* Street grid — minor roads */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,175,55,0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,175,55,0.055) 1px, transparent 1px)
        `,
        backgroundSize: "22px 22px",
      }} />

      {/* Downtown core glow */}
      <div style={{
        position: "absolute", top: "33%", left: "40%",
        width: "22%", height: "18%",
        background: "radial-gradient(ellipse, rgba(255,165,40,0.40) 0%, rgba(255,145,30,0.18) 50%, transparent 80%)",
        filter: "blur(22px)",
      }} />

      {/* Yonge–Dundas / Union Station area — brightest */}
      <div style={{
        position: "absolute", top: "40%", left: "46%",
        width: "10%", height: "10%",
        background: "radial-gradient(ellipse, rgba(255,200,80,0.55) 0%, transparent 70%)",
        filter: "blur(12px)",
      }} />

      {/* CN Tower glow — iconic spike */}
      <div style={{
        position: "absolute",
        top: "38%", left: "45.5%",
        width: 4, height: "10%",
        background: "linear-gradient(to top, rgba(255,80,200,0.9), rgba(255,60,180,0.3), transparent)",
        filter: "blur(2px)",
      }} />
      <div style={{
        position: "absolute",
        top: "42%", left: "44%",
        width: "4%", height: "3%",
        background: "radial-gradient(ellipse, rgba(255,80,200,0.35) 0%, transparent 70%)",
        filter: "blur(8px)",
      }} />

      {/* Highway 401 — diagonal streak top */}
      <div style={{
        position: "absolute", top: "12%", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,210,80,0.25) 20%, rgba(255,210,80,0.35) 50%, rgba(255,210,80,0.2) 80%, transparent 100%)",
        filter: "blur(1px)",
        transform: "rotate(-1.5deg)",
      }} />

      {/* Gardiner Expressway — near waterfront */}
      <div style={{
        position: "absolute", top: "56%", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent 10%, rgba(255,200,60,0.28) 25%, rgba(255,200,60,0.38) 55%, rgba(255,200,60,0.2) 80%, transparent 95%)",
        filter: "blur(1px)",
      }} />

      {/* DVP — north/south highway right side */}
      <div style={{
        position: "absolute", top: "5%", bottom: "35%", left: "68%",
        width: 2,
        background: "linear-gradient(to bottom, transparent, rgba(255,200,60,0.3) 20%, rgba(255,200,60,0.35) 60%, transparent)",
        filter: "blur(1px)",
      }} />

      {/* Lake Ontario — dark at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
        background: "linear-gradient(to bottom, transparent, #02040c 60%)",
      }} />
      {/* Waterfront shimmer */}
      <div style={{
        position: "absolute", bottom: "26%", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(60,120,200,0.22) 20%, rgba(80,150,240,0.28) 50%, rgba(60,120,200,0.18) 80%, transparent)",
        filter: "blur(2px)",
      }} />

      {/* Scattered building lights */}
      {LIGHTS.map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${l.x}%`,
            top:  `${l.y}%`,
            width:  l.sz,
            height: l.sz,
            borderRadius: "50%",
            background: `rgba(${l.r},${l.g},${l.b},${l.a})`,
            filter: l.sz > 2 ? "blur(0.5px)" : "none",
          }}
        />
      ))}

      {/* Film grain on city */}
      <div className="grain-overlay" aria-hidden style={{ opacity: 0.03 }} />
    </div>
  );
}

/* ════════════════════════════════════
   Main export
════════════════════════════════════ */
export default function SpaceHero() {
  const wrapperRef   = useRef(null);
  const starsRef     = useRef(null);
  const earthRef     = useRef(null);
  const surfaceRef   = useRef(null);
  const cityRef      = useRef(null);
  const headlineRef  = useRef(null);
  const ctaRef       = useRef(null);

  /* Responsive scroll height */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      el.style.height = window.innerWidth >= 768 ? "600vh" : "100vh";
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* One timeline scrubbed by scroll ─────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      /* t 0→2  Earth rises from nothing */
      tl.fromTo(earthRef.current,
        { scale: 0.06, opacity: 0 },
        { scale: 0.35, opacity: 1, duration: 2, ease: "power2.in" }, 0);

      /* t 1→3  Stars start fading as we approach */
      tl.to(starsRef.current, { opacity: 0, duration: 2 }, 1);

      /* t 2→5  Earth fills the screen */
      tl.to(earthRef.current,
        { scale: 5, duration: 3, ease: "power2.in" }, 2);

      /* t 3.5→5.5  Surface layer crossfades in */
      tl.fromTo(surfaceRef.current,
        { opacity: 0 }, { opacity: 1, duration: 2 }, 3.5);

      /* t 4.5→6  Earth fades — we've broken through */
      tl.to(earthRef.current, { opacity: 0, duration: 1.5 }, 4.5);

      /* t 5→7  Toronto city fades + zooms in */
      tl.fromTo(cityRef.current,
        { opacity: 0, scale: 1.18 },
        { opacity: 1, scale: 1,  duration: 2, ease: "power2.out" }, 5);

      /* t 6→7  Surface fades as city takes over */
      tl.to(surfaceRef.current, { opacity: 0, duration: 1.2 }, 6);

      /* t 7→8.5  Headline appears */
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 7);

      /* t 8→9.5  CTA appears */
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 8);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        animation: tl,
      });

      return () => {};
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: jump straight to city + headline
      gsap.set([starsRef.current, earthRef.current, surfaceRef.current], { opacity: 0 });
      gsap.set(cityRef.current,   { opacity: 1, scale: 1 });
      gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      gsap.set(ctaRef.current,    { opacity: 1, y: 0 });
      return () => {};
    });

  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef}>
      {/* ── Pinned viewport ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Layers */}
        <StarField    layerRef={starsRef} />
        <Earth        layerRef={earthRef} />
        <EarthSurface layerRef={surfaceRef} />
        <TorontoCity  layerRef={cityRef} />

        {/* Edge vignette over everything */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 8,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%,transparent 52%,rgba(2,4,14,0.70) 100%)",
        }} />

        {/* ── Headline — appears over Toronto ── */}
        <div
          ref={headlineRef}
          style={{
            position: "absolute", bottom: 60, left: 48,
            zIndex: 20, maxWidth: 420, opacity: 0,
          }}
        >
          <p style={{
            fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#d4a84b", marginBottom: 12, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#d4a84b" }} />
            Toronto, Canada
          </p>

          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(40px, 5.5vw, 78px)",
              lineHeight: 0.92, letterSpacing: "-0.04em",
              color: "#f0ede5", margin: 0,
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            Websites<br />
            <span style={{ color: "#d4c8b8" }}>businesses</span><br />
            <span style={{ color: "#d4a84b" }}>love.</span>
          </h1>

          <p style={{
            fontSize: 14, color: "#706c69", marginTop: 16,
            fontStyle: "italic",
            textShadow: "0 1px 12px rgba(0,0,0,0.9)",
          }}>
            Web design · Database development · Data analytics
          </p>
        </div>

        {/* ── CTAs + scroll hint ── */}
        <div
          ref={ctaRef}
          style={{
            position: "absolute", bottom: 38, right: 48,
            zIndex: 20, opacity: 0,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#work" style={{
              padding: "11px 26px", borderRadius: 100,
              fontSize: 13, fontWeight: 600,
              background: "#d4a84b", color: "#0a0909",
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(212,168,75,0.3)",
            }}>
              See my work →
            </a>
            <a href="#contact" style={{
              padding: "11px 26px", borderRadius: 100,
              fontSize: 13, fontWeight: 600,
              border: "1px solid rgba(240,237,229,0.2)",
              color: "#a09890", textDecoration: "none",
              backdropFilter: "blur(8px)",
              background: "rgba(10,9,9,0.3)",
            }}>
              Get in touch
            </a>
          </div>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            color: "#706c69", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            <div style={{ width: 1, height: 40, background: "rgba(112,108,105,0.4)" }} />
            Scroll
          </div>
        </div>

        {/* Bottom dissolve → next section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "35vh", pointerEvents: "none", zIndex: 9,
          background: "linear-gradient(to bottom, transparent, rgba(4,6,14,0.4) 60%, #0a0909 100%)",
        }} />
      </div>
    </section>
  );
}
