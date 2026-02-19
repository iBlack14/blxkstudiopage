"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, Zap } from "lucide-react"

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "n8n",
  "OpenAI",
  "Supabase",
  "PostgreSQL",
  "API REST",
] as const

function TechBadge({ tech }: { tech: string }) {
  return (
    <div className="group relative px-4 py-2 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 cursor-default overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative text-xs md:text-sm font-semibold text-primary/90 group-hover:text-primary tracking-wide">
        {tech}
      </span>
    </div>
  )
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm text-center">
      <p className="text-lg font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function FounderHero() {
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoadVideo(true), 300)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-background flex items-center pt-8 pb-24 md:py-12 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M0 80L80 0L160 80L80 160Z' stroke='%2300d4aa' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Soluciones Tecnológicas Empresariales</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary/80">TRANSFORMACIÓN DIGITAL</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">BLXK</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent block">
                  STUDIO
                </span>
              </h1>
            </div>

            <div className="space-y-3 text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-xl">
              <p>
                Creamos <span className="text-primary font-semibold">software web, automatizaciones e IA</span> para empresas que buscan velocidad, control y crecimiento.
              </p>
              <p>Ejecución técnica sólida, enfoque en resultados.</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Stack Tecnológico</p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Explorar Proyectos
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-primary/40 text-primary rounded-lg font-semibold text-sm hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95">
                Solicitar Consulta
              </button>
            </div>
          </div>

          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
              <div className="absolute -inset-3 bg-gradient-to-b from-primary/35 via-primary/15 to-transparent rounded-3xl blur-2xl opacity-60" />

              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-primary/40 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-xl shadow-[0_0_35px_rgba(0,212,170,0.25)] group">
                <Image
                  src="/logo-blanco.webp"
                  alt="Logo BLXK Studio sobre fondo oscuro"
                  fill
                  priority
                  sizes="(max-width: 768px) 92vw, 48vw"
                  className="object-contain p-10"
                />

                {loadVideo && (
                  <video
                    src="/pagina-web-inicio.mp4"
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="metadata"
                    poster="/logo-blanco.webp"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 md:group-hover:scale-[1.03]"
                    aria-label="Presentacion BLXK Studio"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent opacity-35 group-hover:opacity-20 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                  <h3 className="text-lg font-bold text-foreground">BLXK STUDIO</h3>
                  <p className="text-xs text-primary font-semibold">Agencia Tecnológica</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <StatBadge value="50+" label="Clientes Satisfechos" />
                <StatBadge value="5+" label="Años de Experiencia" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
