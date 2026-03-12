type EnvOptions = {
  optional?: boolean
}

function readEnv(name: string): string
function readEnv(name: string, options: { optional: true }): string | undefined
function readEnv(name: string, options: EnvOptions = {}): string | undefined {
  const value = process.env[name]?.trim()
  if (value) {
    return value
  }

  if (options.optional) {
    return undefined
  }

  throw new Error(`Missing required environment variable: ${name}`)
}

export const env = {
  openAiApiKey: () => readEnv("OPENAI_API_KEY"),
  resendApiKey: () => readEnv("RESEND_API_KEY"),
  n8nWebhookUrl: () => readEnv("N8N_WEBHOOK_URL"),
  baileysServerUrl: () => readEnv("BAILEYS_SERVER_URL", { optional: true }) || "http://localhost:3001",
  baileysApiKey: () => readEnv("BAILEYS_API_KEY", { optional: true }),
  publicAppUrl: () => readEnv("NEXT_PUBLIC_APP_URL", { optional: true }) || "http://localhost:3000",
  adminEmail: () => readEnv("ADMIN_EMAIL", { optional: true }) || "admin@blxkstudio.com",
}

export function hasEnv(name: keyof typeof process.env) {
  return Boolean(process.env[name]?.trim())
}
