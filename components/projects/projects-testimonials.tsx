"use client"

import { Star, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<Locale, {
  title: string
  subtitle: string
  testimonials: Array<{ quote: string; author: string; role: string; stars: number }>
}> = {
  es: {
    title: "Lo que dicen nuestros clientes",
    subtitle: "Testimonios reales de empresas transformadas",
    testimonials: [
      {
        quote:
          "BLXK Studio transformo completamente nuestro flujo de ventas. La integracion WhatsApp aumento nuestras conversiones en 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "El dashboard administrativo es increible. Ahora gestionamos todo desde un mismo lugar.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "La automatizacion con N8N elimino horas de trabajo manual. Fue la mejor inversion del ano.",
        author: "Jorge Lopez",
        role: "Director de Operaciones, Retail",
        stars: 5,
      },
    ],
  },
  en: {
    title: "What our clients say",
    subtitle: "Real testimonials from transformed companies",
    testimonials: [
      {
        quote: "BLXK Studio completely transformed our sales flow. WhatsApp integration increased conversions by 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "The admin dashboard is excellent. We now manage everything from one place.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "N8N automation removed hours of manual work. It was our best investment this year.",
        author: "Jorge Lopez",
        role: "Operations Director, Retail",
        stars: 5,
      },
    ],
  },
  pt: {
    title: "O que dizem nossos clientes",
    subtitle: "Depoimentos reais de empresas transformadas",
    testimonials: [
      {
        quote: "A BLXK Studio transformou completamente nosso fluxo de vendas. A integracao com WhatsApp aumentou as conversoes em 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "O dashboard administrativo e excelente. Agora gerenciamos tudo em um unico lugar.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "A automacao com N8N eliminou horas de trabalho manual. Foi nosso melhor investimento do ano.",
        author: "Jorge Lopez",
        role: "Diretor de Operacoes, Retail",
        stars: 5,
      },
    ],
  },
  fr: {
    title: "Ce que disent nos clients",
    subtitle: "Temoignages reels d'entreprises transformees",
    testimonials: [
      {
        quote: "BLXK Studio a completement transforme notre flux de vente. L'integration WhatsApp a augmente les conversions de 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "Le tableau de bord d'administration est excellent. Nous gerons maintenant tout depuis un seul endroit.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "L'automatisation avec N8N a elimine des heures de travail manuel. Ce fut notre meilleur investissement de l'annee.",
        author: "Jorge Lopez",
        role: "Directeur des Operations, Retail",
        stars: 5,
      },
    ],
  },
  de: {
    title: "Was unsere Kunden sagen",
    subtitle: "Echte Erfahrungsberichte transformierter Unternehmen",
    testimonials: [
      {
        quote: "BLXK Studio hat unseren Verkaufsprozess komplett transformiert. Die WhatsApp-Integration steigerte die Conversions um 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "Das Admin-Dashboard ist hervorragend. Wir verwalten jetzt alles an einem Ort.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "Die N8N-Automatisierung hat Stunden manueller Arbeit eliminiert. Es war unsere beste Investition des Jahres.",
        author: "Jorge Lopez",
        role: "Betriebsleiter, Retail",
        stars: 5,
      },
    ],
  },
  it: {
    title: "Cosa dicono i nostri clienti",
    subtitle: "Testimonianze reali di aziende trasformate",
    testimonials: [
      {
        quote: "BLXK Studio ha trasformato completamente il nostro flusso di vendita. L'integrazione WhatsApp ha aumentato le conversioni del 340%.",
        author: "Carlos Mendoza",
        role: "CEO, E-commerce Peru",
        stars: 5,
      },
      {
        quote: "La dashboard amministrativa e eccellente. Ora gestiamo tutto da un unico posto.",
        author: "Maria Garcia",
        role: "Operations Manager, Startup Tech",
        stars: 5,
      },
      {
        quote: "L'automazione con N8N ha eliminato ore di lavoro manuale. E stato il nostro miglior investimento dell'anno.",
        author: "Jorge Lopez",
        role: "Direttore Operativo, Retail",
        stars: 5,
      },
    ],
  },
}

export function ProjectsTestimonials() {
  const { locale } = useLanguage()
  const copy = COPY[locale]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text">{copy.title}</h2>
            <p className="text-muted-foreground text-lg">{copy.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.testimonials.map((testimonial, idx) => (
              <Card key={idx} className="neon-card-rotating p-8">
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-primary/50" />
                  <p className="text-foreground text-base leading-relaxed">{testimonial.quote}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
