"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { FounderHero } from "@/components/founder-hero"
import { Navigation } from "@/components/navigation"

// Dynamic imports with skeleton loading for better UX
// Components below the fold are lazy loaded
const FloatingThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then(m => ({ default: m.FloatingThemeToggle })),
  { ssr: false } // Client-only component
)

const ServicesDetailed = dynamic(
  () => import("@/components/services-detailed").then(m => ({ default: m.ServicesDetailed })),
  {
    loading: () => <ServicesSkeleton />,
  }
)

const ServicesProposal = dynamic(
  () => import("@/components/services-proposal").then(m => ({ default: m.ServicesProposal })),
  {
    loading: () => <div className="py-20 animate-pulse bg-muted/20" />,
  }
)

const ProductsShowcase = dynamic(
  () => import("@/components/products-showcase").then(m => ({ default: m.ProductsShowcase })),
  {
    loading: () => <div className="py-20 animate-pulse bg-muted/10" />,
  }
)

const BlxkChatbot = dynamic(
  () => import("@/components/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })),
  {
    ssr: false // Client-only interactive component
  }
)

// Lightweight skeleton for services section
function ServicesSkeleton() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="h-12 bg-muted/30 rounded-lg w-64 mx-auto animate-pulse" />
            <div className="h-6 bg-muted/20 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted/20 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Critical path - loaded immediately */}
      <Navigation />
      <FloatingThemeToggle />
      <FounderHero />

      {/* Below the fold - lazy loaded with suspense */}
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesDetailed />
      </Suspense>

      <Suspense fallback={<div className="py-20 animate-pulse bg-muted/20" />}>
        <ServicesProposal isHomeVersion={true} />
      </Suspense>

      <Suspense fallback={<div className="py-20 animate-pulse bg-muted/10" />}>
        <ProductsShowcase />
      </Suspense>

      {/* Interactive chatbot - client only */}
      <BlxkChatbot />
    </main>
  )
}
