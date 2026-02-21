"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/layout/language-provider"

// Datos de proyectos con imágenes de vista previa
const PROJECTS = [
  {
    id: 1,
    title: "Black WhatsApp Payment",
    category: "Plugin WordPress",
    description: "Gateway de pagos vía WhatsApp para WooCommerce",
    tech: ["WordPress", "PHP", "WooCommerce"],
    previewUrl: "https://wazilrest.blxkstudio.com",
    image: "/projects/proyecto-pagos-whatsapp.png",
    gradient: "from-green-500/20 via-green-600/10 to-transparent",
  },
  {
    id: 2,
    title: "Sales Automation N8N",
    category: "Automatización",
    description: "Flujos automáticos: compra → WhatsApp → CRM",
    tech: ["N8N", "Node.js", "APIs"],
    previewUrl: null,
    image: "/projects/proyecto-automatizacion-n8n.png",
    gradient: "from-orange-500/20 via-orange-600/10 to-transparent",
  },
  {
    id: 3,
    title: "Order Management System",
    category: "Full Stack",
    description: "Sistema de gestión de pedidos en tiempo real",
    tech: ["Next.js", "Supabase", "TypeScript"],
    previewUrl: null,
    image: "/projects/proyecto-sistema-pedidos.png",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
  },
  {
    id: 4,
    title: "AI Chatbot WhatsApp",
    category: "Inteligencia Artificial",
    description: "Bot con IA para atención y toma de pedidos",
    tech: ["OpenAI", "N8N", "WhatsApp API"],
    previewUrl: null,
    image: "/projects/proyecto-chatbot-ia-whatsapp.png",
    gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
  },
  {
    id: 5,
    title: "Admin Dashboard",
    category: "Dashboard",
    description: "Panel administrativo con analytics avanzados",
    tech: ["React", "Recharts", "Supabase"],
    previewUrl: null,
    image: "/projects/proyecto-dashboard-admin.png",
    gradient: "from-cyan-500/20 via-cyan-600/10 to-transparent",
  },
  {
    id: 6,
    title: "BLXK Studio Web",
    category: "Landing Page",
    description: "Esta misma web que estás viendo ahora",
    tech: ["Next.js 16", "Tailwind", "Vercel"],
    previewUrl: "https://blxkstudio.com",
    image: "/projects/proyecto-web-blxk-studio.png",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    id: 7,
    title: "Social Data Mining Engine",
    category: "Data Intelligence",
    description: "Extracción de leads desde Google Maps y redes sociales con envío automatizado vía WhatsApp API",
    tech: ["Python", "Selenium", "WhatsApp API", "PostgreSQL", "Redis"],
    previewUrl: null,
    image: "/projects/proyecto-social-data-mining.png",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
  },
  {
    id: 8,
    title: "LiveOps Sentinel",
    category: "Real-Time Monitoring",
    description: "Monitoreo en tiempo real de equipos, procesos y actividad de empleados con alertas instantáneas",
    tech: ["Next.js", "WebSockets", "Node.js", "TimescaleDB", "Electron"],
    previewUrl: null,
    image: "/projects/proyecto-liveops-sentinel.png",
    gradient: "from-rose-500/20 via-red-600/10 to-transparent",
  },
  {
    id: 9,
    title: "CombiPOS Ticket System",
    category: "Point of Sale",
    description: "Sistema de venta de pasajes para transporte interprovincial con gestión de asientos y rutas",
    tech: ["React", "Node.js", "MySQL", "Express", "PDF Generation"],
    previewUrl: null,
    image: "/projects/proyecto-combipos-ticketing.png",
    gradient: "from-blue-500/20 via-cyan-600/10 to-transparent",
  },
  {
    id: 10,
    title: "SUNAT E-Billing API",
    category: "Enterprise System",
    description: "Sistema de facturación electrónica integrado con API de SUNAT para emisión de comprobantes fiscales",
    tech: ["Node.js", "SUNAT API", "PostgreSQL", "PDF", "XML/SOAP"],
    previewUrl: null,
    image: "/projects/proyecto-facturacion-sunat.png",
    gradient: "from-green-500/20 via-emerald-600/10 to-transparent",
  },
]

export function ProjectsShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { m } = useLanguage()
  const localized = m.projectsShowcase.list
  const byId = new Map(localized.map((item) => [item.id, item]))

  return (
    <section id="projects-showcase" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Preview Area - Always image to avoid iframe blank due to X-Frame-Options/CSP */}
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <Image
                    src={project.image}
                    alt={`${project.title} - proyecto de ${project.category} desarrollado por BLXK Studio`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay oscuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Overlay interactivo en hover */}
                  <div className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                    {project.previewUrl && (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <button className="p-3 rounded-full bg-secondary text-secondary-foreground hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {byId.get(project.id)?.category || project.category}
                    </p>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {byId.get(project.id)?.title || project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {byId.get(project.id)?.description || project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium bg-secondary/50 text-secondary-foreground rounded border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              {m.projectsShowcase.ctaTitle}
            </p>
            <Link href="/contacto">
              <Button size="lg" className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90">
                {m.projectsShowcase.ctaButton}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
