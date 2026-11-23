'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Sparkles, X } from 'lucide-react'
import { Navbar } from '../components/navbar'
import { CardSpotlight } from '../components/card-spotlight'
import { Hero } from '../components/hero'
import {
  AboutSection,
  ExperienceSection,
} from '../components/sections/about-experience'
import { ProjectsSection } from '../components/sections/projects'
import {
  TechSection,
  EducationSection,
  SkillsSection,
} from '../components/sections/tech-education-skills'
import { ContactSection, Footer } from '../components/sections/contact'

const Page3DBackground = dynamic(
  () => import('../components/page-3d-background').then((m) => m.Page3DBackground),
  { ssr: false }
)

export default function Page() {
  const [is3DActive, setIs3DActive] = useState(false)

  // Aplicar / quitar clase .mode-3d al body para los estilos globales
  useEffect(() => {
    if (is3DActive) {
      document.body.classList.add('mode-3d')
    } else {
      document.body.classList.remove('mode-3d')
    }
  }, [is3DActive])

  // Salir del modo 3D con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && is3DActive) setIs3DActive(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [is3DActive])

  const toggle3D = () => setIs3DActive((v) => !v)

  return (
    <>
      {/* Spotlight de cursor sobre tarjetas (modo normal) */}
      {!is3DActive && <CardSpotlight />}

      {/* Fondo 3D de página completa — se monta sólo cuando el modo 3D está activo */}
      {is3DActive && <Page3DBackground />}

      {/* Navbar con soporte para ambos modos */}
      <Navbar is3DActive={is3DActive} onToggle3D={toggle3D} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero is3DActive={is3DActive} onToggle3D={toggle3D} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* ─── Botón flotante persistente en la esquina inferior derecha ─── */}
      <button
        onClick={toggle3D}
        aria-label={is3DActive ? 'Desactivar modo 3D' : 'Activar modo 3D'}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 20px',
          borderRadius: 999,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 13.5,
          letterSpacing: '0.02em',
          cursor: 'pointer',
          border: is3DActive
            ? '1px solid rgba(246,213,133,0.9)'
            : '1px solid rgba(246,213,133,0.65)',
          background: is3DActive
            ? 'linear-gradient(135deg, #f6d585 0%, #d4af37 100%)'
            : 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(246,213,133,0.32) 100%)',
          color: is3DActive ? '#060709' : '#f6d585',
          boxShadow: is3DActive
            ? '0 0 32px 4px rgba(212,175,55,0.75), 0 8px 24px rgba(0,0,0,0.6)'
            : '0 0 22px -2px rgba(212,175,55,0.5), 0 6px 18px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transition:
            'background 0.35s, color 0.35s, box-shadow 0.35s, border-color 0.35s, transform 0.25s',
          animation: is3DActive ? 'none' : 'pulse-border 3s ease-in-out infinite',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.04)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'none'
        }}
      >
        {is3DActive ? (
          <>
            <X size={15} /> Modo 3D · Desactivar
          </>
        ) : (
          <>
            <Sparkles size={15} /> Mirar en 3D ✨
          </>
        )}
      </button>
    </>
  )
}
