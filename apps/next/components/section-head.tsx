import type { ReactNode } from 'react'
import { Reveal } from './reveal'

export function SectionHead({
  eyebrow,
  title,
  titleAccent,
  subtitle,
}: {
  eyebrow: string
  title: string
  titleAccent?: string
  subtitle?: string
}) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title}{' '}
        {titleAccent && <span className="gradient-text">{titleAccent}</span>}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  )
}

export function Section({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <section id={id} className="section">
      <div className="container">{children}</div>
    </section>
  )
}
