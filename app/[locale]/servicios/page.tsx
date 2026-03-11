import type { Metadata } from "next"
import ServicesPage from "@/app/servicios/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Servicios | BLXK Studio",
    description:
      "Servicios de BLXK Studio: desarrollo web, e-commerce, automatización con IA, sistemas logísticos y soluciones digitales a medida.",
    path: "/servicios",
    locale,
    keywords: [
      "servicios desarrollo web",
      "automatización ia",
      "n8n empresas",
      "desarrollo ecommerce",
      "software a medida",
    ],
  })
}

export default ServicesPage
