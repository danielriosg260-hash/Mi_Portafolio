'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  MapPin,
  Code2,
  Rocket,
  ArrowDownRight,
  Mail,
  Sparkles,
  X,
} from 'lucide-react'
import { PROFILE, CONTACT, MARQUEE_TECH } from 'app/data/portfolio'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <div className="hero-canvas" aria-hidden />,
})

const ease = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  is3DActive?: boolean
  onToggle3D?: () => void
  /** @deprecated usa onToggle3D */
  onOpen3D?: () => void
}

export function Hero({ is3DActive = false, onToggle3D, onOpen3D }: HeroProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleToggle = onToggle3D ?? onOpen3D

  return (
    <section id="inicio" className="hero">
      <div className="hero-inner">
        <div>
          <motion.span
            className="hero-tag"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {PROFILE.status}
          </motion.span>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
          >
            Daniel <span className="gradient-text text-glow">Ríos</span>
            <br />
            Giraldo
          </motion.h1>

          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            {PROFILE.tagline}
          </motion.h2>

          <motion.p
            className="section-subtitle mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            style={{ fontSize: 14, letterSpacing: '0.08em', color: '#f6d585' }}
          >
            {PROFILE.subtitle}
          </motion.p>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            style={{ fontSize: 14, letterSpacing: '0.08em', color: '#f6d585' }}
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <button className="btn btn-primary" onClick={() => scrollTo('proyectos')}>
              Explorar proyectos <ArrowDownRight size={18} />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contacto')}>
              <Mail size={17} /> Contactarme
            </button>
          </motion.div>

          {/* Vista previa 3D en el Hero — el badge cambia según el estado */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.88, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            style={{ cursor: 'pointer' }}
          >
            <HeroScene />
            <div
              style={{
                position: 'absolute',
                left: 14,
                bottom: 14,
                right: 14,
                zIndex: 2,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                color: '#f6d585',
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(6, 7, 12, 0.82)',
                border: '1px solid rgba(212, 175, 55, 0.55)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              <span>●</span>
            </div>
          </motion.div>
        </div>

        <div className="marquee" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div className="marquee-track">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
              <span className="marquee-item" key={`${t}-${i}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { CONTACT }