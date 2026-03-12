import { describe, expect, it } from "vitest"

import {
  DEFAULT_LOCALE,
  localizePath,
  resolveLocaleWithMeta,
  stripLocaleFromPathname,
} from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

describe("i18n helpers", () => {
  it("localizes root and nested paths", () => {
    expect(localizePath("/", "es")).toBe("/es")
    expect(localizePath("/projects", "en")).toBe("/en/projects")
  })

  it("strips locale prefixes safely", () => {
    expect(stripLocaleFromPathname("/es/servicios")).toBe("/servicios")
    expect(stripLocaleFromPathname("/privacy")).toBe("/privacy")
  })

  it("prefers accept-language over country on mismatch", () => {
    expect(
      resolveLocaleWithMeta({
        countryCode: "PE",
        acceptLanguage: "en-US,en;q=0.9",
      })
    ).toEqual({
      locale: "en",
      source: "accept-language",
    })
  })

  it("falls back to default locale", () => {
    expect(resolveLocaleWithMeta({})).toEqual({
      locale: DEFAULT_LOCALE,
      source: "default",
    })
  })
})

describe("seo metadata", () => {
  it("builds canonical and language alternates", () => {
    const metadata = buildPageMetadata({
      title: "Test",
      description: "Desc",
      path: "/projects",
      locale: "es",
    })

    expect(metadata.alternates?.canonical).toBe("https://blxkstudio.com/es/projects")
    expect(metadata.alternates?.languages?.en).toBe("https://blxkstudio.com/en/projects")
  })
})
