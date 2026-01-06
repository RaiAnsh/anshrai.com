"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height, animationId;
    const stars = [];
    const STAR_COUNT = 140;

    let mouseX = -9999;
    let mouseY = -9999;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    window.addEventListener("mousemove", onMouseMove);

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function init() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.2,
          v: Math.random() * 0.25 + 0.05,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // background tint
      ctx.fillStyle = "rgba(11, 15, 25, 0.45)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const s of stars) {
        // draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // vertical drift
        s.y += s.v;
        if (s.y > height + 5) {
          s.y = -5;
          s.x = Math.random() * width;
        }

        // mouse repulsion
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const influenceRadius = 140;
        if (dist < influenceRadius) {
          const strength = (influenceRadius - dist) / influenceRadius;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);

          s.x += nx * strength * 2.6;
          s.y += ny * strength * 2.6;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}