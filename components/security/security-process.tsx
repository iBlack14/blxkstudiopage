"use client"

import { Search, FlaskConical, Target, FileSearch, Wrench, CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<
  Locale,
  {
    badge: string
    title: string
    titleHighlight: string
    description: string
    steps: Array<{ step: string; title: string; subtitle: string; description: string; tools: string[] }>
  }
> = {
  es: {
    badge: "METODOLOGIA",
    title: "Nuestro proceso",
    titleHighlight: "probado",
    description:
      "Metodologia estructurada basada en OWASP, PTES y NIST para resultados reproducibles y medibles.",
    steps: [
      {
        step: "01",
        title: "Reconocimiento",
        subtitle: "Information Gathering",
        description: "Recopilamos activos expuestos: subdominios, tecnologias, puertos abiertos y huella publica.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Analisis de Superficie",
        subtitle: "Vulnerability Assessment",
        description: "Catalogamos vulnerabilidades por severidad y probabilidad de explotacion real.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Explotacion Etica",
        subtitle: "Penetration Testing",
        description: "Explotamos de forma controlada para medir impacto real con autorizacion explicita.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Reporte Ejecutivo",
        subtitle: "Detailed Report",
        description: "Documentamos evidencia, impacto de negocio, CVSS y pasos exactos de remediacion.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Remediacion Asistida",
        subtitle: "Fix & Patch",
        description: "Acompanamos correcciones, validamos fixes y reforzamos configuraciones criticas.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Test & Certificacion",
        subtitle: "Verification",
        description: "Reejecutamos pruebas y emitimos constancia tecnica del nuevo estado de seguridad.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
  en: {
    badge: "METHODOLOGY",
    title: "Our",
    titleHighlight: "proven process",
    description:
      "Structured methodology based on OWASP, PTES, and NIST for measurable and repeatable outcomes.",
    steps: [
      {
        step: "01",
        title: "Reconnaissance",
        subtitle: "Information Gathering",
        description: "We map exposed assets, subdomains, technologies, open ports, and public footprint.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Surface Analysis",
        subtitle: "Vulnerability Assessment",
        description: "We classify vulnerabilities by severity and real exploitation probability.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Ethical Exploitation",
        subtitle: "Penetration Testing",
        description: "We exploit findings in a controlled manner to measure actual impact under authorization.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Executive Report",
        subtitle: "Detailed Report",
        description: "We document evidence, business impact, CVSS scoring, and exact remediation steps.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Assisted Remediation",
        subtitle: "Fix & Patch",
        description: "We support corrective work, validate fixes, and reinforce critical configurations.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Test & Certification",
        subtitle: "Verification",
        description: "We rerun tests and issue technical confirmation of the updated security posture.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
  pt: {
    badge: "METODOLOGIA",
    title: "Nosso processo",
    titleHighlight: "comprovado",
    description:
      "Metodologia estruturada baseada em OWASP, PTES e NIST para resultados mensuraveis e repetiveis.",
    steps: [
      {
        step: "01",
        title: "Reconhecimento",
        subtitle: "Information Gathering",
        description: "Mapeamos ativos expostos, subdominios, tecnologias, portas abertas e pegada publica.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Analise de Superficie",
        subtitle: "Vulnerability Assessment",
        description: "Classificamos vulnerabilidades por severidade e probabilidade real de exploracao.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Exploracao Etica",
        subtitle: "Penetration Testing",
        description: "Exploramos de forma controlada para medir o impacto real com autorizacao explicita.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Relatorio Executivo",
        subtitle: "Detailed Report",
        description: "Documentamos evidencias, impacto no negocio, CVSS e etapas exatas de correcao.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Remediacao Assistida",
        subtitle: "Fix & Patch",
        description: "Apoiamos as correcoes, validamos os fixes e reforcamos configuracoes criticas.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Teste & Certificacao",
        subtitle: "Verification",
        description: "Executamos novamente os testes e emitimos confirmacao tecnica do novo estado de seguranca.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
  fr: {
    badge: "METHODOLOGIE",
    title: "Notre processus",
    titleHighlight: "eprouve",
    description:
      "Methodologie structuree basee sur OWASP, PTES et NIST pour des resultats mesurables et reproductibles.",
    steps: [
      {
        step: "01",
        title: "Reconnaissance",
        subtitle: "Information Gathering",
        description: "Nous cartographions les actifs exposes, sous-domaines, technologies et ports ouverts.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Analyse de Surface",
        subtitle: "Vulnerability Assessment",
        description: "Nous classons les vulnerabilites par severite et probabilite reelle d'exploitation.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Exploitation Ethique",
        subtitle: "Penetration Testing",
        description: "Nous exploitons de facon controlee pour mesurer l'impact reel avec autorisation explicite.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Rapport Executif",
        subtitle: "Detailed Report",
        description: "Nous documentons les preuves, l'impact business, le score CVSS et les etapes de remediation.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Remediation Assistee",
        subtitle: "Fix & Patch",
        description: "Nous accompagnons les corrections, validons les correctifs et renforcons les configurations critiques.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Test & Certification",
        subtitle: "Verification",
        description: "Nous relancons les tests et confirmons techniquement le nouvel etat de securite.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
  de: {
    badge: "METHODIK",
    title: "Unser",
    titleHighlight: "bewahrter Prozess",
    description:
      "Strukturierte Methodik auf Basis von OWASP, PTES und NIST fur messbare und reproduzierbare Ergebnisse.",
    steps: [
      {
        step: "01",
        title: "Aufklarung",
        subtitle: "Information Gathering",
        description: "Wir erfassen exponierte Assets, Subdomains, Technologien, offene Ports und die offentliche Spur.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Oberflachenanalyse",
        subtitle: "Vulnerability Assessment",
        description: "Wir priorisieren Schwachstellen nach Schweregrad und realer Ausnutzbarkeit.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Ethische Ausnutzung",
        subtitle: "Penetration Testing",
        description: "Wir nutzen Schwachstellen kontrolliert aus, um den realen Impact mit Freigabe zu messen.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Management Report",
        subtitle: "Detailed Report",
        description: "Wir dokumentieren Nachweise, Business Impact, CVSS und konkrete Remediation-Schritte.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Begleitete Behebung",
        subtitle: "Fix & Patch",
        description: "Wir begleiten Korrekturen, validieren Fixes und starken kritische Konfigurationen.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Test & Zertifizierung",
        subtitle: "Verification",
        description: "Wir testen erneut und bestatigen den aktualisierten Sicherheitsstatus technisch.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
  it: {
    badge: "METODOLOGIA",
    title: "Il nostro processo",
    titleHighlight: "collaudato",
    description:
      "Metodologia strutturata basata su OWASP, PTES e NIST per risultati misurabili e ripetibili.",
    steps: [
      {
        step: "01",
        title: "Ricognizione",
        subtitle: "Information Gathering",
        description: "Raccogliamo asset esposti, sottodomini, tecnologie, porte aperte e impronta pubblica.",
        tools: ["Shodan", "OSINT", "nmap"],
      },
      {
        step: "02",
        title: "Analisi della Superficie",
        subtitle: "Vulnerability Assessment",
        description: "Classifichiamo le vulnerabilita per gravita e probabilita reale di sfruttamento.",
        tools: ["Nessus", "OpenVAS", "Nikto"],
      },
      {
        step: "03",
        title: "Sfruttamento Etico",
        subtitle: "Penetration Testing",
        description: "Sfruttiamo in modo controllato per misurare l'impatto reale con autorizzazione esplicita.",
        tools: ["Metasploit", "Burp Suite", "SQLMap"],
      },
      {
        step: "04",
        title: "Report Esecutivo",
        subtitle: "Detailed Report",
        description: "Documentiamo evidenze, impatto sul business, CVSS e passaggi di remediation.",
        tools: ["CVSS", "OWASP", "CWE"],
      },
      {
        step: "05",
        title: "Remediation Assistita",
        subtitle: "Fix & Patch",
        description: "Affianchiamo le correzioni, validiamo i fix e rafforziamo le configurazioni critiche.",
        tools: ["Code Review", "Config Audit", "Patch Mgmt"],
      },
      {
        step: "06",
        title: "Re-Test & Certificazione",
        subtitle: "Verification",
        description: "Rieseguiamo i test e confermiamo tecnicamente il nuovo stato di sicurezza.",
        tools: ["Re-scan", "Validation", "Certificate"],
      },
    ],
  },
}

const ICONS = [Search, FlaskConical, Target, FileSearch, Wrench, CheckCircle] as const

export function SecurityProcess() {
  const { locale } = useLanguage()
  const copy = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 md:py-32 dark:bg-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_80%,rgba(0,112,243,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.03)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(0,112,243,0.08)_0%,transparent_40%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,#000_10%,transparent_100%)] dark:[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[600px] rounded-full bg-primary/20 opacity-30 blur-[120px] dark:opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-14 space-y-4 text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
            <Target className="h-3.5 w-3.5" />
            {copy.badge}
          </div>
          <h2 className="text-3xl font-black text-slate-900 md:text-5xl dark:text-slate-100">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:to-sky-400">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-700 md:text-base dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {copy.steps.map((step, index) => {
            const Icon = ICONS[index]
            return (
              <article
                key={step.step}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_15px_30px_-10px_rgba(0,112,243,0.15)] dark:border-white/5 dark:bg-slate-900/40 dark:shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-4xl font-black leading-none text-slate-200 transition-colors duration-300 group-hover:text-primary/20 dark:text-slate-800">
                    {step.step}
                  </span>
                </div>

                <div className="relative z-10">
                  <p className="mb-1.5 text-[11px] font-bold tracking-widest text-primary">{step.subtitle.toUpperCase()}</p>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-slate-200 bg-slate-100/50 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-700 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
