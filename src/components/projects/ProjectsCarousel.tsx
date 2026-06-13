import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Shield, Server, Cloud, Activity, Code, Play } from 'lucide-react';
import { es, en } from '../../i18n';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

type Lang = 'es' | 'en';
const dicts = { es, en };

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-4 h-4 text-[#ff00ff]" />,
  server: <Server className="w-4 h-4 text-[#00ffff]" />,
  cloud: <Cloud className="w-4 h-4 text-yellow-400" />,
  activity: <Activity className="w-4 h-4 text-green-400" />,
};

interface ProjectsCarouselProps {
  initialLang: Lang;
}

const IntroEffect = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1, 1, 60], 
          opacity: [0, 1, 1, 0],
          filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(30px)']
        }}
        transition={{ 
          duration: 3.5, 
          times: [0, 0.2, 0.7, 1],
          ease: "easeInOut" 
        }}
      >
        <span 
          className="text-[180px] font-black tracking-tighter leading-none"
          style={{ 
            color: '#00ffff',
            textShadow: '0 0 80px rgba(0,255,255,0.8), 0 0 150px rgba(0,255,255,0.4)',
            fontFamily: '"Arial Black", sans-serif'
          }}
        >
          T
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsCarousel({ initialLang }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-lang') as Lang) || 'es';
    }
    return 'es';
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: Lang }>;
      if (customEvent.detail && customEvent.detail.lang) {
        setLang(customEvent.detail.lang);
      }
    };
    window.addEventListener('langchange', handleLangChange);
    window.addEventListener('setlang', handleLangChange as EventListener);
    
    return () => {
      window.removeEventListener('langchange', handleLangChange);
      window.removeEventListener('setlang', handleLangChange as EventListener);
    };
  }, []);

  const data = dicts[lang].featuredProjects;
  const items = data.items;
  const currentProject = items[currentIndex];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsVideoPlaying(false);
    setShowIntro(false);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsVideoPlaying(false);
    setShowIntro(false);
  };

  const handlePlayVideo = () => {
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32 relative">
      <AnimatePresence>
        {showIntro && <IntroEffect onComplete={handleIntroComplete} />}
      </AnimatePresence>
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">
          {data.heading}
        </span>
        <div className="h-px flex-1 bg-white/5"></div>
        <div className="flex gap-2">
          <button onClick={prevProject} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-[#00ffff] transition-colors border border-white/5">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextProject} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-[#00ffff] transition-colors border border-white/5">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden group"
           style={{ background: 'rgba(10,10,15,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,255,255,0.15)', boxShadow: '0 0 40px rgba(0,255,255,0.03)' }}>
        
        {/* Neon Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-[#00ffff] to-transparent z-10"></div>
        <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-[#00ffff] to-transparent z-10"></div>
        <div className="absolute bottom-0 right-0 w-12 h-px bg-gradient-to-l from-[#ff00ff] to-transparent z-10"></div>
        <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-[#ff00ff] to-transparent z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-[300px] lg:min-h-full p-8 flex flex-col justify-center items-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5"
              style={{ background: 'radial-gradient(circle at center, rgba(0,255,255,0.05) 0%, transparent 70%)' }}>
              
              <div className="absolute inset-0 opacity-20"
                   style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="relative w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-white/10 flex flex-col group-hover:scale-105 transition-transform duration-700"
                   style={{ background: 'rgba(0,0,0,0.5)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)' }}>
                <div className="h-6 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5 shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex-1 relative overflow-hidden bg-[#050505]">
                  {currentProject.mediaType === 'video' ? (
                    <div className="absolute inset-0 w-full h-full bg-black group/video cursor-pointer" onClick={!isVideoPlaying ? handlePlayVideo : undefined}>
                      <video 
                        ref={videoRef}
                        src={currentProject.video}
                        loop
                        playsInline
                        controls={isVideoPlaying}
                        className="absolute inset-0 w-full h-full object-contain"
                        onPause={() => setIsVideoPlaying(false)}
                        onPlay={() => setIsVideoPlaying(true)}
                      />
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-all duration-300 group-hover/video:bg-black/20 z-10">
                          <div className="w-16 h-16 rounded-full bg-[#00ffff]/10 flex items-center justify-center backdrop-blur-md border border-[#00ffff]/30 group-hover/video:scale-110 group-hover/video:bg-[#00ffff]/20 group-hover/video:border-[#00ffff]/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                            <Play className="w-6 h-6 text-[#00ffff] ml-1 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" fill="currentColor" />
                          </div>
                          <span className="mt-5 font-mono text-[10px] tracking-widest text-[#00ffff]/80 uppercase animate-pulse">
                            Dale Click
                          </span>
                        </div>
                      )}
                    </div>
                  ) : currentProject.mediaType === 'code' ? (
                    currentProject.id === 'mango-brains' ? (
                      <div className="absolute inset-0 w-full h-full bg-[#0a0a0f] p-6 font-mono text-[10px] sm:text-xs text-[#00ffff]/70 overflow-hidden border-t border-[#00ffff]/10 flex flex-col">
                        <div className="text-gray-500 mb-4">// import pandas as pd<br/>// import plotly.express as px<br/>// from flask import Flask, render_template</div>
                        <div className="text-[#ff00ff]">app = Flask(__name__)</div>
                        <br/>
                        <div className="text-[#00ffff]">@app.route('/analysis/eeg')</div>
                        <div className="text-[#ff00ff]">def <span className="text-white">analyze_emotions</span>():</div>
                        <div className="pl-4 text-green-400">df = pd.read_csv('eeg_emotions_berkeley.csv')</div>
                        <div className="pl-4 text-green-400">fig = px.line(df, x='time', y=['alpha', 'beta', 'theta'])</div>
                        <div className="pl-4 text-green-400">graph_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)</div>
                        <div className="pl-4 text-yellow-400">return render_template('dashboard.html', graph=graph_json)</div>
                        <div className="mt-auto self-end opacity-10"><Code className="w-32 h-32" /></div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-[#0a0a0f] p-6 font-mono text-[10px] sm:text-xs text-[#00ffff]/70 overflow-hidden border-t border-[#00ffff]/10 flex flex-col">
                        <div className="text-gray-500 mb-4">// import tensorflow as tf<br/>// from tensorflow.keras.layers import LSTM, Bidirectional, Dense</div>
                        <div className="text-[#ff00ff]">model = tf.keras.models.Sequential([</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.Embedding(151, 64, input_length = 20),</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.Bidirectional(LSTM(128, return_sequences = True)),</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.BatchNormalization(),</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.Bidirectional(LSTM(64)),</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.Dense(128, activation = "relu"),</div>
                        <div className="pl-4 text-green-400">tf.keras.layers.Dense(151, activation = "softmax")</div>
                        <div className="text-[#ff00ff]">])</div>
                        <br/>
                        <div className="text-yellow-400">history = model.fit(x, y, epochs = 150)</div>
                        <div className="text-yellow-400">final_password = crack_password(model, test_text, padded_text, text)</div>
                        <div className="mt-auto self-end opacity-10"><Code className="w-32 h-32" /></div>
                      </div>
                    )
                  ) : (
                    <img 
                      src={currentProject.image} 
                      alt={currentProject.title} 
                      className="absolute inset-0 w-full h-full object-contain object-top"
                      style={currentProject.id === 'crm' ? { filter: 'invert(100%) hue-rotate(180deg) brightness(0.85) contrast(1.15)' } : undefined}
                    />
                  )}
                  {currentProject.id === 'crm' && (
                    <div className="absolute inset-0 pointer-events-none"
                         style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.15) 0%, rgba(0,255,255,0.15) 100%)', mixBlendMode: 'color' }}></div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id + '-content'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-8 md:p-12 flex flex-col justify-center">
              
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                    {currentProject.title}
                  </h3>
                  <p className="text-[#ff00ff] font-mono text-xs uppercase tracking-widest">
                    {currentProject.subtitle}
                  </p>
                </div>
                {currentProject.url !== '#' && (
                  <a href={currentProject.url} target="_blank" rel="noopener noreferrer"
                     className="shrink-0 flex items-center gap-2 px-4 py-2 rounded font-mono text-[10px] uppercase tracking-widest text-[#00ffff] hover:bg-[#00ffff]/10 transition-colors border border-[#00ffff]/30">
                    <span>{currentProject.cta}</span>
                    {currentProject.isGithub ? <GithubIcon className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                  </a>
                )}
                {currentProject.url === '#' && (
                  <span className="shrink-0 flex items-center gap-2 px-4 py-2 rounded font-mono text-[10px] uppercase tracking-widest text-gray-500 border border-white/10">
                    <span>{currentProject.cta}</span>
                    <Shield className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-10">
                {currentProject.tech.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-mono border border-white/10 text-gray-400 bg-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentProject.features.map((feature, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 text-white">
                      {iconMap[feature.icon] || iconMap['shield']}
                      <h4 className="font-bold text-sm">{feature.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'bg-[#00ffff] w-4' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
