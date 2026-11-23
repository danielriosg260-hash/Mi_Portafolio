'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Stars, Text } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

const GOLD = '#d4af37'
const GOLD_LIGHT = '#f6d585'
const GOLD_DARK = '#8a6d1c'

/** Monolito monumental central y prismas arquitectónicos flotantes */
function MonolithCluster() {
  const centralMesh = useRef<Mesh>(null)
  const leftPrism = useRef<Mesh>(null)
  const rightPrism = useRef<Mesh>(null)
  const deepPrism = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (centralMesh.current) centralMesh.current.rotation.y = t * 0.12
    if (leftPrism.current) {
      leftPrism.current.rotation.y = -t * 0.15
      leftPrism.current.position.y = 2 + Math.sin(t * 0.7) * 0.25
    }
    if (rightPrism.current) {
      rightPrism.current.rotation.y = t * 0.18
      rightPrism.current.position.y = -4 + Math.cos(t * 0.6) * 0.3
    }
    if (deepPrism.current) {
      deepPrism.current.rotation.y = -t * 0.1
      deepPrism.current.position.y = -11 + Math.sin(t * 0.5) * 0.2
    }
  })

  return (
    <group>
      {/* 1. Monolito Colosal Central */}
      <group position={[0, -2, 0]}>
        <mesh ref={centralMesh}>
          <boxGeometry args={[2.4, 24, 2.4]} />
          <meshStandardMaterial
            color="#08090f"
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>
        {/* Biseles dorados luminosos */}
        <mesh>
          <boxGeometry args={[2.44, 24.04, 2.44]} />
          <meshBasicMaterial
            color={GOLD}
            wireframe
            transparent
            opacity={0.36}
          />
        </mesh>
        {/* Núcleo vertical de luz dorada */}
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 25, 16]} />
          <meshStandardMaterial
            color={GOLD_LIGHT}
            emissive={new THREE.Color(GOLD)}
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>

      {/* 2. Prisma Izquierdo Flotante (Hero / Sobre mí) */}
      <group position={[-5.8, 2, -3.5]}>
        <mesh ref={leftPrism} rotation={[0.08, 0, 0.05]}>
          <boxGeometry args={[1.4, 15, 1.4]} />
          <meshStandardMaterial
            color="#0a0c14"
            roughness={0.2}
            metalness={0.88}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.44, 15.04, 1.44]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 3. Prisma Derecho Flotante (Proyectos) */}
      <group position={[6.2, -4, -3]}>
        <mesh ref={rightPrism} rotation={[-0.06, 0, -0.04]}>
          <boxGeometry args={[1.5, 16, 1.5]} />
          <meshStandardMaterial
            color="#090b12"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.54, 16.04, 1.54]} />
          <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.28} />
        </mesh>
      </group>

      {/* 4. Monolito Monumental Profundo (Fondo) */}
      <group position={[-3.2, 8, -10]}>
        <mesh>
          <boxGeometry args={[2.6, 26, 2.6]} />
          <meshStandardMaterial
            color="#05060b"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[2.64, 26.04, 2.64]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.18} />
        </mesh>
      </group>

      {/* 5. Prisma Inferior Flotante (Tecnologías & Contacto) */}
      <group position={[4.6, -11, -4.5]}>
        <mesh ref={deepPrism}>
          <boxGeometry args={[1.3, 14, 1.3]} />
          <meshStandardMaterial
            color="#080a10"
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.34, 14.04, 1.34]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  )
}

