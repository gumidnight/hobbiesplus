import { getRequestContext } from "@cloudflare/next-on-pages";
import { isValidEmail, sanitize } from "@/lib/utils";

export const runtime = "edge";

interface RegisterBody {
  email?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

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
      { message: "You're on the list! We'll be in touch soon. 🎉" },
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
