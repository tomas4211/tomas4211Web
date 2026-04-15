'use client';
import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import type { TimelineNode } from '../../data/timeline';
import { TIMELINE_ACCENT, TIMELINE_LABEL } from '../../data/timeline';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_MAP: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

// ─── Scanline Layer ───────────────────────────────────────────────────────────

const ScanlineLayer: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="absolute inset-0 pointer-events-none rounded-2xl z-0"
    style={{
      backgroundImage:
        'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.018) 2px,rgba(255,255,255,0.018) 4px)',
      opacity: visible ? 1 : 0.3,
      transition: 'opacity 0.35s',
    }}
  />
);

// ─── Tech Tag Pop ─────────────────────────────────────────────────────────────

const TechTag: React.FC<{ label: string; accent: string; index: number }> = ({
  label,
  accent,
  index,
}) => (
  <motion.span
    key={label}
    initial={{ opacity: 0, scale: 0.7, y: 6 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.7, y: 6 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.045 }}
    className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] select-none"
    style={{
      background: `${accent}14`,
      border: `1px solid ${accent}40`,
      color: `${accent}dd`,
      boxShadow: `0 0 8px ${accent}20`,
    }}
  >
    {label}
  </motion.span>
);

// ─── Academic Badge ───────────────────────────────────────────────────────────

const AcademicBadge: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-widest"
    style={{
      background: `${accent}12`,
      border: `1px solid ${accent}45`,
      color: accent,
    }}
  >
    <span
      className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ background: accent, boxShadow: `0 0 5px ${accent}` }}
    />
    ★ {label}
  </span>
);

// ─── Elite Badge ──────────────────────────────────────────────────────────────

const EliteBadge: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-[10px] uppercase tracking-[0.35em]"
    style={{
      background: 'linear-gradient(135deg, rgba(255,0,255,0.18), rgba(168,85,247,0.12))',
      border: '1px solid rgba(255,0,255,0.5)',
      color: '#ff00ff',
      boxShadow: '0 0 18px rgba(255,0,255,0.25), inset 0 0 12px rgba(255,0,255,0.06)',
    }}
  >
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
    >
      ◈
    </motion.span>
    Elite Training · 240h
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.9 }}
    >
      ◈
    </motion.span>
  </motion.div>
);

// ─── Log Line Prefix ──────────────────────────────────────────────────────────

const LogPrefix: React.FC<{ accent: string }> = ({ accent }) => (
  <span className="font-mono text-sm font-bold" style={{ color: `${accent}bb` }}>
    {'> '}
  </span>
);

// ─── Node Card ────────────────────────────────────────────────────────────────

interface CardProps {
  node: TimelineNode;
  index: number;
  isRight: boolean;
}

