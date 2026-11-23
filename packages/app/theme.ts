/**
 * Paleta compartida de la app (Next.js / Expo / Android / iOS).
 * Identidad visual: Negro obsidiana + Oro satinado/champagne + Blanco puro.
 */
export const colors = {
  bg: '#060709',
  bgSoft: '#0c0e14',
  surface: 'rgba(255,255,255,0.035)',
  surfaceHigh: 'rgba(255,255,255,0.065)',
  border: 'rgba(212,175,55,0.18)',
  borderHover: 'rgba(212,175,55,0.5)',

  // Tonos dorados
  gold: '#d4af37',
  goldLight: '#f6d585',
  goldSoft: '#e5c158',
  goldDark: '#8a6d1c',
  goldGlow: 'rgba(212,175,55,0.35)',

  // Contrastes blanco y plata
  white: '#ffffff',
  silver: '#e2e8f0',
  platinum: '#f8fafc',

  // Estados
  green: '#10b981',
  amber: '#d4af37',
  red: '#ef4444',

  text: '#f8fafc',
  textMuted: '#94a3b8',
  textDim: '#64748b',

  // Retrocompatibilidad
  cyan: '#d4af37',
  cyanSoft: '#f6d585',
  violet: '#e5c158',
  violetDeep: '#8a6d1c',
  magenta: '#f6d585',
  indigo: '#d4af37',
} as const

/** Gradientes dorados metálicos para botones y acentos */
export const gradients = {
  primary: ['#f6d585', '#b38b2d'] as const,
  gold: ['#f6d585', '#d4af37', '#8a6d1c'] as const,
  hero: ['#ffffff', '#f6d585', '#d4af37'] as const,
  dark: ['#12151f', '#060709'] as const,
  pink: ['#f6d585', '#b38b2d'] as const,
  mint: ['#ffffff', '#d4af37'] as const,
}

export const radius = {
  sm: 12,
  md: 18,
  lg: 26,
  pill: 999,
}
