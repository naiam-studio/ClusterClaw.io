
import React, { useState } from 'react';
import Icon from './Icon';

const MANUAL_MODULES = [
  {
    id: 'core',
    title: 'Core Architecture',
    specs: [
      { label: 'Layer', value: '04.Sovereign' },
      { label: 'Integrity', value: 'High-Audit' },
      { label: 'Context', value: 'Linked-MCP' }
    ],
    details: 'Isolated neural sessions operating in distributed sandboxes. Every node maintains its own local context cache and audit log.'
  },
  {
    id: 'commands',
    title: 'Input Logic',
    specs: [
      { label: 'Trigger', value: 'Shift+N' },
      { label: 'Switch', value: 'Shift+#' },
      { label: 'Submit', value: 'Enter' }
    ],
    details: 'Command entry occurs in the primary console field. Metadata (Agent identity and Neural Links) is displayed in the peripheral status column.'
  },
  {
    id: 'links',
    title: 'Neural Links',
    specs: [
      { label: 'GitHub', value: 'VCS-Bridge' },
      { label: 'Supabase', value: 'DB-Sync' },
      { label: 'Notion', value: 'KB-Link' }
    ],
    details: 'Model Context Protocol establishes high-throughput tunnels to secure silos. Use Neural Links to inject live data into agent reasoning chains.'
  }
];

interface WikiViewProps {
  onClose: () => void;
}

const WikiView: React.FC<WikiViewProps> = ({ onClose }) => {
  const [activeId, setActiveId] = useState('core');
  const module = MANUAL_MODULES.find(m => m.id === activeId) || MANUAL_MODULES[0];

  return (
    <div className="absolute inset-0 z-[60] bg-white/98 dark:bg-black/98 backdrop-blur-3xl flex flex-col animate-in fade-in duration-300 text-black dark:text-white">
      <header className="h-14 flex items-center justify-between px-8 border-b border-black/10 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-serif text-sm tracking-[0.4em] uppercase">System_Manual</span>
          <div className="h-3 w-px bg-black/10 dark:bg-white/10"></div>
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Interface_v4.0.1</span>
        </div>
        <button onClick={onClose} className="text-neutral-500 hover:text-black dark:hover:text-white transition-all p-2">
          <Icon name="close" size={20} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Module Navigation */}
        <aside className="w-64 border-r border-black/5 dark:border-white/5 flex flex-col p-6 space-y-1">
          {MANUAL_MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                activeId === m.id 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                  : 'border-black/5 dark:border-white/5 text-neutral-500 dark:text-neutral-600 hover:text-black dark:hover:text-neutral-300'
              }`}
            >
              {m.title}
            </button>
          ))}
        </aside>

        {/* Blueprint Viewer */}
        <main className="flex-1 p-12 lg:p-20 overflow-y-auto no-scrollbar">
          <div className="max-w-xl animate-in slide-in-from-right-2 duration-500">
            <h2 className="font-serif text-4xl tracking-tighter uppercase mb-12 border-b border-black/10 dark:border-white/10 pb-6">
              {module.title}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-12">
              {module.specs.map((spec, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[7px] uppercase tracking-[0.3em] text-neutral-400 font-bold">{spec.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-mono">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <p className="font-inter text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-light tracking-wide italic border-l border-black/20 dark:border-white/20 pl-6">
                "{module.details}"
              </p>
              
              <div className="pt-10 flex gap-4">
                 <div className="w-1.5 h-1.5 bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_white]"></div>
                 <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">Logic Integrity Verified</span>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="h-10 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black px-8 flex items-center justify-end">
         <span className="text-[7px] font-mono text-neutral-400 dark:text-neutral-800 tracking-[1em] uppercase">Blueprint_ID_9901</span>
      </footer>
    </div>
  );
};

export default WikiView;
