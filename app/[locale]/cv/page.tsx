import type { Metadata } from "next"
import CVPage from "@/app/cv/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Alonso Huancas Cruz | CV - Full-Stack Developer",
    description:
      "CV de Alonso Huancas Cruz - Full-Stack Developer y Fundador de BLXK Studio. Experiencia en desarrollo web, automatización e IA.",
    path: "/cv",
    locale,
    localizedPath: `/${locale}/cv`,
    keywords: [
      "Alonso Huancas Cruz",
      "CV",
      "Full-Stack Developer",
      "desarrollo web",
      "Next.js",
      "React",
      "BLXK Studio",
    ],
  })
}

export default CVPage
