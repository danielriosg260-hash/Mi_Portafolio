'use client'

import { Mail, Send, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../icons'
import { CONTACT, PROFILE } from 'app/data/portfolio'
import { Reveal } from '../reveal'
import { Section, SectionHead } from '../section-head'

const links = [
  {
    key: 'email',
    label: 'Correo electrónico',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    Icon: Mail,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: CONTACT.githubLabel,
    href: CONTACT.github,
    Icon: GithubIcon,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: CONTACT.linkedinLabel,
    href: CONTACT.linkedin,
    Icon: LinkedinIcon,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp / Teléfono',
    value: CONTACT.whatsappLabel,
    href: CONTACT.whatsapp,
    Icon: WhatsappIcon,
  },
]

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="logo-mark">{PROFILE.initials}</span>
          <div>
            <b style={{ color: '#eaf1ff' }}>{PROFILE.name}</b>
            <div style={{ fontSize: 13 }}>
              {PROFILE.role} · {PROFILE.location}
            </div>
          </div>
        </div>

        <div className="footer-socials">
          <a className="icon-btn" href={`mailto:${CONTACT.email}`} aria-label="Correo">
            <Mail size={17} />
          </a>
          <a className="icon-btn" href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={17} />
          </a>
          <a className="icon-btn" href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={17} />
          </a>
          <a className="icon-btn" href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsappIcon size={17} />
          </a>
          <button className="icon-btn" onClick={toTop} aria-label="Volver arriba">
            <ArrowUp size={17} />
          </button>
        </div>

        <div style={{ textAlign: 'right', fontSize: 13, color: '#6b7a99' }}>
          <div>Desarrollando ideas, aprendiendo tecnologías y construyendo soluciones digitales.</div>
          <div style={{ marginTop: 4 }}>© {new Date().getFullYear()} {PROFILE.name}. Todos los derechos reservados.</div>
        </div>
      </div>
    </footer>
  )
}

export function ContactSection() {
  return (
    <Section id="contacto">
      <div className="contact-shell">
        <Reveal>
          <span className="eyebrow">Contacto</span>
          <h2
            className="section-title"
            style={{ marginTop: 22, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}
          >
            ¿Trabajamos <span className="gradient-text text-glow">juntos</span>?
          </h2>
          <p
            className="section-subtitle"
            style={{ margin: '0 auto', textAlign: 'center' }}
          >
            Estoy abierto a oportunidades profesionales, proyectos de desarrollo,
            colaboraciones y nuevos retos tecnológicos que me permitan continuar
            creciendo como desarrollador de software. Si tienes una propuesta, un
            proyecto o deseas conocer más sobre mi trabajo, conversemos.
          </p>

          {/* Formulario de contacto - debajo de "Trabajemos juntos" */}
          <form
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault()
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
                  alert('¡Mensaje enviado!')
                } else {
                  alert('Error al enviar')
                }
              } catch {
                alert('Error de conexión')
              }
            }}
          >
            <div className="max-w-xl mx-auto rounded-2xl border border-white/10 p-8 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Nombre</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-black/40 rounded-xl border border-white/15 transition-colors placeholder:text-gray-300 placeholder:opacity-60 focus:border-amber-400/70 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/40 rounded-xl border border-white/15 transition-colors placeholder:text-gray-300 placeholder:opacity-60 focus:border-amber-400/70 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Mensaje</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-black/40 rounded-xl border border-white/15 transition-colors resize-y placeholder:text-gray-300 placeholder:opacity-60 focus:border-amber-400/70 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
                  placeholder="Tu mensaje..."
                ></textarea>
              </div>

              {/* Botón de envío */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-amber-500/10 border border-amber-500/30 rounded-md px-8 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar mensaje
                </button>
              </div>
            </div>
          </form>

          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 32,
            }}
          >
            <a className="btn btn-primary" href={`mailto:${CONTACT.email}`}>
              <Send size={17} /> Enviar correo
            </a>
            <a className="btn btn-ghost" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
              <WhatsappIcon size={17} /> WhatsApp
            </a>
            <a className="btn btn-ghost" href={CONTACT.github} target="_blank" rel="noreferrer">
              <GithubIcon size={17} /> Ver GitHub
            </a>
            <a className="btn btn-ghost" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={17} /> Conectar en LinkedIn
            </a>
          </div>

          <div className="contact-links">
            {links.map(({ key, label, value, href, Icon }) => (
              <a
                key={key}
                className="contact-card"
                href={href}
                target={key === 'email' ? undefined : '_blank'}
                rel="noreferrer"
              >
                <span className="contact-icon">
                  <Icon size={21} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <b>{label}</b>
                  <small>{value}</small>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}