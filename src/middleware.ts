import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "rayanxweb_default_secret_key_64_bytes_secure");

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/_next") || path.startsWith("/static") || path.includes(".")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("rayanx_session")?.value;

  if (!token && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET_KEY);
      
      if (path === "/login" || path === "/register") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (path.startsWith("/dashboard/admin") && !["SUPERADMIN", "ADMIN"].includes(payload.role as string)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (err) {
      const fallbackResponse = NextResponse.redirect(new URL("/login", request.url));
      fallbackResponse.cookies.delete("rayanx_session");
      return fallbackResponse;
    }
  }

  const response = NextResponse.next();
  // Global Security Headers Injection
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
  response.headers.set("Content-Security-Policy", "default-src 'self' https: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");

  return response;
}
