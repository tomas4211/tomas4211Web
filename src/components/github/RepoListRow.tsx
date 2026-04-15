'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
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

interface Props {
  repo: RepoFull;
  index: number;
  onOpen: (repo: RepoFull) => void;
}

const RepoListRow: React.FC<Props> = ({ repo, index, onOpen }) => {
  const [hover, setHover] = useState(false);
  const accent = ACCENT[repo.owner] ?? '#00ffff';
  const tier = LABEL[repo.owner] ?? '?';
  const desc = repo.description?.replace(/\s+/g, ' ').trim() || '// sin descripción';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.35), duration: 0.22 }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(repo)}
      onKeyDown={e => e.key === 'Enter' && onOpen(repo)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full cursor-pointer rounded-lg font-mono text-[10px] overflow-visible"
      style={{
        background: 'rgba(8,8,12,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hover ? `${accent}45` : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hover ? `0 0 24px ${accent}10` : 'none',
      }}
    >
      <div className="relative flex items-center gap-2 sm:gap-3 px-2.5 py-2 min-h-[36px]">
        <span
          className="shrink-0 px-1 py-0.5 rounded text-[9px] uppercase"
          style={{
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
            color: accent,
          }}
        >
          {tier}
        </span>
        <span className="shrink-0 font-bold text-white truncate max-w-[28%] sm:max-w-none">{repo.name}</span>
        <span className="shrink-0 text-gray-500 w-16 sm:w-20 truncate">{repo.language ?? '—'}</span>
        <span className="shrink-0 inline-flex items-center gap-0.5 text-gray-500 tabular-nums w-10 justify-end">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="min-w-0 flex-1 text-gray-500 truncate border-l border-white/5 pl-2 sm:pl-3">
          {desc}
        </span>
      </div>
      <CommitHoverPreview repo={repo} visible={hover} variant="below" />
    </motion.div>
  );
};

export default RepoListRow;
