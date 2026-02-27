"use client"

import { Puzzle } from "lucide-react"

export function PluginsHero() {
    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden py-20 md:py-32">
            {/* Background blobs */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute inset-0 hero-grid-pattern opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    {/* Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 backdrop-blur-sm">
                            <Puzzle className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-medium text-foreground">
                                WordPress Plugins
                            </span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
                        <span className="neon-text">Plugins</span>{" "}
                        <span className="text-foreground">WP</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Extensiones premium para WordPress y WooCommerce, diseñadas para
                        negocios que necesitan más potencia, automatización y control.
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap justify-center gap-8 pt-4">
                        {[
                            { label: "Plugins Disponibles", value: "11+" },
                            { label: "Descarga Directa", value: "100%" },
                            { label: "Compatibilidad", value: "WP 6.x" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-black text-primary neon-text">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
