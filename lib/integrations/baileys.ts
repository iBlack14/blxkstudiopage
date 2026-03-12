export async function sendBaileysTextMessage(input: {
  serverUrl: string
  apiKey?: string
  to: string
  message: string
}) {
  const formattedNumber = input.to.includes("@") ? input.to : `${input.to}@s.whatsapp.net`

  const response = await fetch(`${input.serverUrl}/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${input.apiKey || ""}`,
    },
    body: JSON.stringify({
      to: formattedNumber,
      message: input.message,
      type: "text",
    }),
  })

  return response.json()
}
