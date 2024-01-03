import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // REDIRECT LOGGED OUT USERS TO LOGIN PAGE
  if (pathname.startsWith("/profile")) {
    // check for token
    const token = request.cookies.get("token")?.value;
    if (token) {
      // console.log(token);
      try {
        // check  if the token is valid
        const res = await fetch("http://localhost:5000/api/auth/checktoken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // console.log("data", data);
        if (data.success) {
          return NextResponse.next();
        } else {
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
    if (token) {
      try {
        // check  if the token is valid
        const res = await fetch("http://localhost:5000/api/auth/checktoken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
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
}
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/login", "/signup"],
};
