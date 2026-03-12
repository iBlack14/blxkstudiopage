"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BadgeDollarSign, CheckCircle2, Zap } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale, localizePath } from "@/lib/i18n"

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

const HERO_HIGHLIGHTS: Record<Locale, string[]> = {
  es: [
    "Web a medida, automatización e IA en un solo partner",
    "Arquitectura rápida, segura y lista para escalar",
    "Entregables orientados a conversión y operación",
  ],
  en: [
    "Custom web, automation and AI under one partner",
    "Fast, secure architecture ready to scale",
    "Deliverables built for conversion and operations",
  ],
  pt: [
    "Web sob medida, automação e IA com um só parceiro",
    "Arquitetura rápida, segura e pronta para escalar",
    "Entregas orientadas a conversão e operação",
  ],
  fr: [
    "Web sur mesure, automatisation et IA avec un seul partenaire",
    "Architecture rapide, securisee et prete a evoluer",
    "Livrables axes sur conversion et operations",
  ],
  de: [
    "Individuelle Webprojekte, Automatisierung und KI aus einer Hand",
    "Schnelle, sichere Architektur fuer Wachstum",
    "Ergebnisse fuer Conversion und Betrieb optimiert",
  ],
  it: [
    "Web su misura, automazione e IA con un solo partner",
    "Architettura rapida, sicura e pronta a scalare",
    "Deliverable orientati a conversione e operativita",
  ],
}

const HERO_PRICING: Record<Locale, { title: string; items: Array<{ label: string; price: string }> }> = {
  es: {
    title: "Precios base para comparar rápido",
    items: [
      { label: "Landing page", price: "desde $450" },
      { label: "Web corporativa", price: "desde $900" },
      { label: "Automatización", price: "desde $300" },
    ],
  },
  en: {
    title: "Starting prices for quick comparison",
    items: [
      { label: "Landing page", price: "from $450" },
      { label: "Corporate website", price: "from $900" },
      { label: "Automation", price: "from $300" },
    ],
  },
  pt: {
    title: "Precos iniciais para comparar rapido",
    items: [
      { label: "Landing page", price: "a partir de $450" },
      { label: "Site institucional", price: "a partir de $900" },
      { label: "Automacao", price: "a partir de $300" },
    ],
  },
  fr: {
    title: "Tarifs de depart pour comparer vite",
    items: [
      { label: "Landing page", price: "des $450" },
      { label: "Site corporate", price: "des $900" },
      { label: "Automatisation", price: "des $300" },
    ],
  },
  de: {
    title: "Einstiegspreise fuer den Schnellvergleich",
    items: [
      { label: "Landingpage", price: "ab $450" },
      { label: "Unternehmenswebsite", price: "ab $900" },
      { label: "Automatisierung", price: "ab $300" },
    ],
  },
  it: {
    title: "Prezzi base per confrontare subito",
    items: [
      { label: "Landing page", price: "da $450" },
      { label: "Sito corporate", price: "da $900" },
      { label: "Automazione", price: "da $300" },
    ],
  },
}

const HERO_HEADLINE: Record<Locale, { title: string; accent: string; strapline: string }> = {
  es: {
    title: "Web, automatización e IA",
    accent: "para crecer con menos fricción",
    strapline: "BLXK Studio diseña y construye sistemas digitales que venden, automatizan y escalan.",
  },
  en: {
    title: "Web, automation and AI",
    accent: "built to grow with less friction",
    strapline: "BLXK Studio designs and builds digital systems that sell, automate and scale.",
  },
  pt: {
    title: "Web, automação e IA",
    accent: "para crescer com menos fricção",
    strapline: "A BLXK Studio projeta e constrói sistemas digitais que vendem, automatizam e escalam.",
  },
  fr: {
    title: "Web, automatisation et IA",
    accent: "pour grandir avec moins de friction",
    strapline: "BLXK Studio conçoit et construit des systemes digitaux qui vendent, automatisent et evoluent.",
  },
  de: {
    title: "Web, Automatisierung und KI",
    accent: "fuer Wachstum mit weniger Reibung",
    strapline: "BLXK Studio entwickelt digitale Systeme, die verkaufen, automatisieren und skalieren.",
  },
  it: {
    title: "Web, automazione e IA",
    accent: "per crescere con meno attrito",
    strapline: "BLXK Studio progetta e realizza sistemi digitali che vendono, automatizzano e scalano.",
  },
}

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
  const { locale, m } = useLanguage()
  const headline = HERO_HEADLINE[locale]
  const highlights = HERO_HIGHLIGHTS[locale]
  const pricing = HERO_PRICING[locale]

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
              <span className="text-xs font-medium text-primary">{m.hero.badge}</span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary/80 tracking-[0.24em]">{m.hero.subtitle}</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl text-balance">
                <span className="block">{headline.title}</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent block">
                  {headline.accent}
                </span>
              </h1>
              <p className="text-base md:text-xl text-foreground/80 max-w-2xl">
                {headline.strapline}
              </p>
            </div>

            <div className="space-y-3 text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-xl">
              <p>
                {m.hero.descriptionMain}
              </p>
              <p>{m.hero.descriptionSecondary}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-primary/15 bg-card/50 px-4 py-3 text-sm text-foreground/85 shadow-sm backdrop-blur-sm"
                >
                  <CheckCircle2 className="mb-2 h-4 w-4 text-primary" />
                  <p className="leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-5">
              <div className="flex items-center gap-2 text-primary">
                <BadgeDollarSign className="h-4 w-4" />
                <p className="text-sm font-semibold uppercase tracking-wider">{pricing.title}</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {pricing.items.map((item) => (
                  <div key={item.label} className="rounded-xl border border-primary/15 bg-background/70 px-4 py-3">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">{m.hero.stackTitle}</p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={localizePath("/projects", locale)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {m.hero.ctaProjects}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={localizePath("/contacto", locale)}
                className="px-6 py-3 border border-primary/40 text-primary rounded-lg font-semibold text-sm hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 text-center"
              >
                {m.hero.ctaConsultation}
              </Link>
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
                  <p className="text-xs text-primary font-semibold">{m.hero.agencyLabel}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <StatBadge value="50+" label={m.hero.statClients} />
                <StatBadge value="5+" label={m.hero.statYears} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
