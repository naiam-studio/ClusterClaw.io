
import React, { useState, useMemo } from 'react';
import { AGENT_PROVIDERS, COMPUTE_OPTIONS, REGIONS } from '../constants';
import Icon from './Icon';

interface DeployModalProps {
  onClose: () => void;
  onDeploy: (distributions: any[]) => void;
  initialCount: number;
}

interface Distribution {
  id: string;
  provider: typeof AGENT_PROVIDERS[0];
  compute: typeof COMPUTE_OPTIONS[0];
  region: typeof REGIONS[0];
  count: number;
}

const DeployModal: React.FC<DeployModalProps> = ({ onClose, onDeploy, initialCount }) => {
  const [totalNodes, setTotalNodes] = useState(initialCount);
  const [distributions, setDistributions] = useState<Distribution[]>([
    { 
      id: 'initial-dist', 
      provider: AGENT_PROVIDERS[0], 
      compute: COMPUTE_OPTIONS[0], 
      region: REGIONS[0], 
      count: initialCount 
    }
  ]);

  const addDistribution = () => {
    const usedProviderIds = distributions.map(d => d.provider.id);
    const nextProvider = AGENT_PROVIDERS.find(p => !usedProviderIds.includes(p.id)) 
      || AGENT_PROVIDERS[distributions.length % AGENT_PROVIDERS.length];
    
    const newDist: Distribution = { 
      id: Math.random().toString(36).substr(2, 9), 
      provider: nextProvider, 
      compute: COMPUTE_OPTIONS[0], 
      region: REGIONS[distributions.length % REGIONS.length], 
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

  const updateDistSettings = (id: string, field: keyof Distribution, value: any) => {
    setDistributions(distributions.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const currentAssigned = useMemo(() => 
    distributions.reduce((sum, d) => sum + d.count, 0)
  , [distributions]);

  const remaining = totalNodes - currentAssigned;
  const isValid = currentAssigned === totalNodes;

  const handleDeploy = () => {
    if (!isValid) return;
    onDeploy(distributions.filter(d => d.count > 0));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-y-auto selection:bg-white selection:text-black">
      <div className="w-full max-w-5xl bg-[#050505] border border-white/10 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,1)]">
        
        <header className="flex justify-between items-center border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-xl tracking-[0.3em] factory-gradient-text uppercase leading-none">Provisioning</h2>
            <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px] text-[7px] font-mono text-white uppercase tracking-widest">v4.0_MANUAL</div>
          </div>
          <button onClick={onClose} className="text-white hover:text-white transition-all p-2 hover:bg-white/5 rounded-full border border-transparent">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">Node Configuration</label>
              <button 
                onClick={addDistribution}
                className="text-[8px] font-bold uppercase tracking-[0.2em] text-orange-400 hover:text-white transition-all"
              >
                + Add Group
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              {distributions.map((dist) => (
                <div key={dist.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row items-end md:items-center gap-6 relative group hover:border-white/10 transition-all">
                  {distributions.length > 1 && (
                    <button 
                      onClick={() => removeDistribution(dist.id)}
                      className="absolute -top-2 -right-2 text-white hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 bg-[#050505] border border-white/10 rounded-full"
                    >
                      <Icon name="close" size={10} />
                    </button>
                  )}

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="space-y-1.5">
                      <span className="text-[7px] uppercase font-bold text-white tracking-[0.2em]">Engine</span>
                      <select 
                        value={dist.provider.id}
                        onChange={(e) => updateDistSettings(dist.id, 'provider', AGENT_PROVIDERS.find(p => p.id === e.target.value))}
                        className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-[9px] font-mono text-white outline-none focus:border-orange-400/40 appearance-none cursor-pointer"
                      >
                        {AGENT_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[7px] uppercase font-bold text-white tracking-[0.2em]">Layer</span>
                      <select 
                        value={dist.compute.id}
                        onChange={(e) => updateDistSettings(dist.id, 'compute', COMPUTE_OPTIONS.find(c => c.id === e.target.value))}
                        className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-[9px] font-mono text-white outline-none focus:border-orange-400/40 appearance-none cursor-pointer"
                      >
                        {COMPUTE_OPTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[7px] uppercase font-bold text-white tracking-[0.2em]">Region</span>
                      <select 
                        value={dist.region.id}
                        onChange={(e) => updateDistSettings(dist.id, 'region', REGIONS.find(r => r.id === e.target.value))}
                        className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-[9px] font-mono text-white outline-none focus:border-orange-400/40 appearance-none cursor-pointer"
                      >
                        {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0">
                    <input 
                      type="number"
                      min="0"
                      value={dist.count}
                      onChange={(e) => updateDistCount(dist.id, e.target.value)}
                      className="w-14 bg-black border border-white/10 rounded-lg px-2 py-2 text-center text-[11px] font-mono text-white outline-none focus:border-red-500/50 transition-all"
                    />
                    <span className="text-[7px] font-mono text-white uppercase tracking-widest">Qty</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between py-2">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-8">
              <div className="space-y-4">
                <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white block">Total Scale</label>
                <div className="flex justify-between items-baseline">
                  <span className="text-5xl font-serif text-white tracking-tighter tabular-nums">{totalNodes}</span>
                  <span className="text-[8px] font-mono text-white tracking-[0.2em] uppercase">Instances</span>
                </div>
                <div className="relative h-1 w-full bg-black rounded-full overflow-hidden">
                    <input 
                        type="range"
                        min="1"
                        max="100"
                        value={totalNodes}
                        onChange={(e) => setTotalNodes(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-600 transition-all"
                        style={{ width: `${(totalNodes/100)*100}%` }}
                    />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-widest">
                   <span className="text-white">Allocated</span>
                   <span className={isValid ? "text-orange-400 font-bold" : "text-white"}>{currentAssigned} / {totalNodes}</span>
                </div>
                {!isValid && (
                  <div className="text-right">
                    <span className="text-[8px] font-mono text-red-400 uppercase tracking-widest">
                      {remaining > 0 ? `Pending: ${remaining} nodes` : `Excess: ${Math.abs(remaining)} nodes`}
                    </span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleDeploy}
                disabled={!isValid}
                className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.4em] rounded-xl transition-all flex items-center justify-center gap-3 relative group overflow-hidden ${
                  isValid 
                  ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-white/10 text-white cursor-not-allowed'
                }`}
              >
                {isValid && <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>}
                <span className="relative z-10">{isValid ? 'Initialize ADD' : 'Config Incomplete'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 opacity-30 mt-6 px-2">
              <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"></div>
              <span className="text-[7px] font-mono text-white uppercase tracking-widest leading-none">Status: Ready for Provisioning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployModal;
