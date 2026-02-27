"use client"

import { Download, Package, Star, Shield, Zap, Globe, Mail, BookOpen, Calendar, ShoppingCart, Layers } from "lucide-react"

// ─── Datos reales de los plugins ───────────────────────────────────────────
const PLUGINS = [
    {
        id: 1,
        name: "Elementor Pro",
        version: "v3.34.3",
        description: "El constructor de páginas más potente de WordPress. Diseña sin código con widgets premium, pop-ups, formularios y WooCommerce builder integrado.",
        category: "Page Builder",
        icon: Layers,
        iconColor: "text-pink-400",
        iconBg: "bg-pink-500/10 border-pink-500/20",
        accentColor: "from-pink-500/30 via-rose-500/10",
        glowColor: "hover:shadow-pink-500/20 hover:border-pink-500/40",
        size: "3.2 MB",
        rating: 5,
        tags: ["Visual Builder", "Widgets Premium", "WooCommerce", "Pop-ups"],
        file: "Elementor Pro v3.34.3.zip",
    },
    {
        id: 2,
        name: "Happy Elementor Addons Pro",
        version: "v3.4.3",
        description: "Más de 100 widgets y extensiones premium para Elementor. Efectos avanzados, sliders, timeline, particles y decenas de elementos únicos.",
        category: "Elementor Addon",
        icon: Star,
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-500/10 border-yellow-500/20",
        accentColor: "from-yellow-500/30 via-amber-500/10",
        glowColor: "hover:shadow-yellow-500/20 hover:border-yellow-500/40",
        size: "15.6 MB",
        rating: 5,
        tags: ["100+ Widgets", "Efectos", "Sliders", "Timeline"],
        file: "Happy Elementor Addons Pro v3.4.3.zip",
    },
    {
        id: 3,
        name: "Amelia Booking",
        version: "v9.1.2",
        description: "Sistema de reservas y citas profesional para WordPress. Gestión de empleados, servicios, pagos online, recordatorios y panel de administración completo.",
        category: "Booking System",
        icon: Calendar,
        iconColor: "text-violet-400",
        iconBg: "bg-violet-500/10 border-violet-500/20",
        accentColor: "from-violet-500/30 via-purple-500/10",
        glowColor: "hover:shadow-violet-500/20 hover:border-violet-500/40",
        size: "28.2 MB",
        rating: 5,
        tags: ["Citas", "Pagos Online", "Empleados", "SMS Recuerdos"],
        file: "ameliabooking_v9.1.2.zip",
    },
    {
        id: 4,
        name: "FunnelKit Funnel Builder Pro",
        version: "v3.13.2",
        description: "Construye funnels de venta de alta conversión en WooCommerce. Order bumps, upsells, thank you pages y análisis de embudos completo.",
        category: "Sales Funnel",
        icon: Zap,
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/10 border-orange-500/20",
        accentColor: "from-orange-500/30 via-amber-500/10",
        glowColor: "hover:shadow-orange-500/20 hover:border-orange-500/40",
        size: "9.7 MB",
        rating: 5,
        tags: ["Upsells", "Order Bumps", "A/B Testing", "Analytics"],
        file: "FunnelKit Funnel Builder Pro v3.13.2.zip",
    },
    {
        id: 5,
        name: "WooCommerce Bookings",
        version: "v3.0.2",
        description: "Complemento oficial de WooCommerce para vender reservas de tiempo, servicios y alquileres. Gestión de disponibilidad, recursos y confirmaciones automáticas.",
        category: "WooCommerce",
        icon: ShoppingCart,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-500/20",
        accentColor: "from-purple-500/30 via-violet-500/10",
        glowColor: "hover:shadow-purple-500/20 hover:border-purple-500/40",
        size: "5.3 MB",
        rating: 5,
        tags: ["Reservas", "Recursos", "Disponibilidad", "WooCommerce"],
        file: "WooCommerce Bookings v3.0.2.zip",
    },
    {
        id: 6,
        name: "Polylang Pro",
        version: "v3.7.8",
        description: "El plugin de multilenguaje más popular de WordPress. Traduce páginas, posts, CPTs, taxonomías, widgets y menús. Compatible con SEO y WooCommerce.",
        category: "Multilingual",
        icon: Globe,
        iconColor: "text-green-400",
        iconBg: "bg-green-500/10 border-green-500/20",
        accentColor: "from-green-500/30 via-emerald-500/10",
        glowColor: "hover:shadow-green-500/20 hover:border-green-500/40",
        size: "1.2 MB",
        rating: 5,
        tags: ["Multilenguaje", "SEO", "WooCommerce", "RTL"],
        file: "polylang-pro_v3.7.8.zip",
    },
    {
        id: 7,
        name: "WP Mail SMTP Pro",
        version: "v4.7.1",
        description: "Soluciona los problemas de envío de emails en WordPress. Conecta con SMTP, SendGrid, Mailgun, Amazon SES y más. Logs detallados y alertas.",
        category: "Email",
        icon: Mail,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        accentColor: "from-blue-500/30 via-cyan-500/10",
        glowColor: "hover:shadow-blue-500/20 hover:border-blue-500/40",
        size: "3.6 MB",
        rating: 5,
        tags: ["SMTP", "SendGrid", "Mailgun", "Email Logs"],
        file: "wp-mail-smtp-pro_v4.7.1.zip",
    },
    {
        id: 8,
        name: "All-in-One WP Migration",
        version: "Unlimited",
        description: "Migra tu sitio WordPress completo sin límite de tamaño. Exporta todo el sitio en un solo archivo y restaura en cualquier host con un clic.",
        category: "Migration",
        icon: Package,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        accentColor: "from-cyan-500/30 via-teal-500/10",
        glowColor: "hover:shadow-cyan-500/20 hover:border-cyan-500/40",
        size: "0.8 MB + ext.",
        rating: 5,
        tags: ["Sin límite", "Un solo archivo", "Restauración", "Multi-host"],
        file: "all-in-one-wp-migration.zip",
        extraFile: "All In One Migration Unlimited Extension v2.80.zip",
    },
    {
        id: 9,
        name: "Tutor LMS Certificate Builder",
        version: "Latest",
        description: "Crea certificados de finalización personalizados y profesionales para tus cursos de Tutor LMS. Editor drag & drop con plantillas premium incluidas.",
        category: "LMS",
        icon: BookOpen,
        iconColor: "text-teal-400",
        iconBg: "bg-teal-500/10 border-teal-500/20",
        accentColor: "from-teal-500/30 via-green-500/10",
        glowColor: "hover:shadow-teal-500/20 hover:border-teal-500/40",
        size: "3.9 MB",
        rating: 5,
        tags: ["Certificados", "Drag & Drop", "Tutor LMS", "Plantillas"],
        file: "tutor-lms-certificate-builder.zip",
    },
    {
        id: 10,
        name: "Polylang Pro (stable)",
        version: "v3.7.6",
        description: "Versión de estabilidad probada de Polylang Pro. Ideal para sitios en producción que requieren máxima compatibilidad antes de actualizar.",
        category: "Multilingual",
        icon: Shield,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        accentColor: "from-emerald-500/30 via-green-500/10",
        glowColor: "hover:shadow-emerald-500/20 hover:border-emerald-500/40",
        size: "1.2 MB",
        rating: 5,
        tags: ["Multilenguaje", "Estable", "SEO", "Producción"],
        file: "Polylang Pro v3.7.6.zip",
    },
]

