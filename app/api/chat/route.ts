import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [], useN8n } = body

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY environment variable")
      return Response.json(
        { error: "Chat service not configured" },
        { status: 503 }
      )
    }

    if (useN8n && process.env.N8N_WEBHOOK_URL) {
      try {
        const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            conversationHistory,
            action: "chat",
          }),
        })

        if (n8nResponse.ok) {
          const data = await n8nResponse.json()
          if (data.success && data.data?.response) {
            return Response.json({
              response: data.data.response,
              success: true,
              source: "n8n",
            })
          }
        }
      } catch (error) {
        console.error("[Chat API] N8N fallback error:", error)
        // Fall back to AI SDK if n8n fails
      }
    }

    const systemPrompt = `Eres BLXK, un asistente de IA para BLXK Studio, una startup tecnológica peruana especializada en:
- Desarrollo de software personalizado
- Automatización inteligente con n8n
- Soluciones digitales innovadoras
- Consultoría tecnológica

Proporciona respuestas útiles, profesionales y amigables sobre nuestros servicios. Si el usuario pregunta algo fuera de tu ámbito, sugiere que se comunique directamente con el equipo.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: [...conversationHistory, { role: "user", content: message }],
      temperature: 0.7,
    })

    return Response.json({
      response: text,
      success: true,
      source: "ai",
    })
  } catch (error: any) {
    console.error("[Chat API] Error:", {
      name: error?.name,
      message: error?.message,
      status: error?.status,
      error: String(error),
    })

    // Don't expose internal errors to client
    return Response.json(
      { error: "Failed to generate response. Please try again later." },
      { status: 500 }
    )
  }
}
