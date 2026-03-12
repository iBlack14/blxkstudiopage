import { env, hasEnv } from "@/lib/env"
import { postToN8n } from "@/lib/integrations/n8n"

function jsonError(error: string, status: number) {
  return Response.json({ success: false, error }, { status })
}

export async function POST(request: Request) {
  try {
    const { message, conversationHistory, action } = await request.json()

    if (!hasEnv("N8N_WEBHOOK_URL")) {
      console.warn("[BLXK][n8n-webhook] N8N_WEBHOOK_URL not configured")
      return jsonError("N8N integration not configured", 400)
    }

    const response = await postToN8n(env.n8nWebhookUrl(), {
      message,
      conversationHistory,
      action,
      timestamp: new Date().toISOString(),
    })

    if (!response.ok) {
      console.error("[BLXK][n8n-webhook] Upstream failure:", response.status, response.data)
      return jsonError("Failed to process n8n request", 502)
    }

    return Response.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    console.error("[BLXK][n8n-webhook] Error:", error)
    return jsonError("Failed to process n8n request", 500)
  }
}
