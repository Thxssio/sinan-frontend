import { NextRequest, NextResponse } from "next/server"

import { AUTH_TOKEN_KEY, ROUTES } from "@/lib/constants"

const protectedRoutes = [
  ROUTES.dashboard,
  ROUTES.notifications,
  ROUTES.patients,
  ROUTES.units,
  ROUTES.reports,
  ROUTES.settings,
]

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value
  const { pathname } = request.nextUrl

  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = ROUTES.login
    loginUrl.searchParams.set("redirect", pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (pathname === ROUTES.login && token) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = ROUTES.dashboard
    dashboardUrl.search = ""

    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
