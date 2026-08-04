export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  pushed_at: string
  private: boolean
  fork: boolean
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=10&type=owner`)
  if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`)
  const repos = await res.json()
  return repos
    .filter((r: GitHubRepo) => !r.fork && !r.private)
    .sort((a: GitHubRepo, b: GitHubRepo) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 6)
}