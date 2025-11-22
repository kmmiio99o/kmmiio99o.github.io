// api/github.ts

export interface GitHubRepoData {
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  name: string;
  description: string;
  language: string;
}

export class GithubFetch {
  private static readonly BASE_URL = "https://api.github.com";

  static async getRepoData(
    owner: string,
    repo: string,
  ): Promise<GitHubRepoData | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/repos/${owner}/${repo}`);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        stargazers_count: data.stargazers_count,
        updated_at: data.updated_at,
        html_url: data.html_url,
        name: data.name,
        description: data.description,
        language: data.language,
      };
    } catch (error) {
      console.error(`Failed to fetch GitHub data for ${owner}/${repo}:`, error);
      return null;
    }
  }

  static async getMultipleRepos(
    repos: Array<{ owner: string; repo: string }>,
  ): Promise<Record<string, GitHubRepoData>> {
    const results: Record<string, GitHubRepoData> = {};

    // Use Promise.allSettled to handle individual failures
    const promises = repos.map(async ({ owner, repo }) => {
      const data = await this.getRepoData(owner, repo);
      if (data) {
        results[`${owner}/${repo}`] = data;
      }
    });

    await Promise.allSettled(promises);
    return results;
  }

  static async getUserRepos(username: string): Promise<GitHubRepoData[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/users/${username}/repos?sort=updated&per_page=10`,
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data.map((repo: any) => ({
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        html_url: repo.html_url,
        name: repo.name,
        description: repo.description,
        language: repo.language,
      }));
    } catch (error) {
      console.error(`Failed to fetch user repos for ${username}:`, error);
      return [];
    }
  }
}
