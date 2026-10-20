'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  accent?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  id?: string;
  /** Fracción visible cuando está colapsado, entre 0 y 1 (default 0.30) */
  peekFraction?: number;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  accent = '#ff00ff',
  defaultOpen = false,
  children,
  id,
  peekFraction = 0.30,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState<number>(0);

  /* Measure the real height after mount / resize */
  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setFullHeight(innerRef.current.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  const peekHeight = fullHeight > 0 ? fullHeight * peekFraction : 120;
  const currentHeight = open ? fullHeight : peekHeight;

  return (
    <div id={id} className="relative">
      {/* ── Clipping wrapper ───────────────────────────────────────────── */}
      <motion.div
        animate={{ height: currentHeight || 'auto' }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <div ref={innerRef}>
          {children}
        </div>

        {/* Fade gradient — only visible when collapsed */}
        <AnimatePresence>
          {!open && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-0 inset-x-0 pointer-events-none"
              style={{
                height: '55%',
                background: `linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.82) 55%, #050505 100%)`,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Toggle button ─────────────────────────────────────────────── */}
      <div className="relative flex justify-center" style={{ marginTop: open ? '8px' : '-32px', zIndex: 10 }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.04]"
          style={{
            background: `rgba(5,5,5,0.85)`,
            border: `1px solid ${accent}45`,
            color: accent,
            boxShadow: `0 0 20px ${accent}18, 0 2px 12px rgba(0,0,0,0.5)`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ display: 'flex' }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.span>
          <span>{open ? 'Ver menos' : 'Ver más'}</span>
        </button>
      </div>
    </div>
  );
};

export default CollapsibleSection;
