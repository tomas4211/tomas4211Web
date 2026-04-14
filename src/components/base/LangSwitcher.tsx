import React, { useEffect } from 'react';
import type { Lang } from '../i18n/index';

interface LangSwitcherProps {
  lang: Lang;
  onSwitch: (l: Lang) => void;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ lang, onSwitch }) => {
  return (
    <div
      className="inline-flex items-center font-mono text-xs select-none"
      style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' }}
    >
      {(['es', 'en'] as Lang[]).map((l, i) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => onSwitch(l)}
            className="px-3 py-1 transition-all duration-200 uppercase tracking-widest"
            style={{
              background: active
                ? l === 'es' ? 'rgba(255,0,255,0.2)' : 'rgba(0,255,255,0.2)'
                : 'transparent',
              color: active
                ? l === 'es' ? '#ff00ff' : '#00ffff'
                : 'rgba(255,255,255,0.3)',
              borderRight: i === 0 ? '1px solid rgba(255,255,255,0.1)' : undefined,
              textShadow: active
                ? l === 'es' ? '0 0 8px #ff00ff' : '0 0 8px #00ffff'
                : 'none',
            }}
            title={`Switch to ${l === 'es' ? 'Español' : 'English'}`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
