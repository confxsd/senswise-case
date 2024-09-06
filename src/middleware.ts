import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth-server";

export async function middleware(req: NextRequest) {
  const tokenData = await getTokenFromCookies(req);

  const { pathname } = req.nextUrl;

  if (tokenData && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!tokenData && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
