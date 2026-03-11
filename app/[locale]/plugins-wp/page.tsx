import type { Metadata } from "next"
import PluginsWPPage from "@/app/plugins-wp/page"
import { Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  return buildPageMetadata({
    title: "Plugins WordPress y WooCommerce | BLXK Studio",
    description:
      "Plugins premium para WordPress y WooCommerce: pagos por WhatsApp, automatización comercial y mejoras administrativas para escalar ventas.",
    path: "/plugins-wp",
    locale,
    keywords: [
      "plugins wordpress premium",
      "plugins woocommerce",
      "pago por whatsapp woocommerce",
      "automatización wordpress",
      "plugins blxk studio",
    ],
  })
}

export default PluginsWPPage
