// Client-side job scoring: skill overlap + TF-IDF cosine + title boost.
// Pure functions — no imports from Next.js or browser APIs.

import { extractSkills, getSkillWeight, SKILLS } from "./skills.js";

// ─── Text utilities ────────────────────────────────────────────

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "not", "no", "nor", "so",
  "yet", "both", "either", "neither", "each", "few", "more", "most",
  "other", "some", "such", "than", "too", "very", "just", "as", "if",
  "this", "that", "these", "those", "it", "its", "we", "you", "they",
  "our", "your", "their", "what", "which", "who", "whom", "how", "when",
  "where", "why", "all", "any", "both", "every", "from", "up", "about",
  "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "then", "once",
  "there", "here", "he", "she", "his", "her", "him", "my", "me", "i",
  "us", "them", "also", "only", "same", "own", "like", "well", "back",
  "even", "still", "way", "new", "old", "high", "great", "big", "good",
  "right", "work", "working", "team", "role", "position", "job",
  "experience", "strong", "knowledge", "ability", "skills", "skill",
  "looking", "seeking", "candidate", "candidates", "must", "required",
  "preferred", "including", "such", "across", "within", "around",
]);

function stem(word) {
  // Very simple Porter-lite: strip common suffixes
  return word
    .replace(/ing$/, "")
    .replace(/tion$/, "")
    .replace(/ations$/, "")
    .replace(/ness$/, "")
    .replace(/ment$/, "")
    .replace(/ies$/, "i")
    .replace(/([^s])s$/, "$1");
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
    .map(stem);
}

// ─── TF-IDF ───────────────────────────────────────────────────

function tf(tokens) {
  const freq = {};
  for (const t of tokens) freq[t] = (freq[t] ?? 0) + 1;
  const len = tokens.length || 1;
  return Object.fromEntries(Object.entries(freq).map(([t, n]) => [t, n / len]));
}

function buildIdf(docs) {
  const N = docs.length;
  const df = {};
  for (const doc of docs) {
    const seen = new Set(doc);
    for (const t of seen) df[t] = (df[t] ?? 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(df).map(([t, n]) => [t, Math.log((N + 1) / (n + 1)) + 1])
  );
}

function tfidfVec(tfMap, idf) {
  const vec = {};
  for (const [t, v] of Object.entries(tfMap)) {
    vec[t] = v * (idf[t] ?? 1);
  }
  return vec;
}

function cosine(a, b) {
  let dot = 0, normA = 0, normB = 0;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const va = a[k] ?? 0;
    const vb = b[k] ?? 0;
    dot   += va * vb;
    normA += va * va;
    normB += vb * vb;
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─── Scoring ──────────────────────────────────────────────────

/**
 * Score a list of jobs against the user's resume skills + text.
 * @param {string[]}  resumeSkills  canonical skill names the user has
 * @param {string}    resumeText    full resume text (for TF-IDF)
 * @param {object[]}  jobs          normalized Job objects
 * @param {string[]}  searchTerms   user's search terms (for title boost)
 * @returns {object[]} jobs with { matched, missing, score } added
 */
export function scoreJobs(resumeSkills, resumeText, jobs, searchTerms = []) {
  if (!jobs.length) return [];

  // Build TF-IDF corpus: resume + all job descriptions
  const resumeTokens  = tokenize(resumeText);
  const jobTokensList = jobs.map((j) => tokenize(j.title + " " + j.description));
  const allDocs       = [resumeTokens, ...jobTokensList];
  const idf           = buildIdf(allDocs);
  const resumeVec     = tfidfVec(tf(resumeTokens), idf);

  // Precompute all job TF-IDF vectors + cosine similarities
  const sims = jobTokensList.map((tokens) =>
    cosine(resumeVec, tfidfVec(tf(tokens), idf))
  );
  const maxSim = Math.max(...sims, 1e-9);

  const lowerTerms = searchTerms.map((t) => t.toLowerCase());

  return jobs.map((job, i) => {
    const combined  = (job.title + " " + job.description).toLowerCase();
    const jobSkills = extractSkills(combined);

    // Skill overlap
    const titleLower    = job.title.toLowerCase();
    const titleSkills   = new Set(extractSkills(titleLower));
    const resumeSet     = new Set(resumeSkills);

    const matched = jobSkills.filter((s) => resumeSet.has(s));
    const missing = jobSkills.filter((s) => !resumeSet.has(s));

    let weightedJob     = 0;
    let weightedMatched = 0;

    for (const s of jobSkills) {
      const w = getSkillWeight(s) * (titleSkills.has(s) ? 2 : 1);
      weightedJob += w;
      if (resumeSet.has(s)) weightedMatched += w;
    }

    const skillScore = weightedJob > 0 ? weightedMatched / weightedJob : 0;

    // TF-IDF cosine (normalized)
    const textSim = sims[i] / maxSim;

    // Title boost
    const titleBoost = lowerTerms.some((t) => titleLower.includes(t)) ? 0.1 : 0;

    const rawScore = 0.6 * skillScore + 0.3 * textSim + 0.1 * titleBoost;
    const score    = Math.min(100, Math.round(rawScore * 100));

    return {
      ...job,
      matched,
      missing,
      score,
    };
  });
}

/** Sort jobs by score descending */
export function sortByScore(scoredJobs) {
  return [...scoredJobs].sort((a, b) => b.score - a.score);
}
