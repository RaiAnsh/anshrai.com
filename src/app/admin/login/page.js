import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

export const metadata = { title: "Admin Login — arweb" };

// SHA-256 of the admin password — safe to commit, plain text never stored.
// To change the password: node -e "require('crypto').createHash('sha256').update('newpass').digest('hex')" | pbcopy
const PASSWORD_HASH = "b9e371c48e1264cebb3747e2733cd4a224f3d28f55a12446094d7e70bac8fac0";

export default async function AdminLoginPage({ searchParams }) {
  const failed = (await searchParams)?.error === "1";

  async function login(formData) {
    "use server";

    const password = formData.get("password") ?? "";
    const hash     = createHash("sha256").update(password).digest("hex");

    if (hash === PASSWORD_HASH) {
      const jar = await cookies();
      jar.set("admin_auth", "1", {
        httpOnly: true,
        secure:   true,
        sameSite: "lax",
        path:     "/",
        maxAge:   60 * 60 * 8, // 8 hours
      });
      redirect("/admin");
    }

    redirect("/admin/login?error=1");
  }

  return (
    <main
      style={{
        minHeight:      "100svh",
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "2rem 1.25rem",
        fontFamily:     "var(--font-ui, system-ui)",
      }}
    >
      <p
        style={{
          fontSize:      13,
          fontWeight:    700,
          letterSpacing: "0.1em",
          color:         "rgba(255,255,255,0.35)",
          marginBottom:  "2.5rem",
          textTransform: "uppercase",
        }}
      >
        arweb
      </p>

      <div
        style={{
          width:        "100%",
          maxWidth:     380,
          background:   "#111118",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding:      "2.5rem 2rem",
        }}
      >
        <h1
          style={{
            fontFamily:    "var(--font-display, Georgia, serif)",
            fontSize:      28,
            fontWeight:    300,
            letterSpacing: "-0.02em",
            color:         "#fff",
            marginBottom:  "0.4rem",
          }}
        >
          Admin login
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
          Enter your password to continue.
        </p>

        {failed && (
          <div
            style={{
              background:   "rgba(239,68,68,0.10)",
              border:       "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10,
              padding:      "0.75rem 1rem",
              marginBottom: "1.25rem",
            }}
          >
            <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>
              Incorrect password. Try again.
            </p>
          </div>
        )}

        <form action={login} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoFocus
            required
            style={{
              width:        "100%",
              background:   "rgba(255,255,255,0.05)",
              border:       "1px solid rgba(255,255,255,0.10)",
              borderRadius: 10,
              padding:      "0.8rem 1rem",
              fontSize:     14,
              color:        "#fff",
              outline:      "none",
              boxSizing:    "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              width:        "100%",
              padding:      "0.85rem",
              borderRadius: 10,
              border:       "none",
              background:   "#2563eb",
              color:        "#fff",
              fontSize:     14,
              fontWeight:   600,
              cursor:       "pointer",
            }}
          >
            Enter →
          </button>
        </form>
      </div>
    </main>
  );
}
