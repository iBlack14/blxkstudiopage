import { env, hasEnv } from "@/lib/env"
import { postToN8n } from "@/lib/integrations/n8n"
import { generateBlxkChatResponse } from "@/lib/integrations/openai"

function jsonError(error: string, status: number) {
  return Response.json({ success: false, error }, { status })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [], useN8n } = body

    if (!message || typeof message !== "string") {
      return jsonError("Invalid message", 400)
    }

    if (useN8n && hasEnv("N8N_WEBHOOK_URL")) {
      try {
        const n8nResponse = await postToN8n(env.n8nWebhookUrl(), {
          message,
          conversationHistory,
          action: "chat",
        })

        const n8nData = n8nResponse.data as {
          success?: boolean
          data?: { response?: string }
          response?: string
        }

        const responseText = n8nData?.data?.response || n8nData?.response
        if (n8nResponse.ok && n8nData?.success && responseText) {
          return Response.json({
            response: responseText,
            success: true,
            source: "n8n",
          })
        }
      } catch (error) {
        console.error("[Chat API] N8N fallback error:", error)
      }
    }

    if (!hasEnv("OPENAI_API_KEY")) {
      console.error("Missing OPENAI_API_KEY environment variable")
      return jsonError("Chat service not configured", 503)
    }

    const text = await generateBlxkChatResponse({
      message,
      conversationHistory,
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

    return jsonError("Failed to generate response. Please try again later.", 500)
  }
}
