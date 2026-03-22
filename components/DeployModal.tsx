
import React, { useState, useMemo } from 'react';
import { OPENROUTER_MODELS } from '../constants';
import Icon from './Icon';

interface DeployModalProps {
  onClose: () => void;
  onDeploy: (config: { openRouterKey: string; model: string; distributions: Distribution[] }) => void;
  initialCount: number;
  currentCount: number;
}

interface Distribution {
  id: string;
  tags: string[];
  count: number;
}

const DeployModal: React.FC<DeployModalProps> = ({ onClose, onDeploy, initialCount, currentCount }) => {
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(OPENROUTER_MODELS[0].id);
  const [distributions, setDistributions] = useState<Distribution[]>([
    { 
      id: 'initial-dist', 
      tags: ['worker'], 
      count: initialCount 
    }
  ]);

  const addDistribution = () => {
    const newDist: Distribution = { 
      id: Math.random().toString(36).substr(2, 9), 
      tags: ['new-tag'], 
      count: 0 
    };
    setDistributions([...distributions, newDist]);
  };

  const removeDistribution = (id: string) => {
    if (distributions.length <= 1) return;
    setDistributions(distributions.filter(d => d.id !== id));
  };

  const updateDistCount = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setDistributions(distributions.map(d => d.id === id ? { ...d, count: Math.max(0, num) } : d));
  };

  const addTagToDist = (id: string, tag: string) => {
    if (!tag.trim()) return;
    setDistributions(distributions.map(d => {
      if (d.id === id && !d.tags.includes(tag.trim())) {
        return { ...d, tags: [...d.tags, tag.trim()] };
      }
      return d;
    }));
  };

  const removeTagFromDist = (id: string, tagToRemove: string) => {
    setDistributions(distributions.map(d => {
      if (d.id === id) {
        return { ...d, tags: d.tags.filter(t => t !== tagToRemove) };
      }
      return d;
    }));
  };

  const batchSize = useMemo(() => 
    distributions.reduce((sum, d) => sum + d.count, 0)
  , [distributions]);

  const totalFleetSize = currentCount + batchSize;

  const isValid = batchSize > 0 && openRouterKey.trim() !== '' && distributions.every(d => d.tags.length > 0);

  const handleDeploy = () => {
    if (!isValid) return;
    onDeploy({
      openRouterKey,
      model: selectedModel,
      distributions: distributions.filter(d => d.count > 0)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 selection:bg-white selection:text-black">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-white/10 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,1)] overflow-hidden">
        
        <header className="flex justify-between items-center border-b border-white/5 pb-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-xl tracking-[0.3em] factory-gradient-text uppercase leading-none">Fleet Provisioning</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-white transition-all p-2 hover:bg-white/5 rounded-full border border-transparent">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col gap-8">
          {/* Global Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
            <div className="space-y-2">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">OpenRouter API Key</label>
              <input 
                type="password"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[11px] font-mono text-white outline-none focus:border-orange-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">Model Selection</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[11px] font-mono text-white outline-none focus:border-orange-400 appearance-none cursor-pointer"
              >
                {OPENROUTER_MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          {/* Class Distributions */}
          <div className="flex-1 flex flex-col min-h-0 gap-4">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">Fleet Classes</label>
                <div className="h-3 w-px bg-white/10"></div>
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Initial Batch: {initialCount} Nodes</span>
              </div>
              <button 
                onClick={addDistribution}
                className="text-[8px] font-bold uppercase tracking-[0.2em] text-orange-400 hover:text-white transition-all"
              >
                + Add Class Group
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
              {distributions.map((dist) => (
                <div key={dist.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-4 relative group hover:border-white/10 transition-all shrink-0">
                  {distributions.length > 1 && (
                    <button 
                      onClick={() => removeDistribution(dist.id)}
                      className="absolute -top-2 -right-2 text-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-[#050505] border border-white/10 rounded-full"
                    >
                      <Icon name="close" size={10} />
                    </button>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <span className="text-[7px] uppercase font-bold text-white tracking-[0.2em]">Class Tags</span>
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-black border border-white/5 rounded-xl">
                        {dist.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/10 border border-white/10 rounded-md text-[9px] font-mono text-white flex items-center gap-2 group/tag">
                            {tag}
                            <button 
                              onClick={() => removeTagFromDist(dist.id, tag)}
                              className="text-white/30 hover:text-red-400 transition-colors"
                            >
                              <Icon name="close" size={8} />
                            </button>
                          </span>
                        ))}
                        <input 
                          type="text"
                          placeholder="Add tag..."
                          className="bg-transparent border-none outline-none text-[9px] font-mono text-white min-w-[80px] placeholder:text-white/20"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addTagToDist(dist.id, (e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-32 space-y-3">
                      <span className="text-[7px] uppercase font-bold text-white tracking-[0.2em]">Quantity</span>
                      <div className="flex items-center gap-3">
                        <input 
                          type="number"
                          min="0"
                          value={dist.count}
                          onChange={(e) => updateDistCount(dist.id, e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-center text-[11px] font-mono text-white outline-none focus:border-red-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <footer className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30">Existing</span>
                  <span className="text-xl font-serif text-white/50 tabular-nums">{currentCount}</span>
                </div>
                <div className="text-white/20 font-serif text-xl">+</div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-orange-400/50">New Batch</span>
                  <span className="text-xl font-serif text-orange-400 tabular-nums">{batchSize}</span>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/50">Total Fleet</span>
                  <span className="text-3xl font-serif text-white tabular-nums">{totalFleetSize}</span>
                </div>
                {!isValid && (
                  <span className="text-[8px] font-mono text-red-400 uppercase tracking-widest animate-pulse ml-4">
                    {openRouterKey.trim() === '' ? 'API Key Required' : distributions.some(d => d.tags.length === 0) ? 'Tags Required' : 'Add nodes'}
                  </span>
                )}
              </div>

              <button 
                onClick={handleDeploy}
                disabled={!isValid}
                className={`px-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] rounded-xl transition-all flex items-center justify-center gap-3 relative group overflow-hidden ${
                  isValid 
                  ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-white/10 text-white cursor-not-allowed'
                }`}
              >
                {isValid && <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>}
                <span className="relative z-10">{isValid ? 'Initialize Fleet' : 'Config Incomplete'}</span>
              </button>
        </footer>
      </div>
    </div>
  );
};

export default DeployModal;

