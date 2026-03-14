"use client"

import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"
import { Mail, MapPin, Phone, Globe, Linkedin, Github, ExternalLink, Calendar } from "lucide-react"

type CVCopy = {
  about: string
  professionalSummary: string
  experience: string
  education: string
  skills: string
  contact: string
  download: string
}

const CV_COPY: Record<Locale, CVCopy> = {
  es: {
    about: "Sobre mí",
    professionalSummary: "Resumen Profesional",
    experience: "Experiencia",
    education: "Educación",
    skills: "Habilidades",
    contact: "Contacto",
    download: "Descargar CV",
  },
  en: {
    about: "About",
    professionalSummary: "Professional Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    contact: "Contact",
    download: "Download CV",
  },
  pt: {
    about: "Sobre",
    professionalSummary: "Resumo Profissional",
    experience: "Experiência",
    education: "Educação",
    skills: "Habilidades",
    contact: "Contato",
    download: "Baixar CV",
  },
  fr: {
    about: "À propos",
    professionalSummary: "Résumé Professionnel",
    experience: "Expérience",
    education: "Éducation",
    skills: "Compétences",
    contact: "Contact",
    download: "Télécharger CV",
  },
  de: {
    about: "Über mich",
    professionalSummary: "Professionelles Profil",
    experience: "Erfahrung",
    education: "Ausbildung",
    skills: "Fähigkeiten",
    contact: "Kontakt",
    download: "CV Herunterladen",
  },
  it: {
    about: "Su di me",
    professionalSummary: "Riepilogo Professionale",
    experience: "Esperienza",
    education: "Istruzione",
    skills: "Competenze",
    contact: "Contatti",
    download: "Scarica CV",
  },
}

const EXPERIENCE = [
  {
    role: "Founder & Full-Stack Developer",
    company: "BLXK Studio",
    period: "2022 - Presente",
    description: "Agencia tecnológica especializada en desarrollo web, automatización con n8n e inteligencia artificial. Desarrollo de soluciones digitales para empresas en Perú y Latinoamérica.",
    highlights: [
      "Desarrollo de aplicaciones web con Next.js y React",
      "Implementación de sistemas de automatización empresarial",
      "Integración de IA para procesos de negocio",
      "Creación de plataformas de e-commerce y LMS",
    ],
  },
  {
    role: "Desarrollador Full-Stack",
    company: "Freelance / Proyectos Independientes",
    period: "2020 - 2022",
    description: "Desarrollo de proyectos web para diversos clientes en múltiples industrias.",
    highlights: [
      "Sitios web corporativos y portafolios",
      "Tiendas online con pasarelas de pago locales",
      "Sistemas de gestión y dashboards administrativos",
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
    degree: "Ingeniería de Sistemas / Ciencias de la Computación",
    school: "Universidad / Formación Técnica",
    period: "2018 - 2022",
    description: "Formación en desarrollo de software y tecnologías de información.",
  },
]

const CONTACT = {
  email: "admin@blxkstudio.com",
  phone: "+51 913 259 652",
  location: "Lima, Perú",
  website: "blxkstudio.com",
  linkedin: "linkedin.com/company/blxkstudio",
  github: "github.com/iBlack14",
}

export default function CVPage() {
  const { locale } = useLanguage()
  const t = CV_COPY[locale] || CV_COPY.es

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <header className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Alonso Huancas Cruz
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
              Full-Stack Developer & Founder
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <a 
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {CONTACT.email}
              </a>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {CONTACT.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {CONTACT.location}
              </span>
              <a 
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {CONTACT.website}
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {t.professionalSummary}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Fundador y desarrollador full-stack de BLXK Studio, agencia tecnológica especializada 
              en desarrollo web moderno, automatización de procesos e inteligencia artificial. 
              Combino habilidades técnicas en React, Next.js y sistemas de automatización con un 
              enfoque estratégico de negocio para crear soluciones digitales que generan resultados 
              tangibles para las empresas. Experiencia en el desarrollo de plataformas de e-commerce, 
              sistemas LMS, integraciones con n8n y implementaciones de IA conversacional.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {t.experience}
            </h2>
            
            <div className="space-y-8">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-neutral-300 dark:border-neutral-700">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                      {exp.role}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </p>
                  </div>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                        <span className="text-neutral-400 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {t.skills}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 uppercase tracking-wide mb-3">
                    {category === 'frontend' && 'Frontend'}
                    {category === 'backend' && 'Backend'}
                    {category === 'automation' && 'Automatización'}
                    {category === 'ai' && 'Inteligencia Artificial'}
                    {category === 'tools' && 'Herramientas'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 text-sm bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {t.education}
            </h2>
            
            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {edu.school}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              {t.contact}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="text-neutral-700 dark:text-neutral-300">{CONTACT.email}</span>
              </a>
              
              <a 
                href={`https://${CONTACT.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="text-neutral-700 dark:text-neutral-300">LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 ml-auto" />
              </a>
              
              <a 
                href={`https://${CONTACT.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <Github className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="text-neutral-700 dark:text-neutral-300">GitHub</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 ml-auto" />
              </a>
              
              <a 
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="text-neutral-700 dark:text-neutral-300">{CONTACT.website}</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 ml-auto" />
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-500">
            <p>© {new Date().getFullYear()} Alonso Huancas Cruz. Todos los derechos reservados.</p>
          </footer>
        </div>
      </main>
  )
}
