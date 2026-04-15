'use client';
import React, { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import RepoGridCard from './RepoGridCard';
import RepoListRow from './RepoListRow';
import RepoDetailDrawer from './RepoDetailDrawer';
import { CvQuickAccess } from '../certificates/CertificateVault';
import type { RepoFull } from '../../services/github';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

type SortKey = 'updated' | 'stars' | 'name' | 'forks';

function sortRepos(repos: RepoFull[], key: SortKey): RepoFull[] {
  return [...repos].sort((a, b) => {
    if (key === 'stars') return b.stargazers_count - a.stargazers_count;
    if (key === 'forks') return b.forks_count - a.forks_count;
    if (key === 'name') return a.name.localeCompare(b.name);
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
}

interface Props {
  repos: RepoFull[];
}

const ReposGridClient: React.FC<Props> = ({ repos }) => {
  const [owner, setOwner] = useState<'all' | 'tomas4211' | 'RyuTsuki08'>('all');
  const [sort, setSort] = useState<SortKey>('updated');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<RepoFull | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const nEnt = repos.filter(r => r.owner === 'tomas4211').length;
  const nLabs = repos.filter(r => r.owner === 'RyuTsuki08').length;

  const displayed = useMemo(() => {
    let r = owner === 'all' ? repos : repos.filter(x => x.owner === owner);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        repo =>
          repo.name.toLowerCase().includes(q) ||
          repo.description?.toLowerCase().includes(q) ||
          repo.topics.some(t => t.toLowerCase().includes(q)) ||
          repo.language?.toLowerCase().includes(q)
      );
    }
    return sortRepos(r, sort);
  }, [repos, owner, sort, search]);

  const closeDrawer = () => setSelected(null);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-12 relative overflow-visible">
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="font-mono text-[10px] uppercase tracking-widest text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
              >
                ← Volver
              </a>
            </div>
            <CvQuickAccess />
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <GithubIcon size={18} />
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Repositorios</h1>
          </div>
          <p className="font-mono text-[10px] text-gray-500 tracking-widest mb-4">
            // {view === 'grid' ? 'grid denso' : 'vista lista'} · {repos.length} ítems indexados · enterprise + labs
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 font-mono text-[10px]">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 backdrop-blur-xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span className="text-gray-600">Total</span>
              <span className="text-white tabular-nums font-bold">{repos.length}</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 backdrop-blur-xl border"
              style={{
                background: 'rgba(255,0,255,0.06)',
                borderColor: 'rgba(255,0,255,0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff00ff] shadow-[0_0_8px_#ff00ff]" />
              <span className="text-[#ff00ff]/90">Enterprise</span>
              <span className="text-[#ff00ff] tabular-nums font-bold">{nEnt}</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 backdrop-blur-xl border"
              style={{
                background: 'rgba(0,255,255,0.05)',
                borderColor: 'rgba(0,255,255,0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] shadow-[0_0_8px_#00ffff]" />
              <span className="text-[#00ffff]/90">Labs</span>
              <span className="text-[#00ffff] tabular-nums font-bold">{nLabs}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 items-center text-[10px] font-mono">
          <input
            type="search"
            placeholder="Filtrar nombre, topic, lenguaje…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg outline-none w-full sm:w-56 text-[10px]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          />

          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'tomas4211', 'RyuTsuki08'] as const).map(opt => {
              const active = owner === opt;
              const accent = opt === 'tomas4211' ? '#ff00ff' : opt === 'RyuTsuki08' ? '#00ffff' : undefined;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setOwner(opt)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: active ? (accent ? `${accent}18` : 'rgba(255,255,255,0.08)') : 'transparent',
                    border: `1px solid ${active ? (accent ? `${accent}45` : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.07)'}`,
                    color: active ? accent ?? '#fff' : 'rgba(255,255,255,0.35)',
                    boxShadow: active && accent ? `0 0 12px ${accent}18` : 'none',
                  }}
                >
                  {opt === 'all' ? 'Todos' : opt}
                  <span className="tabular-nums opacity-60">
                    {opt === 'all' ? repos.length : opt === 'tomas4211' ? nEnt : nLabs}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View switcher */}
          <div
            className="flex rounded overflow-hidden border backdrop-blur-md"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <button
              type="button"
              onClick={() => setView('grid')}
              className="px-2.5 py-1 font-mono uppercase tracking-wider transition-colors"
              style={{
                background: view === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: view === 'grid' ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            >
              [GRID]
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className="px-2.5 py-1 font-mono uppercase tracking-wider border-l transition-colors"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: view === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: view === 'list' ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            >
              [LIST]
            </button>
          </div>

          <div className="ml-auto flex gap-1 flex-wrap">
            {(
              [
                ['updated', 'Reciente'],
                ['stars', 'Stars'],
                ['forks', 'Forks'],
                ['name', 'A–Z'],
              ] as [SortKey, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                className="px-2 py-0.5 rounded uppercase tracking-wider"
                style={{
                  background: sort === key ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: `1px solid ${sort === key ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}`,
                  color: sort === key ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="font-mono text-[9px] text-gray-600 mb-3">
          // {displayed.length} visibles · hover = último commit · clic = detalle
        </p>

        <LayoutGroup>
          <AnimatePresence mode="wait" initial={false}>
            {view === 'grid' ? (
              <motion.div
                key="grid"
                role="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="overflow-visible"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 overflow-visible pb-2">
                  {displayed.map((repo, i) => (
                    <RepoGridCard key={repo.html_url} repo={repo} index={i} onOpen={setSelected} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                role="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-1.5 overflow-visible pb-2"
              >
                {displayed.map((repo, i) => (
                  <RepoListRow key={repo.html_url} repo={repo} index={i} onOpen={setSelected} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {displayed.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-gray-600 text-[10px]">// sin resultados para “{search}”</p>
          </div>
        )}
      </div>

      <RepoDetailDrawer repo={selected} onClose={closeDrawer} />
    </div>
  );
};

export default ReposGridClient;
