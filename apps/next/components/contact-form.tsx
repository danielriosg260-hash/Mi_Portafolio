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
      const response = await fetch('https://formspree.io/f/your-form-endpoint', {
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
      className="space-y-4"
    >
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="contact-name">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="contact-name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors sm:text-sm"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="contact-email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="contact-email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors sm:text-sm"
          placeholder="tu@email.com"
        />
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="contact-message">
          Mensaje
        </label>
        <textarea
          name="message"
          id="contact-message"
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y sm:text-sm"
          placeholder="Tu mensaje..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-3 bg-primary-600 text-white rounded-md font-medium text-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? 'opacity-70' : ''}`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Mensajes de estado */}
      {status === 'success' && (
        <p className="text-sm text-primary-400">✅ Tu mensaje ha sido enviado. ¡Gracias!</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-400">❌ Hubo un error. Intenta de nuevo o usa los enlaces directos.</p>
      )}
    </form>
  )
}