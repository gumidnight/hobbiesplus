import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

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
