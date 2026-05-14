const track1 = ["PostgreSQL", "Python", "SQL", "BigQuery", "pandas", "SQLAlchemy", "Tableau", "ETL Pipelines", "Star Schema"];
const track2 = ["Next.js", "React", "MongoDB", "Flask", "REST APIs", "Git", "Google Analytics", "scikit-learn", "Google Sheets"];

function Marquee({ items, reverse = false }) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} 28s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 py-2 rounded-full text-sm border flex-shrink-0"
            style={{
              borderColor: "rgba(240,237,229,0.08)",
              color: "#706c69",
              background: "rgba(240,237,229,0.02)",
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
    <section className="py-20 overflow-hidden border-y" style={{ borderColor: "rgba(240,237,229,0.06)" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <p className="text-xs font-semibold tracking-widest uppercase text-center text-gold mb-8">Core Tools</p>
      <div className="flex flex-col gap-4">
        <Marquee items={track1} />
        <Marquee items={track2} reverse />
      </div>
    </section>
  );
}
