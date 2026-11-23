'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Stars } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const GOLD = '#d4af37'
const GOLD_LIGHT = '#f6d585'
const GOLD_DARK = '#8a6d1c'

/** Monolito arquitectónico central de titanio y oro */
function ArchMonolith() {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.3
    mesh.current.rotation.x = Math.sin(t * 0.4) * 0.08
  })

  return (
    <group>
      {/* Cuerpo principal del monolito */}
      <mesh ref={mesh} castShadow>
        <boxGeometry args={[1.5, 3.2, 1.5]} />
        <meshStandardMaterial
          color="#0a0c12"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Bisel / Borde dorado flotante exterior */}
      <mesh>
        <boxGeometry args={[1.54, 3.24, 1.54]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}

/** Anillos orbitales concéntricos de oro pulido */
function GoldenRings() {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.x = 0.5 + Math.sin(t * 0.25) * 0.12
    group.current.rotation.y = t * 0.35
  })

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[2.5, 0.03, 16, 120]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={1.2}
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.4, 0.8]}>
        <torusGeometry args={[2.95, 0.022, 16, 120]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={0.9}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </group>
  )
}

/** Satélites de datos que orbitan el monolito */
function GoldenNodes() {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const angle = t * 0.6 + (i * Math.PI * 2) / 4
      const radius = 2.6
      child.position.set(
        Math.cos(angle) * radius,
        Math.sin(t * 1.2 + i) * 0.45,
        Math.sin(angle) * radius
      )
      child.rotation.y = t * 1.5
      child.rotation.x = t * 0.8
    })
  })

  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((idx) => (
        <mesh key={idx}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color={GOLD_LIGHT}
            emissive={new THREE.Color(GOLD)}
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Parallax suave con el puntero */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)

  useFrame(({ pointer, clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.x * 0.4 + Math.sin(t * 0.15) * 0.06,
      0.05
    )
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -pointer.y * 0.25,
      0.05
    )
  })

  return <group ref={ref}>{children}</group>
}

export default function HeroScene({ onExpand }: { onExpand?: () => void }) {
  return (
    <div
      onClick={onExpand}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      title="Haz clic para abrir el Modo 3D en pantalla completa"
    >
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.2, 7.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#060709']} />
        <fog attach="fog" args={['#060709', 8, 16]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 8, 5]} intensity={2.2} color="#fff6dd" />
        <pointLight position={[-5, -2, 3]} intensity={45} color={GOLD} />
        <pointLight position={[5, 4, -4]} intensity={35} color={GOLD_LIGHT} />

        <ParallaxRig>
          <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.8}
            floatingRange={[-0.2, 0.2]}
          >
            <ArchMonolith />
            <GoldenRings />
            <GoldenNodes />
          </Float>
        </ParallaxRig>

        <Sparkles count={80} scale={9} size={2.8} speed={0.3} color="#f6d585" />
        <Stars
          radius={50}
          depth={35}
          count={1200}
          factor={2.8}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  )
}
