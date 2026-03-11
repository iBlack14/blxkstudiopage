import type { Metadata } from "next"
import SecurityPage from "@/app/seguridad/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Ciberseguridad Empresarial | BLXK Studio",
    description:
      "Pentesting, auditorias de seguridad, SOC 24/7 y respuesta a incidentes. Protege tu negocio digital antes del ataque con BLXK Studio.",
    path: "/seguridad",
    locale,
    keywords: [
      "ciberseguridad",
      "pentesting",
      "auditoria de seguridad web",
      "ethical hacking",
      "soc 24/7",
      "hardening",
      "iso 27001",
    ],
  })
}

export default SecurityPage