/** Anillos orbitales giratorios en varios niveles del scroll */
function MultiLevelRings() {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      child.rotation.y = t * (0.2 + i * 0.07) * (i % 2 === 0 ? 1 : -1)
      child.rotation.x = 0.3 + Math.sin(t * 0.3 + i) * 0.12
    })
  })

  return (
    <group ref={group}>
      {/* Nivel 1 (Hero) */}
      <mesh position={[0, 4.2, 0]}>
        <torusGeometry args={[4.2, 0.038, 16, 120]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={1.3}
          metalness={0.92}
        />
      </mesh>
      {/* Nivel 2 (Sobre mí) */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 4, 0.3, 0]}>
        <torusGeometry args={[4.8, 0.032, 16, 120]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={0.9}
          metalness={0.88}
        />
      </mesh>
      {/* Nivel 3 (Proyectos) */}
      <mesh position={[0, -4.8, 0]} rotation={[-Math.PI / 3, 0.4, 0.2]}>
        <torusGeometry args={[5.5, 0.03, 16, 120]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          emissive={new THREE.Color(GOLD)}
          emissiveIntensity={1.4}
          metalness={0.92}
        />
      </mesh>
      {/* Nivel 4 (Tecnologías & Contacto) */}
      <mesh position={[0, -10.5, 0]}>
        <torusGeometry args={[6.2, 0.04, 16, 120]} />
        <meshStandardMaterial
          color={GOLD}
          emissive={new THREE.Color(GOLD_DARK)}
          emissiveIntensity={1.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  )
}

/** Gemas de código holográficas flotantes con los símbolos solicitados */
function HolographicCodeGems() {
  const group = useRef<Group>(null)

  const GEMS = [
    { symbol: '</>', desc: 'Frontend Web', y: 5.2, radius: 4.1, speed: 0.26 },
    { symbol: '{ ADSO }', desc: 'SENA 2025-2027', y: 3.4, radius: 4.8, speed: -0.22 },
    { symbol: '01', desc: 'Binary Logic', y: 1.6, radius: 4.3, speed: 0.3 },
    { symbol: 'SENA', desc: 'Tecnoparque', y: 0.0, radius: 4.7, speed: -0.25 },
    { symbol: 'DJANGO', desc: 'Python Backend', y: -2.0, radius: 4.5, speed: 0.27 },
    { symbol: 'REACT', desc: 'Next.js & UI', y: -3.8, radius: 5.1, speed: -0.28 },
    { symbol: 'FLUTTER', desc: 'Mobile Dart', y: -5.8, radius: 4.8, speed: 0.24 },
    { symbol: 'SQL', desc: 'Data Architecture', y: -7.8, radius: 4.6, speed: -0.26 },
    // Badges de proyectos reales
    { symbol: '💈 TecnoCorte', desc: 'Barberia SaaS Live', y: -2.8, radius: 5.4, speed: 0.2 },
    { symbol: '🛒 Carrito API', desc: 'Node & Storage', y: -4.8, radius: 5.2, speed: -0.21 },
    { symbol: '🧪 Selenium QA', desc: 'Testing Automatizado', y: -6.8, radius: 5.3, speed: 0.23 },
    { symbol: '< Web & Mobile />', desc: 'Full Stack', y: -9.4, radius: 4.9, speed: -0.25 },
  ]

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const g = GEMS[i]
      if (!g) return
      const angle = t * g.speed + (i * Math.PI * 2) / GEMS.length
      child.position.x = Math.cos(angle) * g.radius
      child.position.z = Math.sin(angle) * g.radius
      child.position.y = g.y + Math.sin(t * 1.3 + i * 1.2) * 0.22

      // Orientar hacia el centro o la cámara con rotación suave
      child.lookAt(0, child.position.y, 0)
      child.rotation.y += Math.PI
    })
  })

  return (
    <group ref={group}>
      {GEMS.map((gem, idx) => (
        <group key={idx}>
          {/* Gema / Prisma cristalino de soporte */}
          <mesh>
            <boxGeometry args={[2.1, 0.75, 0.12]} />
            <meshStandardMaterial
              color="#0b0e18"
              metalness={0.92}
              roughness={0.12}
            />
          </mesh>
          {/* Bisel dorado con wireframe */}
          <mesh>
            <boxGeometry args={[2.14, 0.79, 0.13]} />
            <meshBasicMaterial
              color={GOLD}
              wireframe
              transparent
              opacity={0.45}
            />
          </mesh>
          {/* Pequeña joya dorada en el vértice superior */}
          <mesh position={[0, 0.38, 0]}>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color={GOLD_LIGHT}
              emissive={new THREE.Color(GOLD)}
              emissiveIntensity={1.8}
            />
          </mesh>
          {/* Símbolo de código principal */}
          <group position={[0, 0.08, 0.08]}>
            <Text
              fontSize={0.18}
              color={GOLD_LIGHT}
              anchorX="center"
              anchorY="middle"
            >
              {gem.symbol}
            </Text>
          </group>
          {/* Subtítulo descriptivo */}
          <group position={[0, -0.18, 0.08]}>
            <Text
              fontSize={0.095}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {gem.desc}
            </Text>
          </group>
        </group>
      ))}
    </group>
  )
}

