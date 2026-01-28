'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Algo salió mal
          </h1>
          <p className="text-lg text-muted-foreground">
            Encontramos un error inesperado. Por favor, intenta de nuevo o contacta con nosotros si el problema persiste.
          </p>
        </div>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-left">
            <p className="text-xs font-mono text-red-400 break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={reset}
            size="lg"
            className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Intentar de Nuevo
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Ir a Inicio
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <div className="pt-8 border-t border-primary/20">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda?{' '}
            <Link
              href="/contacto"
              className="text-primary hover:underline font-semibold"
            >
              Contacta con nuestro equipo
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
