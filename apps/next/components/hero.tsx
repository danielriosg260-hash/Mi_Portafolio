'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  MapPin,
  Code2,
  Rocket,
  ArrowDownRight,
  Route,
  Mail,
} from 'lucide-react'
import { PROFILE, CONTACT, MARQUEE_TECH } from 'app/data/portfolio'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <div className="hero-canvas" aria-hidden />,
})

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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
            {PROFILE.role}
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
            style={{ fontSize: 14, letterSpacing: '0.08em', color: '#67e8f9' }}
          >
            {PROFILE.subtitle}
          </motion.p>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
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
            <button className="btn btn-ghost" onClick={() => scrollTo('experiencia')}>
              <Route size={17} /> Conocer mi trayectoria
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contacto')}>
              <Mail size={17} /> Contactarme
            </button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            <span>
              <MapPin size={15} color="#22d3ee" /> {PROFILE.location}
            </span>
            <span>
              <Code2 size={15} color="#a855f7" /> Desarrollo Web y Mobile
            </span>
            <span>
              <Rocket size={15} color="#ec4899" /> Participando en proyectos de
              software
            </span>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.86, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          style={{
            border: '1px solid rgba(255,255,255,0.09)',
            background:
              'radial-gradient(circle at 50% 45%, rgba(34,211,238,0.12), rgba(4,5,10,0.9) 70%)',
            boxShadow:
              '0 40px 120px -60px rgba(34,211,238,0.9), inset 0 0 90px rgba(124,58,237,0.18)',
          }}
        >
          <HeroScene />
          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              zIndex: 2,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#67e8f9',
              padding: '7px 13px',
              borderRadius: 999,
              background: 'rgba(4,5,10,0.7)',
              border: '1px solid rgba(34,211,238,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            ● WEBGL · 3D EN TIEMPO REAL
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
    </section>
  )
}

export { CONTACT }
