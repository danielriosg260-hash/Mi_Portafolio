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
 */
export function ContactForm({ onSuccess, onError }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent, data: {
    name: string
    email: string
    message: string
  }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const form = e.currentTarget
      const response = await fetch('https://formspree.io/f/mwlojkaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        if (onSuccess) onSuccess()
        ;(e.currentTarget as HTMLFormElement).reset()
      } else {
        const errorData = await response.json()
        const errorMsg = errorData.error || 'Error al enviar el formulario'
        setStatus('error')
        if (onError) onError(errorMsg)
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Intenta de nuevo.'
      setStatus('error')
      if (onError) onError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e, {
        name: (e.currentTarget.querySelector('input[name="name"]') as HTMLInputElement)?.value || '',
        email: (e.currentTarget.querySelector('input[name="email"]') as HTMLInputElement)?.value || '',
        message: (e.currentTarget.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value || '',
      })}
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

      {/* Mensajes de estado */}
      {status === 'success' && (
        <p style={{ textAlign: 'left', marginTop: '12px', color: '#d4d4d4' }}>✅ Tu mensaje ha sido enviado. ¡Gracias!</p>
      )}

      {status === 'error' && (
        <p style={{ textAlign: 'left', marginTop: '12px', color: '#f87171' }}>❌ Hubo un error. Intenta de nuevo o usa los enlaces directos.</p>
      )}
    </form>
  )
}