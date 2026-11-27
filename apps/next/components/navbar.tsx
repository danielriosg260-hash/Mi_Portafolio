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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // Order matters: Formación debe ir ANTES que Habilidades
  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'tecnologias', label: 'Tecnologías' },
    { id: 'formacion', label: 'Formación' },
    { id: 'habilidades', label: 'Habilidades' },
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
      setMobileMenuOpen(false)
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
    } else if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuPanel = document.querySelector('.mobile-menu-panel')
      if (menuPanel && !menuPanel.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 17, 12, 0.9)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#facc15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* Panel desplegable siempre visible */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              minWidth: '220px',
              padding: '10px',
              borderRadius: '16px',
              backgroundColor: 'rgba(18, 15, 10, 0.96)',
              border: '1px solid rgba(245, 158, 11, 0.28)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 50,
              marginLeft: '-42px',
            }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  color: '#e5e5e5',
                  fontSize: '14px',
                  fontWeight: 500,
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(245, 158, 11, 0.12)'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#facc15'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#e5e5e5'
                }}
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  scrollToSection(section.id)
                }}
              >
                {section.label}
              </a>
            ))}

            {/* Enlace Hablemos al final */}
            <a
              href="#contacto"
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                color: '#facc15',
                fontSize: '14px',
                fontWeight: 500,
                textAlign: 'left',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginTop: 'auto',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hablemos
            </a>
          </div>
        </div>

        {/* Botón Hablemos - siempre visible a la derecha */}
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
    </header>
  )
}