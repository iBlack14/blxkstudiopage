import type { Metadata } from "next"
import NosotrosPage from "@/app/nosotros/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Nosotros | BLXK Studio",
    description:
      "Conoce al equipo de BLXK Studio: estrategia, diseño y tecnología para crecimiento empresarial con soluciones web, IA y automatización.",
    path: "/nosotros",
    locale,
    keywords: [
      "sobre blxk studio",
      "equipo desarrollo web",
      "agencia tecnológica",
      "consultoría digital",
      "desarrollo software empresarial",
    ],
  })
}

export default NosotrosPage
