import { useRef, useEffect, useMemo } from 'react'

interface CRTStyleProps {
  scanlineIntensity?: number
  scanlineThickness?: number
  scanlineSpacing?: number
  vignetteIntensity?: number
  noiseIntensity?: number
  curvature?: number
}

const DEFAULT_CONFIG = {
  scanlineIntensity: 0.15,
  scanlineThickness: 1,
  scanlineSpacing: 4,
  vignetteIntensity: 0.25,
  noiseIntensity: 0.015,
  curvature: 0.01,
}

export default function CRTStyle({
  scanlineIntensity = DEFAULT_CONFIG.scanlineIntensity,
  scanlineThickness = DEFAULT_CONFIG.scanlineThickness,
  scanlineSpacing = DEFAULT_CONFIG.scanlineSpacing,
  vignetteIntensity = DEFAULT_CONFIG.vignetteIntensity,
  noiseIntensity = DEFAULT_CONFIG.noiseIntensity,
  curvature = DEFAULT_CONFIG.curvature,
}: CRTStyleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const fps = 30

  const scanlineStyle = useMemo(() => ({
    position: 'fixed' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    backgroundImage: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent ${scanlineSpacing - scanlineThickness}px,
      rgba(0, 0, 0, ${scanlineIntensity}) ${scanlineSpacing - scanlineThickness}px,
      rgba(0, 0, 0, ${scanlineIntensity}) ${scanlineSpacing}px
    )`,
    mixBlendMode: 'multiply' as const,
    opacity: 1,
  }), [scanlineIntensity, scanlineThickness, scanlineSpacing])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = false

    let vignetteCache: CanvasGradient | null = null
    let lastVignetteSize = 0

    function getVignetteGradient(width: number, height: number): CanvasGradient {
      if (vignetteCache && lastVignetteSize === width) return vignetteCache
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.65
      )
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(0.55, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, `rgba(0,0,0,${vignetteIntensity})`)
      vignetteCache = gradient
      lastVignetteSize = width
      return gradient
    }

    let noiseCache: HTMLCanvasElement | null = null
    function getNoiseTexture(): HTMLCanvasElement {
      if (noiseCache) return noiseCache
      const nCanvas = document.createElement('canvas')
      nCanvas.width = 128
      nCanvas.height = 128
      const nctx = nCanvas.getContext('2d')!
      const imageData = nctx.createImageData(128, 128)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 2 * noiseIntensity * 255
        data[i] = data[i + 1] = data[i + 2] = noise
        data[i + 3] = 25
      }
      nctx.putImageData(imageData, 0, 0)
      noiseCache = nCanvas
      return nCanvas
    }

    function resize() {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function frame(now: number) {
      const frameInterval = 1000 / fps
      if (now - lastTimeRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(frame)
        return
      }
      lastTimeRef.current = now

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(frame)
        return
      }

      ctx.fillStyle = 'rgba(0,0,0,0)'
      ctx.clearRect(0, 0, width, height)

      const vignette = getVignetteGradient(width, height)
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      if (noiseIntensity > 0) {
        const noiseTex = getNoiseTexture()
        ctx.globalAlpha = 0.35
        ctx.drawImage(noiseTex, 0, 0, width, height)
        ctx.globalAlpha = 1
      }

      if (curvature > 0) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        const r = Math.min(width, height) * curvature
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(0, r)
        ctx.arcTo(0, 0, r, 0, r)
        ctx.lineTo(width - r, 0)
        ctx.arcTo(width, 0, width, r, r)
        ctx.lineTo(width, height - r)
        ctx.arcTo(width, height, width - r, height, r)
        ctx.lineTo(r, height)
        ctx.arcTo(0, height, 0, height - r, r)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
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
  }, [vignetteIntensity, noiseIntensity, curvature, fps])

  return (
    <>
      <div style={scanlineStyle} aria-hidden="true" />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        aria-hidden="true"
      />
    </>
  )
}
