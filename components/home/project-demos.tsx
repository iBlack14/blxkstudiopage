"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<Locale, any> = {
  es: {
    title: "Demos Interactivas",
    subtitle: "Experimenta en vivo como funcionan nuestras soluciones premium",
    demos: {
      whatsapp: {
        title: "WhatsApp Gateway",
        subtitle: "Simula una compra directa por WhatsApp",
        user: 'Cliente: "Quiero 2 unidades del producto XYZ"',
        bot: 'Bot: "Total: $50. ¿Proceder con pago?"',
        success: "Pedido procesado exitosamente",
      },
      n8n: {
        title: "N8N Automation",
        subtitle: "Flujo automatico de pedido a notificacion",
        steps: ["1. Pedido en WooCommerce", "2. WhatsApp → Cliente notificado", "3. Google Sheets actualizado", "4. Dashboard Supabase sincronizado"],
      },
      orders: {
        title: "Gestion de Pedidos",
        subtitle: "Panel completo de seguimiento",
        statuses: ["En preparacion", "Enviado", "Entregado"],
      },
      chatbot: {
        title: "Chatbot IA",
        subtitle: "Respuestas inteligentes 24/7",
        user: '"¿Cuales son tus horarios?"',
        bot: '"Abierto 24/7. ¿En que mas te ayudo?"',
      },
      admin: {
        title: "Panel Admin",
        subtitle: "Control total del negocio",
        metrics: ["Ingresos hoy", "Pedidos activos", "Tasa conversion"],
      },
    },
  },
  en: {
    title: "Interactive Demos",
    subtitle: "Experience live how our premium solutions work",
    demos: {
      whatsapp: {
        title: "WhatsApp Gateway",
        subtitle: "Simulate a direct purchase through WhatsApp",
        user: 'Client: "I want 2 units of product XYZ"',
        bot: 'Bot: "Total: $50. Proceed with payment?"',
        success: "Order processed successfully",
      },
      n8n: {
        title: "N8N Automation",
        subtitle: "Automatic flow from order to notification",
        steps: ["1. Order in WooCommerce", "2. WhatsApp → Client notified", "3. Google Sheets updated", "4. Supabase dashboard synced"],
      },
      orders: {
        title: "Order Management",
        subtitle: "Complete tracking panel",
        statuses: ["Preparing", "Sent", "Delivered"],
      },
      chatbot: {
        title: "AI Chatbot",
        subtitle: "Smart 24/7 responses",
        user: '"What are your opening hours?"',
        bot: '"Open 24/7. How else can I help?"',
      },
      admin: {
        title: "Admin Panel",
        subtitle: "Full business control",
        metrics: ["Revenue today", "Active orders", "Conversion rate"],
      },
    },
  },
  pt: {
    title: "Demos Interativas",
    subtitle: "Experimente ao vivo como funcionam nossas solucoes premium",
    demos: {
      whatsapp: {
        title: "WhatsApp Gateway",
        subtitle: "Simule uma compra direta pelo WhatsApp",
        user: 'Cliente: "Quero 2 unidades do produto XYZ"',
        bot: 'Bot: "Total: $50. Prosseguir com o pagamento?"',
        success: "Pedido processado com sucesso",
      },
      n8n: {
        title: "Automacao N8N",
        subtitle: "Fluxo automatico do pedido ate a notificacao",
        steps: ["1. Pedido no WooCommerce", "2. WhatsApp → Cliente notificado", "3. Google Sheets atualizado", "4. Dashboard Supabase sincronizado"],
      },
      orders: {
        title: "Gestao de Pedidos",
        subtitle: "Painel completo de acompanhamento",
        statuses: ["Em preparacao", "Enviado", "Entregue"],
      },
      chatbot: {
        title: "Chatbot IA",
        subtitle: "Respostas inteligentes 24/7",
        user: '"Quais sao seus horarios?"',
        bot: '"Aberto 24/7. Como mais posso ajudar?"',
      },
      admin: {
        title: "Painel Admin",
        subtitle: "Controle total do negocio",
        metrics: ["Receita hoje", "Pedidos ativos", "Taxa de conversao"],
      },
    },
  },
  fr: {
    title: "Demos Interactives",
    subtitle: "Decouvrez en direct comment fonctionnent nos solutions premium",
    demos: {
      whatsapp: {
        title: "Passerelle WhatsApp",
        subtitle: "Simulez un achat direct via WhatsApp",
        user: 'Client: "Je veux 2 unites du produit XYZ"',
        bot: 'Bot: "Total: $50. Proceder au paiement ?" ',
        success: "Commande traitee avec succes",
      },
      n8n: {
        title: "Automatisation N8N",
        subtitle: "Flux automatique de la commande a la notification",
        steps: ["1. Commande dans WooCommerce", "2. WhatsApp → Client notifie", "3. Google Sheets mis a jour", "4. Dashboard Supabase synchronise"],
      },
      orders: {
        title: "Gestion des Commandes",
        subtitle: "Tableau de suivi complet",
        statuses: ["En preparation", "Envoye", "Livre"],
      },
      chatbot: {
        title: "Chatbot IA",
        subtitle: "Reponses intelligentes 24/7",
        user: '"Quels sont vos horaires ?" ',
        bot: '"Ouvert 24/7. Comment puis-je vous aider ?" ',
      },
      admin: {
        title: "Panneau Admin",
        subtitle: "Controle total de l'entreprise",
        metrics: ["Revenus du jour", "Commandes actives", "Taux de conversion"],
      },
    },
  },
  de: {
    title: "Interaktive Demos",
    subtitle: "Erleben Sie live, wie unsere Premium-Loesungen funktionieren",
    demos: {
      whatsapp: {
        title: "WhatsApp Gateway",
        subtitle: "Simulieren Sie einen direkten Kauf uber WhatsApp",
        user: 'Kunde: "Ich mochte 2 Einheiten des Produkts XYZ"',
        bot: 'Bot: "Gesamt: $50. Zahlung fortsetzen?"',
        success: "Bestellung erfolgreich verarbeitet",
      },
      n8n: {
        title: "N8N Automatisierung",
        subtitle: "Automatischer Ablauf von Bestellung bis Benachrichtigung",
        steps: ["1. Bestellung in WooCommerce", "2. WhatsApp → Kunde benachrichtigt", "3. Google Sheets aktualisiert", "4. Supabase-Dashboard synchronisiert"],
      },
      orders: {
        title: "Bestellverwaltung",
        subtitle: "Vollstandiges Tracking-Panel",
        statuses: ["In Vorbereitung", "Versendet", "Zugestellt"],
      },
      chatbot: {
        title: "KI-Chatbot",
        subtitle: "Intelligente Antworten rund um die Uhr",
        user: '"Wie sind Ihre Offnungszeiten?"',
        bot: '"24/7 geoffnet. Wie kann ich noch helfen?"',
      },
      admin: {
        title: "Admin-Panel",
        subtitle: "Volle Kontrolle uber das Geschaft",
        metrics: ["Umsatz heute", "Aktive Bestellungen", "Conversion-Rate"],
      },
    },
  },
  it: {
    title: "Demo Interattive",
    subtitle: "Scopri dal vivo come funzionano le nostre soluzioni premium",
    demos: {
      whatsapp: {
        title: "WhatsApp Gateway",
        subtitle: "Simula un acquisto diretto tramite WhatsApp",
        user: 'Cliente: "Voglio 2 unita del prodotto XYZ"',
        bot: 'Bot: "Totale: $50. Procedere con il pagamento?"',
        success: "Ordine elaborato con successo",
      },
      n8n: {
        title: "Automazione N8N",
        subtitle: "Flusso automatico dall'ordine alla notifica",
        steps: ["1. Ordine in WooCommerce", "2. WhatsApp → Cliente notificato", "3. Google Sheets aggiornato", "4. Dashboard Supabase sincronizzata"],
      },
      orders: {
        title: "Gestione Ordini",
        subtitle: "Pannello completo di monitoraggio",
        statuses: ["In preparazione", "Inviato", "Consegnato"],
      },
      chatbot: {
        title: "Chatbot IA",
        subtitle: "Risposte intelligenti 24/7",
        user: '"Quali sono i vostri orari?"',
        bot: '"Aperto 24/7. Come posso aiutarti ancora?"',
      },
      admin: {
        title: "Pannello Admin",
        subtitle: "Controllo totale del business",
        metrics: ["Ricavi oggi", "Ordini attivi", "Tasso di conversione"],
      },
    },
  },
}

