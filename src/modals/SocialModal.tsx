import InfoModal from '../components/InfoModal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function SocialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <InfoModal open={open} onClose={onClose} title="SOCIAL">
      <Box sx={{ fontSize: { xs: 12, sm: 13 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography component="span" variant="body2" sx={{ minWidth: 80, opacity: 0.7, fontFamily: 'Roboto Mono', fontSize: { xs: 10, sm: 11 } }}>
            GitHub
          </Typography>
          <Link
            href="https://github.com/kmmiio99o"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#78dcff',
              textDecoration: 'none',
              borderBottom: '1px dashed rgba(120,220,255,0.4)',
              '&:hover': { borderBottomStyle: 'solid', color: '#a0e8ff' },
              fontFamily: 'Roboto Mono',
              fontSize: { xs: 11, sm: 12 },
            }}
          >
            kmmiio99o
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography component="span" variant="body2" sx={{ minWidth: 80, opacity: 0.7, fontFamily: 'Roboto Mono', fontSize: { xs: 10, sm: 11 } }}>
            Discord
          </Typography>
          <Link
            href="https://discord.com/users/879393496627306587"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#5865F2',
              textDecoration: 'none',
              borderBottom: '1px dashed rgba(88,101,242,0.4)',
              '&:hover': { borderBottomStyle: 'solid', color: '#7a88ff' },
              fontFamily: 'Roboto Mono',
              fontSize: { xs: 11, sm: 12 },
            }}
          >
            kmmiio99o
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography component="span" variant="body2" sx={{ minWidth: 80, opacity: 0.7, fontFamily: 'Roboto Mono', fontSize: { xs: 10, sm: 11 } }}>
            X (Twitter)
          </Typography>
          <Link
            href="https://x.com/kmmiio99o"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#e1e8ed',
              textDecoration: 'none',
              borderBottom: '1px dashed rgba(225,232,237,0.4)',
              '&:hover': { borderBottomStyle: 'solid', color: '#fff' },
              fontFamily: 'Roboto Mono',
              fontSize: { xs: 11, sm: 12 },
            }}
          >
            kmmiio99o
          </Link>
        </Box>
      </Box>
    </InfoModal>
  )
}
