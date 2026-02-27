"use client"

import { useLanguage } from "@/components/layout/language-provider"

import { useState, memo, useCallback, useRef } from "react"
import {
  AppWindow,
  Box,
  Building2,
  ChevronDown,
  Clapperboard,
  Code2,
  Cog,
  GraduationCap,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Workflow,
  Wrench,
} from "lucide-react"

const iconByServiceId: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Code2,
  2: Building2,
  3: ShoppingCart,
  4: GraduationCap,
  5: Workflow,
  6: UtensilsCrossed,
  7: Truck,
  8: Box,
  9: Wrench,
  10: AppWindow,
  11: Cog,
  12: Clapperboard,
}

// Memoized service card component
const ServiceCard = memo(function ServiceCard({
  service,
  isExpanded,
  onToggle,
  labels,
  cta
}: {
  service: any
  isExpanded: boolean
  onToggle: () => void
  labels: { features: string; benefits: string }
  cta: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card neon-card-rotating rounded-xl border border-primary/20 bg-card/80 backdrop-blur-sm transition-all duration-300 ${
        isExpanded ? "ring-2 ring-primary/70 shadow-[0_0_0_1px_rgba(14,165,233,0.15),0_14px_40px_rgba(2,132,199,0.18)]" : "hover:border-primary/40"
      }`}
    >
      <div
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        role="button"
        tabIndex={0}
        className="text-left w-full p-5 md:p-6 space-y-4 cursor-pointer h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary shadow-sm">
                {(() => {
                  const Icon = iconByServiceId[service.id] || Building2
                  return <Icon className="h-5 w-5" />
                })()}
              </div>
              <span className="text-[11px] font-semibold tracking-wide uppercase text-primary/90 bg-primary/10 border border-primary/20 rounded-full px-2 py-1">
                Solucion Premium
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">{service.title}</h3>
            <p className="text-xs text-primary font-medium mt-1 line-clamp-2">{service.subtitle}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-muted-foreground bg-muted/50 rounded-full px-2 py-1">
                {service.features.length} funcionalidades
              </span>
              <span className="text-[11px] text-muted-foreground bg-muted/50 rounded-full px-2 py-1">
                {service.benefits.length} beneficios
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="pt-4 space-y-5 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary">{labels.features}</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary">{labels.benefits}</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {service.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
                    <span className="text-primary leading-none mt-0.5">•</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/51953576234?text=Hola%20BLXK%20Studio,%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full mt-1 px-4 py-2.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg text-center hover:bg-primary/20 transition-colors"
            >
              {cta}
            </a>
          </div>
        )}
      </div>
    </div>
  )
})

function ServicesDetailedComponent() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const { m } = useLanguage()
  const servicesList = m.servicesDetailed?.list || []

  const toggleExpand = useCallback((id: number) => {
    setExpandedId((prev: number | null) => prev === id ? null : id)
  }, [])

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">{m.servicesDetailed?.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {m.servicesDetailed?.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesList.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={() => toggleExpand(service.id)}
                labels={{
                  features: m.servicesDetailed?.featuresLabel || "Features:",
                  benefits: m.servicesDetailed?.benefitsLabel || "Benefits:"
                }}
                cta={m.servicesDetailed?.cta || "More info"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const ServicesDetailed = memo(ServicesDetailedComponent)
