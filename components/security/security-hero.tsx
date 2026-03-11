"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Shield, Lock, Eye, AlertTriangle, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"

const STATS = [
    { value: "99.9%", label: "Uptime Protegido", icon: Shield },
    { value: "500+", label: "Amenazas Bloqueadas", icon: Lock },
    { value: "24/7", label: "Monitoreo Activo", icon: Eye },
    { value: "0", label: "Brechas sin Respuesta", icon: AlertTriangle },
] as const

export function SecurityHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useTheme()
    const isDarkTheme = resolvedTheme === "dark"

    useEffect(() => {
        if (!isDarkTheme) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        if (media.matches) return

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const cols = Math.floor(canvas.width / 18)
        const drops: number[] = Array(cols).fill(1)
        const chars = "01アイウエオカキクケコサシスセソ><[]{}|/\\".split("")

        let frameId = 0
        const draw = () => {
            ctx.fillStyle = "rgba(10, 15, 26, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "oklch(0.74 0.15 170 / 0.7)"
            ctx.font = "14px monospace"

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillText(char, i * 18, drops[i] * 18)
                if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i]++
            }
            frameId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("resize", resize)
        }
    }, [isDarkTheme])

    return (
        <section className="relative min-h-screen overflow-hidden bg-white/95 dark:bg-slate-950">
            {/* Dynamic Backgrounds */}
            {!isDarkTheme ? (
                <>
                    <div className="absolute top-0 -left-1/4 w-[150%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(0,112,243,0.1)_0%,transparent_60%)] -z-10" />
                    <div className="absolute -top-1/4 -right-1/4 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_50%)] blur-[100px] -z-10" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
                    <div className="pointer-events-none absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                </>
            ) : null}
            {isDarkTheme ? (
                <canvas
                    ref={canvasRef}
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
                    aria-hidden
                />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.67_0.11_205/0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,oklch(0.74_0.13_190/0.22),transparent_45%)]" />
            {isDarkTheme ? (
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.75_0.15_160/0.12)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.75_0.15_160/0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
            ) : null}

            {/* Dark background glow specifically for Light Mode shield contrast */}
            <div className="pointer-events-none absolute right-[-5%] top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-slate-900/80 blur-[80px] md:block dark:hidden" />

            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-full w-[45%] -translate-y-1/2 opacity-100 md:flex items-center justify-end">
                <img src="/brand-shield.png" alt="Escudo de ciberseguridad corporativo" className="relative z-10 h-[90%] w-auto max-w-full object-contain drop-shadow-[0_0_40px_rgba(0,112,243,0.4)] dark:drop-shadow-[0_0_30px_rgba(0,112,243,0.3)]" />
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 pb-16 pt-20">
                <div className="max-w-3xl space-y-6 md:space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-md shadow-[0_0_15px_rgba(0,112,243,0.1)] dark:shadow-[0_0_15px_rgba(0,112,243,0.2)]">
                        <Shield className="h-3.5 w-3.5" />
                        Ciberseguridad Empresarial
                    </div>

                    <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
                        Protege tu
                        <br />
                        <span className="text-primary dark:bg-gradient-to-r dark:from-primary dark:to-sky-400 dark:bg-clip-text dark:text-transparent dark:[text-shadow:0_0_30px_rgba(0,112,243,0.5)]">
                            negocio digital
                        </span>
                        <br />
                        antes del ataque
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-slate-700 dark:text-white/90 md:text-lg">
                        Auditamos, protegemos y monitoreamos tu infraestructura digital con técnicas avanzadas de
                        ciberseguridad. Porque el mejor escudo es actuar{" "}
                        <span className="font-bold text-primary dark:text-blue-400">antes de ser vulnerado</span>.
                    </p>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <a
                            href="#servicios-seguridad"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_5px_15px_-3px_rgba(0,112,243,0.3)] dark:shadow-[0_5px_15px_-3px_rgba(0,112,243,0.4)] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_20px_-3px_rgba(0,112,243,0.4)] active:scale-95"
                        >
                            <Shield className="h-4 w-4" />
                            Ver Servicios
                        </a>
                        <a
                            href="https://wa.me/51913259652?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20seguridad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-primary/55 bg-white/80 dark:bg-card px-7 py-3.5 text-base font-bold text-slate-800 dark:text-primary backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-50 dark:hover:bg-primary/5 active:scale-95"
                        >
                            <Lock className="h-4 w-4" />
                            Auditoría Gratuita
                        </a>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4">
                    {STATS.map(({ value, label, icon: Icon }) => (
                        <div
                            key={label}
                            className="group relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 p-5 text-center shadow-lg dark:shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/60 dark:hover:bg-slate-900/60"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative z-10 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="relative z-10 text-3xl font-black tracking-tight text-slate-800 dark:text-white md:text-4xl">{value}</div>
                            <div className="relative z-10 mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</div>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 group-hover:w-full" />
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center motion-safe:animate-bounce motion-reduce:hidden">
                    <ChevronDown className="h-8 w-8 text-primary/50 transition-colors hover:text-primary" />
                </div>
            </div>
        </section>
    )
}
