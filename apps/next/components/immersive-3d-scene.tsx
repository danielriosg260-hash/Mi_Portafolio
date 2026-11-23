'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Sparkles, Stars, Text } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { ExternalLink, X, Compass, Layers, ShieldCheck, Sparkles as SparklesIcon } from 'lucide-react'
import { PROJECTS, CONTACT, Project } from 'app/data/portfolio'
import { GithubIcon } from './icons'

const GOLD = '#d4af37'
const GOLD_LIGHT = '#f6d585'
const GOLD_DARK = '#8a6d1c'

/** Monolito Central Monumental */
function CentralDataMonolith() {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.15
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Obelisco principal */}
      <mesh ref={mesh} castShadow>
        <boxGeometry args={[2.2, 6.5, 2.2]} />
        <meshStandardMaterial
          color="#08090e"
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* Biseles y nervaduras doradas luminosas */}
      <mesh>
        <boxGeometry args={[2.24, 6.54, 2.24]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Núcleo interior dorado que emite luz vertical */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 7.2, 16]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={new THREE.Color(GOLD)}
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Runa superior holográfica */}
      <group position={[0, 3.8, 0]}>
        <Text
          fontSize={0.35}
          color={GOLD_LIGHT}
          anchorX="center"
          anchorY="middle"
        >
          {'< ADSO / SENA >'}
        </Text>
      </group>
    </group>
  )
}

/** Anillos de energía concéntricos */
function EnergyRings() {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.2
    ref.current.rotation.x = 0.4 + Math.sin(t * 0.3) * 0.1
  })

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[4.2, 0.04, 16, 140]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[5.1, 0.03, 16, 140]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>
    </group>
  )
}

/** Placa 3D de cada proyecto */
function ProjectPlate({
  project,
  index,
  total,
  isSelected,
  onSelect,
}: {
  project: Project
  index: number
  total: number
  isSelected: boolean
  onSelect: (p: Project) => void
}) {
  const mesh = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const radius = 5.2
  const angle = (index / total) * Math.PI * 2
  const yOffset = Math.sin(index * 1.5) * 0.8

  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.position.y = yOffset + Math.sin(t * 1.5 + index) * 0.18
    // Orienta hacia el centro
    mesh.current.lookAt(0, yOffset, 0)
    mesh.current.rotation.y += Math.PI
  })

  return (
    <group
      ref={mesh}
      position={[x, yOffset, z]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(project)
      }}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        {/* Placa base */}
        <mesh>
          <boxGeometry args={[2.0, 1.4, 0.12]} />
          <meshStandardMaterial
            color={isSelected || hovered ? '#151924' : '#0a0d14'}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>

        {/* Marco dorado */}
        <mesh>
          <boxGeometry args={[2.04, 1.44, 0.14]} />
          <meshBasicMaterial
            color={isSelected || hovered ? '#ffffff' : GOLD}
            wireframe
            transparent
            opacity={isSelected || hovered ? 0.9 : 0.4}
          />
        </mesh>

        {/* Luz puntual si está seleccionado */}
        {(isSelected || hovered) && (
          <pointLight color={GOLD_LIGHT} intensity={12} distance={3} />
        )}

        {/* Textos dentro de la escena */}
        <group position={[0, 0.22, 0.08]}>
          <Text
            fontSize={0.34}
            anchorX="center"
            anchorY="middle"
          >
            {project.emoji}
          </Text>
        </group>

        <group position={[0, -0.16, 0.08]}>
          <Text
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
            textAlign="center"
          >
            {project.name}
          </Text>
        </group>

        <group position={[0, -0.42, 0.08]}>
          <Text
            fontSize={0.1}
            color={GOLD_LIGHT}
            anchorX="center"
            anchorY="middle"
          >
            {project.year} · {project.status}
          </Text>
        </group>
      </Float>
    </group>
  )
}

