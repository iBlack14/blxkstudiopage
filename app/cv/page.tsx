"use client"

import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"
import { Mail, MapPin, Phone, Globe, Linkedin, Github, Calendar } from "lucide-react"

type CVCopy = {
  about: string
  professionalSummary: string
  experience: string
  education: string
  skills: string
  contact: string
  role: string
  intro: string
}

const CV_COPY: Record<Locale, CVCopy> = {
  es: {
    about: "Perfil",
    professionalSummary: "Resumen Profesional",
    experience: "Experiencia",
    education: "Educacion",
    skills: "Habilidades",
    contact: "Contacto",
    role: "Full-Stack Developer & Founder",
    intro:
      "Desarrollo productos web, automatizaciones e integraciones de IA con enfoque practico, ejecucion rapida y criterio de negocio.",
  },
  en: {
    about: "Profile",
    professionalSummary: "Professional Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    contact: "Contact",
    role: "Full-Stack Developer & Founder",
    intro:
      "I build web products, automations, and AI integrations with a practical mindset, fast execution, and strong business judgment.",
  },
  pt: {
    about: "Perfil",
    professionalSummary: "Resumo Profissional",
    experience: "Experiencia",
    education: "Educacao",
    skills: "Habilidades",
    contact: "Contato",
    role: "Full-Stack Developer & Founder",
    intro:
      "Desenvolvo produtos web, automacoes e integracoes de IA com foco pratico, execucao rapida e visao de negocio.",
  },
  fr: {
    about: "Profil",
    professionalSummary: "Resume Professionnel",
    experience: "Experience",
    education: "Education",
    skills: "Competences",
    contact: "Contact",
    role: "Full-Stack Developer & Founder",
    intro:
      "Je construis des produits web, des automatisations et des integrations IA avec un esprit pratique, une execution rapide et une vision business.",
  },
  de: {
    about: "Profil",
    professionalSummary: "Professionelles Profil",
    experience: "Erfahrung",
    education: "Ausbildung",
    skills: "Fahigkeiten",
    contact: "Kontakt",
    role: "Full-Stack Developer & Founder",
    intro:
      "Ich entwickle Webprodukte, Automatisierungen und KI-Integrationen mit pragmatischem Ansatz, schneller Umsetzung und Geschaftssinn.",
  },
  it: {
    about: "Profilo",
    professionalSummary: "Riepilogo Professionale",
    experience: "Esperienza",
    education: "Istruzione",
    skills: "Competenze",
    contact: "Contatti",
    role: "Full-Stack Developer & Founder",
    intro:
      "Sviluppo prodotti web, automazioni e integrazioni IA con approccio pratico, esecuzione rapida e visione di business.",
  },
}

const EXPERIENCE = [
  {
    role: "Founder & Full-Stack Developer",
    company: "BLXK Studio",
    period: "2022 - Presente",
    description:
      "Agencia tecnologica especializada en desarrollo web, automatizacion con n8n e inteligencia artificial. Desarrollo de soluciones digitales para empresas en Peru y Latinoamerica.",
    highlights: [
      "Desarrollo de aplicaciones web con Next.js y React",
      "Implementacion de sistemas de automatizacion empresarial",
      "Integracion de IA para procesos de negocio",
      "Creacion de plataformas de e-commerce y LMS",
    ],
  },
  {
    role: "Desarrollador Full-Stack",
    company: "Freelance / Proyectos Independientes",
    period: "2020 - 2022",
    description: "Desarrollo de proyectos web para diversos clientes en multiples industrias.",
    highlights: [
      "Sitios web corporativos y portafolios",
      "Tiendas online con pasarelas de pago locales",
      "Sistemas de gestion y dashboards administrativos",
    ],
  },
]

const SKILLS = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  automation: ["n8n", "Zapier", "Webhooks", "Integraciones API"],
  ai: ["OpenAI", "GPT Models", "AI SDK", "Chatbot Development"],
  tools: ["Git", "Docker", "Vercel", "Figma", "VS Code"],
}

const EDUCATION = [
  {
    degree: "Ingenieria de Sistemas / Ciencias de la Computacion",
    school: "Universidad / Formacion Tecnica",
    period: "2018 - 2022",
    description: "Formacion en desarrollo de software y tecnologias de informacion.",
  },
]

