"use client";

import { useRef, useEffect } from "react";

const COUNT    = 120;
const MAX_DIST = 140;
const BASE_SPD = 0.22;

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ mouse: { x: -9999, y: -9999 }, ps: [] });
  const rafRef    = useRef(null);

  useEffect(() => {
    // Skip on touch devices for performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      stateRef.current.ps = Array.from({ length: COUNT }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * BASE_SPD,
        vy:    (Math.random() - 0.5) * BASE_SPD,
        size:  Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.45 + 0.15,
        phase: Math.random() * Math.PI * 2,
        spd:   Math.random() * 0.6 + 0.7,
      }));
    }

    function draw(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { ps, mouse } = stateRef.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Breathing opacity
        const breath = Math.sin(ts * 0.0007 * p.spd + p.phase) * 0.1;
        const a = Math.min(0.85, Math.max(0.05, p.alpha + breath));

        // Mouse repulsion (subtle)
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 180 && md > 0) {
          const f = (1 - md / 180) * 0.012;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // Dampen + clamp velocity
        p.vx *= 0.985;
        p.vy *= 0.985;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > BASE_SPD * 2.5) {
          p.vx = (p.vx / spd) * BASE_SPD * 2.5;
          p.vy = (p.vy / spd) * BASE_SPD * 2.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${a})`;
        ctx.fill();

        // Connection lines to nearby particles
        for (let j = i + 1; j < ps.length; j++) {
          const q  = ps[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / MAX_DIST) * 0.11})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    init();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => { resize(); init(); };
    const onMove   = (e) => { stateRef.current.mouse = { x: e.clientX, y: e.clientY }; };
    const onLeave  = ()  => { stateRef.current.mouse = { x: -9999, y: -9999 }; };

    window.addEventListener("resize",      onResize);
    window.addEventListener("mousemove",   onMove);
    window.addEventListener("mouseleave",  onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}
