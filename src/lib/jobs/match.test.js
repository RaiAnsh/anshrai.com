// node --test src/lib/jobs/match.test.js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scoreJobs, sortByScore } from "./match.js";
import { extractSkills } from "./skills.js";

describe("extractSkills", () => {
  it("detects JavaScript and React", () => {
    const skills = extractSkills("We use React and JavaScript daily.");
    assert.ok(skills.includes("React"),      "should detect React");
    assert.ok(skills.includes("JavaScript"), "should detect JavaScript");
  });

  it("detects TypeScript alias 'ts'", () => {
    const skills = extractSkills("5 years of ts experience");
    assert.ok(skills.includes("TypeScript"), "should detect TypeScript from ts");
  });

  it("does not match 'r' inside words", () => {
    const skills = extractSkills("controller router");
    assert.ok(!skills.includes("R"), "should not match 'r' inside words");
  });

  it("detects R programming", () => {
    const skills = extractSkills("proficient in R programming and statistics");
    assert.ok(skills.includes("R"), "should detect 'R programming'");
  });

  it("detects Go only with context", () => {
    const skills = extractSkills("experience with Golang and Python");
    assert.ok(skills.includes("Go"), "should detect Golang");
    const noGo = extractSkills("let's go build something");
    assert.ok(!noGo.includes("Go"), "should not match bare 'go'");
  });

  it("detects C# and C++", () => {
    const skills = extractSkills("proficient in C# and C++ development");
    assert.ok(skills.includes("C#"),  "should detect C#");
    assert.ok(skills.includes("C++"), "should detect C++");
  });

  it("detects .NET", () => {
    const skills = extractSkills("built with .NET and Azure");
    assert.ok(skills.includes(".NET"), "should detect .NET");
  });

  it("detects kubernetes via k8s alias", () => {
    const skills = extractSkills("deployed on k8s clusters");
    assert.ok(skills.includes("Kubernetes"), "should detect Kubernetes from k8s");
  });

  it("detects PostgreSQL via postgres alias", () => {
    const skills = extractSkills("database: postgres 15");
    assert.ok(skills.includes("PostgreSQL"), "should detect PostgreSQL from postgres");
  });

  it("detects Power BI and Excel", () => {
    const skills = extractSkills("Tableau, Power BI, and Excel dashboards");
    assert.ok(skills.includes("Power BI"), "should detect Power BI");
    assert.ok(skills.includes("Excel"),    "should detect Excel");
  });
});

describe("scoreJobs", () => {
  const devResume = "Experienced full-stack developer with React, TypeScript, Node.js, PostgreSQL, Docker, and AWS.";
  const devSkills = extractSkills(devResume);

  const jobs = [
    {
      id: "j1", source: "greenhouse", company: "Acme", title: "Senior React Developer",
      location: "Toronto", remote: false, url: "https://example.com/1", postedAt: null,
      description: "We need React, TypeScript, and Node.js. Nice to have: GraphQL, AWS, Docker.",
      salary: null,
    },
    {
      id: "j2", source: "greenhouse", company: "Beta", title: "Java Backend Engineer",
      location: "Remote", remote: true, url: "https://example.com/2", postedAt: null,
      description: "Java Spring Boot, Kubernetes, and PostgreSQL. No JavaScript.",
      salary: null,
    },
    {
      id: "j3", source: "lever", company: "Gamma", title: "Accountant",
      location: "Toronto", remote: false, url: "https://example.com/3", postedAt: null,
      description: "CPA required. Excel, QuickBooks, GAAP, accounts payable, accounts receivable.",
      salary: null,
    },
  ];

  const scored = scoreJobs(devSkills, devResume, jobs, ["React"]);

  it("scores a React job highest for a React developer", () => {
    const sorted = sortByScore(scored);
    assert.equal(sorted[0].id, "j1", "React job should rank first");
  });

  it("scores accounting job lowest for a developer", () => {
    const sorted = sortByScore(scored);
    const last = sorted[sorted.length - 1];
    assert.equal(last.id, "j3", "Accounting job should rank last");
  });

  it("produces scores in 0–100 range", () => {
    for (const j of scored) {
      assert.ok(j.score >= 0 && j.score <= 100, `score ${j.score} out of range`);
    }
  });

  it("populates matched and missing arrays", () => {
    const react = scored.find((j) => j.id === "j1");
    assert.ok(Array.isArray(react.matched), "matched should be array");
    assert.ok(Array.isArray(react.missing), "missing should be array");
    assert.ok(react.matched.includes("React"), "React should be in matched");
  });

  it("handles empty jobs array", () => {
    const result = scoreJobs(devSkills, devResume, [], []);
    assert.deepEqual(result, []);
  });

  it("handles jobs with no description skills", () => {
    const empty = [{ id: "e1", source: "ashby", company: "X", title: "Manager", location: "", remote: false, url: "", postedAt: null, description: "", salary: null }];
    const result = scoreJobs([], "", empty, []);
    assert.equal(result.length, 1);
    assert.equal(result[0].score, 0);
  });
});
