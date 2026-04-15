export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  owner: string;
  visibility: string;
  license: string | null;
  default_branch: string;
}

export interface RepoCommit {
  sha: string;
  message: string;
  date: string;
  authorLogin: string | null;
}

export interface RepoWithReadme extends Repo {
  readme: string | null;
}

export interface RepoFull extends RepoWithReadme {
  readmeHtml: string | null;
  languages: Record<string, number>;
  recentCommits: RepoCommit[];
}

// ─── HTTP ─────────────────────────────────────────────────────────────────────

const GH_JSON = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'Christian-Paez-Portfolio',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripMarkdown(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 700);
}

async function fetchReadmePlain(owner: string, name: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, {
      headers: GH_JSON,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: string };
    if (!data.content) return null;
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    return stripMarkdown(decoded) || null;
  } catch {
    return null;
  }
}

async function fetchReadmeHtml(owner: string, name: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, {
      headers: {
        Accept: 'application/vnd.github.html',
        'User-Agent': GH_JSON['User-Agent'],
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    return html.trim() || null;
  } catch {
    return null;
  }
}

async function fetchLanguages(owner: string, name: string): Promise<Record<string, number>> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}/languages`, {
      headers: GH_JSON,
    });
    if (!res.ok) return {};
    return (await res.json()) as Record<string, number>;
  } catch {
    return {};
  }
}

async function fetchRecentCommits(
  owner: string,
  name: string,
  perPage = 8
): Promise<RepoCommit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${name}/commits?per_page=${perPage}`,
      { headers: GH_JSON }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      sha?: string;
      commit?: { message?: string; author?: { date?: string } };
      author?: { login?: string } | null;
    }>;
    return data.map(c => ({
      sha: (c.sha ?? '').slice(0, 7),
      message: (c.commit?.message ?? '').split('\n')[0] ?? '',
      date: c.commit?.author?.date ?? '',
      authorLogin: c.author?.login ?? null,
    }));
  } catch {
    return [];
  }
}

function mapRepo(r: Record<string, unknown>, ownerLogin: string): Repo {
  const license = r.license as { spdx_id?: string; name?: string } | null | undefined;
  return {
    name: String(r.name ?? ''),
    description: (r.description as string | null) ?? null,
    html_url: String(r.html_url ?? ''),
    stargazers_count: Number(r.stargazers_count ?? 0),
    forks_count: Number(r.forks_count ?? 0),
    language: (r.language as string | null) ?? null,
    topics: Array.isArray(r.topics) ? (r.topics as string[]) : [],
    pushed_at: String(r.pushed_at ?? ''),
    owner: ownerLogin,
    visibility: String(r.visibility ?? 'public'),
    license: license?.spdx_id || license?.name || null,
    default_branch: String(r.default_branch ?? 'main'),
  };
}

// ─── Unified repo list (landing + shared) ─────────────────────────────────────

export async function getUnifiedProjects(): Promise<Repo[]> {
  const users = ['RyuTsuki08', 'tomas4211'];
  try {
    const pages = await Promise.all(
      users.map(user =>
        fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`, {
          headers: GH_JSON,
        }).then(r => r.json())
      )
    );
    const all: Repo[] = pages.flat().map((raw: Record<string, unknown>) => {
      const owner = (raw.owner as { login?: string })?.login ?? '';
      return mapRepo(raw, owner);
    });
    return all.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count)
        return b.stargazers_count - a.stargazers_count;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
  } catch {
    return [];
  }
}

/**
 * Full repo payloads for /repos: plain readme, rendered HTML, languages, recent commits.
 * Batched to stay within anonymous GitHub API rate limits during build.
 */
export async function getReposPageData(): Promise<RepoFull[]> {
  const repos = await getUnifiedProjects();
  const batchSize = 6;
  const out: RepoFull[] = [];

  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize);
    const enriched = await Promise.all(
      batch.map(async repo => {
        const [readme, readmeHtml, languages, recentCommits] = await Promise.all([
          fetchReadmePlain(repo.owner, repo.name),
          fetchReadmeHtml(repo.owner, repo.name),
          fetchLanguages(repo.owner, repo.name),
          fetchRecentCommits(repo.owner, repo.name, 8),
        ]);
        return {
          ...repo,
          readme,
          readmeHtml,
          languages,
          recentCommits,
        } satisfies RepoFull;
      })
    );
    out.push(...enriched);
  }

  return out;
}