// ─── Formatea bytes a MB de forma legible ──────────────────────────────────
function formatBytes(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Componente principal ────────────────────────────────────────────────────
export function PluginsShowcase() {
    return (
        <section id="plugins-showcase" className="py-16 md:py-24 relative overflow-hidden">
            {/* Gradient bg */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto space-y-14">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Descarga{" "}
                            <span className="neon-text">Plugins Premium</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Plugins originales listos para instalar en tu WordPress. Sin suscripciones, sin activaciones externas.
                        </p>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-glow" />
                    </div>

                    {/* Grid de plugin cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {PLUGINS.map((plugin) => {
                            const Icon = plugin.icon
                            return (
                                <div
                                    key={plugin.id}
                                    className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl ${plugin.glowColor}`}
                                >
                                    {/* Portada / Header */}
                                    <div className={`relative h-28 flex items-center justify-center bg-gradient-to-br ${plugin.accentColor} to-transparent`}>
                                        {/* Grid pattern decoration */}
                                        <div className="absolute inset-0 hero-grid-pattern opacity-20" />

                                        {/* Big faint icon */}
                                        <Icon
                                            className={`absolute right-3 bottom-2 w-20 h-20 opacity-[0.08] ${plugin.iconColor}`}
                                            strokeWidth={1}
                                        />

                                        {/* Main icon */}
                                        <div className={`relative z-10 p-3.5 rounded-2xl border ${plugin.iconBg} shadow-lg`}>
                                            <Icon className={`w-8 h-8 ${plugin.iconColor}`} />
                                        </div>

                                        {/* Version badge */}
                                        <div className="absolute top-2.5 right-2.5">
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-white/70 border border-white/10 backdrop-blur-sm">
                                                {plugin.version}
                                            </span>
                                        </div>

                                        {/* Category badge */}
                                        <div className="absolute bottom-2.5 left-2.5">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${plugin.iconBg} ${plugin.iconColor}`}>
                                                {plugin.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-4 space-y-3">
                                        {/* Name */}
                                        <h3 className={`font-bold text-base text-white leading-tight group-hover:${plugin.iconColor} transition-colors`}>
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
                                                    className="px-1.5 py-0.5 text-[9px] font-medium bg-white/5 text-gray-400 rounded border border-white/8 leading-none"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Size + Stars */}
                                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-white/5">
                                            <span className="font-mono">{plugin.size}</span>
                                            <div className="flex gap-0.5">
                                                {Array.from({ length: plugin.rating }).map((_, i) => (
                                                    <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Download button(s) */}
                                        <div className="flex flex-col gap-1.5 pt-1">
                                            <a
                                                href={`/plugins/${encodeURIComponent(plugin.file)}`}
                                                download={plugin.file}
                                                className={`flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-white/8 border border-white/10 text-white text-xs font-semibold transition-all duration-200 hover:bg-primary hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]`}
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
                            )
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="text-center pt-4">
                        <p className="text-xs text-muted-foreground">
                            🔒 Archivos originales · Uso personal/cliente · No redistribuir
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
