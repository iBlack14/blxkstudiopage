"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { DEFAULT_LOCALE, getLocaleFromPathname, Locale } from "@/lib/i18n"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const COPY: Record<
  Locale,
  {
    title: string
    description: string
    retry: string
    home: string
    supportPrefix: string
    supportLink: string
    errorId: string
  }
> = {
  es: {
    title: "Algo salio mal",
    description:
      "Encontramos un error inesperado. Intenta de nuevo o contactanos si el problema persiste.",
    retry: "Intentar de Nuevo",
    home: "Ir a Inicio",
    supportPrefix: "Necesitas ayuda?",
    supportLink: "Contacta con nuestro equipo",
    errorId: "Error ID:",
  },
  en: {
    title: "Something went wrong",
    description:
      "We hit an unexpected error. Please try again or contact us if the problem continues.",
    retry: "Try Again",
    home: "Go Home",
    supportPrefix: "Need help?",
    supportLink: "Contact our team",
    errorId: "Error ID:",
  },
  pt: {
    title: "Algo deu errado",
    description:
      "Encontramos um erro inesperado. Tente novamente ou fale conosco se o problema continuar.",
    retry: "Tentar Novamente",
    home: "Ir para Inicio",
    supportPrefix: "Precisa de ajuda?",
    supportLink: "Fale com nossa equipe",
    errorId: "ID do erro:",
  },
  fr: {
    title: "Une erreur est survenue",
    description:
      "Nous avons rencontre une erreur inattendue. Reessayez ou contactez-nous si le probleme persiste.",
    retry: "Reessayer",
    home: "Retour a l'accueil",
    supportPrefix: "Besoin d'aide ?",
    supportLink: "Contactez notre equipe",
    errorId: "ID erreur :",
  },
  de: {
    title: "Etwas ist schiefgelaufen",
    description:
      "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.",
    retry: "Erneut versuchen",
    home: "Zur Startseite",
    supportPrefix: "Brauchen Sie Hilfe?",
    supportLink: "Kontaktieren Sie unser Team",
    errorId: "Fehler-ID:",
  },
  it: {
    title: "Si e verificato un errore",
    description:
      "Abbiamo riscontrato un errore imprevisto. Riprova o contattaci se il problema continua.",
    retry: "Riprova",
    home: "Vai alla Home",
    supportPrefix: "Hai bisogno di aiuto?",
    supportLink: "Contatta il nostro team",
    errorId: "ID errore:",
  },
}

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname()
  const locale = useMemo(() => getLocaleFromPathname(pathname || "/") || DEFAULT_LOCALE, [pathname])
  const copy = COPY[locale]

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-2xl space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{copy.title}</h1>
          <p className="text-lg text-muted-foreground">{copy.description}</p>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-left">
            <p className="break-words font-mono text-xs text-red-400">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                {copy.errorId} {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="neon-glow w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            {copy.retry}
          </Button>
          <Link href={`/${locale}`}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {copy.home}
            </Button>
          </Link>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="text-sm text-muted-foreground">
            {copy.supportPrefix}{" "}
            <Link href={`/${locale}/contacto`} className="font-semibold text-primary hover:underline">
              {copy.supportLink}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
