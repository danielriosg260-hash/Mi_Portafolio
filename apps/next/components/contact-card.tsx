'use client'

import { useState } from 'react'
import { Mail, Send, WhatsappIcon, LinkedinIcon, GithubIcon } from 'lucide-react'
import { CONTACT, PROFILE } from 'app/data/portfolio'

/**
 * Componente de recuadro de contacto con diseño consistente al portafolio.
 * Colores: dorado (#d4af37, #f6d585) sobre fondos oscuros (#060709).
 * Mantiene todos los enlaces directos + agrega un diseño unificado.
 */
export function ContactCard() {
  const [showForm, setShowForm] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  return (
    <div className="max-w-2xl mx-auto">
      {/* Título principal */}
      <div className="text-center mb-12">
        <h2 className="section-title gradient-text text-glow mb-4">
          ¿Trabajamos <span className="text-primary-400">juntos</span>?
        </h2>
        <p className="section-subtitle" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          Estoy abierto a oportunidades profesionales, proyectos de desarrollo,
          colaboraciones y nuevos retos tecnológicos. Si tienes una propuesta,
          un proyecto o deseas conocer más sobre mi trabajo, conversemos.
        </p>
      </div>

      {/* Tarjeta de contacto unificada */}
      <div
        className={`contact-card-wrapper rounded-2xl border ${showForm ? 'border-primary-500' : 'border-gray-600'} transition-colors duration-300`}
        style={{
          background: 'rgba(6, 7, 12, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 25px 60px -20px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(212, 175, 55, 0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Header de la tarjeta */}
        <div className="flex items-center justify-between px-6 py-5 border-b ${showForm ? 'border-primary-500/30' : 'border-gray-600/30'}" style={{ background: 'rgba(9, 11, 18, 0.5)' }}>
          <div className="flex items-center gap-3">
            <Mail size={24} className="text-primary-400" />
            <span className="text-lg font-medium text-white">
              {PROFILE.shortName}
            </span>
          </div>
          <button
            onClick={() => setShowForm(false)}
            className="p-2 rounded-lg hover:bg-primary-500/20 transition-colors"
            aria-label="Cerrar formulario"
          >
            <Send size={18} className="text-primary-400" />
          </button>
        </div>

        {/* Contenido: formulario O enlaces */}
        {showForm ? (
          <form
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault()
              setFormStatus('idle')
              const formData = new FormData(e.target as HTMLFormElement)
              try {
                const response = await fetch('https://formspree.io/f/your-form-endpoint', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                  }),
                })
                if (response.ok) {
                  setFormStatus('success')
                  setTimeout(() => setShowForm(false), 3000)
                } else {
                  setFormStatus('error')
                }
              } catch {
                setFormStatus('error')
              }
            }}
          >
            {/* Campos del formulario */}
            <div className="grid grid-cols-1 gap-4 px-6 py-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-800 text-white placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Tu mensaje..."
                ></textarea>
              </div>
            </div>

            {/* Botón de enviar */}
            <div className="px-6 py-3 flex items-center justify-end">
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`px-6 py-3 bg-primary-600 text-white rounded-md font-medium text-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${formStatus === 'sending' ? 'opacity-70 not-allowed' : ''}`}
              >
                {formStatus === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>

            {/* Estado del formulario */}
            {formStatus === 'success' && (
              <p className="text-center text-sm text-primary-400 mt-2">
                ✅ Mensaje enviado. ¡Gracias!
              </p>
            )}

            {formStatus === 'error' && (
              <p className="text-center text-sm text-red-400 mt-2">
                ❌ Error al enviar. Intenta de nuevo o usa los enlaces abajo.
              </p>
            )}
          </form>
        ) : (
          // vista con enlaces directos
          <div className="px-6 py-6">
            {/* Enlaces de contacto unificados */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 rounded-lg px-4 py-3 border transition-colors hover:bg-primary-500/20"
              >
                <Mail size={18} className="text-primary-400" />
                <span>
                  <b className="text-white">Correo electrónico</b>
                  <br />
                  <small className="text-gray-400">${CONTACT.email}</small>
                </span>
              </a>

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 border transition-colors hover:bg-primary-500/20"
              >
                <WhatsappIcon size={18} className="text-primary-400" />
                <span>
                  <b className="text-white">WhatsApp</b>
                  <br />
                  <small className="text-gray-400">${CONTACT.whatsappLabel}</small>
                </span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 border transition-colors hover:bg-gray-700/50"
              >
                <GithubIcon size={18} className="text-white" />
                <span>
                  <b className="text-white">GitHub</b>
                  <br />
                  <small className="text-gray-400">danielriosg260-hash</small>
                </span>
              </a>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 border transition-colors hover:bg-primary-500/20"
              >
                <LinkedinIcon size={18} className="text-primary-400" />
                <span>
                  <b className="text-white">LinkedIn</b>
                  <br />
                  <small className="text-gray-400">daniel-ríos-267585325</small>
                </span>
              </a>
            </div>

            {/* Llamada a acción */}
            <p className="text-center text-sm text-gray-400 mt-6">
              ¿Prefieres escribirme directo? Usa cualquiera de los canales de arriba.<br />
              O llena el formulario si prefieres quedarte en el sitio.
            </p>
          </div>
        )}
      </div>

      {/* Botón para alternar entre formulario y enlaces */}
      {showForm || true && (
        <div className="text-center mt-6">
          {showForm ? (
            <p className="text-sm text-gray-400">
              Formulario enviado. Revisa tu email o usa los enlaces directos.
            </p>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium text-sm transition-colors hover:bg-primary-500"
            >
              <Send size={14} /> Contactarme por formulario
            </button>
          )}
        </div>
      )}
    </div>
  )
}