const JourneyCard: React.FC<CardProps> = ({ node, index, isRight }) => {
  const [hovered, setHovered] = useState(false);
  const accent = TIMELINE_ACCENT[node.identity];
  const isElite = !!node.isElite;

  const timestamp = `[${node.year}-${MONTH_MAP[node.month] ?? '??'}-01]`;

  return (
    <div
      className={`relative flex items-start gap-4 md:gap-0 flex-row ${
        isRight ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── Desktop spacer (opposite column) ── */}
      <div className="hidden md:block md:flex-1 md:min-w-0" />

      {/* ── Connector dot ── */}
      <div className="hidden md:flex shrink-0 w-12 items-start justify-center pt-5 z-10">
        <motion.div
          className="w-3.5 h-3.5 rounded-full border-2"
          style={{ borderColor: accent, background: hovered ? accent : '#050508' }}
          animate={{
            boxShadow: hovered
              ? `0 0 0 4px ${accent}20, 0 0 20px ${accent}60`
              : `0 0 0 2px ${accent}15, 0 0 8px ${accent}35`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Mobile connector dot ── */}
      <div className="flex md:hidden shrink-0 flex-col items-center pt-4 mr-1">
        <motion.div
          className="w-2.5 h-2.5 rounded-full border"
          style={{ borderColor: accent, background: hovered ? accent : '#050508' }}
          animate={{ boxShadow: hovered ? `0 0 10px ${accent}` : `0 0 4px ${accent}50` }}
        />
        <div className="w-px flex-1 mt-1" style={{ background: `${accent}25` }} />
      </div>

      {/* ── Card ── */}
      <motion.div
        className={`flex-1 md:max-w-[calc(50%-1.5rem)] ${isElite ? 'md:max-w-[calc(50%-1.5rem)]' : ''}`}
        initial={{ opacity: 0, x: isRight ? 36 : -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -4 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: isElite
              ? 'linear-gradient(135deg, rgba(8,4,14,0.92) 0%, rgba(12,4,18,0.92) 100%)'
              : 'rgba(6, 6, 10, 0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: hovered
              ? `1px solid ${accent}65`
              : isElite
              ? '1px solid rgba(255,0,255,0.28)'
              : '1px solid rgba(255,255,255,0.07)',
            boxShadow: hovered
              ? `0 0 32px ${accent}1e, inset 0 0 20px ${accent}06`
              : isElite
              ? '0 0 40px rgba(255,0,255,0.08)'
              : 'none',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}
        >
          <ScanlineLayer visible={hovered} />

          {/* Top neon streak */}
          <div
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              opacity: hovered ? 0.9 : isElite ? 0.35 : 0.15,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Elite: extra vertical glow columns */}
          {isElite && (
            <>
              <div
                className="absolute top-0 bottom-0 left-0 w-px pointer-events-none"
                style={{ background: `linear-gradient(to bottom, transparent, ${accent}33, transparent)` }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-px pointer-events-none"
                style={{ background: `linear-gradient(to bottom, transparent, ${accent}33, transparent)` }}
              />
            </>
          )}

          <div className={`relative z-10 ${isElite ? 'p-6' : 'p-5'} space-y-3`}>

            {/* ── Header row ── */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Timestamp */}
              <span
                className="font-mono font-bold tracking-widest"
                style={{
                  fontSize: isElite ? '0.82rem' : '0.72rem',
                  color: accent,
                  textShadow: hovered ? `0 0 12px ${accent}` : 'none',
                  transition: 'text-shadow 0.3s',
                }}
              >
                {timestamp}
              </span>

              {/* Identity badge */}
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.25em] shrink-0"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}35`,
                  color: accent,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                  style={{
                    background: accent,
                    boxShadow: hovered ? `0 0 6px ${accent}` : 'none',
                    transition: 'box-shadow 0.3s',
                  }}
                />
                {TIMELINE_LABEL[node.identity]}
              </span>
            </div>

            {/* ── Elite badge ── */}
            {isElite && <EliteBadge />}

            {/* ── Academic badge ── */}
            {node.isAcademic && node.academicLabel && !isElite && (
              <AcademicBadge label={node.academicLabel} accent={accent} />
            )}
            {node.isAcademic && node.academicLabel && isElite && (
              <AcademicBadge label={node.academicLabel} accent={accent} />
            )}

            {/* ── Action log ── */}
            <p
              className="font-mono leading-relaxed"
              style={{
                fontSize: isElite ? '0.85rem' : '0.8rem',
                color: '#d1d5db',
              }}
            >
              <LogPrefix accent={accent} />
              {node.actionLog}
            </p>

            {/* ── Tech tags (pop on hover) ── */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-1.5 pt-1"
                >
                  {node.techTags.map((tag, i) => (
                    <TechTag key={tag} label={tag} accent={accent} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom accent bar */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              opacity: hovered ? 0.55 : 0,
              transition: 'opacity 0.35s',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─── Scroll-driven central line ───────────────────────────────────────────────

const JourneyLine: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 60,
    damping: 18,
  });

  return (
    <div
      ref={ref}
      className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-visible"
    >
      {/* Rail */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(0,255,255,0.08) 20%, rgba(255,0,255,0.08) 80%, transparent 100%)',
        }}
      />
      {/* Lit fill */}
      <motion.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(to bottom, #00ffff, #a855f7 50%, #ff00ff)',
        }}
      />
      {/* Glow */}
      <motion.div
        className="absolute inset-x-[-2px] top-0 origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(to bottom, #00ffff66, #ff00ff66)',
          filter: 'blur(5px)',
        }}
      />
      {/* Travelling packet */}
      {[0, 0.55, 1.1, 1.65, 2.2].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
          style={{
            background: i % 2 === 0 ? '#00ffff' : '#ff00ff',
            boxShadow: i % 2 === 0 ? '0 0 8px #00ffff' : '0 0 8px #ff00ff',
          }}
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: '100%', opacity: [0, 1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

// ─── Year marker ──────────────────────────────────────────────────────────────

const YearMarker: React.FC<{ year: number; accent: string }> = ({ year, accent }) => (
  <motion.div
    className="relative flex items-center justify-center z-20 md:absolute md:left-1/2 md:-translate-x-1/2 w-fit mx-auto my-2 md:my-0"
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
  >
    <span
      className="px-3 py-0.5 rounded font-mono text-xs font-black tracking-[0.3em] uppercase"
      style={{
        background: '#050508',
        border: `1px solid ${accent}45`,
        color: accent,
        boxShadow: `0 0 12px ${accent}25`,
      }}
    >
      {year}
    </span>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  nodes: TimelineNode[];
}

const TheJourneyTimeline: React.FC<Props> = ({ nodes }) => {
  // Group by year to render year markers
  const years = [...new Set(nodes.map(n => n.year))];

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 md:px-8 py-16" aria-label="The Journey timeline">

      {/* ── Section header ── */}
      <motion.div
        className="mb-20 space-y-2"
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-gray-700">
          // sequence · log
        </p>
        <h2
          className="text-3xl md:text-5xl font-black"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            style={{
              background: 'linear-gradient(90deg, #00ffff 0%, #a855f7 50%, #ff00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.3))',
            }}
          >
            The Journey
          </span>
        </h2>
        <p className="font-mono text-xs text-gray-600 tracking-widest">
          <span style={{ color: '#00ffff88' }}>labs</span>
          {' · '}
          <span style={{ color: '#ff00ff88' }}>enterprise</span>
          {' · full stack evolution · 2020 → present'}
        </p>
      </motion.div>

      {/* ── Timeline body ── */}
      <div className="relative">
        <JourneyLine />

        <div className="relative flex flex-col pl-10 md:pl-0 gap-0">
          {years.map(year => {
            const yearNodes = nodes.filter(n => n.year === year);
            const firstAccent = TIMELINE_ACCENT[yearNodes[0].identity];
            return (
              <div key={year} className="relative mb-2">
                {/* Year label — positioned on desktop over the timeline */}
                <div className="hidden md:block h-8 relative mb-2">
                  <YearMarker year={year} accent={firstAccent} />
                </div>
                {/* Mobile year label */}
                <div className="md:hidden mb-3 pl-0">
                  <YearMarker year={year} accent={firstAccent} />
                </div>

                {/* Cards for this year */}
                <div className="flex flex-col gap-5 mb-8">
                  {yearNodes.map((node, localIdx) => {
                    const globalIdx = nodes.indexOf(node);
                    const isRight = globalIdx % 2 === 0;
                    return (
                      <JourneyCard
                        key={node.id}
                        node={node}
                        index={globalIdx}
                        isRight={isRight}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.div
        className="mt-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #00ffff)' }} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: '#a855f7' }}
          >
            ◆
          </span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #ff00ff)' }} />
        </div>
        <p className="font-mono text-[10px] text-gray-700 tracking-[0.4em] uppercase">
          journey · ongoing
        </p>
      </motion.div>
    </section>
  );
};

export default TheJourneyTimeline;
