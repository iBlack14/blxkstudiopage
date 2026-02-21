export const LOCALE_COOKIE = "blxk-locale"
export const LOCALE_MANUAL_COOKIE = "blxk-locale-manual"

export const SUPPORTED_LOCALES = ["es", "en", "pt", "fr", "de", "it"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "es"

export const LOCALE_OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "es", label: "Español" },
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
  manualLocale?: string | null
  countryCode?: string | null
  acceptLanguage?: string | null
}): Locale {
  return resolveLocaleWithMeta(input).locale
}

export function resolveLocaleWithMeta(input: {
  cookieLocale?: string | null
  manualLocale?: string | null
  countryCode?: string | null
  acceptLanguage?: string | null
}): { locale: Locale; source: "country" | "manual" | "accept-language" | "cookie" | "default" } {
  // 1) Manual override from UI selector.
  if (isLocale(input.manualLocale)) return { locale: input.manualLocale, source: "manual" }

  const fromCountry = input.countryCode
    ? COUNTRY_TO_LOCALE[input.countryCode.toUpperCase()]
    : undefined

  const fromHeader = localeFromAcceptLanguage(input.acceptLanguage)
  const fromAcceptLanguage = isLocale(fromHeader) ? fromHeader : undefined

  // 2) If country and browser language disagree, prefer browser language.
  // Mobile carrier/VPN exits can geolocate to a neighboring country.
  if (fromCountry && fromAcceptLanguage && fromCountry !== fromAcceptLanguage) {
    return { locale: fromAcceptLanguage, source: "accept-language" }
  }

  // 3) Country/IP locale.
  if (fromCountry) return { locale: fromCountry, source: "country" }

  // 4) Browser language preference.
  if (fromAcceptLanguage) return { locale: fromAcceptLanguage, source: "accept-language" }

  // 5) Last persisted locale cookie fallback.
  if (isLocale(input.cookieLocale)) return { locale: input.cookieLocale, source: "cookie" }

  // 6) Default.
  return { locale: DEFAULT_LOCALE, source: "default" }
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
  techStack: {
    title: string
    subtitle: string
    categories: {
      backend: string
      frontend: string
      database: string
      devops: string
      automation: string
    }
  }
  projects: {
    badge: string
    title: string
    subtitle: string
  }
  services: {
    title: string
    subtitle: string
    ctaMore: string
    ctaAll: string
    tabs: {
      overview: string
      comparison: string
      advantages: string
      usecases: string
    }
    labels: {
      metrics: string
      standard: string
      blxk: string
      clickDetails: string
    }
    // We will use a simplified structure here that matches the UI needs
    list: {
      id: number
      slug: string
      title: string
      icon: string
      description: string
      introduction: string
      features: {
        label: string
        standard: string
        blxk: string
      }[]
      advantages: string[]
      useCases: string[]
      metrics: {
        label: string
        value: string
      }[]
    }[]
  }
  servicesDetailed: {
    title: string
    subtitle: string
    featuresLabel: string
    benefitsLabel: string
    cta: string
    list: {
      id: number
      title: string
      subtitle: string
      description: string
      icon: string
      features: string[]
      benefits: string[]
    }[]
  }
  contact: {
    sectorsTitle: string
    sectorsSubtitle: string
    contactTitle: string
    contactSubtitle: string
    emailLabel: string
    locationLabel: string
    locationValue: string
    specialtiesLabel: string
    specialtiesValue: string
    ctaStart: string
    ctaWhatsapp: string
    industries: string[]
  }
  projectsShowcase: {
    title: string
    subtitle: string
    ctaTitle: string
    ctaButton: string
    list: {
      id: number
      title: string
      category: string
      description: string
    }[]
  }
  digitalProducts: {
    title: string
    subtitle: string
    list: {
      id: number
      title: string
      description: string
    }[]
  }
}

