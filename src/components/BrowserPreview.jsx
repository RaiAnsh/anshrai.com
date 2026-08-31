"use client";

import { useState } from "react";

/**
 * BrowserPreview
 *
 * Renders a site inside a scaled iframe with a realistic browser chrome frame.
 * Supports multiple tabs so you can switch between pages (e.g. /dashboard, /analytics).
 *
 * Props:
 *   url          string   — primary URL to load (also shown in address bar)
 *   displayUrl   string   — human-readable URL to show in the address bar
 *   accentColor  string   — hex accent for loading state and fallback
 *   thumb        string   — if set, show this image instead of an iframe
 *   tabs         Array<{label: string, url: string}> — optional page tabs
 *   aspectRatio  string   — default "16/10"
 *   scale        number   — iframe scale factor (default 0.38)
 */
export default function BrowserPreview({
  url,
  displayUrl,
  accentColor = "#2563eb",
  thumb = null,
  tabs = null,
  aspectRatio = "16/10",
  scale = 0.38,
}) {
  const allTabs = tabs && tabs.length > 0
    ? tabs
    : [{ label: displayUrl, url }];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeSrc = allTabs[activeIdx]?.url ?? url;
  const activeDisplay = allTabs[activeIdx]?.label ?? displayUrl;
  const hasMultipleTabs = allTabs.length > 1;

  // Scale math: iframe is (1/scale)×100% of container, then scaled down
  const pct = `${Math.round((1 / scale) * 100)}%`;

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        aspectRatio,
      }}
    >
      {/* ── Browser chrome ── */}
      <div
        style={{
          flexShrink: 0,
          background: "#141414",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Top bar: dots + address bar */}
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 10,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.75,
                  display: "block",
                }}
              />
            ))}
          </div>

          {/* Address bar */}
          <div
            style={{
              flex: 1,
              height: 22,
              background: "#1a1a1a",
              borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              overflow: "hidden",
            }}
          >
            {/* Lock icon */}
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" style={{ flexShrink: 0 }}>
              <rect x="1" y="4" width="6" height="5" rx="1" stroke="#555" strokeWidth="1" />
              <path d="M2.5 4V3a1.5 1.5 0 0 1 3 0v1" stroke="#555" strokeWidth="1" />
            </svg>
            <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              {activeDisplay}
            </span>
          </div>
        </div>

        {/* Page tabs (only if multiple) */}
        {hasMultipleTabs && (
          <div
            style={{
              display: "flex",
              gap: 2,
              padding: "0 14px",
              paddingBottom: 0,
            }}
          >
            {allTabs.map((tab, i) => (
              <button
                key={tab.url}
                type="button"
                onClick={() => setActiveIdx(i)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px 6px 0 0",
                  fontSize: 10,
                  fontFamily: "monospace",
                  cursor: "pointer",
                  background: i === activeIdx ? "#0d0d0d" : "transparent",
                  color: i === activeIdx ? "#888" : "#444",
                  border: "none",
                  borderTop: i === activeIdx ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderLeft: i === activeIdx ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderRight: i === activeIdx ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "color 150ms",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Viewport ── */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "#0d0d0d" }}>
        {thumb ? (
          <img
            src={thumb}
            alt={`Screenshot of ${displayUrl}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <>
            {/* Fallback (visible if iframe is blocked / not yet loaded) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(145deg, #111 0%, #0d0d0d 60%, ${accentColor}08 100%)`,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: accentColor, opacity: 0.5 }} />
              </div>
              <span style={{ fontSize: 9, color: "#333", fontFamily: "monospace" }}>{activeDisplay}</span>
            </div>

            {/* Scaled iframe — sits on top of fallback, covers it when loaded */}
            <iframe
              key={activeSrc}
              src={activeSrc}
              title={activeDisplay}
              loading="lazy"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: pct,
                height: pct,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                border: "none",
                pointerEvents: "none",
                background: "white",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
