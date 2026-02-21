import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { cookies, headers } from "next/headers"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Footer } from "@/components/layout/footer"
import { LanguageProvider } from "@/components/layout/language-provider"
import { FloatingLanguageSelector } from "@/components/layout/language-floating"
import { I18nDebugPanel } from "@/components/layout/i18n-debug"
import { BlxkChatbot } from "@/components/home/blxk-chatbot"
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_MANUAL_COOKIE, Locale, resolveLocale } from "@/lib/i18n"

// Optimized font loading with display: swap
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdf4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "BLXK Studio | Desarrollo Web, IA y Automatización",
  description:
    "Desarrollo web, automatización e IA para empresas. En BLXK Studio creamos soluciones rápidas, seguras y escalables.",
  keywords:
    "BLXK Studio, desarrollo web, automatización n8n, inteligencia artificial, integraciones API, software empresarial",
  authors: [{ name: "Alonso", url: "https://blxkstudio.com" }],
  creator: "Alonso",
  metadataBase: new URL("https://blxkstudio.com"),
  alternates: {
    canonical: "https://blxkstudio.com",
    languages: {
      "es-PE": "https://blxkstudio.com",
      es: "https://blxkstudio.com",
    },
  },
  openGraph: {
    title: "BLXK Studio | Desarrollo Web, IA y Automatización",
    description:
      "Software web, automatización e IA para hacer crecer tu negocio.",
    url: "https://blxkstudio.com",
    siteName: "BLXK Studio",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BLXK Studio - Desarrollo web, IA y automatización",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLXK Studio | Desarrollo Web y Automatización",
    description: "Soluciones web, IA y automatización para empresas.",
    images: ["/twitter-image"],
    creator: "@BlxkBusines",
    site: "@BlxkBusines",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  applicationName: "BLXK Studio",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

// JSON-LD estructurado en grafo para evitar propiedades inválidas en WebSite
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://blxkstudio.com/#organization",
      name: "BLXK Studio",
      url: "https://blxkstudio.com",
      logo: {
        "@type": "ImageObject",
        url: "https://blxkstudio.com/logo.png",
      },
      description:
        "Agencia tecnológica peruana especializada en desarrollo web, automatización y soluciones digitales.",
      sameAs: [
        "https://x.com/alvaroblxk",
        "https://linkedin.com/company/blxkstudio",
        "https://github.com/Darksea030",
        "https://instagram.com/blxkstudio",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "admin@blxkstudio.com",
          telephone: "+51913259652",
          areaServed: ["PE", "MX", "CO", "CL", "AR"],
          availableLanguage: ["es"],
        },
      ],
      areaServed: ["PE", "MX", "CO", "CL", "AR"],
    },
    {
      "@type": "Person",
      "@id": "https://blxkstudio.com/#founder",
      name: "Alonso",
      jobTitle: "Founder & Full-Stack Developer",
      worksFor: { "@id": "https://blxkstudio.com/#organization" },
      affiliation: { "@id": "https://blxkstudio.com/#organization" },
      knowsAbout: ["Software Development", "N8N Automation", "AI", "API Design"],
    },
    {
      "@type": "WebSite",
      "@id": "https://blxkstudio.com/#website",
      name: "BLXK Studio",
      url: "https://blxkstudio.com",
      inLanguage: "es-PE",
      publisher: { "@id": "https://blxkstudio.com/#organization" },
      about: { "@id": "https://blxkstudio.com/#founder" },
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale = resolveLocale({
    cookieLocale: cookieStore.get(LOCALE_COOKIE)?.value,
    manualLocale: cookieStore.get(LOCALE_MANUAL_COOKIE)?.value,
    countryCode: headerStore.get("x-vercel-ip-country") || headerStore.get("cf-ipcountry"),
    acceptLanguage: headerStore.get("accept-language"),
  }) as Locale

  return (
    <html
      lang={locale || DEFAULT_LOCALE}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const removeInjectedNodes = () => {
      document.querySelectorAll("#pixefy-svg-filters").forEach((el) => el.remove())
    }
    removeInjectedNodes()
    const observer = new MutationObserver(removeInjectedNodes)
    observer.observe(document.documentElement, { childList: true, subtree: true })
    window.addEventListener("load", () => observer.disconnect(), { once: true })
  } catch {}
})();`,
          }}
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider initialLocale={locale || DEFAULT_LOCALE}>
            {children}
            <I18nDebugPanel />
            <FloatingLanguageSelector />
            <BlxkChatbot />
            <Footer />
            <SpeedInsights />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
