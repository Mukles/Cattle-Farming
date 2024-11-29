import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const publicUrl = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { user } = (await auth()) || {};
  const isAuth = !!user;
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const origin = nextUrl.origin;
  const form = nextUrl.searchParams.get("from");
  const params = nextUrl.search;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/dashboard", origin));
  }

  if (publicUrl.some((u) => pathname.startsWith(u)) && isAuth) {
    return NextResponse.redirect(new URL(form || "/dashboard", origin), 301);
  }

  if (!isAuth) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(pathname + params)}`, origin)
    );
  }
}
