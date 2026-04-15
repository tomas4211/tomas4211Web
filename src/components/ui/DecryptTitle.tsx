'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = 'アイウエオ01#Ω∑λ▓░Ø';

interface Props {
  text: string;
  className?: string;
}

/**
 * Título con efecto de “desencriptado” al entrar en viewport (una vez).
 */
const DecryptTitle: React.FC<Props> = ({ text, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%', amount: 0.35 });
  const [out, setOut] = useState(() => text.replace(/[^\s]/g, '░'));

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const maxFrames = 32;
    const id = window.setInterval(() => {
      frame++;
      const p = frame / maxFrames;
      setOut(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (p * text.length > i + 2) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (frame >= maxFrames) {
        setOut(text);
        window.clearInterval(id);
      }
    }, 38);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
};

export default DecryptTitle;
