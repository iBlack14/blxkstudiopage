"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { DEFAULT_LOCALE, LOCALE_COOKIE, Locale, messages } from "@/lib/i18n"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  m: (typeof messages)[Locale]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || DEFAULT_LOCALE)

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      m: messages[locale],
    }),
    [locale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}
