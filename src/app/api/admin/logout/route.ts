import { buildClearTokenCookie } from "@/lib/auth";

export const runtime = "edge";

export async function POST() {
  // Logout just clears the cookie — no env/DB access needed
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildClearTokenCookie(),
    },
  });
}
