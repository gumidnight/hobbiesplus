import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  try {
    // Try to get Cloudflare env, fallback to process.env for local dev
    let env;
    try {
      const context = getRequestContext();
      env = context.env;
    } catch {
      // Local development fallback
      env = process.env as any;
    }
    
    const db = env.DB;

    // Check if DB is available
    if (!db) {
      console.error('DB binding not available in local development.');
      // Return empty array for local dev
      return Response.json({ registrations: [] });
    }

    const { results } = await db
      .prepare(
        "SELECT id, email, name, created_at, ip, user_agent FROM registrations ORDER BY created_at DESC"
      )
      .all();

    return Response.json({ registrations: results ?? [] });
  } catch (err) {
    console.error("Fetch registrations error:", err);
    return Response.json(
      { error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}
