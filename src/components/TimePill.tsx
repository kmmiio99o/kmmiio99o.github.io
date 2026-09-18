import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function TimePill() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        padding: '5px 8px',
        border: '2px solid rgba(120,220,255,0.2)',
        background: 'rgba(3,12,30,0.92)',
        pointerEvents: 'none',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: '"Press Start 2P", monospace',
          color: '#d6eaff',
          fontSize: { xs: 8, sm: 9 },
          lineHeight: 1,
        }}
      >
        {time}
      </Typography>
    </Box>
  )
}