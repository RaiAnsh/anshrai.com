"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Window({ title = "ansh.dev", children, wide = false }) {
  const router = useRouter();
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState(null); // null = centered via CSS
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // ── Drag ──────────────────────────────────────────────────
  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({ x: Math.max(0, cx - offset.current.x), y: Math.max(28, cy - offset.current.y) });
    }
    function onUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  function startDrag(e) {
    if (maximized || e.target.classList.contains("tl")) return;
    dragging.current = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    const rect = windowRef.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    offset.current = { x: cx - rect.left, y: cy - rect.top };
    if (!pos) setPos({ x: rect.left, y: rect.top });
    // kill tilt while dragging
    setTiltVars(0, 0);
  }

  // ── 3D tilt via CSS vars (no re-render) ───────────────────
  function setTiltVars(rx, ry) {
    if (!windowRef.current) return;
    windowRef.current.style.setProperty("--rx", `${rx}deg`);
    windowRef.current.style.setProperty("--ry", `${ry}deg`);
  }

  function handleMouseMove(e) {
    if (maximized || dragging.current || !windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTiltVars(-y * 2.5, x * 2.5);
  }

  function handleMouseLeave() {
    setTiltVars(0, 0);
  }

  // ── Traffic lights ────────────────────────────────────────
  function handleClose() {
    router.push("/");
    setMinimized(false);
    setPos(null);
    setTiltVars(0, 0);
  }

  function handleMinimize() {
    setMinimized((m) => !m);
  }

  function handleMaximize() {
    const next = !maximized;
    setMaximized(next);
    setPos(null);
    setTiltVars(0, 0);
  }

  // ── Styles ────────────────────────────────────────────────
  // Use inline styles for maximize so it's guaranteed to override everything
  let windowStyle = {};
  if (maximized) {
    windowStyle = {
      position: "fixed",
      left: 0,
      top: 28,           // --menubar-h
      width: "100vw",
      maxWidth: "100vw",
      height: "calc(100vh - 28px - 80px)",
      borderRadius: 0,
      margin: 0,
      zIndex: 900,
      transform: "none",
      transition: "all 220ms cubic-bezier(0.4,0,0.2,1)",
    };
  } else if (pos) {
    windowStyle = {
      position: "fixed",
      left: pos.x,
      top: pos.y,
      margin: 0,
      zIndex: 500,
    };
  }
  // (when neither, CSS handles centering and .window class handles 3D tilt via CSS vars)

  const contentStyle = maximized
    ? { maxHeight: "calc(100vh - 28px - 80px - 38px)", padding: "28px 40px" }
    : {};

  const trafficLights = (
    <div className="trafficLights">
      <div className="tl tlRed"    title="Close"    onClick={handleClose} />
      <div className="tl tlYellow" title="Minimize"  onClick={handleMinimize} />
      <div className="tl tlGreen"  title="Maximize"  onClick={handleMaximize} />
    </div>
  );

  // ── Minimized ─────────────────────────────────────────────
  if (minimized) {
    return (
      <div
        ref={windowRef}
        className="window windowMinimized"
        style={pos ? { position: "fixed", left: pos.x, top: pos.y, margin: 0, zIndex: 500 } : {}}
      >
        <div
          className="windowTitleBar"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          style={{ cursor: "grab", borderRadius: "inherit" }}
        >
          {trafficLights}
          <span className="windowTitle">{title} — minimized</span>
          <div style={{ width: 52 }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className={["window", wide && !maximized ? "windowWide" : ""].filter(Boolean).join(" ")}
      style={windowStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="windowTitleBar"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{ cursor: maximized ? "default" : "grab" }}
      >
        {trafficLights}
        <span className="windowTitle">{title}</span>
        <div style={{ width: 52 }} />
      </div>

      <div className="windowContent" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
