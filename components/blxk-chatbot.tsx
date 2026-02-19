"use client"

import { useState, useRef, useEffect, memo, useCallback } from "react"
import { X, Send, Trash2 } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/hooks/use-theme"
import { useChatHistory } from "@/hooks/use-chat-history"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// Memoized message component
const ChatMessage = memo(function ChatMessage({
  message,
  isDayMode
}: {
  message: Message
  isDayMode: boolean
}) {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === "user"
          ? isDayMode
            ? "bg-blue-500 text-white"
            : "bg-cyan-500 text-slate-900"
          : isDayMode
            ? "bg-gray-200 text-gray-900"
            : "bg-slate-700 text-white"
          }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
})

// Loading indicator
const LoadingIndicator = memo(function LoadingIndicator({ isDayMode }: { isDayMode: boolean }) {
  return (
    <div className="flex justify-start">
      <div className={`px-4 py-2 rounded-lg ${isDayMode ? "bg-gray-200" : "bg-slate-700"}`}>
        <div className="flex space-x-2">
          <div className={`w-2 h-2 rounded-full animate-bounce ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
          <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
          <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`} />
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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(async (e?: React.FormEvent, directMessage?: string) => {
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
          conversationHistory: messages.map((m: Message) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
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
      let errorText = "Lo siento, hubo un error. Por favor, intenta de nuevo."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorText = "La solicitud tardó demasiado. Por favor, intenta de nuevo."
        } else if (error.message.includes("Failed to fetch")) {
          errorText = "No hay conexión con el servidor. Por favor, verifica tu conexión."
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
  }, [input, messages, addMessage])

  const toggleOpen = useCallback(() => setIsOpen((prev: boolean) => !prev), [])
  const closeChat = useCallback(() => setIsOpen(false), [])

  if (!isLoaded) return null

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className={`fixed z-40 p-4 rounded-full shadow-2xl transition-all duration-300 md:bottom-8 md:right-8 bottom-24 right-8 ${isDayMode
            ? "bg-gradient-to-br from-cyan-400 to-cyan-500 hover:shadow-cyan-400/50"
            : "bg-gradient-to-br from-cyan-500 to-magenta-500 hover:shadow-cyan-500/50"
            } hover:scale-110 shadow-lg hover:shadow-2xl`}
          aria-label="Open BLXK Chatbot"
        >
          <Image
            src="/social/whatsapp-white.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-0 right-0 z-30 flex items-end justify-center p-4 md:inset-auto md:bottom-8 md:right-8 md:w-96 md:max-h-[600px] md:flex md:items-stretch md:justify-end md:p-0">
          <div
            className={`w-full max-h-[80vh] md:h-auto rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${isDayMode ? "bg-white border border-gray-200" : "bg-slate-900 border border-slate-700"
              }`}
          >
            {/* Header */}
            <div
              className={`p-4 flex justify-between items-start flex-shrink-0 ${isDayMode ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gradient-to-r from-cyan-500 to-magenta-500"
                }`}
            >
              <div>
                <h3 className="text-white font-bold text-lg">BLXK Assistant</h3>
                <p className="text-white/80 text-sm">Información y soporte</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={clearHistory}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Limpiar historial"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Cerrar chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDayMode ? "bg-gray-50" : "bg-slate-800"}`}>
              {messages.length <= 1 && (
                <div className="space-y-4 py-4 animate-in fade-in duration-500">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "¿Qué servicios ofrecen?",
                      "¿Cómo inicio un proyecto?",
                      "Cuéntame sobre la automatización IA",
                      "¿Cuál es su stack tecnológico?"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSendMessage(undefined, suggestion)}
                        className={`text-[11px] px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${isDayMode
                          ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-cyan-500/50"
                          }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message: Message) => (
                <ChatMessage key={message.id} message={message} isDayMode={isDayMode} />
              ))}
              {isLoading && <LoadingIndicator isDayMode={isDayMode} />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className={`p-4 border-t flex-shrink-0 ${isDayMode ? "bg-white border-gray-200" : "bg-slate-800 border-slate-700"}`}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm ${isDayMode
                    ? "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    : "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isDayMode ? "focus:ring-blue-500" : "focus:ring-cyan-500"}`}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`p-2 rounded-lg transition-all flex-shrink-0 ${isDayMode
                    ? "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                    : "bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600"
                    } text-white disabled:cursor-not-allowed`}
                >
                  <Send className="w-5 h-5" />
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
