"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "../contexts/theme-context"

interface Star {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  layer: number
  color: string
}

interface Planet {
  id: number
  x: number
  y: number
  size: number
  type: "earth" | "mars" | "jupiter" | "saturn" | "neptune" | "venus"
  speed: number
  orbitRadius: number
  angle: number
  moons?: Array<{
    size: number
    distance: number
    speed: number
    angle: number
  }>
}

interface Constellation {
  id: number
  points: Array<{ x: number; y: number }>
  name: string
  namePosition: { x: number; y: number }
}

interface ParticleProps {
  id: number
  x: number
  y: number
  size: number
  type: "blue" | "indigo" | "slate"
  delay: number
  duration: number
}

interface DataPointProps {
  id: number
  x: number
  y: number
  driftX: number
  driftY: number
  delay: number
  duration: number
}

// Memoized star component for better performance
const MemoizedStar = React.memo(({ star, layerY }: { star: Star; layerY: any }) => (
  <motion.div
    className="star"
    style={{
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      backgroundColor: star.color,
      opacity: star.opacity,
      boxShadow: star.layer > 1 ? `0 0 ${star.size * 2}px ${star.color}40` : undefined,
      y: layerY,
    }}
    animate={{
      opacity: [star.opacity, star.opacity * (star.layer === 1 ? 0.2 : star.layer === 2 ? 0.3 : 0.4), star.opacity],
      scale: [1, star.layer === 1 ? 1.3 : star.layer === 2 ? 1.5 : 2, 1],
    }}
    transition={{
      duration:
        star.layer === 1
          ? 5 + Math.random() * 4
          : star.layer === 2
            ? 3.5 + Math.random() * 2.5
            : 2.5 + Math.random() * 2,
      repeat: Number.POSITIVE_INFINITY,
      delay: Math.random() * (star.layer === 1 ? 4 : star.layer === 2 ? 3 : 2.5),
    }}
  />
))

MemoizedStar.displayName = "MemoizedStar"

