'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, X, GitCommitHorizontal } from 'lucide-react';
import type { RepoFull } from '../../services/github';

const ACCENT: Record<string, string> = {
  tomas4211: '#ff00ff',
  RyuTsuki08: '#00ffff',
};

const TIER: Record<string, string> = {
  tomas4211: 'Enterprise · tomas4211',
  RyuTsuki08: 'Labs · RyuTsuki08',
};

function languageBars(langs: Record<string, number>): { name: string; pct: number }[] {
  const entries = Object.entries(langs).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, n]) => s + n, 0);
  if (total === 0) return [];
  return entries.map(([name, bytes]) => ({ name, pct: Math.round((bytes / total) * 1000) / 10 }));
}

function commitDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('es-VE', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

interface Props {
  repo: RepoFull | null;
  onClose: () => void;
}

const RepoDetailDrawer: React.FC<Props> = ({ repo, onClose }) => {
  const accent = repo ? ACCENT[repo.owner] ?? '#00ffff' : '#fff';

  useEffect(() => {
    if (!repo) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [repo, onClose]);

  useEffect(() => {
    document.body.style.overflow = repo ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [repo]);

  return (
    <AnimatePresence mode="popLayout">
      {repo && (
        <>
          <motion.button
            key={`${repo.html_url}-bd`}
            type="button"
            aria-label="Cerrar panel"
            className="fixed inset-0 z-[80] cursor-default border-0"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key={`${repo.html_url}-panel`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="repo-drawer-title"
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-2xl flex flex-col shadow-2xl font-mono overflow-hidden"
            style={{
              background: 'rgba(6,6,10,0.72)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderLeft: `1px solid ${accent}30`,
              boxShadow: `-24px 0 80px rgba(0,0,0,0.5), 0 0 0 1px ${accent}18`,
            }}
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            {/* Header */}
            <div
              className="shrink-0 flex items-start justify-between gap-3 p-4 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="min-w-0 space-y-1">
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${accent}14`,
                    border: `1px solid ${accent}40`,
                    color: accent,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
                  {TIER[repo.owner] ?? repo.owner}
                </span>
                <h2 id="repo-drawer-title" className="text-lg font-black text-white truncate pr-2">
                  {repo.name}
                </h2>
                <p className="text-[10px] text-gray-600 truncate">{repo.html_url.replace('https://', '')}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-transform hover:scale-105"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}35`,
                    color: accent,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-5">
              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-[10px]">
                <span className="inline-flex items-center gap-1 text-gray-400">
                  <Star className="w-3.5 h-3.5 text-gray-500" />
                  {repo.stargazers_count} stars
                </span>
                <span className="inline-flex items-center gap-1 text-gray-400">
                  <GitFork className="w-3.5 h-3.5 text-gray-500" />
                  {repo.forks_count} forks
                </span>
              </div>

              {/* Información técnica */}
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-2">Información técnica</h3>
                <div
                  className="rounded-lg p-3 space-y-2 text-[10px] backdrop-blur-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-gray-600">Rama por defecto</span>
                    <span className="text-gray-300">{repo.default_branch}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-gray-600">Licencia</span>
                    <span className="text-gray-300">{repo.license ?? '—'}</span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-gray-600">Visibilidad</span>
                    <span className="text-gray-300">{repo.visibility}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block mb-2">Tech stack (bytes)</span>
                    <div className="space-y-1.5">
                      {languageBars(repo.languages).length === 0 ? (
                        <span className="text-gray-700">Sin datos de lenguajes</span>
                      ) : (
                        languageBars(repo.languages).map(row => (
                          <div key={row.name} className="flex items-center gap-2">
                            <span className="text-gray-500 w-24 shrink-0 truncate">{row.name}</span>
                            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: accent }}
                                initial={{ width: 0 }}
                                animate={{ width: `${row.pct}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                              />
                            </div>
                            <span className="text-gray-600 w-10 text-right tabular-nums">{row.pct}%</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  {repo.topics.length > 0 && (
                    <div className="pt-1">
                      <span className="text-gray-600 block mb-1.5">Topics</span>
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.map(t => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px]"
                            style={{
                              border: `1px solid ${accent}28`,
                              color: `${accent}bb`,
                              background: `${accent}08`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* README */}
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-2">README.md</h3>
                <div
                  className="rounded-lg p-3 text-[11px] leading-relaxed overflow-x-auto max-h-[42vh] overflow-y-auto readme-html"
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: `1px solid ${accent}20`,
                  }}
                >
                  {repo.readmeHtml ? (
                    <div
                      className="readme-html text-gray-300 [&_a]:text-[#58a6ff] [&_code]:text-[#00ffff] [&_pre]:bg-black/40 [&_pre]:p-2 [&_pre]:rounded"
                      dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
                    />
                  ) : repo.readme ? (
                    <p className="text-gray-400 whitespace-pre-wrap">{repo.readme}</p>
                  ) : (
                    <p className="text-gray-600 italic">// sin README disponible</p>
                  )}
                </div>
              </section>

              {/* Commits */}
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-2 flex items-center gap-2">
                  <GitCommitHorizontal className="w-3.5 h-3.5" />
                  Commits recientes
                </h3>
                <ul className="space-y-2">
                  {repo.recentCommits.length === 0 ? (
                    <li className="text-[10px] text-gray-700">// sin commits en la ventana consultada</li>
                  ) : (
                    repo.recentCommits.map(c => (
                      <li
                        key={c.sha + c.date}
                        className="text-[10px] rounded border border-white/5 p-2 flex flex-col gap-0.5"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <div className="flex justify-between gap-2 text-gray-600">
                          <span className="text-[#00ffff]/80 font-mono">{c.sha}</span>
                          <span className="shrink-0">{commitDate(c.date)}</span>
                        </div>
                        <p className="text-gray-300 line-clamp-2">{c.message}</p>
                        {c.authorLogin && (
                          <span className="text-gray-600">@{c.authorLogin}</span>
                        )}
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default RepoDetailDrawer;
