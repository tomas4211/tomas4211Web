'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitFork, Star, Clock } from 'lucide-react';

// Inline GitHub Octocat SVG (lucide-react has no Github icon)
const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
import type { Repo } from '../../services/github';

// ─── Constants ────────────────────────────────────────────────────────────────

const IDENTITY_ACCENT: Record<string, string> = {
  tomas4211: '#ff00ff',
  RyuTsuki08: '#00ffff',
};

const IDENTITY_LABEL: Record<string, string> = {
  tomas4211:  'Enterprise // tomas4211',
  RyuTsuki08: 'Labs // RyuTsuki08',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.floor(months / 12)}a`;
}

// ─── Scanlines ────────────────────────────────────────────────────────────────

const Scanlines: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="absolute inset-0 pointer-events-none rounded-2xl"
    style={{
      backgroundImage:
        'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.018) 2px,rgba(255,255,255,0.018) 4px)',
      opacity: visible ? 0.9 : 0.25,
      transition: 'opacity 0.4s',
    }}
  />
);

// ─── Tech tag ─────────────────────────────────────────────────────────────────

const Tag: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <span
    className="px-2 py-0.5 rounded font-mono text-[10px]"
    style={{
      background: `${accent}0e`,
      border: `1px solid ${accent}28`,
      color: `${accent}cc`,
    }}
  >
    {label}
  </span>
);

// ─── Single Repo Card ─────────────────────────────────────────────────────────

interface CardProps {
  repo: Repo;
  index: number;
  /** Landing hero: arquitectura base (tomas4211Web) — borde y glow reforzados */
  isHero?: boolean;
}

const GithubCard: React.FC<CardProps> = ({ repo, index, isHero = false }) => {
  const [hovered, setHovered] = useState(false);
  const accent  = IDENTITY_ACCENT[repo.owner] ?? '#00ffff';
  const label   = IDENTITY_LABEL[repo.owner]  ?? repo.owner;

  // Combine language + topics as tech tags (max 5 visible)
  const allTags = [
    ...(repo.language ? [repo.language] : []),
    ...repo.topics,
  ];
  const visibleTags = allTags.slice(0, 5);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.4 }}
        role="button"
        tabIndex={0}
        aria-label={`Ver repositorio ${repo.name} en GitHub`}
        onClick={() => window.open(repo.html_url, '_blank', 'noopener')}
        onKeyDown={e => e.key === 'Enter' && window.open(repo.html_url, '_blank', 'noopener')}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: 'rgba(6,6,8,0.72)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: isHero
            ? `1px solid ${accent}55`
            : hovered
              ? `1px solid ${accent}60`
              : `1px solid rgba(255,255,255,0.07)`,
          boxShadow: isHero
            ? `0 0 0 1px ${accent}22, 0 0 40px ${accent}20, inset 0 0 32px ${accent}08`
            : hovered
              ? `0 0 32px ${accent}18, inset 0 0 24px ${accent}05`
              : 'none',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
        whileTap={{ scale: 0.985 }}
      >
        <Scanlines visible={hovered} />

        {/* Top neon line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right,transparent,${accent},transparent)`,
            opacity: hovered ? 0.85 : 0.15,
          }}
        />

        {/* ── Content — slides down on hover ── */}
        <motion.div
          animate={{ y: hovered ? 10 : 0, opacity: hovered ? 0.3 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative z-10 p-5 flex flex-col gap-4"
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              {/* Identity badge */}
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.28em] w-fit"
                style={{
                  background: `${accent}14`,
                  border: `1px solid ${accent}35`,
                  color: accent,
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
                />
                {label}
              </span>
              <span className="font-mono text-[10px] text-gray-600 flex items-center gap-1">
                <GithubIcon size={9} />
                github.com/{repo.owner}
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              {repo.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-gray-500">
                  <Star size={9} />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-gray-600">
                  <GitFork size={9} />
                  {repo.forks_count}
                </span>
              )}
            </div>
          </div>

          {/* Repo name */}
          <div className="space-y-1">
            {isHero && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[8px] uppercase tracking-[0.35em] w-fit mb-1"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}40`,
                  color: accent,
                  textShadow: `0 0 8px ${accent}66`,
                }}
              >
                ● Hero · Arquitectura actual
              </span>
            )}
            <h3
              className="font-bold text-lg leading-tight text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {repo.name}
            </h3>
            {repo.description && (
              <p className="font-mono text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                {repo.description}
              </p>
            )}
          </div>

          {/* Tech tags + last push */}
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleTags.map(tag => (
              <Tag key={tag} label={tag} accent={accent} />
            ))}
            {allTags.length > 5 && (
              <span
                className="px-2 py-0.5 rounded font-mono text-[10px] text-gray-600"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                +{allTags.length - 5}
              </span>
            )}
            {repo.pushed_at && (
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] text-gray-700">
                <Clock size={8} />
                {relativeTime(repo.pushed_at)}
              </span>
            )}
          </div>
        </motion.div>

        {/* ── Hover CTA overlay ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 pointer-events-none"
            >
              {/* Pulsing ring */}
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${accent}`, boxShadow: `0 0 20px ${accent}55` }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ExternalLink size={16} style={{ color: accent }} />
              </motion.div>
              <p
                className="font-mono text-sm font-semibold uppercase tracking-[0.22em]"
                style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
              >
                Ver en GitHub
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </>
  );
};

export default GithubCard;
