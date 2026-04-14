import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

// Simple GitHub SVG (lucide-react doesn't export Github)
const GithubIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ─── Project data ───────────────────────────────────────────────────────────

export interface ProjectDetail {
  id: string;
  title:    string;
  subtitle: string;
  account:  string;
  accent:   string;          // hex, e.g. '#ff00ff'
  url:      string;
  summary:  string;
  highlights: string[];
  techStack:  string[];
  // Optional gallery: array of { src, caption }
  gallery?: { src: string; caption: string }[];
}

// ─── Modal ──────────────────────────────────────────────────────────────────

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const [galleryIdx, setGalleryIdx] = useState(0);

  // Reset gallery index when project changes
  useEffect(() => { setGalleryIdx(0); }, [project?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed inset-4 md:inset-[6%] lg:inset-[8%] z-50 flex flex-col overflow-hidden rounded-2xl"
            style={{
              background: 'rgba(6,6,8,0.96)',
              border: `1px solid ${project.accent}44`,
              boxShadow: `0 0 60px ${project.accent}18`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-6 shrink-0 border-b"
              style={{ borderColor: `${project.accent}22` }}
            >
              <div>
                {/* Account badge */}
                <a
                  href={`https://github.com/${project.account}`}
                  target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono mb-2 transition-opacity hover:opacity-80"
                  style={{
                    background: `${project.accent}18`,
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  <GithubIcon /> @{project.account}
                </a>
                <h2
                  className="text-2xl md:text-3xl font-black tracking-tight text-white"
                  style={{ textShadow: `0 0 20px ${project.accent}44` }}
                >
                  {project.title}
                </h2>
                <p className="text-xs font-mono mt-1" style={{ color: `${project.accent}99` }}>
                  {project.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <a
                  href={project.url}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:brightness-125"
                  style={{
                    background: `${project.accent}14`,
                    border: `1px solid ${project.accent}40`,
                    color: project.accent,
                  }}
                >
                  <ExternalLink size={12} /> GitHub
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                  title="Cerrar"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Body: scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* Gallery (if images provided) */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-3">
                  {/* Main image */}
                  <div
                    className="relative w-full rounded-xl overflow-hidden"
                    style={{ aspectRatio: '16/7', background: '#0a0a0a', border: `1px solid ${project.accent}22` }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryIdx}
                        src={project.gallery[galleryIdx].src}
                        alt={project.gallery[galleryIdx].caption}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    </AnimatePresence>
                    {/* Caption */}
                    <div
                      className="absolute bottom-0 inset-x-0 p-3 font-mono text-xs text-gray-300"
                      style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }}
                    >
                      {project.gallery[galleryIdx].caption}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {project.gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {project.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIdx(i)}
                          className="shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all"
                          style={{
                            border: i === galleryIdx
                              ? `2px solid ${project.accent}`
                              : '2px solid transparent',
                            opacity: i === galleryIdx ? 1 : 0.5,
                          }}
                        >
                          <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* No gallery placeholder */}
              {(!project.gallery || project.gallery.length === 0) && (
                <div
                  className="w-full rounded-xl flex items-center justify-center font-mono text-xs text-gray-600"
                  style={{ aspectRatio: '16/5', background: '#0a0a0a', border: `1px solid ${project.accent}18` }}
                >
                  // screenshots coming soon
                </div>
              )}

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: project.accent }}>
                  Resumen Ejecutivo
                </h3>
                <p className="text-gray-300 text-sm font-mono leading-relaxed">{project.summary}</p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: project.accent }}>
                  Highlights
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300 font-mono">
                      <span style={{ color: project.accent }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="space-y-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: project.accent }}>
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: `${project.accent}12`,
                        border: `1px solid ${project.accent}30`,
                        color: project.accent,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Neon accent line at bottom */}
            <div
              className="h-px shrink-0"
              style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
