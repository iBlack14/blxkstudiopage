export const LOCALE_COOKIE = "blxk-locale"

export const SUPPORTED_LOCALES = ["es", "en", "pt", "fr", "de", "it"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "es"

export const LOCALE_OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "es", label: "Espanol" },
  { value: "en", label: "English" },
  { value: "pt", label: "Portugues" },
  { value: "fr", label: "Francais" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
]

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  AR: "es",
  BO: "es",
  CL: "es",
  CO: "es",
  CR: "es",
  CU: "es",
  DO: "es",
  EC: "es",
  ES: "es",
  GT: "es",
  HN: "es",
  MX: "es",
  NI: "es",
  PA: "es",
  PE: "es",
  PR: "es",
  PY: "es",
  SV: "es",
  UY: "es",
  VE: "es",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  PT: "pt",
  BR: "pt",
  FR: "fr",
  BE: "fr",
  CH: "fr",
  DE: "de",
  AT: "de",
  IT: "it",
}

export function isLocale(value: string | undefined | null): value is Locale {
  return SUPPORTED_LOCALES.includes((value || "") as Locale)
}

export function localeFromCountry(countryCode: string | undefined | null): Locale {
  if (!countryCode) return DEFAULT_LOCALE
  return COUNTRY_TO_LOCALE[countryCode.toUpperCase()] || DEFAULT_LOCALE
}

export function localeFromAcceptLanguage(headerValue: string | undefined | null): Locale {
  if (!headerValue) return DEFAULT_LOCALE
  const tags = headerValue
    .toLowerCase()
    .split(",")
    .map((part) => part.trim().split(";")[0])

  for (const tag of tags) {
    const base = tag.slice(0, 2)
    if (isLocale(base)) return base
  }

  return DEFAULT_LOCALE
}

export function resolveLocale(input: {
  cookieLocale?: string | null
  countryCode?: string | null
  acceptLanguage?: string | null
}): Locale {
  if (isLocale(input.cookieLocale)) return input.cookieLocale
  if (input.countryCode) return localeFromCountry(input.countryCode)
  return localeFromAcceptLanguage(input.acceptLanguage)
}

type Messages = {
  nav: {
    home: string
    about: string
    services: string
    stack: string
    portfolio: string
    contact: string
    startProject: string
  }
  footer: {
    ctaTitle: string
    ctaDescription: string
    ctaWhatsapp: string
    ctaEmail: string
    tagline: string
    aboutText: string
    quickLinks: string
    contact: string
    followUs: string
    home: string
    services: string
    projects: string
    stack: string
    privacy: string
    terms: string
    rights: string
  }
  hero: {
    badge: string
    subtitle: string
    descriptionMain: string
    descriptionSecondary: string
    stackTitle: string
    ctaProjects: string
    ctaConsultation: string
    agencyLabel: string
    statClients: string
    statYears: string
  }
}

