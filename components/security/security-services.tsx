"use client"

import { ShieldCheck, Search, Activity, Server, FileText, Siren, ArrowRight } from "lucide-react"

const SERVICES = [
    {
        icon: Search,
        title: "Pentesting & Ethical Hacking",
        subtitle: "Ataque Controlado",
        description:
            "Simulamos ataques reales a tu aplicación web, API o red. Identificamos vulnerabilidades críticas antes que los hackers maliciosos.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
    },
    {
        icon: ShieldCheck,
        title: "Auditoría de Seguridad Web",
        subtitle: "Análisis Exhaustivo",
        description:
            "Revisión profunda de tu código, configuraciones, dependencias y permisos. Entregamos reporte detallado con severidad y remedios.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
    },
    {
        icon: Activity,
        title: "Monitoreo SOC 24/7",
        subtitle: "Detección en Tiempo Real",
        description:
            "Centro de operaciones de seguridad que detecta anomalías, intrusiones y comportamientos sospechosos en tu infraestructura.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
    },
    {
        icon: Server,
        title: "Hardening de Servidores",
        subtitle: "Blindaje de Infraestructura",
        description:
            "Configuramos y endurecemos tus servidores Linux/Windows, firewalls y servicios cloud según mejores prácticas.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
    },
    {
        icon: FileText,
        title: "Consultoría & Cumplimiento",
        subtitle: "Normativa Internacional",
        description:
            "Te ayudamos a cumplir con GDPR, ISO 27001, PCI-DSS y normativas locales con políticas y formación al equipo.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
    },
    {
        icon: Siren,
        title: "Respuesta a Incidentes",
        subtitle: "Contención y Recuperación",
        description:
            "Equipo de respuesta inmediata ante brechas, ransomware o accesos no autorizados con análisis forense y restauración.",
        tags: ["DFIR", "Forensics", "Recovery"],
    },
] as const

export function SecurityServices() {
    return (
        <section id="servicios-seguridad" className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-16 md:py-24">
            {/* Extended Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,112,243,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,112,243,0.08)_0%,transparent_40%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.08)_0%,transparent_40%)] -z-10" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] dark:[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] -z-10" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4">
                <div className="mb-14 space-y-4 text-center md:mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        NUESTROS SERVICIOS
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 md:text-5xl">
                        Seguridad de <span className="bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400 bg-clip-text text-transparent">extremo a extremo</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-700 dark:text-slate-400 md:text-base">
                        Desde el análisis inicial hasta la monitorización continua, cubrimos cada vector de ataque de tu ecosistema digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-3 focus-within:relative">
                    {SERVICES.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <article
                                key={service.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/90 dark:bg-slate-900/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,112,243,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,112,243,0.3)] hover:border-primary/30"
                            >
                                {/* Futuristic subtle hover flare */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>

                                <div className="relative z-10">
                                    <p className="mb-2 text-xs font-bold tracking-wider text-primary">{service.subtitle}</p>
                                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">{service.title}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">{service.description}</p>
                                </div>

                                <div className="relative z-10 mb-6 flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                                    Solicitar servicio <ArrowRight className="h-4 w-4" />
                                </div>

                                {/* Decorative numbering */}
                                <div className="absolute -right-2 top-4 select-none text-8xl font-black text-slate-900/5 dark:text-white/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                                    0{index + 1}
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
