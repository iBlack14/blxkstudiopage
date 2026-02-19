import { NextRequest, NextResponse } from "next/server"
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n"

export function proxy(request: NextRequest) {
  const currentCookie = request.cookies.get(LOCALE_COOKIE)?.value
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    null
  const acceptLanguage = request.headers.get("accept-language")

  const locale = resolveLocale({
    cookieLocale: currentCookie,
    countryCode: country,
    acceptLanguage,
  })

  const response = NextResponse.next()
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)"],
}
