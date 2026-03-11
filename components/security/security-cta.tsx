"use client"

import { Shield, Mail, MessageCircle, Phone, CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<
  Locale,
  {
    badge: string
    title: string
    highlight: string
    description: string
    includedLabel: string
    included: string[]
    cardTitle: string
    responseTime: string
    whatsappCta: string
    emailCta: string
    directLabel: string
  }
> = {
  es: {
    badge: "EMPIEZA HOY",
    title: "Tu empresa esta",
    highlight: "protegida",
    description:
      "Solicita tu auditoria inicial sin costo. Te entregamos un diagnostico preliminar con riesgos prioritarios y plan de accion.",
    includedLabel: "INCLUIDO EN CADA AUDITORIA",
    included: [
      "Informe ejecutivo completo en PDF",
      "Clasificacion por severidad (CVSS)",
      "Reunion de presentacion de resultados",
      "Soporte post-auditoria 30 dias",
      "Re-test gratuito de hallazgos corregidos",
      "Certificado de seguridad digital",
    ],
    cardTitle: "Auditoria Gratuita",
    responseTime: "Respuesta en menos de 24 horas",
    whatsappCta: "Solicitar por WhatsApp",
    emailCta: "Enviar por Email",
    directLabel: "O escribenos directamente",
  },
  en: {
    badge: "START TODAY",
    title: "Is your company",
    highlight: "protected",
    description:
      "Request your free initial audit. We deliver a preliminary diagnosis with top risks and a concrete action plan.",
    includedLabel: "INCLUDED IN EVERY AUDIT",
    included: [
      "Executive PDF report",
      "Severity classification (CVSS)",
      "Results presentation meeting",
      "30 days of post-audit support",
      "Free re-test of fixed findings",
      "Digital security certificate",
    ],
    cardTitle: "Free Audit",
    responseTime: "Response in under 24 hours",
    whatsappCta: "Request via WhatsApp",
    emailCta: "Send by Email",
    directLabel: "Or contact us directly",
  },
  pt: {
    badge: "COMECE HOJE",
    title: "Sua empresa esta",
    highlight: "protegida",
    description:
      "Solicite sua auditoria inicial gratuita. Entregamos um diagnostico preliminar com riscos prioritarios e plano de acao.",
    includedLabel: "INCLUIDO EM CADA AUDITORIA",
    included: [
      "Relatorio executivo completo em PDF",
      "Classificacao por severidade (CVSS)",
      "Reuniao de apresentacao dos resultados",
      "Suporte pos-auditoria por 30 dias",
      "Re-teste gratuito dos achados corrigidos",
      "Certificado de seguranca digital",
    ],
    cardTitle: "Auditoria Gratuita",
    responseTime: "Resposta em menos de 24 horas",
    whatsappCta: "Solicitar pelo WhatsApp",
    emailCta: "Enviar por Email",
    directLabel: "Ou fale conosco diretamente",
  },
  fr: {
    badge: "COMMENCEZ AUJOURD'HUI",
    title: "Votre entreprise est-elle",
    highlight: "protegee",
    description:
      "Demandez votre audit initial gratuit. Nous livrons un diagnostic preliminaire avec les risques prioritaires et un plan d'action.",
    includedLabel: "INCLUS DANS CHAQUE AUDIT",
    included: [
      "Rapport executif complet en PDF",
      "Classification par severite (CVSS)",
      "Reunion de presentation des resultats",
      "Support post-audit pendant 30 jours",
      "Re-test gratuit des corrections effectuees",
      "Certificat de securite numerique",
    ],
    cardTitle: "Audit Gratuit",
    responseTime: "Reponse en moins de 24 heures",
    whatsappCta: "Demander via WhatsApp",
    emailCta: "Envoyer par Email",
    directLabel: "Ou contactez-nous directement",
  },
  de: {
    badge: "STARTEN SIE HEUTE",
    title: "Ist Ihr Unternehmen",
    highlight: "geschutzt",
    description:
      "Fordern Sie Ihr kostenloses Erst-Audit an. Sie erhalten eine erste Diagnose mit Prioritatsrisiken und Massnahmenplan.",
    includedLabel: "IN JEDEM AUDIT ENTHALTEN",
    included: [
      "Vollstandiger Executive-PDF-Bericht",
      "Schweregrad-Klassifizierung (CVSS)",
      "Ergebnisprasentation",
      "30 Tage Post-Audit-Support",
      "Kostenloser Re-Test behobener Findings",
      "Digitales Sicherheitszertifikat",
    ],
    cardTitle: "Kostenloses Audit",
    responseTime: "Antwort in weniger als 24 Stunden",
    whatsappCta: "Per WhatsApp anfragen",
    emailCta: "Per Email senden",
    directLabel: "Oder direkt kontaktieren",
  },
  it: {
    badge: "INIZIA OGGI",
    title: "La tua azienda e",
    highlight: "protetta",
    description:
      "Richiedi il tuo audit iniziale gratuito. Ti consegniamo una diagnosi preliminare con rischi prioritari e piano d'azione.",
    includedLabel: "INCLUSO IN OGNI AUDIT",
    included: [
      "Report esecutivo completo in PDF",
      "Classificazione per severita (CVSS)",
      "Riunione di presentazione dei risultati",
      "Supporto post-audit per 30 giorni",
      "Re-test gratuito delle vulnerabilita corrette",
      "Certificato di sicurezza digitale",
    ],
    cardTitle: "Audit Gratuito",
    responseTime: "Risposta in meno di 24 ore",
    whatsappCta: "Richiedi via WhatsApp",
    emailCta: "Invia per Email",
    directLabel: "Oppure scrivici direttamente",
  },
}

export function SecurityCta() {
  const { locale } = useLanguage()
  const copy = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-32 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.15)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.2)_0%,transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full bg-primary/20 blur-[80px]"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: `${10 + i * 20}%`,
              left: `${-10 + i * 25}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
              animationDirection: i % 2 === 0 ? "alternate" : "alternate-reverse",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md shadow-[0_0_15px_rgba(0,112,243,0.2)]">
              <Shield className="h-3.5 w-3.5" />
              {copy.badge}
            </div>

            <h2 className="text-3xl font-black leading-[1.1] text-slate-800 md:text-5xl lg:text-6xl dark:text-white">
              {copy.title} <br />{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent [text-shadow:0_0_20px_rgba(0,112,243,0.15)] dark:to-sky-300 dark:[text-shadow:0_0_20px_rgba(0,112,243,0.3)]">
                {copy.highlight}
              </span>
              ?
            </h2>

            <p className="text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              {copy.description}
            </p>

            <div className="space-y-4 rounded-2xl border border-primary/10 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <p className="text-[11px] font-bold tracking-widest text-primary drop-shadow-[0_0_5px_rgba(0,112,243,0.3)] dark:drop-shadow-[0_0_10px_rgba(0,112,243,0.5)]">
                {copy.includedLabel}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {copy.included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-0.5 dark:bg-primary/20">
                      <CheckCircle className="h-3 w-3 shrink-0 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 to-blue-500/30 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-70 motion-reduce:hidden" />

            <div className="relative space-y-6 rounded-3xl border border-white/80 bg-white/80 p-8 shadow-[0_20px_40px_-15px_rgba(0,112,243,0.1)] backdrop-blur-2xl md:p-10 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-2xl">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/5 shadow-[inset_0_0_20px_rgba(0,112,243,0.05)] dark:border-primary/30 dark:bg-primary/10 dark:shadow-[inset_0_0_20px_rgba(0,112,243,0.1)]">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">{copy.cardTitle}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.responseTime}</p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://wa.me/51913259652?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20ciberseguridad%20gratuita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-[0_0_15px_rgba(0,112,243,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,112,243,0.3)] active:scale-95 dark:shadow-[0_0_15px_rgba(0,112,243,0.3)] dark:hover:shadow-[0_0_25px_rgba(0,112,243,0.5)]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {copy.whatsappCta}
                </a>

                <a
                  href="mailto:admin@blxkstudio.com?subject=Auditor%C3%ADa%20de%20Ciberseguridad"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <Mail className="h-5 w-5" />
                  {copy.emailCta}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-4 opacity-50 dark:opacity-50">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                  {copy.directLabel}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/20" />
              </div>

              <a
                href="tel:+51913259652"
                className="inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +51 913 259 652
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
