
import React, { useState } from 'react';
import { AVAILABLE_AGENTS, AVAILABLE_RESOURCES } from '../constants';
import Icon from './Icon';

interface NewPaneModalProps {
  onClose: () => void;
  onCreate: (config: { agent: string; resources: string[]; name: string; previewUrl: string }) => void;
}

const NewPaneModal: React.FC<NewPaneModalProps> = ({ onClose, onCreate }) => {
  const [selectedAgent, setSelectedAgent] = useState(AVAILABLE_AGENTS[0].name);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [name, setName] = useState('Session Alpha');
  const [previewUrl, setPreviewUrl] = useState('http://localhost:3000');

  const toggleResource = (id: string) => {
    setSelectedResources(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-neutral-800 p-8 flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-200 shadow-2xl rounded-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-serif text-2xl tracking-widest text-black dark:text-white uppercase">Deploy Session</h2>
            <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-widest">Provisioning Environment...</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">Agent Identity</label>
            <div className="space-y-2">
              {AVAILABLE_AGENTS.map(agent => (
                <div 
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.name)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedAgent === agent.name ? 'border-black dark:border-white bg-black/[0.02] dark:bg-neutral-900 shadow-sm' : 'border-black/5 dark:border-neutral-800 hover:border-black/20 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">{agent.name}</div>
                  {/* Fixed: Property 'description' does not exist on type '{ id: string; name: string; provider: string; capabilities: string; }'. Changed to 'capabilities'. */}
                  <div className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-1 uppercase">{agent.capabilities}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">MCP Uplinks</label>
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_RESOURCES.map(res => (
                <div 
                  key={res.id}
                  onClick={() => toggleResource(res.id)}
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedResources.includes(res.id) ? 'border-black dark:border-white bg-black/[0.02] dark:bg-neutral-900 shadow-sm' : 'border-black/5 dark:border-neutral-800 hover:border-black/20 dark:hover:border-neutral-600'
                  }`}
                >
                  <Icon name={res.icon} size={14} className={selectedResources.includes(res.id) ? 'text-black dark:text-white' : 'text-neutral-400 dark:text-neutral-500'} />
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${
                    selectedResources.includes(res.id) ? 'text-black dark:text-white' : 'text-neutral-400 dark:text-neutral-500'
                  }`}>{res.name}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 space-y-2">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">Production Preview Link</label>
               <input 
                 type="text" 
                 value={previewUrl}
                 onChange={(e) => setPreviewUrl(e.target.value)}
                 className="w-full bg-black/5 dark:bg-black border border-black/5 dark:border-neutral-800 focus:border-black dark:focus:border-white text-xs font-mono text-black dark:text-white p-3 outline-none rounded-xl"
                 placeholder="http://localhost:3000"
               />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-neutral-800 flex items-center justify-between">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b border-black/10 dark:border-neutral-800 focus:border-black dark:focus:border-white text-xs font-mono text-black dark:text-white py-2 outline-none w-1/3"
            placeholder="Identifier"
          />
          <button 
            onClick={() => onCreate({ agent: selectedAgent, resources: selectedResources, name, previewUrl })}
            className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full text-[10px] font-serif uppercase tracking-[0.3em] font-bold hover:scale-105 transition-all shadow-xl"
          >
            Deploy CodeSpace Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPaneModal;
