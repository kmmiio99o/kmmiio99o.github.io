import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

interface UserAvatarProps {
  avatarUrl: string | undefined
  ringColor: string
}

export default function UserAvatar({ avatarUrl, ringColor }: UserAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // For privacy browsers like Ironfox, try to load with different strategies
  const handleError = () => {
    setImgError(true)
  }

  const handleLoad = () => {
    setImgLoaded(true)
  }

  // Don't render img if we already know it fails
  if (!avatarUrl || imgError) {
    return (
      <Box
        sx={{
          width: 56,
          height: 56,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${ringColor}`,
          flexShrink: 0,
        }}
      >
        <Box sx={{ width: 56, height: 56, background: 'rgba(120,220,255,0.04)' }} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `3px solid ${ringColor}`,
        flexShrink: 0,
      }}
    >
      <img
        src={avatarUrl}
        alt="avatar"
        width={50}
        height={50}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        style={{ display: 'block', objectFit: 'cover', borderRadius: 0 }}
        onError={handleError}
        onLoad={handleLoad}
      />
    </Box>
  )
}