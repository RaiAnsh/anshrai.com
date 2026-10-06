"use client";

import { useState, useRef, useCallback, useMemo } from "react";

// ─── Storage helpers ────────────────────────────────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function lsClear(...keys) {
  try { keys.forEach((k) => localStorage.removeItem(k)); } catch {}
}

// ─── Shared styles ─────────────────────────────────────────────
const card = {
  background: "#111118",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: "1.5rem",
};
const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 10,
  padding: "0.75rem 1rem",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  fontFamily: "var(--font-ui, system-ui)",
  width: "100%",
  boxSizing: "border-box",
};
const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "0.85rem 1.5rem",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "var(--font-ui, system-ui)",
};
const btnGhost = {
  background: "transparent",
  color: "rgba(255,255,255,0.45)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 10,
  padding: "0.65rem 1.1rem",
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "var(--font-ui, system-ui)",
};
const label14 = { fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-ui, system-ui)" };

// ─── SkillChip ─────────────────────────────────────────────────
function SkillChip({ name, onRemove, color = "blue" }) {
  const colors = {
    blue:  { bg: "rgba(37,99,235,0.15)",  text: "#93c5fd", border: "rgba(37,99,235,0.3)"  },
    green: { bg: "rgba(34,197,94,0.12)",  text: "#86efac", border: "rgba(34,197,94,0.25)" },
    amber: { bg: "rgba(245,158,11,0.12)", text: "#fcd34d", border: "rgba(245,158,11,0.25)" },
  };
  const c = colors[color] ?? colors.blue;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.3rem",
      padding: "0.2rem 0.6rem", borderRadius: 9999,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      fontSize: 12, fontFamily: "var(--font-ui, system-ui)", fontWeight: 500,
    }}>
      {name}
      {onRemove && (
        <button onClick={() => onRemove(name)} style={{ background: "none", border: "none", cursor: "pointer", color: c.text, padding: 0, lineHeight: 1, fontSize: 13 }}>×</button>
      )}
    </span>
  );
}

// ─── Score ring ────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 18, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#6b7280";
  return (
    <svg width={44} height={44} style={{ flexShrink: 0 }}>
      <circle cx={22} cy={22} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <circle cx={22} cy={22} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 22 22)" />
      <text x={22} y={27} textAnchor="middle" fill={color} fontSize={11} fontWeight={700} fontFamily="system-ui">
        {score}%
      </text>
    </svg>
  );
}

// ─── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ ...card, opacity: 0.5 }}>
      {[80, 55, 100, 40].map((w, i) => (
        <div key={i} style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.07)", width: `${w}%`, marginBottom: i < 3 ? "0.75rem" : 0 }} />
      ))}
    </div>
  );
}

