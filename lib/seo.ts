import type { Metadata } from "next"

export const SITE_URL = "https://blxkstudio.com"
export const SITE_NAME = "BLXK Studio"
export const DEFAULT_OG_IMAGE = "/opengraph-image"
export const DEFAULT_TWITTER_IMAGE = "/twitter-image"

type PageSeoOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
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
}: PageSeoOptions): Metadata {
  const canonical = buildCanonical(path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "es_PE",
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
