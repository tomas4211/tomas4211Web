'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star } from 'lucide-react';
import type { RepoFull } from '../../services/github';
import CommitHoverPreview from './CommitHoverPreview';

const ACCENT: Record<string, string> = {
  tomas4211: '#ff00ff',
  RyuTsuki08: '#00ffff',
};

const LABEL: Record<string, string> = {
  tomas4211: 'ENT',
  RyuTsuki08: 'LAB',
};

function relTime(iso: string): string {
  if (!iso) return '—';
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (d <= 0) return 'hoy';
  if (d === 1) return '1d';
  if (d < 30) return `${d}d`;
  const m = Math.floor(d / 30);
  return m < 12 ? `${m}mo` : `${Math.floor(m / 12)}a`;
}

interface Props {
  repo: RepoFull;
  index: number;
  onOpen: (repo: RepoFull) => void;
}

const RepoGridCard: React.FC<Props> = ({ repo, index, onOpen }) => {
  const [hover, setHover] = useState(false);
  const accent = ACCENT[repo.owner] ?? '#00ffff';
  const tier = LABEL[repo.owner] ?? '?';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.02, 0.5), duration: 0.25 }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalle ${repo.name}`}
      onClick={() => onOpen(repo)}
      onKeyDown={e => e.key === 'Enter' && onOpen(repo)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative cursor-pointer rounded-lg overflow-visible text-left font-mono"
      style={{
        filter: hover ? `drop-shadow(0 0 12px ${accent}22)` : undefined,
      }}
    >
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: 'rgba(8,8,12,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${hover ? `${accent}55` : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hover
            ? `0 0 0 1px ${accent}33, 0 0 28px ${accent}14, inset 0 0 20px ${accent}06`
            : 'none',
        }}
      >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.02) 2px,rgba(255,255,255,0.02) 4px)',
        }}
      />
      <div className="relative z-10 p-2.5 flex flex-col gap-1.5 min-h-[88px]">
        <div className="flex items-start justify-between gap-1">
          <span
            className="text-[9px] uppercase tracking-tighter px-1 py-0.5 rounded shrink-0"
            style={{
              background: `${accent}14`,
              border: `1px solid ${accent}35`,
              color: accent,
            }}
          >
            {tier}
          </span>
          <div className="flex items-center gap-1.5 text-[9px] text-gray-600 shrink-0">
            {repo.stargazers_count > 0 && (
              <span className="inline-flex items-center gap-0.5 text-gray-500">
                <Star className="w-2.5 h-2.5" />
                {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="inline-flex items-center gap-0.5">
                <GitFork className="w-2.5 h-2.5" />
                {repo.forks_count}
              </span>
            )}
          </div>
        </div>
        <h3 className="text-[11px] font-bold text-white leading-tight line-clamp-2 break-all">{repo.name}</h3>
        <div className="flex items-end justify-between gap-1 mt-auto pt-0.5">
          <span className="text-[9px] text-gray-600 truncate max-w-[62%]">{repo.language ?? '—'}</span>
          <span className="text-[9px] text-gray-700 tabular-nums">{relTime(repo.pushed_at)}</span>
        </div>
      </div>
      </div>
      <CommitHoverPreview repo={repo} visible={hover} variant="above" />
    </motion.article>
  );
};

export default RepoGridCard;
