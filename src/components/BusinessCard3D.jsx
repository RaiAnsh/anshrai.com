"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const W = 380;
const H = 228;

export default function BusinessCard3D() {
  const containerRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: -8, y: 14 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // Invert y-axis when flipped so tilt feels natural on both sides
    const flipFactor = flipped ? -1 : 1;
    setTilt({ x: -dy * 14, y: dx * 18 * flipFactor });
  };

  const handleMouseEnter = () => setHovering(true);

  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: -8, y: 14 });
  };

  const handleClick = () => setFlipped((f) => !f);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Perspective wrapper */}
      <div
        ref={containerRef}
        style={{ perspective: "1100px", width: W, height: H }}
        className="relative cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Shadow glow */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: -24,
            left: "8%",
            width: "84%",
            height: 48,
            background: "#d4a84b",
            filter: "blur(32px)",
          }}
          animate={{ opacity: hovering ? 0.35 : 0.18 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card container with 3D transform */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "relative",
          }}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y + (flipped ? 180 : 0),
          }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          {/* ── Front face ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 28px 72px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,168,75,0.18)",
            }}
          >
            <Image
              src="/bc_front.png"
              alt="arweb business card – front"
              fill
              sizes="380px"
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Holographic sheen */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(212,168,75,0.08) 100%)",
              }}
              animate={{ opacity: hovering ? 1 : 0.4 }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {/* ── Back face ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 28px 72px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,168,75,0.18)",
            }}
          >
            <Image
              src="/bc_back.png"
              alt="arweb business card – back"
              fill
              sizes="380px"
              style={{ objectFit: "cover" }}
              priority
            />
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(212,168,75,0.08) 100%)",
              }}
              animate={{ opacity: hovering ? 1 : 0.4 }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </motion.div>
      </div>

      <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(112,108,105,0.5)" }}>
        Hover to tilt · Click to flip
      </p>
    </div>
  );
}
