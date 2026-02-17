import { getRequestContext } from "@cloudflare/next-on-pages";
import { createToken, buildTokenCookie } from "@/lib/auth";

export const runtime = "edge";

interface LoginBody {
  password?: string;
}

export async function POST(request: Request) {
  try {
    const { env } = getRequestContext();

    let body: LoginBody;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const password = body.password;
    if (!password) {
      return Response.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    // Compare with admin password from environment
    const adminPassword = env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return Response.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken(env.JWT_SECRET);

    // Return response with httpOnly cookie
    return new Response(JSON.stringify({ message: "Authenticated" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": buildTokenCookie(token),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
