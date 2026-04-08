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

  // Drag logic
  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({
        x: Math.max(0, clientX - offset.current.x),
        y: Math.max(28, clientY - offset.current.y), // keep below menubar
      });
    }
    function onUp() {
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
    if (maximized) return;
    if (e.target.classList.contains("tl")) return; // don't drag when clicking traffic lights
    dragging.current = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    const rect = windowRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offset.current = { x: clientX - rect.left, y: clientY - rect.top };
    // initialize pos so window doesn't jump
    if (!pos) {
      setPos({ x: rect.left, y: rect.top });
    }
  }

  function handleClose() {
    router.push("/");
    setMinimized(false);
    setPos(null);
  }

  function handleMinimize() {
    setMinimized((m) => !m);
  }

  function handleMaximize() {
    setMaximized((m) => !m);
    setPos(null); // reset drag position when maximizing
  }

  // Dynamic style for dragged position
  const dragStyle =
    pos && !maximized
      ? { position: "fixed", left: pos.x, top: pos.y, margin: 0, zIndex: 500 }
      : {};

  const trafficLights = (
    <div className="trafficLights">
      <div className="tl tlRed" title="Close" onClick={handleClose} />
      <div className="tl tlYellow" title="Minimize" onClick={handleMinimize} />
      <div className="tl tlGreen" title="Maximize" onClick={handleMaximize} />
    </div>
  );

  // Minimized — just the title bar
  if (minimized) {
    return (
      <div
        ref={windowRef}
        className="window windowMinimized"
        style={dragStyle}
      >
        <div
          className="windowTitleBar"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          style={{ cursor: "grab" }}
        >
          {trafficLights}
          <span className="windowTitle">{title}</span>
          <div style={{ width: 52 }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className={[
        "window",
        wide ? "windowWide" : "",
        maximized ? "windowMaximized" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={dragStyle}
    >
      {/* Title bar — drag handle */}
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

      {/* Content */}
      <div className="windowContent">{children}</div>
    </div>
  );
}
