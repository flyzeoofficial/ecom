import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "./lib/auth-backend";
import { sellerAuth } from "./lib/auth-seller";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protect Backend
  if (pathname.startsWith("/backend")) {
    if (pathname === "/backend/login") return NextResponse.next();
    const session = await adminAuth();
    if (!session) return NextResponse.redirect(new URL("/backend/login", req.url));
  }

  // 2. Protect Seller
  if (pathname.startsWith("/seller")) {
    if (pathname === "/seller/login") return NextResponse.next();
    const session = await sellerAuth();
    if (!session) return NextResponse.redirect(new URL("/seller/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/backend/:path*", "/seller/:path*"],
};