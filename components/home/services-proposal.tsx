"use client"

import { useState } from "react"
import { useLanguage } from "@/components/layout/language-provider"
import { CheckCircle2, TrendingUp, Users, Zap } from "lucide-react"
import { getIconBySlugs } from "@/lib/service-icons"

export function ServicesProposal({ isHomeVersion = false }) {
  const { m } = useLanguage()
  const [expandedId, setExpandedId] = useState<number | null>(isHomeVersion ? null : 1)
  const [activeTab, setActiveTab] = useState<string>("overview")

  const displayServices = isHomeVersion ? m.services.list.slice(0, 2) : m.services.list

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
    setActiveTab("overview")
  }

  return (
    <section className="py-12 md:py-20 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold neon-text-sm">{m.services.title}</h2>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:leading-loose">
              {m.services.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {displayServices.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleExpand(service.id)}
                className="cursor-pointer min-w-0"
              >
                <div className="neon-card-rotating p-4 sm:p-6 rounded-lg space-y-4 transition-all duration-300 min-w-0 overflow-x-clip">
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/30">
                        {(() => {
                          const IconComponent = getIconBySlugs(service.slug || `service-${service.id}`)
                          return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={1.5} />
                        })()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight break-words">{service.title}</h3>
                      <p className="text-base sm:text-lg text-primary font-semibold leading-snug">{service.description}</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.introduction}</p>

                  {/* Expandable Content */}
                  {expandedId === service.id && (
                    <div className="pt-4 sm:pt-6 space-y-5 sm:space-y-6 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Tabs */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap pb-2">
                          {[
                            { id: "overview", label: m.services.tabs.overview, icon: "📋" },
                            { id: "comparison", label: m.services.tabs.comparison, icon: "⚖️" },
                            { id: "advantages", label: m.services.tabs.advantages, icon: "⭐" },
                            { id: "usecases", label: m.services.tabs.usecases, icon: "🎯" },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveTab(tab.id)
                              }}
                              className={`inline-flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                                }`}
                            >
                              {tab.icon} {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4">
                          {activeTab === "overview" && (
                            <div className="space-y-4">
                              <h4 className="text-base sm:text-lg font-semibold text-foreground">{m.services.labels.metrics}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {service.metrics.map((metric, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1"
                                  >
                                    <p className="text-xs sm:text-sm text-muted-foreground">{metric.label}</p>
                                    <p className="text-lg sm:text-xl font-bold text-primary">{metric.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === "comparison" && (
                            <div className="space-y-4">
                              {service.features.map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="space-y-3 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                  <h5 className="font-semibold text-foreground text-sm sm:text-base">{feature.label}</h5>
                                  <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                      <span className="text-xs sm:text-sm font-medium text-muted-foreground sm:min-w-20">
                                        {m.services.labels.standard}
                                      </span>
                                      <span className="text-xs sm:text-sm text-muted-foreground min-w-0 break-words">{feature.standard}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                      <span className="text-xs sm:text-sm font-medium text-primary sm:min-w-20">{m.services.labels.blxk}</span>
                                      <span className="text-xs sm:text-sm text-primary font-medium min-w-0 break-words">{feature.blxk}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "advantages" && (
                            <div className="space-y-3">
                              {service.advantages.map((advantage, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    {advantage}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "usecases" && (
                            <div className="space-y-3">
                              {service.useCases.map((useCase, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{useCase}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <a
                        href="https://wa.me/51953576234?text=Hola%20BLXK%20Studio,%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block w-full mt-4 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary text-sm sm:text-base font-semibold rounded-lg transition-colors text-center"
                      >
                        {m.services.ctaMore}
                      </a>
                    </div>
                  )}

                  {/* Collapse indicator */}
                  {expandedId !== service.id && (
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold pt-2">
                      <Zap className="w-4 h-4" />
                      {m.services.labels.clickDetails}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Full Services CTA */}
          {isHomeVersion && (
            <div className="text-center pt-8">
              <a
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                {m.services.ctaAll}
                <TrendingUp className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