/** Rejilla de horizonte cibernético en el piso */
function CyberHorizonFloor() {
  return (
    <group position={[0, -4.5, 0]}>
      {/* Rejilla */}
      <gridHelper
        args={[80, 50, GOLD_LIGHT, '#1c1f2e']}
        position={[0, 0, 0]}
      />
      {/* Plano sutil reflectante */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial
          color="#040508"
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}

export function Immersive3DScene({ onClose }: { onClose: () => void }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0] ?? null)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#040508',
        color: '#ffffff',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Canvas 3D Interactivo */}
      <Canvas
        camera={{ position: [0, 1.8, 11], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#05060a']} />
        <fog attach="fog" args={['#05060a', 12, 28]} />

        {/* Iluminación dramática estilo Black & Gold */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 12, 8]} intensity={2.4} color="#fff6e5" />
        <pointLight position={[0, 4, 0]} intensity={45} color={GOLD_LIGHT} distance={18} />
        <pointLight position={[-8, -2, -6]} intensity={25} color={GOLD} distance={20} />
        <pointLight position={[8, -2, 6]} intensity={25} color={GOLD_LIGHT} distance={20} />

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minDistance={4.5}
          maxDistance={18}
          enableDamping
          dampingFactor={0.05}
          autoRotate={!selectedProject}
          autoRotateSpeed={0.4}
        />

        <CentralDataMonolith />
        <EnergyRings />

        {/* Placas interactivas de proyectos */}
        {PROJECTS.map((p, i) => (
          <ProjectPlate
            key={p.id}
            project={p}
            index={i}
            total={PROJECTS.length}
            isSelected={selectedProject?.id === p.id}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        ))}

        <CyberHorizonFloor />

        {/* Partículas de polvo de oro */}
        <Sparkles count={180} scale={18} size={2.8} speed={0.35} color="#f6d585" />
        <Stars
          radius={60}
          depth={45}
          count={1600}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />
      </Canvas>

      {/* HUD SUPERIOR */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(4,5,8,0.9), transparent)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, pointerEvents: 'auto' }}>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f6d585, #d4af37)',
              color: '#060709',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 14,
              boxShadow: '0 0 20px rgba(212,175,55,0.6)',
            }}
          >
            DR
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.04em' }}>
              DANIEL RÍOS <span style={{ color: GOLD_LIGHT }}>· ARQUITECTURA 3D</span>
            </div>
            <div style={{ fontSize: 11.5, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              ENTORNO INTERACTIVO 360°
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(246,213,133,0.5)',
            color: '#f6d585',
            padding: '10px 22px',
            borderRadius: 999,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 0 24px rgba(212,175,55,0.25)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f6d585'
            e.currentTarget.style.color = '#060709'
            e.currentTarget.style.boxShadow = '0 0 35px rgba(246,213,133,0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.color = '#f6d585'
            e.currentTarget.style.boxShadow = '0 0 24px rgba(212,175,55,0.25)'
          }}
        >
          <X size={16} /> Salir del Modo 3D
        </button>
      </header>

      {/* INSPECTOR DE PROYECTO SELECCIONADO (Holographic Card) */}
      {selectedProject && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 28,
            transform: 'translateY(-50%)',
            width: 'min(420px, 90vw)',
            background: 'rgba(9, 11, 18, 0.88)',
            border: '1px solid rgba(246, 213, 133, 0.4)',
            borderRadius: 22,
            padding: 26,
            backdropFilter: 'blur(22px)',
            boxShadow: '0 25px 60px -20px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(212, 175, 55, 0.3)',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 32 }}>{selectedProject.emoji}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
                  {selectedProject.name}
                </h3>
                <span style={{ fontSize: 12, color: GOLD_LIGHT, fontFamily: 'var(--font-mono)' }}>
                  {selectedProject.kind}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#cbd5e1',
                width: 28,
                height: 28,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 16px' }}>
            {selectedProject.solution}
          </p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: GOLD_LIGHT, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
              Tecnologías
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11.5,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    color: '#f6d585',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
            {selectedProject.demo && (
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #f6d585, #d4af37)',
                  color: '#060709',
                  padding: '11px 16px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  boxShadow: '0 8px 24px -6px rgba(212,175,55,0.7)',
                }}
              >
                <ExternalLink size={14} /> Demo en vivo
              </a>
            )}
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#ffffff',
                  padding: '11px 16px',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <GithubIcon size={15} /> Ver código
              </a>
            )}
          </div>
        </div>
      )}

      {/* DOCK INFERIOR — SELECTOR RÁPIDO DE PROYECTOS */}
      <footer
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
          pointerEvents: 'none',
          width: 'min(700px, 94vw)',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            gap: 8,
            padding: 6,
            borderRadius: 999,
            background: 'rgba(6, 7, 12, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8)',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        >
          {PROJECTS.map((p) => {
            const isAct = selectedProject?.id === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: isAct ? '1px solid rgba(246,213,133,0.8)' : '1px solid transparent',
                  background: isAct ? 'linear-gradient(135deg, rgba(246,213,133,0.25), rgba(212,175,55,0.15))' : 'transparent',
                  color: isAct ? '#f6d585' : '#94a3b8',
                  fontSize: 13,
                  fontWeight: isAct ? 700 : 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s',
                }}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </button>
            )
          })}
        </div>

        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
            background: 'rgba(6,7,12,0.6)',
            padding: '4px 14px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          🖱️ Arrastra con el ratón para rotar 360° · Rueda para zoom · Toca un proyecto para inspeccionar
        </div>
      </footer>
    </div>
  )
}
