// Both tracks use the same forward keyframe (translateX(0) → -50%).
// Track 2 achieves the opposing-direction look by reversing item order —
// no separate keyframe, no offset start, no glitch.

const track1 = ["PostgreSQL", "Python", "SQL", "BigQuery", "pandas", "SQLAlchemy", "Tableau", "ETL Pipelines", "Star Schema", "Data Warehousing"];
const track2 = ["Google Sheets", "scikit-learn", "Google Analytics", "Git", "REST APIs", "Flask", "MongoDB", "React", "Next.js", "Framer Motion"];

function Marquee({ items, duration = 32 }) {
  // Triple-duplicate so the seam never shows at any viewport width
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 w-max"
        style={{ animation: `marquee-scroll ${duration}s linear infinite` }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 py-2 rounded-full text-sm border flex-shrink-0"
            style={{
              borderColor: "rgba(240,237,229,0.09)",
              color: "#706c69",
              background: "rgba(240,237,229,0.025)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueeReverse({ items, duration = 36 }) {
  // Reverse item order gives the visual "opposing direction" feel
  // while still using the same forward keyframe → no starting-offset glitch
  const reversed = [...items].reverse();
  const repeated = [...reversed, ...reversed, ...reversed];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 w-max"
        style={{ animation: `marquee-scroll ${duration}s linear infinite` }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 py-2 rounded-full text-sm border flex-shrink-0"
            style={{
              borderColor: "rgba(240,237,229,0.09)",
              color: "#706c69",
              background: "rgba(240,237,229,0.025)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section
      className="py-20 overflow-hidden border-y"
      style={{ borderColor: "rgba(240,237,229,0.06)" }}
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-center text-gold mb-8">
        Core Tools
      </p>
      <div className="flex flex-col gap-4">
        <Marquee items={track1} duration={34} />
        <MarqueeReverse items={track2} duration={38} />
      </div>
    </section>
  );
}
