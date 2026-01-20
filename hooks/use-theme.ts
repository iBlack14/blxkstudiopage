"use client"

import { useTheme as useNextTheme } from "next-themes"

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const isDayMode = resolvedTheme === "light"

  return {
    theme: (theme as "light" | "dark") || "dark",
    toggleTheme,
    isDayMode,
    mounted: resolvedTheme !== undefined
  }
}

