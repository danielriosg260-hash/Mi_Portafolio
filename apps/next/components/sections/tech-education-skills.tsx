'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Layout,
  Server,
  Smartphone,
  Database,
  Wrench,
  Bug,
  Brain,
  HeartHandshake,
  MapPin,
} from 'lucide-react'
import { TECH, EDUCATION, SKILLS } from 'app/data/portfolio'
import { Reveal, staggerContainer, staggerItem } from '../reveal'
import { Section, SectionHead } from '../section-head'

const GROUP_ICONS: Record<string, React.ElementType> = {
  Frontend: Layout,
  Backend: Server,
  'Desarrollo móvil': Smartphone,
  'Bases de datos': Database,
  Herramientas: Wrench,
  'Pruebas y calidad': Bug,
}

export function TechSection() {
  return (
    <Section id="tecnologias">
      <SectionHead
        eyebrow="Tecnologías"
        title="El stack con el que"
        titleAccent="construyo"
        subtitle="Sin barras de progreso inventadas: solo tecnologías con las que trabajo, organizadas por área y con su nivel real."
      />

      <motion.div
        className="tech-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {TECH.map((group) => {
          const Icon = GROUP_ICONS[group.title] ?? Wrench
          return (
            <motion.article
              className="card card-pad"
              key={group.title}
              variants={staggerItem}
            >
              <h3 className="tech-group-title">
                <span
                  className="tech-dot"
                  style={{ background: group.color, color: group.color }}
                />
                <Icon size={18} color={group.color} />
                {group.title}
              </h3>

              <div className="tech-items">
                {group.items.map((item) => (
                  <div className="tech-item" key={item.name}>
                    <b>{item.name}</b>
                    <small style={{ color: levelColor(item.level) }}>
                      {item.level}
                    </small>
                  </div>
                ))}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}

function levelColor(level: string) {
  if (level === 'Experiencia práctica') return '#34d399'
  if (level === 'Conocimientos') return '#67e8f9'
  return '#fbbf24'
}

export function EducationSection() {
  return (
    <Section id="formacion">
      <SectionHead
        eyebrow="Formación"
        title="Base"
        titleAccent="académica"
        subtitle="Formación técnica y complementaria que sostiene mi práctica profesional."
      />

      <div className="edu-grid">
        {EDUCATION.map((edu, i) => (
          <Reveal key={edu.id} delay={i * 0.12} className="card card-pad">
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span
                className="contact-icon"
                style={{
                  background: edu.highlight
                    ? 'linear-gradient(140deg, rgba(34,211,238,.22), rgba(168,85,247,.22))'
                    : 'rgba(255,255,255,0.05)',
                }}
              >
                <GraduationCap size={22} />
              </span>
              <div>
                <h3
                  className="exp-role"
                  style={{ fontSize: 20, marginBottom: 6, lineHeight: 1.25 }}
                >
                  {edu.title}
                </h3>
                <div className="exp-company" style={{ fontSize: 14.5 }}>
                  {edu.place}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 12.5, color: '#6b7a99', marginTop: 4 }}
                >
                  <MapPin size={11} style={{ verticalAlign: -1, marginRight: 5 }} />
                  {edu.location}
                  {edu.period && (
                    <span style={{ marginLeft: 8, color: '#38bdf8' }}>
                      · {edu.period}
                    </span>
                  )}
                </div>
                {edu.description && (
                  <p style={{ fontSize: 13.5, color: '#94a3b8', marginTop: 8, lineHeight: 1.5 }}>
                    {edu.description}
                  </p>
                )}
              </div>
            </div>

            <div className="edu-topics">
              {edu.topics.map((t) => (
                <span className="chip" key={t} style={{ fontSize: 12.5 }}>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function SkillsSection() {
  return (
    <Section id="habilidades">
      <SectionHead
        eyebrow="Habilidades"
        title="Lo que aporto"
        titleAccent="al equipo"
        subtitle="Combinación de capacidades técnicas y habilidades personales que definen cómo trabajo."
      />

      <div className="skills-grid">
        <Reveal className="card card-pad">
          <h3 className="skill-title">
            <span className="contact-icon" style={{ width: 40, height: 40 }}>
              <Brain size={20} />
            </span>
            Habilidades técnicas
          </h3>
          <motion.div
            className="skill-cloud"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {SKILLS.technical.map((s, i) => (
              <motion.span
                className="skill-pill"
                key={s}
                variants={staggerItem}
                style={
                  i % 3 === 0
                    ? { borderColor: 'rgba(34,211,238,.4)', color: '#a5f3fc' }
                    : undefined
                }
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </Reveal>

        <Reveal delay={0.12} className="card card-pad">
          <h3 className="skill-title">
            <span
              className="contact-icon"
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(140deg, rgba(236,72,153,.22), rgba(168,85,247,.22))',
                borderColor: 'rgba(236,72,153,.35)',
              }}
            >
              <HeartHandshake size={20} />
            </span>
            Habilidades personales
          </h3>
          <motion.div
            className="skill-cloud"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {SKILLS.personal.map((s, i) => (
              <motion.span
                className="skill-pill"
                key={s}
                variants={staggerItem}
                style={
                  i % 3 === 0
                    ? { borderColor: 'rgba(236,72,153,.4)', color: '#fbcfe8' }
                    : undefined
                }
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </Section>
  )
}
