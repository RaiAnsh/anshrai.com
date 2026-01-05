import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect everything under /admin except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authed = req.cookies.get("admin_auth")?.value;

    if (authed !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};