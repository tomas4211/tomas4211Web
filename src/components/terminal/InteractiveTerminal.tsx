import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { es, en } from '../../i18n/index';
import type { Dict, Lang } from '../../i18n/index';
import LangSwitcher from '../base/LangSwitcher';

// ─── ASCII Art ─────────────────────────────────────────────────────────────

const ASCII_NINJA = `
   ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗
   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║
      ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║
      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║
      ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`;

// ─── Types ─────────────────────────────────────────────────────────────────

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

// ─── Command resolver ──────────────────────────────────────────────────────

function resolveCommand(
  raw: string,
  d: Dict,
  setLang: (l: Lang) => void,
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
  setRebooting: (v: boolean) => void,
): React.ReactNode | null {
  const parts = raw.trim().split(/\s+/);
  const cmd   = parts[0].toLowerCase();
  const args  = parts.slice(1).join(' ').toLowerCase();
  const t     = d.terminal;

  // ── whoami ──────────────────────────────────────────
  if (cmd === 'whoami') {
    const w = t.whoami;
    return (
      <div className="space-y-1">
        <p><span className="text-[#ff00ff]">user</span>: {w.user}</p>
        <p><span className="text-[#ff00ff]">role</span>: {w.role}</p>
        <p><span className="text-[#ff00ff]">location</span>: {w.location}</p>
        <p><span className="text-[#ff00ff]">since</span>: {w.since}</p>
        <p><span className="text-[#00ffff]">status</span>: <span className="text-green-400">{w.status}</span></p>
        <p><span className="text-[#ff00ff]">github</span>: {w.github}</p>
      </div>
    );
  }

  // ── ls ──────────────────────────────────────────────
  if (cmd === 'ls') {
    const l = t.ls;
    return (
      <div className="space-y-4">
        <div>
          <p className="text-[#ff00ff] font-bold">{l.execTitle}</p>
          <div className="ml-4 mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5">
            <span className="text-[#00ffff]">drw-</span><span>Credix_Migration/</span>
            <span className="text-[#00ffff]">drw-</span><span>Finanve_PWA/</span>
          </div>
        </div>
        <div>
          <p className="text-[#fefe00] font-bold">{l.labsTitle}</p>
          <div className="ml-4 mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5">
            <span className="text-[#00ffff]">drw-</span><span>Elementum_Web3/</span>
            <span className="text-[#00ffff]">drw-</span><span>Dotfiles/</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs">{l.hint} <span className="text-white">credix_migration</span>, <span className="text-white">finanve_pwa</span>, <span className="text-white">elementum_web3</span>, <span className="text-white">dotfiles</span></p>
      </div>
    );
  }

  // ── fastfetch / neofetch ─────────────────────────────
  if (cmd === 'fastfetch' || cmd === 'neofetch') {
    const f = t.fastfetch;
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <pre className="text-[#ff00ff] text-[9px] leading-tight shrink-0 font-mono hidden md:block">{ASCII_NINJA}</pre>
        <div className="space-y-1 text-sm">
          <p><span className="text-[#00ffff] font-bold">OS</span>: {f.os}</p>
          <p><span className="text-[#00ffff] font-bold">Host</span>: {f.host}</p>
          <p><span className="text-[#00ffff] font-bold">Shell</span>: {f.shell}</p>
          <p><span className="text-[#00ffff] font-bold">Editor</span>: {f.editor}</p>
          <p><span className="text-[#00ffff] font-bold">DE</span>: {f.de}</p>
          <div className="border-t border-white/10 pt-2 mt-2 space-y-1">
            <p><span className="text-[#ff00ff] font-bold">Education</span>: <span className="text-green-400">{f.education}</span></p>
            <p><span className="text-[#ff00ff] font-bold">Certs</span>: {f.certs}</p>
            <p><span className="text-[#ff00ff] font-bold">Stack</span>: {f.stack}</p>
          </div>
          <div className="flex gap-1 mt-2">
            {['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-cyan-500','bg-blue-500','bg-purple-500','bg-pink-500'].map((c, i) => (
              <div key={i} className={`w-5 h-5 rounded-sm ${c}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── cat [project].md ────────────────────────────────
  if (cmd === 'cat') {
    const key = args.replace('.md', '').replace(/-/g, '_') as keyof typeof t.projects;
    const proj = t.projects[key];
    const accountMap: Record<string, { account: string; color: string }> = {
      credix_migration: { account: 'tomas4211', color: '#ff00ff' },
      finanve_pwa:      { account: 'tomas4211', color: '#00ffff' },
      elementum_web3:   { account: 'RyuTsuki08', color: '#fefe00' },
      dotfiles:         { account: 'RyuTsuki08', color: '#4ade80' },
    };
    const meta = accountMap[key] ?? { account: 'RyuTsuki08', color: '#00ffff' };

    if (!proj) {
      return (
        <p className="text-red-400">
          cat: {args || '(vacío)'}: {d.lang === 'es' ? 'No existe.' : 'No such file.'}{' '}
          {d.lang === 'es' ? 'Usa' : 'Use'} <span className="text-white">ls</span>{' '}
          {d.lang === 'es' ? 'para ver proyectos.' : 'to see available projects.'}
        </p>
      );
    }

    return (
      <div className="space-y-3" style={{ color: meta.color }}>
        <h3 className="text-lg font-bold">📄 {proj.name}.md</h3>
        <p className="text-gray-300">{proj.summary}</p>
        <ul className="space-y-1">
          {proj.highlights.map((h: string, i: number) => (
            <li key={i} className="text-gray-300 text-xs">▸ {h}</li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">
          {d.lang === 'es' ? 'Cuenta' : 'Account'}:{' '}
          <a href={`https://github.com/${meta.account}`} target="_blank" rel="noopener"
             className="underline hover:text-white">{meta.account}</a>
        </p>
      </div>
    );
  }

  // ── lang [es|en] ────────────────────────────────────
  if (cmd === 'lang') {
    const target = args as Lang;
    if (target !== 'es' && target !== 'en') {
      return (
        <p className="text-red-400">
          {d.lang === 'es'
            ? 'Uso: lang [es|en]'
            : 'Usage: lang [es|en]'}
        </p>
      );
    }

    // Trigger glitch reboot animation then switch lang
    setRebooting(true);
    setTimeout(() => {
      setLang(target);
      setHistory([]);
      setRebooting(false);
    }, 1800);

    return (
      <p className="text-[#fefe00] animate-pulse">
        {t.langReboot(target)}
      </p>
    );
  }

  // ── cd ──────────────────────────────────────────────
  if (cmd === 'cd') {
    const dest = args || '~';
    return (
      <p className="text-gray-400">
        {d.lang === 'es' ? 'Navegando a' : 'Navigating to'}{' '}
        <span className="text-[#00ffff]">{dest}</span> ...
      </p>
    );
  }

  // ── help ─────────────────────────────────────────────
  if (cmd === 'help') {
    const h = t.help;
    return (
      <div className="space-y-1">
        <p className="text-[#00ffff] font-bold mb-2">{h.title}</p>
        {h.commands.map(([c, desc]) => (
          <div key={c} className="flex gap-3 text-sm">
            <span className="text-[#ff00ff] w-44 shrink-0 font-mono">{c}</span>
            <span className="text-gray-400">{desc}</span>
          </div>
        ))}
      </div>
    );
  }

  return null; // unknown
}

// ─── Component ──────────────────────────────────────────────────────────────

interface Props {
  initialLang?: Lang;
}

const InteractiveTerminal: React.FC<Props> = ({ initialLang = 'es' }) => {
  const [lang, setLang]       = useState<Lang>(initialLang);
  const [isOpen, setIsOpen]   = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput]     = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx]   = useState(-1);
  const [rebooting, setRebooting] = useState(false);

  const scrollRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const d = lang === 'es' ? es : en;

  // Broadcast lang to the page so Astro elements can react
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  const handleCommand = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();

    if (lower === 'clear') { setHistory([]); setInput(''); setCmdIdx(-1); return; }
    if (lower === 'exit')  { setIsOpen(false); setInput(''); return; }

    const output = resolveCommand(raw, d as Dict, setLang, setHistory, setRebooting);
    const finalOutput = output ?? (
      <p className="text-red-400">{d.terminal.unknownCmd(raw.trim())}</p>
    );

    setHistory(h => [...h, { command: raw, output: finalOutput }]);
    setCmdHistory(h => [raw, ...h]);
    setCmdIdx(-1);
    setInput('');
  }, [input, d]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 z-40 group"
        style={{ background: '#050505', border: '1px solid rgba(0,255,255,0.3)' }}
        title="Open Terminal"
      >
        <TerminalIcon className="w-6 h-6 text-[#00ffff] group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed z-50 inset-4 md:inset-[5%] lg:inset-[6%] flex flex-col overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,255,255,0.1)]"
              style={{ background: 'rgba(5,5,5,0.97)', border: '1px solid rgba(0,255,255,0.2)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Glitch Reboot Overlay */}
              <AnimatePresence>
                {rebooting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 1, 0.3, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.95)' }}
                  >
                    <p className="text-[#ff00ff] text-2xl font-mono font-black animate-pulse tracking-widest">
                      REBOOTING...
                    </p>
                    <div className="mt-4 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #ff00ff, #00ffff)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                    <p className="mt-3 text-gray-500 text-xs font-mono tracking-widest">
                      {d.terminal.langReboot(lang === 'es' ? 'en' : 'es').slice(0, 40)}...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-40" />
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-40" />
                  </div>
                  <TerminalIcon className="w-4 h-4 text-[#00ffff]" />
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">christian@paez-os:~</span>
                </div>
                <div className="flex items-center gap-3">
                  <LangSwitcher lang={lang} onSwitch={setLang} />
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div
                ref={scrollRef}
                className="flex-1 p-5 overflow-y-auto font-mono text-sm text-gray-200 space-y-4"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a1a1a #050505' }}
              >
                {/* Boot message */}
                <div className="text-[#00ffff]/50 text-xs border-b border-white/5 pb-3 space-y-0.5">
                  <p>{d.terminal.bootMsg}</p>
                  <p className="text-gray-600">{d.terminal.bootHint}</p>
                </div>

                {/* Command history */}
                {history.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff00ff]">❯</span>
                      <span className="text-[#00ffff]">~</span>
                      <span className="text-white">{item.command}</span>
                    </div>
                    <div className="ml-7 leading-relaxed">{item.output}</div>
                  </div>
                ))}

                {/* Active input */}
                <form onSubmit={handleCommand} className="flex items-center gap-2">
                  <span className="text-[#ff00ff]">❯</span>
                  <span className="text-[#00ffff]">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white caret-[#ff00ff]"
                    spellCheck={false}
                    autoComplete="off"
                    disabled={rebooting}
                  />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveTerminal;
