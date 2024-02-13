import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const { pathname } = request.nextUrl;

  // REDIRECT DASHBOARD PAGE TO DASHBOARD/DONORS
  if (pathname == "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/donors", request.url));
  }
}
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/login", "/signup"],
};
