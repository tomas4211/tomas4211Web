import React, { useEffect, useRef } from 'react';

const CODE_CHARS = '01アイウエオカキクコΔΨΩ∑≠∫λπ#(){}[];=><!+-*&|~^%';

interface Particle {
  x: number; y: number;
  speed: number; char: string;
  opacity: number; size: number;
}

function randomChar() {
  return CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
}

interface HeroFxProps {
  /** Opacidad del canvas (0–1). Por defecto 0.65; para /repos suele bajarse. */
  opacity?: number;
  className?: string;
}

const HeroFx: React.FC<HeroFxProps> = ({ opacity = 0.65, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const parts     = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── helpers ────────────────────────────────────────────────────
    function initParticles() {
      const count = Math.floor((canvas!.width * canvas!.height) / 14000);
      parts.current = Array.from({ length: count }, () => ({
        x:       Math.random() * canvas!.width,
        y:       Math.random() * canvas!.height,
        speed:   0.2 + Math.random() * 0.6,
        char:    randomChar(),
        opacity: 0.04 + Math.random() * 0.22,
        size:    10  + Math.random() * 6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const midX   = canvas!.width * 0.52;
      const glitch = Math.random() < 0.012;

      for (const p of parts.current) {
        const isCyan = p.x > midX * 0.55;
        ctx.font      = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = glitch
          ? `rgba(255,255,255,${Math.random() * 0.35})`
          : isCyan
            ? `rgba(0,255,255,${p.opacity})`
            : `rgba(255,0,255,${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);

        p.y += p.speed;
        if (Math.random() < 0.008) p.char = randomChar();
        if (p.y > canvas!.height + 20) {
          p.y      = -20;
          p.x      = Math.random() * canvas!.width;
          p.opacity = 0.04 + Math.random() * 0.22;
        }
      }

      if (glitch) {
        const barY = Math.random() * canvas!.height;
        const barH = 1 + Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5
          ? 'rgba(0,255,255,0.05)'
          : 'rgba(255,0,255,0.05)';
        ctx.fillRect(0, barY, canvas!.width, barH);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    // ── lifecycle ──────────────────────────────────────────────────
    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      initParticles();
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? 'absolute inset-0 w-full h-full pointer-events-none'}
      style={{ opacity }}
    />
  );
};

export default HeroFx;
