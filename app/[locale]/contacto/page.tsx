import type { Metadata } from "next"
import ContactoPage from "@/app/contacto/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Contacto | BLXK Studio",
    description:
      "Habla con BLXK Studio y cotiza tu proyecto de desarrollo web, automatización o inteligencia artificial.",
    path: "/contacto",
    locale,
    keywords: [
      "contacto blxk studio",
      "cotizar desarrollo web",
      "consultoría automatización",
      "agencia ia",
    ],
  })
}

export default ContactoPage
