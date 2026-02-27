"use client"

import Image from "next/image"
import { Download, Star } from "lucide-react"

// ─── Datos reales de los plugins ───────────────────────────────────────────
const PLUGINS = [
    {
        id: 1,
        name: "Elementor Pro",
        version: "v3.34.3",
        description: "El constructor de páginas más potente de WordPress. Widgets premium, pop-ups, formularios y WooCommerce builder integrado.",
        category: "Page Builder",
        cover: "/plugins/covers/elementor-pro.png",
        size: "3.2 MB",
        tags: ["Visual Builder", "Widgets Premium", "WooCommerce", "Pop-ups"],
        file: "Elementor Pro v3.34.3.zip",
    },
    {
        id: 2,
        name: "Happy Addons Pro",
        version: "v3.4.3",
        description: "Más de 100 widgets y extensiones premium para Elementor. Efectos avanzados, sliders, timeline y elementos únicos.",
        category: "Elementor Addon",
        cover: "/plugins/covers/happy-addons.png",
        size: "15.6 MB",
        tags: ["100+ Widgets", "Efectos", "Sliders", "Timeline"],
        file: "Happy Elementor Addons Pro v3.4.3.zip",
    },
    {
        id: 3,
        name: "Amelia Booking",
        version: "v9.1.2",
        description: "Sistema de reservas y citas profesional. Gestión de empleados, servicios, pagos online y recordatorios automáticos.",
        category: "Booking System",
        cover: "/plugins/covers/amelia-booking.png",
        size: "28.2 MB",
        tags: ["Citas", "Pagos Online", "Empleados", "SMS"],
        file: "ameliabooking_v9.1.2.zip",
    },
    {
        id: 4,
        name: "FunnelKit Pro",
        version: "v3.13.2",
        description: "Construye funnels de venta de alta conversión en WooCommerce. Order bumps, upsells, thank you pages y analytics.",
        category: "Sales Funnel",
        cover: "/plugins/covers/funnelkit.png",
        size: "9.7 MB",
        tags: ["Upsells", "Order Bumps", "A/B Testing", "Analytics"],
        file: "FunnelKit Funnel Builder Pro v3.13.2.zip",
    },
    {
        id: 5,
        name: "WooCommerce Bookings",
        version: "v3.0.2",
        description: "Vende reservas de tiempo, servicios y alquileres. Gestión de disponibilidad, recursos y confirmaciones automáticas.",
        category: "WooCommerce",
        cover: "/plugins/covers/woo-bookings.png",
        size: "5.3 MB",
        tags: ["Reservas", "Recursos", "Disponibilidad", "WooCommerce"],
        file: "WooCommerce Bookings v3.0.2.zip",
    },
    {
        id: 6,
        name: "Polylang Pro",
        version: "v3.7.8",
        description: "El plugin de multilenguaje más popular de WordPress. Compatible con SEO, WooCommerce y direcciones RTL.",
        category: "Multilingual",
        cover: "/plugins/covers/polylang-pro.png",
        size: "1.2 MB",
        tags: ["Multilenguaje", "SEO", "WooCommerce", "RTL"],
        file: "polylang-pro_v3.7.8.zip",
    },
    {
        id: 7,
        name: "WP Mail SMTP Pro",
        version: "v4.7.1",
        description: "Soluciona los problemas de envío de emails. Conecta con SMTP, SendGrid, Mailgun y Amazon SES. Logs y alertas incluidos.",
        category: "Email",
        cover: "/plugins/covers/wp-mail-smtp.png",
        size: "3.6 MB",
        tags: ["SMTP", "SendGrid", "Mailgun", "Email Logs"],
        file: "wp-mail-smtp-pro_v4.7.1.zip",
    },
    {
        id: 8,
        name: "All-in-One Migration",
        version: "Unlimited",
        description: "Migra tu sitio WordPress completo sin límite de tamaño. Exporta todo en un archivo y restaura en cualquier host con un clic.",
        category: "Migration",
        cover: "/plugins/covers/allinone-migration.png",
        size: "0.8 MB + ext.",
        tags: ["Sin límite", "Un archivo", "Restauración", "Multi-host"],
        file: "all-in-one-wp-migration.zip",
        extraFile: "All In One Migration Unlimited Extension v2.80.zip",
    },
    {
        id: 9,
        name: "Tutor LMS Certificates",
        version: "Latest",
        description: "Crea certificados de finalización personalizados para tus cursos de Tutor LMS. Editor drag & drop con plantillas premium.",
        category: "LMS",
        cover: "/plugins/covers/tutor-lms.png",
        size: "3.9 MB",
        tags: ["Certificados", "Drag & Drop", "Tutor LMS", "Plantillas"],
        file: "tutor-lms-certificate-builder.zip",
    },
    {
        id: 10,
        name: "Polylang Pro (Stable)",
        version: "v3.7.6",
        description: "Versión estable de Polylang Pro. Ideal para sitios en producción que requieren máxima compatibilidad antes de actualizar.",
        category: "Multilingual",
        cover: "/plugins/covers/polylang-stable.png",
        size: "1.2 MB",
        tags: ["Multilenguaje", "Estable", "SEO", "Producción"],
        file: "Polylang Pro v3.7.6.zip",
    },
    {
        id: 11,
        name: "WP Rocket",
        version: "v3.20.4",
        description: "El plugin de caché y rendimiento #1 de WordPress. Mejora la velocidad, Core Web Vitals y PageSpeed Score con un solo clic.",
        category: "Performance",
        cover: "/plugins/covers/wp-rocket.png",
        size: "—",
        tags: ["Caché", "PageSpeed", "Core Web Vitals", "Minificación"],
        file: "wp-rocket_v3.20.4.zip",
    },
]