// ─── Job card ─────────────────────────────────────────────────
function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const top6matched = (job.matched ?? []).slice(0, 6);
  const top6missing = (job.missing ?? []).slice(0, 6);
  const postedStr = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString("en-CA", { month: "short", day: "numeric" })
    : null;

  return (
    <div style={{ ...card, transition: "border-color 200ms" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <ScoreRing score={job.score ?? 0} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "var(--font-ui, system-ui)" }}>{job.title}</span>
            {job.remote && <span style={{ fontSize: 11, color: "#818cf8", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 9999, padding: "0.1rem 0.5rem", fontFamily: "var(--font-ui, system-ui)" }}>Remote</span>}
            {job.partialDesc && <span style={{ fontSize: 11, color: "#a78bfa", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 9999, padding: "0.1rem 0.5rem", fontFamily: "var(--font-ui, system-ui)" }}>Partial desc</span>}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-ui, system-ui)" }}>
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
            {postedStr ? ` · ${postedStr}` : ""}
            {job.salary ? ` · ${job.salary}` : ""}
          </div>
        </div>
        <a href={job.url} target="_blank" rel="noopener noreferrer"
          style={{ flexShrink: 0, padding: "0.5rem 1rem", borderRadius: 8, background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-ui, system-ui)", whiteSpace: "nowrap" }}>
          Apply ↗
        </a>
      </div>

      {(top6matched.length > 0 || top6missing.length > 0) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.875rem" }}>
          {top6matched.map((s) => <SkillChip key={s} name={s} color="green" />)}
          {top6missing.map((s) => <SkillChip key={s} name={s} color="amber" />)}
        </div>
      )}

      {job.description && (
        <>
          <button onClick={() => setOpen((o) => !o)} style={{ ...btnGhost, marginTop: "0.75rem", padding: "0.3rem 0.75rem", fontSize: 12 }}>
            {open ? "Hide description ▲" : "Show description ▼"}
          </button>
          {open && (
            <p style={{ marginTop: "0.75rem", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontFamily: "var(--font-ui, system-ui)", whiteSpace: "pre-wrap" }}>
              {job.description.slice(0, 1500)}{job.description.length > 1500 ? "…" : ""}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────
const LOCATIONS = [
  { id: "toronto",  label: "Toronto / GTA"        },
  { id: "remote",   label: "Remote Canada"         },
  { id: "canada",   label: "Anywhere in Canada"    },
  { id: "anywhere", label: "Anywhere"              },
];

export default function JobMatcher() {
  // Resume state
  const [step,         setStep]         = useState("upload"); // upload | search | results
  const [parsing,      setParsing]      = useState(false);
  const [parseError,   setParseError]   = useState(null);
  const [resumeText,   setResumeText]   = useState("");
  const [skills,       setSkills]       = useState(() => lsGet("jm_skills", []));
  const [newSkill,     setNewSkill]     = useState("");
  const [fileName,     setFileName]     = useState(() => lsGet("jm_fname", null));

  // Search state
  const [searchTerms,  setSearchTerms]  = useState(() => lsGet("jm_terms", ""));
  const [location,     setLocation]     = useState(() => lsGet("jm_loc", "canada"));

  // Results state
  const [fetching,     setFetching]     = useState(false);
  const [fetchError,   setFetchError]   = useState(null);
  const [rawJobs,      setRawJobs]      = useState([]);
  const [sources,      setSources]      = useState([]);
  const [fetchedAt,    setFetchedAt]    = useState(null);

  // Filters
  const [minScore,     setMinScore]     = useState(0);
  const [filterSource, setFilterSource] = useState("all");
  const [filterRemote, setFilterRemote] = useState(false);
  const [filterDays,   setFilterDays]   = useState(0);
  const [filterText,   setFilterText]   = useState("");

  const dropRef = useRef(null);

  // ── Resume parsing ──────────────────────────────────────────
  async function handleFile(file) {
    if (!file) return;
    setParsing(true);
    setParseError(null);
    try {
      const { parseResume } = await import("@/lib/jobs/parseResume");
      const { text, skills: detected, titles } = await parseResume(file);
      setResumeText(text);
      setSkills(detected);
      lsSet("jm_skills", detected);
      setFileName(file.name);
      lsSet("jm_fname", file.name);
      if (titles.length > 0) {
        const terms = titles.slice(0, 2).join(", ");
        setSearchTerms(terms);
        lsSet("jm_terms", terms);
      }
      setStep("search");
    } catch (e) {
      setParseError(e.message ?? "Failed to parse resume.");
    } finally {
      setParsing(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }
  function onFileInput(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
  }
  function removeSkill(name) {
    const next = skills.filter((s) => s !== name);
    setSkills(next);
    lsSet("jm_skills", next);
  }
  function addSkill() {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    const next = [...skills, trimmed];
    setSkills(next);
    lsSet("jm_skills", next);
    setNewSkill("");
  }

  // ── Job fetch + scoring ─────────────────────────────────────
  async function searchJobs() {
    setFetching(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams({ q: searchTerms, location });
      const res = await fetch(`/api/jobs?${params}`);
      if (res.status === 401) { window.location.href = "/jobs/login"; return; }
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      const { scoreJobs, sortByScore } = await import("@/lib/jobs/match");
      const scored = sortByScore(scoreJobs(skills, resumeText, data.jobs, searchTerms.split(/[,\s]+/).filter(Boolean)));
      setRawJobs(scored);
      setSources(data.sources ?? []);
      setFetchedAt(data.fetchedAt);
      setStep("results");
    } catch (e) {
      setFetchError(e.message ?? "Failed to fetch jobs.");
    } finally {
      setFetching(false);
    }
  }

  // ── Filters ─────────────────────────────────────────────────
  const filteredJobs = useMemo(() => {
    const cutoff = filterDays > 0 ? Date.now() - filterDays * 86400000 : 0;
    const text   = filterText.toLowerCase();
    return rawJobs.filter((j) => {
      if ((j.score ?? 0) < minScore) return false;
      if (filterSource !== "all" && j.source !== filterSource) return false;
      if (filterRemote && !j.remote) return false;
      if (cutoff && j.postedAt && new Date(j.postedAt).getTime() < cutoff) return false;
      if (text && !(j.title + j.company).toLowerCase().includes(text)) return false;
      return true;
    });
  }, [rawJobs, minScore, filterSource, filterRemote, filterDays, filterText]);

  // ── CSV export ──────────────────────────────────────────────
  function downloadCsv() {
    const rows = [["Title", "Company", "Location", "Match %", "Missing Skills", "URL"]];
    for (const j of filteredJobs) {
      rows.push([j.title, j.company, j.location, j.score ?? 0, (j.missing ?? []).join("; "), j.url]);
    }
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "job-matches.csv";
    a.click();
  }

  // ── Clear ────────────────────────────────────────────────────
  function clearData() {
    lsClear("jm_skills", "jm_fname", "jm_terms", "jm_loc");
    setStep("upload"); setSkills([]); setResumeText(""); setFileName(null);
    setSearchTerms(""); setRawJobs([]); setSources([]);
  }

  // ── UI ───────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem", fontFamily: "var(--font-ui, system-ui)" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "clamp(28px,5vw,40px)", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Job Matcher
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          Your resume stays in your browser. Nothing is uploaded or saved.
        </p>
      </div>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div style={card}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1.25rem" }}>
            Step 1 — Upload your resume
          </p>

          {/* Drop zone */}
          <div
            ref={dropRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => document.getElementById("resume-input").click()}
            style={{
              border: "2px dashed rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "3rem 1.5rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 200ms",
              marginBottom: parseError ? "1rem" : 0,
            }}
          >
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem" }}>
              {parsing ? "Parsing…" : "Drop your resume here, or click to browse"}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>PDF or DOCX · max 5 MB</p>
            <input id="resume-input" type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={onFileInput} />
          </div>

          {parseError && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "0.75rem 1rem", marginTop: "1rem" }}>
              <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{parseError}</p>
            </div>
          )}

          {/* Returning user shortcut */}
          {skills.length > 0 && fileName && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>
                Last session: <span style={{ color: "#fff" }}>{fileName}</span> · {skills.length} skills detected
              </p>
              <button onClick={() => setStep("search")} style={btnPrimary}>
                Continue with saved skills →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 1b: Skill editing (after parse) */}
      {step === "search" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={card}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
              Detected skills — {fileName}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              {skills.map((s) => <SkillChip key={s} name={s} color="blue" onRemove={removeSkill} />)}
              {skills.length === 0 && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No skills detected. Add them below.</p>}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add skill…"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button onClick={addSkill} style={btnPrimary}>Add</button>
            </div>
            <button onClick={() => { setStep("upload"); setSkills([]); setResumeText(""); setFileName(null); }} style={{ ...btnGhost, marginTop: "0.75rem", fontSize: 12 }}>
              ← Re-upload resume
            </button>
          </div>

          {/* Step 2: Search */}
          <div style={card}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
              Step 2 — Search
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div>
                <label style={label14}>Job title / keywords</label>
                <input
                  value={searchTerms}
                  onChange={(e) => { setSearchTerms(e.target.value); lsSet("jm_terms", e.target.value); }}
                  placeholder="e.g. Software Engineer, Data Analyst"
                  style={{ ...inputStyle, marginTop: "0.4rem" }}
                />
              </div>
              <div>
                <label style={label14}>Location</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.4rem" }}>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => { setLocation(loc.id); lsSet("jm_loc", loc.id); }}
                      style={{
                        padding: "0.45rem 1rem", borderRadius: 9999, fontSize: 13,
                        fontFamily: "var(--font-ui, system-ui)", cursor: "pointer",
                        background: location === loc.id ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                        border:     location === loc.id ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        color:      location === loc.id ? "#93c5fd" : "rgba(255,255,255,0.5)",
                      }}
                    >{loc.label}</button>
                  ))}
                </div>
              </div>
            </div>

            {fetchError && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "0.75rem 1rem", marginTop: "1rem" }}>
                <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{fetchError}</p>
              </div>
            )}

            <button
              onClick={searchJobs}
              disabled={fetching}
              style={{ ...btnPrimary, marginTop: "1.25rem", opacity: fetching ? 0.6 : 1, cursor: fetching ? "not-allowed" : "pointer" }}
            >
              {fetching ? "Fetching jobs…" : "Search jobs →"}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {step === "results" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Filters */}
          <div style={{ ...card, padding: "1rem 1.25rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <label style={{ ...label14, whiteSpace: "nowrap", fontSize: 12 }}>Min match</label>
                <input type="range" min={0} max={90} step={5} value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  style={{ width: 90, accentColor: "#2563eb" }} />
                <span style={{ fontSize: 12, color: "#60a5fa", minWidth: 30 }}>{minScore}%</span>
              </div>
              <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}
                style={{ ...inputStyle, width: "auto", padding: "0.4rem 0.75rem", fontSize: 12 }}>
                <option value="all">All sources</option>
                <option value="greenhouse">Greenhouse</option>
                <option value="lever">Lever</option>
                <option value="ashby">Ashby</option>
                <option value="adzuna">Adzuna</option>
              </select>
              <select value={filterDays} onChange={(e) => setFilterDays(Number(e.target.value))}
                style={{ ...inputStyle, width: "auto", padding: "0.4rem 0.75rem", fontSize: 12 }}>
                <option value={0}>Any date</option>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                <input type="checkbox" checked={filterRemote} onChange={(e) => setFilterRemote(e.target.checked)} />
                Remote only
              </label>
              <input value={filterText} onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter by title / company…"
                style={{ ...inputStyle, width: 200, padding: "0.4rem 0.75rem", fontSize: 12 }} />
            </div>
          </div>

          {/* Result count + actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              {filteredJobs.length} of {rawJobs.length} jobs
              {fetchedAt ? ` · fetched ${new Date(fetchedAt).toLocaleTimeString()}` : ""}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={downloadCsv} style={btnGhost}>↓ CSV</button>
              <button onClick={() => setStep("search")} style={btnGhost}>← New search</button>
            </div>
          </div>

          {/* Loading skeletons */}
          {fetching && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* Empty state */}
          {!fetching && filteredJobs.length === 0 && (
            <div style={{ ...card, textAlign: "center", padding: "3rem 1.5rem" }}>
              <p style={{ fontSize: 22, color: "#fff", marginBottom: "0.5rem" }}>No matches found</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>Try lowering the minimum match % or widening the location.</p>
            </div>
          )}

          {/* Job cards */}
          {!fetching && filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}

          {/* Source status */}
          {sources.length > 0 && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>Sources</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sources.map((s) => (
                  <span key={`${s.name}-${s.source}`} style={{
                    fontSize: 11, fontFamily: "var(--font-ui, system-ui)", padding: "0.2rem 0.6rem", borderRadius: 9999,
                    background: s.ok ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                    color:      s.ok ? "#86efac"              : "#f87171",
                    border:     s.ok ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(239,68,68,0.15)",
                  }}>
                    {s.ok ? "✓" : "✗"} {s.name} {s.ok ? `(${s.count})` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button onClick={clearData} style={{ ...btnGhost, alignSelf: "flex-start", fontSize: 12 }}>
            Clear my data
          </button>
        </div>
      )}
    </div>
  );
}
