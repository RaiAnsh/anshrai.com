import { NextResponse } from "next/server";
import { verifyJobsCookie } from "./lib/jobs/auth";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // ── Admin: simple cookie check (existing behaviour) ──────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authed = req.cookies.get("admin_auth")?.value;
    if (authed !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // ── Jobs: signed + expiring cookie ───────────────────────────
  if (
    pathname.startsWith("/jobs") &&
    pathname !== "/jobs/login" &&
    !pathname.startsWith("/jobs/login")
  ) {
    const cookie = req.cookies.get("jobs_auth")?.value;
    const valid  = await verifyJobsCookie(cookie);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/jobs/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/jobs/:path*"],
};
