import { MetadataRoute } from 'next'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, localizePath } from "@/lib/i18n"
import { servicesData } from "@/lib/services-data"

// Keep this stable until the next site content release to avoid false "freshly updated" signals.
const LAST_SITE_UPDATE = new Date('2026-03-11T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blxkstudio.com'
  const localizedPages = ["/", "/nosotros", "/servicios", "/stack", "/projects", "/seguridad", "/plugins-wp", "/contacto"]
  const pageUrls: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    localizedPages.map((path) => ({
      url: `${baseUrl}${localizePath(path, locale)}`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: path === "/" || path === "/servicios" || path === "/projects" || path === "/seguridad" ? "weekly" : "monthly",
      priority: locale === DEFAULT_LOCALE && (path === "/" || path === "/servicios" || path === "/projects" || path === "/seguridad") ? 0.9 : 0.7,
    }))
  )
  const serviceUrls: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    servicesData.map((service) => ({
      url: `${baseUrl}${localizePath(`/servicios/${service.slug}`, locale)}`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: locale === DEFAULT_LOCALE ? 0.85 : 0.65,
    }))
  )

  return [
    ...pageUrls,
    ...serviceUrls,
  ]
}
