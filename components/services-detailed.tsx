"use client"

import { useLanguage } from "@/components/layout/language-provider"

import { useState, memo, useCallback, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { getIconBySlugs } from "@/lib/service-icons"

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
      className={`spotlight-card neon-card-rotating rounded-lg transition-all duration-300 ${isExpanded ? "ring-2 ring-primary" : ""
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
        className="text-left w-full p-6 space-y-3 cursor-pointer h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-3 flex items-center">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                {(() => {
                  const IconComponent = getIconBySlugs(service.slug)
                  return <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                })()}
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
            <p className="text-xs text-primary font-medium mt-1">{service.subtitle}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""
              }`}
          />
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">{service.description}</p>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="pt-4 space-y-4 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-primary">{labels.features}</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none mt-0.5">•</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-primary">{labels.benefits}</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {service.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none mt-0.5">→</span>
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
              className="block w-full mt-3 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg text-center hover:bg-primary/20 transition-colors"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
