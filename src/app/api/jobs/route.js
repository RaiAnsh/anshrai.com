import { NextResponse } from "next/server";
import { COMPANIES }       from "@/lib/jobs/companies";
import { fetchGreenhouse } from "@/lib/jobs/sources/greenhouse";
import { fetchLever }      from "@/lib/jobs/sources/lever";
import { fetchAshby }      from "@/lib/jobs/sources/ashby";
import { fetchAdzuna }     from "@/lib/jobs/sources/adzuna";
import { isCanadaRelevant, dedupeKey } from "@/lib/jobs/normalize";
import { verifyJobsCookie } from "@/lib/jobs/auth";

export const maxDuration = 30;

const FETCHERS = {
  greenhouse: fetchGreenhouse,
  lever:      fetchLever,
  ashby:      fetchAshby,
};

export async function GET(req) {
  // Auth check — proxy doesn't cover /api routes
  const cookie = req.cookies.get("jobs_auth")?.value;
  const valid  = await verifyJobsCookie(cookie);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query    = searchParams.get("q")        ?? "";
  const location = searchParams.get("location") ?? "canada";

  // Fetch all ATS boards in parallel
  const results = await Promise.allSettled(
    COMPANIES.map(async (company) => {
      const fetcher = FETCHERS[company.source];
      const jobs = await fetcher(company);
      return { company: company.name, source: company.source, jobs };
    })
  );

  // Aggregate + filter Canada-relevant
  const sourceStatus = [];
  const allJobs = [];

  for (const r of results) {
    if (r.status === "fulfilled") {
      const { company, source, jobs } = r.value;
      const canadaJobs = location === "anywhere"
        ? jobs
        : jobs.filter((j) => isCanadaRelevant(j.location, j.title));
      sourceStatus.push({ name: company, source, ok: true, count: canadaJobs.length });
      allJobs.push(...canadaJobs);
    } else {
      // Extract company name from error if possible
      const msg = r.reason?.message ?? "";
      const nameMatch = COMPANIES.find((c) => msg.includes(c.slug));
      sourceStatus.push({
        name:   nameMatch?.name ?? "unknown",
        source: nameMatch?.source ?? "unknown",
        ok:     false,
        count:  0,
        error:  msg,
      });
    }
  }

  // Adzuna (optional, broad coverage)
  let adzunaStatus = { name: "Adzuna", source: "adzuna", ok: false, count: 0 };
  try {
    const { jobs: adzunaJobs, skipped } = await fetchAdzuna(query, location);
    if (!skipped) {
      const canadaAdzuna = location === "anywhere"
        ? adzunaJobs
        : adzunaJobs.filter((j) => isCanadaRelevant(j.location, j.title));
      allJobs.push(...canadaAdzuna);
      adzunaStatus = { name: "Adzuna", source: "adzuna", ok: true, count: canadaAdzuna.length };
    }
  } catch (e) {
    adzunaStatus.error = e.message;
  }
  sourceStatus.push(adzunaStatus);

  // Dedupe: prefer ATS over Adzuna; keep first seen
  const seen = new Map();
  const deduped = [];
  // Sort so ATS sources come first
  const sorted = [...allJobs].sort((a, b) =>
    (a.source === "adzuna" ? 1 : 0) - (b.source === "adzuna" ? 1 : 0)
  );
  for (const job of sorted) {
    const key = dedupeKey(job.company, job.title, job.location);
    if (!seen.has(key)) {
      seen.set(key, true);
      deduped.push(job);
    }
  }

  return NextResponse.json({
    jobs:      deduped,
    sources:   sourceStatus,
    fetchedAt: new Date().toISOString(),
    total:     deduped.length,
  });
}
