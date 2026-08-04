import { useEffect, useState } from 'react'
import { fetchLanyard } from '../api/lanyard'

export interface LanyardData {
  discord_user: {
    id: string
    username: string
    discriminator: string
    avatar: string | null
    public_flags: number
    display_name?: string
    avatar_decoration_data?: { asset?: string }
    primary_guild?: {
      identity_guild_id?: string
      tag?: string
      icon?: string | null
      badge?: string
      identity_enabled?: boolean
    }
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Array<{
    type: number
    name: string
    details?: string
    state?: string
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
    application_id?: string
    timestamps?: {
      start?: number
      end?: number
    }
  }>
}

export interface UseLanyardReturn {
  loading: boolean
  data: LanyardData | null
  error: string | null
}

export function useLanyard(userId: string): UseLanyardReturn {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<LanyardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function fetchOnce() {
    try {
      const json = await fetchLanyard(userId)
      setData(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOnce()
    const id = setInterval(fetchOnce, 3_000)
    return () => clearInterval(id)
  }, [userId])

  return { loading, data, error }
}