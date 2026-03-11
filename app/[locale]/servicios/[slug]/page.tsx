import type { Metadata } from "next"
import ServiceDetailPage from "@/app/servicios/[slug]/page"
import { servicesData } from "@/lib/services-data"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return servicesData.flatMap((service) =>
    ["es", "en", "pt", "fr", "de", "it"].map((locale) => ({
      locale,
      slug: service.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const service = servicesData.find((item) => item.slug === slug)

  if (!service) {
    return buildPageMetadata({
      title: "Servicio | BLXK Studio",
      description: "Conoce nuestros servicios de desarrollo web, IA y automatización.",
      path: "/servicios",
      locale,
    })
  }

  return buildPageMetadata({
    title: `${service.title} | BLXK Studio`,
    description: service.shortDescription,
    path: `/servicios/${service.slug}`,
    locale,
    keywords: [
      service.title,
      service.subtitle,
      "servicios blxk studio",
      "desarrollo web",
      "automatización empresarial",
    ],
  })
}

export default ServiceDetailPage
