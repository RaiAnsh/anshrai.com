"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [pointer, setPointer] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot follows instantly
  const dotX = useSpring(mx, { stiffness: 3000, damping: 60 });
  const dotY = useSpring(my, { stiffness: 3000, damping: 60 });

  // Ring follows with lag
  const ringX = useSpring(mx, { stiffness: 180, damping: 22 });
  const ringY = useSpring(my, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e) => {
      const t = e.target;
      setPointer(!!t.closest("a, button, [data-cursor]"));
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [visible]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          background: "#f0ede5",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border"
        animate={{
          width: pointer ? 52 : clicking ? 24 : 36,
          height: pointer ? 52 : clicking ? 24 : 36,
          borderColor: pointer ? "#d4a84b" : "rgba(240,237,229,0.35)",
          opacity: visible ? 1 : 0,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </>
  );
}
