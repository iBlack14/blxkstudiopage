"use client"

import { Navigation } from "@/components/layout/navigation"
import { FloatingThemeToggle } from "@/components/layout/theme-toggle"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"
import { ArrowUpRight, Rocket, ShieldCheck, Target, Users } from "lucide-react"

type AboutCopy = {
  badge: string
  titleLine1: string
  titleLine2: string
  description: string
  clients: string
  years: string
  positionLabel: string
  positionTitle: string
  positionDesc: string
  statementLabel: string
  statementTitle: string
  statementDesc: string
  cta: string
  principles: Array<{ title: string; description: string }>
}

const ABOUT_COPY: Record<Locale, AboutCopy> = {
  es: {
    badge: "Nosotros",
    titleLine1: "Diseno y tecnologia",
    titleLine2: "con direccion de negocio",
    description:
      "BLXK Studio es un equipo senior que construye productos digitales, automatizaciones e IA aplicada para empresas con metas claras.",
    clients: "Clientes activos",
    years: "Anos de experiencia",
    positionLabel: "Posicion",
    positionTitle: "Boutique tecnologica para crecimiento serio",
    positionDesc:
      "Combinamos creatividad, arquitectura y automatizacion para transformar operaciones y acelerar resultados.",
    statementLabel: "Declaracion",
    statementTitle: "Tecnologia con criterio ejecutivo",
    statementDesc: "Convertimos complejidad tecnica en sistemas claros, rentables y listos para escalar.",
    cta: "Ver servicios",
    principles: [
      { title: "Estrategia primero", description: "Cada entrega responde a un objetivo de negocio medible." },
      { title: "Ejecucion de alto ritmo", description: "Sprints cortos, decisiones claras y lanzamientos frecuentes." },
      { title: "Calidad sin compromisos", description: "Arquitectura estable, seguridad y performance como base." },
    ],
  },
  en: {
    badge: "About",
    titleLine1: "Design and technology",
    titleLine2: "with business direction",
    description:
      "BLXK Studio is a senior team building digital products, automations and applied AI for companies with clear goals.",
    clients: "Active clients",
    years: "Years of experience",
    positionLabel: "Positioning",
    positionTitle: "Technology boutique for serious growth",
    positionDesc: "We combine creativity, architecture and automation to transform operations and accelerate results.",
    statementLabel: "Statement",
    statementTitle: "Technology with executive criteria",
    statementDesc: "We turn technical complexity into clear, profitable systems ready to scale.",
    cta: "View services",
    principles: [
      { title: "Strategy first", description: "Every delivery answers a measurable business objective." },
      { title: "High-velocity execution", description: "Short sprints, clear decisions and frequent releases." },
      { title: "Quality without compromises", description: "Stable architecture, security and performance by default." },
    ],
  },
  pt: {
    badge: "Sobre",
    titleLine1: "Design e tecnologia",
    titleLine2: "com direcao de negocio",
    description:
      "A BLXK Studio e uma equipe senior que cria produtos digitais, automacoes e IA aplicada para empresas com metas claras.",
    clients: "Clientes ativos",
    years: "Anos de experiencia",
    positionLabel: "Posicionamento",
    positionTitle: "Boutique de tecnologia para crescimento serio",
    positionDesc: "Combinamos criatividade, arquitetura e automacao para acelerar resultados.",
    statementLabel: "Declaracao",
    statementTitle: "Tecnologia com criterio executivo",
    statementDesc: "Transformamos complexidade tecnica em sistemas claros e escalaveis.",
    cta: "Ver servicos",
    principles: [
      { title: "Estrategia primeiro", description: "Cada entrega atende um objetivo de negocio mensuravel." },
      { title: "Execucao rapida", description: "Sprints curtos, decisoes claras e lancamentos frequentes." },
      { title: "Qualidade sem concessoes", description: "Arquitetura estavel, seguranca e performance." },
    ],
  },
  fr: {
    badge: "A propos",
    titleLine1: "Design et technologie",
    titleLine2: "avec vision business",
    description:
      "BLXK Studio est une equipe senior qui construit des produits digitaux, des automatisations et de l'IA appliquee.",
    clients: "Clients actifs",
    years: "Ans d'experience",
    positionLabel: "Positionnement",
    positionTitle: "Boutique technologique pour une croissance serieuse",
    positionDesc: "Nous combinons creativite, architecture et automatisation pour accelerer les resultats.",
    statementLabel: "Declaration",
    statementTitle: "Technologie avec criteres executifs",
    statementDesc: "Nous transformons la complexite technique en systemes clairs et rentables.",
    cta: "Voir services",
    principles: [
      { title: "Strategie d'abord", description: "Chaque livrable suit un objectif business mesurable." },
      { title: "Execution rapide", description: "Sprints courts, decisions claires et sorties frequentes." },
      { title: "Qualite sans compromis", description: "Architecture stable, securite et performance." },
    ],
  },
  de: {
    badge: "Uber uns",
    titleLine1: "Design und Technologie",
    titleLine2: "mit Business-Fokus",
    description:
      "BLXK Studio ist ein Senior-Team fur digitale Produkte, Automatisierungen und angewandte KI.",
    clients: "Aktive Kunden",
    years: "Jahre Erfahrung",
    positionLabel: "Positionierung",
    positionTitle: "Technologie-Boutique fur ernsthaftes Wachstum",
    positionDesc: "Wir verbinden Kreativitat, Architektur und Automatisierung fur bessere Ergebnisse.",
    statementLabel: "Erklarung",
    statementTitle: "Technologie mit Executive-Ansatz",
    statementDesc: "Wir machen technische Komplexitat klar, profitabel und skalierbar.",
    cta: "Services ansehen",
    principles: [
      { title: "Strategie zuerst", description: "Jede Lieferung folgt einem messbaren Geschaftsziel." },
      { title: "Schnelle Umsetzung", description: "Kurze Sprints, klare Entscheidungen, haufige Releases." },
      { title: "Qualitat ohne Kompromisse", description: "Stabile Architektur, Sicherheit und Performance." },
    ],
  },
  it: {
    badge: "Chi siamo",
    titleLine1: "Design e tecnologia",
    titleLine2: "con direzione business",
    description:
      "BLXK Studio e un team senior che crea prodotti digitali, automazioni e IA applicata per aziende con obiettivi chiari.",
    clients: "Clienti attivi",
    years: "Anni di esperienza",
    positionLabel: "Posizionamento",
    positionTitle: "Boutique tecnologica per crescita reale",
    positionDesc: "Uniamo creativita, architettura e automazione per accelerare i risultati.",
    statementLabel: "Dichiarazione",
    statementTitle: "Tecnologia con criterio executive",
    statementDesc: "Trasformiamo la complessita tecnica in sistemi chiari e scalabili.",
    cta: "Vedi servizi",
    principles: [
      { title: "Strategia prima", description: "Ogni consegna risponde a un obiettivo misurabile." },
      { title: "Esecuzione rapida", description: "Sprint brevi, decisioni chiare e rilasci frequenti." },
      { title: "Qualita senza compromessi", description: "Architettura stabile, sicurezza e performance." },
    ],
  },
}

