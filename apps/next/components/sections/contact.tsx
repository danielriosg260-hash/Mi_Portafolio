'use client'

import { Mail, MessageCircle, Send, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons'
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
    label: 'WhatsApp',
    value: CONTACT.whatsappLabel,
    href: CONTACT.whatsapp,
    Icon: MessageCircle,
  },
]

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
            Estoy abierto a nuevas oportunidades, colaboraciones y proyectos
            tecnológicos. Si tienes una idea, un proyecto o simplemente quieres
            conectar, estaré encantado de conversar.
          </p>

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
            <MessageCircle size={17} />
          </a>
          <button className="icon-btn" onClick={toTop} aria-label="Volver arriba">
            <ArrowUp size={17} />
          </button>
        </div>

        <div>© {new Date().getFullYear()} · Hecho con React, Next.js & Three.js</div>
      </div>
    </footer>
  )
}
