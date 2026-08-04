import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface ControlButtonsProps {
  onOpen: (key: 'bio' | 'socials' | 'projects') => void
}

export default function ControlButtons({ onOpen }: ControlButtonsProps) {
  const buttons = [
    { key: 'bio' as const, label: 'BIO' },
    { key: 'socials' as const, label: 'SOCIAL' },
    { key: 'projects' as const, label: 'PROJECTS' },
  ] as const

  return (
    <Box sx={{ display: 'flex', gap: 1, width: '100%', flexWrap: 'wrap' }}>
      {buttons.map(({ key, label }) => (
        <Button
          key={key}
          variant="contained"
          onClick={() => onOpen(key)}
          sx={{
            flex: '1 1 100px',
            minWidth: { xs: 'calc(50% - 4px)', sm: 110 },
            minHeight: { xs: 44, sm: 36 },
            py: { xs: 1.5, sm: 1 },
            fontSize: { xs: 11, sm: 12 },
            fontFamily: 'Press Start 2P',
            letterSpacing: '0.5px',
            textTransform: 'none',
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  )
}