export default function NosotrosPage() {
  const { locale } = useLanguage()
  const copy = ABOUT_COPY[locale]

  const principles = [
    { icon: Target, ...copy.principles[0] },
    { icon: Rocket, ...copy.principles[1] },
    { icon: ShieldCheck, ...copy.principles[2] },
  ]

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
                <span className="text-xs font-semibold text-primary">{copy.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                {copy.titleLine1}
                <span className="block text-primary">{copy.titleLine2}</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {copy.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="rounded-xl border border-primary/25 bg-card/50 px-4 py-3 min-w-[130px]">
                  <p className="text-2xl font-black text-primary leading-none">50+</p>
                  <p className="text-xs text-muted-foreground mt-1">{copy.clients}</p>
                </div>
                <div className="rounded-xl border border-primary/25 bg-card/50 px-4 py-3 min-w-[130px]">
                  <p className="text-2xl font-black text-primary leading-none">5+</p>
                  <p className="text-xs text-muted-foreground mt-1">{copy.years}</p>
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
                  <p className="text-sm text-primary">{copy.statementTitle}</p>
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
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{copy.positionLabel}</p>
              <h2 className="text-2xl md:text-3xl font-black leading-tight">{copy.positionTitle}</h2>
              <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">{copy.positionDesc}</p>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-4">
              {principles.map((item) => {
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
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{copy.statementLabel}</p>
              <h3 className="text-2xl md:text-3xl font-black">{copy.statementTitle}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl">{copy.statementDesc}</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors">
              {copy.cta}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
