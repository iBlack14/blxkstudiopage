# Integracion BLXK Chatbot con n8n

## Descripcion
BLXK expone dos rutas para integracion con n8n:
- `/api/n8n-webhook`: relay generico desde la web
- `/api/chatbot-webhook`: relay de eventos externos tipo WhatsApp/Baileys/N8N

## Configuracion

### 1. Crear un Webhook en n8n
1. Abre tu instancia de n8n.
2. Crea un workflow nuevo.
3. Agrega un nodo `Webhook` como trigger.
4. Configura el metodo `POST`.
5. Copia la URL del webhook.

### 2. Variables de entorno
Configura al menos:

```env
N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/blxk-chatbot
```

Variables relacionadas segun el flujo:

```env
OPENAI_API_KEY=...
RESEND_API_KEY=...
BAILEYS_SERVER_URL=http://localhost:3001
BAILEYS_API_KEY=...
NEXT_PUBLIC_APP_URL=https://blxkstudio.com
ADMIN_EMAIL=admin@blxkstudio.com
```

## Payloads esperados

### `/api/n8n-webhook`

```json
{
  "message": "Mensaje del usuario",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Mensaje anterior"
    },
    {
      "role": "assistant",
      "content": "Respuesta anterior"
    }
  ],
  "action": "chat|email|ticket|custom"
}
```

### `/api/chatbot-webhook`

```json
{
  "event": "user_message",
  "userId": "51999999999",
  "conversationId": "conv-123",
  "message": "Hola, necesito ayuda",
  "timestamp": "2026-03-12T18:30:00Z",
  "botActive": true,
  "ownerName": "Alonso",
  "from": "51999999999@s.whatsapp.net",
  "type": "message"
}
```

## Respuesta esperada
n8n debe responder JSON valido. El backend acepta cualquiera de estas formas:

```json
{
  "success": true,
  "response": "Respuesta del chatbot"
}
```

```json
{
  "success": true,
  "data": {
    "response": "Respuesta del chatbot"
  }
}
```

## Troubleshooting
- `400`: payload invalido o `N8N_WEBHOOK_URL` ausente.
- `502`: n8n respondio con error.
- `500`: fallo al parsear o procesar la solicitud en el backend.
- Sin respuesta: verifica que n8n retorne JSON valido y con `success: true`.
