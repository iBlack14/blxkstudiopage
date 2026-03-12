import type { Metadata } from "next"
import HomePage from "@/app/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "BLXK Studio | Desarrollo Web, IA y Automatización",
    description:
      "Desarrollo web, automatización e IA para empresas. En BLXK Studio creamos soluciones rápidas, seguras y escalables.",
    path: "/",
    locale,
    localizedPath: `/${locale}`,
    keywords: [
      "BLXK Studio",
      "desarrollo web",
      "automatización n8n",
      "inteligencia artificial",
      "integraciones API",
      "software empresarial",
    ],
  })
}

export default HomePage
