// POST /api/admin/login
// Verifies the admin password and sets an httpOnly cookie.
import { NextResponse } from "next/server";
import { createHash } from "crypto";

const PASSWORD_HASH = "b9e371c48e1264cebb3747e2733cd4a224f3d28f55a12446094d7e70bac8fac0";

export async function POST(req) {
  try {
    const { password } = await req.json();
    const hash = createHash("sha256").update(password ?? "").digest("hex");

    if (hash !== PASSWORD_HASH) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      secure:   true,
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 8, // 8 hours
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
