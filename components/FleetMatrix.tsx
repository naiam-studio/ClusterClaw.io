
import React from 'react';
import { Organization } from '../types';
import Icon from './Icon';

interface FleetMatrixProps {
  org: Organization;
  onSelect: (id: string) => void;
  onKill: (id: string) => void;
  onDeploy: () => void;
}

const FleetMatrix: React.FC<FleetMatrixProps> = ({ org, onSelect, onKill, onDeploy }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <header className="space-y-1">
           <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Production Floor</h1>
           <p className="text-xs font-medium text-slate-500 tracking-wide">Orchestrating {org.instances.length} intelligence nodes across {org.factories.length} production lines.</p>
        </header>

        {org.factories.map(factory => (
          <section key={factory.id} className="space-y-6">
             <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">{factory.name}</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{factory.id.toUpperCase()}</span>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {org.instances.filter(i => i.groupId === factory.id).map(instance => (
                  <div 
                    key={instance.id}
                    onClick={() => onSelect(instance.id)}
                    className="group relative bg-white dark:bg-slate-900/40 border border-black/5 dark:border-white/5 p-5 rounded-3xl hover:border-blue-500/40 transition-all cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Glass effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10 space-y-5">
                      <div className="flex items-start justify-between">
                         <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon name="AGENT" size={18} />
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{instance.region.split(' ')[0]}</span>
                            <div className="flex items-center gap-1">
                               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                               <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">LIVE</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-1">
                         <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate">{instance.name}</h4>
                         <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                            <span>{instance.vCPU}</span>
                            <span>•</span>
                            <span>{instance.ram}</span>
                         </div>
                      </div>

                      <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                               {[1,2].map(x => <div key={x} className="w-4 h-4 rounded-full border border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800"></div>)}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{instance.chats.length} Sessions</span>
                         </div>
                         <button 
                           onClick={(e) => { e.stopPropagation(); onKill(instance.id); }}
                           className="p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                         >
                           <Icon name="close" size={14} />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div 
                  onClick={onDeploy}
                  className="group border-2 border-dashed border-black/5 dark:border-white/5 p-5 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all cursor-pointer min-h-[160px]"
                >
                   <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                      <Icon name="close" size={20} className="rotate-45" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest">Add Instance</span>
                </div>
             </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FleetMatrix;
