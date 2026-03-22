
import React, { useState } from 'react';

interface LandingViewProps {
  onLaunch: (count: number) => void;
  onShowDocs: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onLaunch, onShowDocs }) => {
  const [count, setCount] = useState(1);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000 bg-[#050505] relative overflow-hidden">
      {/* Landing Navbar */}
      <nav className="absolute top-0 w-full h-20 px-10 flex items-center justify-between border-b border-white/5 z-50">
        <div className="flex flex-col items-start">
          <span className="text-[20px] font-heading font-bold uppercase tracking-[0.4em] factory-gradient-text">ClusterClaw</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onShowDocs}
            className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-white transition-colors"
          >
            Documentation
          </button>
          <div className="h-4 w-px bg-white/10"></div>
        </div>
      </nav>

      {/* Decorative background elements with the new Orange/Red color palette */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none animate-slow-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none animate-slow-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-950/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl space-y-12 relative z-10">
        <header className="space-y-6">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] factory-gradient-text">
            Deploy Mass <br/> Agent Clusters
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_8px_#fb923c]"></span>
              Communicate in unison
            </p>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#dc2626]"></span>
              Categorize with tags
            </p>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-900 rounded-full shadow-[0_0_8px_#450a0a]"></span>
              Connect to repositories
            </p>
          </div>
        </header>

        <div className="flex flex-col items-center gap-10 pt-12">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-black transition-all text-2xl group active:scale-90"
            >
              <span className="transition-transform group-hover:scale-125">-</span>
            </button>
            <div className="flex flex-col items-center min-w-[160px]">
              <input 
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
                className="text-8xl font-heading font-bold text-white tabular-nums bg-transparent border-none outline-none text-center w-full focus:ring-0"
              />
              <span className="text-[11px] uppercase font-bold tracking-[0.4em] text-white mt-2">Initial Batch Size</span>
            </div>
            <button 
              onClick={() => setCount(Math.min(50, count + 1))}
              className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-black transition-all text-2xl group active:scale-90"
            >
              <span className="transition-transform group-hover:scale-125">+</span>
            </button>
          </div>

          <button 
            onClick={() => onLaunch(count)}
            className="px-16 py-6 bg-white text-black text-[13px] font-bold uppercase tracking-[0.6em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(249,115,22,0.15)] rounded-2xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="relative z-10">Launch Production</span>
          </button>
        </div>
      </div>

      <footer className="absolute bottom-10 flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.6em] text-white">
        <span className="factory-gradient-text font-bold">ClusterClaw</span>
        <span className="opacity-30">|</span>
        <span>By Reflecter LABS</span>
      </footer>
    </div>
  );
};

export default LandingView;
