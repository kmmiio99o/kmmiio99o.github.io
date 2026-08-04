import { useLanyard, LanyardData } from '../hooks/useLanyard'
import Box from '@mui/material/Box'
import UserAvatar from './UserAvatar'
import UserStatus from './UserStatus'
import ControlButtons from './ControlButtons'

const DISCORD_ID = '879393496627306587'
const USERNAME = 'kmmiio99o'

function getStatusInfo(data: LanyardData | null) {
  const user = data?.discord_user
  const avatarHash = user?.avatar
  const isAnimated = avatarHash?.startsWith('a_')
  const avatarUrl = avatarHash
    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${avatarHash}.${isAnimated ? 'gif' : 'png'}?size=128`
    : undefined
  const status = data?.discord_status || 'offline'

  const statusText = status === 'online' ? 'online' : status === 'dnd' ? 'do not disturb' : status === 'idle' ? 'idle' : 'offline'
  const ringColor = status === 'online' ? '#3ba55d' : status === 'dnd' ? '#f04747' : status === 'idle' ? '#faa61a' : '#6b7280'

  // Get custom status (type 4)
  const customStatus = data?.activities?.find((a) => a.type === 4)?.state

  // Primary guild tag (e.g., 'MONO')
  const guildTag = user?.primary_guild?.tag
  let guildIcon: string | undefined
  // If lanyard provides a badge and guild id, construct the clan-badges CDN URL
  if (user?.primary_guild?.identity_guild_id && user.primary_guild.badge) {
    const gid = user.primary_guild.identity_guild_id
    const badge = user.primary_guild.badge
    guildIcon = `https://cdn.discordapp.com/clan-badges/${gid}/${badge}.png?size=64`
  }

  return { avatarUrl, statusText, ringColor, customStatus, guildTag, guildIcon }
}

export default function ControlPanel({ onOpen }: { onOpen: (key: 'bio' | 'socials' | 'projects') => void }) {
  const { data } = useLanyard(DISCORD_ID)
  const { avatarUrl, statusText, ringColor, customStatus, guildTag, guildIcon } = getStatusInfo(data)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
        <UserAvatar avatarUrl={avatarUrl} ringColor={ringColor} />
        <UserStatus statusText={statusText} username={USERNAME} customStatus={customStatus} guildTag={guildTag} guildIcon={guildIcon} />
      </Box>

      <ControlButtons onOpen={onOpen} />
    </Box>
  )
}
