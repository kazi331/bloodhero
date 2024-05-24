import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "./lib/utils";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const { pathname } = request.nextUrl;

  // REDIRECT LOGGED OUT USERS TO LOGIN PAGE
  if (pathname.startsWith("/profile")) {
    // check for token
    const token = request.cookies.get("token")?.value;
    if (token) {
      try {
        const data = await isAuthenticated(token);
        if (data.success) {
          return NextResponse.next();
        } else {
          request.cookies.delete("token");
          request.cookies.delete("_id");
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } catch (err: any) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // REDIRECT LOGGED IN USERS TO PROFILE
  if (pathname == "/login" || pathname == "/signup") {
    const token = request.cookies.get("token")?.value;
    console.log(token);
    if (token) {
      try {
        // check  if the token is valid
        const data = await isAuthenticated(token);
        // console.log("data 45", data);
        if (data.success) {
          return NextResponse.redirect(new URL("/profile", request.url));
        } else {
          return NextResponse.next();
        }
      } catch (err: any) {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }

  // REDIRECT DASHBOARD PAGE TO DASHBOARD/DONORS
  if (pathname == "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/donors", request.url));
  }
}
export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)",
  ],
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
