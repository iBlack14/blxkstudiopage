"use client"

import * as React from "react"
import { useState } from "react"
import { X, Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, Sparkles } from "lucide-react"

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICE_OPTIONS = [
  { value: "", label: "¿Qué necesitas?" },
  { value: "web", label: "🌐  Página Web Profesional" },
  { value: "ecommerce", label: "🛒  Tienda Virtual / E-commerce" },
  { value: "lms", label: "📚  Plataforma Educativa (LMS)" },
  { value: "automation", label: "⚙️  Automatización con IA / n8n" },
  { value: "homers", label: "🍔  Sistema Homers (Restaurantes)" },
  { value: "tas", label: "🚚  Sistema TAS (Logística)" },
  { value: "rebrotal", label: "📦  Rebrotal (Micro Delivery)" },
  { value: "marketing", label: "📈  Marketing Digital" },
  { value: "hosting", label: "🔐  Hosting & Infraestructura" },
  { value: "wordpress", label: "🔌  WordPress Avanzado / Plugin" },
  { value: "other", label: "💡  Otro / Consulta general" },
]

export function ProjectFormModal({ isOpen, onClose }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showSuccess, setShowSuccess] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; tx: number; ty: number }>>([])

  const generateParticles = () => {
    const pts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      tx: (Math.random() - 0.5) * 300,
      ty: (Math.random() - 0.5) * 300 - 60,
    }))
    setParticles(pts)
    setTimeout(() => setParticles([]), 2800)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitStatus("success")
        setShowSuccess(true)
        generateParticles()
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })
        setTimeout(() => {
          setShowSuccess(false)
          onClose()
          setSubmitStatus("idle")
        }, 3800)
      } else {
        setSubmitStatus("error")
      }
    } catch (err) {
      console.error("[blxk] form error:", err)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes planeFly {
          0%   { transform: translate(-110vw, 40vh) rotate(-40deg) scale(0.4); opacity:0 }
          18%  { opacity:1 }
          50%  { transform: translate(0,0) rotate(0deg) scale(1.1); opacity:1 }
          82%  { opacity:1 }
          100% { transform: translate(110vw,-40vh) rotate(40deg) scale(0.4); opacity:0 }
        }
        @keyframes neonPulse {
          0%,100% { text-shadow: 0 0 12px #4dffc3cc, 0 0 28px #4dffc388, 0 0 50px #4dffc355; transform:scale(1) }
          50%      { text-shadow: 0 0 20px #4dffc3ff, 0 0 40px #4dffc3cc, 0 0 70px #4dffc388; transform:scale(1.04) }
        }
        @keyframes particleBurst {
          0%   { transform: translate(0,0) scale(1); opacity:1 }
          100% { transform: translate(var(--ptx), var(--pty)) scale(0); opacity:0 }
        }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
        .blxk-input {
          width:100%;
          height:44px;
          padding:0 14px;
          border-radius:10px;
          border:1.5px solid rgba(77,255,195,0.22);
          background:rgba(255,255,255,0.04);
          color:#e2e8f0;
          font-size:14px;
          outline:none;
          transition:border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing:border-box;
        }
        .blxk-input::placeholder { color:rgba(148,163,184,0.5) }
        .blxk-input:focus {
          border-color:rgba(77,255,195,0.7);
          background:rgba(77,255,195,0.06);
          box-shadow:0 0 0 3px rgba(77,255,195,0.12), 0 0 16px rgba(77,255,195,0.18);
        }
        .blxk-input option { background:#101828; color:#e2e8f0 }
        .blxk-textarea {
          width:100%;
          min-height:110px;
          padding:12px 14px;
          border-radius:10px;
          border:1.5px solid rgba(77,255,195,0.22);
          background:rgba(255,255,255,0.04);
          color:#e2e8f0;
          font-size:14px;
          outline:none;
          resize:none;
          transition:border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing:border-box;
          font-family:inherit;
          line-height:1.55;
        }
        .blxk-textarea::placeholder { color:rgba(148,163,184,0.5) }
        .blxk-textarea:focus {
          border-color:rgba(77,255,195,0.7);
          background:rgba(77,255,195,0.06);
          box-shadow:0 0 0 3px rgba(77,255,195,0.12), 0 0 16px rgba(77,255,195,0.18);
        }
        .blxk-label {
          display:block;
          font-size:12px;
          font-weight:600;
          color:rgba(148,163,184,0.9);
          margin-bottom:7px;
          letter-spacing:0.04em;
          text-transform:uppercase;
        }
        .blxk-submit {
          width:100%;
          height:52px;
          border:none;
          border-radius:12px;
          font-size:15px;
          font-weight:700;
          letter-spacing:0.06em;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          background:linear-gradient(135deg, #4dffc3 0%, #22d3ee 60%, #818cf8 100%);
          color:#0a1628;
          box-shadow:0 0 0 0 rgba(77,255,195,0);
          transition:transform 0.18s, box-shadow 0.18s, filter 0.18s;
          position:relative;
          overflow:hidden;
        }
        .blxk-submit::before {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%);
          border-radius:12px;
        }
        .blxk-submit:hover:not(:disabled) {
          transform:translateY(-2px) scale(1.01);
          box-shadow:0 8px 32px rgba(77,255,195,0.45), 0 0 60px rgba(77,255,195,0.18);
          filter:brightness(1.08);
        }
        .blxk-submit:active:not(:disabled) { transform:scale(0.97) }
        .blxk-submit:disabled { opacity:0.65; cursor:not-allowed }
        .blxk-close {
          position:absolute;
          top:16px; right:16px;
          width:34px; height:34px;
          border:1.5px solid rgba(77,255,195,0.2);
          background:rgba(77,255,195,0.06);
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          transition:background 0.2s, border-color 0.2s, transform 0.2s;
          z-index:10;
        }
        .blxk-close:hover {
          background:rgba(77,255,195,0.18);
          border-color:rgba(77,255,195,0.6);
          transform:rotate(90deg);
        }
        .select-wrapper { position:relative }
        .select-arrow {
          position:absolute;
          right:13px; top:50%;
          transform:translateY(-50%);
          pointer-events:none;
          color:rgba(77,255,195,0.6);
        }
        select.blxk-input { appearance:none; -webkit-appearance:none; padding-right:38px; cursor:pointer }
      `}</style>

      {/* Success overlay */}
      {showSuccess && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            overflow: "hidden",
            gap: 24,
          }}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(77,255,195,0.18) 0%, transparent 70%)",
            animation: "fadeIn 0.5s ease",
          }} />

          {/* Plane */}
          <svg
            style={{
              width: 80,
              height: 80,
              color: "#4dffc3",
              filter: "drop-shadow(0 0 12px #4dffc3cc) drop-shadow(0 0 28px #4dffc388)",
              animation: "planeFly 2.8s ease-in-out",
              position: "relative",
              zIndex: 2,
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>

          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4dffc3",
                boxShadow: "0 0 8px #4dffc3",
                animation: "particleBurst 2.4s ease-out forwards",
                // @ts-ignore
                "--ptx": `${p.tx}px`,
                "--pty": `${p.ty}px`,
              } as React.CSSProperties}
            />
          ))}

          <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: 8 }}>
            <h3 style={{
              fontSize: "clamp(2.5rem,8vw,4.5rem)",
              fontWeight: 900,
              letterSpacing: "0.15em",
              color: "#4dffc3",
              margin: 0,
              animation: "neonPulse 1.4s ease-in-out infinite",
            }}>
              ¡ENVIADO!
            </h3>
            <p style={{
              color: "rgba(77,255,195,0.75)",
              fontSize: 16,
              marginTop: 12,
              fontWeight: 500,
              animation: "fadeSlide 0.6s ease 0.4s both",
            }}>
              Te contactamos muy pronto 🚀
            </p>
          </div>
        </div>
      )}

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 20,
          background: "linear-gradient(160deg, #0d1b2a 0%, #0a1628 60%, #0c1f35 100%)",
          border: "1.5px solid rgba(77,255,195,0.2)",
          boxShadow: "0 0 0 1px rgba(77,255,195,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(77,255,195,0.08)",
          padding: "36px 32px 28px",
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          scrollbarWidth: "none",
        }}
      >
        {/* Top glow bar */}
        <div style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #4dffc3, #22d3ee, transparent)",
          borderRadius: "0 0 4px 4px",
          opacity: 0.7,
        }} />

        {/* Close */}
        <button className="blxk-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} color="#94a3b8" />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(77,255,195,0.1)",
            border: "1px solid rgba(77,255,195,0.25)",
            borderRadius: 999,
            padding: "4px 14px",
            marginBottom: 14,
          }}>
            <Sparkles size={13} color="#4dffc3" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#4dffc3", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              BLXK Studio
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(1.6rem,4vw,2.2rem)",
            fontWeight: 800,
            margin: 0,
            background: "linear-gradient(135deg,#e2e8f0 0%,#94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}>
            Iniciar Proyecto
          </h2>
          <p style={{ color: "rgba(148,163,184,0.7)", fontSize: 13.5, marginTop: 8, lineHeight: 1.5 }}>
            Cuéntanos tu idea · Te respondemos en menos de 24 h
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(77,255,195,0.2), transparent)",
          marginBottom: 24,
        }} />

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Row 1 : Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label className="blxk-label">Nombre *</label>
              <input
                className="blxk-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="blxk-label">Email *</label>
              <input
                className="blxk-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@empresa.com"
              />
            </div>
          </div>

          {/* Row 2 : Phone + Company */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label className="blxk-label">WhatsApp</label>
              <input
                className="blxk-input"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+51 999 999 999"
              />
            </div>
            <div>
              <label className="blxk-label">Empresa</label>
              <input
                className="blxk-input"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Mi Empresa S.A.C."
              />
            </div>
          </div>

          {/* Service select */}
          <div>
            <label className="blxk-label">Tipo de servicio *</label>
            <div className="select-wrapper">
              <select
                className="blxk-input"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-arrow" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="blxk-label">Tu proyecto *</label>
            <textarea
              className="blxk-textarea"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe brevemente tu proyecto, objetivos, plazos y presupuesto aproximado..."
            />
          </div>

          {/* Status messages */}
          {submitStatus === "success" && !showSuccess && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(34,197,94,0.08)",
              border: "1.5px solid rgba(34,197,94,0.3)",
              animation: "fadeSlide 0.3s ease",
            }}>
              <CheckCircle2 size={19} color="#4ade80" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <p style={{ color: "#4ade80", fontWeight: 700, fontSize: 14, margin: 0 }}>¡Mensaje enviado con éxito!</p>
                <p style={{ color: "rgba(74,222,128,0.75)", fontSize: 12.5, marginTop: 3, lineHeight: 1.5 }}>
                  Nuestro equipo te contactará en menos de 24 horas. Revisa tu bandeja de entrada.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(239,68,68,0.08)",
              border: "1.5px solid rgba(239,68,68,0.3)",
              animation: "fadeSlide 0.3s ease",
            }}>
              <AlertCircle size={19} color="#f87171" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <p style={{ color: "#f87171", fontWeight: 700, fontSize: 14, margin: 0 }}>Error al enviar</p>
                <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 12.5, marginTop: 3, lineHeight: 1.5 }}>
                  Intenta nuevamente o escríbenos a{" "}
                  <a href="mailto:admin@blxkstudio.com" style={{ color: "#f87171", textDecorationLine: "underline" }}>
                    admin@blxkstudio.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="blxk-submit">
            {isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Enviando...
              </>
            ) : (
              <>
                <Send size={17} />
                Enviar Solicitud
              </>
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(148,163,184,0.4)", marginTop: -4 }}>
            Al enviar aceptas que nos pongamos en contacto contigo.
          </p>
        </form>
      </div>
    </div>
  )
}
