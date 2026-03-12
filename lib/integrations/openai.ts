import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateBlxkChatResponse(input: {
  message: string
  conversationHistory?: Array<{ role: "user" | "assistant" | "system"; content: string }>
}) {
  const systemPrompt = `Eres BLXK, un asistente de IA para BLXK Studio, una startup tecnológica peruana especializada en:
- Desarrollo de software personalizado
- Automatización inteligente con n8n
- Soluciones digitales innovadoras
- Consultoría tecnológica

Proporciona respuestas útiles, profesionales y amigables sobre nuestros servicios. Si el usuario pregunta algo fuera de tu ámbito, sugiere que se comunique directamente con el equipo.`

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages: [...(input.conversationHistory || []), { role: "user", content: input.message }],
    temperature: 0.7,
  })

  return text
}
