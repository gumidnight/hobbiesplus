import { SignJWT, jwtVerify } from "jose";

const TOKEN_COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "8h";

function getSecret(jwtSecret: string): Uint8Array {
  return new TextEncoder().encode(jwtSecret);
}

/**
 * Create a signed JWT token for admin authentication.
 */
export async function createToken(jwtSecret: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecret(jwtSecret));
}

/**
 * Verify a JWT token and return the payload if valid, or null if invalid.
 */
export async function verifyToken(
  token: string,
  jwtSecret: string
): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(jwtSecret));
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Build a Set-Cookie header value for the admin JWT token.
 */
export function buildTokenCookie(token: string): string {
  return `${TOKEN_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${8 * 60 * 60}`;
}

/**
 * Build a Set-Cookie header value that clears (expires) the admin token.
 */
export function buildClearTokenCookie(): string {
  return `${TOKEN_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export { TOKEN_COOKIE_NAME };
