import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

export default function CenterStack({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = theme.breakpoints.down('sm')

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 1.5 : 2,
        overflowY: isMobile ? 'auto' : 'hidden',
      }}
      className="center-stack-mobile"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? 2 : 1.5,
          width: '100%',
          maxWidth: 420,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}