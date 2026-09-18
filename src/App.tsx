import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Starfield from './components/Starfield'
import CenterStack from './components/CenterStack'
import ControlPanel from './components/ControlPanel'
import ActivityBox from './components/ActivityBox'
import BioModal from './modals/BioModal'
import SocialModal from './modals/SocialModal'
import ProjectsModal from './modals/ProjectsModal'
import CRTStyle from './components/CRTStyle'
import TimePill from './components/TimePill'

const DISCORD_ID = '879393496627306587'

export default function App() {
  const [open, setOpen] = useState<'bio' | 'socials' | 'projects' | null>(null)

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <CRTStyle
        scanlineIntensity={0.15}
        scanlineThickness={1}
        scanlineSpacing={4}
        vignetteIntensity={0.25}
        noiseIntensity={0.015}
        curvature={0.01}
      />

      <CenterStack>
        <Paper
          elevation={0}
          className="retro-paper"
          sx={{ width: { xs: 'calc(100% - 16px)', sm: 420 }, px: { xs: 2, sm: 2 }, py: { xs: 2, sm: 2 } }}
        >
          <ControlPanel onOpen={(k) => setOpen(k)} />
        </Paper>

        <Paper
          elevation={0}
          className="retro-paper"
          sx={{ width: { xs: 'calc(100% - 16px)', sm: 420 }, px: { xs: 2, sm: 1.5 }, py: { xs: 2, sm: 1.5 } }}
        >
          <ActivityBox userId={DISCORD_ID} />
        </Paper>
      </CenterStack>

      <BioModal open={open === 'bio'} onClose={() => setOpen(null)} />
      <SocialModal open={open === 'socials'} onClose={() => setOpen(null)} />
      <ProjectsModal open={open === 'projects'} onClose={() => setOpen(null)} />

      <TimePill />
    </Box>
  )
}
