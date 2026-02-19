import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/layout/navigation"
import { ProjectsShowcase } from "@/components/projects/projects-showcase"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsComparison } from "@/components/projects/projects-comparison"
import { ProjectsTestimonials } from "@/components/projects/projects-testimonials"
import { ProjectDemos } from "@/components/home/project-demos"

const ProjectsStats = dynamic(() => import("@/components/projects/projects-stats").then(m => ({ default: m.ProjectsStats })), {
  loading: () => null,
  ssr: true,
})
const Contact = dynamic(() => import("@/components/utilities/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
  ssr: true,
})
const BlxkChatbot = dynamic(() => import("@/components/home/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })), {
  loading: () => null,
})

export const metadata: Metadata = {
  title: "Portafolio | BLXK Studio",
  description:
    "Conoce proyectos reales de desarrollo web, automatización e IA creados por BLXK Studio.",
  keywords:
    "portafolio desarrollo web, proyectos fullstack, whatsapp payment, n8n automation, next.js, react, supabase, dashboard administrativo, chatbot whatsapp",
  authors: [{ name: "BLXK Studio" }],
  creator: "BLXK Studio",
  publisher: "BLXK Studio",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://blxkstudio.com/projects",
    title: "Portafolio | BLXK Studio",
    description:
      "Proyectos de software, automatización e inteligencia artificial para empresas.",
    siteName: "BLXK Studio",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio | BLXK Studio",
    description: "Proyectos reales de desarrollo web y automatización.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://blxkstudio.com/projects",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectsHero />
      <ProjectDemos />
      <Suspense fallback={null}>
        <ProjectsStats />
      </Suspense>
      <ProjectsShowcase />
      <ProjectsComparison />
      <ProjectsTestimonials />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <BlxkChatbot />
      </Suspense>
    </main>
  )
}
