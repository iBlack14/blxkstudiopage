import { Navigation } from "@/components/layout/navigation"
import { FloatingThemeToggle } from "@/components/layout/theme-toggle"
import { ArrowUpRight, Rocket, ShieldCheck, Sparkles, Target, Users } from "lucide-react"

const PRINCIPLES = [
  {
    title: "Estrategia primero",
    description: "Cada entrega responde a un objetivo de negocio medible, no a tendencias pasajeras.",
    icon: Target,
  },
  {
    title: "Ejecucion de alto ritmo",
    description: "Sprints cortos, decisiones claras y lanzamientos frecuentes con control tecnico.",
    icon: Rocket,
  },
  {
    title: "Calidad sin compromisos",
    description: "Arquitectura estable, seguridad y performance como parte del proceso.",
    icon: ShieldCheck,
  },
] as const

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />

      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_72%_18%,rgba(0,212,170,0.18),transparent_45%)]" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">Nosotros</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                Diseno y tecnologia
                <span className="block text-primary">con direccion de negocio</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                BLXK Studio es un equipo senior que construye productos digitales, automatizaciones e IA aplicada para empresas que operan con metas claras.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="rounded-xl border border-primary/25 bg-card/50 px-4 py-3 min-w-[130px]">
                  <p className="text-2xl font-black text-primary leading-none">50+</p>
                  <p className="text-xs text-muted-foreground mt-1">Clientes activos</p>
                </div>
                <div className="rounded-xl border border-primary/25 bg-card/50 px-4 py-3 min-w-[130px]">
                  <p className="text-2xl font-black text-primary leading-none">5+</p>
                  <p className="text-xs text-muted-foreground mt-1">Anos de experiencia</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-primary/40 overflow-hidden bg-card/40 backdrop-blur-xl shadow-[0_0_45px_rgba(0,212,170,0.20)]">
                <video
                  src="/nosotros.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full aspect-[16/10] object-cover"
                  aria-label="Video institucional BLXK Studio"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-lg md:text-xl font-black text-foreground">BLXK Studio</p>
                  <p className="text-sm text-primary">Producto digital, automatizacion y sistemas de alto rendimiento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-4 rounded-2xl border border-primary/20 bg-card/40 p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Posicion</p>
              <h2 className="text-2xl md:text-3xl font-black leading-tight">Boutique tecnológica para crecimiento serio</h2>
              <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">
                Combinamos creatividad, arquitectura y automatizacion para transformar operaciones y acelerar resultados.
              </p>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-4">
              {PRINCIPLES.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="rounded-2xl border border-primary/20 bg-card/35 p-6 space-y-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/12 via-primary/5 to-transparent px-6 py-7 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Declaracion</p>
              <h3 className="text-2xl md:text-3xl font-black">Tecnologia con criterio ejecutivo</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl">
                Convertimos complejidad tecnica en sistemas claros, rentables y listos para escalar.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors">
              Ver servicios
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>`r`n    </main>
  )
}

