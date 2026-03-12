export type N8nPayload = Record<string, unknown>

export async function postToN8n(webhookUrl: string, payload: N8nPayload) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const contentType = response.headers.get("content-type") || ""
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text()

  return {
    ok: response.ok,
    status: response.status,
    data,
  }
}
