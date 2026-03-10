import { getRequestContext } from "@cloudflare/next-on-pages";
import { isValidEmail, sanitize } from "@/lib/utils";

export const runtime = "edge";

interface RegisterBody {
  email?: string;
  name?: string;
  recaptchaToken?: string;
}

export async function POST(request: Request) {
  try {
    // Try to get Cloudflare env, fallback for local dev
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let db: any = undefined;
    let recaptchaSecret: string | undefined;
    try {
      const context = getRequestContext();
      db = context.env.DB;
      recaptchaSecret = context.env.RECAPTCHA_SECRET_KEY;
    } catch {
      // Local development — no Cloudflare context, DB unavailable
      recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    }

    // Check if DB is available
    if (!db) {
      console.error('DB binding not available in local development.');
      console.error('To test registration locally, you need to:');
      console.error('1. Create local D1 database: wrangler d1 create hobbies-plus-local');
      console.error('2. Update wrangler.toml with local database binding');
      console.error('3. Run migrations: wrangler d1 migrations apply hobbies-plus-local --local');
      console.error('OR test the registration feature on production: https://hobbiesplus.pages.dev');
      
      // For local dev convenience, just return success without saving
      return Response.json(
        { message: "You're on the list! (Local dev mode - not actually saved)" },
        { status: 201 }
      );
    }

    // Parse request body
    let body: RegisterBody;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim() || null;
    const recaptchaToken = body.recaptchaToken;

    // Verify reCAPTCHA token (skip in local dev if no secret configured)
    if (recaptchaSecret && recaptchaToken) {
      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
        }
      );
      const verifyData = (await verifyRes.json()) as { success: boolean };
      if (!verifyData.success) {
        return Response.json(
          { error: "Request blocked. Please try again." },
          { status: 400 }
        );
      }
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize name
    const safeName = name ? sanitize(name).slice(0, 100) : null;

    // Extract metadata
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert into D1 — handle duplicate
    try {
      await db
        .prepare(
          "INSERT INTO registrations (email, name, ip, user_agent) VALUES (?, ?, ?, ?)"
        )
        .bind(email, safeName, ip, userAgent.slice(0, 500))
        .run();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("UNIQUE constraint failed")) {
        return Response.json(
          { error: "This email is already registered." },
          { status: 409 }
        );
      }
      throw err;
    }

    return Response.json(
      { message: "You're on the list. We'll be in touch soon." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return Response.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
