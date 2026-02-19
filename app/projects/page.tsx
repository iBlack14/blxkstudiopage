import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { ProjectsShowcase } from "@/components/projects/projects-showcase"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsComparison } from "@/components/projects/projects-comparison"
import { ProjectsTestimonials } from "@/components/projects/projects-testimonials"
import { ProjectDemos } from "@/components/home/project-demos"

const ProjectsStats = dynamic(() => import("@/components/projects/projects-stats").then(m => ({ default: m.ProjectsStats })), {
  loading: () => null,
  ssr: true,
})
const Contact = dynamic(() => import("@/components/utilities/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
  ssr: true,
})
const BlxkChatbot = dynamic(() => import("@/components/home/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })), {
  loading: () => null,
})

export const metadata: Metadata = {
  title: "Portafolio | BLXK Studio",
  description:
    "Conoce proyectos reales de desarrollo web, automatización e IA creados por BLXK Studio.",
  keywords:
    "portafolio desarrollo web, proyectos fullstack, whatsapp payment, n8n automation, next.js, react, supabase, dashboard administrativo, chatbot whatsapp",
  authors: [{ name: "BLXK Studio" }],
  creator: "BLXK Studio",
  publisher: "BLXK Studio",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://blxkstudio.com/projects",
    title: "Portafolio | BLXK Studio",
    description:
      "Proyectos de software, automatización e inteligencia artificial para empresas.",
    siteName: "BLXK Studio",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio | BLXK Studio",
    description: "Proyectos reales de desarrollo web y automatización.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "https://blxkstudio.com/projects",
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

export default function ProjectsPage() {
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
      <Suspense fallback={null}>
        <BlxkChatbot />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
    </main>
  )
}
