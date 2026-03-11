import type { Metadata } from "next"
import { headers } from "next/headers"
import { Navigation } from "@/components/layout/navigation"
import { SecurityPageClient } from "@/components/security/security-page-client"
import { buildPageMetadata } from "@/lib/seo"
import { Locale, localizePath } from "@/lib/i18n"

const securityJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://blxkstudio.com/seguridad#service",
    name: "Ciberseguridad Empresarial — BLXK Studio",
    url: "https://blxkstudio.com/seguridad",
    description:
        "Servicios de ciberseguridad: pentesting, auditorías de seguridad web, monitoreo SOC 24/7, hardening de servidores y respuesta a incidentes.",
    provider: {
        "@type": "Organization",
        name: "BLXK Studio",
        url: "https://blxkstudio.com",
    },
    serviceType: "Cybersecurity",
    areaServed: ["PE", "MX", "CO", "CL", "AR"],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Ciberseguridad",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pentesting & Ethical Hacking" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auditoría de Seguridad Web" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monitoreo SOC 24/7" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hardening de Servidores" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoría & Cumplimiento" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Respuesta a Incidentes" } },
        ],
    },
}

export const metadata: Metadata = buildPageMetadata({
    title: "Ciberseguridad Empresarial | BLXK Studio",
    description:
        "Pentesting, auditorias de seguridad, SOC 24/7 y respuesta a incidentes. Protege tu negocio digital antes del ataque con BLXK Studio.",
    path: "/seguridad",
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

export default async function SecurityPage() {
    const locale = ((await headers()).get("x-blxk-locale") || "es") as Locale
    const localizedSecurityPath = localizePath("/seguridad", locale)
    return (
        <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navigation />
            <SecurityPageClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        ...securityJsonLd,
                        "@id": `https://blxkstudio.com${localizedSecurityPath}#service`,
                        url: `https://blxkstudio.com${localizedSecurityPath}`,
                    }),
                }}
            />
        </main>
    )
}
