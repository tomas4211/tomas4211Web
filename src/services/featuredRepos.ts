import type { Repo } from './github';

const HERO_NAME = 'tomas4211web';

/**
 * Exactly 3 repos for the landing preview: hero (tomas4211/tomas4211Web) first when present,
 * then remaining Enterprise (tomas4211), then Labs (RyuTsuki08) by stars / recency.
 */
export function selectFeaturedRepos(repos: Repo[]): Repo[] {
  const key = (r: Repo) => `${r.owner}/${r.name}`;

  const hero = repos.find(
    r => r.owner === 'tomas4211' && r.name.toLowerCase() === HERO_NAME
  );

  const sortTier = (a: Repo, b: Repo) => {
    if (b.stargazers_count !== a.stargazers_count)
      return b.stargazers_count - a.stargazers_count;
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  };

  const enterprise = repos
    .filter(r => r.owner === 'tomas4211' && (!hero || key(r) !== key(hero)))
    .sort(sortTier);

  const labs = repos.filter(r => r.owner === 'RyuTsuki08').sort(sortTier);

  const out: Repo[] = [];
  const seen = new Set<string>();

  const push = (r: Repo | undefined) => {
    if (!r) return;
    const k = key(r);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(r);
  };

  push(hero);
  for (const r of enterprise) {
    if (out.length >= 3) break;
    push(r);
  }
  for (const r of labs) {
    if (out.length >= 3) break;
    push(r);
  }

  return out.slice(0, 3);
}
