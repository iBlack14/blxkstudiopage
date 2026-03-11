"use client"

import { Shield, Mail, MessageCircle, Phone, CheckCircle } from "lucide-react"

const INCLUDED = [
    "Informe ejecutivo completo en PDF",
    "Clasificación por severidad (CVSS)",
    "Reunión de presentación de resultados",
    "Soporte post-auditoría 30 días",
    "Re-test gratuito de hallazgos corregidos",
    "Certificado de seguridad digital",
] as const

export function SecurityCta() {
    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 md:py-32">
            {/* Animated Deep Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.15)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.2)_0%,transparent_60%)]" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse rounded-full bg-primary/20 blur-[80px]"
                        style={{
                            width: `${300 + i * 100}px`,
                            height: `${300 + i * 100}px`,
                            top: `${10 + (i * 20)}%`,
                            left: `${-10 + (i * 25)}%`,
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${8 + i * 2}s`,
                            animationDirection: i % 2 === 0 ? "alternate" : "alternate-reverse"
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md shadow-[0_0_15px_rgba(0,112,243,0.2)]">
                            <Shield className="h-3.5 w-3.5" />
                            EMPIEZA HOY
                        </div>

                        <h2 className="text-3xl font-black leading-[1.1] text-slate-800 dark:text-white md:text-5xl lg:text-6xl">
                            ¿Tu empresa está <br /> <span className="bg-gradient-to-r from-primary to-blue-500 dark:to-sky-300 bg-clip-text text-transparent [text-shadow:0_0_20px_rgba(0,112,243,0.15)] dark:[text-shadow:0_0_20px_rgba(0,112,243,0.3)]">protegida</span>?
                        </h2>

                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
                            Solicita tu auditoría inicial <strong className="text-slate-900 dark:text-white">sin costo</strong>. Te entregamos un diagnóstico preliminar con riesgos prioritarios y plan de acción.
                        </p>

                        <div className="space-y-4 rounded-2xl border border-primary/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 backdrop-blur-md shadow-sm">
                            <p className="text-[11px] font-bold tracking-widest text-primary drop-shadow-[0_0_5px_rgba(0,112,243,0.3)] dark:drop-shadow-[0_0_10px_rgba(0,112,243,0.5)]">INCLUIDO EN CADA AUDITORÍA</p>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {INCLUDED.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-primary/10 dark:bg-primary/20 p-0.5">
                                            <CheckCircle className="h-3 w-3 shrink-0 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative group overflow-hidden">
                        {/* Glow effect matching button hover */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-blue-500/30 blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-70 motion-reduce:hidden" />

                        <div className="relative space-y-6 rounded-3xl border border-white/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-8 shadow-[0_20px_40px_-15px_rgba(0,112,243,0.1)] dark:shadow-2xl backdrop-blur-2xl md:p-10">
                            <div className="flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] border border-primary/20 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-[inset_0_0_20px_rgba(0,112,243,0.05)] dark:shadow-[inset_0_0_20px_rgba(0,112,243,0.1)]">
                                    <Shield className="h-10 w-10 text-primary" />
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">Auditoría Gratuita</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Respuesta en menos de 24 horas</p>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/51913259652?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20ciberseguridad%20gratuita"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-[0_0_15px_rgba(0,112,243,0.2)] dark:shadow-[0_0_15px_rgba(0,112,243,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,112,243,0.3)] dark:hover:shadow-[0_0_25px_rgba(0,112,243,0.5)] active:scale-95"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    Solicitar por WhatsApp
                                </a>

                                <a
                                    href="mailto:admin@blxkstudio.com?subject=Auditor%C3%ADa%20de%20Ciberseguridad"
                                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-4 text-sm font-bold text-slate-700 dark:text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95"
                                >
                                    <Mail className="h-5 w-5" />
                                    Enviar por Email
                                </a>
                            </div>

                            <div className="flex items-center gap-3 pt-4 opacity-50 dark:opacity-50">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/20" />
                                <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-300 uppercase">O escríbenos directamente</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/20" />
                            </div>

                            <a
                                href="tel:+51913259652"
                                className="inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-slate-800 dark:hover:text-white"
                            >
                                <Phone className="h-4 w-4" />
                                +51 913 259 652
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
