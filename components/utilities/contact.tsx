"use client"

import { useState } from "react"
import { Mail, MapPin, Building2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectFormModal } from "@/components/projects/project-form-modal"

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const industries = [
    "Agencias de turismo y hospitalidad",
    "Retail y comercio electronico",
    "Startups tecnologicas y SaaS",
    "Instituciones educativas",
    "Emprendedores y consultores independientes",
    "Equipos internos de automatizacion y IT",
  ]

  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/51953576234?text=Hola%20BLXK%20Studio,%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios",
      "_blank",
    )
  }

  return (
    <section id="contact" className="py-14 md:py-24 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-16">
          <div className="space-y-6 md:space-y-8">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold neon-text-sm">Sectores e Industrias</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Experiencia comprobada en multiples sectores
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="neon-card p-4 md:p-5 rounded-lg flex items-center gap-3 transition-all cursor-pointer group md:hover:scale-105 min-w-0"
                >
                  <div className="w-2 h-2 rounded-full bg-primary neon-glow group-hover:scale-150 transition-transform" />
                  <span className="text-sm md:text-base text-foreground break-words">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="neon-card-rotating p-5 sm:p-8 md:p-12 rounded-lg space-y-7 md:space-y-10 overflow-x-clip">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold neon-text-sm">Contacto</h2>
              <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed md:leading-loose">
                Listo para transformar tu negocio? Hablemos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 font-semibold">Email</p>
                  <a
                    href="mailto:admin@blxkstudio.com"
                    className="text-sm md:text-base text-foreground hover:text-primary transition-colors hover:neon-text-sm break-all"
                  >
                    admin@blxkstudio.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 font-semibold">Ubicacion</p>
                  <p className="text-sm md:text-base text-foreground">Lima, Peru</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 font-semibold">Especialidades</p>
                  <p className="text-sm md:text-base text-foreground">Desarrollo web - Automatizacion - IA</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Iniciar Proyecto
              </Button>
              <Button
                size="lg"
                onClick={handleWhatsAppContact}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent backdrop-blur-sm transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProjectFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
