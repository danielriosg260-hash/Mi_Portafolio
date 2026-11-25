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

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setProgress(h > 0 ? (y / h) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleToggle = onToggle3D ?? onOpen3D

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

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            className="btn btn-primary"
            href="#contacto"
            style={{ padding: '9px 22px', fontSize: 13.5 }}
          >
            Hablemos
          </a>
        </div>
      </div>
    </header>
  )
}