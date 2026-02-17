import { getRequestContext } from "@cloudflare/next-on-pages";
import { buildClearTokenCookie } from "@/lib/auth";

export const runtime = "edge";

export async function POST() {
  try {
    // We just need to clear the cookie — no env needed, but keep consistent pattern
    getRequestContext();

    return new Response(JSON.stringify({ message: "Logged out" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": buildClearTokenCookie(),
      },
    });
  } catch (err) {
    console.error("Logout error:", err);
    return Response.json({ error: "Logout failed." }, { status: 500 });
  }
}
