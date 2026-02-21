"use client"

import { Check, X } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"

export function ProjectsComparison() {
  const { locale } = useLanguage()
  const copy = {
    es: {
      title: "Por que elegirnos",
      subtitle: "Comparacion de caracteristicas y capacidades",
      featureCol: "Caracteristica",
      genericCol: "Soluciones Genericas",
      features: ["Integracion WhatsApp", "Automatizacion N8N", "Dashboard Personalizado", "Soporte 24/7", "Escalabilidad Ilimitada", "Seguridad Enterprise", "API Documentada", "ROI Garantizado"],
    },
    en: {
      title: "Why choose us",
      subtitle: "Feature and capability comparison",
      featureCol: "Feature",
      genericCol: "Generic Solutions",
      features: ["WhatsApp Integration", "N8N Automation", "Custom Dashboard", "24/7 Support", "Unlimited Scalability", "Enterprise Security", "Documented API", "Guaranteed ROI"],
    },
    pt: {
      title: "Por que nos escolher",
      subtitle: "Comparacao de recursos e capacidades",
      featureCol: "Recurso",
      genericCol: "Solucoes Genericas",
      features: ["Integracao WhatsApp", "Automacao N8N", "Dashboard Personalizado", "Suporte 24/7", "Escalabilidade Ilimitada", "Seguranca Enterprise", "API Documentada", "ROI Garantido"],
    },
    fr: {
      title: "Pourquoi nous choisir",
      subtitle: "Comparaison des fonctionnalites et capacites",
      featureCol: "Fonctionnalite",
      genericCol: "Solutions Generiques",
      features: ["Integration WhatsApp", "Automatisation N8N", "Dashboard Personnalise", "Support 24/7", "Scalabilite Illimitee", "Securite Enterprise", "API Documentee", "ROI Garanti"],
    },
    de: {
      title: "Warum uns waehlen",
      subtitle: "Vergleich von Funktionen und Faehigkeiten",
      featureCol: "Funktion",
      genericCol: "Generische Loesungen",
      features: ["WhatsApp-Integration", "N8N-Automatisierung", "Individuelles Dashboard", "24/7 Support", "Unbegrenzte Skalierung", "Enterprise-Sicherheit", "Dokumentierte API", "Garantierter ROI"],
    },
    it: {
      title: "Perche sceglierci",
      subtitle: "Confronto tra funzionalita e capacita",
      featureCol: "Funzionalita",
      genericCol: "Soluzioni Generiche",
      features: ["Integrazione WhatsApp", "Automazione N8N", "Dashboard Personalizzata", "Supporto 24/7", "Scalabilita Illimitata", "Sicurezza Enterprise", "API Documentata", "ROI Garantito"],
    },
  }[locale]

  const genericFlags = [false, false, true, false, false, true, true, false]
  const features = copy.features.map((name, idx) => ({ name, blxk: true, generic: genericFlags[idx] }))

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text">{copy.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-primary/20">
            <table className="w-full">
              <thead className="bg-primary/5 border-b border-primary/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">{copy.featureCol}</th>
                  <th className="px-6 py-4 text-center font-semibold text-primary">BLXK Studio</th>
                  <th className="px-6 py-4 text-center font-semibold text-muted-foreground">{copy.genericCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {features.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {feature.blxk ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.generic ? (
                        <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
