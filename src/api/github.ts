export interface GitHubRepoData {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  fork: boolean;
  topics: string[];
}

export interface GitHubUserData {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const API_BASE = "https://api.github.com";
const PER_PAGE = 30;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export class GithubFetch {
  static async getUserData(username: string): Promise<GitHubUserData> {
    return fetchJson<GitHubUserData>(`${API_BASE}/users/${username}`);
  }

  static async getUserRepos(username: string): Promise<GitHubRepoData[]> {
    return fetchJson<GitHubRepoData[]>(
      `${API_BASE}/users/${username}/repos?per_page=${PER_PAGE}&sort=updated`,
    );
  }

  static async getRepoData(
    owner: string,
    repo: string,
  ): Promise<GitHubRepoData> {
    return fetchJson<GitHubRepoData>(`${API_BASE}/repos/${owner}/${repo}`);
  }

  static async getMultipleRepos(
    repos: Array<{ owner: string; repo: string }>,
  ): Promise<GitHubRepoData[]> {
    return Promise.all(
      repos.map((r) => GithubFetch.getRepoData(r.owner, r.repo)),
    );
  }
}
