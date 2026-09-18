import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Phase = 'signal' | 'init' | 'on'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('signal')

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }
    const timers: number[] = []
    timers.push(window.setTimeout(() => setPhase('init'), 600))
    timers.push(window.setTimeout(() => setPhase('on'), 1800))
    timers.push(window.setTimeout(() => onDone(), 2400))
    return () => timers.forEach((t) => clearTimeout(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 10001,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: phase === 'on' ? 'boot-flicker 0.6s linear forwards' : 'none',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          px: 3,
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {phase === 'signal' && (
          <Box
            sx={{
              display: 'inline-block',
              px: { xs: 2.5, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              border: { xs: '2px solid rgba(214,234,255,0.85)', sm: '3px solid rgba(214,234,255,0.85)' },
              background: 'rgba(214,234,255,0.04)',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#d6eaff',
                fontSize: { xs: 13, sm: 20 },
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                animation: 'boot-blink 1.1s step-end infinite',
              }}
            >
              NO SIGNAL
            </Typography>
          </Box>
        )}

        {phase === 'init' && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"Press Start 2P", monospace',
                  color: '#78dcff',
                  fontSize: { xs: 8.5, sm: 12 },
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                }}
              >
                INITIALIZING CRT&hellip;
              </Typography>
              <span className="retro-cursor" style={{ width: 6, height: 11 }} />
            </Box>
            <Box
              sx={{
                mt: 2,
                width: { xs: 110, sm: 160 },
                height: { xs: 10, sm: 12 },
                mx: 'auto',
                border: '2px solid rgba(120,220,255,0.4)',
                background: '#000',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  background: '#78dcff',
                  animation: 'boot-fill 1.05s linear forwards',
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
