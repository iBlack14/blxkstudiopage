"use client"

import { Lock, AlertTriangle, Code, Zap, Network, Database, Mail } from "lucide-react"

const THREATS = [
    {
        icon: Mail,
        name: "Phishing & Spear Phishing",
        risk: "CRÍTICO",
        description: "Ataques dirigidos por email o mensajes para robar credenciales o instalar malware.",
        mitigation: "Filtros DMARC/DKIM, simulacros de phishing y capacitación continua.",
    },
    {
        icon: Lock,
        name: "Ransomware",
        risk: "CRÍTICO",
        description: "Cifrado malicioso de datos empresariales que puede paralizar operaciones completas.",
        mitigation: "Backups offsite, segmentación de red, EDR/XDR y regla 3-2-1.",
    },
    {
        icon: Database,
        name: "SQL Injection",
        risk: "ALTO",
        description: "Inyección de comandos SQL para extraer, modificar o eliminar bases de datos.",
        mitigation: "Prepared statements, WAF y validación estricta de entradas.",
    },
    {
        icon: Code,
        name: "Cross-Site Scripting (XSS)",
        risk: "ALTO",
        description: "Inyección de scripts para robar sesiones, cookies o redirigir tráfico malicioso.",
        mitigation: "CSP headers, sanitización de outputs y cookies HttpOnly.",
    },
    {
        icon: Zap,
        name: "Ataques DDoS",
        risk: "MEDIO",
        description: "Saturación de servidores con tráfico masivo para tumbar servicios digitales.",
        mitigation: "CDN con mitigación DDoS, rate limiting y balanceo de carga.",
    },
    {
        icon: Network,
        name: "Man-in-the-Middle (MITM)",
        risk: "ALTO",
        description: "Interceptación de comunicaciones entre usuario y servidor para extraer datos.",
        mitigation: "TLS/HTTPS forzado, HSTS, certificados válidos y VPN.",
    },
] as const

const riskClass: Record<string, string> = {
    CRÍTICO: "border-red-500/30 bg-red-500/10 text-red-500",
    ALTO: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    MEDIO: "border-sky-500/30 bg-sky-500/10 text-sky-500",
}

export function SecurityThreats() {
    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 py-16 md:py-32">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.02] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4">
                <div className="mb-14 space-y-4 text-center md:mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-xs font-semibold text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] dark:shadow-[0_0_15px_rgba(239,68,68,0.25)] backdrop-blur-md">
                        <AlertTriangle className="h-3.5 w-3.5 animate-pulse" />
                        AMENAZAS QUE NEUTRALIZAMOS
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 md:text-5xl">
                        Conoce al <span className="text-red-500">enemigo</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-700 dark:text-slate-400 md:text-base">
                        Te mostramos ataques frecuentes y cómo los bloqueamos con controles técnicos y operativos.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-3">
                    {THREATS.map((threat) => {
                        const Icon = threat.icon

                        // Map specific dynamic glow colors based on risk severity
                        const glowClasses: Record<string, string> = {
                            CRÍTICO: "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] dark:hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] border-red-500/10 hover:border-red-500/30",
                            ALTO: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] border-amber-500/10 hover:border-amber-500/30",
                            MEDIO: "hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] border-sky-500/10 hover:border-sky-500/30",
                        }

                        return (
                            <article key={threat.name} className={`group rounded-2xl border bg-white/80 dark:bg-slate-900/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${glowClasses[threat.risk]}`}>
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                                    </div>
                                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black tracking-widest ${riskClass[threat.risk]}`}>
                                        {threat.risk}
                                    </span>
                                </div>

                                <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">{threat.name}</h3>
                                <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">{threat.description}</p>

                                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:bg-primary/10">
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <p className="text-[11px] font-bold tracking-wider text-primary">NUESTRA DEFENSA</p>
                                    </div>
                                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{threat.mitigation}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
