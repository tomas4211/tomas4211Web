import React from 'react';
import GithubCard from './GithubCard';
import type { Repo } from '../../services/github';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number }> = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

interface Props {
  featured: Repo[];
  total: number;
  enterprise: number;
  labs: number;
}

function isHeroRepo(r: Repo): boolean {
  return r.owner === 'tomas4211' && r.name.toLowerCase() === 'tomas4211web';
}

const GithubPreviewSection: React.FC<Props> = ({ featured, total, enterprise, labs }) => {
  return (
    <div>
      {/* Contador unificado Enterprise vs Labs */}
      <div
        className="mb-8 flex flex-wrap items-stretch gap-3 font-mono text-[10px] uppercase tracking-widest"
        role="status"
        aria-live="polite"
      >
        <div
          className="flex items-center gap-3 rounded-lg px-4 py-3 backdrop-blur-xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <span className="text-gray-600">Repos</span>
          <span className="text-white tabular-nums text-sm font-bold">{total}</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-3 backdrop-blur-xl"
          style={{
            background: 'rgba(255,0,255,0.06)',
            border: '1px solid rgba(255,0,255,0.22)',
            boxShadow: '0 0 24px rgba(255,0,255,0.06)',
          }}
        >
          <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ background: '#ff00ff', boxShadow: '0 0 8px #ff00ff' }} />
          <span className="text-[#ff00ff]/80">Enterprise</span>
          <span className="text-[#ff00ff] tabular-nums text-sm font-bold">{enterprise}</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-3 backdrop-blur-xl"
          style={{
            background: 'rgba(0,255,255,0.05)',
            border: '1px solid rgba(0,255,255,0.22)',
            boxShadow: '0 0 24px rgba(0,255,255,0.06)',
          }}
        >
          <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ background: '#00ffff', boxShadow: '0 0 8px #00ffff' }} />
          <span className="text-[#00ffff]/80">Labs</span>
          <span className="text-[#00ffff] tabular-nums text-sm font-bold">{labs}</span>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((repo, i) => (
            <GithubCard key={repo.html_url} repo={repo} index={i} isHero={isHeroRepo(repo)} />
          ))}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-8 pt-36 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgb(3,4,6) 72%)' }}
        >
          <a
            href="/repos"
            className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(0,255,255,0.08)';
              el.style.borderColor = 'rgba(0,255,255,0.45)';
              el.style.color = '#00ffff';
              el.style.boxShadow = '0 0 28px rgba(0,255,255,0.18)';
              el.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.04)';
              el.style.borderColor = 'rgba(255,255,255,0.15)';
              el.style.color = 'rgba(255,255,255,0.9)';
              el.style.boxShadow = 'none';
              el.style.transform = 'none';
            }}
          >
            <GithubIcon size={12} />
            <span className="uppercase tracking-[0.14em]">Ver todos los repositorios</span>
            <Arrow />
            <span
              className="px-1.5 py-0.5 rounded-full text-[9px] tabular-nums"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}
            >
              {total}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GithubPreviewSection;
