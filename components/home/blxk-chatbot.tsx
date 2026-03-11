"use client"

import { useState, useRef, useEffect, memo, useCallback } from "react"
import { X, Send, Trash2, Bot } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/hooks/use-theme"
import { useChatHistory } from "@/hooks/use-chat-history"
import { useLanguage } from "@/components/layout/language-provider"
import { Locale } from "@/lib/i18n"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const COPY: Record<
  Locale,
  {
    openLabel: string
    closeLabel: string
    assistantName: string
    assistantSubtitle: string
    clearTitle: string
    suggestions: string[]
    placeholder: string
    genericError: string
    timeoutError: string
    networkError: string
    timeLocale: string
  }
> = {
  es: {
    openLabel: "Abrir chatbot BLXK",
    closeLabel: "Cerrar chat",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Informacion y soporte",
    clearTitle: "Limpiar historial",
    suggestions: [
      "Que servicios ofrecen?",
      "Como inicio un proyecto?",
      "Cuentame sobre la automatizacion IA",
      "Cual es su stack tecnologico?",
    ],
    placeholder: "Escribe tu pregunta...",
    genericError: "Lo siento, hubo un error. Por favor, intenta de nuevo.",
    timeoutError: "La solicitud tardo demasiado. Por favor, intenta de nuevo.",
    networkError: "No hay conexion con el servidor. Por favor, verifica tu conexion.",
    timeLocale: "es-ES",
  },
  en: {
    openLabel: "Open BLXK chatbot",
    closeLabel: "Close chat",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Information and support",
    clearTitle: "Clear history",
    suggestions: [
      "What services do you offer?",
      "How do I start a project?",
      "Tell me about AI automation",
      "What is your tech stack?",
    ],
    placeholder: "Type your question...",
    genericError: "Sorry, something went wrong. Please try again.",
    timeoutError: "The request took too long. Please try again.",
    networkError: "No connection to the server. Please check your connection.",
    timeLocale: "en-US",
  },
  pt: {
    openLabel: "Abrir chatbot BLXK",
    closeLabel: "Fechar chat",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Informacoes e suporte",
    clearTitle: "Limpar historico",
    suggestions: [
      "Quais servicos voces oferecem?",
      "Como inicio um projeto?",
      "Conte-me sobre automacao com IA",
      "Qual e o stack tecnologico de voces?",
    ],
    placeholder: "Digite sua pergunta...",
    genericError: "Desculpe, ocorreu um erro. Tente novamente.",
    timeoutError: "A solicitacao demorou demais. Tente novamente.",
    networkError: "Sem conexao com o servidor. Verifique sua conexao.",
    timeLocale: "pt-BR",
  },
  fr: {
    openLabel: "Ouvrir le chatbot BLXK",
    closeLabel: "Fermer le chat",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Informations et support",
    clearTitle: "Effacer l'historique",
    suggestions: [
      "Quels services proposez-vous ?",
      "Comment demarrer un projet ?",
      "Parlez-moi de l'automatisation IA",
      "Quelle est votre stack technique ?",
    ],
    placeholder: "Ecrivez votre question...",
    genericError: "Desole, une erreur est survenue. Veuillez reessayer.",
    timeoutError: "La requete a pris trop de temps. Veuillez reessayer.",
    networkError: "Impossible de joindre le serveur. Verifiez votre connexion.",
    timeLocale: "fr-FR",
  },
  de: {
    openLabel: "BLXK-Chatbot offnen",
    closeLabel: "Chat schliessen",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Informationen und Support",
    clearTitle: "Verlauf loschen",
    suggestions: [
      "Welche Services bieten Sie an?",
      "Wie starte ich ein Projekt?",
      "Erzahlen Sie mir von KI-Automatisierung",
      "Wie sieht Ihr Tech-Stack aus?",
    ],
    placeholder: "Schreiben Sie Ihre Frage...",
    genericError: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.",
    timeoutError: "Die Anfrage dauerte zu lange. Bitte versuchen Sie es erneut.",
    networkError: "Keine Verbindung zum Server. Bitte Verbindung prufen.",
    timeLocale: "de-DE",
  },
  it: {
    openLabel: "Apri chatbot BLXK",
    closeLabel: "Chiudi chat",
    assistantName: "BLXK Assistant",
    assistantSubtitle: "Informazioni e supporto",
    clearTitle: "Cancella cronologia",
    suggestions: [
      "Quali servizi offrite?",
      "Come posso avviare un progetto?",
      "Parlami dell'automazione IA",
      "Qual e il vostro stack tecnologico?",
    ],
    placeholder: "Scrivi la tua domanda...",
    genericError: "Si e verificato un errore. Riprova.",
    timeoutError: "La richiesta ha impiegato troppo tempo. Riprova.",
    networkError: "Nessuna connessione al server. Controlla la tua connessione.",
    timeLocale: "it-IT",
  },
}

