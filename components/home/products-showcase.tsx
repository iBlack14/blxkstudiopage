"use client"

import { Card3DHover } from "@/components/effects/3d-card-hover"
import { Server, Code, Package, CreditCard, BadgeDollarSign } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const icons = {
    1: Server,
    2: Package,
    3: CreditCard,
    4: Code,
}

const PRODUCT_PRICING: Record<Locale, Record<number, string>> = {
    es: {
        1: "desde $12/mes",
        2: "desde $39",
        3: "desde $149",
        4: "desde $99",
    },
    en: {
        1: "from $12/mo",
        2: "from $39",
        3: "from $149",
        4: "from $99",
    },
    pt: {
        1: "a partir de $12/mes",
        2: "a partir de $39",
        3: "a partir de $149",
        4: "a partir de $99",
    },
    fr: {
        1: "des $12/mois",
        2: "des $39",
        3: "des $149",
        4: "des $99",
    },
    de: {
        1: "ab $12/Monat",
        2: "ab $39",
        3: "ab $149",
        4: "ab $99",
    },
    it: {
        1: "da $12/mese",
        2: "da $39",
        3: "da $149",
        4: "da $99",
    },
}

const PRODUCT_PRICING_BADGE: Record<Locale, string> = {
    es: "Precios visibles para una comparación más rápida",
    en: "Visible pricing for faster comparison",
    pt: "Precos visiveis para comparar mais rapido",
    fr: "Tarifs visibles pour comparer plus vite",
    de: "Sichtbare Preise fuer schnelleren Vergleich",
    it: "Prezzi visibili per confrontare piu rapidamente",
}

export function ProductsShowcase() {
    const { locale, m } = useLanguage()
    const pricing = PRODUCT_PRICING[locale]
    const pricingBadge = PRODUCT_PRICING_BADGE[locale]

    if (!m.digitalProducts) return null

    return (
        <section id="products" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4 animate-in fade-in duration-1000">
                        <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">{m.digitalProducts.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                            {m.digitalProducts.subtitle}
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                            <BadgeDollarSign className="h-4 w-4" />
                            {pricingBadge}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {m.digitalProducts.list.map((product, index) => {
                            const Icon = icons[product.id as keyof typeof icons] || Server
                            return (
                                <Card3DHover key={product.id} delay={index * 100}>
                                    <div className="neon-card-rotating p-6 rounded-lg space-y-4 group h-full text-center">
                                        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {pricing[product.id] ?? "$99"}
                                        </div>
                                        <div className="w-14 h-14 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                                            <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground text-balance group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                                            {product.description}
                                        </p>
                                    </div>
                                </Card3DHover>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
