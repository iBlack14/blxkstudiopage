"use client"

import { ShieldCheck, Search, Activity, Server, FileText, Siren, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<
  Locale,
  {
    badge: string
    title: string
    titleHighlight: string
    description: string
    cta: string
    services: Array<{
      title: string
      subtitle: string
      description: string
      tags: string[]
    }>
  }
> = {
  es: {
    badge: "NUESTROS SERVICIOS",
    title: "Seguridad de",
    titleHighlight: "extremo a extremo",
    description:
      "Desde el analisis inicial hasta la monitorizacion continua, cubrimos cada vector de ataque de tu ecosistema digital.",
    cta: "Solicitar servicio",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Ataque Controlado",
        description:
          "Simulamos ataques reales a tu aplicacion web, API o red. Identificamos vulnerabilidades criticas antes que los atacantes.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Auditoria de Seguridad Web",
        subtitle: "Analisis Exhaustivo",
        description:
          "Revisamos codigo, configuraciones, dependencias y permisos. Entregamos un reporte con severidad y remediacion.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "Monitoreo SOC 24/7",
        subtitle: "Deteccion en Tiempo Real",
        description:
          "Detectamos anomalias, intrusiones y comportamiento sospechoso en tu infraestructura con monitoreo continuo.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Hardening de Servidores",
        subtitle: "Blindaje de Infraestructura",
        description:
          "Endurecemos servidores Linux o Windows, firewalls y servicios cloud segun mejores practicas.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Consultoria & Cumplimiento",
        subtitle: "Normativa Internacional",
        description:
          "Te ayudamos a cumplir con GDPR, ISO 27001, PCI-DSS y normativas locales con politicas y capacitacion.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Respuesta a Incidentes",
        subtitle: "Contencion y Recuperacion",
        description:
          "Respondemos ante brechas, ransomware y accesos no autorizados con analisis forense y restauracion.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
  en: {
    badge: "OUR SERVICES",
    title: "End-to-end",
    titleHighlight: "security coverage",
    description:
      "From initial assessment to continuous monitoring, we cover every attack vector across your digital ecosystem.",
    cta: "Request service",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Controlled Attack",
        description:
          "We simulate real attacks against your web app, API, or network and uncover critical vulnerabilities before attackers do.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Web Security Audit",
        subtitle: "Exhaustive Analysis",
        description:
          "We review code, configuration, dependencies, and permissions, then deliver a severity-ranked remediation report.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "24/7 SOC Monitoring",
        subtitle: "Real-time Detection",
        description:
          "We detect anomalies, intrusions, and suspicious behavior across your infrastructure with continuous monitoring.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Server Hardening",
        subtitle: "Infrastructure Shielding",
        description:
          "We harden Linux or Windows servers, firewalls, and cloud services according to best practices.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Consulting & Compliance",
        subtitle: "International Standards",
        description:
          "We help you meet GDPR, ISO 27001, PCI-DSS, and local requirements with policies and team training.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Incident Response",
        subtitle: "Containment & Recovery",
        description:
          "We respond to breaches, ransomware, and unauthorized access with forensic analysis and recovery.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
  pt: {
    badge: "NOSSOS SERVICOS",
    title: "Seguranca de",
    titleHighlight: "ponta a ponta",
    description:
      "Da avaliacao inicial ao monitoramento continuo, cobrimos cada vetor de ataque do seu ecossistema digital.",
    cta: "Solicitar servico",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Ataque Controlado",
        description:
          "Simulamos ataques reais contra sua aplicacao web, API ou rede e identificamos vulnerabilidades criticas antes dos invasores.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Auditoria de Seguranca Web",
        subtitle: "Analise Completa",
        description:
          "Revisamos codigo, configuracoes, dependencias e permissoes e entregamos um relatorio com prioridades de correcao.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "Monitoramento SOC 24/7",
        subtitle: "Deteccao em Tempo Real",
        description:
          "Detectamos anomalias, intrusoes e comportamento suspeito em toda a sua infraestrutura com monitoramento continuo.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Hardening de Servidores",
        subtitle: "Blindagem de Infraestrutura",
        description:
          "Endurecemos servidores Linux ou Windows, firewalls e servicos cloud seguindo melhores praticas.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Consultoria & Compliance",
        subtitle: "Normas Internacionais",
        description:
          "Ajudamos voce a atender GDPR, ISO 27001, PCI-DSS e requisitos locais com politicas e treinamento.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Resposta a Incidentes",
        subtitle: "Contencao e Recuperacao",
        description:
          "Respondemos a violacoes, ransomware e acessos nao autorizados com analise forense e recuperacao.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
  fr: {
    badge: "NOS SERVICES",
    title: "Securite de",
    titleHighlight: "bout en bout",
    description:
      "De l'evaluation initiale a la surveillance continue, nous couvrons chaque vecteur d'attaque de votre ecosysteme numerique.",
    cta: "Demander le service",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Attaque Controlee",
        description:
          "Nous simulons de vraies attaques contre votre application web, votre API ou votre reseau pour detecter les failles critiques.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Audit de Securite Web",
        subtitle: "Analyse Complete",
        description:
          "Nous examinons le code, la configuration, les dependances et les permissions puis livrons un plan de remediation priorise.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "Surveillance SOC 24/7",
        subtitle: "Detection en Temps Reel",
        description:
          "Nous detectons les anomalies, intrusions et comportements suspects sur toute votre infrastructure.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Durcissement des Serveurs",
        subtitle: "Protection de l'Infrastructure",
        description:
          "Nous renforcons les serveurs Linux ou Windows, les firewalls et les services cloud selon les meilleures pratiques.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Conseil & Conformite",
        subtitle: "Normes Internationales",
        description:
          "Nous vous aidons a respecter le GDPR, l'ISO 27001, le PCI-DSS et les exigences locales avec politiques et formation.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Reponse aux Incidents",
        subtitle: "Confinement et Reprise",
        description:
          "Nous intervenons sur les breches, les ransomwares et les acces non autorises avec analyse forensique et restauration.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
  de: {
    badge: "UNSERE SERVICES",
    title: "Ganzheitliche",
    titleHighlight: "Sicherheitsabdeckung",
    description:
      "Von der Erstbewertung bis zum laufenden Monitoring decken wir jeden Angriffsvektor Ihrer digitalen Infrastruktur ab.",
    cta: "Service anfragen",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Kontrollierter Angriff",
        description:
          "Wir simulieren echte Angriffe auf Ihre Webanwendung, API oder Ihr Netzwerk und finden kritische Schwachstellen fruhzeitig.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Web-Sicherheitsaudit",
        subtitle: "Umfassende Analyse",
        description:
          "Wir prufen Code, Konfigurationen, Abhangigkeiten und Berechtigungen und liefern einen priorisierten Massnahmenplan.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "24/7 SOC Monitoring",
        subtitle: "Echtzeit-Erkennung",
        description:
          "Wir erkennen Anomalien, Einbruche und verdachtiges Verhalten in Ihrer gesamten Infrastruktur durch kontinuierliches Monitoring.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Server Hardening",
        subtitle: "Infrastruktur Absicherung",
        description:
          "Wir harten Linux- oder Windows-Server, Firewalls und Cloud-Dienste nach Best Practices ab.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Beratung & Compliance",
        subtitle: "Internationale Standards",
        description:
          "Wir unterstutzen Sie bei GDPR, ISO 27001, PCI-DSS und lokalen Vorgaben mit Richtlinien und Schulungen.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Incident Response",
        subtitle: "Eindammung und Recovery",
        description:
          "Wir reagieren auf Sicherheitsvorfalle, Ransomware und unbefugte Zugriffe mit Forensik und Wiederherstellung.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
  it: {
    badge: "I NOSTRI SERVIZI",
    title: "Sicurezza",
    titleHighlight: "end-to-end",
    description:
      "Dalla valutazione iniziale al monitoraggio continuo, copriamo ogni vettore di attacco del tuo ecosistema digitale.",
    cta: "Richiedi servizio",
    services: [
      {
        title: "Pentesting & Ethical Hacking",
        subtitle: "Attacco Controllato",
        description:
          "Simuliamo attacchi reali contro la tua applicazione web, API o rete per individuare vulnerabilita critiche prima degli attaccanti.",
        tags: ["OWASP Top 10", "BURP Suite", "Metasploit"],
      },
      {
        title: "Audit di Sicurezza Web",
        subtitle: "Analisi Completa",
        description:
          "Esaminiamo codice, configurazioni, dipendenze e permessi e consegniamo un report con priorita di remediation.",
        tags: ["Code Review", "SAST/DAST", "CVE Analysis"],
      },
      {
        title: "Monitoraggio SOC 24/7",
        subtitle: "Rilevamento in Tempo Reale",
        description:
          "Rileviamo anomalie, intrusioni e comportamenti sospetti su tutta la tua infrastruttura con monitoraggio continuo.",
        tags: ["SIEM", "IDS/IPS", "Log Analysis"],
      },
      {
        title: "Hardening dei Server",
        subtitle: "Protezione dell'Infrastruttura",
        description:
          "Rafforziamo server Linux o Windows, firewall e servizi cloud secondo le migliori pratiche.",
        tags: ["CIS Benchmarks", "Firewall Rules", "Zero Trust"],
      },
      {
        title: "Consulenza & Compliance",
        subtitle: "Standard Internazionali",
        description:
          "Ti aiutiamo a rispettare GDPR, ISO 27001, PCI-DSS e requisiti locali con policy e formazione del team.",
        tags: ["ISO 27001", "GDPR", "PCI-DSS"],
      },
      {
        title: "Incident Response",
        subtitle: "Contenimento e Recovery",
        description:
          "Interveniamo su breach, ransomware e accessi non autorizzati con analisi forense e ripristino.",
        tags: ["DFIR", "Forensics", "Recovery"],
      },
    ],
  },
}

const ICONS = [Search, ShieldCheck, Activity, Server, FileText, Siren] as const

export function SecurityServices() {
  const { locale } = useLanguage()
  const copy = COPY[locale]

  return (
    <section
      id="servicios-seguridad"
      className="relative overflow-hidden bg-slate-50 py-16 md:py-24 dark:bg-slate-950"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,112,243,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,112,243,0.08)_0%,transparent_40%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.08)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] dark:[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-14 space-y-4 text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5" />
            {copy.badge}
          </div>
          <h2 className="text-3xl font-black text-slate-900 md:text-5xl dark:text-slate-100">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:to-blue-400">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-700 md:text-base dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 focus-within:relative md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {copy.services.map((service, index) => {
            const Icon = ICONS[index]
            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,112,243,0.15)] dark:border-white/5 dark:bg-slate-900/50 dark:shadow-sm dark:hover:shadow-[0_20px_40px_-15px_rgba(0,112,243,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <div className="relative z-10">
                  <p className="mb-2 text-xs font-bold tracking-wider text-primary">{service.subtitle}</p>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 mb-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                  {copy.cta} <ArrowRight className="h-4 w-4" />
                </div>

                <div className="absolute -right-2 top-4 select-none text-8xl font-black text-slate-900/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 dark:text-white/5">
                  0{index + 1}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
