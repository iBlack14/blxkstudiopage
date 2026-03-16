import { ThemeProvider } from "@/components/layout/theme-provider"
import { LanguageProvider } from "@/components/layout/language-provider"
import { DEFAULT_LOCALE, LOCALE_MANUAL_COOKIE, Locale } from "@/lib/i18n"
import { cookies, headers } from "next/headers"

export default async function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale = (headerStore.get("x-blxk-locale") || cookieStore.get(LOCALE_MANUAL_COOKIE)?.value || DEFAULT_LOCALE) as Locale

  return (
    <html
      lang={locale || DEFAULT_LOCALE}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider initialLocale={locale || DEFAULT_LOCALE}>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
