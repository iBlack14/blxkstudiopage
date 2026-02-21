"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/layout/language-provider"

const copyByLocale = {
  es: {
    title: "Demos Interactivas",
    subtitle: "Experimenta en vivo cómo funcionan nuestras soluciones premium",
  },
  en: {
    title: "Interactive Demos",
    subtitle: "Experience live how our premium solutions work",
  },
  pt: {
    title: "Demos Interativas",
    subtitle: "Experimente ao vivo como funcionam nossas solucoes premium",
  },
  fr: {
    title: "Demos Interactives",
    subtitle: "Decouvrez en direct comment fonctionnent nos solutions premium",
  },
  de: {
    title: "Interaktive Demos",
    subtitle: "Erleben Sie live, wie unsere Premium-Loesungen funktionieren",
  },
  it: {
    title: "Demo Interattive",
    subtitle: "Scopri dal vivo come funzionano le nostre soluzioni premium",
  },
} as const

export function ProjectDemos() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const { locale } = useLanguage()
  const copy = copyByLocale[locale]
  const isEs = locale === "es"
  const demoIcons = {
    whatsapp: { src: "/svgl/whatsapp.svg", alt: "WhatsApp", modeClass: "" },
    n8n: { src: "/svgl/n8n.svg", alt: "n8n", modeClass: "" },
    orders: { src: "/svgl/shopify.svg", alt: "Shopify", modeClass: "" },
    chatbotLight: { src: "/svgl/openai.svg", alt: "OpenAI", modeClass: "block dark:hidden" },
    chatbotDark: { src: "/svgl/openai-dark.svg", alt: "OpenAI", modeClass: "hidden dark:block" },
    admin: { src: "/svgl/supabase.svg", alt: "Supabase", modeClass: "" },
  } as const

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background border-y border-primary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">{copy.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Demo 1: WhatsApp Payment Gateway */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "whatsapp" ? null : "whatsapp")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                <Image
                  src={demoIcons.whatsapp.src}
                  alt={demoIcons.whatsapp.alt}
                  width={22}
                  height={22}
                  className={demoIcons.whatsapp.modeClass}
                />
              </div>
              <h3 className="text-xl font-bold">WhatsApp Gateway</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {isEs ? "Simula una compra directa por WhatsApp" : "Simulate a direct purchase through WhatsApp"}
            </p>

            {activeDemo === "whatsapp" && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>{isEs ? 'Cliente: "Quiero 2 unidades del producto XYZ"' : 'Client: "I want 2 units of product XYZ"'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">←</span>
                    <span>{isEs ? 'Bot: "Total: $50. ¿Proceder con pago?"' : 'Bot: "Total: $50. Proceed with payment?"'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-green-400">{isEs ? "Pedido procesado exitosamente" : "Order processed successfully"}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 2: N8N Automation */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "n8n" ? null : "n8n")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10 border border-orange-500/40 flex items-center justify-center">
                <Image
                  src={demoIcons.n8n.src}
                  alt={demoIcons.n8n.alt}
                  width={22}
                  height={22}
                  className={demoIcons.n8n.modeClass}
                />
              </div>
              <h3 className="text-xl font-bold">N8N Automation</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {isEs ? "Flujo automatico de pedido a notificacion" : "Automatic flow from order to notification"}
            </p>

            {activeDemo === "n8n" && (
              <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30 space-y-2 text-sm">
                <div>{isEs ? "1. Pedido en WooCommerce" : "1. Order in WooCommerce"}</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>{isEs ? "2. WhatsApp → Cliente notificado" : "2. WhatsApp → Client notified"}</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>{isEs ? "3. Google Sheets actualizado" : "3. Google Sheets updated"}</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>{isEs ? "4. Dashboard Supabase sincronizado" : "4. Supabase dashboard synced"}</div>
              </div>
            )}
          </Card>

          {/* Demo 3: Order Management */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "orders" ? null : "orders")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/40 flex items-center justify-center">
                <Image
                  src={demoIcons.orders.src}
                  alt={demoIcons.orders.alt}
                  width={22}
                  height={22}
                  className={demoIcons.orders.modeClass}
                />
              </div>
              <h3 className="text-xl font-bold">{isEs ? "Gestion de Pedidos" : "Order Management"}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{isEs ? "Panel completo de seguimiento" : "Complete tracking panel"}</p>

            {activeDemo === "orders" && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-001</span>
                  <span className="text-yellow-400">{isEs ? "En preparacion" : "Preparing"}</span>
                </div>
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-002</span>
                  <span className="text-blue-400">{isEs ? "Enviado" : "Sent"}</span>
                </div>
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-003</span>
                  <span className="text-green-400">{isEs ? "Entregado" : "Delivered"}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 4: Chatbot */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "chatbot" ? null : "chatbot")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/40 flex items-center justify-center">
                <Image
                  src={demoIcons.chatbotLight.src}
                  alt={demoIcons.chatbotLight.alt}
                  width={22}
                  height={22}
                  className={demoIcons.chatbotLight.modeClass}
                />
                <Image
                  src={demoIcons.chatbotDark.src}
                  alt={demoIcons.chatbotDark.alt}
                  width={22}
                  height={22}
                  className={demoIcons.chatbotDark.modeClass}
                />
              </div>
              <h3 className="text-xl font-bold">{isEs ? "Chatbot IA" : "AI Chatbot"}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{isEs ? "Respuestas inteligentes 24/7" : "Smart 24/7 responses"}</p>

            {activeDemo === "chatbot" && (
              <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span>U:</span>
                  <span>{isEs ? '"¿Cuales son tus horarios?"' : '"What are your opening hours?"'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">B:</span>
                  <span>{isEs ? '"Abierto 24/7. ¿En que mas te ayudo?"' : '"Open 24/7. How else can I help?"'}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 5: Admin Dashboard */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "admin" ? null : "admin")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/40 flex items-center justify-center">
                <Image
                  src={demoIcons.admin.src}
                  alt={demoIcons.admin.alt}
                  width={22}
                  height={22}
                  className={demoIcons.admin.modeClass}
                />
              </div>
              <h3 className="text-xl font-bold">{isEs ? "Panel Admin" : "Admin Panel"}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{isEs ? "Control total del negocio" : "Full business control"}</p>

            {activeDemo === "admin" && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>{isEs ? "Ingresos hoy" : "Revenue today"}</span>
                  <span className="text-green-400">$1,250</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>{isEs ? "Pedidos activos" : "Active orders"}</span>
                  <span className="text-green-400">12</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>{isEs ? "Tasa conversion" : "Conversion rate"}</span>
                  <span className="text-green-400">3.8%</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