/** Paneles flotantes translúcidos de proyectos en 3D */
function FloatingProjectPanels3D() {
  const group = useRef<Group>(null)

  const items = [
    { title: 'TecnoCorte', badge: 'Next.js · Barbería SaaS · Live Demo', y: -3.2, x: 3.6, z: 2.2 },
    { title: 'Carrito LocalStorage', badge: 'Vanilla JS · UI Reactiva', y: -4.4, x: -3.8, z: 2.0 },
    { title: 'App Móvil ADSO', badge: 'Flutter · Dart · Material 3', y: -5.6, x: 3.7, z: -1.6 },
    { title: 'Selenium QA Suite', badge: 'Python · PyTest · Automatización', y: -6.8, x: -3.6, z: -1.2 },
    { title: 'Backend REST API', badge: 'Node.js · Express · MongoDB', y: -8.0, x: 3.5, z: 1.8 },
  ]

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      child.position.y = items[i].y + Math.sin(t * 1.1 + i * 1.4) * 0.16
      child.rotation.y = Math.sin(t * 0.35 + i) * 0.08
    })
  })

  return (
    <group ref={group}>
      {items.map((item, idx) => (
        <group key={idx} position={[item.x, item.y, item.z]}>
          {/* Cristal ahumado translúcido */}
          <mesh>
            <boxGeometry args={[2.7, 1.1, 0.05]} />
            <meshStandardMaterial
              color="#090b14"
              roughness={0.15}
              metalness={0.85}
              transparent
              opacity={0.72}
            />
          </mesh>
          {/* Borde dorado */}
          <mesh>
            <boxGeometry args={[2.74, 1.14, 0.06]} />
            <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.4} />
          </mesh>
          {/* Título del proyecto */}
          <group position={[0, 0.16, 0.04]}>
            <Text fontSize={0.17} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={2.5}>
              {item.title}
            </Text>
          </group>
          {/* Subtítulo / Tech stack */}
          <group position={[0, -0.2, 0.04]}>
            <Text fontSize={0.105} color={GOLD_LIGHT} anchorX="center" anchorY="middle" maxWidth={2.5}>
              {item.badge}
            </Text>
          </group>
        </group>
      ))}
    </group>
  )
}

/** Rejilla cibernética dorada en la base (Horizon Cyber Grid) */
function HorizonCyberGrid() {
  return (
    <group position={[0, -18, 0]}>
      <gridHelper
        args={[100, 70, GOLD_LIGHT, '#221908']}
        position={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial
          color="#040508"
          roughness={0.75}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

/** Cámara conectada al scroll de la página y al movimiento del ratón con inercia suave */
function ScrollLinkedCamera() {
  const scrollRatio = useRef(0)
  const pointerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRatio.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    const onPointer = (e: MouseEvent) => {
      pointerPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onPointer, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onPointer)
    }
  }, [])

  useFrame(({ camera }) => {
    const progress = scrollRatio.current
    const px = pointerPos.current.x
    const py = pointerPos.current.y

    // La cámara desciende a lo largo de los monolitos a medida que se hace scroll en la página
    const targetY = 4.2 - progress * 17.5
    const targetAngle = progress * Math.PI * 1.45 + px * 0.38
    const radius = 9.8

    const targetX = Math.sin(targetAngle) * radius
    const targetZ = Math.cos(targetAngle) * radius

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY - py * 1.3, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    // La cámara mira suavemente hacia el eje central con compensación de puntero
    camera.lookAt(px * 0.5, targetY * 0.78 + py * 0.25, 0)
  })

  return null
}

export function Page3DBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 4.2, 10], fov: 48 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#040508']} />
        <fog attach="fog" args={['#040508', 9, 25]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[7, 14, 8]} intensity={2.2} color="#fff6e0" />
        <pointLight position={[0, 4, 0]} intensity={38} color={GOLD_LIGHT} distance={19} />
        <pointLight position={[-6, -4, -4]} intensity={28} color={GOLD} distance={20} />
        <pointLight position={[6, -9, 4]} intensity={28} color={GOLD_LIGHT} distance={20} />

        <ScrollLinkedCamera />

        <MonolithCluster />
        <MultiLevelRings />
        <HolographicCodeGems />
        <FloatingProjectPanels3D />
        <HorizonCyberGrid />

        {/* Polvo de oro (Gold Embers) flotando en 3D */}
        <Sparkles count={260} scale={22} size={3.0} speed={0.38} color="#f6d585" />
        <Stars
          radius={60}
          depth={45}
          count={1400}
          factor={2.6}
          saturation={0}
          fade
          speed={0.4}
        />
      </Canvas>
    </div>
  )
}
