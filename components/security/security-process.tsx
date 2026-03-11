"use client"

import { Search, FlaskConical, Target, FileSearch, Wrench, CheckCircle } from "lucide-react"

const STEPS = [
    {
        step: "01",
        icon: Search,
        title: "Reconocimiento",
        subtitle: "Information Gathering",
        description: "Recopilamos activos expuestos: subdominios, tecnologías, puertos abiertos y huella pública.",
        tools: ["Shodan", "OSINT", "nmap"],
    },
    {
        step: "02",
        icon: FlaskConical,
        title: "Análisis de Superficie",
        subtitle: "Vulnerability Assessment",
        description: "Catalogamos vulnerabilidades por severidad y probabilidad de explotación real.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
    },
    {
        step: "03",
        icon: Target,
        title: "Explotación Ética",
        subtitle: "Penetration Testing",
        description: "Explotamos de forma controlada para medir impacto real con autorización explícita.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
    },
    {
        step: "04",
        icon: FileSearch,
        title: "Reporte Ejecutivo",
        subtitle: "Detailed Report",
        description: "Documentamos evidencia, impacto de negocio, CVSS y pasos exactos de remediación.",
        tools: ["CVSS", "OWASP", "CWE"],
    },
    {
        step: "05",
        icon: Wrench,
        title: "Remediación Asistida",
        subtitle: "Fix & Patch",
        description: "Acompañamos correcciones, validamos fixes y reforzamos configuraciones críticas.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
    },
    {
        step: "06",
        icon: CheckCircle,
        title: "Re-Test & Certificación",
        subtitle: "Verification",
        description: "Re-ejecutamos pruebas y emitimos constancia técnica de estado de seguridad.",
        tools: ["Re-scan", "Validation", "Certificate"],
    },
] as const

export function SecurityProcess() {
    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-16 md:py-32">
            {/* Extended Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,112,243,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.03)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(0,112,243,0.08)_0%,transparent_40%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08)_0%,transparent_40%)] -z-10" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,#000_10%,transparent_100%)] dark:[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] -z-10" />

            <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[600px] rounded-full bg-primary/20 opacity-30 blur-[120px] dark:bg-primary/20 dark:opacity-40" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4">
                <div className="mb-14 space-y-4 text-center md:mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
                        <Target className="h-3.5 w-3.5" />
                        METODOLOGÍA
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 md:text-5xl">
                        Nuestro proceso <span className="bg-gradient-to-r from-primary to-blue-600 dark:to-sky-400 bg-clip-text text-transparent">probado</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-700 dark:text-slate-400 md:text-base">
                        Metodología estructurada basada en OWASP, PTES y NIST para resultados reproducibles y medibles.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 lg:grid-cols-3">
                    {STEPS.map((step) => {
                        const Icon = step.icon
                        return (
                            <article
                                key={step.step}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-900/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,112,243,0.15)] hover:border-primary/30"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative z-10 mb-6 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-4xl font-black leading-none text-slate-200 dark:text-slate-800 transition-colors duration-300 group-hover:text-primary/20">
                                        {step.step}
                                    </span>
                                </div>

                                <div className="relative z-10">
                                    <p className="mb-1.5 text-[11px] font-bold tracking-widest text-primary">{step.subtitle.toUpperCase()}</p>
                                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">{step.description}</p>
                                </div>

                                <div className="relative z-10 flex flex-wrap gap-2">
                                    {step.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
