import { useRef, useEffect } from 'react'

type Star = {
  tx: number
  ty: number
  x: number
  y: number
  prevX: number
  prevY: number
  size: number
  color: string
  twinkleOffset: number
  alpha?: number
  dead?: boolean
}

const BG = '#071027'
const starColors = ['#e6f1ff', '#d9f0ff', '#cfe8ff']

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = false

    const STAR_DENSITY_DIVISOR = 3000 // lower divisor => more stars
    const MIN_STARS = 200
    const MAX_STARS = 1200
    const MIN_SPACING = 6 // min distance between stars when respawning

    function randomSize() {
      return Math.random() < 0.15 ? 3 : (Math.random() < 0.25 ? 2 : 1)
    }

    function findEmptyPosition(width: number, height: number, exclude?: Star): { x: number; y: number } {
      for (let t = 0; t < 50; t++) {
        const x = Math.random() * width
        const y = Math.random() * height
        let ok = true
        for (const s of starsRef.current) {
          if (exclude && s === exclude) continue
          const dx = s.tx - x
          const dy = s.ty - y
          if (dx * dx + dy * dy < MIN_SPACING * MIN_SPACING) {
            ok = false
            break
          }
        }
        if (ok) return { x, y }
      }
      // fallback
      return { x: Math.random() * width, y: Math.random() * height }
    }

    function createStar(width: number, height: number) {
      const { x: tx, y: ty } = findEmptyPosition(width, height)
      const color = starColors[Math.floor(Math.random() * starColors.length)]
      const size = randomSize()
      const cx = width / 2
      const cy = height / 2
      return { tx, ty, x: cx, y: cy, prevX: cx, prevY: cy, size, color, twinkleOffset: Math.random() * Math.PI * 2, alpha: 1 }
    }

    function initStars(width: number, height: number) {
      const area = width * height
      const count = Math.max(MIN_STARS, Math.min(MAX_STARS, Math.floor(area / STAR_DENSITY_DIVISOR)))
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        stars.push(createStar(width, height))
      }
      starsRef.current = stars
      if (!initializedRef.current) {
        startRef.current = performance.now()
        initializedRef.current = true
      }
    }

    function resize() {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const width = window.innerWidth
      const height = window.innerHeight

      if (!initializedRef.current) {
        initStars(width, height)
      } else {
        starsRef.current.forEach((s) => {
          s.tx = Math.min(s.tx, width)
          s.ty = Math.min(s.ty, height)
        })
        const area = width * height
        const targetCount = Math.max(MIN_STARS, Math.min(MAX_STARS, Math.floor(area / STAR_DENSITY_DIVISOR)))
        if (starsRef.current.length < targetCount) {
          for (let i = starsRef.current.length; i < targetCount; i++) {
            starsRef.current.push(createStar(width, height))
          }
        } else if (starsRef.current.length > targetCount) {
          starsRef.current.length = targetCount
        }
      }
    }

    const WARP_DURATION = 1400

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3)
    }

    function respawnStar(s: Star, width: number, height: number) {
      const pos = findEmptyPosition(width, height, s)
      s.tx = pos.x
      s.ty = pos.y
      s.size = randomSize()
      s.color = starColors[Math.floor(Math.random() * starColors.length)]
      s.twinkleOffset = Math.random() * Math.PI * 2
      s.alpha = 1
      s.dead = false
    }

    let frameCount = 0

    function frame(now: number) {
      if (document.hidden) {
        // pause rendering when not visible to save CPU
        rafRef.current = requestAnimationFrame(frame)
        return
      }

      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(1, elapsed / WARP_DURATION)
      const ease = easeOutCubic(progress)

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)

      // Occasionally mark a random star to fade out
      if (Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * starsRef.current.length)
        const s = starsRef.current[idx]
        if (s && !s.dead) s.dead = true
      }

      frameCount++

      for (const s of starsRef.current) {
        s.prevX = s.x
        s.prevY = s.y

        if (progress < 1) {
          const cx = width / 2
          const cy = height / 2
          const jitter = (Math.sin(s.twinkleOffset + elapsed / 300) * 0.5)
          s.x = cx + (s.tx - cx) * (ease + jitter * 0.01)
          s.y = cy + (s.ty - cy) * (ease + jitter * 0.01)
        } else {
          s.x = s.tx
          s.y = s.ty
        }

        // handle fade-out / respawn
        if (s.dead) {
          s.alpha = (s.alpha ?? 1) - 0.06
          if ((s.alpha ?? 0) <= 0) {
            respawnStar(s, width, height)
            // place it near center to animate in nicely
            s.x = width / 2
            s.y = height / 2
            s.prevX = width / 2
            s.prevY = height / 2
          }
        }

        const dx = s.x - s.prevX
        const dy = s.y - s.prevY
        const dist = Math.hypot(dx, dy)

        // draw trail for larger stars during warp only
        if (dist > 0.5 && progress < 1 && s.size >= 2) {
          ctx.beginPath()
          ctx.moveTo(s.prevX, s.prevY)
          ctx.lineTo(s.x, s.y)
          ctx.strokeStyle = s.color
          ctx.lineWidth = Math.max(1, s.size)
          ctx.lineCap = 'round'
          ctx.globalAlpha = 0.85
          ctx.stroke()
          ctx.globalAlpha = 1
        }

        // twinkle + alpha
        let alpha = s.alpha ?? 1
        if (progress >= 1) {
          const tw = 0.75 + 0.25 * Math.sin((now / 800) + s.twinkleOffset)
          alpha *= tw
        }

        ctx.fillStyle = s.color
        ctx.globalAlpha = alpha
        const ix = Math.round(s.x)
        const iy = Math.round(s.y)
        ctx.fillRect(ix - Math.floor(s.size / 2), iy - Math.floor(s.size / 2), s.size, s.size)
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="canvas-pixelated" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
}
