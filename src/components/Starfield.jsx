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
          v: Math.random() * 0.25 + 0.05, // speed
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // background tint
      ctx.fillStyle = "#0b0f19";
      ctx.fillStyle = "rgba(11, 15, 25, 0.35)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillRect(0, 0, width, height);

      // stars
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.v;
        if (s.y > height + 5) {
          s.y = -5;
          s.x = Math.random() * width;
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

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}