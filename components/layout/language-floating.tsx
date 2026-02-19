"use client"

import { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { LOCALE_OPTIONS, Locale } from "@/lib/i18n"
import { useLanguage } from "@/components/layout/language-provider"

export function FloatingLanguageSelector() {
  const { locale, setLocale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const current = LOCALE_OPTIONS.find((item) => item.value === locale)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed left-4 bottom-24 md:bottom-8 z-[9999]">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border-2 border-primary bg-background px-3 py-2 shadow-2xl min-w-[165px]"
          aria-label="Select language"
          aria-expanded={open}
        >
          <Languages className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-primary">Idioma</span>
          <span className="text-xs md:text-sm font-semibold text-foreground">
            {current?.label || "Language"}
          </span>
          <span className="ml-auto text-primary text-xs">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <div className="absolute left-0 bottom-[calc(100%+8px)] w-full rounded-xl border border-primary/30 bg-background shadow-2xl overflow-hidden">
            {LOCALE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLocale(option.value as Locale)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-xs md:text-sm transition-colors ${
                  locale === option.value
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-foreground hover:bg-primary/10"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
