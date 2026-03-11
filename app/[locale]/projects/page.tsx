import type { Metadata } from "next"
import ProjectsPage from "@/app/projects/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Portafolio | BLXK Studio",
    description:
      "Conoce proyectos reales de desarrollo web, automatizacion e IA creados por BLXK Studio.",
    path: "/projects",
    locale,
    keywords: [
      "portafolio desarrollo web",
      "proyectos fullstack",
      "whatsapp payment",
      "n8n automation",
      "dashboard administrativo",
      "chatbot whatsapp",
    ],
  })
}

export default ProjectsPage
