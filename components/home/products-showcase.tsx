"use client"

import { Card3DHover } from "@/components/effects/3d-card-hover"
import { Server, Code, Package, CreditCard } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"

const icons = {
    1: Server,
    2: Package,
    3: CreditCard,
    4: Code,
}

export function ProductsShowcase() {
    const { m } = useLanguage()

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
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {m.digitalProducts.list.map((product, index) => {
                            const Icon = icons[product.id as keyof typeof icons] || Server
                            return (
                                <Card3DHover key={product.id} delay={index * 100}>
                                    <div className="neon-card-rotating p-6 rounded-lg space-y-4 group h-full text-center">
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
