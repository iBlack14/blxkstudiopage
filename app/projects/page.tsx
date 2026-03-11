import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { headers } from "next/headers"
import { Navigation } from "@/components/layout/navigation"
import { ProjectsShowcase } from "@/components/projects/projects-showcase"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsComparison } from "@/components/projects/projects-comparison"
import { ProjectsTestimonials } from "@/components/projects/projects-testimonials"
import { ProjectDemos } from "@/components/home/project-demos"
import { buildPageMetadata } from "@/lib/seo"
import { Locale, localizePath } from "@/lib/i18n"

const ProjectsStats = dynamic(() => import("@/components/projects/projects-stats").then(m => ({ default: m.ProjectsStats })), {
  loading: () => null,
  ssr: true,
})
const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
  ssr: true,
})

export const metadata: Metadata = buildPageMetadata({
  title: "Portafolio | BLXK Studio",
  description:
    "Conoce proyectos reales de desarrollo web, automatizacion e IA creados por BLXK Studio.",
  path: "/projects",
  keywords: [
    "portafolio desarrollo web",
    "proyectos fullstack",
    "whatsapp payment",
    "n8n automation",
    "dashboard administrativo",
    "chatbot whatsapp",
  ],
})

const PROJECTS_SCHEMA = [
  {
    name: "Black WhatsApp Payment",
    category: "Plugin WordPress",
    description: "Gateway de pagos vía WhatsApp para WooCommerce",
    image: "/projects/proyecto-pagos-whatsapp.png",
    url: "https://wazilrest.blxkstudio.com",
  },
  {
    name: "Sales Automation N8N",
    category: "Automatización",
    description: "Flujos automáticos: compra -> WhatsApp -> CRM",
    image: "/projects/proyecto-automatizacion-n8n.png",
  },
  {
    name: "Order Management System",
    category: "Full Stack",
    description: "Sistema de gestión de pedidos en tiempo real",
    image: "/projects/proyecto-sistema-pedidos.png",
  },
  {
    name: "AI Chatbot WhatsApp",
    category: "Inteligencia Artificial",
    description: "Bot con IA para atención y toma de pedidos",
    image: "/projects/proyecto-chatbot-ia-whatsapp.png",
  },
  {
    name: "Admin Dashboard",
    category: "Dashboard",
    description: "Panel administrativo con analytics avanzados",
    image: "/projects/proyecto-dashboard-admin.png",
  },
  {
    name: "BLXK Studio Web",
    category: "Landing Page",
    description: "Sitio web corporativo de BLXK Studio",
    image: "/projects/proyecto-web-blxk-studio.png",
    url: "https://blxkstudio.com",
  },
  {
    name: "Social Data Mining Engine",
    category: "Data Intelligence",
    description: "Extracción de leads y envío automatizado vía WhatsApp API",
    image: "/projects/proyecto-social-data-mining.png",
  },
  {
    name: "LiveOps Sentinel",
    category: "Real-Time Monitoring",
    description: "Monitoreo en tiempo real con alertas instantáneas",
    image: "/projects/proyecto-liveops-sentinel.png",
  },
  {
    name: "CombiPOS Ticket System",
    category: "Point of Sale",
    description: "Sistema de venta de pasajes y gestión de rutas",
    image: "/projects/proyecto-combipos-ticketing.png",
  },
  {
    name: "SUNAT E-Billing API",
    category: "Enterprise System",
    description: "Facturación electrónica integrada con SUNAT",
    image: "/projects/proyecto-facturacion-sunat.png",
  },
]

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://blxkstudio.com/projects#collection",
  name: "Portafolio de Proyectos BLXK Studio",
  url: "https://blxkstudio.com/projects",
  hasPart: {
    "@type": "ItemList",
    itemListElement: PROJECTS_SCHEMA.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        category: project.category,
        description: project.description,
        url: project.url ?? "https://blxkstudio.com/projects",
        image: {
          "@type": "ImageObject",
          url: `https://blxkstudio.com${project.image}`,
          representativeOfPage: false,
        },
      },
    })),
  },
}

export default async function ProjectsPage() {
  const locale = ((await headers()).get("x-blxk-locale") || "es") as Locale
  const localizedProjectsPath = localizePath("/projects", locale)
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://blxkstudio.com${localizedProjectsPath}#collection`,
    name: "Portafolio de Proyectos BLXK Studio",
    url: `https://blxkstudio.com${localizedProjectsPath}`,
    hasPart: {
      "@type": "ItemList",
      itemListElement: PROJECTS_SCHEMA.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          category: project.category,
          description: project.description,
          url: project.url ?? `https://blxkstudio.com${localizedProjectsPath}`,
          image: {
            "@type": "ImageObject",
            url: `https://blxkstudio.com${project.image}`,
            representativeOfPage: false,
          },
        },
      })),
    },
  }
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectsHero />
      <ProjectDemos />
      <Suspense fallback={null}>
        <ProjectsStats />
      </Suspense>
      <ProjectsShowcase />
      <ProjectsComparison />
      <ProjectsTestimonials />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
    </main>
  )
}
