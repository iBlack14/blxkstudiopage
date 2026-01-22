"use client"

import { useState, useEffect } from "react"
import { useTheme as useNextTheme } from "next-themes"

export function useTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const isDayMode = resolvedTheme === "light"

  return {
    theme: (theme as "light" | "dark") || "dark",
    toggleTheme,
    isDayMode,
    mounted
  }
}

