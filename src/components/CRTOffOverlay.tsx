import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'

type Phase = 'mount' | 'flash' | 'collapse' | 'fade' | 'hold'

export default function CRTOffOverlay({ onReboot }: { onReboot: () => void }) {
  const [phase, setPhase] = useState<Phase>('mount')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const t = window.setTimeout(onReboot, 250)
      return () => clearTimeout(t)
    }
    const timers: number[] = [
      window.setTimeout(() => setPhase('flash'), 20),
      window.setTimeout(() => setPhase('collapse'), 300),
      window.setTimeout(() => setPhase('fade'), 680),
      window.setTimeout(() => setPhase('hold'), 960),
      window.setTimeout(() => onReboot(), 1550),
    ]
    return () => timers.forEach((t) => clearTimeout(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const shrunk = phase === 'collapse' || phase === 'fade' || phase === 'hold'
  const visible = phase === 'flash' || phase === 'collapse'

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 10002,
        background: '#000',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: '#cfe2ff',
          transformOrigin: '50% 50%',
          opacity: visible ? 1 : 0,
          transform: shrunk ? 'scaleY(0.02)' : 'scaleY(1)',
          transition: 'opacity 250ms linear, transform 370ms cubic-bezier(0.55, 0.06, 0.68, 0.19)',
        }}
      />
    </Box>
  )
}