const ChatMessage = memo(function ChatMessage({
  message,
  isDayMode,
  timeLocale,
}: {
  message: Message
  isDayMode: boolean
  timeLocale: string
}) {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 ${
          message.sender === "user"
            ? isDayMode
              ? "bg-blue-500 text-white"
              : "bg-cyan-500 text-slate-900"
            : isDayMode
              ? "bg-gray-200 text-gray-900"
              : "bg-slate-700 text-white"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="mt-1 block text-xs opacity-70">
          {message.timestamp.toLocaleTimeString(timeLocale, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
})

const LoadingIndicator = memo(function LoadingIndicator({ isDayMode }: { isDayMode: boolean }) {
  return (
    <div className="flex justify-start">
      <div className={`rounded-lg px-4 py-2 ${isDayMode ? "bg-gray-200" : "bg-slate-700"}`}>
        <div className="flex space-x-2">
          <div className={`h-2 w-2 animate-bounce rounded-full ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
          <div className={`h-2 w-2 animate-bounce rounded-full delay-100 ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
          <div className={`h-2 w-2 animate-bounce rounded-full delay-200 ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
        </div>
      </div>
    </div>
  )
})

function BlxkChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, addMessage, clearHistory, isLoaded } = useChatHistory()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isDayMode } = useTheme()
  const { locale } = useLanguage()
  const copy = COPY[locale]

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(
    async (e?: React.FormEvent, directMessage?: string) => {
      if (e) e.preventDefault()
      const messageToSend = directMessage || input
      if (!messageToSend.trim()) return

      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageToSend,
        sender: "user",
        timestamp: new Date(),
      }

      addMessage(userMessage)
      if (!directMessage) setInput("")
      setIsLoading(true)

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageToSend,
            conversationHistory: messages.map((message: Message) => ({
              role: message.sender === "user" ? "user" : "assistant",
              content: message.text,
            })),
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        if (!data.response) {
          throw new Error("No response received")
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
        }
        addMessage(botMessage)
      } catch (error: unknown) {
        let errorText = copy.genericError

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorText = copy.timeoutError
          } else if (error.message.includes("Failed to fetch")) {
            errorText = copy.networkError
          }
        }

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorText,
          sender: "bot",
          timestamp: new Date(),
        }
        addMessage(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [input, messages, addMessage, copy]
  )

  const toggleOpen = useCallback(() => setIsOpen((prev: boolean) => !prev), [])
  const closeChat = useCallback(() => setIsOpen(false), [])

  if (!isLoaded) return null

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className={`fixed bottom-24 right-8 z-[60] rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl md:bottom-8 md:right-8 ${
            isDayMode
              ? "bg-gradient-to-br from-cyan-400 to-cyan-500 hover:shadow-cyan-400/50"
              : "bg-gradient-to-br from-cyan-500 to-magenta-500 hover:shadow-cyan-500/50"
          } shadow-lg`}
          aria-label={copy.openLabel}
        >
          <Image
            src="/social/whatsapp-white.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-[2px] md:pointer-events-none md:inset-auto md:bottom-8 md:right-8 md:max-h-[600px] md:w-96 md:items-stretch md:justify-end md:bg-transparent">
          <button type="button" aria-label={copy.closeLabel} onClick={closeChat} className="absolute inset-0 md:hidden" />
          <div
            className={`relative z-[71] flex max-h-[calc(100vh-5rem)] w-full flex-col overflow-hidden rounded-t-[28px] shadow-2xl transition-all duration-300 md:pointer-events-auto md:h-auto md:max-h-[600px] md:rounded-2xl ${
              isDayMode ? "border border-gray-200 bg-white" : "border border-slate-700 bg-slate-900"
            }`}
          >
            <div
              className={`flex flex-shrink-0 items-start justify-between p-4 ${
                isDayMode ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gradient-to-r from-cyan-500 to-magenta-500"
              }`}
            >
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                  <Bot className="h-5 w-5 text-white" />
                  {copy.assistantName}
                </h3>
                <p className="text-sm text-white/80">{copy.assistantSubtitle}</p>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={clearHistory}
                  className="rounded p-1 transition-colors hover:bg-white/20"
                  title={copy.clearTitle}
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
                <button
                  onClick={closeChat}
                  className="touch-manipulation rounded-full p-2 transition-colors hover:bg-white/20"
                  title={copy.closeLabel}
                  aria-label={copy.closeLabel}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            <div className={`flex-1 space-y-4 overflow-y-auto p-4 ${isDayMode ? "bg-gray-50" : "bg-slate-800"}`}>
              {messages.length <= 1 && (
                <div className="animate-in space-y-4 py-4 fade-in duration-500">
                  <div className="flex flex-wrap justify-center gap-2">
                    {copy.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSendMessage(undefined, suggestion)}
                        className={`rounded-full border px-3 py-1.5 text-[11px] transition-all hover:scale-105 active:scale-95 ${
                          isDayMode
                            ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                            : "border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-700"
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message: Message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isDayMode={isDayMode}
                  timeLocale={copy.timeLocale}
                />
              ))}
              {isLoading && <LoadingIndicator isDayMode={isDayMode} />}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className={`flex flex-shrink-0 border-t p-4 ${isDayMode ? "border-gray-200 bg-white" : "border-slate-700 bg-slate-800"}`}
            >
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={copy.placeholder}
                  className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    isDayMode
                      ? "border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      : "border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`flex-shrink-0 rounded-lg p-2 text-white transition-all disabled:cursor-not-allowed ${
                    isDayMode
                      ? "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                      : "bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600"
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export const BlxkChatbot = memo(BlxkChatbotComponent)
