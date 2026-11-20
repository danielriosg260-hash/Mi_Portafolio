'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Lightbulb, ExternalLink, Layers } from 'lucide-react'
import { GithubIcon } from '../icons'
import { PROJECTS, type Project } from 'app/data/portfolio'
import { Reveal, staggerContainer, staggerItem } from '../reveal'
import { Section, SectionHead } from '../section-head'

function statusClass(status: Project['status']) {
  if (status === 'Completado') return 'status status-done'
  if (status === 'En evolución') return 'status status-evo'
  return 'status status-dev'
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1} className="card project-card">
      {/* Cover con orbes de color */}
      <div
        className="project-cover"
        style={{
          background: `linear-gradient(140deg, ${project.gradient[0]}22, ${project.gradient[1]}22)`,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span
          className="project-orb"
          style={{
            width: 150,
            height: 150,
            left: -40,
            top: -50,
            background: project.gradient[0],
          }}
        />
        <span
          className="project-orb"
          style={{
            width: 120,
            height: 120,
            right: -30,
            bottom: -40,
            background: project.gradient[1],
          }}
        />
        <span className="project-emoji" role="img" aria-label={project.name}>
          {project.emoji}
        </span>
        <span
          className="mono"
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {project.year}
        </span>
      </div>

      <div className="card-pad" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span className="project-kind">{project.kind}</span>
        <h3 className="project-name" style={{ marginTop: 8 }}>
          {project.name}
        </h3>

        <div className="project-block problem">
          <h5>
            <AlertTriangle size={11} style={{ marginRight: 5, verticalAlign: -1 }} />
            El problema
          </h5>
          <p>{project.problem}</p>
        </div>

        <div className="project-block">
          <h5>
            <Lightbulb size={11} style={{ marginRight: 5, verticalAlign: -1 }} />
            La solución
          </h5>
          <p>{project.solution}</p>
        </div>

        <h5
          className="mono"
          style={{
            margin: '14px 0 8px',
            fontSize: 11.5,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#6b7a99',
          }}
        >
          <Layers size={11} style={{ marginRight: 5, verticalAlign: -1 }} />
          Funcionalidades
        </h5>
        <ul className="project-features">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map((t) => (
            <span key={t} className="chip chip-tech" style={{ fontSize: 12, padding: '5px 11px' }}>
              {t}
            </span>
          ))}
        </div>

        <div className="project-foot">
          <span className={statusClass(project.status)}>● {project.status}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {project.github && (
              <a className="icon-btn" href={project.github} target="_blank" rel="noreferrer" aria-label="Ver código">
                <GithubIcon size={17} />
              </a>
            )}
            {project.demo && (
              <a className="icon-btn" href={project.demo} target="_blank" rel="noreferrer" aria-label="Ver demo">
                <ExternalLink size={17} />
              </a>
            )}
            {!project.github && !project.demo && (
              <span className="mono" style={{ fontSize: 11.5, color: '#6b7a99' }}>
                Repo privado · disponible a solicitud
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function ProjectsSection() {
  return (
    <Section id="proyectos">
      <SectionHead
        eyebrow="Proyectos destacados"
        title="Trabajos que"
        titleAccent="resuelven problemas reales"
        subtitle="Cada proyecto nace de una necesidad concreta: un problema, una solución y las tecnologías que lo hacen posible."
      />

      <motion.div
        className="projects-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div key={p.id} variants={staggerItem}>
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
