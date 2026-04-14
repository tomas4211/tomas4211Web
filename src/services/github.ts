export interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: string;
}

export async function getUnifiedProjects(): Promise<Repo[]> {
  const users = ['RyuTsuki08', 'tomas4211'];
  
  try {
    const fetchPromises = users.map(user => 
      fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=5`)
        .then(res => res.json())
    );

    const results = await Promise.all(fetchPromises);
    const allRepos: Repo[] = results.flat().map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      owner: repo.owner.login
    }));

    // Sort by stars or recent activity
    return allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
