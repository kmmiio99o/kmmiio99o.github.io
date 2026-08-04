import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close'

export default function InfoModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mounted, setMounted] = useState(false)
  const [animate, setAnimate] = useState(false)
  const paperRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => setAnimate(true))
    } else if (animate) {
      setAnimate(false)
      const t = setTimeout(() => setMounted(false), 400)
      return () => clearTimeout(t)
    }
  }, [open, animate])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStartRef.current) return
    const deltaX = e.touches[0].clientX - touchStartRef.current.x
    const deltaY = e.touches[0].clientY - touchStartRef.current.y

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault()
      if (paperRef.current) {
        paperRef.current.style.transform = `translateX(${Math.max(0, deltaX)}px) scaleY(1)`
        paperRef.current.style.transition = 'none'
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !touchStartRef.current) return
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartRef.current.x
    const deltaY = (e.changedTouches[0]?.clientY ?? 0) - touchStartRef.current.y

    if (paperRef.current) {
      paperRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out'
    }

    if (deltaX > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
      onClose()
    } else {
      if (paperRef.current) {
        paperRef.current.style.transform = 'translateX(0) scaleY(1)'
      }
    }
    touchStartRef.current = null
  }

  if (!mounted) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullScreen={false}
      disablePortal
      transitionDuration={0}
      slotProps={{ backdrop: { transitionDuration: 0 } }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          padding: { xs: 1, sm: 2 },
        },
        '& .MuiBackdrop-root': {
          opacity: animate ? 0.8 : 0,
          transition: 'opacity 0.3s ease-out',
        },
        '& .MuiPaper-root': {
          border: '4px solid rgba(120,220,255,0.14)',
          borderRadius: 0,
          px: { xs: 1.5, sm: 2 },
          backgroundColor: 'rgba(2,10,22,0.98)',
          opacity: animate ? 1 : 0,
          transform: animate ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'center',
          transition: 'opacity 0.3s ease-out, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          maxWidth: { xs: 'calc(100% - 16px)', sm: '440px' },
          width: { xs: '100%', sm: 'auto' },
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: { xs: '85vh', sm: '90vh' },
        },
        '& .MuiDialogContent-root': {
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: { xs: '75vh', sm: '80vh' },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Press Start 2P',
          fontSize: { xs: 10, sm: 12 },
          px: 1,
          py: 1.5,
          color: '#78dcff',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          opacity: animate ? 1 : 0,
          transform: animate ? 'none' : 'translateY(-10px)',
          transition: 'opacity 0.2s ease-out 0.1s, transform 0.2s ease-out 0.1s',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              margin: '-8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#78dcff',
              opacity: 1,
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'manipulation',
              outline: 'none',
            }}
            aria-label="close"
          >
            <CloseIcon sx={{ width: 18, height: 18 }} />
          </button>
        )}
      </DialogTitle>
      <DialogContent dividers sx={{ px: { xs: 1.5, sm: 1 }, pb: 1, minWidth: 0, overflow: 'hidden' }}>
        <div
          ref={paperRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.2s ease-out 0.2s, transform 0.2s ease-out 0.2s',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            touchAction: isMobile ? 'pan-y' : 'auto',
          }}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
