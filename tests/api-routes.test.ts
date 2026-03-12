import { afterEach, describe, expect, it, vi } from "vitest"

import { POST as chatRoute } from "@/app/api/chat/route"
import { POST as n8nWebhookRoute } from "@/app/api/n8n-webhook/route"

describe("chat route", () => {
  afterEach(() => {
    delete process.env.OPENAI_API_KEY
    delete process.env.N8N_WEBHOOK_URL
  })

  it("returns 503 when OPENAI_API_KEY is missing", async () => {
    const response = await chatRoute(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "hola" }),
      })
    )

    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: "Chat service not configured",
    })
  })

  it("uses n8n relay when configured and enabled", async () => {
    process.env.N8N_WEBHOOK_URL = "https://example.com/webhook"
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            response: "respuesta n8n",
          },
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      )
    )

    const response = await chatRoute(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "hola", useN8n: true }),
      })
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      source: "n8n",
      response: "respuesta n8n",
    })

    fetchMock.mockRestore()
  })
})

describe("n8n webhook route", () => {
  afterEach(() => {
    delete process.env.N8N_WEBHOOK_URL
  })

  it("returns 400 when N8N_WEBHOOK_URL is missing", async () => {
    const response = await n8nWebhookRoute(
      new Request("http://localhost/api/n8n-webhook", {
        method: "POST",
        body: JSON.stringify({ message: "hola" }),
      })
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: "N8N integration not configured",
    })
  })
})
