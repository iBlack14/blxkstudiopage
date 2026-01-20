import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"

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
  title: "Alonso | BLXK Studio - Desarrollo Web, IA y Automatización N8N | Full-Stack Developer Perú",
  description:
    "Alonso, fundador de BLXK Studio. Especialista en desarrollo web empresarial, automatización N8N, IA e integraciones API. Transformamos negocios con tecnología escalable y eficiente.",
  keywords:
    "Alonso BLXK, desarrollador full-stack Perú, automatización N8N, chatbot WhatsApp, desarrollo web empresarial, agencia software, integraciones API, IA empresarial, transformación digital, backend developer, startup tech",
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
    title: "Alonso - BLXK Studio | Desarrollo Web, IA y Automatización",
    description:
      "Fundador de BLXK Studio. Especialista en software empresarial, automatización inteligente y soluciones digitales. Transformamos negocios con tecnología.",
    url: "https://blxkstudio.com",
    siteName: "BLXK Studio",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alonso - BLXK Studio Founder",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLXK Studio - Desarrollo Web y Automatización",
    description: "Soluciones tech premium para transformar tu negocio. N8N, chatbots, APIs y software empresarial.",
    images: ["/og-image-twitter.jpg"],
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
}

// JSON-LD Schema as a separate component for cleaner code
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BLXK Studio",
  url: "https://blxkstudio.com",
  creator: {
    "@type": "Person",
    name: "Alonso",
    jobTitle: "Founder & Full-Stack Developer",
    affiliation: {
      "@type": "Organization",
      name: "BLXK Studio",
    },
    knowsAbout: ["Software Development", "N8N Automation", "AI", "API Design"],
  },
  organization: {
    "@type": "Organization",
    name: "BLXK Studio",
    url: "https://blxkstudio.com",
    logo: "https://blxkstudio.com/logo.png",
    description:
      "Agencia tecnológica peruana especializada en desarrollo web, automatización y soluciones digitales.",
    sameAs: [
      "https://twitter.com/BlxkBusines",
      "https://linkedin.com/company/blxkstudio",
      "https://github.com/blxkstudio",
    ],
    areaServed: ["PE", "MX", "CO", "CL", "AR"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
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
          {children}
          <Footer />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
