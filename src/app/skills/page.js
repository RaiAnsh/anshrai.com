import Window from "../../components/Window";

const skillGroups = [
  {
    label: "Languages & Querying",
    color: "rgba(56, 189, 248, 0.8)",
    skills: ["Python", "SQL", "PostgreSQL", "BigQuery", "Elixir", "Java", "C++"],
  },
  {
    label: "Analytics & BI Tools",
    color: "rgba(168, 85, 247, 0.8)",
    skills: ["Tableau", "Google Sheets", "Excel", "BigQuery", "pandas", "matplotlib", "seaborn"],
  },
  {
    label: "Web & Dev Tools",
    color: "rgba(244, 114, 182, 0.8)",
    skills: ["Flask", "Next.js", "React", "Git", "Wix"],
  },
  {
    label: "Business & Process",
    color: "rgba(52, 211, 153, 0.8)",
    skills: [
      "Business Requirements Docs",
      "Stakeholder Communication",
      "Agile / Scrum",
      "Data Integrity",
      "Pivot Tables",
    ],
  },
];

export default function SkillsPage() {
  return (
    <Window title="Skills">
      <p className="sectionLabel">Technical Skills</p>
      <h2 style={{ margin: "0 0 24px", fontSize: 26, letterSpacing: "-0.02em" }}>
        What I Work With
      </h2>

      <div className="skillsGrid">
        {skillGroups.map((group) => (
          <div key={group.label} className="skillGroup">
            <div className="skillGroupLabel" style={{ color: group.color }}>
              {group.label}
            </div>
            <div className="skillChips">
              {group.skills.map((s) => (
                <span key={s} className="skillChip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" />

      <p className="sectionLabel">Interests</p>
      <div className="tagRow">
        {["Business Intelligence", "Product Analytics", "Fintech", "Data Storytelling", "Database Design"].map((t) => (
          <span key={t} className="tagPill">{t}</span>
        ))}
      </div>
    </Window>
  );
}
