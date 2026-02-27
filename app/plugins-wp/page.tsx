import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { PluginsHero } from "@/components/plugins-wp/plugins-hero"
import { PluginsShowcase } from "@/components/plugins-wp/plugins-showcase"

const Contact = dynamic(
    () => import("@/components/contact").then((m) => ({ default: m.Contact })),
    { loading: () => null, ssr: true }
)

export const metadata: Metadata = {
    title: "Plugins WP | BLXK Studio",
    description:
        "Plugins premium para WordPress y WooCommerce desarrollados por BLXK Studio: gateway de pagos WhatsApp, automatización de ventas, administración avanzada y más.",
    keywords:
        "plugins wordpress, woocommerce plugin, whatsapp payment wordpress, blxk studio plugins, automatización wordpress, woocommerce gateway",
    authors: [{ name: "BLXK Studio" }],
    creator: "BLXK Studio",
    publisher: "BLXK Studio",
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://blxkstudio.com/plugins-wp",
        title: "Plugins WP | BLXK Studio",
        description:
            "Plugins WordPress y WooCommerce premium para automatizar y potenciar tu negocio.",
        siteName: "BLXK Studio",
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Plugins WP | BLXK Studio",
        description: "Plugins WordPress premium: pagos WhatsApp, automatización y más.",
        images: ["/twitter-image"],
    },
    alternates: {
        canonical: "https://blxkstudio.com/plugins-wp",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

const pluginsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://blxkstudio.com/plugins-wp#collection",
    name: "Plugins WordPress de BLXK Studio",
    url: "https://blxkstudio.com/plugins-wp",
    description:
        "Plugins premium para WordPress y WooCommerce desarrollados por BLXK Studio",
    hasPart: {
        "@type": "ItemList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "SoftwareApplication",
                    name: "Black WhatsApp Payment",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "WordPress",
                    description: "Gateway de pagos vía WhatsApp para WooCommerce",
                    url: "https://blxkstudio.com/plugins-wp",
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
                    description: "Automatización de ventas y CRM para WooCommerce",
                    url: "https://blxkstudio.com/plugins-wp",
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
                    url: "https://blxkstudio.com/plugins-wp",
                },
            },
        ],
    },
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