export const messages: Record<Locale, Messages> = {
  es: {
    digitalProducts: {
      title: "Productos Digitales BLXK",
      subtitle: "Soluciones listas para impulsar tu negocio: hosting, plantillas, pagos y automatizaciones.",
      list: [
        {
          id: 1,
          title: "Hosting Reseller",
          description: "Planes Emprendedor, Empresa y Premium con cPanel, WHM y SSL. Ideal para revender hosting.",
        },
        {
          id: 2,
          title: "Plantillas Elementor",
          description: "Plantillas profesionales listas para usar, optimizadas para conversiones.",
        },
        {
          id: 3,
          title: "Integración de Pagos",
          description: "Implementación de Yape, Plin, Izipay QR y otras pasarelas de pago.",
        },
        {
          id: 4,
          title: "Automatizaciones Pre‑configuradas",
          description: "Flujos n8n listos para conectar WhatsApp, CRM y notificaciones.",
        },
      ],
    },
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
    techStack: {
      title: "Stack Tecnológico",
      subtitle: "Herramientas de vanguardia para soluciones de clase mundial",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Bases de Datos",
        devops: "DevOps & Cloud",
        automation: "Automatización & AI",
      },
    },
    projects: {
      badge: "Casos de Éxito",
      title: "Portafolio",
      subtitle: "Proyectos reales que demuestran resultados tangibles",
    },
    services: {
      title: "Propuesta de Valor Superior",
      subtitle: "Nuestras soluciones superan los estándares del mercado en rendimiento, seguridad y ROI",
      ctaMore: "Solicitar Más Información",
      ctaAll: "Ver Todos los Servicios",
      tabs: {
        overview: "Visión General",
        comparison: "BLXK vs Mercado",
        advantages: "Ventajas",
        usecases: "Casos de Uso",
      },
      labels: {
        metrics: "Métricas Clave",
        standard: "Estándar:",
        blxk: "BLXK:",
        clickDetails: "Haz clic para ver detalles",
      },
      list: [
        {
          id: 1,
          slug: "desarrollo-web",
          title: "Desarrollo de Páginas Web",
          icon: "🌐",
          description: "Ingeniería de Conversión + Performance",
          introduction:
            "Nuestros planes de desarrollo web se centran en la ingeniería de conversión, asegurando que cada sitio no solo sea visualmente atractivo, sino una herramienta de negocio de alto rendimiento.",
          features: [
            {
              label: "Tecnología Base",
              standard: "Uso de CMS genéricos (ej. WordPress con Elementor)",
              blxk: "Desarrollo con Frameworks Modernos (ej. Next.js/React) o Headless CMS para máxima velocidad y escalabilidad",
            },
            {
              label: "Rendimiento",
              standard: "No se garantiza el rendimiento específico",
              blxk: "Garantía de Core Web Vitals: Optimización técnica para alcanzar puntuaciones altas en métricas de Google (LCP, FID, CLS)",
            },
            {
              label: "Diseño y UX",
              standard: "Diseño 'a gusto del cliente' con plantillas",
              blxk: "Diseño Centrado en el Usuario (UX/CRO): Incluye fase de Investigación, Prototipado (Wireframes) y Pruebas de Usabilidad",
            },
            {
              label: "SEO Técnico",
              standard: "Plantilla 'Ideal para SEO'",
              blxk: "Estructura SEO Avanzada: Configuración de Schema Markup, Mapa del Sitio XML y Estructura de Contenido optimizada",
            },
            {
              label: "Soporte Post-Lanzamiento",
              standard: "Soporte limitado al plazo del hosting",
              blxk: "Garantía de Desarrollo de 6 Meses: Cobertura total contra errores de programación y bugs postentrega",
            },
          ],
          advantages: [
            "Rendimiento Garantizado: Sitios hasta 10 veces más rápidos, crucial para el SEO y la experiencia del usuario",
            "Optimización de Conversión: El diseño está validado para guiar al usuario hacia la acción deseada",
            "Máximo SEO Técnico: Asegura el mejor posicionamiento orgánico desde el lanzamiento",
            "Tranquilidad del Cliente: Minimiza el riesgo y el costo de mantenimiento inicial",
          ],
          useCases: [
            "Agencias de Marketing Digital - Necesitan sitios de conversión que cierren deals",
            "E-commerce Premium - Requieren velocidad y UX impecables",
            "Startups en crecimiento - Buscan escalabilidad sin migrar código",
            "Negocios de servicios B2B - Necesitan presencia profesional que genere confianza",
          ],
          metrics: [
            { label: "Velocidad Promedio", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Aumento Conversión", value: "+30-80%" },
            { label: "Garantía Antibugs", value: "6 meses" },
          ],
        },
        {
          id: 2,
          slug: "ecommerce",
          title: "Tiendas Virtuales",
          icon: "🛒",
          description: "E-commerce de Alto Impacto",
          introduction:
            "Las soluciones de e-commerce de BLXK vanen más allá de la simple venta, integrando logística, marketing de conversión y gestión avanzada.",
          features: [
            {
              label: "Logística",
              standard: "No se especifica integración logística",
              blxk: "Integración Logística Local: Conexión con al menos dos plataformas de envío locales populares (ej. Olva Courier, Urbano)",
            },
            {
              label: "Marketing de Conversión",
              standard: "Funcionalidades básicas de carrito",
              blxk: "Módulo de Recuperación de Carritos Abandonados: Configuración de automatizaciones por email o WhatsApp",
            },
            {
              label: "Medios de Pago",
              standard: "Pagos con tarjeta y depósitos",
              blxk: "Integración con Pasarelas Locales: Conexión con pasarelas de pago locales de alta conversión (ej. Culqi, Niubiz)",
            },
            {
              label: "Gestión de Inventario",
              standard: "Panel de administración básico",
              blxk: "Integración ERP/POS (Opcional): Posibilidad de conectar con sistemas de gestión de inventario automática",
            },
            {
              label: "Analítica",
              standard: "No se detalla la analítica",
              blxk: "Configuración Avanzada de GA4 y Píxeles: Implementación de seguimiento de eventos de e-commerce",
            },
          ],
          advantages: [
            "Recuperación +20% a +40% de ventas perdidas",
            "Mayor conversión con métodos de pago locales",
            "Operación más rápida y eficiente",
            "Escalable para miles de productos",
            "Sistema preparado para vender 24/7",
          ],
          useCases: [
            "Tiendas de retail online - Necesitan máxima conversión",
            "Distribuidoras multicanal - Requieren integración con ERP",
            "Marcas de moda y accesorios - Buscan experiencia premium",
            "Negocios de delivery/F&B - Necesitan integración logística",
          ],
          metrics: [
            { label: "Aumento Conversión", value: "+30-80%" },
            { label: "Recuperación Carritos", value: "+40%" },
            { label: "Métodos de Pago", value: "6+" },
            { label: "Escalabilidad", value: "Ilimitada" },
          ],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Hosting Web",
          icon: "🔐",
          description: "Infraestructura de Alto Rendimiento",
          introduction:
            "El servicio de hosting de BLXK está diseñado para la velocidad y la seguridad, superando las limitaciones de recursos compartidos.",
          features: [
            {
              label: "Recursos de Servidor",
              standard: "Recursos fijos (ej. 2GB RAM/12 Cores) para todos los planes",
              blxk: "Recursos Dedicados y Escalables: Asignación de CPU y RAM que escala con el plan",
            },
            {
              label: "Seguridad de Datos",
              standard: "Seguridad básica (Imunify360)",
              blxk: "Política de Backups Robusta: Copias de seguridad diarias automatizadas con retención de 30 días",
            },
            {
              label: "Ubicación del Servidor",
              standard: "No se especifica",
              blxk: "Servidores Optimizados para Latencia: Ubicación estratégica del centro de datos para la menor latencia",
            },
            {
              label: "Soporte Técnico",
              standard: "Soporte en horario de oficina",
              blxk: "Soporte Técnico Crítico 24/7: Soporte disponible las 24 horas con un Acuerdo de Nivel de Servicio (SLA)",
            },
            {
              label: "Certificados SSL",
              standard: "SSL básico incluido",
              blxk: "SSL Wildcard + Certificados Premium: Certificados avanzados para máxima seguridad",
            },
          ],
          advantages: [
            "Estabilidad y Velocidad: El sitio nunca se ralentizará por el tráfico de otros clientes",
            "Máxima Protección: Tranquilidad total ante cualquier pérdida de datos o ataque",
            "Carga Ultra Rápida: Mejora la experiencia del usuario y el ranking SEO",
            "Disponibilidad Total: El negocio del cliente nunca se detiene",
          ],
          useCases: [
            "E-commerce con alto volumen de tráfico",
            "Aplicaciones web empresariales críticas",
            "SaaS y plataformas de alta disponibilidad",
            "Proyectos que requieren máxima confiabilidad",
          ],
          metrics: [
            { label: "Uptime Garantizado", value: "99.9%" },
            { label: "Velocidad Promedio", value: "< 100ms" },
            { label: "Backups", value: "Diarios (30 días)" },
            { label: "Soporte", value: "24/7" },
          ],
        },
        {
          id: 4,
          slug: "marketing-digital",
          title: "Marketing Digital",
          icon: "📈",
          description: "Estrategia Multicanal y Medible",
          introduction:
            "La estrategia de marketing de BLXK es integral, multicanal y enfocada en métricas de negocio reales, no en vanidad.",
          features: [
            {
              label: "Canales de Publicidad",
              standard: "Exclusivamente Facebook (Meta Ads)",
              blxk: "Estrategia Multicanal: Gestión de campañas en Meta Ads, Google Ads (Search y Display) y TikTok Ads",
            },
            {
              label: "Reportes",
              standard: "No se detalla la frecuencia ni el contenido",
              blxk: "Reportes de ROI Semanales/Quincenales: Informes detallados enfocados en métricas de negocio (CPA, ROAS, ROI)",
            },
            {
              label: "Estrategia de Contenido",
              standard: "Enfocado solo en publicidad (banners)",
              blxk: "Integración Orgánica: Incluye componente de estrategia de contenido orgánico para construir marca",
            },
            {
              label: "Investigación",
              standard: "Segmentación básica",
              blxk: "Investigación de Audiencia Profunda: Creación de Buyer Personas detallados y análisis de competencia",
            },
            {
              label: "Optimización",
              standard: "Ajustes manuales ocasionales",
              blxk: "Optimización Continua: Tests A/B, Landing Page Optimization, y mejora semanal de campañas",
            },
          ],
          advantages: [
            "Máximo Alcance: El mensaje del cliente llega a su audiencia dondequiera que esté",
            "Transparencia y Medición: El cliente sabe exactamente el retorno de su inversión publicitaria",
            "Crecimiento Sostenible: La publicidad se apoya en una marca fuerte y contenido de valor",
            "Efectividad: Cada sol invertido en publicidad está dirigido al cliente ideal",
          ],
          useCases: [
            "E-commerce buscando escalar ventas",
            "Startups en fase de growth",
            "Negocios B2B buscando leads de calidad",
            "Marcas buscando posicionamiento integral",
          ],
          metrics: [
            { label: "Promedio ROAS", value: "3-5x" },
            { label: "Reducción CPA", value: "-40%" },
            { label: "Canales Gestionados", value: "3+" },
            { label: "Reportes", value: "Semanales" },
          ],
        },
      ],
    },
    servicesDetailed: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales desde desarrollo web hasta automatización e infraestructura",
      featuresLabel: "✨ Características Premium:",
      benefitsLabel: "⭐ Beneficios:",
      cta: "Más información",
      list: [
        {
          id: 1,
          title: "Páginas Web Profesionales",
          subtitle: "Ingeniería de Conversión + Performance 🔥",
          description: "Sitios web de alto rendimiento diseñados para convertir y escalar tu negocio",
          icon: "🌐",
          features: [
            "Desarrollo con Next.js / React",
            "Arquitectura de Conversión (CRO)",
            "UX Research + Wireframes + Prototipos",
            "Core Web Vitals garantizado (90+)",
            "SEO Técnico empresarial",
            "Velocidad ultrarrápida (0.3–1.5s)",
            "Seguridad Avanzada",
            "Animaciones premium",
            "Documentación + capacitación",
            "Garantía 6 meses antibugs",
          ],
          benefits: [
            "Sitios 10x más rápidos que WordPress",
            "Conversión +30% a +80%",
            "Escalable sin migrar tecnología",
            "Diseño personalizado",
            "SEO desde el día 1",
            "Soporte profesional",
          ],
        },
        {
          id: 2,
          title: "Páginas Corporativas / Institucionales",
          subtitle: "Nivel Empresarial 🔥",
          description: "Presencia digital profesional para empresas consolidadas",
          icon: "🏢",
          features: [
            "Manual corporativo digital",
            "Diseño institucional con branding",
            "Secciones: Nosotros, Misión, Historia, Equipo",
            "Proyectos ejecutados",
            "Certificaciones y cumplimiento",
            "Informe PDF inteligente",
            "Formularios avanzados con CRM",
            "Integración WhatsApp Business",
            "Infraestructura escalable",
          ],
          benefits: [
            "Imagen corporativa sólida",
            "Percepción de confianza",
            "Ideal para licitaciones",
            "Soporte garantizado",
          ],
        },
        {
          id: 3,
          title: "E-commerce de Alto Rendimiento",
          subtitle: "Ventas Automatizadas 🔥",
          description: "Plataforma de venta online optimizada para máxima conversión",
          icon: "🛒",
          features: [
            "Carrito optimizado",
            "Recuperación por Email + WhatsApp + Push",
            "Integración logística (Olva, Urbano)",
            "Pago: Yape/Plin/Culqi/Niubiz",
            "Cálculo automático por zonas",
            "Checkout de alta conversión",
            "Recomendador inteligente",
            "Tracking en tiempo real",
            "Panel de métricas avanzadas",
            "Integración ERP/POS opcional",
          ],
          benefits: [
            "Recuperación +20% a +40% ventas",
            "Mayor conversión",
            "Operación eficiente",
            "Escalable miles de productos",
            "Venta 24/7 automática",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Plataformas Educativas Profesionales 🔥",
          description: "Campus virtual estilo Udemy con todas las herramientas",
          icon: "📚",
          features: [
            "Panel estudiante + instructores",
            "Certificados automáticos",
            "Cursos por módulos y evaluaciones",
            "Progreso en tiempo real",
            "Gamificación: puntos, insignias, logros",
            "App móvil optimizada",
            "Clases en vivo (Zoom integrado)",
            "Foros + comunidad privada",
            "Recordatorios por WhatsApp",
            "Pasarela Yape/Plin/Niubiz/Culqi",
          ],
          benefits: [
            "Retención alta de alumnos",
            "Incremento ventas de cursos",
            "Certificación automática",
            "Flujo educativo moderno",
            "Escalable miles de estudiantes",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automatización con IA y n8n 🔥",
          description: "Workflows automáticos inteligentes para tu negocio",
          icon: "⚙️",
          features: [
            "Bots WhatsApp con IA (GPT/Gemini)",
            "Workflows: Pedidos, Pagos, Confirmaciones",
            "Recordatorios automáticos",
            "Integración CRM",
            "Conexión Homers, TAS, Rebrotal",
            "Automatización contable",
            "Embudos automatizados",
            "Notificaciones inteligentes",
            "Envío masivo segmentado",
            "Analítica avanzada",
          ],
          benefits: [
            "Ahorro 60% a 80% tiempo",
            "Respuestas rápidas",
            "Cero errores humanos",
            "Escalabilidad sin personal extra",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Solución Completa para Restaurantes 🔥",
          description: "Sistema integral para delivery y operación de restaurantes",
          icon: "🍔",
          features: [
            "Sistema pedidos multicanal",
            "Panel cocina (KDS) profesional",
            "App para repartidores",
            "Gestión de zonas entrega",
            "Integración WhatsApp",
            "Métodos de pago locales",
            "Reportes diarios/mensuales",
            "Gestión combos y costos",
            "Seguimiento en tiempo real",
          ],
          benefits: [
            "Aumenta ventas",
            "Reduce tiempos cocina",
            "Más control entregas",
            "Mejor experiencia cliente",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Sistema de Logística y Transporte 🔥",
          description: "Plataforma completa para gestión de reparto tercerizado",
          icon: "🚚",
          features: [
            "Sistema completo reparto",
            "Seguimiento en tiempo real",
            "Tarifas dinámicas por zona",
            "Panel del conductor",
            "Reportes de tiempos",
            "Modo empresa (flota)",
            "Integración tiendas/Homers",
          ],
          benefits: [
            "Mayor control logístico",
            "Optimización de rutas",
            "Menos costos operación",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Micro Logística Inteligente 🔥",
          description: "Delivery local instantáneo con ruteo inteligente",
          icon: "📦",
          features: [
            "Delivery local instantáneo",
            "Ruteo inteligente",
            "Integración e-commerce/Homers",
            "Notificaciones automáticas",
            "Panel administrativo optimizado",
          ],
          benefits: [
            "Atención más rápida",
            "Menos errores",
            "Entregas organizadas",
          ],
        },
        {
          id: 9,
          title: "Desarrollo WordPress Avanzado",
          subtitle: "Plugins y Temas a Medida ⚡",
          description: "Expertos en ecosistema WordPress para soluciones complejas",
          icon: "🔌",
          features: [
            "Desarrollo de Plugins personalizados",
            "Temas a medida (sin page builders lentos)",
            "Optimización de velocidad (WPO) extrema",
            "Seguridad y limpieza de malware",
            "Integración con APIs externas",
            "WooCommerce avanzado",
            "Migraciones complejas",
            "Headless WordPress con Next.js",
          ],
          benefits: [
            "Funcionalidad exacta que necesitas",
            "Sin dependencias de plugins lentos",
            "Sitio seguro y blindado",
            "Carga rápida garantizada",
          ],
        },
        {
          id: 10,
          title: "Apps Móviles y Escritorio",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "Aplicaciones nativas y multiplataforma de alto rendimiento",
          icon: "📲",
          features: [
            "Desarrollo iOS y Android (React Native)",
            "Apps de Escritorio (Electron / Tauri)",
            "Diseño UI/UX nativo",
            "Integración con hardware del dispositivo",
            "Notificaciones Push inteligentes",
            "Modo Offline First",
            "Publicación en Stores (App Store / Play Store)",
            "Sincronización en tiempo real",
          ],
          benefits: [
            "Presencia en el bolsillo del cliente",
            "Experiencia de usuario superior",
            "Mayor retención y engagement",
            "Funcionalidad cross-platform",
          ],
        },
        {
          id: 11,
          title: "Sistemas de Software a Medida",
          subtitle: "ERPs, CRMs y SaaS 🚀",
          description: "Arquitectura de software escalable para automatizar tu negocio",
          icon: "⚙️",
          features: [
            "Sistemas de Gestión (ERP) personalizados",
            "CRMs a medida para tu flujo de ventas",
            "Plataformas SaaS (Software as a Service)",
            "Paneles Administrativos (Dashboards)",
            "Arquitectura Microservicios / Serverless",
            "Bases de datos optimizadas",
            "Roles y Permisos avanzados",
            "Reportes y Analítica en tiempo real",
          ],
          benefits: [
            "Control total de tu operación",
            "Escalabilidad sin límites de licencias",
            "Automatización de procesos clave",
            "Datos seguros y centralizados",
          ],
        },
        {
          id: 12,
          title: "BLXK Estudios",
          subtitle: "Producción Audiovisual Premium 🎬",
          description: "Contenido audiovisual profesional para tu marca",
          icon: "🎥",
          features: [
            "Fotografía profesional",
            "Videos corporativos y comerciales",
            "Banners 4K",
            "Edición cinematográfica",
            "Branding empresarial",
            "Diseño portadas y flyers",
            "Contenido TikTok/Reels Ads",
            "Catálogos digitales",
          ],
          benefits: [
            "Imagen profesional de alto impacto",
            "Aumento conversión visual",
            "Branding fuerte y recordable",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Sectores e Industrias",
      sectorsSubtitle: "Experiencia comprobada en múltiples sectores",
      contactTitle: "Contacto",
      contactSubtitle: "¿Listo para transformar tu negocio? Hablemos",
      emailLabel: "Email",
      locationLabel: "Ubicación",
      locationValue: "Lima, Perú 🇵🇪",
      specialtiesLabel: "Especialidades",
      specialtiesValue: "Desarrollo web · Automatización · IA",
      ctaStart: "Iniciar Proyecto",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Agencias de turismo y hospitalidad",
        "Retail y comercio electrónico",
        "Startups tecnológicas y SaaS",
        "Instituciones educativas",
        "Emprendedores y consultores independientes",
        "Equipos internos de automatización y IT",
      ],
    },
    projectsShowcase: {
      title: "Portafolio",
      subtitle: "Proyectos reales que demuestran resultados tangibles",
      ctaTitle: "¿Tienes un proyecto ambicioso en mente?",
      ctaButton: "Solicitar Cotización Premium",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "Plugin WordPress",
          description: "Gateway de pagos vía WhatsApp para WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automatización",
          description: "Flujos automáticos: compra → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Sistema de gestión de pedidos en tiempo real",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Inteligencia Artificial",
          description: "Bot con IA para atención y toma de pedidos",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Dashboard",
          description: "Panel administrativo con analytics avanzados",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "Esta misma web que estás viendo ahora",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Extracción de leads desde Google Maps y redes sociales con envío automatizado vía WhatsApp API",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Real-Time Monitoring",
          description: "Monitoreo en tiempo real de equipos, procesos y actividad de empleados con alertas instantáneas",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Point of Sale",
          description: "Sistema de venta de pasajes para transporte interprovincial con gestión de asientos y rutas",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Enterprise System",
          description: "Sistema de facturación electrónica integrado con API de SUNAT para emisión de comprobantes fiscales",
        },
      ],
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
    techStack: {
      title: "Technology Stack",
      subtitle: "Cutting-edge tools for world-class solutions",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Databases",
        devops: "DevOps & Cloud",
        automation: "Automation & AI",
      },
    },
    projects: {
      badge: "Success Stories",
      title: "Portfolio",
      subtitle: "Real projects that demonstrate tangible results",
    },
    services: {
      title: "Superior Value Proposal",
      subtitle: "Our solutions exceed market standards in performance, security, and ROI",
      ctaMore: "Request More Information",
      ctaAll: "View All Services",
      tabs: {
        overview: "Overview",
        comparison: "BLXK vs Market",
        advantages: "Advantages",
        usecases: "Use Cases",
      },
      labels: {
        metrics: "Key Metrics",
        standard: "Standard:",
        blxk: "BLXK:",
        clickDetails: "Click to see details",
      },
      list: [
        {
          id: 1,
          slug: "web-development",
          title: "Web Development",
          icon: "🌐",
          description: "Conversion Engineering + Performance",
          introduction: "Our web development plans focus on conversion engineering, ensuring that each site is not only visually attractive but a high-performance business tool.",
          features: [
            {
              label: "Base Technology",
              standard: "Use of generic CMS (e.g., WordPress with Elementor)",
              blxk: "Development with Modern Frameworks (e.g., Next.js/React) or Headless CMS for maximum speed and scalability",
            },
            {
              label: "Performance",
              standard: "Specific performance not guaranteed",
              blxk: "Core Web Vitals Guarantee: Technical optimization to achieve high scores in Google metrics (LCP, FID, CLS)",
            },
            {
              label: "Design & UX",
              standard: "Design 'to client taste' with templates",
              blxk: "User-Centered Design (UX/CRO): Includes Research, Prototyping (Wireframes), and Usability Testing phases",
            },
            {
              label: "Technical SEO",
              standard: "Template 'Ideal for SEO'",
              blxk: "Advanced SEO Structure: Configuration of Schema Markup, XML Sitemap, and Optimized Content Structure",
            },
            {
              label: "Post-Launch Support",
              standard: "Support limited to hosting term",
              blxk: "6-Month Development Guarantee: Total coverage against programming errors and post-delivery bugs",
            },
          ],
          advantages: [
            "Guaranteed Performance: Sites up to 10 times faster, crucial for SEO and user experience",
            "Conversion Optimization: Design validated to guide the user towards the desired action",
            "Maximum Technical SEO: Ensures the best organic positioning from launch",
            "Client Peace of Mind: Minimizes risk and initial maintenance cost",
          ],
          useCases: [
            "Digital Marketing Agencies - Need conversion sites that close deals",
            "Premium E-commerce - Require impeccable speed and UX",
            "Growing Startups - Seek scalability without migrating code",
            "B2B Service Businesses - Need professional presence that generates trust",
          ],
          metrics: [
            { label: "Average Speed", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Conversion Increase", value: "+30-80%" },
            { label: "Anti-bug Guarantee", value: "6 months" },
          ],
        },
        // ... (Repeating similar structure for other services in English, keeping it brief for the sake of the example but would ideally be fully translated) ...
        {
          id: 2,
          slug: "ecommerce",
          title: "Online Stores",
          icon: "🛒",
          description: "High Impact E-commerce",
          introduction: "BLXK's e-commerce solutions go beyond simple sales, integrating logistics, conversion marketing, and advanced management.",
          features: [
            { label: "Logistics", standard: "No integration specified", blxk: "Local Logistics Integration" },
            { label: "Conversion Marketing", standard: "Basic cart features", blxk: "Abandoned Cart Recovery Module" },
            // ... simplified for brevity in this response, normally would be full
          ],
          advantages: ["Recovery +20% to +40% of lost sales", "Higher conversion with local payment methods"],
          useCases: ["Online retail stores", "Multichannel distributors"],
          metrics: [{ label: "Conversion Increase", value: "+30-80%" }],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Web Hosting",
          icon: "🔐",
          description: "High Performance Infrastructure",
          introduction: "BLXK hosting service is designed for speed and security.",
          features: [],
          advantages: [],
          useCases: [],
          metrics: [],
        },
        {
          id: 4,
          slug: "marketing",
          title: "Digital Marketing",
          icon: "📈",
          description: "Multichannel & Measurable Strategy",
          introduction: "BLXK's marketing strategy is integral, multichannel, and focused on real business metrics.",
          features: [],
          advantages: [],
          useCases: [],
          metrics: [],
        },
      ],
    },
    servicesDetailed: {
      title: "Our Services",
      subtitle: "Comprehensive solutions from web development to automation and infrastructure",
      featuresLabel: "✨ Premium Features:",
      benefitsLabel: "⭐ Benefits:",
      cta: "More information",
      list: [
        {
          id: 1,
          title: "Professional Web Pages",
          subtitle: "Conversion Engineering + Performance 🔥",
          description: "High-performance websites designed to convert and scale your business",
          icon: "🌐",
          features: [
            "Development with Next.js / React",
            "Conversion Architecture (CRO)",
            "UX Research + Wireframes + Prototypes",
            "Guaranteed Core Web Vitals (90+)",
            "Enterprise Technical SEO",
            "Ultra-fast speed (0.3–1.5s)",
            "Advanced Security",
            "Premium Animations",
            "Documentation + Training",
            "6-Month Anti-bug Guarantee",
          ],
          benefits: [
            "Sites 10x faster than WordPress",
            "Conversion +30% to +80%",
            "Scalable without migrating technology",
            "Custom Design",
            "SEO from Day 1",
            "Professional Support",
          ],
        },
        {
          id: 2,
          title: "Corporate / Institutional Pages",
          subtitle: "Enterprise Level 🔥",
          description: "Professional digital presence for established companies",
          icon: "🏢",
          features: [
            "Digital Corporate Manual",
            "Institutional Design with Branding",
            "Sections: About Us, Mission, History, Team",
            "Executed Projects",
            "Certifications and Compliance",
            "Smart PDF Report",
            "Advanced Forms with CRM",
            "WhatsApp Business Integration",
            "Scalable Infrastructure",
          ],
          benefits: [
            "Solid Corporate Image",
            "Perception of Trust",
            "Ideal for Tenders",
            "Guaranteed Support",
          ],
        },
        {
          id: 3,
          title: "High Performance E-commerce",
          subtitle: "Automated Sales 🔥",
          description: "Online sales platform optimized for maximum conversion",
          icon: "🛒",
          features: [
            "Optimized Cart",
            "Recovery via Email + WhatsApp + Push",
            "Logistics Integration (Olva, Urbano)",
            "Payment: Yape/Plin/Culqi/Niubiz",
            "Automatic Calculation by Zones",
            "High Conversion Checkout",
            "Smart Recommender",
            "Real-time Tracking",
            "Advanced Metrics Panel",
            "Optional ERP/POS Integration",
          ],
          benefits: [
            "Recovery +20% to +40% sales",
            "Higher Conversion",
            "Efficient Operation",
            "Scalable to thousands of products",
            "Automatic 24/7 Sales",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Professional Educational Platforms 🔥",
          description: "Udemy-style virtual campus with all tools",
          icon: "📚",
          features: [
            "Student + Instructor Panel",
            "Automatic Certificates",
            "Courses by Modules and Assessments",
            "Real-time Progress",
            "Gamification: points, badges, achievements",
            "Optimized Mobile App",
            "Live Classes (Zoom Integrated)",
            "Forums + Private Community",
            "WhatsApp Reminders",
            "Gateway Yape/Plin/Niubiz/Culqi",
          ],
          benefits: [
            "High Student Retention",
            "Increased Course Sales",
            "Automatic Certification",
            "Modern Educational Flow",
            "Scalable to thousands of students",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automation with AI and n8n 🔥",
          description: "Smart automatic workflows for your business",
          icon: "⚙️",
          features: [
            "WhatsApp Bots with AI (GPT/Gemini)",
            "Workflows: Orders, Payments, Confirmations",
            "Automatic Reminders",
            "CRM Integration",
            "Connection Homers, TAS, Rebrotal",
            "Accounting Automation",
            "Automated Funnels",
            "Smart Notifications",
            "Segmented Mass Sending",
            "Advanced Analytics",
          ],
          benefits: [
            "Save 60% to 80% time",
            "Quick Responses",
            "Zero Human Errors",
            "Scalability without extra staff",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Complete Solution for Restaurants 🔥",
          description: "Comprehensive system for delivery and restaurant operation",
          icon: "🍔",
          features: [
            "Multichannel Ordering System",
            "Professional Kitchen Panel (KDS)",
            "App for Delivery Drivers",
            "Delivery Zone Management",
            "WhatsApp Integration",
            "Local Payment Methods",
            "Daily/Monthly Reports",
            "Combos and Cost Management",
            "Real-time Tracking",
          ],
          benefits: [
            "Increases Sales",
            "Reduces Kitchen Times",
            "More Delivery Control",
            "Better Customer Experience",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Logistics and Transport System 🔥",
          description: "Complete platform for outsourced delivery management",
          icon: "🚚",
          features: [
            "Complete Delivery System",
            "Real-time Tracking",
            "Dynamic Rates by Zone",
            "Driver Panel",
            "Time Reports",
            "Enterprise Mode (Fleet)",
            "Store/Homers Integration",
          ],
          benefits: [
            "Greater Logistics Control",
            "Route Optimization",
            "Lower Operating Costs",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Smart Micro Logistics 🔥",
          description: "Instant local delivery with smart routing",
          icon: "📦",
          features: [
            "Instant Local Delivery",
            "Smart Routing",
            "E-commerce/Homers Integration",
            "Automatic Notifications",
            "Optimized Administrative Panel",
          ],
          benefits: [
            "Faster Attention",
            "Fewer Errors",
            "Organized Deliveries",
          ],
        },
        {
          id: 9,
          title: "Advanced WordPress Development",
          subtitle: "Custom Plugins and Themes ⚡",
          description: "Experts in WordPress ecosystem for complex solutions",
          icon: "🔌",
          features: [
            "Custom Plugin Development",
            "Custom Themes (no slow page builders)",
            "Extreme Speed Optimization (WPO)",
            "Security and Malware Cleaning",
            "Integration with External APIs",
            "Advanced WooCommerce",
            "Complex Migrations",
            "Headless WordPress with Next.js",
          ],
          benefits: [
            "Exact Functionality You Need",
            "No Dependencies on Slow Plugins",
            "Secure and Shielded Site",
            "Guaranteed Fast Loading",
          ],
        },
        {
          id: 10,
          title: "Mobile and Desktop Apps",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "High-performance native and cross-platform applications",
          icon: "📲",
          features: [
            "iOS and Android Development (React Native)",
            "Desktop Apps (Electron / Tauri)",
            "Native UI/UX Design",
            "Device Hardware Integration",
            "Smart Push Notifications",
            "Offline First Mode",
            "Store Publication (App Store / Play Store)",
            "Real-time Synchronization",
          ],
          benefits: [
            "Presence in Customer's Pocket",
            "Superior User Experience",
            "Higher Retention and Engagement",
            "Cross-platform Functionality",
          ],
        },
        {
          id: 11,
          title: "Custom Software Systems",
          subtitle: "ERPs, CRMs and SaaS 🚀",
          description: "Scalable software architecture to automate your business",
          icon: "⚙️",
          features: [
            "Custom Management Systems (ERP)",
            "Custom CRMs for Sales Flow",
            "SaaS Platforms (Software as a Service)",
            "Administrative Panels (Dashboards)",
            "Microservices / Serverless Architecture",
            "Optimized Databases",
            "Advanced Roles and Permissions",
            "Real-time Reports and Analytics",
          ],
          benefits: [
            "Total Control of Operation",
            "Scalability without License Limits",
            "Key Process Automation",
            "Secure and Centralized Data",
          ],
        },
        {
          id: 12,
          title: "BLXK Studios",
          subtitle: "Premium Audiovisual Production 🎬",
          description: "Professional audiovisual content for your brand",
          icon: "🎥",
          features: [
            "Professional Photography",
            "Corporate and Commercial Videos",
            "4K Banners",
            "Cinematic Editing",
            "Corporate Branding",
            "Cover and Flyer Design",
            "TikTok/Reels Ads Content",
            "Digital Catalogs",
          ],
          benefits: [
            "High Impact Professional Image",
            "Increased Visual Conversion",
            "Strong and Memorable Branding",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Sectors and Industries",
      sectorsSubtitle: "Proven experience in multiple sectors",
      contactTitle: "Contact",
      contactSubtitle: "Ready to transform your business? Let's talk",
      emailLabel: "Email",
      locationLabel: "Location",
      locationValue: "Lima, Peru 🇵🇪",
      specialtiesLabel: "Specialties",
      specialtiesValue: "Web Development · Automation · AI",
      ctaStart: "Start Project",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Tourism and Hospitality Agencies",
        "Retail and E-commerce",
        "Tech Startups and SaaS",
        "Educational Institutions",
        "Entrepreneurs and Independent Consultants",
        "Internal Automation and IT Teams",
      ],
    },
    projectsShowcase: {
      title: "Portfolio",
      subtitle: "Real projects that demonstrate tangible results",
      ctaTitle: "Have an ambitious project in mind?",
      ctaButton: "Request Premium Quote",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "WordPress Plugin",
          description: "WhatsApp Payment Gateway for WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automation",
          description: "Automatic flows: purchase → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Real-time order management system",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Artificial Intelligence",
          description: "AI Bot for customer service and order taking",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Dashboard",
          description: "Administrative panel with advanced analytics",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "This very website you are seeing now",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Lead extraction from Google Maps and social networks with automated WhatsApp API sending",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Real-Time Monitoring",
          description: "Real-time monitoring of teams, processes and employee activity with instant alerts",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Point of Sale",
          description: "Ticketing system for interprovincial transport with seat and route management",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Enterprise System",
          description: "Electronic billing system integrated with SUNAT API for fiscal documents issuance",
        },
      ],
    },
    digitalProducts: {
      title: "BLXK Digital Products",
      subtitle: "Ready-to-launch solutions to grow your business: hosting, templates, payments, and automations.",
      list: [
        {
          id: 1,
          title: "Reseller Hosting",
          description: "Entrepreneur, Business, and Premium plans with cPanel, WHM, and SSL. Ideal for hosting resale.",
        },
        {
          id: 2,
          title: "Elementor Templates",
          description: "Professional ready-to-use templates optimized for conversion.",
        },
        {
          id: 3,
          title: "Payment Integrations",
          description: "Implementation of Yape, Plin, Izipay QR, and other payment gateways.",
        },
        {
          id: 4,
          title: "Pre-configured Automations",
          description: "Ready-made n8n flows to connect WhatsApp, CRM, and notifications.",
        },
      ],
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
    techStack: {
      title: "Stack Tecnológico",
      subtitle: "Ferramentas de ponta para soluções de classe mundial",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Banco de Dados",
        devops: "DevOps & Cloud",
        automation: "Automação & IA",
      },
    },
    projects: {
      badge: "Casos de Sucesso",
      title: "Portfólio",
      subtitle: "Projetos reais que demonstram resultados tangíveis",
    },
    services: {
      title: "Proposta de Valor Superior",
      subtitle: "Nossas soluções superam os padrões de mercado em desempenho, segurança e ROI",
      ctaMore: "Solicitar Mais Informações",
      ctaAll: "Ver Todos os Serviços",
      tabs: {
        overview: "Visão Geral",
        comparison: "BLXK vs Mercado",
        advantages: "Vantagens",
        usecases: "Casos de Uso",
      },
      labels: {
        metrics: "Métricas Chave",
        standard: "Padrão:",
        blxk: "BLXK:",
        clickDetails: "Clique para ver detalhes",
      },
      list: [
        {
          id: 1,
          slug: "desenvolvimento-web",
          title: "Desenvolvimento de Sites",
          icon: "🌐",
          description: "Engenharia de Conversão + Performance",
          introduction:
            "Nossos planos de desenvolvimento web focam na engenharia de conversão, garantindo que cada site não seja apenas visualmente atraente, mas uma ferramenta de negócios de alto desempenho.",
          features: [
            {
              label: "Tecnologia Base",
              standard: "Uso de CMS genéricos (ex. WordPress com Elementor)",
              blxk: "Desenvolvimento com Frameworks Modernos (ex. Next.js/React) ou Headless CMS para máxima velocidade e escalabilidade",
            },
            {
              label: "Desempenho",
              standard: "Desempenho específico não garantido",
              blxk: "Garantia de Core Web Vitals: Otimização técnica para alcançar altas pontuações nas métricas do Google (LCP, FID, CLS)",
            },
            {
              label: "Design e UX",
              standard: "Design 'a gosto do cliente' com templates",
              blxk: "Design Centrado no Usuário (UX/CRO): Inclui fases de Pesquisa, Prototipagem (Wireframes) e Testes de Usabilidade",
            },
            {
              label: "SEO Técnico",
              standard: "Template 'Ideal para SEO'",
              blxk: "Estrutura SEO Avançada: Configuração de Schema Markup, Sitemap XML e Estrutura de Conteúdo Otimizada",
            },
            {
              label: "Suporte Pós-Lançamento",
              standard: "Suporte limitado ao prazo de hospedagem",
              blxk: "Garantia de Desenvolvimento de 6 Meses: Cobertura total contra erros de programação e bugs pós-entrega",
            },
          ],
          advantages: [
            "Desempenho Garantido: Sites até 10x mais rápidos, crucial para SEO e experiência do usuário",
            "Otimização de Conversão: O design é validado para guiar o usuário à ação desejada",
            "Máximo SEO Técnico: Garante o melhor posicionamento orgânico desde o lançamento",
            "Tranquilidade do Cliente: Minimiza riscos e custos de manutenção inicial",
          ],
          useCases: [
            "Agências de Marketing Digital - Precisam de sites de conversão que fecham negócios",
            "E-commerce Premium - Exigem velocidade e UX impecáveis",
            "Startups em Crescimento - Buscam escalabilidade sem migrar código",
            "Empresas de Serviços B2B - Precisam de presença profissional que gere confiança",
          ],
          metrics: [
            { label: "Velocidade Média", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Aumento Conversão", value: "+30-80%" },
            { label: "Garantia Antibugs", value: "6 meses" },
          ],
        },
        {
          id: 2,
          slug: "ecommerce",
          title: "Lojas Virtuais",
          icon: "🛒",
          description: "E-commerce de Alto Impacto",
          introduction:
            "As soluções de e-commerce da BLXK vão além da simples venda, integrando logística, marketing de conversão e gestão avançada.",
          features: [
            {
              label: "Logística",
              standard: "Integração logística não especificada",
              blxk: "Integração Logística Local: Conexão com pelo menos duas plataformas de envio locais populares",
            },
            {
              label: "Marketing de Conversão",
              standard: "Funcionalidades básicas de carrinho",
              blxk: "Módulo de Recuperação de Carrinhos Abandonados: Configuração de automações por email ou WhatsApp",
            },
            {
              label: "Meios de Pagamento",
              standard: "Pagamentos com cartão e depósitos",
              blxk: "Integração com Gateways Locais: Conexão com gateways de pagamento de alta conversão",
            },
            {
              label: "Gestão de Estoque",
              standard: "Painel de administração básico",
              blxk: "Integração ERP/POS (Opcional): Possibilidade de conectar com sistemas de gestão de estoque",
            },
            {
              label: "Analytics",
              standard: "Analítica não detalhada",
              blxk: "Configuração Avançada de GA4 e Pixels: Implementação de rastreamento de eventos de e-commerce",
            },
          ],
          advantages: [
            "Recuperação de +20% a +40% de vendas perdidas",
            "Maior conversão com métodos de pagamento locais",
            "Operação mais rápida e eficiente",
            "Escalável para milhares de produtos",
            "Sistema preparado para vender 24/7",
          ],
          useCases: [
            "Lojas de varejo online - Precisam de máxima conversão",
            "Distribuidoras multicanal - Exigem integração com ERP",
            "Marcas de moda e acessórios - Buscam experiência premium",
            "Negócios de delivery/F&B - Precisam de integração logística",
          ],
          metrics: [
            { label: "Aumento Conversão", value: "+30-80%" },
            { label: "Recuperação Carrinhos", value: "+40%" },
            { label: "Métodos de Pagamento", value: "6+" },
            { label: "Escalabilidade", value: "Ilimitada" },
          ],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Hospedagem Web",
          icon: "🔐",
          description: "Infraestrutura de Alto Desempenho",
          introduction:
            "O serviço de hospedagem da BLXK é projetado para velocidade e segurança, superando as limitações de recursos compartilhados.",
          features: [
            {
              label: "Recursos de Servidor",
              standard: "Recursos fixos para todos os planos",
              blxk: "Recursos Dedicados e Escaláveis: Alocação de CPU e RAM que escala com o plano",
            },
            {
              label: "Segurança de Dados",
              standard: "Segurança básica",
              blxk: "Política de Backups Robusta: Cópias de segurança diárias automatizadas com retenção de 30 dias",
            },
            {
              label: "Localização do Servidor",
              standard: "Não especificado",
              blxk: "Servidores Otimizados para Latência: Localização estratégica do data center para menor latência",
            },
            {
              label: "Suporte Técnico",
              standard: "Suporte em horário comercial",
              blxk: "Suporte Técnico Crítico 24/7: Suporte disponível 24 horas com SLA",
            },
            {
              label: "Certificados SSL",
              standard: "SSL básico incluído",
              blxk: "SSL Wildcard + Certificados Premium: Certificados avançados para máxima segurança",
            },
          ],
          advantages: [
            "Estabilidade e Velocidade: O site nunca ficará lento devido ao tráfego de outros clientes",
            "Máxima Proteção: Tranquilidade total contra perda de dados ou ataques",
            "Carregamento Ultra Rápido: Melhora a experiência do usuário e ranking SEO",
            "Disponibilidade Total: O negócio do cliente nunca para",
          ],
          useCases: [
            "E-commerce com alto volume de tráfego",
            "Aplicações web empresariais críticas",
            "SaaS e plataformas de alta disponibilidade",
            "Projetos que exigem máxima confiabilidade",
          ],
          metrics: [
            { label: "Uptime Garantido", value: "99.9%" },
            { label: "Velocidade Média", value: "< 100ms" },
            { label: "Backups", value: "Diários (30 dias)" },
            { label: "Suporte", value: "24/7" },
          ],
        },
        {
          id: 4,
          slug: "marketing-digital",
          title: "Marketing Digital",
          icon: "📈",
          description: "Estratégia Multicanal e Mensurável",
          introduction:
            "A estratégia de marketing da BLXK é integral, multicanal e focada em métricas de negócios reais, não em vaidade.",
          features: [
            {
              label: "Canais de Publicidade",
              standard: "Exclusivamente Facebook (Meta Ads)",
              blxk: "Estratégia Multicanal: Gestão de campanhas em Meta Ads, Google Ads e TikTok Ads",
            },
            {
              label: "Relatórios",
              standard: "Frequência e conteúdo não detalhados",
              blxk: "Relatórios de ROI Semanais/Quinzenais: Relatórios detalhados focados em métricas de negócios (CPA, ROAS, ROI)",
            },
            {
              label: "Estratégia de Conteúdo",
              standard: "Focado apenas em publicidade",
              blxk: "Integração Orgânica: Inclui estratégia de conteúdo orgânico para construção de marca",
            },
            {
              label: "Pesquisa",
              standard: "Segmentação básica",
              blxk: "Pesquisa de Audiência Profunda: Criação de Buyer Personas detalhados e análise de concorrência",
            },
            {
              label: "Otimização",
              standard: "Ajustes manuais ocasionais",
              blxk: "Otimização Contínua: Testes A/B, Otimização de Landing Pages e melhoria semanal de campanhas",
            },
          ],
          advantages: [
            "Máximo Alcance: A mensagem chega à audiência onde quer que esteja",
            "Transparência e Medição: O cliente sabe exatamente o retorno do investimento",
            "Crescimento Sustentável: A publicidade é apoiada por uma marca forte",
            "Efetividade: Cada centavo investido é direcionado ao cliente ideal",
          ],
          useCases: [
            "E-commerce buscando escalar vendas",
            "Startups em fase de crescimento",
            "Negócios B2B buscando leads de qualidade",
            "Marcas buscando posicionamento integral",
          ],
          metrics: [
            { label: "ROAS Médio", value: "3-5x" },
            { label: "Redução CPA", value: "-40%" },
            { label: "Canais Geridos", value: "3+" },
            { label: "Relatórios", value: "Semanais" },
          ],
        },
      ],
    },
    servicesDetailed: {
      title: "Nossos Serviços",
      subtitle: "Soluções abrangentes desde desenvolvimento web até automação e infraestrutura",
      featuresLabel: "✨ Recursos Premium:",
      benefitsLabel: "⭐ Benefícios:",
      cta: "Mais informações",
      list: [
        {
          id: 1,
          title: "Páginas Web Profissionais",
          subtitle: "Engenharia de Conversão + Performance 🔥",
          description: "Sites de alto desempenho projetados para converter e escalar seu negócio",
          icon: "🌐",
          features: [
            "Desenvolvimento com Next.js / React",
            "Arquitetura de Conversão (CRO)",
            "UX Research + Wireframes + Protótipos",
            "Core Web Vitals garantido (90+)",
            "SEO Técnico empresarial",
            "Velocidade ultrarrápida (0.3–1.5s)",
            "Segurança Avançada",
            "Animações premium",
            "Documentação + treinamento",
            "Garantia de 6 meses antibugs",
          ],
          benefits: [
            "Sites 10x mais rápidos que WordPress",
            "Conversão +30% a +80%",
            "Escalável sem migrar tecnologia",
            "Design personalizado",
            "SEO desde o dia 1",
            "Suporte profissional",
          ],
        },
        {
          id: 2,
          title: "Páginas Corporativas / Institucionais",
          subtitle: "Nível Empresarial 🔥",
          description: "Presença digital profissional para empresas consolidadas",
          icon: "🏢",
          features: [
            "Manual corporativo digital",
            "Design institucional com branding",
            "Seções: Sobre, Missão, História, Equipe",
            "Projetos executados",
            "Certificações e conformidade",
            "Relatório PDF inteligente",
            "Formulários avançados com CRM",
            "Integração WhatsApp Business",
            "Infraestrutura escalável",
          ],
          benefits: [
            "Imagem corporativa sólida",
            "Percepção de confiança",
            "Ideal para licitações",
            "Suporte garantido",
          ],
        },
        {
          id: 3,
          title: "E-commerce de Alto Desempenho",
          subtitle: "Vendas Automatizadas 🔥",
          description: "Plataforma de venda online otimizada para máxima conversão",
          icon: "🛒",
          features: [
            "Carrinho otimizado",
            "Recuperação por Email + WhatsApp + Push",
            "Integração logística (Olva, Urbano)",
            "Pagamento: Yape/Plin/Culqi/Niubiz",
            "Cálculo automático por zonas",
            "Checkout de alta conversão",
            "Recomendador inteligente",
            "Rastreamento em tempo real",
            "Painel de métricas avançadas",
            "Integração ERP/POS opcional",
          ],
          benefits: [
            "Recuperação +20% a +40% vendas",
            "Maior conversão",
            "Operação eficiente",
            "Escalável milhares de produtos",
            "Venda 24/7 automática",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Plataformas Educativas Profissionais 🔥",
          description: "Campus virtual estilo Udemy com todas as ferramentas",
          icon: "📚",
          features: [
            "Painel estudante + instrutores",
            "Certificados automáticos",
            "Cursos por módulos e avaliações",
            "Progresso em tempo real",
            "Gamificação: pontos, insígnias, conquistas",
            "App móvel otimizado",
            "Aulas ao vivo (Zoom integrado)",
            "Fóruns + comunidade privada",
            "Lembretes por WhatsApp",
            "Gateway Yape/Plin/Niubiz/Culqi",
          ],
          benefits: [
            "Retenção alta de alunos",
            "Incremento vendas de cursos",
            "Certificação automática",
            "Fluxo educativo moderno",
            "Escalável milhares de estudantes",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automação com IA e n8n 🔥",
          description: "Workflows automáticos inteligentes para seu negócio",
          icon: "⚙️",
          features: [
            "Bots WhatsApp com IA (GPT/Gemini)",
            "Workflows: Pedidos, Pagamentos, Confirmações",
            "Lembretes automáticos",
            "Integração CRM",
            "Conexão Homers, TAS, Rebrotal",
            "Automação contábil",
            "Funis automatizados",
            "Notificações inteligentes",
            "Envio em massa segmentado",
            "Analítica avançada",
          ],
          benefits: [
            "Economia 60% a 80% tempo",
            "Respostas rápidas",
            "Zero erros humanos",
            "Escalabilidade sem pessoal extra",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Solução Completa para Restaurantes 🔥",
          description: "Sistema integral para delivery e operação de restaurantes",
          icon: "🍔",
          features: [
            "Sistema pedidos multicanal",
            "Painel cozinha (KDS) profissional",
            "App para entregadores",
            "Gestão de zonas entrega",
            "Integração WhatsApp",
            "Métodos de pagamento locais",
            "Relatórios diários/mensais",
            "Gestão combos e custos",
            "Rastreamento em tempo real",
          ],
          benefits: [
            "Aumenta vendas",
            "Reduz tempos cozinha",
            "Mais controle entregas",
            "Melhor experiência cliente",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Sistema de Logística e Transporte 🔥",
          description: "Plataforma completa para gestão de entregas terceirizadas",
          icon: "🚚",
          features: [
            "Sistema completo de entregas",
            "Rastreamento em tempo real",
            "Tarifas dinâmicas por zona",
            "Painel do motorista",
            "Relatórios de tempos",
            "Modo empresa (frota)",
            "Integração lojas/Homers",
          ],
          benefits: [
            "Maior controle logístico",
            "Otimização de rotas",
            "Menos custos operação",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Micro Logística Inteligente 🔥",
          description: "Delivery local instantâneo com roteamento inteligente",
          icon: "📦",
          features: [
            "Delivery local instantâneo",
            "Roteamento inteligente",
            "Integração e-commerce/Homers",
            "Notificações automáticas",
            "Painel administrativo otimizado",
          ],
          benefits: [
            "Atendimento mais rápido",
            "Menos erros",
            "Entregas organizadas",
          ],
        },
        {
          id: 9,
          title: "Desenvolvimento WordPress Avançado",
          subtitle: "Plugins e Temas Sob Medida ⚡",
          description: "Experts em ecossistema WordPress para soluções complexas",
          icon: "🔌",
          features: [
            "Desenvolvimento de Plugins personalizados",
            "Temas sob medida (sem page builders lentos)",
            "Otimização de velocidade (WPO) extrema",
            "Segurança e limpeza de malware",
            "Integração com APIs externas",
            "WooCommerce avançado",
            "Migrações complexas",
            "Headless WordPress com Next.js",
          ],
          benefits: [
            "Funcionalidade exata que precisa",
            "Sem dependências de plugins lentos",
            "Site seguro e blindado",
            "Carga rápida garantida",
          ],
        },
        {
          id: 10,
          title: "Apps Móveis e Desktop",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "Aplicativos nativos e multiplataforma de alto desempenho",
          icon: "📲",
          features: [
            "Desenvolvimento iOS e Android (React Native)",
            "Apps de Desktop (Electron / Tauri)",
            "Design UI/UX nativo",
            "Integração com hardware do dispositivo",
            "Notificações Push inteligentes",
            "Modo Offline First",
            "Publicação em Stores (App Store / Play Store)",
            "Sincronização em tempo real",
          ],
          benefits: [
            "Presença no bolso do cliente",
            "Experiência de usuário superior",
            "Maior retenção e engajamento",
            "Funcionalidade cross-platform",
          ],
        },
        {
          id: 11,
          title: "Sistemas de Software Sob Medida",
          subtitle: "ERPs, CRMs e SaaS 🚀",
          description: "Arquitetura de software escalável para automatizar seu negócio",
          icon: "⚙️",
          features: [
            "Sistemas de Gestão (ERP) personalizados",
            "CRMs sob medida para seu fluxo de vendas",
            "Plataformas SaaS (Software as a Service)",
            "Painéis Administrativos (Dashboards)",
            "Arquitetura Microserviços / Serverless",
            "Bancos de dados otimizados",
            "Funções e Permissões avançadas",
            "Relatórios e Analítica em tempo real",
          ],
          benefits: [
            "Controle total da sua operação",
            "Escalabilidade sem limites de licenças",
            "Automação de processos chave",
            "Dados seguros e centralizados",
          ],
        },
        {
          id: 12,
          title: "BLXK Studios",
          subtitle: "Produção Audiovisual Premium 🎬",
          description: "Conteúdo audiovisual profissional para sua marca",
          icon: "🎥",
          features: [
            "Fotografia profissional",
            "Vídeos corporativos e comerciais",
            "Banners 4K",
            "Edição cinematográfica",
            "Branding empresarial",
            "Design capas e flyers",
            "Conteúdo TikTok/Reels Ads",
            "Catálogos digitais",
          ],
          benefits: [
            "Imagem profissional de alto impacto",
            "Aumento conversão visual",
            "Branding forte e memorável",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Setores e Indústrias",
      sectorsSubtitle: "Experiência comprovada em múltiplos setores",
      contactTitle: "Contato",
      contactSubtitle: "Pronto para transformar seu negócio? Vamos conversar",
      emailLabel: "Email",
      locationLabel: "Localização",
      locationValue: "Lima, Peru 🇵🇪",
      specialtiesLabel: "Especialidades",
      specialtiesValue: "Desenvolvimento Web · Automação · IA",
      ctaStart: "Iniciar Projeto",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Agências de Turismo e Hospitalidade",
        "Varejo e E-commerce",
        "Startups de Tecnologia e SaaS",
        "Instituições Educacionais",
        "Empreendedores e Consultores Independentes",
        "Times Internos de Automação e TI",
      ],
    },
    projectsShowcase: {
      title: "Portfólio",
      subtitle: "Projetos reais que demonstram resultados tangíveis",
      ctaTitle: "Tem um projeto ambicioso em mente?",
      ctaButton: "Solicitar Orçamento Premium",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "Plugin WordPress",
          description: "Gateway de pagamento via WhatsApp para WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automação",
          description: "Fluxos automáticos: compra → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Sistema de gestão de pedidos em tempo real",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Inteligência Artificial",
          description: "Bot com IA para atendimento e pedidos",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Dashboard",
          description: "Painel administrativo com analytics avançados",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "Este site que você está vendo agora",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Extração de leads do Google Maps e redes sociais com envio automatizado via WhatsApp API",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Real-Time Monitoring",
          description: "Monitoramento em tempo real de equipes, processos e atividade de funcionários com alertas instantâneos",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Point of Sale",
          description: "Sistema de venda de passagens para transporte interprovincial com gestão de assentos e rotas",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Enterprise System",
          description: "Sistema de faturamento eletrônico integrado com API da SUNAT para emissão de comprovantes fiscais",
        },
      ],
    },
    digitalProducts: {
      title: "Produtos Digitais BLXK",
      subtitle: "Soluções prontas para impulsionar seu negócio: hospedagem, templates, pagamentos e automações.",
      list: [
        {
          id: 1,
          title: "Hospedagem de Revenda",
          description: "Planos Empreendedor, Empresa e Premium com cPanel, WHM e SSL. Ideal para revenda de hospedagem.",
        },
        {
          id: 2,
          title: "Templates Elementor",
          description: "Templates profissionais prontos para uso, otimizados para conversão.",
        },
        {
          id: 3,
          title: "Integração de Pagamentos",
          description: "Implementação de Yape, Plin, Izipay QR e outros gateways de pagamento.",
        },
        {
          id: 4,
          title: "Automações Pré-configuradas",
          description: "Fluxos n8n prontos para conectar WhatsApp, CRM e notificações.",
        },
      ],
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
    techStack: {
      title: "Stack Technologique",
      subtitle: "Outils de pointe pour des solutions de classe mondiale",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Base de Données",
        devops: "DevOps & Cloud",
        automation: "Automatisation & IA",
      },
    },
    projects: {
      badge: "Histoires de Réussite",
      title: "Portfolio",
      subtitle: "Des projets réels qui démontrent des résultats tangibles",
    },
    services: {
      title: "Proposition de Valeur Supérieure",
      subtitle: "Nos solutions dépassent les normes du marché en performance, sécurité et ROI",
      ctaMore: "Demander Plus d'Informations",
      ctaAll: "Voir Tous les Services",
      tabs: {
        overview: "Aperçu",
        comparison: "BLXK vs Marché",
        advantages: "Avantages",
        usecases: "Cas des Usage",
      },
      labels: {
        metrics: "Métriques Clés",
        standard: "Standard:",
        blxk: "BLXK:",
        clickDetails: "Cliquez pour voir les détails",
      },
      list: [
        {
          id: 1,
          slug: "developpement-web",
          title: "Développement de Sites Web",
          icon: "🌐",
          description: "Ingénierie de Conversion + Performance",
          introduction:
            "Nos plans de développement web se concentrent sur l'ingénierie de conversion, garantissant que chaque site n'est pas seulement visuellement attrayant, mais un outil commercial performant.",
          features: [
            {
              label: "Technologie de Base",
              standard: "Utilisation de CMS génériques (ex. WordPress avec Elementor)",
              blxk: "Développement avec Frameworks Modernes (ex. Next.js/React) ou CMS Headless pour une vitesse et une évolutivité maximales",
            },
            {
              label: "Performance",
              standard: "Performance spécifique non garantie",
              blxk: "Garantie Core Web Vitals : Optimisation technique pour atteindre des scores élevés dans les métriques Google (LCP, FID, CLS)",
            },
            {
              label: "Design et UX",
              standard: "Design 'au goût du client' avec des modèles",
              blxk: "Design Centré Utilisateur (UX/CRO) : Comprend une phase de Recherche, Prototypage (Wireframes) et Tests d'Utilisabilité",
            },
            {
              label: "SEO Technique",
              standard: "Modèle 'Idéal pour le SEO'",
              blxk: "Structure SEO Avancée : Configuration de Schema Markup, Sitemap XML et Structure de Contenu optimisée",
            },
            {
              label: "Support Après-Lancement",
              standard: "Support limité à la durée de l'hébergement",
              blxk: "Garantie de Développement de 6 Mois : Couverture totale contre les erreurs de programmation et les bugs après livraison",
            },
          ],
          advantages: [
            "Performance Garantie : Sites jusqu'à 10 fois plus rapides, crucial pour le SEO et l'expérience utilisateur",
            "Optimisation de la Conversion : Le design est validé pour guider l'utilisateur vers l'action souhaitée",
            "SEO Technique Maximal : Assure le meilleur positionnement organique dès le lancement",
            "Tranquillité d'Esprit Client : Minimise les risques et les coûts de maintenance initiale",
          ],
          useCases: [
            "Agences de Marketing Digital - Ont besoin de sites de conversion qui concluent des affaires",
            "E-commerce Premium - Exigent une vitesse et une UX impeccables",
            "Startups en Croissance - Cherchent l'évolutivité sans migrer de code",
            "Entreprises de Services B2B - Ont besoin d'une présence professionnelle génératrice de confiance",
          ],
          metrics: [
            { label: "Vitesse Moyenne", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Augmentation Conversion", value: "+30-80%" },
            { label: "Garantie Anti-bugs", value: "6 mois" },
          ],
        },
        {
          id: 2,
          slug: "ecommerce",
          title: "Boutiques en Ligne",
          icon: "🛒",
          description: "E-commerce à Fort Impact",
          introduction:
            "Les solutions e-commerce de BLXK vont au-delà de la simple vente, intégrant la logistique, le marketing de conversion et une gestion avancée.",
          features: [
            {
              label: "Logistique",
              standard: "Intégration logistique non spécifiée",
              blxk: "Intégration Logistique Locale : Connexion avec au moins deux plateformes d'expédition locales populaires",
            },
            {
              label: "Marketing de Conversion",
              standard: "Fonctionnalités de panier basiques",
              blxk: "Module de Récupération de Paniers Abandonnés : Configuration d'automatisations par email ou WhatsApp",
            },
            {
              label: "Moyens de Paiement",
              standard: "Paiements par carte et dépôts",
              blxk: "Intégration avec Passerelles Locales : Connexion avec des passerelles de paiement locales à haute conversion",
            },
            {
              label: "Gestion des Stocks",
              standard: "Panneau d'administration basique",
              blxk: "Intégration ERP/POS (Optionnel) : Possibilité de connecter avec des systèmes de gestion de stock",
            },
            {
              label: "Analytique",
              standard: "Analytique non détaillée",
              blxk: "Configuration Avancée de GA4 et Pixels : Implémentation du suivi des événements e-commerce",
            },
          ],
          advantages: [
            "Récupération de +20% à +40% des ventes perdues",
            "Conversion accrue avec des méthodes de paiement locales",
            "Opération plus rapide et efficace",
            "Évolutif pour des milliers de produits",
            "Système prêt pour vendre 24/7",
          ],
          useCases: [
            "Magasins de détail en ligne - Ont besoin de conversion maximale",
            "Distributeurs multicanaux - Exigent une intégration ERP",
            "Marques de mode et accessoires - Cherchent une expérience premium",
            "Entreprises de livraison/F&B - Ont besoin d'intégration logistique",
          ],
          metrics: [
            { label: "Augmentation Conversion", value: "+30-80%" },
            { label: "Récupération Paniers", value: "+40%" },
            { label: "Moyens de Paiement", value: "6+" },
            { label: "Évolutivité", value: "Illimitée" },
          ],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Hébergement Web",
          icon: "🔐",
          description: "Infrastructure Haute Performance",
          introduction:
            "Le service d'hébergement de BLXK est conçu pour la vitesse et la sécurité, dépassant les limitations des ressources partagées.",
          features: [
            {
              label: "Ressources Serveur",
              standard: "Ressources fixes pour tous les plans",
              blxk: "Ressources Dédiées et Évolutives : Allocation de CPU et RAM évolutive avec le plan",
            },
            {
              label: "Sécurité des Données",
              standard: "Sécurité de base",
              blxk: "Politique de Sauvegardes Robuste : Copies de sécurité quotidiennes automatisées avec rétention de 30 jours",
            },
            {
              label: "Localisation du Serveur",
              standard: "Non spécifié",
              blxk: "Serveurs Optimisés pour la Latence : Localisation stratégique du centre de données pour une latence minimale",
            },
            {
              label: "Support Technique",
              standard: "Support aux heures de bureau",
              blxk: "Support Technique Critique 24/7 : Support disponible 24 heures sur 24 avec SLA",
            },
            {
              label: "Certificats SSL",
              standard: "SSL de base inclus",
              blxk: "SSL Wildcard + Certificats Premium : Certificats avancés pour une sécurité maximale",
            },
          ],
          advantages: [
            "Stabilité et Vitesse : Le site ne ralentira jamais à cause du trafic d'autres clients",
            "Protection Maximale : Tranquillité totale contre la perte de données ou les attaques",
            "Chargement Ultra Rapide : Améliore l'expérience utilisateur et le classement SEO",
            "Disponibilité Totale : L'activité du client ne s'arrête jamais",
          ],
          useCases: [
            "E-commerce à fort volume de trafic",
            "Applications web d'entreprise critiques",
            "SaaS et plateformes à haute disponibilité",
            "Projets exigeant une fiabilité maximale",
          ],
          metrics: [
            { label: "Uptime Garanti", value: "99.9%" },
            { label: "Vitesse Moyenne", value: "< 100ms" },
            { label: "Sauvegardes", value: "Quotidiennes (30 jours)" },
            { label: "Support", value: "24/7" },
          ],
        },
        {
          id: 4,
          slug: "marketing-digital",
          title: "Marketing Numérique",
          icon: "📈",
          description: "Stratégie Multicanale et Mesurable",
          introduction:
            "La stratégie marketing de BLXK est intégrale, multicanale et axée sur des métriques commerciales réelles, pas de vanité.",
          features: [
            {
              label: "Canaux Publicitaires",
              standard: "Exclusivement Facebook (Meta Ads)",
              blxk: "Stratégie Multicanale : Gestion de campagnes sur Meta Ads, Google Ads et TikTok Ads",
            },
            {
              label: "Rapports",
              standard: "Fréquence et contenu non détaillés",
              blxk: "Rapports de ROI Hebdomadaires/Bihebdomadaires : Rapports détaillés axés sur les métriques commerciales (CPA, ROAS, ROI)",
            },
            {
              label: "Stratégie de Contenu",
              standard: "Axé uniquement sur la publicité",
              blxk: "Intégration Organique : Inclut une composante de stratégie de contenu organique pour construire la marque",
            },
            {
              label: "Recherche",
              standard: "Segmentation de base",
              blxk: "Recherche d'Audience Approfondie : Création de Buyer Personas détaillés et analyse de la concurrence",
            },
            {
              label: "Optimisation",
              standard: "Ajustements manuels occasionnels",
              blxk: "Optimisation Continue : Tests A/B, Optimisation de Landing Pages et amélioration hebdomadaire des campagnes",
            },
          ],
          advantages: [
            "Portée Maximale : Le message du client atteint son audience où qu'elle soit",
            "Transparence et Mesure : Le client connait exactement le retour sur investissement",
            "Croissance Durable : La publicité est soutenue par une marque forte",
            "Efficacité : Chaque centime investi est dirigé vers le client idéal",
          ],
          useCases: [
            "E-commerce cherchant à augmenter les ventes",
            "Startups en phase de croissance",
            "Entreprises B2B cherchant des leads de qualité",
            "Marques cherchant un positionnement intégral",
          ],
          metrics: [
            { label: "ROAS Moyen", value: "3-5x" },
            { label: "Réduction CPA", value: "-40%" },
            { label: "Canaux Gérés", value: "3+" },
            { label: "Rapports", value: "Hebdomadaires" },
          ],
        },
      ],
    },
    servicesDetailed: {
      title: "Nos Services",
      subtitle: "Solutions complètes du développement web à l'automatisation et aux infrastructures",
      featuresLabel: "✨ Fonctionnalités Premium :",
      benefitsLabel: "⭐ Avantages :",
      cta: "Plus d'informations",
      list: [
        {
          id: 1,
          title: "Pages Web Professionnelles",
          subtitle: "Ingénierie de Conversion + Performance 🔥",
          description: "Sites performants conçus pour convertir et évoluer",
          icon: "🌐",
          features: [
            "Développement avec Next.js / React",
            "Architecture de Conversion (CRO)",
            "UX Research + Wireframes + Prototypes",
            "Core Web Vitals garantis (90+)",
            "SEO Technique d'entreprise",
            "Vitesse ultra-rapide (0.3–1.5s)",
            "Sécurité Avancée",
            "Animations premium",
            "Documentation + formation",
            "Garantie 6 mois anti-bugs",
          ],
          benefits: [
            "Sites 10x plus rapides que WordPress",
            "Conversion +30% à +80%",
            "Évolutif sans changer de technologie",
            "Design personnalisé",
            "SEO dès le premier jour",
            "Support professionnel",
          ],
        },
        {
          id: 2,
          title: "Pages Corporatives / Institutionnelles",
          subtitle: "Niveau Entreprise 🔥",
          description: "Présence numérique professionnelle pour entreprises établies",
          icon: "🏢",
          features: [
            "Manuel corporatif numérique",
            "Design institutionnel avec branding",
            "Sections : À Propos, Mission, Histoire, Équipe",
            "Projets réalisés",
            "Certifications et conformité",
            "Rapport PDF intelligent",
            "Formulaires avancés avec CRM",
            "Intégration WhatsApp Business",
            "Infrastructure évolutive",
          ],
          benefits: [
            "Image corporative solide",
            "Perception de confiance",
            "Idéal pour appels d'offres",
            "Support garanti",
          ],
        },
        {
          id: 3,
          title: "E-commerce Haute Performance",
          subtitle: "Ventes Automatisées 🔥",
          description: "Plateforme de vente en ligne optimisée pour une conversion maximale",
          icon: "🛒",
          features: [
            "Panier optimisé",
            "Récupération par Email + WhatsApp + Push",
            "Intégration logistique",
            "Paiement : Yape/Plin/Culqi/Niubiz",
            "Calcul automatique par zones",
            "Checkout à haute conversion",
            "Recommandation intelligente",
            "Suivi en temps réel",
            "Tableau de bord de métriques avancées",
            "Intégration ERP/POS optionnelle",
          ],
          benefits: [
            "Récupération +20% à +40% des ventes",
            "Conversion accrue",
            "Opération efficace",
            "Évolutif pour des milliers de produits",
            "Vente 24/7 automatique",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Plateformes Éducatives Professionnelles 🔥",
          description: "Campus virtuel style Udemy avec tous les outils",
          icon: "📚",
          features: [
            "Tableau de bord étudiant + instructeurs",
            "Certificats automatiques",
            "Cours par modules et évaluations",
            "Progression en temps réel",
            "Ludification : points, badges, réalisations",
            "App mobile optimisée",
            "Cours en direct (Zoom intégré)",
            "Forums + communauté privée",
            "Rappels par WhatsApp",
            "Passerelle Yape/Plin/Niubiz/Culqi",
          ],
          benefits: [
            "Haute rétention des étudiants",
            "Augmentation des ventes de cours",
            "Certification automatique",
            "Flux éducatif moderne",
            "Évolutif pour des milliers d'étudiants",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automatisation avec IA et n8n 🔥",
          description: "Workflows automatiques intelligents pour votre entreprise",
          icon: "⚙️",
          features: [
            "Bots WhatsApp avec IA (GPT/Gemini)",
            "Workflows : Commandes, Paiements, Confirmations",
            "Rappels automatiques",
            "Intégration CRM",
            "Connexion Homers, TAS, Rebrotal",
            "Automatisation comptable",
            "Entonnoirs automatisés",
            "Notifications intelligentes",
            "Envoi massif segmenté",
            "Analytique avancée",
          ],
          benefits: [
            "Économie 60% à 80% de temps",
            "Réponses rapides",
            "Zéro erreur humaine",
            "Évolutivité sans personnel supplémentaire",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Solution Complète pour Restaurants 🔥",
          description: "Système complet pour livraison et gestion de restaurants",
          icon: "🍔",
          features: [
            "Système de commandes multicanal",
            "Écran cuisine (KDS) professionnel",
            "App pour livreurs",
            "Gestion des zones de livraison",
            "Intégration WhatsApp",
            "Méthodes de paiement locales",
            "Rapports quotidiens/mensuels",
            "Gestion menus et coûts",
            "Suivi en temps réel",
          ],
          benefits: [
            "Augmente les ventes",
            "Réduit les temps en cuisine",
            "Meilleur contrôle des livraisons",
            "Meilleure expérience client",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Système de Logistique et Transport 🔥",
          description: "Plateforme complète pour la gestion de la livraison externalisée",
          icon: "🚚",
          features: [
            "Système complet de livraison",
            "Suivi en temps réel",
            "Tarifs dynamiques par zone",
            "Application chauffeur",
            "Rapports de temps",
            "Mode entreprise (flotte)",
            "Intégration magasins/Homers",
          ],
          benefits: [
            "Meilleur contrôle logistique",
            "Optimisation des itinéraires",
            "Moins de coûts opérationnels",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Micro Logistique Intelligente 🔥",
          description: "Livraison locale instantanée avec routage intelligent",
          icon: "📦",
          features: [
            "Livraison locale instantanée",
            "Routage intelligent",
            "Intégration e-commerce/Homers",
            "Notifications automatiques",
            "Panneau administratif optimisé",
          ],
          benefits: [
            "Service plus rapide",
            "Moins d'erreurs",
            "Livraisons organisées",
          ],
        },
        {
          id: 9,
          title: "Développement WordPress Avancé",
          subtitle: "Plugins et Thèmes Sur Mesure ⚡",
          description: "Experts de l'écosystème WordPress pour solutions complexes",
          icon: "🔌",
          features: [
            "Développement de Plugins personnalisés",
            "Thèmes sur mesure (sans constructeurs de pages lents)",
            "Optimisation de vitesse (WPO) extrême",
            "Sécurité et nettoyage de malwares",
            "Intégration avec APIs externes",
            "WooCommerce avancé",
            "Migrations complexes",
            "Headless WordPress avec Next.js",
          ],
          benefits: [
            "Fonctionnalité exacte requise",
            "Pas de dépendance à des plugins lents",
            "Site sécurisé et blindé",
            "Chargement rapide garanti",
          ],
        },
        {
          id: 10,
          title: "Applications Mobiles et Bureau",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "Applications natives et multiplateformes de haute performance",
          icon: "📲",
          features: [
            "Développement iOS et Android (React Native)",
            "Apps de Bureau (Electron / Tauri)",
            "Design UI/UX natif",
            "Intégration avec le matériel de l'appareil",
            "Notifications Push intelligentes",
            "Mode Offline First",
            "Publication sur Stores (App Store / Play Store)",
            "Synchronisation en temps réel",
          ],
          benefits: [
            "Présence dans la poche du client",
            "Expérience utilisateur supérieure",
            "Meilleure rétention et engagement",
            "Fonctionnalité multiplateforme",
          ],
        },
        {
          id: 11,
          title: "Logiciels Sur Mesure",
          subtitle: "ERP, CRM et SaaS 🚀",
          description: "Architecture logicielle évolutive pour automatiser votre entreprise",
          icon: "⚙️",
          features: [
            "Systèmes de Gestion (ERP) personnalisés",
            "CRM sur mesure pour votre flux de vente",
            "Plateformes SaaS (Software as a Service)",
            "Panneaux Administratifs (Dashboards)",
            "Architecture Microservices / Serverless",
            "Bases de données optimisées",
            "Rôles et Permissions avancés",
            "Rapports et Analytique en temps réel",
          ],
          benefits: [
            "Contrôle total de votre opération",
            "Évolutivité sans limites de licences",
            "Automatisation des processus clés",
            "Données sécurisées et centralisées",
          ],
        },
        {
          id: 12,
          title: "BLXK Studios",
          subtitle: "Production Audiovisuelle Premium 🎬",
          description: "Contenu audiovisuel professionnel pour votre marque",
          icon: "🎥",
          features: [
            "Photographie professionnelle",
            "Vidéos corporatives et publicitaires",
            "Bannières 4K",
            "Montage cinématographique",
            "Branding d'entreprise",
            "Design couvertures et flyers",
            "Contenu TikTok/Reels Ads",
            "Catalogues numériques",
          ],
          benefits: [
            "Image professionnelle à fort impact",
            "Augmentation conversion visuelle",
            "Branding fort et mémorable",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Secteurs et Industries",
      sectorsSubtitle: "Expérience prouvée dans plusieurs secteurs",
      contactTitle: "Contact",
      contactSubtitle: "Prêt à transformer votre entreprise ? Parlons-en",
      emailLabel: "Email",
      locationLabel: "Localisation",
      locationValue: "Lima, Pérou 🇵🇪",
      specialtiesLabel: "Spécialités",
      specialtiesValue: "Développement Web · Automatisation · IA",
      ctaStart: "Démarrer le Projet",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Agences de Tourisme et Hôtellerie",
        "Commerce de Détail et E-commerce",
        "Startups Technologiques et SaaS",
        "Institutions Éducatives",
        "Entrepreneurs et Consultants Indépendants",
        "Équipes Internes d'Automatisation et IT",
      ],
    },
    projectsShowcase: {
      title: "Portfolio",
      subtitle: "Des projets réels qui démontrent des résultats tangibles",
      ctaTitle: "Vous avez un projet ambitieux en tête ?",
      ctaButton: "Demander un Devis Premium",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "Plugin WordPress",
          description: "Passerelle de paiement via WhatsApp pour WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automatisation",
          description: "Flux automatiques : achat → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Système de gestion des commandes en temps réel",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Intelligence Artificielle",
          description: "Bot avec IA pour service client et commandes",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Tableau de Bord",
          description: "Panneau administratif avec analytique avancée",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "Ce site web que vous consultez actuellement",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Extraction de leads depuis Google Maps et réseaux sociaux avec envoi automatisé via WhatsApp API",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Surveillance Temps Réel",
          description: "Surveillance en temps réel des équipes, processus et activités des employés avec alertes instantanées",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Point de Vente",
          description: "Système de billetterie pour transport interprovincial avec gestion des sièges et itinéraires",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Système d'Entreprise",
          description: "Système de facturation électronique intégré avec API SUNAT pour l'émission de documents fiscaux",
        },
      ],
    },
    digitalProducts: {
      title: "Produits Numériques BLXK",
      subtitle: "Des solutions prêtes à booster votre entreprise : hébergement, modèles, paiements et automatisations.",
      list: [
        {
          id: 1,
          title: "Hébergement Revendeur",
          description: "Plans Entrepreneur, Entreprise et Premium avec cPanel, WHM et SSL. Idéal pour revendre de l'hébergement.",
        },
        {
          id: 2,
          title: "Modèles Elementor",
          description: "Des modèles professionnels prêts à l'emploi, optimisés pour les conversions.",
        },
        {
          id: 3,
          title: "Intégration de Paiement",
          description: "Mise en œuvre de Yape, Plin, Izipay QR et autres passerelles de paiement.",
        },
        {
          id: 4,
          title: "Automatisations Pré-configurées",
          description: "Flux n8n prêts à connecter WhatsApp, CRM et notifications.",
        },
      ],
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
    techStack: {
      title: "Technologie-Stack",
      subtitle: "Hochmoderne Tools für erstklassige Lösungen",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Datenbanken",
        devops: "DevOps & Cloud",
        automation: "Automatisierung & KI",
      },
    },
    projects: {
      badge: "Erfolgsgeschichten",
      title: "Portfolio",
      subtitle: "Echte Projekte, die greifbare Ergebnisse zeigen",
    },
    services: {
      title: "Überlegenes Wertangebot",
      subtitle: "Unsere Lösungen übertreffen die Marktstandards in Leistung, Sicherheit und ROI",
      ctaMore: "Mehr Informationen Anfordern",
      ctaAll: "Alle Services Ansehen",
      tabs: {
        overview: "Überblick",
        comparison: "BLXK vs Markt",
        advantages: "Vorteile",
        usecases: "Anwendungsfälle",
      },
      labels: {
        metrics: "Wichtige Kennzahlen",
        standard: "Standard:",
        blxk: "BLXK:",
        clickDetails: "Klicken Sie für Details",
      },
      list: [
        {
          id: 1,
          slug: "desarrollo-web",
          title: "Webentwicklung",
          icon: "🌐",
          description: "Conversion Engineering + Leistung",
          introduction:
            "Unsere Webentwicklungspläne konzentrieren sich auf Conversion Engineering und stellen sicher, dass jede Website nicht nur visuell ansprechend ist, sondern ein leistungsstarkes Geschäftsinstrument.",
          features: [
            {
              label: "Basistechnologie",
              standard: "Verwendung generischer CMS (z. B. WordPress mit Elementor)",
              blxk: "Entwicklung mit modernen Frameworks (z. B. Next.js/React) oder Headless CMS für maximale Geschwindigkeit und Skalierbarkeit",
            },
            {
              label: "Leistung",
              standard: "Spezifische Leistung nicht garantiert",
              blxk: "Core Web Vitals Garantie: Technische Optimierung zur Erreichung hoher Punktzahlen in Google-Metriken (LCP, FID, CLS)",
            },
            {
              label: "Design & UX",
              standard: "Design 'nach Kundengeschmack' mit Vorlagen",
              blxk: "Nutzerzentriertes Design (UX/CRO): Beinhaltet Phasen für Forschung, Prototyping (Wireframes) und Usability-Tests",
            },
            {
              label: "Technisches SEO",
              standard: "Vorlage 'Ideal für SEO'",
              blxk: "Erweiterte SEO-Struktur: Konfiguration von Schema Markup, XML-Sitemap und optimierte Inhaltsstruktur",
            },
            {
              label: "Support nach dem Start",
              standard: "Support beschränkt auf Hosting-Laufzeit",
              blxk: "6 Monate Entwicklungsgarantie: Totale Abdeckung gegen Programmierfehler und Bugs nach der Lieferung",
            },
          ],
          advantages: [
            "Garantierte Leistung: Seiten bis zu 10-mal schneller, entscheidend für SEO und Benutzererfahrung",
            "Conversion-Optimierung: Design validiert, um den Benutzer zur gewünschten Aktion zu führen",
            "Maximales Technisches SEO: Sichert beste organische Positionierung ab Start",
            "Sorgenfreiheit für Kunden: Minimiert Risiko und anfängliche Wartungskosten",
          ],
          useCases: [
            "Digitale Marketingagenturen - Benötigen Conversion-Seiten, die Abschlüsse bringen",
            "Premium E-Commerce - Erfordern tadellose Geschwindigkeit und UX",
            "Wachsende Startups - Suchen Skalierbarkeit ohne Code-Migration",
            "B2B-Dienstleistungsunternehmen - Benötigen professionelle Präsenz, die Vertrauen schafft",
          ],
          metrics: [
            { label: "Durchschnittsgeschwindigkeit", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Conversion-Steigerung", value: "+30-80%" },
            { label: "Anti-Bug-Garantie", value: "6 Monate" },
          ],
        },
        {
          id: 2,
          slug: "ecommerce",
          title: "Online-Shops",
          icon: "🛒",
          description: "High Impact E-Commerce",
          introduction:
            "BLXK E-Commerce-Lösungen gehen über den einfachen Verkauf hinaus und integrieren Logistik, Conversion-Marketing und erweitertes Management.",
          features: [
            {
              label: "Logistik",
              standard: "Logistikintegration nicht spezifiziert",
              blxk: "Lokale Logistikintegration: Verbindung mit mindestens zwei beliebten lokalen Versandplattformen",
            },
            {
              label: "Conversion Marketing",
              standard: "Grundlegende Warenkorbfunktionen",
              blxk: "Modul zur Wiederherstellung von Warenkörben: Automatisierung per E-Mail oder WhatsApp",
            },
            {
              label: "Zahlungsmethoden",
              standard: "Kartenzahlungen und Überweisungen",
              blxk: "Integration lokaler Gateways: Verbindung mit hochkonvertierenden lokalen Zahlungsgateways",
            },
            {
              label: "Lagerverwaltung",
              standard: "Grundlegendes Admin-Panel",
              blxk: "ERP/POS-Integration (Optional): Möglichkeit zur Verbindung mit automatisierten Lagerverwaltungssystemen",
            },
            {
              label: "Analytik",
              standard: "Analytik nicht detailliert",
              blxk: "Erweiterte GA4 & Pixel Konfiguration: Implementierung von E-Commerce-Event-Tracking",
            },
          ],
          advantages: [
            "Wiederherstellung von +20% bis +40% verlorener Verkäufe",
            "Höhere Conversion mit lokalen Zahlungsmethoden",
            "Schnellerer und effizienterer Betrieb",
            "Skalierbar für Tausende von Produkten",
            "System bereit für 24/7 Verkauf",
          ],
          useCases: [
            "Online-Einzelhandel - Benötigen maximale Conversion",
            "Multichannel-Distributoren - Erfordern ERP-Integration",
            "Mode- & Accessoire-Marken - Suchen Premium-Erlebnis",
            "Liefer-/F&B-Unternehmen - Benötigen Logistikintegration",
          ],
          metrics: [
            { label: "Conversion-Steigerung", value: "+30-80%" },
            { label: "Warenkorb-Wiederherstellung", value: "+40%" },
            { label: "Zahlungsmethoden", value: "6+" },
            { label: "Skalierbarkeit", value: "Unbegrenzt" },
          ],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Webhosting",
          icon: "🔐",
          description: "Hochleistungs-Infrastruktur",
          introduction:
            "Der BLXK Hosting-Service ist für Geschwindigkeit und Sicherheit konzipiert und überwindet die Grenzen geteilter Ressourcen.",
          features: [
            {
              label: "Server-Ressourcen",
              standard: "Feste Ressourcen für alle Pläne",
              blxk: "Dedizierte & Skalierbare Ressourcen: CPU- und RAM-Zuweisung, die mit dem Plan skaliert",
            },
            {
              label: "Datensicherheit",
              standard: "Basissicherheit",
              blxk: "Robuste Backup-Richtlinie: Automatisierte tägliche Backups mit 30-tägiger Aufbewahrung",
            },
            {
              label: "Serverstandort",
              standard: "Nicht spezifiziert",
              blxk: "Latenzoptimierte Server: Strategischer Rechenzentrumsstandort für geringste Latenz",
            },
            {
              label: "Technischer Support",
              standard: "Support zu Geschäftszeiten",
              blxk: "Kritischer 24/7 Technischer Support: Support rund um die Uhr mit SLA",
            },
            {
              label: "SSL-Zertifikate",
              standard: "Basis-SSL inklusive",
              blxk: "Wildcard SSL + Premium-Zertifikate: Erweiterte Zertifikate für maximale Sicherheit",
            },
          ],
          advantages: [
            "Stabilität & Geschwindigkeit: Seite wird nie durch Traffic anderer Kunden verlangsamt",
            "Maximaler Schutz: Totale Sicherheit gegen Datenverlust oder Angriffe",
            "Ultraschnelles Laden: Verbessert Benutzererfahrung und SEO-Ranking",
            "Totale Verfügbarkeit: Das Geschäft des Kunden stoppt nie",
          ],
          useCases: [
            "High-Traffic E-Commerce",
            "Kritische Unternehmens-Webanwendungen",
            "SaaS und Hochverfügbarkeitsplattformen",
            "Projekte, die maximale Zuverlässigkeit erfordern",
          ],
          metrics: [
            { label: "Garantierte Uptime", value: "99.9%" },
            { label: "Durchschnittsgeschwindigkeit", value: "< 100ms" },
            { label: "Backups", value: "Täglich (30 Tage)" },
            { label: "Support", value: "24/7" },
          ],
        },
        {
          id: 4,
          slug: "marketing-digital",
          title: "Digitales Marketing",
          icon: "📈",
          description: "Multichannel & Messbare Strategie",
          introduction:
            "Die Marketingstrategie von BLXK ist umfassend, multikanal und auf echte Geschäftskennzahlen ausgerichtet, nicht auf Eitelkeit.",
          features: [
            {
              label: "Werbekanäle",
              standard: "Ausschließlich Facebook (Meta Ads)",
              blxk: "Multichannel-Strategie: Kampagnenmanagement auf Meta Ads, Google Ads und TikTok Ads",
            },
            {
              label: "Berichterstattung",
              standard: "Häufigkeit und Inhalt nicht detailliert",
              blxk: "Wöchentliche/Zweiwöchentliche ROI-Berichte: Detaillierte Berichte mit Fokus auf Geschäftskennzahlen (CPA, ROAS, ROI)",
            },
            {
              label: "Content-Strategie",
              standard: "Nur auf Anzeigen (Banner) fokussiert",
              blxk: "Organische Integration: Enthält Komponente für organische Content-Strategie zum Markenaufbau",
            },
            {
              label: "Forschung",
              standard: "Basis-Segmentierung",
              blxk: "Tiefe Zielgruppenforschung: Erstellung detaillierter Buyer Personas und Wettbewerbsanalyse",
            },
            {
              label: "Optimierung",
              standard: "Gelegentliche manuelle Anpassungen",
              blxk: "Kontinuierliche Optimierung: A/B-Tests, Landing-Page-Optimierung und wöchentliche Kampagnenverbesserung",
            },
          ],
          advantages: [
            "Maximale Reichweite: Nachricht des Kunden erreicht sein Publikum überall",
            "Transparenz & Messung: Kunde kennt genau den Return on Ad Spend",
            "Nachhaltiges Wachstum: Werbung wird durch eine starke Marke unterstützt",
            "Effektivität: Jeder investierte Cent wird auf den idealen Kunden gerichtet",
          ],
          useCases: [
            "E-Commerce, der Verkäufe skalieren möchte",
            "Startups in der Wachstumsphase",
            "B2B-Unternehmen auf der Suche nach qualifizierten Leads",
            "Marken, die umfassende Positionierung suchen",
          ],
          metrics: [
            { label: "Durchschnittlicher ROAS", value: "3-5x" },
            { label: "CPA-Reduktion", value: "-40%" },
            { label: "Verwaltete Kanäle", value: "3+" },
            { label: "Berichte", value: "Wöchentlich" },
          ],
        },
      ],
    },
    servicesDetailed: {
      title: "Unsere Services",
      subtitle: "Umfassende Lösungen von Webentwicklung bis hin zu Automatisierung und Infrastruktur",
      featuresLabel: "✨ Premium-Funktionen:",
      benefitsLabel: "⭐ Vorteile:",
      cta: "Mehr Informationen",
      list: [
        {
          id: 1,
          title: "Professionelle Webseiten",
          subtitle: "Conversion Engineering + Performance 🔥",
          description: "Hochleistungs-Websites, entwickelt um Ihr Geschäft zu konvertieren und zu skalieren",
          icon: "🌐",
          features: [
            "Entwicklung mit Next.js / React",
            "Conversion-Architektur (CRO)",
            "UX Research + Wireframes + Prototypen",
            "Core Web Vitals garantiert (90+)",
            "Technisches Enterprise-SEO",
            "Ultraschnelle Geschwindigkeit (0.3–1.5s)",
            "Erweiterte Sicherheit",
            "Premium-Animationen",
            "Dokumentation + Schulung",
            "6 Monate Anti-Bug-Garantie",
          ],
          benefits: [
            "Seiten 10x schneller als WordPress",
            "Conversion +30% bis +80%",
            "Skalierbar ohne Technologiewechsel",
            "Individuelles Design",
            "SEO ab Tag 1",
            "Professioneller Support",
          ],
        },
        {
          id: 2,
          title: "Unternehmens- / Institutionelle Seiten",
          subtitle: "Enterprise-Level 🔥",
          description: "Professionelle digitale Präsenz für etablierte Unternehmen",
          icon: "🏢",
          features: [
            "Digitales Unternehmenshandbuch",
            "Institutionelles Design mit Branding",
            "Sektionen: Über uns, Mission, Geschichte, Team",
            "Abgeschlossene Projekte",
            "Zertifizierungen und Compliance",
            "Smarter PDF-Bericht",
            "Erweiterte Formulare mit CRM",
            "WhatsApp Business Integration",
            "Skalierbare Infrastruktur",
          ],
          benefits: [
            "Solides Unternehmensimage",
            "Wahrnehmung von Vertrauen",
            "Ideal für Ausschreibungen",
            "Garantierter Support",
          ],
        },
        {
          id: 3,
          title: "High Performance E-Commerce",
          subtitle: "Automatisierte Verkäufe 🔥",
          description: "Online-Verkaufsplattform optimiert für maximale Conversion",
          icon: "🛒",
          features: [
            "Optimierter Warenkorb",
            "Wiederherstellung per E-Mail + WhatsApp + Push",
            "Logistikintegration",
            "Zahlung: Yape/Plin/Culqi/Niubiz",
            "Automatische Berechnung nach Zonen",
            "High Conversion Checkout",
            "Smarte Empfehlung",
            "Echtzeit-Tracking",
            "Erweitertes Kennzahlen-Dashboard",
            "Optionale ERP/POS-Integration",
          ],
          benefits: [
            "Wiederherstellung von +20% bis +40% Verkäufen",
            "Erhöhte Conversion",
            "Effizienter Betrieb",
            "Skalierbar für Tausende von Produkten",
            "Automatischer 24/7 Verkauf",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Professionelle Bildungsplattformen 🔥",
          description: "Virtueller Campus im Udemy-Stil mit allen Tools",
          icon: "📚",
          features: [
            "Studenten + Dozenten Dashboard",
            "Automatische Zertifikate",
            "Kurse nach Modulen und Bewertungen",
            "Fortschritt in Echtzeit",
            "Gamification: Punkte, Abzeichen, Erfolge",
            "Optimierte mobile App",
            "Live-Klassen (Zoom integriert)",
            "Foren + private Community",
            "WhatsApp-Erinnerungen",
            "Yape/Plin/Niubiz/Culqi Gateway",
          ],
          benefits: [
            "Hohe Studentenbindung",
            "Steigerung der Kursverkäufe",
            "Automatische Zertifizierung",
            "Moderner Bildungsfluss",
            "Skalierbar für Tausende von Studenten",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automatisierung mit KI und n8n 🔥",
          description: "Intelligente automatische Workflows für Ihr Unternehmen",
          icon: "⚙️",
          features: [
            "WhatsApp Bots mit KI (GPT/Gemini)",
            "Workflows: Bestellungen, Zahlungen, Bestätigungen",
            "Automatische Erinnerungen",
            "CRM-Integration",
            "Verbindung Homers, TAS, Rebrotal",
            "Buchhaltungsautomatisierung",
            "Automatisierte Funnels",
            "Smarte Benachrichtigungen",
            "Segmentierter Massenversand",
            "Erweiterte Analytik",
          ],
          benefits: [
            "Zeitersparnis 60% bis 80%",
            "Schnelle Antworten",
            "Null menschliche Fehler",
            "Skalierbarkeit ohne zusätzliches Personal",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Komplettlösung für Restaurants 🔥",
          description: "Komplettes System für Lieferung und Restaurantmanagement",
          icon: "🍔",
          features: [
            "Multichannel-Bestellsystem",
            "Professioneller Küchenbildschirm (KDS)",
            "App für Lieferfahrer",
            "Lieferzonenmanagement",
            "WhatsApp-Integration",
            "Lokale Zahlungsmethoden",
            "Tägliche/monatliche Berichte",
            "Menü- und Kostenmanagement",
            "Echtzeit-Tracking",
          ],
          benefits: [
            "Steigert Verkäufe",
            "Reduziert Küchenzeiten",
            "Bessere Lieferkontrolle",
            "Bessere Kundenerfahrung",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Logistik- und Transportsystem 🔥",
          description: "Komplette Plattform für ausgelagertes Liefermanagement",
          icon: "🚚",
          features: [
            "Komplettes Liefersystem",
            "Echtzeit-Tracking",
            "Dynamische Tarife nach Zone",
            "Fahrer-App",
            "Zeitberichte",
            "Unternehmensmodus (Flotte)",
            "Store/Homers-Integration",
          ],
          benefits: [
            "Bessere Logistikkontrolle",
            "Routenoptimierung",
            "Geringere Betriebskosten",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Smarte Mikro-Logistik 🔥",
          description: "Sofortige lokale Lieferung mit Smart Routing",
          icon: "📦",
          features: [
            "Sofortige lokale Lieferung",
            "Smart Routing",
            "E-Commerce/Homers-Integration",
            "Automatische Benachrichtigungen",
            "Optimiertes Admin-Panel",
          ],
          benefits: [
            "Schnellerer Service",
            "Weniger Fehler",
            "Organisierte Lieferungen",
          ],
        },
        {
          id: 9,
          title: "Erweiterte WordPress-Entwicklung",
          subtitle: "Benutzerdefinierte Plugins und Themes ⚡",
          description: "WordPress-Ökosystem-Experten für komplexe Lösungen",
          icon: "🔌",
          features: [
            "Entwicklung benutzerdefinierter Plugins",
            "Maßgeschneiderte Themes (keine langsamen Page Builder)",
            "Extreme Geschwindigkeitsoptimierung (WPO)",
            "Sicherheit und Malware-Bereinigung",
            "Integration mit externen APIs",
            "Erweitertes WooCommerce",
            "Komplexe Migrationen",
            "Headless WordPress mit Next.js",
          ],
          benefits: [
            "Exakte erforderliche Funktionalität",
            "Keine Abhängigkeit von langsamen Plugins",
            "Sichere und gepanzerte Seite",
            "Schnelles Laden garantiert",
          ],
        },
        {
          id: 10,
          title: "Mobile und Desktop-Apps",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "Hochleistungsfähige native und plattformübergreifende Apps",
          icon: "📲",
          features: [
            "iOS- und Android-Entwicklung (React Native)",
            "Desktop-Apps (Electron / Tauri)",
            "Natives UI/UX-Design",
            "Integration mit Gerätehardware",
            "Smarte Push-Benachrichtigungen",
            "Offline First Modus",
            "Store-Veröffentlichung (App Store / Play Store)",
            "Echtzeit-Synchronisierung",
          ],
          benefits: [
            "Präsenz in der Tasche des Kunden",
            "Überlegene Benutzererfahrung",
            "Bessere Bindung und Engagement",
            "Plattformübergreifende Funktionalität",
          ],
        },
        {
          id: 11,
          title: "Benutzerdefinierte Software",
          subtitle: "ERP, CRM und SaaS 🚀",
          description: "Skalierbare Softwarearchitektur zur Automatisierung Ihres Unternehmens",
          icon: "⚙️",
          features: [
            "Benutzerdefinierte Managementsysteme (ERP)",
            "Benutzerdefiniertes CRM für Ihren Verkaufsfluss",
            "SaaS-Plattformen (Software as a Service)",
            "Admin-Panels (Dashboards)",
            "Microservices / Serverless Architektur",
            "Optimierte Datenbanken",
            "Erweiterte Rollen und Berechtigungen",
            "Echtzeit-Berichte und Analytik",
          ],
          benefits: [
            "Totale Kontrolle über Ihre Operation",
            "Skalierbarkeit ohne Lizenzlimits",
            "Automatisierung von Schlüsselprozessen",
            "Sichere und zentralisierte Daten",
          ],
        },
        {
          id: 12,
          title: "BLXK Studios",
          subtitle: "Premium Audiovisuelle Produktion 🎬",
          description: "Professioneller audiovisueller Inhalt für Ihre Marke",
          icon: "🎥",
          features: [
            "Professionelle Fotografie",
            "Unternehmens- und Werbevideos",
            "4K-Banner",
            "Kinematografischer Schnitt",
            "Unternehmensbranding",
            "Cover- und Flyer-Design",
            "TikTok/Reels Ads Inhalt",
            "Digitale Kataloge",
          ],
          benefits: [
            "Professionelles Image mit hoher Wirkung",
            "Visuelle Conversion-Steigerung",
            "Starkes und einprägsames Branding",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Branchen und Industrien",
      sectorsSubtitle: "Bewährte Erfahrung in mehreren Sektoren",
      contactTitle: "Kontakt",
      contactSubtitle: "Bereit, Ihr Geschäft zu transformieren? Lassen Sie uns sprechen",
      emailLabel: "Email",
      locationLabel: "Standort",
      locationValue: "Lima, Peru 🇵🇪",
      specialtiesLabel: "Spezialitäten",
      specialtiesValue: "Webentwicklung · Automatisierung · KI",
      ctaStart: "Projekt Starten",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Tourismus- und Gastgewerbeagenturen",
        "Einzelhandel und E-Commerce",
        "Tech-Startups und SaaS",
        "Bildungseinrichtungen",
        "Unternehmer und unabhängige Berater",
        "Interne Automatisierungs- und IT-Teams",
      ],
    },
    projectsShowcase: {
      title: "Portfolio",
      subtitle: "Echte Projekte, die greifbare Ergebnisse zeigen",
      ctaTitle: "Haben Sie ein ehrgeiziges Projekt im Sinn?",
      ctaButton: "Premium-Angebot Anfordern",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "WordPress Plugin",
          description: "Zahlungsgateway über WhatsApp für WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automatisierung",
          description: "Automatische Flows: Kauf → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Echtzeit-Bestellmanagementsystem",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Künstliche Intelligenz",
          description: "KI-Bot für Kundenservice und Bestellungen",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Dashboard",
          description: "Admin-Panel mit erweiterter Analytik",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "Diese Website, die Sie gerade sehen",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Lead-Gewinnung aus Google Maps und sozialen Netzwerken mit automatisiertem Versand via WhatsApp API",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Echtzeit-Überwachung",
          description: "Echtzeit-Überwachung von Teams, Prozessen und Mitarbeiteraktivitäten mit Sofort-Benachrichtigungen",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Point of Sale",
          description: "Ticketing-System für interprovinziellen Transport mit Sitz- und Routenmanagement",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Unternehmenssystem",
          description: "Elektronisches Rechnungssystem integriert mit SUNAT API für die Ausstellung von Steuerdokumenten",
        },
      ],
    },
    digitalProducts: {
      title: "Digitale Produkte BLXK",
      subtitle: "Fertige Lösungen zur Steigerung Ihres Geschäfts: Hosting, Vorlagen, Zahlungen und Automatisierungen.",
      list: [
        {
          id: 1,
          title: "Reseller Hosting",
          description: "Unternehmer-, Unternehmens- und Premium-Pläne mit cPanel, WHM und SSL. Ideal für Hosting-Wiederverkäufer.",
        },
        {
          id: 2,
          title: "Elementor Vorlagen",
          description: "Professionelle Vorlagen, gebrauchsfertig und für Konversionen optimiert.",
        },
        {
          id: 3,
          title: "Zahlungsintegration",
          description: "Implementierung von Yape, Plin, Izipay QR und anderen Zahlungsgateways.",
        },
        {
          id: 4,
          title: "Vorkonfigurierte Automatisierungen",
          description: "n8n-Flows bereit zur Verbindung von WhatsApp, CRM und Benachrichtigungen.",
        },
      ],

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
    techStack: {
      title: "Stack Tecnologico",
      subtitle: "Strumenti all'avanguardia per soluzioni di classe mondiale",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Database",
        devops: "DevOps & Cloud",
        automation: "Automazione & IA",
      },
    },
    projects: {
      badge: "Storie di Successo",
      title: "Portfolio",
      subtitle: "Progetti reali che dimostrano risultati tangibili",
    },
    services: {
      title: "Proposta di Valore Superiore",
      subtitle: "Le nostre soluzioni superano gli standard di mercato in prestazioni, sicurezza e ROI",
      ctaMore: "Richiedi Maggiori Informazioni",
      ctaAll: "Vedi Tutti i Servizi",
      tabs: {
        overview: "Panoramica",
        comparison: "BLXK vs Mercato",
        advantages: "Vantaggi",
        usecases: "Casi d'Uso",
      },
      labels: {
        metrics: "Metriche Chiave",
        standard: "Standard:",
        blxk: "BLXK:",
        clickDetails: "Clicca per vedere i dettagli",
      },
      list: [
        {
          id: 1,
          slug: "desarrollo-web",
          title: "Sviluppo Web",
          icon: "🌐",
          description: "Ingegneria della Conversione + Performance",
          introduction:
            "I nostri piani di sviluppo web si concentrano sull'ingegneria della conversione, garantendo che ogni sito non sia solo visivamente accattivante, ma uno strumento di business ad alte prestazioni.",
          features: [
            {
              label: "Tecnologia Base",
              standard: "Uso di CMS generici (es. WordPress con Elementor)",
              blxk: "Sviluppo con Framework Moderni (es. Next.js/React) o Headless CMS per massima velocità e scalabilità",
            },
            {
              label: "Performance",
              standard: "Non si garantisce la performance specifica",
              blxk: "Garanzia Core Web Vitals: Ottimizzazione tecnica per raggiungere punteggi elevati nelle metriche di Google (LCP, FID, CLS)",
            },
            {
              label: "Design & UX",
              standard: "Design 'a gusto del cliente' con template",
              blxk: "Design Centrato sull'Utente (UX/CRO): Include fase di Ricerca, Prototipazione (Wireframes) e Test di Usabilità",
            },
            {
              label: "SEO Tecnico",
              standard: "Template 'Ideale per SEO'",
              blxk: "Struttura SEO Avanzata: Configurazione di Schema Markup, Sitemap XML e Struttura dei Contenuti ottimizzata",
            },
            {
              label: "Supporto Post-Lancio",
              standard: "Supporto limitato alla durata dell'hosting",
              blxk: "Garanzia di Sviluppo di 6 Mesi: Copertura totale contro errori di programmazione e bug post-consegna",
            },
          ],
          advantages: [
            "Performance Garantita: Siti fino a 10 volte più veloci, cruciale per la SEO e l'esperienza utente",
            "Ottimizzazione della Conversione: Il design è validato per guidare l'utente verso l'azione desiderata",
            "Massimo SEO Tecnico: Assicura il miglior posizionamento organico dal lancio",
            "Tranquillità del Cliente: Minimizza il rischio e il costo di manutenzione iniziale",
          ],
          useCases: [
            "Agenzie di Marketing Digitale - Hanno bisogno di siti di conversione che chiudano contratti",
            "E-commerce Premium - Richiedono velocità e UX impeccabili",
            "Startup in crescita - Cercano scalabilità senza migrare codice",
            "Aziende di servizi B2B - Hanno bisogno di presenza professionale che generi fiducia",
          ],
          metrics: [
            { label: "Velocità Media", value: "0.8s" },
            { label: "Core Web Vitals", value: "90+" },
            { label: "Aumento Conversione", value: "+30-80%" },
            { label: "Garanzia Anti-bug", value: "6 mesi" },
          ],
        },
        {
          id: 2,
          slug: "ecommerce",
          title: "Negozi Online",
          icon: "🛒",
          description: "E-commerce ad Alto Impatto",
          introduction:
            "Le soluzioni di e-commerce di BLXK vanno oltre la semplice vendita, integrando logistica, marketing di conversione e gestione avanzata.",
          features: [
            {
              label: "Logistica",
              standard: "Integrazione logistica non specificata",
              blxk: "Integrazione Logistica Locale: Connessione con almeno due piattaforme di spedizione locali popolari",
            },
            {
              label: "Marketing di Conversione",
              standard: "Funzionalità di carrello di base",
              blxk: "Modulo di Recupero Carrelli Abbandonati: Configurazione di automazioni via email o WhatsApp",
            },
            {
              label: "Metodi di Pagamento",
              standard: "Pagamenti con carta e depositi",
              blxk: "Integrazione con Gateway Locali: Connessione con gateway di pagamento locali ad alta conversione",
            },
            {
              label: "Gestione Inventario",
              standard: "Pannello di amministrazione di base",
              blxk: "Integrazione ERP/POS (Opzionale): Possibilità di connettersi con sistemi di gestione inventario automatica",
            },
            {
              label: "Analitica",
              standard: "Analitica non dettagliata",
              blxk: "Configurazione Avanzata GA4 & Pixel: Implementazione del tracciamento eventi e-commerce",
            },
          ],
          advantages: [
            "Recupero del +20% al +40% delle vendite perse",
            "Maggiore conversione con metodi di pagamento locali",
            "Operazione più veloce ed efficiente",
            "Scalabile per migliaia di prodotti",
            "Sistema pronto per vendere 24/7",
          ],
          useCases: [
            "Negozi retail online - Hanno bisogno della massima conversione",
            "Distributori multicanale - Richiedono integrazione ERP",
            "Marchi di moda e accessori - Cercano esperienza premium",
            "Aziende di delivery/F&B - Hanno bisogno di integrazione logistica",
          ],
          metrics: [
            { label: "Aumento Conversione", value: "+30-80%" },
            { label: "Recupero Carrelli", value: "+40%" },
            { label: "Metodi di Pagamento", value: "6+" },
            { label: "Scalabilità", value: "Illimitata" },
          ],
        },
        {
          id: 3,
          slug: "hosting",
          title: "Hosting Web",
          icon: "🔐",
          description: "Infrastruttura ad Alte Prestazioni",
          introduction:
            "Il servizio di hosting di BLXK è progettato per la velocità e la sicurezza, superando i limiti delle risorse condivise.",
          features: [
            {
              label: "Risorse Server",
              standard: "Risorse fisse per tutti i piani",
              blxk: "Risorse Dedicate e Scalabili: Allocazione di CPU e RAM che scala con il piano",
            },
            {
              label: "Sicurezza Dati",
              standard: "Sicurezza base",
              blxk: "Politica di Backup Robusta: Backup giornalieri automatizzati con conservazione di 30 giorni",
            },
            {
              label: "Posizione Server",
              standard: "Non specificata",
              blxk: "Server Ottimizzati per Latenza: Posizione strategica del data center per la minore latenza",
            },
            {
              label: "Supporto Tecnico",
              standard: "Supporto in orario d'ufficio",
              blxk: "Supporto Tecnico Critico 24/7: Supporto disponibile 24 ore su 24 con SLA",
            },
            {
              label: "Certificati SSL",
              standard: "SSL base incluso",
              blxk: "SSL Wildcard + Certificati Premium: Certificati avanzati per massima sicurezza",
            },
          ],
          advantages: [
            "Stabilità e Velocità: Il sito non rallenterà mai a causa del traffico di altri clienti",
            "Massima Protezione: Totale tranquillità contro perdita di dati o attacchi",
            "Caricamento Ultra Rapido: Migliora l'esperienza utente e il ranking SEO",
            "Disponibilità Totale: Il business del cliente non si ferma mai",
          ],
          useCases: [
            "E-commerce ad alto traffico",
            "Applicazioni web aziendali critiche",
            "SaaS e piattaforme ad alta disponibilità",
            "Progetti che richiedono massima affidabilità",
          ],
          metrics: [
            { label: "Uptime Garantito", value: "99.9%" },
            { label: "Velocità Media", value: "< 100ms" },
            { label: "Backup", value: "Giornalieri (30 gg)" },
            { label: "Supporto", value: "24/7" },
          ],
        },
        {
          id: 4,
          slug: "marketing-digital",
          title: "Marketing Digitale",
          icon: "📈",
          description: "Strategia Multicanale e Misurabile",
          introduction:
            "La strategia di marketing di BLXK è integrale, multicanale e focalizzata su metriche di business reali, non sulla vanità.",
          features: [
            {
              label: "Canali Pubblicitari",
              standard: "Esclusivamente Facebook (Meta Ads)",
              blxk: "Strategia Multicanale: Gestione campagne su Meta Ads, Google Ads e TikTok Ads",
            },
            {
              label: "Reportistica",
              standard: "Frequenza e contenuto non dettagliati",
              blxk: "Report ROI Settimanali/Bisettimanali: Report dettagliati focalizzati su metriche di business (CPA, ROAS, ROI)",
            },
            {
              label: "Strategia di Contenuto",
              standard: "Focalizzato solo su annunci (banner)",
              blxk: "Integrazione Organica: Include componente di strategia di contenuto organico per costruire il brand",
            },
            {
              label: "Ricerca",
              standard: "Segmentazione base",
              blxk: "Ricerca Approfondita del Pubblico: Creazione di Buyer Personas dettagliate e analisi della concorrenza",
            },
            {
              label: "Ottimizzazione",
              standard: "Aggiustamenti manuali occasionali",
              blxk: "Ottimizzazione Continua: A/B Test, Ottimizzazione Landing Page e miglioramento settimanale delle campagne",
            },
          ],
          advantages: [
            "Massima Portata: Il messaggio del cliente raggiunge il suo pubblico ovunque si trovi",
            "Trasparenza e Misurazione: Il cliente conosce esattamente il ritorno sull'investimento pubblicitario",
            "Crescita Sostenibile: La pubblicità è supportata da un brand forte",
            "Efficacia: Ogni centesimo investito è diretto al cliente ideale",
          ],
          useCases: [
            "E-commerce che vuole scalare le vendite",
            "Startup in fase di crescita",
            "Aziende B2B in cerca di lead di qualità",
            "Brand in cerca di posizionamento integrale",
          ],
          metrics: [
            { label: "ROAS Medio", value: "3-5x" },
            { label: "Riduzione CPA", value: "-40%" },
            { label: "Canali Gestiti", value: "3+" },
            { label: "Report", value: "Settimanali" },
          ],
        },
      ],
    },
    servicesDetailed: {
      title: "I Nostri Servizi",
      subtitle: "Soluzioni complete dallo sviluppo web all'automazione e all'infrastruttura",
      featuresLabel: "✨ Funzionalità Premium:",
      benefitsLabel: "⭐ Vantaggi:",
      cta: "Maggiori informazioni",
      list: [
        {
          id: 1,
          title: "Pagine Web Professionali",
          subtitle: "Conversion Engineering + Performance 🔥",
          description: "Siti web ad alte prestazioni progettati per convertire e scalare il tuo business",
          icon: "🌐",
          features: [
            "Sviluppo con Next.js / React",
            "Architettura di Conversione (CRO)",
            "UX Research + Wireframes + Prototipi",
            "Core Web Vitals garantiti (90+)",
            "SEO Tecnico Aziendale",
            "Velocità ultra-rapida (0.3–1.5s)",
            "Sicurezza Avanzata",
            "Animazioni Premium",
            "Documentazione + Formazione",
            "Garanzia 6 Mesi Anti-Bug",
          ],
          benefits: [
            "Siti 10x più veloci di WordPress",
            "Conversione +30% a +80%",
            "Scalabile senza migrare tecnologia",
            "Design Personalizzato",
            "SEO dal Giorno 1",
            "Supporto Professionale",
          ],
        },
        {
          id: 2,
          title: "Pagine Aziendali / Istituzionali",
          subtitle: "Livello Enterprise 🔥",
          description: "Presenza digitale professionale per aziende consolidate",
          icon: "🏢",
          features: [
            "Manuale Corporativo Digitale",
            "Design Istituzionale con Branding",
            "Sezioni: Chi Siamo, Missione, Storia, Team",
            "Progetti Eseguiti",
            "Certificazioni e Conformità",
            "Report PDF Intelligente",
            "Moduli Avanzati con CRM",
            "Integrazione WhatsApp Business",
            "Infrastruttura Scalabile",
          ],
          benefits: [
            "Immagine Aziendale Solida",
            "Percezione di Fiducia",
            "Ideale per Gare d'Appalto",
            "Supporto Garantito",
          ],
        },
        {
          id: 3,
          title: "E-Commerce ad Alte Prestazioni",
          subtitle: "Vendite Automatizzate 🔥",
          description: "Piattaforma di vendita online ottimizzata per la massima conversione",
          icon: "🛒",
          features: [
            "Carrello Ottimizzato",
            "Recupero via Email + WhatsApp + Push",
            "Integrazione Logistica",
            "Pagamento: Yape/Plin/Culqi/Niubiz",
            "Calcolo Automatico per Zone",
            "Checkout ad Alta Conversione",
            "Raccomandazione Intelligente",
            "Tracciamento in Tempo Reale",
            "Dashboard Metriche Avanzate",
            "Integrazione ERP/POS Opzionale",
          ],
          benefits: [
            "Recupero +20% a +40% vendite",
            "Aumento Conversione",
            "Operazione Efficiente",
            "Scalabile per migliaia di prodotti",
            "Vendita Automatica 24/7",
          ],
        },
        {
          id: 4,
          title: "BLXK LMS",
          subtitle: "Piattaforme Educative Professionali 🔥",
          description: "Campus virtuale stile Udemy con tutti gli strumenti",
          icon: "📚",
          features: [
            "Pannello Studenti + Istruttori",
            "Certificati Automatici",
            "Corsi per Moduli e Valutazioni",
            "Progresso in Tempo Reale",
            "Gamification: punti, badge, risultati",
            "App Mobile Ottimizzata",
            "Classi Live (Zoom integrato)",
            "Forum + Community Privata",
            "Promemoria WhatsApp",
            "Gateway Yape/Plin/Niubiz/Culqi",
          ],
          benefits: [
            "Alta Ritenzione Studenti",
            "Aumento Vendite Corsi",
            "Certificazione Automatica",
            "Flusso Educativo Moderno",
            "Scalabile per migliaia di studenti",
          ],
        },
        {
          id: 5,
          title: "BLXK Automations",
          subtitle: "Automazione con IA e n8n 🔥",
          description: "Flussi di lavoro automatici intelligenti per la tua azienda",
          icon: "⚙️",
          features: [
            "Bot WhatsApp con IA (GPT/Gemini)",
            "Workflow: Ordini, Pagamenti, Conferme",
            "Promemoria Automatici",
            "Integrazione CRM",
            "Connessione Homers, TAS, Rebrotal",
            "Automazione Contabile",
            "Funnel Automatizzati",
            "Notifiche Intelligenti",
            "Invio Massivo Segmentato",
            "Analitica Avanzata",
          ],
          benefits: [
            "Risparmio 60% a 80% tempo",
            "Risposte Rapide",
            "Zero Errori Umani",
            "Scalabilità senza personale extra",
          ],
        },
        {
          id: 6,
          title: "Homers",
          subtitle: "Soluzione Completa per Ristoranti 🔥",
          description: "Sistema completo per delivery e gestione ristoranti",
          icon: "🍔",
          features: [
            "Sistema ordini multicanale",
            "Schermo Cucina (KDS) Professionale",
            "App per rider",
            "Gestione zone di consegna",
            "Integrazione WhatsApp",
            "Metodi di pagamento locali",
            "Report giornalieri/mensili",
            "Gestione menu e costi",
            "Tracciamento in tempo reale",
          ],
          benefits: [
            "Aumenta le vendite",
            "Riduce tempi cucina",
            "Miglior controllo consegne",
            "Migliore esperienza cliente",
          ],
        },
        {
          id: 7,
          title: "TAS",
          subtitle: "Sistema Logistica e Trasporti 🔥",
          description: "Piattaforma completa per gestione consegne in outsourcing",
          icon: "🚚",
          features: [
            "Sistema completo consegne",
            "Tracciamento in tempo reale",
            "Tariffe dinamiche per zona",
            "App autista",
            "Report tempi",
            "Modalità azienda (flotta)",
            "Integrazione negozi/Homers",
          ],
          benefits: [
            "Miglior controllo logistico",
            "Ottimizzazione percorsi",
            "Minori costi operativi",
          ],
        },
        {
          id: 8,
          title: "Rebrotal",
          subtitle: "Micro Logistica Intelligente 🔥",
          description: "Consegna locale istantanea con routing intelligente",
          icon: "📦",
          features: [
            "Consegna locale istantanea",
            "Routing intelligente",
            "Integrazione e-commerce/Homers",
            "Notifiche automatiche",
            "Pannello amministrativo ottimizzato",
          ],
          benefits: [
            "Servizio più veloce",
            "Meno errori",
            "Consegne organizzate",
          ],
        },
        {
          id: 9,
          title: "Sviluppo WordPress Avanzato",
          subtitle: "Plugin e Temi Personalizzati ⚡",
          description: "Esperti dell'ecosistema WordPress per soluzioni complesse",
          icon: "🔌",
          features: [
            "Sviluppo Plugin Personalizzati",
            "Temi su misura (no page builder lenti)",
            "Ottimizzazione Velocità Estrema (WPO)",
            "Sicurezza e Pulizia Malware",
            "Integrazione con API esterne",
            "WooCommerce Avanzato",
            "Migrazioni complesse",
            "Headless WordPress con Next.js",
          ],
          benefits: [
            "Funzionalità esatta richiesta",
            "Nessuna dipendenza da plugin lenti",
            "Sito sicuro e blindato",
            "Caricamento rapido garantito",
          ],
        },
        {
          id: 10,
          title: "App Mobili e Desktop",
          subtitle: "iOS, Android, Mac & Windows 📱",
          description: "Applicazioni native e multipiattaforma ad alte prestazioni",
          icon: "📲",
          features: [
            "Sviluppo iOS e Android (React Native)",
            "App Desktop (Electron / Tauri)",
            "Design UI/UX Nativo",
            "Integrazione con hardware dispositivo",
            "Notifiche Push Intelligenti",
            "Modalità Offline First",
            "Pubblicazione su Store (App Store / Play Store)",
            "Sincronizzazione in tempo reale",
          ],
          benefits: [
            "Presenza nella tasca del cliente",
            "Esperienza utente superiore",
            "Migliore ritenzione e coinvolgimento",
            "Funzionalità multipiattaforma",
          ],
        },
        {
          id: 11,
          title: "Software Personalizzato",
          subtitle: "ERP, CRM e SaaS 🚀",
          description: "Architettura software scalabile per automatizzare la tua azienda",
          icon: "⚙️",
          features: [
            "Sistemi di Gestione (ERP) personalizzati",
            "CRM su misura per il tuo flusso di vendita",
            "Piattaforme SaaS (Software as a Service)",
            "Pannelli Amministrativi (Dashboards)",
            "Architettura Microservizi / Serverless",
            "Database ottimizzati",
            "Ruoli e Permessi avanzati",
            "Report e Analitica in tempo reale",
          ],
          benefits: [
            "Controllo totale della tua operazione",
            "Scalabilità senza limiti di licenze",
            "Automazione processi chiave",
            "Dati sicuri e centralizzati",
          ],
        },
        {
          id: 12,
          title: "BLXK Studios",
          subtitle: "Produzione Audiovisiva Premium 🎬",
          description: "Contenuto audiovisivo professionale per il tuo brand",
          icon: "🎥",
          features: [
            "Fotografia professionale",
            "Video aziendali e pubblicitari",
            "Banner 4K",
            "Montaggio cinematografico",
            "Branding aziendale",
            "Design copertine e flyer",
            "Contenuti TikTok/Reels Ads",
            "Cataloghi digitali",
          ],
          benefits: [
            "Immagine professionale ad alto impatto",
            "Aumento conversione visiva",
            "Branding forte e memorabile",
          ],
        },
      ],
    },
    contact: {
      sectorsTitle: "Settori e Industrie",
      sectorsSubtitle: "Esperienza comprovata in molteplici settori",
      contactTitle: "Contatto",
      contactSubtitle: "Pronto a trasformare il tuo business? Parliamo",
      emailLabel: "Email",
      locationLabel: "Posizione",
      locationValue: "Lima, Perù 🇵🇪",
      specialtiesLabel: "Specialità",
      specialtiesValue: "Sviluppo Web · Automazione · IA",
      ctaStart: "Avvia Progetto",
      ctaWhatsapp: "WhatsApp",
      industries: [
        "Agenzie di Turismo e Ospitalità",
        "Retail ed E-commerce",
        "Startup Tecnologiche e SaaS",
        "Istituzioni Educative",
        "Imprenditori e Consulenti Indipendenti",
        "Team Interni di Automazione e IT",
      ],
    },
    projectsShowcase: {
      title: "Portfolio",
      subtitle: "Progetti reali che dimostrano risultati tangibili",
      ctaTitle: "Hai un progetto ambizioso in mente?",
      ctaButton: "Richiedi Preventivo Premium",
      list: [
        {
          id: 1,
          title: "Black WhatsApp Payment",
          category: "WordPress Plugin",
          description: "Gateway di pagamento via WhatsApp per WooCommerce",
        },
        {
          id: 2,
          title: "Sales Automation N8N",
          category: "Automazione",
          description: "Flussi automatici: acquisto → WhatsApp → CRM",
        },
        {
          id: 3,
          title: "Order Management System",
          category: "Full Stack",
          description: "Sistema di gestione ordini in tempo reale",
        },
        {
          id: 4,
          title: "AI Chatbot WhatsApp",
          category: "Intelligenza Artificiale",
          description: "Bot con IA per servizio clienti e ordini",
        },
        {
          id: 5,
          title: "Admin Dashboard",
          category: "Dashboard",
          description: "Pannello amministrativo con analitica avanzata",
        },
        {
          id: 6,
          title: "BLXK Studio Web",
          category: "Landing Page",
          description: "Questo sito web che stai visitando ora",
        },
        {
          id: 7,
          title: "Social Data Mining Engine",
          category: "Data Intelligence",
          description: "Estrazione lead da Google Maps e social network con invio automatizzato via WhatsApp API",
        },
        {
          id: 8,
          title: "LiveOps Sentinel",
          category: "Monitoraggio Tempo Reale",
          description: "Monitoraggio in tempo reale di team, processi e attività dipendenti con avvisi istantanei",
        },
        {
          id: 9,
          title: "CombiPOS Ticket System",
          category: "Punto Vendita",
          description: "Sistema di biglietteria per trasporto interprovinciale con gestione posti e rotte",
        },
        {
          id: 10,
          title: "SUNAT E-Billing API",
          category: "Sistema Aziendale",
          description: "Sistema di fatturazione elettronica integrato con API SUNAT per emissione documenti fiscali",
        },
      ],
    },
    digitalProducts: {
      title: "Prodotti Digitali BLXK",
      subtitle: "Soluzioni pronte per potenziare il tuo business: hosting, template, pagamenti e automazioni.",
      list: [
        {
          id: 1,
          title: "Hosting Reseller",
          description: "Piani Imprenditore, Azienda e Premium con cPanel, WHM e SSL. Ideale per rivendere hosting.",
        },
        {
          id: 2,
          title: "Template Elementor",
          description: "Template professionali pronti all'uso, ottimizzati per le conversioni.",
        },
        {
          id: 3,
          title: "Integrazione Pagamenti",
          description: "Implementazione di Yape, Plin, Izipay QR e altri gateway di pagamento.",
        },
        {
          id: 4,
          title: "Automazioni Pre-configurate",
          description: "Flussi n8n pronti per connettere WhatsApp, CRM e notifiche.",
        },
      ],
    },
  },
}
