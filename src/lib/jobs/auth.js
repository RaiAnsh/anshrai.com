// HMAC-signed cookie helpers using Web Crypto (works in Edge runtime / proxy.js)
// Cookie format: `<expiresAt>.<base64url(HMAC-SHA256(expiresAt, secret))>`

const COOKIE_NAME = "jobs_auth";
const EXPIRY_DAYS = 30;

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

async function getKey(secret) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(payload, secret) {
  const key = await getKey(secret);
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return b64url(sig);
}

export async function createJobsCookie() {
  const secret = process.env.JOBS_COOKIE_SECRET;
  if (!secret) throw new Error("JOBS_COOKIE_SECRET not set");

  const expiresAt = String(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const sig       = await sign(expiresAt, secret);
  return `${expiresAt}.${sig}`;
}

export async function verifyJobsCookie(value) {
  if (!value) return false;
  const secret = process.env.JOBS_COOKIE_SECRET;
  if (!secret) return false;

  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;

  const expiresAt = value.slice(0, dot);
  const givenSig  = value.slice(dot + 1);

  // Check expiry
  if (Date.now() > Number(expiresAt)) return false;

  // Constant-time signature compare
  const expectedSig = await sign(expiresAt, secret);
  if (givenSig.length !== expectedSig.length) return false;

  // Compare byte-by-byte to avoid timing attacks
  let diff = 0;
  for (let i = 0; i < givenSig.length; i++) {
    diff |= givenSig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  return diff === 0;
}

export { COOKIE_NAME };