export function SpaceBackground() {
  const { scrollY } = useScroll()
  const [stars, setStars] = useState<Star[]>([])
  const [planets, setPlanets] = useState<Planet[]>([])
  const [constellations, setConstellations] = useState<Constellation[]>([])
  const [particles, setParticles] = useState<ParticleProps[]>([])
  const [dataPoints, setDataPoints] = useState<DataPointProps[]>([])
  const { theme, isThemeLoaded } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Transform hooks
  const deepSpaceY = useTransform(scrollY, [0, 4000], [0, -180])
  const farStarsY = useTransform(scrollY, [0, 4000], [0, -280])
  const midStarsY = useTransform(scrollY, [0, 4000], [0, -450])
  const nearStarsY = useTransform(scrollY, [0, 4000], [0, -720])
  const planetsY = useTransform(scrollY, [0, 4000], [0, -550])
  const cosmicDustY = useTransform(scrollY, [0, 4000], [0, -350])
  const lightBgParallax = useTransform(scrollY, [0, 4000], [0, -150])
  const lightBgParallax2 = useTransform(scrollY, [0, 4000], [0, -80])

  // Generate constellations
  useEffect(() => {
    const scientificConstellations: Constellation[] = [
      {
        id: 1,
        name: "Ursa Major",
        points: [
          { x: 15, y: 15 },
          { x: 18, y: 18 },
          { x: 22, y: 20 },
          { x: 26, y: 18 },
          { x: 30, y: 20 },
          { x: 28, y: 24 },
          { x: 32, y: 26 },
        ],
        namePosition: { x: 24, y: 12 },
      },
      {
        id: 2,
        name: "Cassiopeia",
        points: [
          { x: 65, y: 25 },
          { x: 70, y: 20 },
          { x: 75, y: 25 },
          { x: 80, y: 20 },
          { x: 85, y: 25 },
        ],
        namePosition: { x: 75, y: 15 },
      },
      {
        id: 3,
        name: "Orion",
        points: [
          { x: 45, y: 65 },
          { x: 48, y: 55 },
          { x: 50, y: 50 },
          { x: 52, y: 55 },
          { x: 55, y: 65 },
          { x: 50, y: 60 },
          { x: 48, y: 70 },
          { x: 50, y: 75 },
          { x: 52, y: 70 },
        ],
        namePosition: { x: 50, y: 45 },
      },
      {
        id: 4,
        name: "Cygnus",
        points: [
          { x: 80, y: 70 },
          { x: 85, y: 75 },
          { x: 90, y: 80 },
          { x: 85, y: 85 },
          { x: 80, y: 90 },
          { x: 87, y: 77 },
          { x: 83, y: 77 },
        ],
        namePosition: { x: 85, y: 65 },
      },
      {
        id: 5,
        name: "Lyra",
        points: [
          { x: 20, y: 80 },
          { x: 25, y: 75 },
          { x: 30, y: 80 },
          { x: 25, y: 85 },
          { x: 20, y: 80 },
          { x: 15, y: 75 },
        ],
        namePosition: { x: 20, y: 70 },
      },
    ]

    setConstellations(scientificConstellations)
  }, [])

  // Canvas drawing functions
  const drawCoordinateGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Major grid lines
    ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"
    ctx.lineWidth = 1

    for (let x = 0; x <= width; x += 100) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y <= height; y += 100) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Minor grid lines
    ctx.strokeStyle = "rgba(59, 130, 246, 0.08)"
    ctx.lineWidth = 0.5

    for (let x = 50; x <= width; x += 100) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 50; y <= height; y += 100) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Circular elements
    const centerX = width / 2
    const centerY = height / 2

    for (let i = 0; i < 6; i++) {
      const radius = 80 + i * 120
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 - i * 0.015})`
      ctx.lineWidth = 2 - i * 0.2
      ctx.stroke()
    }

    // Coordinate labels
    ctx.font = "10px Arial, sans-serif"
    ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
    for (let x = 100; x <= width; x += 200) {
      ctx.fillText(`${Math.floor(x / 10)}`, x - 10, 15)
    }
    for (let y = 100; y <= height; y += 200) {
      ctx.fillText(`${Math.floor(y / 10)}`, 5, y + 5)
    }
  }, [])

  const drawMathematicalFormulas = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const formulas = [
      { text: "E = mc²", size: 16, opacity: 0.25 },
      { text: "F = G(m₁m₂)/r²", size: 14, opacity: 0.2 },
      { text: "∇ × B = μ₀J + μ₀ε₀∂E/∂t", size: 12, opacity: 0.18 },
      { text: "∫₀^∞ e^(-x²) dx = √π/2", size: 13, opacity: 0.22 },
      {
        text: "ds² = -c²dt² + a²(t)(dx² + dy² + dz²)",
        size: 11,
        opacity: 0.15,
      },
      { text: "Ψ(r,t) = Ψ(r)e^(-iEt/ℏ)", size: 14, opacity: 0.2 },
      { text: "L = T - V", size: 15, opacity: 0.23 },
      { text: "∇²φ = 4πGρ", size: 13, opacity: 0.19 },
    ]

    formulas.forEach((formula, i) => {
      const x = Math.sin(i * 1.2) * width * 0.35 + width * 0.5
      const y = Math.cos(i * 1.2) * height * 0.35 + height * 0.5
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((i * Math.PI) / 4)
      ctx.font = `${formula.size}px 'Times New Roman', serif`
      ctx.fillStyle = `rgba(59, 130, 246, ${formula.opacity})`
      ctx.fillText(formula.text, 0, 0)
      ctx.restore()
    })
  }, [])

  const drawConstellationLines = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      constellations.forEach((constellation) => {
        if (constellation.points.length < 2) return

        const scaledPoints = constellation.points.map((point) => ({
          x: (point.x / 100) * width,
          y: (point.y / 100) * height,
        }))

        // Draw lines
        ctx.beginPath()
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y)
        for (let i = 1; i < scaledPoints.length; i++) {
          ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y)
        }
        ctx.strokeStyle = "rgba(59, 130, 246, 0.25)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw star points
        scaledPoints.forEach((point) => {
          // Outer glow
          ctx.beginPath()
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
          ctx.fill()

          // Inner star
          ctx.beginPath()
          ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(59, 130, 246, 0.4)"
          ctx.fill()

          // Center point
          ctx.beginPath()
          ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(59, 130, 246, 0.6)"
          ctx.fill()
        })

        // Draw constellation name
        const nameX = (constellation.namePosition.x / 100) * width
        const nameY = (constellation.namePosition.y / 100) * height
        ctx.font = "14px Arial, sans-serif"
        ctx.fillStyle = "rgba(59, 130, 246, 0.35)"
        ctx.fillText(constellation.name, nameX, nameY)
      })
    },
    [constellations],
  )

  const drawOrbitalPaths = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const orbits = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radiusX: 80,
        radiusY: 40,
        opacity: 0.15,
      },
      {
        x: width * 0.7,
        y: height * 0.6,
        radiusX: 120,
        radiusY: 60,
        opacity: 0.12,
      },
      {
        x: width * 0.4,
        y: height * 0.8,
        radiusX: 100,
        radiusY: 50,
        opacity: 0.1,
      },
    ]

    orbits.forEach((orbit) => {
      ctx.beginPath()
      ctx.ellipse(orbit.x, orbit.y, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(99, 102, 241, ${orbit.opacity})`
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])
    })
  }, [])

  const drawScientificElements = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height)
      drawCoordinateGrid(ctx, width, height)
      drawMathematicalFormulas(ctx, width, height)
      drawConstellationLines(ctx, width, height)
      drawOrbitalPaths(ctx, width, height)
    },
    [drawCoordinateGrid, drawMathematicalFormulas, drawConstellationLines, drawOrbitalPaths],
  )

  // Canvas setup
  useEffect(() => {
    if (!isThemeLoaded || theme !== "light" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawScientificElements(ctx, canvas.width, canvas.height)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [theme, isThemeLoaded, drawScientificElements])

  // Generate data with performance optimizations
  useEffect(() => {
    if (!isThemeLoaded) return

    // Generate stars with reduced count for better performance
    const newStars: Star[] = []
    const starColors = ["#ffffff", "#ffffcc", "#ffcc99", "#ccccff", "#ffcccc"]

    for (let layer = 1; layer <= 3; layer++) {
      const count = layer === 1 ? 200 : layer === 2 ? 150 : 100 // Reduced counts
      const startId = layer === 1 ? 0 : layer === 2 ? 200 : 350

      for (let i = 0; i < count; i++) {
        newStars.push({
          id: startId + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (layer * 0.8) + 0.2,
          speed: Math.random() * (layer * 0.15) + 0.05,
          opacity: Math.random() * (layer * 0.2) + 0.1,
          layer,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        })
      }
    }

    setStars(newStars)

    // Generate planets (unchanged)
    const newPlanets: Planet[] = [
      {
        id: 1,
        x: 12,
        y: 20,
        size: 85,
        type: "jupiter",
        speed: 0.012,
        orbitRadius: 130,
        angle: 0,
      },
      {
        id: 2,
        x: 78,
        y: 65,
        size: 45,
        type: "mars",
        speed: 0.028,
        orbitRadius: 75,
        angle: Math.PI,
      },
      {
        id: 3,
        x: 8,
        y: 78,
        size: 55,
        type: "earth",
        speed: 0.022,
        orbitRadius: 95,
        angle: Math.PI / 2,
        moons: [{ size: 8, distance: 25, speed: 0.12, angle: 0 }],
      },
      {
        id: 4,
        x: 88,
        y: 18,
        size: 75,
        type: "saturn",
        speed: 0.01,
        orbitRadius: 150,
        angle: Math.PI * 1.5,
      },
      {
        id: 5,
        x: 45,
        y: 88,
        size: 42,
        type: "neptune",
        speed: 0.015,
        orbitRadius: 85,
        angle: Math.PI * 0.7,
      },
      {
        id: 6,
        x: 25,
        y: 8,
        size: 32,
        type: "venus",
        speed: 0.035,
        orbitRadius: 55,
        angle: Math.PI * 1.2,
      },
    ]

    setPlanets(newPlanets)

    // Generate particles for light theme (reduced count)
    const newParticles: ParticleProps[] = []
    for (let i = 0; i < 25; i++) {
      // Reduced from 35
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        type: i % 3 === 0 ? "blue" : i % 3 === 1 ? "indigo" : "slate",
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
      })
    }
    setParticles(newParticles)

    // Generate data points for light theme (reduced count)
    const newDataPoints: DataPointProps[] = []
    for (let i = 0; i < 10; i++) {
      // Reduced from 15
      newDataPoints.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        driftX: Math.random() * 50 - 25,
        driftY: Math.random() * 50 - 25,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 4,
      })
    }
    setDataPoints(newDataPoints)
  }, [isThemeLoaded])

  // Don't render until theme is loaded
  if (!isThemeLoaded) {
    return null
  }

  const getPlanetBoxShadow = (type: Planet["type"], size: number) => {
    const shadows = {
      earth: `inset -${size * 0.12}px -${size * 0.12}px ${
        size * 0.25
      }px rgba(0, 0, 0, 0.6), inset ${size * 0.05}px ${size * 0.05}px ${size * 0.15}px rgba(255, 255, 255, 0.2), 0 0 ${
        size * 0.4
      }px rgba(100, 149, 237, 0.4)`,
      mars: `inset -${size * 0.15}px -${size * 0.15}px ${
        size * 0.3
      }px rgba(0, 0, 0, 0.7), inset ${size * 0.08}px ${size * 0.08}px ${
        size * 0.2
      }px rgba(255, 160, 122, 0.3), 0 0 ${size * 0.3}px rgba(220, 20, 60, 0.3)`,
      jupiter: `inset -${size * 0.18}px -${size * 0.18}px ${
        size * 0.35
      }px rgba(0, 0, 0, 0.5), inset ${size * 0.1}px ${size * 0.1}px ${
        size * 0.25
      }px rgba(255, 215, 0, 0.3), 0 0 ${size * 0.5}px rgba(255, 140, 0, 0.4)`,
      saturn: `inset -${size * 0.12}px -${size * 0.12}px ${
        size * 0.25
      }px rgba(0, 0, 0, 0.4), inset ${size * 0.08}px ${size * 0.08}px ${
        size * 0.2
      }px rgba(255, 255, 255, 0.3), 0 0 ${size * 0.4}px rgba(255, 215, 0, 0.4)`,
      neptune: `inset -${size * 0.14}px -${size * 0.14}px ${
        size * 0.28
      }px rgba(0, 0, 0, 0.6), inset ${size * 0.06}px ${size * 0.06}px ${size * 0.18}px rgba(135, 206, 235, 0.4), 0 0 ${
        size * 0.35
      }px rgba(65, 105, 225, 0.5)`,
      venus: `inset -${size * 0.1}px -${size * 0.1}px ${
        size * 0.2
      }px rgba(0, 0, 0, 0.3), inset ${size * 0.05}px ${size * 0.05}px ${
        size * 0.15
      }px rgba(255, 255, 255, 0.4), 0 0 ${size * 0.3}px rgba(255, 215, 0, 0.5)`,
    }
    return shadows[type]
  }

  const getRingStyles = (planet: Planet, ringType: "ring-1" | "ring-2" | "ring-3") => {
    const multipliers = {
      "ring-1": { width: 1.9, height: 0.25, left: -0.45, top: 0.375 },
      "ring-2": { width: 2.3, height: 0.35, left: -0.65, top: 0.325 },
      "ring-3": { width: 2.6, height: 0.4, left: -0.8, top: 0.3 },
    }

    const mult = multipliers[ringType]
    return {
      width: `${planet.size * mult.width}px`,
      height: `${planet.size * mult.height}px`,
      left: `${planet.size * mult.left}px`,
      top: `${planet.size * mult.top}px`,
    }
  }

  // Light theme render
  if (theme === "light") {
    return (
      <div className={`space-background ${theme}-theme`}>
        <div className="base-gradient" />
        <div className="gradient-overlay-1" />
        <div className="gradient-overlay-2" />

        <canvas ref={canvasRef} className="scientific-canvas" />

        <motion.div className="animated-elements" style={{ y: lightBgParallax }}>
          <div className="geometric-shape shape-1" />
          <div className="geometric-shape shape-2" />
          <div className="geometric-shape shape-3" />

          <div className="nebula-gradient nebula-1" />
          <div className="nebula-gradient nebula-2" />
          <div className="nebula-gradient nebula-3" />
        </motion.div>

        <motion.div className="animated-elements" style={{ y: lightBgParallax2 }}>
          <div className="scientific-symbol symbol-1">E=mc²</div>
          <div className="scientific-symbol symbol-2">∇×B=μ₀J</div>
          <div className="scientific-symbol symbol-3">Ψ</div>
          <div className="scientific-symbol symbol-4">∫f(x)dx</div>
          <div className="scientific-symbol symbol-5">∇²φ</div>

          {particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className={`particle particle-${particle.type}`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.8, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
              }}
            />
          ))}

          {dataPoints.map((point) => (
            <motion.div
              key={`datapoint-${point.id}`}
              className="data-point"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
              animate={{
                x: [0, point.driftX, 0],
                y: [0, point.driftY, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: point.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: point.delay,
              }}
            />
          ))}
        </motion.div>

        <div className="contrast-overlay" />
      </div>
    )
  }

  // Dark theme render
  return (
    <div className={`space-background ${theme}-theme`}>
      <div className="deep-space-gradient" />
      <motion.div className="nebula-layer" style={{ y: deepSpaceY }}>
        <div className="nebula nebula-purple" />
        <div className="nebula nebula-pink" />
        <div className="nebula nebula-blue" />
        <div className="nebula nebula-cyan" />
        <div className="nebula nebula-orange" />
      </motion.div>
      {/* Stars */}
      <motion.div className="star-layer" style={{ y: farStarsY }}>
        {stars
          .filter((star) => star.layer === 1)
          .map((star) => (
            <MemoizedStar key={`deep-${star.id}`} star={star} layerY={0} />
          ))}
      </motion.div>
      <motion.div className="star-layer" style={{ y: midStarsY }}>
        {stars
          .filter((star) => star.layer === 2)
          .map((star) => (
            <MemoizedStar key={`mid-${star.id}`} star={star} layerY={0} />
          ))}
      </motion.div>
      {/* Planets */}
      <motion.div className="planet-layer" style={{ y: planetsY }}>
        {planets.map((planet) => (
          <motion.div
            key={planet.id}
            className="planet-container"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
            }}
            animate={{
              x: [
                Math.cos(planet.angle) * planet.orbitRadius,
                Math.cos(planet.angle + Math.PI) * planet.orbitRadius,
                Math.cos(planet.angle) * planet.orbitRadius,
              ],
              y: [
                Math.sin(planet.angle) * planet.orbitRadius * 0.25,
                Math.sin(planet.angle + Math.PI) * planet.orbitRadius * 0.25,
                Math.sin(planet.angle) * planet.orbitRadius * 0.25,
              ],
            }}
            transition={{
              duration: 45 + Math.random() * 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Saturn rings back */}
            {planet.type === "saturn" && (
              <div className="saturn-rings rings-back">
                <div className="ring ring-1" style={getRingStyles(planet, "ring-1")} />
                <div className="ring ring-2" style={getRingStyles(planet, "ring-2")} />
                <div className="ring ring-3" style={getRingStyles(planet, "ring-3")} />
              </div>
            )}

            {/* Planet */}
            <motion.div
              className={`planet ${planet.type}`}
              style={{
                width: `${planet.size}px`,
                height: `${planet.size}px`,
                boxShadow: getPlanetBoxShadow(planet.type, planet.size),
                zIndex: 2,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Saturn rings front */}
            {planet.type === "saturn" && (
              <div className="saturn-rings rings-front">
                <div className="ring ring-1 front" style={getRingStyles(planet, "ring-1")} />
                <div className="ring ring-2 front" style={getRingStyles(planet, "ring-2")} />
                <div className="ring ring-3 front" style={getRingStyles(planet, "ring-3")} />
              </div>
            )}

            {/* Moons */}
            {planet.moons?.map((moon, moonIndex) => (
              <motion.div
                key={moonIndex}
                className="moon-orbit"
                style={{
                  position: "absolute",
                  left: `${planet.size / 2}px`,
                  top: `${planet.size / 2}px`,
                  width: `${moon.distance * 2}px`,
                  height: `${moon.distance * 2}px`,
                  marginLeft: `-${moon.distance}px`,
                  marginTop: `-${moon.distance}px`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12 + moonIndex * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className="moon"
                  style={{
                    position: "absolute",
                    width: `${moon.size}px`,
                    height: `${moon.size}px`,
                    left: `${moon.distance - moon.size / 2}px`,
                    top: `${moon.distance - moon.size / 2}px`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
      {/* Near stars */}
      <motion.div className="star-layer" style={{ y: nearStarsY }}>
        {stars
          .filter((star) => star.layer === 3)
          .map((star) => (
            <MemoizedStar key={`near-${star.id}`} star={star} layerY={0} />
          ))}
      </motion.div>

      {/* Cosmic dust */}
      <motion.div className="star-layer" style={{ y: cosmicDustY }}>
        {[...Array(80)].map(
          (
            _,
            i, // Reduced from 120
          ) => (
            <motion.div
              key={`dust-${i}`}
              className="cosmic-dust"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.03, 0.1],
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 12,
              }}
            />
          ),
        )}
      </motion.div>
    </div>
  )
}
