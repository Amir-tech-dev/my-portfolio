"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

function DataNodes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const nodesRef = useRef<THREE.InstancedMesh>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)

  const nodeCount = 60
  const { positions, connections } = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const conn: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        )
      )
    }
    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (pos[i].distanceTo(pos[j]) < 2.5) {
          conn.push(i, j)
        }
      }
    }
    return { positions: pos, connections: conn }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI * 2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2 + scrollProgress * 0.5
    }

    if (nodesRef.current) {
      const dummy = new THREE.Object3D()
      const time = state.clock.elapsedTime
      for (let i = 0; i < nodeCount; i++) {
        const p = positions[i]
        dummy.position.set(
          p.x + Math.sin(time * 0.5 + i) * 0.15,
          p.y + Math.cos(time * 0.3 + i * 0.5) * 0.15,
          p.z + Math.sin(time * 0.4 + i * 0.3) * 0.1
        )
        const scale = 0.04 + Math.sin(time + i) * 0.02
        dummy.scale.setScalar(scale)
        dummy.updateMatrix()
        nodesRef.current.setMatrixAt(i, dummy.matrix)
      }
      nodesRef.current.instanceMatrix.needsUpdate = true
    }

    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.attributes.position as THREE.BufferAttribute
      const time = state.clock.elapsedTime
      for (let i = 0; i < connections.length; i += 2) {
        const a = connections[i]
        const b = connections[i + 1]
        const pa = positions[a]
        const pb = positions[b]
        linePositions.setXYZ(
          i,
          pa.x + Math.sin(time * 0.5 + a) * 0.15,
          pa.y + Math.cos(time * 0.3 + a * 0.5) * 0.15,
          pa.z + Math.sin(time * 0.4 + a * 0.3) * 0.1
        )
        linePositions.setXYZ(
          i + 1,
          pb.x + Math.sin(time * 0.5 + b) * 0.15,
          pb.y + Math.cos(time * 0.3 + b * 0.5) * 0.15,
          pb.z + Math.sin(time * 0.4 + b * 0.3) * 0.1
        )
      }
      linePositions.needsUpdate = true
    }
  })

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(connections.length * 3)
    for (let i = 0; i < connections.length; i++) {
      const p = positions[connections[i]]
      pos[i * 3] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return geo
  }, [connections, positions])

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#2dd4bf" transparent opacity={0.15} />
      </lineSegments>
    </group>
  )
}

function PythonLogo({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 0.6
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.25
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#3776ab"
          emissive="#3776ab"
          emissiveIntensity={0.4}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.06, 16, 96]} />
        <meshStandardMaterial
          color="#ffd43b"
          emissive="#ffd43b"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.2, 0.06, 16, 96]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function FloatingShapes({ scrollProgress }: { scrollProgress: number }) {
  const shapes = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (shapes.current) {
      shapes.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.1 + i * 0.05) + scrollProgress * 2
        child.rotation.z = state.clock.elapsedTime * (0.05 + i * 0.03)
        child.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 1.5) * 0.5 + (child.userData.baseY || 0)
      })
    }
  })

  return (
    <group ref={shapes}>
      {/* Octahedron - represents data structures */}
      <mesh position={[-4, 2, -2]} userData={{ baseY: 2 }}>
        <octahedronGeometry args={[0.5]} />
        <MeshWobbleMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} factor={0.3} speed={1} wireframe />
      </mesh>
      {/* Icosahedron - represents complexity */}
      <mesh position={[4, -1.5, -3]} userData={{ baseY: -1.5 }}>
        <icosahedronGeometry args={[0.6]} />
        <MeshWobbleMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.3} factor={0.2} speed={1.5} wireframe />
      </mesh>
      {/* Dodecahedron */}
      <mesh position={[-3, -2, -1]} userData={{ baseY: -2 }}>
        <dodecahedronGeometry args={[0.4]} />
        <MeshDistortMaterial color="#ffd43b" emissive="#ffd43b" emissiveIntensity={0.3} distort={0.3} speed={2} wireframe />
      </mesh>
      {/* Torus - represents loops/iterations */}
      <mesh position={[3.5, 2.5, -2.5]} userData={{ baseY: 2.5 }}>
        <torusGeometry args={[0.4, 0.15, 16, 32]} />
        <MeshWobbleMaterial color="#3776ab" emissive="#3776ab" emissiveIntensity={0.4} factor={0.4} speed={1.2} wireframe />
      </mesh>
    </group>
  )
}

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.z = 7 - scrollProgress * 3
    camera.position.y = scrollProgress * 2
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene({ scrollProgress, isDark }: { scrollProgress: number; isDark: boolean }) {
  const bgColor = isDark ? "#0d1117" : "#f8fafc"
  
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3776ab" />
      <pointLight position={[0, 5, 5]} intensity={0.4} color="#ffd43b" />
      <CameraController scrollProgress={scrollProgress} />
      <DataNodes scrollProgress={scrollProgress} />
      <PythonLogo scrollProgress={scrollProgress} />
      <FloatingShapes scrollProgress={scrollProgress} />
      <fog attach="fog" args={[bgColor, 5, 20]} />
    </>
  )
}

export default function HeroScene() {
  const scrollProgress = useScrollProgress()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme === "dark" || (!resolvedTheme && theme === "dark"))

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} isDark={isDark} />
        </Suspense>
      </Canvas>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
    </div>
  )
}
