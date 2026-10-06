// POST /api/admin/login
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminCookie, COOKIE_NAME } from "@/lib/admin/auth";

export async function POST(req) {
  try {
    const { password } = await req.json();

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
    }

    const ok = await bcrypt.compare(password ?? "", hash);
    if (!ok) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const cookieValue = await createAdminCookie();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure:   true,
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 8,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
