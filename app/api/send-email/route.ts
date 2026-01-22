import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

function isValidEmail(email: string | undefined): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, phone, company, message } = await request.json()

    console.log("[v0] Received form submission:", name)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "Email inválido" }, { status: 400 })
    }

    const fromEmail = "admin@blxkstudio.com"
    const adminEmails = ["alonsoyhc@gmail.com", "admin@blxkstudio.com"]

    // Send user confirmation email (New Design)
    const userEmailResult = await resend.emails.send({
      from: `BLXK STUDIO <${fromEmail}>`,
      to: email,
      subject: "Hemos recibido tu solicitud - BLXK STUDIO",
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Solicitud - BLXK STUDIO</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          
          body { margin: 0; padding: 0; font-family: 'Space Grotesk', 'Helvetica', sans-serif; background-color: #030712; color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
          .header { 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
            padding: 40px 20px; 
            text-align: center; 
            position: relative;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, #06b6d4, transparent);
            opacity: 0.3;
          }
          .logo { 
            color: #fff; 
            font-size: 32px; 
            font-weight: 800; 
            letter-spacing: -1px; 
            margin: 0;
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
          }
          .logo span { color: #06b6d4; }
          
          .content { padding: 40px 30px; }
          .greeting { 
            font-size: 24px; 
            font-weight: 700; 
            margin-bottom: 20px;
            background: linear-gradient(to right, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .text { 
            color: #94a3b8; 
            line-height: 1.8; 
            margin-bottom: 30px; 
            font-size: 16px;
          }
          
          .card { 
            background: rgba(30, 41, 59, 0.4);
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
          }
          .card-header {
            color: #06b6d4;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .card-header::after {
            content: '';
            height: 1px;
            background: linear-gradient(90deg, rgba(6, 182, 212, 0.2), transparent);
            flex: 1;
          }
          
          .info-row { 
            display: flex; 
            margin-bottom: 15px; 
            padding-bottom: 12px;
          }
          .info-row:last-child { margin-bottom: 0; padding-bottom: 0; }
          
          .label { 
            width: 100px; 
            color: #64748b; 
            font-size: 13px; 
            font-weight: 500;
          }
          .value { 
            flex: 1; 
            color: #f1f5f9; 
            font-weight: 500; 
            font-size: 14px;
          }
          
          .footer { 
            background: #020617; 
            padding: 30px; 
            text-align: center;
          }
          .social-links { margin-bottom: 20px; }
          .social-link { 
            color: #94a3b8; 
            text-decoration: none; 
            margin: 0 10px; 
            font-size: 14px;
            transition: color 0.2s;
          }
          .copyright { 
            color: #475569; 
            font-size: 12px; 
          }
          
          .btn {
            display: inline-block;
            background: #06b6d4;
            color: #fff;
            padding: 14px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">BLXK <span>STUDIO</span></h1>
          </div>
          
          <div class="content">
            <div class="greeting">Hola ${name},</div>
            <div class="text">
              Hemos recibido tu solicitud correctamente. Nuestro equipo de especialistas está analizando tu proyecto para brindarte la mejor solución tecnológica.
            </div>
            
            <div class="card">
              <div class="card-header">Resumen de solicitud</div>
              <div class="info-row">
                <div class="label">ID Ref</div>
                <div class="value">#${Math.floor(Math.random() * 10000)}</div>
              </div>
              <div class="info-row">
                <div class="label">Servicio</div>
                <div class="value">Solicitud General</div>
              </div>
              <div class="info-row">
                <div class="label">Fecha</div>
                <div class="value">${new Date().toLocaleDateString()}</div>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">Tus Datos</div>
              <div class="info-row">
                <div class="label">Empresa</div>
                <div class="value">${company || "N/A"}</div>
              </div>
              <div class="info-row">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
               ${phone ? `
              <div class="info-row">
                 <div class="label">Teléfono</div>
                 <div class="value">${phone}</div>
              </div>` : ''}
            </div>

            <div class="text" style="text-align: center; margin-top: 40px; font-size: 14px;">
              Nos pondremos en contacto contigo en las próximas 24 horas hábiles.
            </div>
            
            <div style="text-align: center;">
              <a href="https://blxkstudio.com" class="btn">Ir al Sitio Web</a>
            </div>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <a href="https://twitter.com/blxkstudio" class="social-link">Twitter</a>
              <a href="https://instagram.com/blxkstudio" class="social-link">Instagram</a>
            </div>
            <div class="copyright">
              © 2026 BLXK Studio. Innovación y Desarrollo.<br>
              Lima, Perú
            </div>
          </div>
        </div>
      </body>
    </html>
      `,
    })

    console.log("[v0] User email result:", userEmailResult)

    // Send Admin Notification (New Design) - To BOTH emails
    const adminEmailResult = await resend.emails.send({
      from: `BLXK STUDIO <${fromEmail}>`,
      to: adminEmails,
      subject: `Nueva Solicitud de Proyecto - ${name}`,
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Lead - BLXK Admin</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
          
          body { margin: 0; padding: 0; font-family: 'JetBrains Mono', monospace; background-color: #000; color: #e2e8f0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0a0a0a; }
          .header { 
            background: #000; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .badge {
            background: #d946ef;
            color: #000;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 12px;
            display: inline-block;
            margin-bottom: 10px;
          }
          .title { 
            color: #fff; 
            font-size: 24px; 
            font-weight: 700; 
            margin: 0;
          }
          
          .content { padding: 40px 30px; }
          
          .metric-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
          }
          
          .metric-card {
            background: #111;
            padding: 15px;
          }
          
          .metric-label {
            color: #666;
            font-size: 10px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          
          .metric-value {
            color: #fff;
            font-weight: 700;
          }
          
          .section-title {
            color: #d946ef;
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 15px;
            padding-bottom: 10px;
          }
          
          .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .data-table td {
            padding: 10px 0;
          }
          .data-label { color: #888; width: 30%; }
          .data-val { color: #fff; }
          .highlight { color: #d946ef; }
          
          .message-box {
            background: #111;
            border-left: 3px solid #d946ef;
            padding: 20px;
            font-size: 13px;
            line-height: 1.6;
            color: #ccc;
            margin-top: 20px;
          }
          
          .actions {
            margin-top: 30px;
            display: flex;
            gap: 10px;
          }
          
          .btn {
            display: block;
            text-align: center;
            padding: 12px;
            text-decoration: none;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            flex: 1;
            border-radius: 4px;
          }
          .btn-primary { background: #d946ef; color: #000; }
          .btn-secondary { background: #111; color: #fff; }
          
          .footer { 
            background: #000; 
            padding: 20px; 
            text-align: center; 
            font-size: 10px; 
            color: #444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">NUEVO LEAD</span>
            <h1 class="title">Solicitud de Proyecto</h1>
          </div>
          
          <div class="content">
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-label">Origen</div>
                <div class="metric-value">Formulario Web</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Prioridad</div>
                <div class="metric-value highlight">ALTA</div>
              </div>
            </div>
          
            <div class="section-title">Datos del Prospecto</div>
            
            <table class="data-table">
              <tr>
                <td class="data-label">Nombre</td>
                <td class="data-val"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="data-label">Email</td>
                <td class="data-val"><a href="mailto:${email}" style="color: #fff;">${email}</a></td>
              </tr>
              <tr>
                <td class="data-label">Empresa</td>
                <td class="data-val">${company || "N/A"}</td>
              </tr>
              <tr>
                <td class="data-label">Teléfono</td>
                <td class="data-val">${phone || "No indicado"}</td>
              </tr>
            </table>
            
            <div class="section-title" style="margin-top: 30px;">Mensaje</div>
            <div class="message-box">
              ${message}
            </div>
            
            <div class="actions">
              <a href="mailto:${email}" class="btn btn-primary">Responder</a>
              <a href="#" class="btn btn-secondary">CRM</a>
            </div>
          </div>
          
          <div class="footer">
            BLXK ADMIN SYSTEM v2.0<br>
            ${new Date().toISOString()}
          </div>
        </div>
      </body>
    </html>
      `,
    })

    return Response.json({ data: null, error: null }) as any
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return Response.json({ error: (error as any).message }, { status: 500 }) as any
  }
}
