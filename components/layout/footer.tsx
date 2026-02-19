"use client"

import { memo } from "react"
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

const SOCIAL_ICON_MAP: Record<string, string> = {
  Twitter: "/social/x.svg",
  LinkedIn: "/social/linkedin.svg",
  GitHub: "/social/github.svg",
  Instagram: "/social/instagram.svg",
}

const SOCIAL_ICON_CLASS_MAP: Record<string, string> = {
  Twitter: "dark:invert",
  GitHub: "dark:invert",
}

const WHATSAPP_ICON = "/social/whatsapp.svg"

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
              <Image
                src={WHATSAPP_ICON}
                alt="Icono de WhatsApp"
                width={16}
                height={16}
                className="opacity-90"
              />
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
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
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
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Image
                      src={SOCIAL_ICON_MAP[social.name] || "/placeholder.svg"}
                      alt={`Icono de ${social.name}`}
                      width={16}
                      height={16}
                      className={`opacity-70 group-hover:opacity-100 ${SOCIAL_ICON_CLASS_MAP[social.name] || ""}`}
                    />
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
                <Image
                  src={WHATSAPP_ICON}
                  alt="Icono de WhatsApp"
                  width={16}
                  height={16}
                  className="opacity-70 group-hover:opacity-100"
                />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 py-4 md:py-8">
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
