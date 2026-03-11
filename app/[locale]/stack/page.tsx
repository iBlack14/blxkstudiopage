import type { Metadata } from "next"
import StackPage from "@/app/stack/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Stack Tecnológico | BLXK Studio",
    description:
      "Tecnologías que usa BLXK Studio: Next.js, React, Node.js, IA, automatización y herramientas modernas para productos escalables.",
    path: "/stack",
    locale,
    keywords: [
      "stack tecnológico",
      "next.js react node.js",
      "herramientas ia",
      "tecnologías blxk studio",
    ],
  })
}

export default StackPage
