import Link from "next/link"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { DEFAULT_LOCALE, isLocale, Locale } from "@/lib/i18n"

const COPY: Record<
  Locale,
  {
    title: string
    description: string
    home: string
    services: string
    quickLinks: string
    links: Array<{ slug: string; label: string }>
  }
> = {
  es: {
    title: "Pagina no encontrada",
    description:
      "Lo sentimos, la pagina que buscas no existe o fue movida. Pero aun hay muchas cosas utiles por explorar en BLXK Studio.",
    home: "Ir a Inicio",
    services: "Ver Servicios",
    quickLinks: "Enlaces rapidos:",
    links: [
      { slug: "", label: "Inicio" },
      { slug: "/nosotros", label: "Nosotros" },
      { slug: "/servicios", label: "Servicios" },
      { slug: "/projects", label: "Portafolio" },
      { slug: "/contacto", label: "Contacto" },
    ],
  },
  en: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has moved. There is still plenty to explore at BLXK Studio.",
    home: "Go Home",
    services: "View Services",
    quickLinks: "Quick links:",
    links: [
      { slug: "", label: "Home" },
      { slug: "/nosotros", label: "About" },
      { slug: "/servicios", label: "Services" },
      { slug: "/projects", label: "Portfolio" },
      { slug: "/contacto", label: "Contact" },
    ],
  },
  pt: {
    title: "Pagina nao encontrada",
    description:
      "A pagina que voce procura nao existe ou foi movida. Ainda ha muito para explorar na BLXK Studio.",
    home: "Ir para Inicio",
    services: "Ver Servicos",
    quickLinks: "Links rapidos:",
    links: [
      { slug: "", label: "Inicio" },
      { slug: "/nosotros", label: "Sobre" },
      { slug: "/servicios", label: "Servicos" },
      { slug: "/projects", label: "Portfolio" },
      { slug: "/contacto", label: "Contato" },
    ],
  },
  fr: {
    title: "Page introuvable",
    description:
      "La page recherchee n'existe pas ou a ete deplacee. Il reste encore beaucoup a decouvrir chez BLXK Studio.",
    home: "Retour a l'accueil",
    services: "Voir les Services",
    quickLinks: "Liens rapides :",
    links: [
      { slug: "", label: "Accueil" },
      { slug: "/nosotros", label: "A propos" },
      { slug: "/servicios", label: "Services" },
      { slug: "/projects", label: "Portfolio" },
      { slug: "/contacto", label: "Contact" },
    ],
  },
  de: {
    title: "Seite nicht gefunden",
    description:
      "Die gesuchte Seite existiert nicht oder wurde verschoben. Bei BLXK Studio gibt es weiterhin viel zu entdecken.",
    home: "Zur Startseite",
    services: "Services ansehen",
    quickLinks: "Schnellzugriffe:",
    links: [
      { slug: "", label: "Start" },
      { slug: "/nosotros", label: "Uber uns" },
      { slug: "/servicios", label: "Services" },
      { slug: "/projects", label: "Portfolio" },
      { slug: "/contacto", label: "Kontakt" },
    ],
  },
  it: {
    title: "Pagina non trovata",
    description:
      "La pagina che cerchi non esiste o e stata spostata. C'e ancora molto da esplorare su BLXK Studio.",
    home: "Vai alla Home",
    services: "Vedi Servizi",
    quickLinks: "Link rapidi:",
    links: [
      { slug: "", label: "Home" },
      { slug: "/nosotros", label: "Chi siamo" },
      { slug: "/servicios", label: "Servizi" },
      { slug: "/projects", label: "Portfolio" },
      { slug: "/contacto", label: "Contatto" },
    ],
  },
}

export default async function NotFound() {
  const localeHeader = (await headers()).get("x-blxk-locale")
  const locale = isLocale(localeHeader) ? localeHeader : DEFAULT_LOCALE
  const copy = COPY[locale]

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-2xl space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="neon-text text-9xl font-black tracking-tighter md:text-10xl">404</h1>
          <div className="mx-auto h-1 w-32 bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">{copy.title}</h2>
          <p className="text-lg text-muted-foreground md:text-xl">{copy.description}</p>
        </div>

        <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
          <Link href={`/${locale}`}>
            <Button size="lg" className="neon-glow w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              {copy.home}
            </Button>
          </Link>
          <Link href={`/${locale}/servicios`}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {copy.services}
            </Button>
          </Link>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="mb-4 text-sm text-muted-foreground">{copy.quickLinks}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {copy.links.map((link) => (
              <Link
                key={link.slug || link.label}
                href={`/${locale}${link.slug}`}
                className="rounded-full border border-primary/30 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
