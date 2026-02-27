import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { PluginsHero } from "@/components/plugins-wp/plugins-hero"
import { PluginsShowcase } from "@/components/plugins-wp/plugins-showcase"
import { SITE_URL, buildPageMetadata } from "@/lib/seo"

const Contact = dynamic(
    () => import("@/components/contact").then((m) => ({ default: m.Contact })),
    { loading: () => null, ssr: true }
)

export const metadata: Metadata = buildPageMetadata({
    title: "Plugins WordPress y WooCommerce | BLXK Studio",
    description:
        "Plugins premium para WordPress y WooCommerce: pagos por WhatsApp, automatización comercial y mejoras administrativas para escalar ventas.",
    path: "/plugins-wp",
    keywords: [
        "plugins wordpress premium",
        "plugins woocommerce",
        "pago por whatsapp woocommerce",
        "automatización wordpress",
        "plugins blxk studio",
    ],
})

const pluginsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/plugins-wp#collection`,
            name: "Plugins WordPress de BLXK Studio",
            url: `${SITE_URL}/plugins-wp`,
            description:
                "Plugins premium para WordPress y WooCommerce desarrollados por BLXK Studio",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Plugins WP", item: `${SITE_URL}/plugins-wp` },
            ],
        },
        {
            "@type": "ItemList",
            "@id": `${SITE_URL}/plugins-wp#plugins`,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "Black WhatsApp Payment",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "WordPress",
                        description: "Gateway de pagos via WhatsApp para WooCommerce",
                        url: `${SITE_URL}/plugins-wp`,
                        creator: {
                            "@type": "Organization",
                            name: "BLXK Studio",
                            url: SITE_URL,
                            sameAs: "https://github.com/iBlack14",
                        },
                    },
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "BLXK Woo Automator",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "WordPress",
                        description: "Automatizacion de ventas y CRM para WooCommerce",
                        url: `${SITE_URL}/plugins-wp`,
                    },
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "BLXK Admin Enhancer",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "WordPress",
                        description: "Panel administrativo mejorado para WordPress",
                        url: `${SITE_URL}/plugins-wp`,
                    },
                },
            ],
        },
    ],
}

export default function PluginsWPPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />
            <PluginsHero />
            <PluginsShowcase />
            <Suspense fallback={null}>
                <Contact />
            </Suspense>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pluginsJsonLd) }}
            />
        </main>
    )
}
