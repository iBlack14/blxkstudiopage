"use client"

import { memo } from "react"
import { Mail, MapPin, Phone, ExternalLink, MessageCircle } from "lucide-react"
import Link from "next/link"

// Static data - defined outside component to prevent recreation
const CONTACT_INFO = {
  email: "admin@blxkstudio.com",
  phone: "+51 913 259 652",
  location: "Perú",
  whatsapp: "https://wa.me/51913259652",
} as const

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    url: "https://x.com/alvaroblxk",
    label: "@alvaroblxk",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/blxkstudio",
    label: "BLXK Studio",
  },
  {
    name: "GitHub",
    url: "https://github.com/Darksea030",
    label: "Darksea030",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/blxkstudio",
    label: "@blxkstudio",
  },
] as const

const QUICK_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Proyectos", href: "/projects" },
  { name: "Stack Tecnológico", href: "/stack" },
] as const

const LEGAL_LINKS = [
  { name: "Política de Privacidad", href: "/privacy" },
  { name: "Términos de Servicio", href: "/terms" },
] as const

// Social icons as inline SVG strings for better performance
const SocialIcon = memo(function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Twitter":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694L2.306 21.75H-1v-3.308l7.227-8.26L-2.502 2.25h6.514l5.106 6.694L21.75 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "LinkedIn":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      )
    case "GitHub":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    case "Instagram":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
        </svg>
      )
    default:
      return null
  }
})

// Hardcoded year to avoid hydration mismatch (update annually)
const CURRENT_YEAR = 2025

function FooterComponent() {
  return (
    <footer className="w-full bg-gradient-to-b from-background to-background/95 border-t border-primary/10">
      {/* Top CTA Section */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">¿Listo para transformar tu negocio?</h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo podemos impulsar el crecimiento de tu empresa con soluciones tecnológicas innovadoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="px-6 py-2.5 border border-primary/40 text-primary rounded-lg font-semibold text-sm hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Enviar Email
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary/10" />

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4 col-span-1 lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                BLXK STUDIO
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Soluciones Tecnológicas Empresariales</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformamos negocios con desarrollo web, automatización inteligente y soluciones digitales escalables.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60 group-hover:text-primary" />
                  <span className="break-all">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60 group-hover:text-primary" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
                  <span>{CONTACT_INFO.location}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Síguenos</h3>
            <div className="space-y-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  aria-label={`Visita nuestro ${social.name}`}
                >
                  <div className="w-4 h-4 flex items-center justify-center text-primary/60 group-hover:text-primary">
                    <SocialIcon name={social.name} />
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group mt-3 pt-2 border-t border-primary/10"
              >
                <MessageCircle className="w-4 h-4 text-primary/60 group-hover:text-primary" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {CURRENT_YEAR} BLXK Studio. Todos los derechos reservados.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
