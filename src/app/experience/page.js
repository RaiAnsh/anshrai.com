import Window from "../../components/Window";

const experience = [
  {
    role: "Data Entry",
    org: "Alpha Healthcare",
    location: "North York, ON",
    period: "July 2025 – Present",
    bullets: [
      "Maintained and validated patient and lab data across multiple healthcare systems, achieving near-zero data entry error rate in a regulated, compliance-driven environment.",
      "Supported operational reporting and audit-readiness by enforcing data integrity standards and documentation protocols.",
      "Collaborated cross-functionally with lab and administrative teams to resolve data discrepancies and improve workflow accuracy.",
    ],
  },
  {
    role: "Technical Instructor & Business Outreach Coordinator",
    org: "Z3 Education Centre",
    location: "Toronto, ON",
    period: "Apr 2024 – Sept 2024",
    bullets: [
      "Delivered structured technology curriculum to 20+ students, improving analytical thinking and applied problem-solving skills.",
      "Coordinated outreach to 10+ organizations to build partnerships, resulting in two new program collaborations.",
      "Documented program performance metrics and reported outcomes to management to support data-driven program decisions.",
    ],
  },
  {
    role: "Founder",
    org: "arweb.co",
    location: "Toronto, ON",
    period: "2024 – Present",
    bullets: [
      "Freelance web development agency; delivered 2 client projects end-to-end from requirements gathering to deployment.",
      "Implemented Google Analytics on client sites, pulled and cleaned GA export data in Python, and delivered monthly performance reports.",
      "Presented data insights to business owners and translated findings into actionable website and marketing improvements.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <Window title="Experience">
      <p className="sectionLabel">Professional Experience</p>
      <h2 style={{ margin: "0 0 24px", fontSize: 26, letterSpacing: "-0.02em" }}>
        Where I've Worked
      </h2>

      <div className="timeline">
        {experience.map((job, i) => (
          <div key={i} className="timelineItem">
            <div className="timelineDot" />
            <div className="timelineRole">{job.role}</div>
            <div className="timelineMeta">
              {job.org} &nbsp;·&nbsp; {job.location} &nbsp;·&nbsp; {job.period}
            </div>
            <ul className="timelineBullets">
              {job.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="divider" />

      <div>
        <p className="sectionLabel">Education</p>
        <div className="timelineItem" style={{ paddingLeft: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Bachelor of Science in Computer Science</div>
          <div style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 8px" }}>
            Toronto Metropolitan University &nbsp;·&nbsp; Expected April 2027
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
            Relevant coursework: Business Systems Analysis, Data Management, Database Design,
            Systems Analysis, Cybersecurity
          </p>
        </div>
      </div>
    </Window>
  );
}
