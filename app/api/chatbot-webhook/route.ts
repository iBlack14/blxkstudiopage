import { type NextRequest, NextResponse } from "next/server"

import { env, hasEnv } from "@/lib/env"
import { postToN8n } from "@/lib/integrations/n8n"

interface WebhookPayload {
  event?: "user_message" | "owner_response" | "timeout"
  userId?: string
  message?: string
  conversationId?: string
  timestamp?: string
  botActive?: boolean
  ownerName?: string
  from?: string
  type?: string
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status })
}

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json()
    const conversationId = payload.conversationId || payload.from || payload.userId
    const userId = payload.userId || payload.from
    const event = payload.event || (payload.type === "message" ? "user_message" : undefined)

    if (!conversationId || !userId || typeof payload.message !== "string" || !event) {
      return jsonError("Invalid webhook payload", 400)
    }

    if (!hasEnv("N8N_WEBHOOK_URL")) {
      return jsonError("N8N integration not configured", 503)
    }

    const n8nPayload = {
      event,
      userId,
      conversationId,
      message: payload.message,
      timestamp: payload.timestamp || new Date().toISOString(),
      source: payload.from ? "baileys" : "web",
      botActive: payload.botActive ?? true,
      ownerName: payload.ownerName || null,
      metadata: {
        userAgent: request.headers.get("user-agent"),
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      },
    }

    const response = await postToN8n(env.n8nWebhookUrl(), n8nPayload)
    if (!response.ok) {
      console.error("[BLXK][chatbot-webhook] Upstream failure:", response.status, response.data)
      return jsonError("Error processing webhook with N8N", 502)
    }

    return NextResponse.json({
      success: true,
      event,
      message: "Webhook processed by N8N",
      n8nResponse: response.data,
    })
  } catch (error) {
    console.error("[BLXK][chatbot-webhook] Error:", error)
    return jsonError("Error parsing payload", 500)
  }
}
