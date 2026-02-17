import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, TOKEN_COOKIE_NAME } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API through without auth
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return handleUnauthorized(request);
  }

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
    
    const payload = await verifyToken(token, env.JWT_SECRET);

    if (!payload) {
      return handleUnauthorized(request);
    }

    return NextResponse.next();
  } catch {
    return handleUnauthorized(request);
  }
}

function handleUnauthorized(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
