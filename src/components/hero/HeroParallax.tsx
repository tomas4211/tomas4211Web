import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * HeroParallax — no visible output; drives the parallax-layer div
 * with a smooth spring response to mouse movement.
 */
const HeroParallax: React.FC = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 22, mass: 1 });
  const y = useSpring(rawY, { stiffness: 60, damping: 22, mass: 1 });

  useEffect(() => {
    const layer = document.getElementById('parallax-layer') as HTMLElement | null;
    if (!layer) return;

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      // Max offset: ±18px
      rawX.set(((e.clientX - cx) / cx) * -18);
      rawY.set(((e.clientY - cy) / cy) * -12);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    // Subscribe motion values → DOM style (avoids React re-renders)
    const unsubX = x.on('change', v => {
      layer.style.transform = `scale(1.10) translate(${v}px, ${y.get()}px)`;
    });
    const unsubY = y.on('change', v => {
      layer.style.transform = `scale(1.10) translate(${x.get()}px, ${v}px)`;
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      unsubX();
      unsubY();
    };
  }, [rawX, rawY, x, y]);

  return null;
};

export default HeroParallax;
