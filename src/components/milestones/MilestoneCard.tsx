import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Milestone } from '../../data/projects';
import { IDENTITY_ACCENT } from '../../data/projects';

// ─── Academic stamp ──────────────────────────────────────────────────────────

const AcademicStamp: React.FC<{ accent: string }> = ({ accent }) => (
  <span
    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[9px] opacity-50"
    style={{ border: `1px solid ${accent}40`, color: accent }}
    title="Desarrollado durante el 3er semestre TSU en Informática · IUJO"
  >
    ★ IUJO · TSU S3
  </span>
);

// ─── Modal ───────────────────────────────────────────────────────────────────

const MilestoneModal: React.FC<{ milestone: Milestone; accent: string; onClose: () => void }> = ({
  milestone,
  accent,
  onClose,
}) => {
  // Lock scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.95, y: 24  }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="fixed inset-4 md:inset-[7%] lg:inset-[10%] z-50 flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(6,6,8,0.97)',
          border: `1px solid ${accent}45`,
          boxShadow: `0 0 60px ${accent}15`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 shrink-0 border-b" style={{ borderColor: `${accent}20` }}>
          <div className="space-y-1">
            {/* Identity badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.3em]"
              style={{ background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accent }} />
              {milestone.identity} · @{milestone.account}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {milestone.title}
            </h2>
            <p className="font-mono text-xs" style={{ color: `${accent}88` }}>{milestone.role}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <a
              href={`https://github.com/${milestone.account}`}
              target="_blank" rel="noopener"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:brightness-125"
              style={{ background: `${accent}12`, border: `1px solid ${accent}38`, color: accent }}
            >
              <ExternalLink size={11} /> GitHub
            </a>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X size={15} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7">

          {/* Gallery placeholder */}
          <div
            className="w-full rounded-xl flex items-center justify-center font-mono text-xs text-gray-700"
            style={{ aspectRatio: '16/5', background: '#080808', border: `1px solid ${accent}14` }}
          >
            // screenshots coming soon
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent }}>Descripción</h3>
            <p className="text-gray-300 text-sm font-mono leading-relaxed">{milestone.description}</p>
          </div>

          {/* Challenge / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: '## challenge', text: milestone.details.challenge },
              { label: '## solution',  text: milestone.details.solution  },
            ].map(({ label, text }) => (
              <div
                key={label}
                className="rounded-xl p-4 space-y-2"
                style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${accent}1a` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: `${accent}88` }}>{label}</p>
                <p className="font-mono text-xs text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="space-y-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent }}>Stack</h3>
            <div className="flex flex-wrap gap-2">
              {milestone.stack.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}28`, color: `${accent}cc` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Status + Academic stamp */}
          <div className="flex items-center justify-between pt-2">
            <span
              className="px-3 py-1 rounded-lg font-mono text-xs font-semibold"
              style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent }}
            >
              {milestone.status}
            </span>
            <AcademicStamp accent={accent} />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-px shrink-0" style={{ background: `linear-gradient(to right,transparent,${accent},transparent)` }} />
      </motion.div>
    </>
  );
};

// ─── Card ────────────────────────────────────────────────────────────────────

interface Props {
  milestone: Milestone;
  index: number;
}

const MilestoneCard: React.FC<Props> = ({ milestone, index }) => {
  const [hovered, setHovered] = useState(false);
  const [open,    setOpen]    = useState(false);
  const accent = IDENTITY_ACCENT[milestone.identity];

  return (
    <>
      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.45 }}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${milestone.title}`}
        onClick={() => setOpen(true)}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: 'rgba(6,6,8,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: hovered ? `1px solid ${accent}60` : `1px solid rgba(255,255,255,0.08)`,
          boxShadow: hovered ? `0 0 32px ${accent}18, inset 0 0 24px ${accent}06` : 'none',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
        whileTap={{ scale: 0.985 }}
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.025) 2px,rgba(255,255,255,0.025) 4px)',
            opacity: hovered ? 0.8 : 0.2,
          }}
        />

        {/* Top neon line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right,transparent,${accent},transparent)`,
            opacity: hovered ? 0.85 : 0.15,
          }}
        />

        {/* ── Content layer — slides DOWN on hover ──────── */}
        <motion.div
          animate={{ y: hovered ? 12 : 0, opacity: hovered ? 0.35 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative z-10 p-6 flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.3em] w-fit"
                style={{ background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
                {milestone.identity}
              </span>
              <span className="font-mono text-[10px] text-gray-600">@{milestone.account}</span>
            </div>
            <span
              className="shrink-0 px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold"
              style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent }}
            >
              {milestone.status}
            </span>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <h3
              className="font-bold text-lg leading-tight text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {milestone.title}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: `${accent}99` }}>
              {milestone.role}
            </p>
            <p className="text-gray-400 text-sm font-mono leading-relaxed line-clamp-2 pt-1">
              {milestone.description}
            </p>
          </div>

          {/* Tech strip */}
          <div className="flex flex-wrap gap-1.5">
            {milestone.stack.slice(0, 5).map(t => (
              <span
                key={t}
                className="px-2 py-0.5 rounded font-mono text-[10px]"
                style={{ background: `${accent}0e`, border: `1px solid ${accent}28`, color: `${accent}cc` }}
              >
                {t}
              </span>
            ))}
            {milestone.stack.length > 5 && (
              <span className="px-2 py-0.5 rounded font-mono text-[10px] text-gray-600" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                +{milestone.stack.length - 5}
              </span>
            )}
          </div>

          {/* Academic stamp */}
          <div className="flex justify-end">
            <AcademicStamp accent={accent} />
          </div>
        </motion.div>

        {/* ── Hover CTA overlay ──────────────────────────── */}
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
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${accent}`, boxShadow: `0 0 24px ${accent}55` }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <span className="text-xl" style={{ color: accent }}>↗</span>
              </motion.div>
              <p
                className="font-mono text-sm font-semibold uppercase tracking-[0.25em]"
                style={{ color: accent, textShadow: `0 0 16px ${accent}` }}
              >
                Haz click para ver más
              </p>
              <p className="font-mono text-[10px] text-gray-500">
                challenge · solution · stack
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <MilestoneModal
            key="modal"
            milestone={milestone}
            accent={accent}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MilestoneCard;
