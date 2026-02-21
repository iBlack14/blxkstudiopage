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
  Rocket,
  Code,
  Cpu,
  Layers,
  TrendingUp,
  Target,
  Lightbulb,
  Palette,
  Wind,
  Database,
  Shield,
  Server,
} from "lucide-react"

interface ServiceIconProps {
  serviceId: number
  className?: string
  size?: number
}

// Comprehensive mapping by slug - works with both i18n and services-data.ts
export const ICON_BY_SLUG: Record<string, React.ComponentType<any>> = {
  // Web Development (multiple languages)
  "paginas-web": Code,                     // Spanish: Web Pages
  "desarrollo-web": Rocket,                // Spanish: Web Development
  "web-development": Rocket,               // English: Web Development
  "desenvolvimento-web": Rocket,           // Portuguese: Web Development
  "developpement-web": Rocket,             // French: Web Development
  
  // E-commerce
  "ecommerce": ShoppingCart,               // E-commerce (all languages)
  
  // Hosting
  "hosting": Server,                       // Hosting (all languages)
  
  // Marketing & Digital
  "marketing": Megaphone,                  // English variant
  "marketing-digital": Megaphone,          // Spanish/Portuguese: Digital Marketing
  
  // From services-data.ts (Spanish)
  "corporativas": Building2,               // Corporate
  "lms": BookOpen,                         // Learning Management System
  "automations": Zap,                      // Automations
  "homers": UtensilsCrossed,               // Food Business
  "tas": Truck,                            // Logistics
  "rebrotal": Package,                     // Rebrotal
  "estudios": Palette,                     // Design/Studies
  
  // Additional services
  "app-movil": Smartphone,                 // Spanish: Mobile App
  "app-mobile": Smartphone,                // English: Mobile App
  "analytics": BarChart3,                  // Analytics & Reporting
  "seguridad": Shield,                     // Spanish: Security
  "security": Shield,                      // English: Security
  
  // Additional flexibility mappings
  "software": Code,
  "diseño": Palette,
  "design": Palette,
  "consultoría": Lightbulb,
  "consulting": Lightbulb,
  "datos": Database,
  "data": Database,
  "cloud": Wind,
}

export function getIconBySlugs(slug: string) {
  return ICON_BY_SLUG[slug] || Globe
}

// Mapping of service IDs to Lucide icons
const ICON_MAP: Record<number, React.ComponentType<any>> = {
  1: Code,            // Páginas Web Profesionales
  2: Building2,       // Páginas Corporativas  
  3: ShoppingCart,    // E-commerce
  4: BookOpen,        // LMS / Educación
  5: Zap,             // Automatizaciones
  6: UtensilsCrossed, // Homers
  7: Truck,           // TAS
  8: Package,         // Rebrotal
  9: Smartphone,      // App Móvil
  10: BarChart3,      // Analytics
  11: Shield,         // Seguridad
  12: Megaphone,      // Marketing Digital
}

export function ServiceIcon({ serviceId, className = "w-6 h-6", size }: ServiceIconProps) {
  const IconComponent = ICON_MAP[serviceId]

  if (!IconComponent) {
    return <Globe className={className} strokeWidth={1.5} />
  }

  return <IconComponent className={className} strokeWidth={1.5} />
}

// For displaying icon names in debug mode
export const ICON_NAMES: Record<number, string> = {
  1: "Code",
  2: "Building2",
  3: "ShoppingCart",
  4: "BookOpen",
  5: "Zap",
  6: "UtensilsCrossed",
  7: "Truck",
  8: "Package",
  9: "Smartphone",
  10: "BarChart3",
  11: "Shield",
  12: "Megaphone",
}
