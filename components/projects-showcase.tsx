"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de proyectos con imágenes de vista previa
const PROJECTS = [
    {
        id: 1,
        title: "Black WhatsApp Payment",
        category: "Plugin WordPress",
        description: "Gateway de pagos vía WhatsApp para WooCommerce",
        tech: ["WordPress", "PHP", "WooCommerce"],
        previewUrl: "https://wazilrest.blxkstudio.com",
        image: "/projects/whatsapp-payment.png",
        gradient: "from-green-500/20 via-green-600/10 to-transparent",
    },
    {
        id: 2,
        title: "Sales Automation N8N",
        category: "Automatización",
        description: "Flujos automáticos: compra → WhatsApp → CRM",
        tech: ["N8N", "Node.js", "APIs"],
        previewUrl: null,
        image: "/projects/n8n-automation.png",
        gradient: "from-orange-500/20 via-orange-600/10 to-transparent",
    },
    {
        id: 3,
        title: "Order Management System",
        category: "Full Stack",
        description: "Sistema de gestión de pedidos en tiempo real",
        tech: ["Next.js", "Supabase", "TypeScript"],
        previewUrl: null,
        image: "/projects/order-system.png",
        gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    },
    {
        id: 4,
        title: "AI Chatbot WhatsApp",
        category: "Inteligencia Artificial",
        description: "Bot con IA para atención y toma de pedidos",
        tech: ["OpenAI", "N8N", "WhatsApp API"],
        previewUrl: null,
        image: "/projects/ai-chatbot.png",
        gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
    },
    {
        id: 5,
        title: "Admin Dashboard",
        category: "Dashboard",
        description: "Panel administrativo con analytics avanzados",
        tech: ["React", "Recharts", "Supabase"],
        previewUrl: null,
        image: "/projects/admin-dashboard.png",
        gradient: "from-cyan-500/20 via-cyan-600/10 to-transparent",
    },
    {
        id: 6,
        title: "BLXK Studio Web",
        category: "Landing Page",
        description: "Esta misma web que estás viendo ahora",
        tech: ["Next.js 16", "Tailwind", "Vercel"],
        previewUrl: "https://blxkstudio.com",
        image: "/projects/blxk-studio.png",
        gradient: "from-primary/20 via-primary/10 to-transparent",
    },
    {
        id: 7,
        title: "Social Data Mining Engine",
        category: "Data Intelligence",
        description: "Extracción de leads desde Google Maps y redes sociales con envío automatizado vía WhatsApp API",
        tech: ["Python", "Selenium", "WhatsApp API", "PostgreSQL", "Redis"],
        previewUrl: null,
        image: "/projects/social-data-mining.png",
        gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    },
    {
        id: 8,
        title: "LiveOps Sentinel",
        category: "Real-Time Monitoring",
        description: "Monitoreo en tiempo real de equipos, procesos y actividad de empleados con alertas instantáneas",
        tech: ["Next.js", "WebSockets", "Node.js", "TimescaleDB", "Electron"],
        previewUrl: null,
        image: "/projects/liveops-sentinel.png",
        gradient: "from-rose-500/20 via-red-600/10 to-transparent",
    },
    {
        id: 9,
        title: "CombiPOS Ticket System",
        category: "Point of Sale",
        description: "Sistema de venta de pasajes para transporte interprovincial con gestión de asientos y rutas",
        tech: ["React", "Node.js", "MySQL", "Express", "PDF Generation"],
        previewUrl: null,
        image: "/projects/combi-pos.png",
        gradient: "from-blue-500/20 via-cyan-600/10 to-transparent",
    },
    {
        id: 10,
        title: "SUNAT E-Billing API",
        category: "Enterprise System",
        description: "Sistema de facturación electrónica integrado con API de SUNAT para emisión de comprobantes fiscales",
        tech: ["Node.js", "SUNAT API", "PostgreSQL", "PDF", "XML/SOAP"],
        previewUrl: null,
        image: "/projects/sunat-billing.png",
        gradient: "from-green-500/20 via-emerald-600/10 to-transparent",
    },
]

export function ProjectsShowcase() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <section id="projects-showcase" className="py-24 relative overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                >
                    <source src="/fondo-proyectos.mp4" type="video/mp4" />
                </video>
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-background/90 md:bg-background/80 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                            Portafolio
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
                            Proyectos reales que demuestran resultados tangibles
                        </p>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-glow" />
                    </div>

                    {/* Grid de Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Preview Area */}
                                <div className={`relative h-56 overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

                                    {project.previewUrl ? (
                                        <div className="w-full h-full relative">
                                            <iframe
                                                src={project.previewUrl}
                                                title={project.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                sandbox="allow-scripts allow-same-origin"
                                            />
                                            {/* Prevent interaction with iframe unless intended */}
                                            <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto" />
                                        </div>
                                    ) : (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Action Buttons Overlay */}
                                    <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${hoveredId === project.id ? 'opacity-100 backdrop-blur-sm bg-black/40' : 'opacity-0'}`}>
                                        {project.previewUrl && (
                                            <a
                                                href={project.previewUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform shadow-lg hover:shadow-primary/50"
                                                title="Ver sitio en vivo"
                                            >
                                                <ExternalLink className="w-6 h-6" />
                                            </a>
                                        )}
                                        <button className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-lg">
                                            <Play className="w-6 h-6 ml-1" />
                                        </button>
                                    </div>
                                </div>

                                {/* Info Content */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider px-2 py-1 rounded bg-primary/10 border border-primary/20">
                                                {project.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 mt-4">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-[11px] font-medium bg-white/5 text-gray-300 rounded-full border border-white/10 group-hover:border-primary/30 group-hover:text-white transition-colors"
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
                    <div className="mt-20 text-center relative z-10">
                        <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent">
                            <div className="bg-background/80 backdrop-blur-md rounded-full p-8 md:p-12 border border-white/5 shadow-2xl">
                                <p className="text-xl md:text-2xl text-white mb-8 font-light">
                                    ¿Tienes un proyecto ambicioso en mente?
                                </p>
                                <Link href="/contacto">
                                    <Button size="lg" className="text-lg px-8 py-6 rounded-full neon-glow bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
                                        Solicitar Cotización Premium
                                        <ExternalLink className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
