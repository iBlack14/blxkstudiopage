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

export function ProjectsStats() {
  const [mounted, setMounted] = useState(false)
  const { locale } = useLanguage()
  const isEs = locale === "es"
  const chartColors = {
    adoption: "#0ea5e9",
    clients: "#22c55e",
    ecommerce: "#0ea5e9",
    automation: "#22c55e",
    dashboard: "#f59e0b",
    grid: "#94a3b8",
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const impactData = [
    { name: "E-commerce", value: 45, fill: chartColors.ecommerce },
    { name: isEs ? "Automatizacion" : "Automation", value: 30, fill: chartColors.automation },
    { name: "Dashboard", value: 25, fill: chartColors.dashboard },
  ]

  const growthData = [
    { month: isEs ? "Ene" : "Jan", adopcion: 20, clients: 8 },
    { month: isEs ? "Feb" : "Feb", adopcion: 35, clients: 12 },
    { month: isEs ? "Mar" : "Mar", adopcion: 55, clients: 18 },
    { month: isEs ? "Abr" : "Apr", adopcion: 75, clients: 28 },
    { month: isEs ? "May" : "May", adopcion: 95, clients: 38 },
    { month: isEs ? "Jun" : "Jun", adopcion: 110, clients: 45 },
  ]

  const stats = [
    {
      icon: TrendingUp,
      label: isEs ? "Incremento de Ventas" : "Sales Increase",
      value: "340%",
      description: isEs ? "Promedio de clientes" : "Client average",
    },
    {
      icon: Users,
      label: isEs ? "Usuarios Activos" : "Active Users",
      value: "2,500+",
      description: isEs ? "Mensuales global" : "Monthly global",
    },
    {
      icon: Zap,
      label: isEs ? "Automatizacion" : "Automation",
      value: "10k+",
      description: isEs ? "Procesos/mes" : "Processes/month",
    },
    {
      icon: Target,
      label: isEs ? "Tasa de Exito" : "Success Rate",
      value: "99.8%",
      description: isEs ? "Uptime garantizado" : "Guaranteed uptime",
    },
  ]

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 hero-grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text text-balance">
              {isEs ? "Impacto Medible" : "Measurable Impact"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
              {isEs
                ? "Resultados concretos que generan valor real para nuestros clientes"
                : "Concrete results that create real value for our clients"}
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card
                  key={idx}
                  className="neon-card-rotating p-4 md:p-6 group"
                >
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
            {/* Growth Chart */}
            <Card className="neon-card-rotating p-5 md:p-8 overflow-hidden border border-primary/20 bg-card/70 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-bold text-foreground border-l-4 border-primary pl-3">
                {isEs ? "Crecimiento de Adopcion" : "Adoption Growth"}
                </h3>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.adoption }} />
                    {isEs ? "Adopcion" : "Adoption"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.clients }} />
                    {isEs ? "Clientes" : "Clients"}
                  </span>
                </div>
              </div>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAdopcion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.adoption} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={chartColors.adoption} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.clients} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={chartColors.clients} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={chartColors.grid} vertical={false} opacity={0.25} />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderColor: "#bae6fd",
                        borderRadius: "10px",
                        boxShadow: "0 10px 24px rgba(2, 132, 199, 0.18)",
                        fontSize: 12
                      }}
                      itemStyle={{ color: "#0f172a" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="adopcion"
                      stroke={chartColors.adoption}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5, fill: chartColors.adoption, stroke: "#ffffff", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      stroke={chartColors.clients}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5, fill: chartColors.clients, stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="neon-card-rotating p-5 md:p-8 flex flex-col border border-primary/20 bg-card/70 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-foreground border-l-4 border-accent pl-3">
                {isEs ? "Distribucion de Proyectos" : "Project Distribution"}
              </h3>
              <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={68}
                      outerRadius={102}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
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
                      formatter={(value) => [`${value}%`, isEs ? "Participacion" : "Share"]}
                      labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderColor: "#bae6fd",
                        borderRadius: "10px",
                        boxShadow: "0 10px 24px rgba(2, 132, 199, 0.18)",
                        fontSize: 12
                      }}
                      itemStyle={{ color: "#0f172a" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text for donut chart */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-foreground">100+</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {isEs ? "Proyectos" : "Projects"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {impactData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-slate-200 shadow-sm"
                  >
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
