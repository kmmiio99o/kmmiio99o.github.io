import { useEffect, useState } from 'react'
import { fetchGitHubRepos, GitHubRepo } from '../api/github'

export function useGitHubRepos(username: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<GitHubRepo[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const repos = await fetchGitHubRepos(username)
        if (!cancelled) setData(repos)
      } catch (e: any) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [username])

  return { loading, data, error }
}