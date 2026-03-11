"use client"

import { Lock, AlertTriangle, Code, Zap, Network, Database, Mail } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

type RiskKey = "critical" | "high" | "medium"

const COPY: Record<
  Locale,
  {
    badge: string
    title: string
    titleHighlight: string
    description: string
    defenseLabel: string
    riskLabels: Record<RiskKey, string>
    threats: Array<{ name: string; risk: RiskKey; description: string; mitigation: string }>
  }
> = {
  es: {
    badge: "AMENAZAS QUE NEUTRALIZAMOS",
    title: "Conoce al",
    titleHighlight: "enemigo",
    description:
      "Te mostramos ataques frecuentes y como los bloqueamos con controles tecnicos y operativos.",
    defenseLabel: "NUESTRA DEFENSA",
    riskLabels: { critical: "CRITICO", high: "ALTO", medium: "MEDIO" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Ataques por email o mensajeria para robar credenciales o instalar malware.",
        mitigation: "Filtros DMARC/DKIM, simulacros de phishing y capacitacion continua.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Cifrado malicioso de datos empresariales que puede paralizar operaciones completas.",
        mitigation: "Backups offsite, segmentacion de red, EDR/XDR y regla 3-2-1.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "Inyeccion de comandos SQL para extraer, modificar o eliminar bases de datos.",
        mitigation: "Prepared statements, WAF y validacion estricta de entradas.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Inyeccion de scripts para robar sesiones, cookies o redirigir trafico malicioso.",
        mitigation: "CSP headers, sanitizacion de salidas y cookies HttpOnly.",
      },
      {
        name: "Ataques DDoS",
        risk: "medium",
        description: "Saturacion de servidores con trafico masivo para derribar servicios digitales.",
        mitigation: "CDN con mitigacion DDoS, rate limiting y balanceo de carga.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Intercepcion de comunicaciones entre usuario y servidor para extraer datos.",
        mitigation: "TLS/HTTPS forzado, HSTS, certificados validos y VPN.",
      },
    ],
  },
  en: {
    badge: "THREATS WE NEUTRALIZE",
    title: "Know the",
    titleHighlight: "threat",
    description:
      "Here are the attacks we see most often and how we stop them with technical and operational controls.",
    defenseLabel: "OUR DEFENSE",
    riskLabels: { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Email and messaging attacks designed to steal credentials or deploy malware.",
        mitigation: "DMARC/DKIM filters, phishing simulations, and continuous training.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Malicious encryption of business data that can halt operations.",
        mitigation: "Offsite backups, network segmentation, EDR/XDR, and the 3-2-1 rule.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "SQL command injection used to extract, modify, or delete database records.",
        mitigation: "Prepared statements, WAF, and strict input validation.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Script injection used to steal sessions, cookies, or redirect malicious traffic.",
        mitigation: "CSP headers, output sanitization, and HttpOnly cookies.",
      },
      {
        name: "DDoS Attacks",
        risk: "medium",
        description: "Server saturation through massive traffic designed to knock digital services offline.",
        mitigation: "DDoS-mitigating CDN, rate limiting, and load balancing.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Interception of communications between users and servers to capture data.",
        mitigation: "Forced TLS/HTTPS, HSTS, valid certificates, and VPN use.",
      },
    ],
  },
  pt: {
    badge: "AMEACAS QUE NEUTRALIZAMOS",
    title: "Conheca o",
    titleHighlight: "inimigo",
    description:
      "Mostramos os ataques mais frequentes e como os bloqueamos com controles tecnicos e operacionais.",
    defenseLabel: "NOSSA DEFESA",
    riskLabels: { critical: "CRITICO", high: "ALTO", medium: "MEDIO" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Ataques por email ou mensagens para roubar credenciais ou instalar malware.",
        mitigation: "Filtros DMARC/DKIM, simulacoes de phishing e treinamento continuo.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Criptografia maliciosa de dados empresariais que pode paralisar as operacoes.",
        mitigation: "Backups offsite, segmentacao de rede, EDR/XDR e regra 3-2-1.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "Injecao de comandos SQL para extrair, alterar ou apagar dados.",
        mitigation: "Prepared statements, WAF e validacao rigorosa de entradas.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Injecao de scripts para roubar sessoes, cookies ou redirecionar trafego malicioso.",
        mitigation: "CSP headers, sanitizacao de saida e cookies HttpOnly.",
      },
      {
        name: "Ataques DDoS",
        risk: "medium",
        description: "Saturacao de servidores com grande volume de trafego para derrubar servicos.",
        mitigation: "CDN com mitigacao DDoS, rate limiting e balanceamento de carga.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Interceptacao da comunicacao entre usuario e servidor para capturar dados.",
        mitigation: "TLS/HTTPS forcado, HSTS, certificados validos e VPN.",
      },
    ],
  },
  fr: {
    badge: "MENACES QUE NOUS NEUTRALISONS",
    title: "Connaitre",
    titleHighlight: "l'ennemi",
    description:
      "Nous presentons les attaques les plus courantes et la facon dont nous les bloquons avec des controles techniques et operationnels.",
    defenseLabel: "NOTRE DEFENSE",
    riskLabels: { critical: "CRITIQUE", high: "ELEVEE", medium: "MOYENNE" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Attaques par email ou messagerie visant a voler des identifiants ou installer un malware.",
        mitigation: "Filtres DMARC/DKIM, simulations de phishing et formation continue.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Chiffrement malveillant des donnees de l'entreprise pouvant stopper les operations.",
        mitigation: "Backups hors site, segmentation reseau, EDR/XDR et regle 3-2-1.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "Injection de commandes SQL pour extraire, modifier ou supprimer des donnees.",
        mitigation: "Prepared statements, WAF et validation stricte des entrees.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Injection de scripts pour voler des sessions, des cookies ou rediriger le trafic.",
        mitigation: "CSP headers, sanitisation de sortie et cookies HttpOnly.",
      },
      {
        name: "Attaques DDoS",
        risk: "medium",
        description: "Saturation des serveurs avec un trafic massif pour rendre les services indisponibles.",
        mitigation: "CDN avec mitigation DDoS, limitation de debit et load balancing.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Interception des communications entre utilisateur et serveur pour capter des donnees.",
        mitigation: "TLS/HTTPS force, HSTS, certificats valides et VPN.",
      },
    ],
  },
  de: {
    badge: "BEDROHUNGEN, DIE WIR NEUTRALISIEREN",
    title: "Kennen Sie den",
    titleHighlight: "Gegner",
    description:
      "Wir zeigen haufige Angriffe und wie wir sie mit technischen und operativen Kontrollen stoppen.",
    defenseLabel: "UNSERE ABWEHR",
    riskLabels: { critical: "KRITISCH", high: "HOCH", medium: "MITTEL" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Email- und Messaging-Angriffe zum Diebstahl von Zugangsdaten oder zur Malware-Installation.",
        mitigation: "DMARC/DKIM-Filter, Phishing-Simulationen und kontinuierliches Training.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Bosartige Verschlusselung von Unternehmensdaten, die den Betrieb lahmlegen kann.",
        mitigation: "Offsite-Backups, Netzsegmentierung, EDR/XDR und die 3-2-1-Regel.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "Einschleusen von SQL-Befehlen zum Auslesen, Andern oder Loschen von Daten.",
        mitigation: "Prepared Statements, WAF und strikte Eingabevalidierung.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Script-Injektion zum Diebstahl von Sitzungen, Cookies oder zur Umleitung von Traffic.",
        mitigation: "CSP-Header, Output-Sanitizing und HttpOnly-Cookies.",
      },
      {
        name: "DDoS-Angriffe",
        risk: "medium",
        description: "Uberlastung von Servern durch massiven Traffic, um digitale Dienste ausfallen zu lassen.",
        mitigation: "CDN mit DDoS-Schutz, Rate Limiting und Load Balancing.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Abfangen der Kommunikation zwischen Nutzer und Server zum Extrahieren von Daten.",
        mitigation: "Erzwungenes TLS/HTTPS, HSTS, gultige Zertifikate und VPN.",
      },
    ],
  },
  it: {
    badge: "MINACCE CHE NEUTRALIZZIAMO",
    title: "Conosci il",
    titleHighlight: "nemico",
    description:
      "Ti mostriamo gli attacchi piu frequenti e come li blocchiamo con controlli tecnici e operativi.",
    defenseLabel: "LA NOSTRA DIFESA",
    riskLabels: { critical: "CRITICO", high: "ALTO", medium: "MEDIO" },
    threats: [
      {
        name: "Phishing & Spear Phishing",
        risk: "critical",
        description: "Attacchi via email o messaggi per rubare credenziali o installare malware.",
        mitigation: "Filtri DMARC/DKIM, simulazioni di phishing e formazione continua.",
      },
      {
        name: "Ransomware",
        risk: "critical",
        description: "Cifratura malevola dei dati aziendali che puo bloccare l'operativita.",
        mitigation: "Backup offsite, segmentazione di rete, EDR/XDR e regola 3-2-1.",
      },
      {
        name: "SQL Injection",
        risk: "high",
        description: "Iniezione di comandi SQL per estrarre, modificare o eliminare dati.",
        mitigation: "Prepared statements, WAF e validazione rigorosa degli input.",
      },
      {
        name: "Cross-Site Scripting (XSS)",
        risk: "high",
        description: "Iniezione di script per rubare sessioni, cookie o reindirizzare traffico malevolo.",
        mitigation: "CSP headers, sanitizzazione dell'output e cookie HttpOnly.",
      },
      {
        name: "Attacchi DDoS",
        risk: "medium",
        description: "Saturazione dei server con traffico massivo per mettere offline i servizi digitali.",
        mitigation: "CDN con mitigazione DDoS, rate limiting e bilanciamento del carico.",
      },
      {
        name: "Man-in-the-Middle (MITM)",
        risk: "high",
        description: "Intercettazione delle comunicazioni tra utente e server per estrarre dati.",
        mitigation: "TLS/HTTPS forzato, HSTS, certificati validi e VPN.",
      },
    ],
  },
}

