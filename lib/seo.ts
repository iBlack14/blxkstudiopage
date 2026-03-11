import type { Metadata } from "next"
import {
  DEFAULT_LOCALE,
  Locale,
  SUPPORTED_LOCALES,
  localeToHrefLang,
  localeToOpenGraphLocale,
  localizePath,
} from "@/lib/i18n"

export const SITE_URL = "https://blxkstudio.com"
export const SITE_NAME = "BLXK Studio"
export const DEFAULT_OG_IMAGE = "/opengraph-image"
export const DEFAULT_TWITTER_IMAGE = "/twitter-image"

type PageSeoOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  locale?: Locale
  localizedPath?: string
}

function buildCanonical(path = "") {
  if (!path) {
    return SITE_URL
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  locale,
  localizedPath,
}: PageSeoOptions): Metadata {
  const resolvedLocalizedPath = locale
    ? (localizedPath || localizePath(path || "/", locale))
    : path
  const canonical = buildCanonical(resolvedLocalizedPath)
  const alternates = locale
    ? {
        canonical,
        languages: {
          ...Object.fromEntries(
            SUPPORTED_LOCALES.map((supportedLocale) => [
              localeToHrefLang(supportedLocale),
              buildCanonical(localizePath(path || "/", supportedLocale)),
            ])
          ),
          "x-default": buildCanonical(localizePath(path || "/", DEFAULT_LOCALE)),
        },
      }
    : {
        canonical,
      }

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      type: "website",
      locale: localeToOpenGraphLocale(locale || DEFAULT_LOCALE),
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_TWITTER_IMAGE],
      creator: "@BlxkBusines",
      site: "@BlxkBusines",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export function buildNoIndexMetadata({
  title,
  description,
  path = "",
}: Omit<PageSeoOptions, "keywords">): Metadata {
  const canonical = buildCanonical(path)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        "max-video-preview": 0,
        "max-image-preview": "none",
        "max-snippet": 0,
      },
    },
  }
}
