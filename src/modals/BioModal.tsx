import InfoModal from '../components/InfoModal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'Press Start 2P',
          fontSize: { xs: 7, sm: 8 },
          textTransform: 'uppercase',
          color: '#78dcff',
          mb: 1,
          display: 'block',
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ fontSize: { xs: 11, sm: 12 }, lineHeight: 1.7, color: '#d6eaff' }}>{children}</Box>
    </Box>
  )
}

function LangChips({ langs }: { langs: string[] }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {langs.map((lang) => (
        <Chip
          key={lang}
          label={lang}
          size="small"
          variant="outlined"
          tabIndex={-1}
          onFocus={(e) => e.target.blur()}
          sx={{
            borderColor: 'rgba(120,220,255,0.3)',
            color: '#d6eaff',
            '&:hover': { borderColor: '#78dcff' },
            fontSize: { xs: 9, sm: 10 },
            height: { xs: 26, sm: 28 },
            fontFamily: 'Roboto Mono',
            pointerEvents: { xs: 'none', sm: 'auto' },
            userSelect: 'none',
          }}
        />
      ))}
    </Box>
  )
}

export default function BioModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <InfoModal open={open} onClose={onClose} title="BIO">
      <Box sx={{ fontSize: { xs: 12, sm: 13 } }}>
        <Section title="BORN">
          <Typography component="p" variant="body2">
            28 May 2010 — grew up with boxed software, CD covers, dial‑up sounds, and minimal web pages that shaped this aesthetic.
          </Typography>
        </Section>

        <Section title="LANGUAGES">
          <LangChips langs={['TypeScript', 'JavaScript', 'C#', 'Kotlin', 'CSS', 'HTML']} />
        </Section>

        <Section title="DAILY DRIVER">
          <Typography component="p" variant="body2">
            <Link
              href="https://zed.dev"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#78dcff',
                textDecoration: 'none',
                borderBottom: '1px dashed rgba(120,220,255,0.4)',
                '&:hover': { borderBottomStyle: 'solid', color: '#a0e8ff' },
              }}
            >
              Zed Editor
            </Link>{' '}
            — fast, native, collaborative. No Electron bloat.
          </Typography>
        </Section>

        <Section title="DESIGN TASTE">
          <Typography component="p" variant="body2">
            Material 3 Expressive for polished UI, retro/CRT aesthetics for soul. Neon on midnight, blocky corners, scanlines — the intersection of modern system design and 90s terminal nostalgia.
          </Typography>
        </Section>

        <Section title="VIBE">
          <Typography component="p" variant="body2">
            Compact, efficient tools. Neon on midnight. Less framework, more craft.
          </Typography>
        </Section>
      </Box>
    </InfoModal>
  )
}