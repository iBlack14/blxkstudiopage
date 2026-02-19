"use client"

import { useLanguage } from "@/components/layout/language-provider"

import { useState } from "react"
import { Mail, MapPin, Building2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectFormModal } from "./project-form-modal"

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const { m } = useLanguage()
  const industries = m.contact?.industries || []

  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/51953576234?text=Hola%20BLXK%20Studio,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
      "_blank",
    )
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Industries */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">{m.contact?.sectorsTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {m.contact?.sectorsSubtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="neon-card p-5 rounded-lg flex items-center gap-3 hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary neon-glow group-hover:scale-150 transition-transform" />
                  <span className="text-base text-foreground">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="neon-card-rotating p-12 rounded-lg space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold neon-text-sm">{m.contact?.contactTitle}</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-loose">
                {m.contact?.contactSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base text-muted-foreground mb-2 font-semibold">{m.contact?.emailLabel}</p>
                  <a
                    href="mailto:admin@blxkstudio.com"
                    className="text-base text-foreground hover:text-primary transition-colors hover:neon-text-sm"
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
                  <p className="text-base text-muted-foreground mb-2 font-semibold">{m.contact?.locationLabel}</p>
                  <p className="text-base text-foreground">{m.contact?.locationValue}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base text-muted-foreground mb-2 font-semibold">{m.contact?.specialtiesLabel}</p>
                  <p className="text-base text-foreground">{m.contact?.specialtiesValue}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
              >
                {m.contact?.ctaStart}
              </Button>
              <Button
                size="lg"
                onClick={handleWhatsAppContact}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {m.contact?.ctaWhatsapp}
              </Button>
            </div>
          </div>


        </div>
      </div>

      <ProjectFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
