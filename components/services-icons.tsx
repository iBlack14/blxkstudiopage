import {
  AppWindow,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Clapperboard,
  Code2,
  Gauge,
  GraduationCap,
  Handshake,
  Package,
  Palette,
  PlugZap,
  ShieldCheck,
  ShoppingCart,
  Target,
  Truck,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react"

const serviceIconById: Record<number, LucideIcon> = {
  1: Code2,
  2: Building2,
  3: ShoppingCart,
  4: GraduationCap,
  5: Workflow,
  6: UtensilsCrossed,
  7: Truck,
  8: Package,
  9: PlugZap,
  10: AppWindow,
  11: BriefcaseBusiness,
  12: Clapperboard,
}

type ServiceIconProps = {
  serviceId: number
  className?: string
}

export function ServiceIcon({ serviceId, className = "h-8 w-8" }: ServiceIconProps) {
  const Icon = serviceIconById[serviceId] || BriefcaseBusiness
  return <Icon className={className} />
}

export const servicesTrustItems: Array<{
  title: string
  desc: string
  icon: LucideIcon
}> = [
  { icon: Gauge, title: "Performance", desc: "Core Web Vitals 90+" },
  { icon: Target, title: "ROI", desc: "Enfoque en resultados de negocio" },
  { icon: ShieldCheck, title: "Security", desc: "Infraestructura enterprise-grade" },
  { icon: ChartNoAxesCombined, title: "Scale", desc: "Arquitectura lista para crecer" },
  { icon: Handshake, title: "Support", desc: "Acompanamiento continuo" },
  { icon: Palette, title: "UX/UI", desc: "Diseno premium y usable" },
]