// ─── Componente principal ────────────────────────────────────────────────────
export function PluginsShowcase() {
    return (
        <section id="plugins-showcase" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto space-y-14">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Plugins{" "}
                            <span className="neon-text">Premium</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Descarga directa · Sin suscripciones · Listos para instalar en WordPress
                        </p>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-glow" />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {PLUGINS.map((plugin) => (
                            <div
                                key={plugin.id}
                                className="group relative flex flex-col rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                {/* ── Cover image ── */}
                                <div className="relative h-[140px] overflow-hidden">
                                    <Image
                                        src={plugin.cover}
                                        alt={`${plugin.name} cover`}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Dark overlay for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    {/* Version top-right */}
                                    <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 text-white/70 border border-white/10 backdrop-blur-sm">
                                        {plugin.version}
                                    </span>

                                    {/* Category bottom-left */}
                                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground uppercase tracking-wide">
                                        {plugin.category}
                                    </span>
                                </div>

                                {/* ── Content ── */}
                                <div className="flex flex-col flex-1 p-4 space-y-3">
                                    {/* Name */}
                                    <h3 className="font-bold text-[15px] text-foreground leading-tight group-hover:text-primary transition-colors">
                                        {plugin.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                                        {plugin.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1">
                                        {plugin.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-1.5 py-0.5 text-[9px] font-medium bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded border border-black/10 dark:border-white/10 leading-none"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Size + Stars */}
                                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-black/10 dark:border-white/5">
                                        <span className="font-mono">{plugin.size}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Download button(s) */}
                                    <div className="flex flex-col gap-1.5 pt-1">
                                        <a
                                            href={`/plugins/${encodeURIComponent(plugin.file)}`}
                                            download={plugin.file}
                                            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-semibold transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Descargar Plugin
                                        </a>
                                        {plugin.extraFile && (
                                            <a
                                                href={`/plugins/${encodeURIComponent(plugin.extraFile)}`}
                                                download={plugin.extraFile}
                                                className="flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded-xl bg-white/5 border border-white/8 text-muted-foreground text-[11px] font-medium transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                <Download className="w-3 h-3" />
                                                + Extension Unlimited
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── GPL Disclaimer ── */}
                    <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-50/60 dark:bg-amber-500/5 backdrop-blur-sm p-6 space-y-4 text-center">
                        {/* Headline */}
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-amber-500 text-lg">⚖️</span>
                            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                                Aviso Legal · Licencia GPL
                            </p>
                            <span className="text-amber-500 text-lg">⚖️</span>
                        </div>

                        {/* Main text */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Todo software publicado en este sitio ha sido desarrollado por terceros.{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">Plugins WP</span>{" "}
                            solo lo redistribuye según los términos de la{" "}
                            <span className="font-semibold text-amber-600 dark:text-amber-400">
                                Licencia Pública General (GPL)
                            </span>
                            . Creemos en el software libre y apoyamos a{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                The Free Software Foundation
                            </span>
                            .
                        </p>

                        {/* Brand disclaimer */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            No tenemos afiliación con los desarrolladores de temas y plugins, ni con los propietarios de marcas como:
                        </p>

                        {/* Brand pills */}
                        <div className="flex flex-wrap justify-center gap-2 pt-1">
                            {[
                                "Elementor",
                                "ThemeForest",
                                "CodeCanyon",
                                "Envato Market",
                                "WooCommerce",
                                "FunnelKit",
                                "Amelia",
                                "Polylang",
                                "WP Rocket",
                                "WP Mail SMTP",
                                "Tutor LMS",
                            ].map((brand) => (
                                <span
                                    key={brand}
                                    className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm"
                                >
                                    {brand}
                                </span>
                            ))}
                            <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 shadow-sm italic">
                                entre otros…
                            </span>
                        </div>

                        {/* Bottom note */}
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 pt-1">
                            🔒 Uso personal / cliente · Redistribución permitida bajo los términos de la GPL
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
