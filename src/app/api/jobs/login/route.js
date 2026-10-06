import { NextResponse } from "next/server";
import { createJobsCookie, COOKIE_NAME } from "@/lib/jobs/auth";

// Simple in-memory rate limiter: 10 attempts per IP per 15 min
const attempts = new Map();
const WINDOW_MS  = 15 * 60 * 1000;
const MAX_TRIES  = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) ?? { count: 0, windowStart: now };
  if (now - rec.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
    return false;
  }
  rec.count++;
  attempts.set(ip, rec);
  return rec.count > MAX_TRIES;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  let code;
  try {
    ({ code } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const expected = process.env.JOBS_ACCESS_CODE;
  if (!expected) {
    return NextResponse.json({ error: "Access code not configured." }, { status: 500 });
  }

  // Constant-time compare to prevent timing attacks
  const a = code ?? "";
  const b = expected;
  let diff = a.length !== b.length ? 1 : 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);

  if (diff !== 0) {
    return NextResponse.json({ error: "Incorrect access code." }, { status: 401 });
  }

  const cookieValue = await createJobsCookie();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure:   true,
    sameSite: "lax",
    path:     "/",
    maxAge:   30 * 24 * 60 * 60,
  });
  return res;
}
