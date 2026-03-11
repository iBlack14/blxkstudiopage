"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Target } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

const COPY: Record<Locale, {
  impactTitle: string
  impactSubtitle: string
  automation: string
  stats: Array<{ label: string; value: string; description: string; icon: typeof TrendingUp }>
  growthTitle: string
  adoption: string
  clients: string
  distributionTitle: string
  share: string
  projects: string
  months: string[]
}> = {
  es: {
    impactTitle: "Impacto Medible",
    impactSubtitle: "Resultados concretos que generan valor real para nuestros clientes",
    automation: "Automatizacion",
    stats: [
      { icon: TrendingUp, label: "Incremento de Ventas", value: "340%", description: "Promedio de clientes" },
      { icon: Users, label: "Usuarios Activos", value: "2,500+", description: "Mensuales global" },
      { icon: Zap, label: "Automatizacion", value: "10k+", description: "Procesos/mes" },
      { icon: Target, label: "Tasa de Exito", value: "99.8%", description: "Uptime garantizado" },
    ],
    growthTitle: "Crecimiento de Adopcion",
    adoption: "Adopcion",
    clients: "Clientes",
    distributionTitle: "Distribucion de Proyectos",
    share: "Participacion",
    projects: "Proyectos",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  },
  en: {
    impactTitle: "Measurable Impact",
    impactSubtitle: "Concrete results that create real value for our clients",
    automation: "Automation",
    stats: [
      { icon: TrendingUp, label: "Sales Increase", value: "340%", description: "Client average" },
      { icon: Users, label: "Active Users", value: "2,500+", description: "Monthly global" },
      { icon: Zap, label: "Automation", value: "10k+", description: "Processes/month" },
      { icon: Target, label: "Success Rate", value: "99.8%", description: "Guaranteed uptime" },
    ],
    growthTitle: "Adoption Growth",
    adoption: "Adoption",
    clients: "Clients",
    distributionTitle: "Project Distribution",
    share: "Share",
    projects: "Projects",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  pt: {
    impactTitle: "Impacto Mensuravel",
    impactSubtitle: "Resultados concretos que geram valor real para nossos clientes",
    automation: "Automacao",
    stats: [
      { icon: TrendingUp, label: "Aumento de Vendas", value: "340%", description: "Media de clientes" },
      { icon: Users, label: "Usuarios Ativos", value: "2,500+", description: "Mensal global" },
      { icon: Zap, label: "Automacao", value: "10k+", description: "Processos/mes" },
      { icon: Target, label: "Taxa de Sucesso", value: "99.8%", description: "Uptime garantido" },
    ],
    growthTitle: "Crescimento de Adocao",
    adoption: "Adocao",
    clients: "Clientes",
    distributionTitle: "Distribuicao de Projetos",
    share: "Participacao",
    projects: "Projetos",
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  },
  fr: {
    impactTitle: "Impact Mesurable",
    impactSubtitle: "Des resultats concrets qui creent une vraie valeur pour nos clients",
    automation: "Automatisation",
    stats: [
      { icon: TrendingUp, label: "Hausse des Ventes", value: "340%", description: "Moyenne client" },
      { icon: Users, label: "Utilisateurs Actifs", value: "2,500+", description: "Mensuel global" },
      { icon: Zap, label: "Automatisation", value: "10k+", description: "Processus/mois" },
      { icon: Target, label: "Taux de Succes", value: "99.8%", description: "Disponibilite garantie" },
    ],
    growthTitle: "Croissance de l'Adoption",
    adoption: "Adoption",
    clients: "Clients",
    distributionTitle: "Distribution des Projets",
    share: "Part",
    projects: "Projets",
    months: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin"],
  },
  de: {
    impactTitle: "Messbarer Impact",
    impactSubtitle: "Konkrete Ergebnisse mit echtem Mehrwert fur unsere Kunden",
    automation: "Automatisierung",
    stats: [
      { icon: TrendingUp, label: "Umsatzwachstum", value: "340%", description: "Kundendurchschnitt" },
      { icon: Users, label: "Aktive Nutzer", value: "2,500+", description: "Monatlich global" },
      { icon: Zap, label: "Automatisierung", value: "10k+", description: "Prozesse/Monat" },
      { icon: Target, label: "Erfolgsquote", value: "99.8%", description: "Garantierte Verfugbarkeit" },
    ],
    growthTitle: "Adoptionswachstum",
    adoption: "Adoption",
    clients: "Kunden",
    distributionTitle: "Projektverteilung",
    share: "Anteil",
    projects: "Projekte",
    months: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"],
  },
  it: {
    impactTitle: "Impatto Misurabile",
    impactSubtitle: "Risultati concreti che generano vero valore per i nostri clienti",
    automation: "Automazione",
    stats: [
      { icon: TrendingUp, label: "Aumento Vendite", value: "340%", description: "Media clienti" },
      { icon: Users, label: "Utenti Attivi", value: "2,500+", description: "Mensile globale" },
      { icon: Zap, label: "Automazione", value: "10k+", description: "Processi/mese" },
      { icon: Target, label: "Tasso di Successo", value: "99.8%", description: "Uptime garantito" },
    ],
    growthTitle: "Crescita dell'Adozione",
    adoption: "Adozione",
    clients: "Clienti",
    distributionTitle: "Distribuzione Progetti",
    share: "Quota",
    projects: "Progetti",
    months: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu"],
  },
}

export function ProjectsStats() {
  const [mounted, setMounted] = useState(false)
  const { locale } = useLanguage()
  const copy = COPY[locale]
  const chartColors = {
    adoption: "#0ea5e9",
    clients: "#22c55e",
    ecommerce: "#0ea5e9",
    automation: "#22c55e",
    dashboard: "#f59e0b",
    grid: "#94a3b8",
  }

  useEffect(() => setMounted(true), [])

  const impactData = [
    { name: "E-commerce", value: 45, fill: chartColors.ecommerce },
    { name: copy.automation, value: 30, fill: chartColors.automation },
    { name: "Dashboard", value: 25, fill: chartColors.dashboard },
  ]

  const growthData = [
    { month: copy.months[0], adopcion: 20, clients: 8 },
    { month: copy.months[1], adopcion: 35, clients: 12 },
    { month: copy.months[2], adopcion: 55, clients: 18 },
    { month: copy.months[3], adopcion: 75, clients: 28 },
    { month: copy.months[4], adopcion: 95, clients: 38 },
    { month: copy.months[5], adopcion: 110, clients: 45 },
  ]

  if (!mounted) return null

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 hero-grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text text-balance">{copy.impactTitle}</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">{copy.impactSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {copy.stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="neon-card-rotating p-4 md:p-6 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="font-semibold text-foreground text-sm md:text-base">{stat.label}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <Card className="neon-card-rotating p-5 md:p-8 overflow-hidden border border-primary/20 bg-card/70 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-bold text-foreground border-l-4 border-primary pl-3">{copy.growthTitle}</h3>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.adoption }} />
                    {copy.adoption}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.clients }} />
                    {copy.clients}
                  </span>
                </div>
              </div>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke={chartColors.grid} vertical={false} opacity={0.25} />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderColor: "#bae6fd",
                        borderRadius: "10px",
                        boxShadow: "0 10px 24px rgba(2, 132, 199, 0.18)",
                        fontSize: 12,
                      }}
                      itemStyle={{ color: "#0f172a" }}
                    />
                    <Line type="monotone" dataKey="adopcion" stroke={chartColors.adoption} strokeWidth={3} dot={false} activeDot={{ r: 5, fill: chartColors.adoption, stroke: "#ffffff", strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="clients" stroke={chartColors.clients} strokeWidth={3} dot={false} activeDot={{ r: 5, fill: chartColors.clients, stroke: "#ffffff", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="neon-card-rotating p-5 md:p-8 flex flex-col border border-primary/20 bg-card/70 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-foreground border-l-4 border-accent pl-3">{copy.distributionTitle}</h3>
              <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={impactData} cx="50%" cy="50%" innerRadius={68} outerRadius={102} paddingAngle={3} dataKey="value" stroke="#ffffff" strokeWidth={2}>
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => <span style={{ color: "#334155", fontSize: 12, fontWeight: 600 }}>{value}</span>}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, copy.share]}
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderColor: "#bae6fd",
                        borderRadius: "10px",
                        boxShadow: "0 10px 24px rgba(2, 132, 199, 0.18)",
                        fontSize: 12,
                      }}
                      itemStyle={{ color: "#0f172a" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-foreground">100+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{copy.projects}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {impactData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-slate-200 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
