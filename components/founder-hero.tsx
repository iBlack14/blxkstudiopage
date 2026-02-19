"use client"

import { useLanguage } from "@/components/layout/language-provider"

import { useState, useEffect, memo, useCallback, useMemo } from "react"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"

// Memoized tech stack badges
const TechBadge = memo(function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 text-primary/80 backdrop-blur-sm hover:border-primary/70 hover:text-primary transition-colors duration-200 cursor-default">
      {tech}
    </span>
  )
})

// Static tech stack array - defined outside component to prevent recreation
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

// Memoized stats component
const StatBadge = memo(function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm text-center">
      <p className="text-lg font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
})

function FounderHeroComponent() {
  const { m } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Memoized particle generation for client
  const particles = useMemo(() => {
    if (typeof window === "undefined") return []
    return [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: i * 0.3,
    }))
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-background flex items-center py-8 md:py-12 lg:py-20">
      {/* Background effects - simplified for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static gradient background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M0 80L80 0L160 80L80 160Z' stroke='%2300d4aa' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />

        {/* Floating particles - only render on client */}
        {isLoaded && particles.map((particle: { id: number; left: number; top: number; duration: number; delay: number }) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className={`space-y-10 transition-all duration-700 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">{m.hero?.badge}</span>
            </div>

            {/* Main heading */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary/80">{m.hero?.subtitle}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">BLXK</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent block">
                  STUDIO
                </span>
              </h1>
            </div>

            {/* Main description */}
            <div className="space-y-5 text-lg md:text-xl text-muted-foreground/90 leading-loose max-w-2xl">
              <p>
                {m.hero?.descriptionMain}
              </p>
              <p>
                {m.hero?.descriptionSecondary}
              </p>
            </div>

            {/* Stack Tecnológico */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">{m.hero?.stackTitle}</p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                {m.hero?.ctaProjects}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-primary/40 text-primary rounded-lg font-semibold text-sm hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95">
                {m.hero?.ctaConsultation}
              </button>
            </div>
          </div>

          {/* Image side */}
          <div className={`relative flex justify-center transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
            <div className="relative w-full max-w-sm">
              {/* Animated glow background */}
              <div className="absolute -inset-2 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-50" />

              {/* Main image container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl group">
                <Image
                  src="/LOGO-PERFIL.png"
                  alt="BLXK Studio - Agencia Tecnológica"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  quality={85}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Info badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                  <h3 className="text-lg font-bold text-foreground">BLXK STUDIO</h3>
                  <p className="text-xs text-primary font-semibold">{m.hero?.agencyLabel}</p>
                </div>
              </div>

              {/* Stats badges below image */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <StatBadge value="50+" label={m.hero?.statClients || "Clientes Satisfechos"} />
                <StatBadge value="5+" label={m.hero?.statYears || "Años de Experiencia"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BLXK Studio",
            description: "Agencia tecnológica especializada en desarrollo web empresarial, automatización inteligente y soluciones digitales escalables",
            url: "https://blxkstudio.com",
            knowsAbout: ["Software Development", "Web Development", "Automation", "AI", "API Design", "N8N", "Backend"],
            areaServed: ["PE", "MX", "CO", "CL", "AR"],
            serviceType: ["Web Development", "Software Development", "Digital Automation", "Tech Consulting"],
          }),
        }}
      />
    </section>
  )
}

export const FounderHero = memo(FounderHeroComponent)
