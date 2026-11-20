'use client'

import { useEffect } from 'react'

/**
 * Efecto "spotlight" que sigue al cursor dentro de las tarjetas (.card).
 * Actualiza las variables CSS --mx / --my usadas en globals.css.
 */
export function CardSpotlight() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        '.card'
      ) as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
