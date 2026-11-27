'use client'

import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { PROFILE } from 'app/data/portfolio'

interface NavbarProps {
  is3DActive?: boolean
  onToggle3D?: () => void
  /** @deprecated usa onToggle3D */
  onOpen3D?: () => void
}

export function Navbar({ is3DActive = false, onToggle3D, onOpen3D }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'tecnologias', label: 'Tecnologías' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'formacion', label: 'Formación' },
  ]

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setProgress(h > 0 ? (y / h) * 100 : 0)
    }
    const handleScroll = () => {
      setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <button
          className="logo"
          onClick={goTop}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          aria-label="Ir al inicio"
        >
          <span className="logo-mark">{PROFILE.initials}</span>
          <span>
            {PROFILE.shortName}{' '}
            <span className="gradient-text">Ríos</span>
          </span>
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Enlaces del menú - solo en desktop */}
          {!isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  style={{
                    color: '#d4d4d4',
                    fontSize: '14px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#facc15'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#d4d4d4'
                  }}
                >
                  {section.label}
                </a>
              ))}
            </div>
          )}

          {/* Botón Hablemos */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="#contacto"
              style={{
                padding: '9px 22px',
                fontSize: 13.5,
                color: '#f6d585',
              }}
            >
              Hablemos
            </a>
          </div>
        </div>

        {/* Botón hamburguesa para móvil */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(6, 7, 12, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              color: '#d4d4d4',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Panel mobile menu - solo en cliente */}
        {isMobile && menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              left: 0,
              right: 0,
              background: 'rgba(6, 7, 12, 0.95)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '20px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ color: '#d4d4d4', fontWeight: 500, fontSize: '14px' }}>Menú</span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  style={{
                    color: '#d4d4d4',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#facc15'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#d4d4d4'
                  }}
                >
                  {section.label}
                </a>
              ))}
              <a
                href="#contacto"
                style={{
                  color: '#f6d585',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                Hablemos
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}