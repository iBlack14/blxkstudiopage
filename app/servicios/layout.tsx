import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Servicios | BLXK Studio",
  description:
    "Servicios de BLXK Studio: desarrollo web, e-commerce, automatización con IA, sistemas logísticos y soluciones digitales a medida.",
  path: "/servicios",
  keywords: [
    "servicios desarrollo web",
    "automatización ia",
    "n8n empresas",
    "desarrollo ecommerce",
    "software a medida",
  ],
})

export default function ServiciosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
