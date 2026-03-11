import { NextRequest, NextResponse } from "next/server"
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_MANUAL_COOKIE,
  NON_LOCALIZED_PATHS,
  getLocaleFromPathname,
  localizePath,
  resolveLocaleWithMeta,
} from "@/lib/i18n"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isPublicAsset = /\.[a-z0-9]+$/i.test(pathname)
  const localeFromPath = getLocaleFromPathname(pathname)
  const isNonLocalizedPath = NON_LOCALIZED_PATHS.includes(pathname as (typeof NON_LOCALIZED_PATHS)[number])

  if (isPublicAsset) {
    return NextResponse.next()
  }

  if (!localeFromPath && !isNonLocalizedPath) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = localizePath(pathname, DEFAULT_LOCALE)
    return NextResponse.redirect(redirectUrl, 308)
  }

  const currentCookie = request.cookies.get(LOCALE_COOKIE)?.value
  const manualCookie = request.cookies.get(LOCALE_MANUAL_COOKIE)?.value
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    null
  const acceptLanguage = request.headers.get("accept-language")

  const resolvedLocale = localeFromPath || resolveLocaleWithMeta({
    cookieLocale: currentCookie,
    manualLocale: manualCookie,
    countryCode: country,
    acceptLanguage,
  }).locale
  const source = localeFromPath ? "path" : "fallback"
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-blxk-locale", resolvedLocale)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.cookies.set(LOCALE_COOKIE, resolvedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  // Debug controls for Vercel preview/dev:
  // - ?i18ndebug=1 enables on-screen debug panel
  // - ?i18ndebug=0 disables it
  const debugParam = request.nextUrl.searchParams.get("i18ndebug")
  if (debugParam === "1" || debugParam === "0") {
    response.cookies.set("blxk-debug-enabled", debugParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: false,
    })
  }

  response.cookies.set("blxk-debug-country", country || "none", {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: false,
  })
  response.cookies.set("blxk-debug-accept", (acceptLanguage || "none").slice(0, 80), {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: false,
  })
  response.cookies.set("blxk-debug-source", source, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: false,
  })
  response.cookies.set("blxk-debug-locale", resolvedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: false,
  })

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)"],
}
