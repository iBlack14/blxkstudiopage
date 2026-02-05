"use client"

import { useState, useEffect, useRef, useMemo, memo, useCallback, lazy, Suspense } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Info, Briefcase, Code, FolderOpen, Mail } from "lucide-react"

// Lazy load modal only when needed
const ProjectFormModal = lazy(() =>
  import("../projects/project-form-modal").then(m => ({ default: m.ProjectFormModal }))
)

// Static nav items - defined outside component
const NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: Home, id: "hero" },
  { label: "Nosotros", href: "/nosotros", icon: Info, id: "about" },
  { label: "Servicios", href: "/servicios", icon: Briefcase, id: "services" },
  { label: "Stack", href: "/stack", icon: Code, id: "tech" },
  { label: "Portafolio", href: "/projects", icon: FolderOpen, id: "portfolio" },
  { label: "Contacto", href: "/contacto", icon: Mail, id: "contact" },
] as const



const ROUTE_TO_SECTION: Record<string, string> = {
  "/": "hero",
  "/nosotros": "about",
  "/servicios": "services",
  "/stack": "tech",
  "/projects": "portfolio",
  "/portfolio": "portfolio",
  "/contacto": "contact",
}

// Memoized nav link component
const NavLink = memo(function NavLink({
  item,
  isActive
}: {
  item: typeof NAV_ITEMS[number]
  isActive: boolean
}) {
  return (
    <Link
      href={item.href}
      className={`text-sm transition-colors duration-200 ${isActive
        ? "text-primary neon-text-sm"
        : "text-muted-foreground hover:text-primary"
        }`}
    >
      {item.label}
    </Link>
  )
})

// Memoized mobile nav link
const MobileNavLink = memo(function MobileNavLink({
  item,
  isActive,
  index
}: {
  item: typeof NAV_ITEMS[number]
  isActive: boolean
  index: number
}) {
  const Icon = item.icon
  return (
    <Link
      key={`${item.href}-${index}`}
      href={item.href}
      data-section={item.id}
      className={`flex flex-col items-center gap-1 transition-all duration-200 px-4 py-2 rounded-lg flex-shrink-0 ${isActive
        ? "text-primary neon-text-sm bg-primary/10 neon-border"
        : "text-muted-foreground hover:text-primary active:scale-95"
        }`}
    >
      <Icon size={20} className="stroke-current" />
      <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
    </Link>
  )
})

function NavigationContent() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const activeSection = useMemo(() => ROUTE_TO_SECTION[pathname] || "hero", [pathname])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openForm = useCallback(() => setIsFormOpen(true), [])
  const closeForm = useCallback(() => setIsFormOpen(false), [])

  // Render immediately for SSR
  // if (!mounted) return null

  return (
    <>
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold neon-text font-mono">
              BLXK STUDIO
            </Link>

            <div className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={activeSection === item.id}
                />
              ))}
              <Button
                onClick={openForm}
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Iniciar Proyecto
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,255,255,0.2)] w-full overflow-hidden">
        <div
          className="flex items-center gap-2 px-2 py-3 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV_ITEMS.map((item, index) => (
            <MobileNavLink
              key={`${item.href}-${index}`}
              item={item}
              isActive={activeSection === item.id}
              index={index}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Top Header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 border-0 overflow-visible"
        style={{
          boxShadow: 'none',
          borderBottom: 'none',
          border: 'none',
          background: 'transparent',
          backdropFilter: 'none'
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-center relative" style={{ border: 'none', boxShadow: 'none' }}>
          <Link href="/" className="text-xl font-bold neon-text font-mono text-center" style={{ border: 'none' }}>
            BLXK STUDIO
          </Link>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={openForm}
              className="h-8 w-8 text-primary rounded-full hover:bg-primary/10"
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal - Only rendered when open */}
      {isFormOpen && (
        <Suspense fallback={null}>
          <ProjectFormModal isOpen={isFormOpen} onClose={closeForm} />
        </Suspense>
      )}

      {/* Global styles moved to globals.css */}
    </>
  )
}

export const Navigation = memo(NavigationContent)
