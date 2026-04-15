'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GitCommitHorizontal } from 'lucide-react';
import type { RepoFull } from '../../services/github';

const ACCENT: Record<string, string> = {
  tomas4211: '#ff00ff',
  RyuTsuki08: '#00ffff',
};

interface Props {
  repo: RepoFull;
  visible: boolean;
  /** grid: arriba · list: debajo */
  variant?: 'above' | 'below';
}

const CommitHoverPreview: React.FC<Props> = ({ repo, visible, variant = 'above' }) => {
  const commit = repo.recentCommits[0];
  const accent = ACCENT[repo.owner] ?? '#00ffff';
  const pos =
    variant === 'above'
      ? 'bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2'
      : 'top-[calc(100%+6px)] left-0';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, y: variant === 'above' ? 6 : -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: variant === 'above' ? 4 : -4, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className={`absolute z-[60] w-[min(100vw-2rem,280px)] pointer-events-none ${pos}`}
        >
          <div
            className="rounded-lg px-2.5 py-2 font-mono text-[9px] leading-snug backdrop-blur-xl border shadow-xl"
            style={{
              background: 'rgba(6,8,14,0.82)',
              borderColor: `${accent}40`,
              boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${accent}18`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-1" style={{ color: accent }}>
              <GitCommitHorizontal className="w-3 h-3 shrink-0" />
              <span className="uppercase tracking-widest text-[8px]">HEAD · último commit</span>
            </div>
            {commit ? (
              <>
                <p className="text-[#00ffff]/90 font-mono text-[9px] mb-0.5">{commit.sha}</p>
                <p className="text-gray-200 line-clamp-3">{commit.message}</p>
                {commit.authorLogin && (
                  <p className="text-gray-600 mt-1">@{commit.authorLogin}</p>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">// sin commits en índice</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommitHoverPreview;
