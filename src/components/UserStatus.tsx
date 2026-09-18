import { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface UserStatusProps {
  statusText: string
  username: string
  customStatus?: string
  guildTag?: string | null
  guildIcon?: string | undefined
}

function MarqueeStatus({ text }: { text: string }) {
  const [offset, setOffset] = useState(0)
  const [, setShouldMarquee] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const directionRef = useRef(-1)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const startAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      setOffset((prev) => {
        const containerWidth = containerRef.current?.offsetWidth || 0
        const textWidth = textRef.current?.offsetWidth || 0
        const leftBoundary = containerWidth - textWidth
        const rightBoundary = 0

        let next = prev + directionRef.current * 1.5
        let reachedBoundary = false

        if (next <= leftBoundary && directionRef.current === -1) {
          next = leftBoundary
          reachedBoundary = true
        } else if (next >= rightBoundary && directionRef.current === 1) {
          next = rightBoundary
          reachedBoundary = true
        }

        if (reachedBoundary) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          timeoutRef.current = window.setTimeout(() => {
            directionRef.current = directionRef.current * -1
            startAnimation()
          }, 1000)
        }

        return next
      })
    }, 100)
  }

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const textWidth = textRef.current.offsetWidth

    if (textWidth > containerWidth) {
      setShouldMarquee(true)
      directionRef.current = -1
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      startAnimation()
    } else {
      setShouldMarquee(false)
      setOffset(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text])

  return (
    <span
      ref={containerRef}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'block',
        width: '100%',
      }}
    >
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          transform: `translateX(${offset}px)`,
        }}
      >
        {text}
      </span>
    </span>
  )
}

export default function UserStatus({ statusText, username, customStatus, guildTag, guildIcon }: UserStatusProps) {
  const isOffline = statusText === 'offline'
  const displayStatus = isOffline ? 'offline' : customStatus

  return (
    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: { xs: 12, sm: 15 }, fontFamily: 'Press Start 2P', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', '@media (max-width: 600px)': { fontSize: '12px !important' } }}>
          {username}
        </Typography>
        {guildTag && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, ml: 0.5, px: 0.4, py: 0.08, borderRadius: 0.5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(120,220,255,0.04)' }}>
            {guildIcon ? (
              <img src={guildIcon} alt={String(guildTag)} style={{ width: '0.75em', height: '0.75em', objectFit: 'cover', borderRadius: 2, verticalAlign: 'middle' }} />
            ) : (
              <svg width="0.6em" height="0.6em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', verticalAlign: 'middle' }}>
                <path d="M20 3H4C3.44772 3 3 3.44772 3 4V20L7 17H20C20.5523 17 21 16.5523 21 16V4C21 3.44772 20.5523 3 20 3Z" fill="#7289da" />
                <path d="M7 10C7 10 8.2 8 11 8C13.8 8 15 10 15 10M7 14C7 14 8.2 12 11 12C13.8 12 15 14 15 14" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <Box sx={{ color: '#d6eaff', fontSize: { xs: 9, sm: 10 }, px: 0.4, fontFamily: 'Roboto Mono', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              {guildTag}
            </Box>
          </Box>
        )}
      </Box>

      {displayStatus && (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            component="span"
            sx={{ fontSize: { xs: 11, sm: 12 }, opacity: isOffline ? 0.5 : 0.85, fontFamily: 'Roboto Mono', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', display: 'block' }}
          >
            <MarqueeStatus text={displayStatus} />
          </Typography>
        </Box>
      )}
    </Box>
  )
}
