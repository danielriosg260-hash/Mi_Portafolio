/**
 * Paleta compartida de la app móvil (Expo / Android / iOS).
 * Misma identidad visual que la web: neón cian + violeta.
 */
export const colors = {
  bg: '#04050a',
  bgSoft: '#080b14',
  surface: 'rgba(255,255,255,0.05)',
  surfaceHigh: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.10)',

  cyan: '#22d3ee',
  cyanSoft: '#67e8f9',
  violet: '#a855f7',
  violetDeep: '#7c3aed',
  magenta: '#ec4899',
  indigo: '#6366f1',
  green: '#34d399',
  amber: '#fbbf24',

  text: '#eaf1ff',
  textMuted: '#9aa8c4',
  textDim: '#6b7a99',
}

/** Gradientes usados por los botones ( RN no puede teñir texto con degradado ). */
colors.primaryGradient = ['#22d3ee', '#7c3aed'] as const
colors.pinkGradient = ['#a855f7', '#ec4899'] as const
colors.mintGradient = ['#34d399', '#22d3ee'] as const

export const gradients = {
  primary: ['#22d3ee', '#7c3aed'] as const,
  hero: ['#22d3ee', '#6366f1', '#a855f7'] as const,
  pink: ['#a855f7', '#ec4899'] as const,
  mint: ['#34d399', '#22d3ee'] as const,
}

export const radius = {
  sm: 12,
  md: 18,
  lg: 26,
  pill: 999,
}
