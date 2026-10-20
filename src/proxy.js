import { NextResponse } from "next/server";
import { verifyJobsCookie } from "./lib/jobs/auth";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/jobs") &&
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
  matcher: ["/jobs/:path*"],
};