const CONTACT = {
  email: "admin@blxkstudio.com",
  phone: "+51 913 259 652",
  location: "Lima, Peru",
  website: "blxkstudio.com",
  linkedin: "linkedin.com/company/blxkstudio",
  github: "github.com/iBlack14",
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-5 border-b border-neutral-200 pb-3 dark:border-neutral-800">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
    </div>
  )
}

export default function CVPage() {
  const { locale } = useLanguage()
  const t = CV_COPY[locale] || CV_COPY.es

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 dark:bg-neutral-950 md:px-6 md:py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-neutral-800 dark:bg-neutral-900">
        <section className="border-b border-neutral-200 px-6 py-8 dark:border-neutral-800 md:px-10 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500 dark:text-neutral-400">
                Curriculum Vitae
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 md:text-5xl">
                Alonso Huancas Cruz
              </h1>
              <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
                {t.role}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-[15px]">
                {t.intro}
              </p>
            </div>

            <div className="grid gap-3 text-sm text-neutral-600 dark:text-neutral-300">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-50">
                <Mail className="h-4 w-4" />
                {CONTACT.email}
              </a>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {CONTACT.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {CONTACT.location}
              </span>
              <a
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-50"
              >
                <Globe className="h-4 w-4" />
                {CONTACT.website}
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border-b border-neutral-200 bg-neutral-50 px-6 py-8 dark:border-neutral-800 dark:bg-neutral-900/40 md:px-10 lg:border-b-0 lg:border-r">
            <div className="mb-10">
              <SectionHeading title={t.about} />
              <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                Fundador y desarrollador full-stack con experiencia en productos digitales, automatizacion de procesos e integraciones de IA para empresas que necesitan soluciones claras, escalables y bien ejecutadas.
              </p>
            </div>

            <div className="mb-10">
              <SectionHeading title={t.contact} />
              <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-neutral-50">
                  <Mail className="h-4 w-4 text-neutral-500" />
                  {CONTACT.email}
                </a>
                <a
                  href={`https://${CONTACT.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-neutral-50"
                >
                  <Linkedin className="h-4 w-4 text-neutral-500" />
                  LinkedIn
                </a>
                <a
                  href={`https://${CONTACT.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-neutral-50"
                >
                  <Github className="h-4 w-4 text-neutral-500" />
                  GitHub
                </a>
                <a
                  href={`https://${CONTACT.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-neutral-50"
                >
                  <Globe className="h-4 w-4 text-neutral-500" />
                  {CONTACT.website}
                </a>
              </div>
            </div>

            <div>
              <SectionHeading title={t.skills} />
              <div className="space-y-5">
                {Object.entries(SKILLS).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {category === "frontend" && "Frontend"}
                      {category === "backend" && "Backend"}
                      {category === "automation" && "Automatizacion"}
                      {category === "ai" && "Inteligencia Artificial"}
                      {category === "tools" && "Herramientas"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="px-6 py-8 md:px-10">
            <section className="mb-12">
              <SectionHeading title={t.professionalSummary} />
              <p className="text-sm leading-8 text-neutral-700 dark:text-neutral-300 md:text-[15px]">
                Fundador y desarrollador full-stack de BLXK Studio, agencia tecnologica especializada en desarrollo web moderno, automatizacion de procesos e inteligencia artificial. Combino habilidades tecnicas en React, Next.js y sistemas de automatizacion con un enfoque estrategico de negocio para crear soluciones digitales que generan resultados tangibles para las empresas. Experiencia en el desarrollo de plataformas de e-commerce, sistemas LMS, integraciones con n8n y implementaciones de IA conversacional.
              </p>
            </section>

            <section className="mb-12">
              <SectionHeading title={t.experience} />
              <div className="space-y-8">
                {EXPERIENCE.map((exp, index) => (
                  <article key={index} className="border-l border-neutral-200 pl-5 dark:border-neutral-800">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {exp.company}
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-[15px]">
                      {exp.description}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex gap-3">
                          <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading title={t.education} />
              <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                  <article key={index}>
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {edu.school}
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {edu.period}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-[15px]">
                      {edu.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
