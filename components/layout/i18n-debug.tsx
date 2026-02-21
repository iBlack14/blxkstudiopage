"use client"

import { useEffect, useState } from "react"

function readCookie(name: string): string {
  const parts = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))
  return parts ? decodeURIComponent(parts.split("=")[1] || "") : ""
}

type DebugData = {
  country: string
  accept: string
  source: string
  locale: string
  enabled: boolean
}

export function I18nDebugPanel() {
  const [data, setData] = useState<DebugData | null>(null)

  useEffect(() => {
    const update = () => {
      const enabledCookie = readCookie("blxk-debug-enabled")
      const enabled = process.env.NODE_ENV !== "production" || enabledCookie === "1"
      if (!enabled) {
        setData(null)
        return
      }

      setData({
        country: readCookie("blxk-debug-country") || "none",
        accept: readCookie("blxk-debug-accept") || "none",
        source: readCookie("blxk-debug-source") || "none",
        locale: readCookie("blxk-debug-locale") || "none",
        enabled,
      })
    }

    update()
    const id = setInterval(update, 1500)
    return () => clearInterval(id)
  }, [])

  if (!data?.enabled) return null

  return (
    <div className="fixed left-3 top-3 z-[10000] text-[11px] leading-tight rounded-md border border-primary/40 bg-background/95 px-2 py-1.5 shadow-lg">
      <p><b>i18n</b> locale: {data.locale}</p>
      <p>source: {data.source}</p>
      <p>country: {data.country}</p>
      <p>accept: {data.accept}</p>
    </div>
  )
}
