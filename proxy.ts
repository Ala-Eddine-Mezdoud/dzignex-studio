import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  // Protect the dashboard route
  if (isOnDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
  }

  // Redirect authenticated users away from the sign-in page directly to dashboard
  if (isLoggedIn && req.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
})

export const config = {
  // Ensure middleware runs on all paths except static assets and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
