'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Trail,
} from '@react-three/drei'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const CYAN = '#22d3ee'
const VIOLET = '#a855f7'
const MAGENTA = '#ec4899'

/** Cristal central distorsionado — el corazón de la escena */
function CoreCrystal() {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.25
    mesh.current.rotation.x = Math.sin(t * 0.4) * 0.25
    mesh.current.position.y = Math.sin(t * 0.8) * 0.12
  })

  return (
    <mesh ref={mesh} castShadow>
      <icosahedronGeometry args={[1.35, 12]} />
      <MeshDistortMaterial
        color={CYAN}
        emissive={new THREE.Color('#0b3b46')}
        emissiveIntensity={0.75}
        roughness={0.15}
        metalness={0.85}
        distort={0.42}
        speed={1.6}
      />
    </mesh>
  )
}

/** Jaula wireframe que envuelve el cristal */
function WireShell() {
  const ref = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = -clock.getElapsedTime() * 0.18
    ref.current.rotation.z = clock.getElapsedTime() * 0.08
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.15, 26, 26]} />
      <meshBasicMaterial
        color={VIOLET}
        wireframe
        transparent
        opacity={0.16}
      />
    </mesh>
  )
}

/** Anillos orbitando alrededor del cristal */
function OrbitRings() {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.x = 0.6 + Math.sin(t * 0.3) * 0.15
    group.current.rotation.y = t * 0.35
  })

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[2.7, 0.035, 16, 140]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={new THREE.Color(CYAN)}
          emissiveIntensity={2.4}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0.7]}>
        <torusGeometry args={[3.15, 0.028, 16, 140]} />
        <meshStandardMaterial
          color={MAGENTA}
          emissive={new THREE.Color(MAGENTA)}
          emissiveIntensity={2}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.5, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 150]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={new THREE.Color(VIOLET)}
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

/** Satélites pequeños que orbitan con estela */
function Satellites() {
  const items = useMemo(
    () => [
      { r: 3.0, speed: 0.55, size: 0.16, color: CYAN, offset: 0 },
      { r: 3.6, speed: -0.4, size: 0.13, color: MAGENTA, offset: 2 },
      { r: 4.1, speed: 0.3, size: 0.11, color: VIOLET, offset: 4 },
    ],
    []
  )

  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const cfg = items[i]
      if (!cfg) return
      const t = clock.getElapsedTime() * cfg.speed + cfg.offset
      child.position.set(
        Math.cos(t) * cfg.r,
        Math.sin(t * 1.4) * 0.9,
        Math.sin(t) * cfg.r
      )
    })
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Trail
          key={i}
          width={2.4}
          length={5}
          color={it.color}
          attenuation={(t) => t * t}
        >
          <mesh>
            <sphereGeometry args={[it.size, 20, 20]} />
            <meshStandardMaterial
              color={it.color}
              emissive={new THREE.Color(it.color)}
              emissiveIntensity={3}
            />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

/** Rotación suave siguiendo el puntero (parallax) */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)

  useFrame(({ pointer, clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.x * 0.35 + Math.sin(t * 0.2) * 0.05,
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

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 8.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#05070e']} />
      <fog attach="fog" args={['#05070e', 9, 18]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[6, 5, 5]} intensity={70} color={CYAN} />
      <pointLight position={[-6, -3, 4]} intensity={55} color={VIOLET} />
      <pointLight position={[0, 6, -6]} intensity={40} color={MAGENTA} />
      <directionalLight position={[0, 8, 4]} intensity={1.2} color="#ffffff" />

      <ParallaxRig>
        <Float
          speed={1.6}
          rotationIntensity={0.45}
          floatIntensity={1.1}
          floatingRange={[-0.25, 0.25]}
        >
          <CoreCrystal />
          <WireShell />
          <OrbitRings />
          <Satellites />
        </Float>
      </ParallaxRig>

      <Sparkles count={90} scale={11} size={2.6} speed={0.35} color="#a5f3fc" />
      <Stars
        radius={60}
        depth={40}
        count={1800}
        factor={3.2}
        saturation={0}
        fade
        speed={0.6}
      />
    </Canvas>
  )
}
