import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Large 404 */}
        <div className="space-y-2">
          <h1 className="text-9xl md:text-10xl font-black neon-text tracking-tighter">404</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Página no encontrada
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Pero tranquilo, hay muchas cosas interesantes por explorar en BLXK Studio.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href="/">
            <Button size="lg" className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Ir a Inicio
            </Button>
          </Link>
          <Link href="/servicios">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Ver Servicios
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-primary/20">
          <p className="text-sm text-muted-foreground mb-4">Enlaces rápidos:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/nosotros', label: 'Nosotros' },
              { href: '/servicios', label: 'Servicios' },
              { href: '/projects', label: 'Portafolio' },
              { href: '/contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
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