export function ProjectDemos() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const { locale } = useLanguage()
  const copy = COPY[locale]

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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6" onClick={() => setActiveDemo(activeDemo === "whatsapp" ? null : "whatsapp")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                <Image src={demoIcons.whatsapp.src} alt={demoIcons.whatsapp.alt} width={22} height={22} className={demoIcons.whatsapp.modeClass} />
              </div>
              <h3 className="text-xl font-bold">{copy.demos.whatsapp.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{copy.demos.whatsapp.subtitle}</p>
            {activeDemo === "whatsapp" && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2"><span className="text-primary">→</span><span>{copy.demos.whatsapp.user}</span></div>
                  <div className="flex items-start gap-2"><span className="text-primary">←</span><span>{copy.demos.whatsapp.bot}</span></div>
                  <div className="flex items-start gap-2"><span className="text-primary">✓</span><span className="text-green-400">{copy.demos.whatsapp.success}</span></div>
                </div>
              </div>
            )}
          </Card>

          <Card className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6" onClick={() => setActiveDemo(activeDemo === "n8n" ? null : "n8n")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10 border border-orange-500/40 flex items-center justify-center">
                <Image src={demoIcons.n8n.src} alt={demoIcons.n8n.alt} width={22} height={22} className={demoIcons.n8n.modeClass} />
              </div>
              <h3 className="text-xl font-bold">{copy.demos.n8n.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{copy.demos.n8n.subtitle}</p>
            {activeDemo === "n8n" && (
              <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30 space-y-2 text-sm">
                {copy.demos.n8n.steps.map((step: string, index: number) => (
                  <div key={step}>
                    <div>{step}</div>
                    {index < copy.demos.n8n.steps.length - 1 && <div className="text-orange-400 text-center">↓</div>}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6" onClick={() => setActiveDemo(activeDemo === "orders" ? null : "orders")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/40 flex items-center justify-center">
                <Image src={demoIcons.orders.src} alt={demoIcons.orders.alt} width={22} height={22} className={demoIcons.orders.modeClass} />
              </div>
              <h3 className="text-xl font-bold">{copy.demos.orders.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{copy.demos.orders.subtitle}</p>
            {activeDemo === "orders" && (
              <div className="mt-4 space-y-2 text-sm">
                {["PED-001", "PED-002", "PED-003"].map((id, index) => (
                  <div key={id} className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                    <span>{id}</span>
                    <span className={index === 0 ? "text-yellow-400" : index === 1 ? "text-blue-400" : "text-green-400"}>{copy.demos.orders.statuses[index]}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6" onClick={() => setActiveDemo(activeDemo === "chatbot" ? null : "chatbot")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/40 flex items-center justify-center">
                <Image src={demoIcons.chatbotLight.src} alt={demoIcons.chatbotLight.alt} width={22} height={22} className={demoIcons.chatbotLight.modeClass} />
                <Image src={demoIcons.chatbotDark.src} alt={demoIcons.chatbotDark.alt} width={22} height={22} className={demoIcons.chatbotDark.modeClass} />
              </div>
              <h3 className="text-xl font-bold">{copy.demos.chatbot.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{copy.demos.chatbot.subtitle}</p>
            {activeDemo === "chatbot" && (
              <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 space-y-2 text-sm">
                <div className="flex items-start gap-2"><span>U:</span><span>{copy.demos.chatbot.user}</span></div>
                <div className="flex items-start gap-2"><span className="text-purple-400">B:</span><span>{copy.demos.chatbot.bot}</span></div>
              </div>
            )}
          </Card>

          <Card className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6" onClick={() => setActiveDemo(activeDemo === "admin" ? null : "admin")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/40 flex items-center justify-center">
                <Image src={demoIcons.admin.src} alt={demoIcons.admin.alt} width={22} height={22} className={demoIcons.admin.modeClass} />
              </div>
              <h3 className="text-xl font-bold">{copy.demos.admin.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{copy.demos.admin.subtitle}</p>
            {activeDemo === "admin" && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20"><span>{copy.demos.admin.metrics[0]}</span><span className="text-green-400">$1,250</span></div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20"><span>{copy.demos.admin.metrics[1]}</span><span className="text-green-400">12</span></div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20"><span>{copy.demos.admin.metrics[2]}</span><span className="text-green-400">3.8%</span></div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