export const messages: Record<Locale, Messages> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      stack: "Stack",
      portfolio: "Portafolio",
      contact: "Contacto",
      startProject: "Iniciar Proyecto",
    },
    footer: {
      ctaTitle: "Listo para transformar tu negocio?",
      ctaDescription:
        "Contactanos hoy y descubre como impulsar el crecimiento de tu empresa con tecnologia.",
      ctaWhatsapp: "Contactar por WhatsApp",
      ctaEmail: "Enviar Email",
      tagline: "Soluciones Tecnologicas Empresariales",
      aboutText:
        "Transformamos negocios con desarrollo web, automatizacion inteligente y soluciones digitales escalables.",
      quickLinks: "Enlaces Rapidos",
      contact: "Contacto",
      followUs: "Siguenos",
      home: "Inicio",
      services: "Servicios",
      projects: "Proyectos",
      stack: "Stack Tecnologico",
      privacy: "Politica de Privacidad",
      terms: "Terminos de Servicio",
      rights: "Todos los derechos reservados.",
    },
    hero: {
      badge: "Soluciones Tecnologicas Empresariales",
      subtitle: "TRANSFORMACION DIGITAL",
      descriptionMain:
        "Creamos software web, automatizaciones e IA para empresas que buscan velocidad, control y crecimiento.",
      descriptionSecondary: "Ejecucion tecnica solida, enfoque en resultados.",
      stackTitle: "Stack Tecnologico",
      ctaProjects: "Explorar Proyectos",
      ctaConsultation: "Solicitar Consulta",
      agencyLabel: "Agencia Tecnologica",
      statClients: "Clientes Satisfechos",
      statYears: "Anos de Experiencia",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      stack: "Stack",
      portfolio: "Portfolio",
      contact: "Contact",
      startProject: "Start Project",
    },
    footer: {
      ctaTitle: "Ready to transform your business?",
      ctaDescription:
        "Contact us today and discover how to accelerate your business growth with technology.",
      ctaWhatsapp: "Contact via WhatsApp",
      ctaEmail: "Send Email",
      tagline: "Business Technology Solutions",
      aboutText:
        "We help companies grow with web development, smart automation and scalable digital solutions.",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      home: "Home",
      services: "Services",
      projects: "Projects",
      stack: "Technology Stack",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
    hero: {
      badge: "Business Technology Solutions",
      subtitle: "DIGITAL TRANSFORMATION",
      descriptionMain:
        "We build web software, automation and AI for companies that need speed, control and growth.",
      descriptionSecondary: "Solid technical execution, focused on results.",
      stackTitle: "Technology Stack",
      ctaProjects: "Explore Projects",
      ctaConsultation: "Request Consultation",
      agencyLabel: "Technology Agency",
      statClients: "Satisfied Clients",
      statYears: "Years of Experience",
    },
  },
  pt: {
    nav: {
      home: "Inicio",
      about: "Sobre",
      services: "Servicos",
      stack: "Stack",
      portfolio: "Portfolio",
      contact: "Contato",
      startProject: "Iniciar Projeto",
    },
    footer: {
      ctaTitle: "Pronto para transformar seu negocio?",
      ctaDescription: "Fale conosco e acelere o crescimento da sua empresa com tecnologia.",
      ctaWhatsapp: "Falar no WhatsApp",
      ctaEmail: "Enviar Email",
      tagline: "Solucoes Tecnologicas Empresariais",
      aboutText: "Transformamos negocios com web, automacao inteligente e solucoes digitais escalaveis.",
      quickLinks: "Links Rapidos",
      contact: "Contato",
      followUs: "Siga-nos",
      home: "Inicio",
      services: "Servicos",
      projects: "Projetos",
      stack: "Stack Tecnologico",
      privacy: "Politica de Privacidade",
      terms: "Termos de Servico",
      rights: "Todos os direitos reservados.",
    },
    hero: {
      badge: "Solucoes Tecnologicas Empresariais",
      subtitle: "TRANSFORMACAO DIGITAL",
      descriptionMain: "Criamos software web, automacoes e IA para empresas que buscam velocidade, controle e crescimento.",
      descriptionSecondary: "Execucao tecnica solida, foco em resultados.",
      stackTitle: "Stack Tecnologico",
      ctaProjects: "Ver Projetos",
      ctaConsultation: "Solicitar Consultoria",
      agencyLabel: "Agencia Tecnologica",
      statClients: "Clientes Satisfeitos",
      statYears: "Anos de Experiencia",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "A Propos",
      services: "Services",
      stack: "Stack",
      portfolio: "Portfolio",
      contact: "Contact",
      startProject: "Demarrer Projet",
    },
    footer: {
      ctaTitle: "Pret a transformer votre entreprise ?",
      ctaDescription: "Contactez-nous pour accelerer votre croissance avec la technologie.",
      ctaWhatsapp: "Contacter via WhatsApp",
      ctaEmail: "Envoyer Email",
      tagline: "Solutions Technologiques pour Entreprises",
      aboutText: "Nous transformons les entreprises avec le web, l'automatisation et des solutions numeriques evolutives.",
      quickLinks: "Liens Rapides",
      contact: "Contact",
      followUs: "Suivez-nous",
      home: "Accueil",
      services: "Services",
      projects: "Projets",
      stack: "Stack Technologique",
      privacy: "Politique de Confidentialite",
      terms: "Conditions d'Utilisation",
      rights: "Tous droits reserves.",
    },
    hero: {
      badge: "Solutions Technologiques pour Entreprises",
      subtitle: "TRANSFORMATION DIGITALE",
      descriptionMain: "Nous creons des logiciels web, des automatisations et de l'IA pour les entreprises qui veulent vitesse, controle et croissance.",
      descriptionSecondary: "Execution technique solide, orientee resultats.",
      stackTitle: "Stack Technologique",
      ctaProjects: "Voir les Projets",
      ctaConsultation: "Demander une Consultation",
      agencyLabel: "Agence Technologique",
      statClients: "Clients Satisfaits",
      statYears: "Annees d'Experience",
    },
  },
  de: {
    nav: {
      home: "Start",
      about: "Uber Uns",
      services: "Services",
      stack: "Stack",
      portfolio: "Portfolio",
      contact: "Kontakt",
      startProject: "Projekt Starten",
    },
    footer: {
      ctaTitle: "Bereit, Ihr Unternehmen zu transformieren?",
      ctaDescription: "Kontaktieren Sie uns und beschleunigen Sie Ihr Wachstum mit Technologie.",
      ctaWhatsapp: "Per WhatsApp Kontaktieren",
      ctaEmail: "Email Senden",
      tagline: "Technologie-Losungen fur Unternehmen",
      aboutText: "Wir transformieren Unternehmen mit Webentwicklung, Automatisierung und skalierbaren digitalen Losungen.",
      quickLinks: "Schnelllinks",
      contact: "Kontakt",
      followUs: "Folgen Sie Uns",
      home: "Start",
      services: "Services",
      projects: "Projekte",
      stack: "Technologie-Stack",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      rights: "Alle Rechte vorbehalten.",
    },
    hero: {
      badge: "Technologie-Losungen fur Unternehmen",
      subtitle: "DIGITALE TRANSFORMATION",
      descriptionMain: "Wir entwickeln Websoftware, Automatisierung und KI fur Unternehmen, die Geschwindigkeit, Kontrolle und Wachstum suchen.",
      descriptionSecondary: "Starke technische Umsetzung mit Fokus auf Ergebnisse.",
      stackTitle: "Technologie-Stack",
      ctaProjects: "Projekte Ansehen",
      ctaConsultation: "Beratung Anfragen",
      agencyLabel: "Technologieagentur",
      statClients: "Zufriedene Kunden",
      statYears: "Jahre Erfahrung",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi Siamo",
      services: "Servizi",
      stack: "Stack",
      portfolio: "Portfolio",
      contact: "Contatto",
      startProject: "Avvia Progetto",
    },
    footer: {
      ctaTitle: "Pronto a trasformare il tuo business?",
      ctaDescription: "Contattaci per accelerare la crescita della tua azienda con la tecnologia.",
      ctaWhatsapp: "Contatta su WhatsApp",
      ctaEmail: "Invia Email",
      tagline: "Soluzioni Tecnologiche per Aziende",
      aboutText: "Trasformiamo le aziende con sviluppo web, automazione intelligente e soluzioni digitali scalabili.",
      quickLinks: "Link Rapidi",
      contact: "Contatto",
      followUs: "Seguici",
      home: "Home",
      services: "Servizi",
      projects: "Progetti",
      stack: "Stack Tecnologico",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      rights: "Tutti i diritti riservati.",
    },
    hero: {
      badge: "Soluzioni Tecnologiche per Aziende",
      subtitle: "TRASFORMAZIONE DIGITALE",
      descriptionMain: "Creiamo software web, automazioni e IA per aziende che cercano velocita, controllo e crescita.",
      descriptionSecondary: "Esecuzione tecnica solida, focalizzata sui risultati.",
      stackTitle: "Stack Tecnologico",
      ctaProjects: "Esplora Progetti",
      ctaConsultation: "Richiedi Consulenza",
      agencyLabel: "Agenzia Tecnologica",
      statClients: "Clienti Soddisfatti",
      statYears: "Anni di Esperienza",
    },
  },
}
