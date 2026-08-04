import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLanyard } from '../hooks/useLanyard'

function extractImageUrl(assets: { large_image?: string; large_text?: string; application_id?: string } | undefined): string | undefined {
  if (!assets?.large_image) return undefined
  const url = assets.large_image
  if (url.startsWith('mp:external/')) {
    return url.replace('mp:external/', 'https://media.discordapp.net/external/')
  }
  if (assets.application_id) {
    return `https://cdn.discordapp.com/app-assets/${assets.application_id}/${url}.png`
  }
  return url
}

function formatMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function MarqueeText({ children, speed = 50, pause = 2000 }: { children: React.ReactNode; speed?: number; pause?: number }) {
  const [shouldMarquee, setShouldMarquee] = useState(false)
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ref.current || !contentRef.current) return
    const containerWidth = ref.current.offsetWidth
    const contentWidth = contentRef.current.offsetWidth
    if (contentWidth > containerWidth) {
      setShouldMarquee(true)
    } else {
      setShouldMarquee(false)
      setOffset(0)
    }
  }, [])

  useEffect(() => {
    if (!shouldMarquee) return
    const contentWidth = contentRef.current?.offsetWidth || 0
    const containerWidth = ref.current?.offsetWidth || 0
    const totalDistance = contentWidth + containerWidth

    const animate = () => {
      setOffset(prev => {
        const next = prev - 0.5
        if (Math.abs(next) >= totalDistance) {
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
          pauseTimeoutRef.current = window.setTimeout(() => setOffset(0), pause)
          return 0
        }
        return next
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [shouldMarquee, pause])

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '100%',
        verticalAlign: 'middle',
      }}
    >
      <span
        ref={contentRef}
        style={{
          display: 'inline-block',
          transform: `translateX(${offset}px)`,
          willChange: 'transform',
        }}
      >
        {children}
        {shouldMarquee && <span style={{ display: 'inline-block', width: '2rem' }} />}
      </span>
    </div>
  )
}

function SimpleText({ children }: { children: React.ReactNode }) {
  return <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100%', verticalAlign: 'middle' }}>{children}</span>
}

export default function ActivityBox({ userId }: { userId: string }) {
  const { loading, data } = useLanyard(userId)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const activity = data?.activities?.find((a) => a.type === 0 || a.type === 2) || null
  const imageUrl = extractImageUrl(activity?.assets)

  const start = activity?.timestamps?.start
  const end = activity?.timestamps?.end
  const hasTimestamps = typeof start === 'number' && typeof end === 'number' && end > start

  const progress = hasTimestamps
    ? Math.min(1, Math.max(0, (now - start) / (end - start)))
    : null

  const elapsedMs = hasTimestamps ? now - start : null
  const totalMs = hasTimestamps ? end - start : null
  const remainingMs = hasTimestamps ? Math.max(0, end - now) : null

  return (
    <Box
      sx={{
        width: '100%',
        p: { xs: 2, sm: 1.5 },
        border: '2px solid rgba(120,220,255,0.08)',
        background: 'rgba(10,20,36,0.6)',
        fontSize: { xs: 11, sm: 12 },
        fontFamily: 'Roboto Mono',
      }}
      className="activity-box-mobile"
    >
      {loading && (
        <Typography component="p" variant="body2" sx={{ opacity: 0.6 }}>
          Loading activity…
        </Typography>
      )}
      {!loading && !activity && (
        <Typography component="p" variant="body2" sx={{ opacity: 0.5 }}>
          Not playing or listening to anything.
        </Typography>
      )}
      {!loading && activity && (
        <div>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            {imageUrl && (
              <Box sx={{ flexShrink: 0, width: { xs: 64, sm: 69 }, height: { xs: 64, sm: 69 }, borderRadius: 0, overflow: 'hidden', border: '1px solid rgba(120,220,255,0.12)' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: 0,
                  }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                <Typography component="p" variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                  {activity.name}
                </Typography>
              </Box>
              {activity.details && (
                <Typography component="p" variant="body2" sx={{ opacity: 0.9, mb: 0.25 }}>
                  <SimpleText>{activity.details}</SimpleText>
                </Typography>
              )}
              {activity.state && (
                <Typography component="p" variant="body2" sx={{ opacity: 0.7, fontSize: { xs: 10, sm: 11 } }}>
                  <SimpleText>{activity.state}</SimpleText>
                </Typography>
              )}
            </Box>
          </Box>
          {hasTimestamps && (
            <Box sx={{ mt: 1.5, width: '100%' }}>
              <Box
                sx={{
                  height: 4,
                  background: 'rgba(120,220,255,0.1)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(progress ?? 0) * 100}%`,
                    background: '#78dcff',
                    transition: 'width 1s linear',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.6, fontFamily: 'Roboto Mono' }}>
                <Typography variant="caption">
                  {elapsedMs !== null ? formatMs(elapsedMs) : '0:00'}
                </Typography>
                <Typography variant="caption">
                  {totalMs !== null ? formatMs(totalMs) : '—'}
                </Typography>
                <Typography variant="caption" sx={{ color: remainingMs !== null && remainingMs < 30000 ? '#f04747' : 'inherit' }}>
                  {remainingMs !== null ? `-${formatMs(remainingMs)}` : '—'}
                </Typography>
              </Box>
            </Box>
          )}
        </div>
      )}
    </Box>
  )
}
