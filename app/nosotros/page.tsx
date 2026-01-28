"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { FounderHero } from "@/components/home/founder-hero"

const FloatingThemeToggle = dynamic(
  () => import("@/components/layout/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })),
  { ssr: false }
)

const BlxkChatbot = dynamic(
  () => import("@/components/home/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })),
  { ssr: false }
)

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />

      {/* Hero section con información del fundador */}
      <FounderHero />

      {/* Sección adicional de información */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold neon-text-sm">Nuestra Misión</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Democratizar la tecnología acercando herramientas innovadoras y accesibles a negocios,
                emprendedores y organizaciones que buscan digitalizar sus procesos y escalar con inteligencia.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3 p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur">
                <div className="text-4xl">🚀</div>
                <h3 className="text-xl font-bold text-foreground">Innovación</h3>
                <p className="text-sm text-muted-foreground">
                  Tecnología de vanguardia adaptada a las necesidades reales del mercado latinoamericano.
                </p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur">
                <div className="text-4xl">💡</div>
                <h3 className="text-xl font-bold text-foreground">Creatividad</h3>
                <p className="text-sm text-muted-foreground">
                  Soluciones únicas que combinan diseño premium con funcionalidad excepcional.
                </p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur">
                <div className="text-4xl">🤝</div>
                <h3 className="text-xl font-bold text-foreground">Compromiso</h3>
                <p className="text-sm text-muted-foreground">
                  Soporte continuo y garantía de calidad en cada proyecto que desarrollamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlxkChatbot />
    </main>
  )
}
