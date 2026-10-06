import { NextResponse } from "next/server";
import { verifyJobsCookie } from "./lib/jobs/auth";
import { verifyAdminCookie } from "./lib/admin/auth";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // ── Admin: HMAC-signed + expiring cookie ─────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = req.cookies.get("admin_auth")?.value;
    const valid  = await verifyAdminCookie(cookie);
    if (!valid) {
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
