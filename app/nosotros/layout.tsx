import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Nosotros | BLXK Studio",
  description:
    "Conoce al equipo de BLXK Studio: estrategia, diseño y tecnología para crecimiento empresarial con soluciones web, IA y automatización.",
  path: "/nosotros",
  keywords: [
    "sobre blxk studio",
    "equipo desarrollo web",
    "agencia tecnológica",
    "consultoría digital",
    "desarrollo software empresarial",
  ],
})

export default function NosotrosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
