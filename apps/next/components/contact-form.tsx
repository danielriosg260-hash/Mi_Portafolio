'use client'

import { useState } from 'react'

interface ContactFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

/**
 * Formulario de contacto simple.
 * Usa Formspree para enviar los mensajes a tu correo.
 * Mantiene los enlaces directos (email, WhatsApp) visibles siempre.
 * Diseño oscuro y dorado con alertas visuales personalizadas.
 */
export function ContactForm({ onSuccess, onError }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    if (isSubmitting) return
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const form = e.currentTarget as HTMLFormElement
      const response = await fetch('https://formspree.io/f/xppdewdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: (form.querySelector('input[name="name"]') as HTMLInputElement)?.value || '',
          email: (form.querySelector('input[name="email"]') as HTMLInputElement)?.value || '',
          message: (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value || '',
        }),
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => setStatus('idle'), 5000)
        if (onSuccess) onSuccess()
      } else {
        const errorData = await response.json()
        const errorMsg = errorData.error || 'Error al enviar el formulario'
        setStatus('error')
        if (onError) onError(errorMsg)
      }
    } catch (err) {
      setStatus('error')
      if (onError) onError('Error de conexión. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '560px',
        margin: '2rem auto',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'rgba(20, 17, 12, 0.92)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'left',
      }}
    >
      {/* Nombre */}
      <div>
        <label
          style={{ display: 'block', color: '#d4d4d4', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}
        >
          Nombre
        </label>
        <input
          type="text"
          name="name"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#0b0906',
            color: '#ffffff',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            outline: 'none',
          }}
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label
          style={{ display: 'block', color: '#d4d4d4', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#0b0906',
            color: '#ffffff',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            outline: 'none',
          }}
          placeholder="tu@email.com"
        />
      </div>

      {/* Mensaje */}
      <div>
        <label
          style={{ display: 'block', color: '#d4d4d4', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}
        >
          Mensaje
        </label>
        <textarea
          name="message"
          rows={4}
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#0b0906',
            color: '#ffffff',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            outline: 'none',
            resize: 'vertical',
          }}
          placeholder="Tu mensaje..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '12px 24px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
          color: '#0b0906',
          fontWeight: 600,
          fontSize: '14px',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Alerta de éxito visual - tarjeta redonda */}
      {status === 'success' && (
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(250, 204, 21, 0.45)',
            color: '#fef08a',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          <span>Mensaje enviado correctamente. ¡Gracias por escribirme!</span>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#fef08a',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onClick={() => setStatus('idle')}
          >
            ×
          </button>
        </div>
      )}

      {/* Alerta de error visual - tarjeta redonda */}
      {status === 'error' && (
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(248, 113, 113, 0.45)',
            color: '#fecaca',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          <span>No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo por WhatsApp o correo.</span>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#fecaca',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onClick={() => setStatus('idle')}
          >
            ×
          </button>
        </div>
      )}
    </form>
  )
}