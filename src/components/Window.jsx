export default function Window({ title = "ansh.dev", children, wide = false }) {
  return (
    <div className={`window${wide ? " windowWide" : ""}`}>
      {/* Title bar */}
      <div className="windowTitleBar">
        <div className="trafficLights">
          <div className="tl tlRed" />
          <div className="tl tlYellow" />
          <div className="tl tlGreen" />
        </div>
        <span className="windowTitle">{title}</span>
        <div style={{ width: 52 }} />
      </div>

      {/* Content */}
      <div className="windowContent">{children}</div>
    </div>
  );
}
