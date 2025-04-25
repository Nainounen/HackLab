import { useEffect, useRef } from 'react'

export default function InteractiveParticles() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const hueShift = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Create initial particle array
    let particles = Array.from({ length: 120 }, () => createParticle())

    // Helper to create a single particle
    function createParticle() {
      const startX = Math.random() * width
      const startY = Math.random() * height
      return {
        x: startX,
        y: startY,
        startX,
        startY,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1,
      }
    }

    // Main animation loop
    const update = () => {
      ctx.clearRect(0, 0, width, height)

      // Base hue is violet (~270°)
      const baseHue = 270
      hueShift.current = (hueShift.current + 0.3) % 10 // Subtle hue shift
      const currentHue = baseHue + hueShift.current

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(${currentHue}, 100%, 70%, ${1 - dist / 100})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      // Update and draw each particle
      particles.forEach((p) => {
        // Apply mouse repulsion force
        const dxMouse = mouse.current.x - p.x
        const dyMouse = mouse.current.y - p.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < 120) {
          const force = (120 - distMouse) / 120
          p.vx += (dxMouse / distMouse) * force * 0.2
          p.vy += (dyMouse / distMouse) * force * 0.2
        }

        // Apply pull back to origin
        const dxOrigin = p.startX - p.x
        const dyOrigin = p.startY - p.y
        p.vx += dxOrigin * 0.005
        p.vy += dyOrigin * 0.005

        // Apply velocity damping
        p.vx *= 0.92
        p.vy *= 0.92

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${currentHue}, 100%, 70%, 0.7)`
        ctx.shadowColor = `hsl(${currentHue}, 100%, 70%)`
        ctx.shadowBlur = 8
        ctx.fill()
      })

      requestAnimationFrame(update)
    }

    update()

    // Update canvas size and particles on resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      particles = Array.from({ length: 120 }, () => createParticle())
    }

    // Update mouse coordinates
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  )
}
