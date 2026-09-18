import Box from '@mui/material/Box'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

export default function PowerButton({ onPowerOff }: { onPowerOff: () => void }) {
  return (
    <Box sx={{ position: 'fixed', right: 12, bottom: 12, zIndex: 10010, pointerEvents: 'auto' }}>
      <button
        onClick={onPowerOff}
        aria-label="power off"
        title="POWER"
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          background: 'rgba(3,12,30,0.85)',
          border: '2px solid rgba(120,220,255,0.25)',
          color: '#78dcff',
          borderRadius: 0,
          cursor: 'pointer',
          padding: 0,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 5,
          letterSpacing: '0.5px',
          transition: 'border-color 0.2s, color 0.2s',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'manipulation',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#78dcff'
          e.currentTarget.style.color = '#a0e8ff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(120,220,255,0.25)'
          e.currentTarget.style.color = '#78dcff'
        }}
      >
        <PowerSettingsNewIcon sx={{ fontSize: 15 }} />
        <span>PWR</span>
      </button>
    </Box>
  )
}