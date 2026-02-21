import {
  Globe,
  Building2,
  ShoppingCart,
  BookOpen,
  Zap,
  UtensilsCrossed,
  Truck,
  Package,
  Smartphone,
  BarChart3,
  Lock,
  Megaphone,
} from "lucide-react"

interface ServiceIconProps {
  serviceId: number
  className?: string
  size?: number
}

// Mapping of service IDs to Lucide icons
const ICON_MAP: Record<number, React.ComponentType<any>> = {
  1: Globe,           // Páginas Web Profesionales
  2: Building2,       // Páginas Corporativas
  3: ShoppingCart,    // E-commerce
  4: BookOpen,        // LMS / Educación
  5: Zap,             // Automatizaciones
  6: UtensilsCrossed, // Homers
  7: Truck,           // TAS
  8: Package,         // Rebrotal
  9: Smartphone,      // App Móvil
  10: BarChart3,      // Analytics
  11: Lock,           // Seguridad
  12: Megaphone,      // Marketing Digital
}

export function ServiceIcon({ serviceId, className = "w-6 h-6", size }: ServiceIconProps) {
  const IconComponent = ICON_MAP[serviceId]

  if (!IconComponent) {
    // Fallback si no existe el icono
    return <Globe className={className} />
  }

  const sizeNum = size || parseInt(className.match(/w-(\d+)/)?.[1] || "6")

  return <IconComponent className={className} strokeWidth={1.5} />
}

// Helper to get icon by service slug
export const ICON_BY_SLUG: Record<string, React.ComponentType<any>> = {
  // From services-data.ts
  "paginas-web": Globe,
  "corporativas": Building2,
  "ecommerce": ShoppingCart,
  "lms": BookOpen,
  "automations": Zap,
  "homers": UtensilsCrossed,
  "tas": Truck,
  "rebrotal": Package,
  "estudios": BookOpen,
  // Additional mappings for i18n
  "desarrollo-web": Globe,
  "app-movil": Smartphone,
  "analytics": BarChart3,
  "hosting": Lock,
  "seguridad": Lock,
  "marketing-digital": Megaphone,
}

export function getIconBySlugs(slug: string) {
  return ICON_BY_SLUG[slug] || Globe
}

// For displaying icon names in debug mode
export const ICON_NAMES: Record<number, string> = {
  1: "Globe",
  2: "Building2",
  3: "ShoppingCart",
  4: "BookOpen",
  5: "Zap",
  6: "UtensilsCrossed",
  7: "Truck",
  8: "Package",
  9: "Smartphone",
  10: "BarChart3",
  11: "Lock",
  12: "Megaphone",
}
