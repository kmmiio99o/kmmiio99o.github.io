import InfoModal from '../components/InfoModal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

function RepoCard({ repo }: { repo: { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; pushed_at: string } }) {
  const date = new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <Box
      sx={{
        border: '1px solid rgba(120,220,255,0.12)',
        p: 1.5,
        position: 'relative',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: 'rgba(120,220,255,0.3)' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#78dcff',
            textDecoration: 'none',
            fontWeight: 600,
            fontFamily: 'Roboto Mono',
            fontSize: 12,
            flex: 1,
            borderBottom: '1px dashed transparent',
            '&:hover': { borderBottomStyle: 'dashed', borderBottomColor: 'rgba(120,220,255,0.4)' },
          }}
        >
          {repo.name}
        </Link>
        <Typography variant="caption" sx={{ opacity: 0.5, fontFamily: 'Roboto Mono', fontSize: 10, whiteSpace: 'nowrap', ml: 1 }}>
          {date}
        </Typography>
      </Box>
      {repo.description && (
        <Typography variant="body2" sx={{ fontSize: 11, opacity: 0.8, mb: 1, lineHeight: 1.5 }}>
          {repo.description}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {repo.language && (
          <Chip
            label={repo.language}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'rgba(120,220,255,0.3)',
              color: '#78dcff',
              fontSize: 9,
              height: 22,
              fontFamily: 'Roboto Mono',
            }}
          />
        )}
        <Chip
          label={repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : 'No stars'}
          size="small"
          variant="outlined"
          sx={{
            borderColor: 'rgba(250,166,26,0.4)',
            color: '#faa61a',
            fontSize: 9,
            height: 22,
            fontFamily: 'Roboto Mono',
          }}
        />
      </Box>
    </Box>
  )
}

export default function ProjectsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { loading, data, error } = useGitHubRepos('kmmiio99o')

  return (
    <InfoModal open={open} onClose={onClose} title="PROJECTS">
      <Box sx={{ fontSize: { xs: 12, sm: 13 } }}>
        {loading && (
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center', py: 3 }}>
            Loading repositories…
          </Typography>
        )}
        {error && (
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center', py: 3, color: '#f04747' }}>
            Failed to load: {error}
          </Typography>
        )}
        {!loading && !error && data && data.length === 0 && (
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center', py: 3 }}>
            No public repositories found.
          </Typography>
        )}
        {!loading && !error && data && data.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </Box>
        )}
      </Box>
    </InfoModal>
  )
}
