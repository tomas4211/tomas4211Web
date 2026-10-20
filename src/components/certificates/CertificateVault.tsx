'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FileText, Lock, X, Zap } from 'lucide-react';
import DecryptTitle from '../ui/DecryptTitle';
import { CERTIFICATES, CV_PDF_PATH, type Certificate } from '../../data/certificates';

const ACCENT: Record<'enterprise' | 'labs', string> = {
  enterprise: '#ff00ff',
  labs: '#00ffff',
};

/* ─── Thumbnail ─────────────────────────────────────────────────────────── */
function CertThumb({ cert, accent }: { cert: Certificate; accent: string }) {
  const [bad, setBad] = useState(false);
  if (!cert.thumb || bad) {
    return (
      <div
        className="h-full w-full flex items-center justify-center font-mono text-2xl font-black"
        style={{
          background: `linear-gradient(135deg, ${accent}12, transparent 60%)`,
          color: `${accent}88`,
        }}
      >
        {cert.provider.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={cert.thumb}
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
      onError={() => setBad(true)}
    />
  );
}

/* ─── Tarjeta "En Curso" ────────────────────────────────────────────────── */
function PendingCard({ cert }: { cert: Certificate }) {
  const accent = ACCENT[cert.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="text-left rounded-xl overflow-hidden font-mono relative"
      style={{
        background: 'rgba(8,8,12,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${accent}35`,
        boxShadow: `0 0 32px ${accent}10`,
      }}
    >
      {/* Scanline animada en el fondo */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${accent}06 3px, ${accent}06 4px)`,
        }}
        animate={{ backgroundPositionY: ['0px', '100px'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
      />

      {/* Thumbnail con overlay de bloqueo */}
      <div className="h-28 sm:h-32 overflow-hidden relative">
        <div className="h-full w-full" style={{ filter: 'grayscale(0.85) brightness(0.4)' }}>
          <CertThumb cert={cert} accent={accent} />
        </div>
        {/* Overlay con candado */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
          style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.6), ${accent}18)` }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <Lock className="w-8 h-8" style={{ color: accent }} />
          </motion.div>
          <span
            className="text-[8px] uppercase tracking-[0.25em] font-bold px-2 py-0.5 rounded"
            style={{
              color: accent,
              background: `${accent}18`,
              border: `1px solid ${accent}40`,
            }}
          >
            En Curso
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2 relative z-10">
        {/* Provider & fecha inicio */}
        <p className="text-[9px] uppercase tracking-widest" style={{ color: `${accent}aa` }}>
          {cert.provider} · Inicio {cert.dateLabel}
          {cert.hours != null ? ` · ${cert.hours} h` : ''}
        </p>

        {/* Título */}
        <h3 className="text-[11px] font-bold text-white leading-snug line-clamp-2 min-h-[2.5rem]">
          {cert.title}
        </h3>

        {/* Barra de progreso animada */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] text-gray-600 uppercase tracking-wider">Progreso</span>
            <motion.span
              className="text-[8px] font-bold"
              style={{ color: accent }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              ● CARGANDO…
            </motion.span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: `${accent}18` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}
              animate={{ x: ['-100%', '0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* ETA */}
        {cert.eta && (
          <p className="text-[9px] text-gray-500">
            Disponible estimado:{' '}
            <span style={{ color: `${accent}cc` }} className="font-bold">
              {cert.eta}
            </span>
          </p>
        )}

        {/* Highlights */}
        {cert.highlights && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {cert.highlights.map((h) => (
              <span
                key={h}
                className="text-[8px] px-1.5 py-0.5 rounded font-mono"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}28`,
                  color: `${accent}bb`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Modal visor ───────────────────────────────────────────────────────── */
function CertViewerModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [cert, onClose]);

  useEffect(() => {
    document.body.style.overflow = cert ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cert]);

  const accent = cert ? ACCENT[cert.tier] : '#fff';

  return (
    <AnimatePresence>
      {cert && (
        <>
          <motion.button
            type="button"
            aria-label="Cerrar"
            className="fixed inset-0 z-[100] border-0 cursor-default"
            style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-viewer-title"
            className="fixed z-[110] left-1/2 top-1/2 w-[min(96vw,900px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden flex flex-col font-mono shadow-2xl"
            style={{
              background: 'rgba(8,8,12,0.95)',
              border: `1px solid ${accent}40`,
              boxShadow: `0 0 0 1px ${accent}20, 0 24px 80px rgba(0,0,0,0.6)`,
            }}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div
              className="flex items-start justify-between gap-2 px-4 py-3 border-b border-white/10"
              style={{ borderColor: `${accent}25` }}
            >
              <div className="min-w-0 space-y-1.5">
                <p id="cert-viewer-title" className="text-sm font-bold text-white truncate pr-2">
                  {cert.title}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {cert.provider} · {cert.dateLabel}
                  {cert.hours != null ? ` · ${cert.hours} h` : ''}
                </p>
                {/* Highlights en el modal */}
                {cert.highlights && (
                  <div className="flex flex-wrap gap-1">
                    {cert.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          background: `${accent}12`,
                          border: `1px solid ${accent}28`,
                          color: `${accent}cc`,
                        }}
                      >
                        <Zap className="w-2.5 h-2.5" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={cert.asset}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] uppercase tracking-wider"
                  style={{
                    border: `1px solid ${accent}35`,
                    color: accent,
                    background: `${accent}10`,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir archivo
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-[50vh] bg-black/40">
              {cert.kind === 'pdf' ? (
                <iframe
                  title={cert.title}
                  src={cert.asset}
                  className="w-full h-[min(72vh,720px)] border-0"
                />
              ) : (
                <div className="p-4 overflow-auto max-h-[72vh] flex justify-center">
                  <img
                    src={cert.asset}
                    alt={cert.title}
                    className="max-w-full h-auto object-contain rounded"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Tarjeta completada ────────────────────────────────────────────────── */
function DoneCard({
  cert,
  index,
  onClick,
}: {
  cert: Certificate;
  index: number;
  onClick: () => void;
}) {
  const accent = ACCENT[cert.tier];
  return (
    <motion.button
      key={cert.id}
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.35 }}
      onClick={onClick}
      className="text-left rounded-xl overflow-hidden font-mono group"
      style={{
        background: 'rgba(8,8,12,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${accent}28`,
        boxShadow: `0 0 32px ${accent}06`,
      }}
    >
      <div className="h-28 sm:h-32 overflow-hidden relative">
        <CertThumb cert={cert} accent={accent} />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.75), transparent 55%)`,
          }}
        />
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-[9px] uppercase tracking-widest" style={{ color: `${accent}aa` }}>
          {cert.provider} · {cert.dateLabel}
          {cert.hours != null ? ` · ${cert.hours} h` : ''}
        </p>
        <h3 className="text-[11px] font-bold text-white leading-snug line-clamp-2 min-h-[2.5rem]">
          <DecryptTitle text={cert.title} />
        </h3>
        {/* Highlights chips */}
        {cert.highlights && (
          <div className="flex flex-wrap gap-1">
            {cert.highlights.map((h) => (
              <span
                key={h}
                className="text-[8px] px-1.5 py-0.5 rounded font-mono"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}28`,
                  color: `${accent}bb`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <span className="text-[9px] text-gray-600">Clic para visor · PDF / imagen</span>
      </div>
    </motion.button>
  );
}

/* ─── Vault principal ───────────────────────────────────────────────────── */
const CertificateVault: React.FC = () => {
  const [open, setOpen] = useState<Certificate | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white font-mono flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <DecryptTitle text="Certificates Vault" className="text-white" />
          </h2>
          <p className="font-mono text-[10px] text-gray-600 tracking-widest mt-1">
            // credenciales verificadas · platzi · uneweb · samsung sic · udemy · social oplesk
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CERTIFICATES.map((cert, i) =>
          cert.status === 'pending' ? (
            <PendingCard key={cert.id} cert={cert} />
          ) : (
            <DoneCard key={cert.id} cert={cert} index={i} onClick={() => setOpen(cert)} />
          )
        )}
      </div>

      <CertViewerModal cert={open} onClose={() => setOpen(null)} />
    </section>
  );
};

export default CertificateVault;

/** Botón flotante / barra para el CV (export nombrado para uso en ReposGridClient). */
export function CvQuickAccess({ className }: { className?: string }) {
  return (
    <a
      href={CV_PDF_PATH}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all hover:scale-[1.02]'
      }
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        color: 'rgba(255,255,255,0.9)',
        boxShadow: '0 0 24px rgba(255,0,255,0.08)',
      }}
    >
      <FileText className="w-3.5 h-3.5 text-[#ff00ff]" />
      CV · PDF
    </a>
  );
}
