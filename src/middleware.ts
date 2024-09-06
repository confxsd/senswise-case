import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/auth-server";

export async function middleware(req: NextRequest) {
  const tokenData = await getTokenFromCookies(req);

  if (tokenData) {
    console.log("Token data:", tokenData);
  } else {
    console.log("No valid token");
  }

  const { pathname } = req.nextUrl;

  // If the user is logged in and tries to access the login page, redirect them to the dashboard
  if (tokenData && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard routes if the user is not logged in
  if (!tokenData && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
