"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/services-data"
import { Navigation } from "@/components/layout/navigation"
import { ServicesProposal } from "@/components/home/services-proposal"
import { useLanguage } from "@/components/layout/language-provider"

const FloatingThemeToggle = dynamic(
  () => import("@/components/layout/theme-toggle").then((m) => ({ default: m.FloatingThemeToggle })),
  { loading: () => null }
)
const Contact = dynamic(() => import("@/components/contact").then((m) => ({ default: m.Contact })), {
  loading: () => null,
})

export default function ServicesPage() {
  const { m } = useLanguage()
  const translatedServices = m.servicesDetailed.list

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <FloatingThemeToggle />

      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold neon-text-sm">
              {m.servicesDetailed.title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              {m.servicesDetailed.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {servicesData.map((service) => {
              const translated = translatedServices.find((item) => item.id === service.id)
              return (
                <Link key={service.id} href={`/servicios/${service.slug}`}>
                  <div className="neon-card-rotating p-4 md:p-6 rounded-lg h-full cursor-pointer group transition-all md:hover:scale-105 min-w-0 overflow-x-clip">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">{translated?.icon || service.icon}</div>
                    <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 break-words">
                      {translated?.title || service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-primary font-medium mb-3 md:mb-4">
                      {translated?.subtitle || service.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 line-clamp-3 break-words">
                      {translated?.description || service.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm md:text-base md:group-hover:translate-x-2 transition-transform">
                      {m.servicesDetailed.cta}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ServicesProposal isHomeVersion={false} />

      <section className="py-12 md:py-20 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold neon-text-sm">{m.services.title}</h2>
              <p className="text-sm md:text-lg text-muted-foreground">{m.services.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
              {[
                { icon: "⚡", title: "Performance", desc: "Core Web Vitals 90+" },
                { icon: "🎯", title: "ROI", desc: "Enfoque en resultados de negocio" },
                { icon: "🔒", title: "Security", desc: "Infraestructura enterprise-grade" },
                { icon: "📈", title: "Scale", desc: "Arquitectura lista para crecer" },
                { icon: "🤝", title: "Support", desc: "Acompanamiento continuo" },
                { icon: "🎨", title: "UX/UI", desc: "Diseno premium y usable" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-2 md:space-y-3 p-4 md:p-6 rounded-lg border border-primary/20 bg-primary/5"
                >
                  <div className="text-3xl md:text-4xl">{item.icon}</div>
                  <h4 className="text-base md:text-lg font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  )
}
