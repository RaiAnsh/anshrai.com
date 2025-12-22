export default function AdminLoginPage() {
  async function login(formData) {
    "use server";

    const password = formData.get("password");
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) throw new Error("Missing ADMIN_PASSWORD env var.");

    if (password === expected) {
      // set cookie for auth
      const { cookies } = await import("next/headers");
      cookies().set("admin_auth", "1", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
      });

      const { redirect } = await import("next/navigation");
      redirect("/admin");
    }

    // If wrong, just fall through (we’ll show an error in next step)
  }

  return (
    <main className="container">
      <h1>Admin</h1>
      <p>Enter password to continue.</p>

      <form action={login} style={{ marginTop: 16 }}>
        <input
          name="password"
          type="password"
          placeholder="Admin password"
          style={{ padding: 10, width: "100%", maxWidth: 360 }}
        />
        <div style={{ marginTop: 12 }}>
          <button type="submit">Enter</button>
        </div>
      </form>
    </main>
  );
}   