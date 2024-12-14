import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const publicUrl = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { user } = (await auth()) || {};
  const isAuth = !!user;
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const origin = nextUrl.origin;
  const params = nextUrl.search;

  if (isAuth && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (isAuth && publicUrl.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (!isAuth && !publicUrl.includes(pathname)) {
    return NextResponse.redirect(
      new URL("/login?from=" + pathname + params, origin)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/profile",
    "/tags/:path*",
  ],
};