const ICONS = [Mail, Lock, Database, Code, Zap, Network] as const

const riskClass: Record<RiskKey, string> = {
  critical: "border-red-500/30 bg-red-500/10 text-red-500",
  high: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  medium: "border-sky-500/30 bg-sky-500/10 text-sky-500",
}

const glowClasses: Record<RiskKey, string> = {
  critical:
    "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] dark:hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] border-red-500/10 hover:border-red-500/30",
  high:
    "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] border-amber-500/10 hover:border-amber-500/30",
  medium:
    "hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] border-sky-500/10 hover:border-sky-500/30",
}

export function SecurityThreats() {
  const { locale } = useLanguage()
  const copy = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 md:py-32 dark:bg-slate-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] dark:opacity-[0.02]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-14 space-y-4 text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-xs font-semibold text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] backdrop-blur-md dark:shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <AlertTriangle className="h-3.5 w-3.5 animate-pulse" />
            {copy.badge}
          </div>
          <h2 className="text-3xl font-black text-slate-900 md:text-5xl dark:text-slate-100">
            {copy.title} <span className="text-red-500">{copy.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-700 md:text-base dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {copy.threats.map((threat, index) => {
            const Icon = ICONS[index]
            return (
              <article
                key={threat.name}
                className={`group rounded-2xl border bg-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900/40 dark:shadow-sm ${glowClasses[threat.risk]}`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110 dark:border-white/10 dark:bg-slate-800/80">
                    <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-black tracking-widest ${riskClass[threat.risk]}`}
                  >
                    {copy.riskLabels[threat.risk]}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">{threat.name}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                  {threat.description}
                </p>

                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:bg-primary/10">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <p className="text-[11px] font-bold tracking-wider text-primary">{copy.defenseLabel}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {threat.mitigation}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
