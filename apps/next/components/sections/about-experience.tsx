'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Briefcase, Building2, MapPin } from 'lucide-react'
import { ABOUT, EXPERIENCE } from 'app/data/portfolio'
import { Reveal, staggerContainer, staggerItem } from '../reveal'
import { Section, SectionHead } from '../section-head'

export function AboutSection() {
  return (
    <Section id="sobre-mi">
      <SectionHead
        eyebrow="Sobre mí"
        title="Conoce mi historia,"
        titleAccent="formación y camino"
        subtitle={ABOUT.subtitle}
      />

      <div className="about-grid">
        <Reveal className="about-text">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
            <span className="chip" style={{ color: '#67e8f9', borderColor: 'rgba(34,211,238,.35)' }}>
              <MapPin size={14} /> Medellín, Colombia
            </span>
            <span className="chip chip-tech">
              <Briefcase size={14} /> Web & Móvil
            </span>
            <span className="chip" style={{ color: '#f9a8d4', borderColor: 'rgba(236,72,153,.35)' }}>
              <BadgeCheck size={14} /> Formación SENA
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="card card-pad">
          <h3
            className="skill-title"
            style={{ fontSize: 17, marginBottom: 18, color: '#fff' }}
          >
            <Building2 size={18} color="#22d3ee" /> Datos clave
          </h3>

          <motion.div
            className="facts"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {ABOUT.facts.map((f) => (
              <motion.div className="fact" key={f.label} variants={staggerItem}>
                <b>{f.label}</b>
                <span>{f.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </Section>
  )
}

export function ExperienceSection() {
  return (
    <Section id="experiencia">
      <SectionHead
        eyebrow="Experiencia"
        title="Mi"
        titleAccent="trayectoria"
        subtitle="Evolución profesional: de la experiencia operativa al desarrollo de software en Tecnoparque – Nodo SENA."
      />

      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <Reveal
            key={exp.id}
            delay={i * 0.1}
            className={`exp-item ${exp.highlight ? '' : 'secondary'}`}
          >
            <article className="card card-pad">
              <div className="exp-top">
                <div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">{exp.company}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="exp-period">{exp.period}</span>
                  <span className="exp-period" style={{ color: '#a855f7' }}>
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="exp-summary">{exp.summary}</p>

              <ul className="exp-list">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
