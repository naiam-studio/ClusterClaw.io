
import React, { useState } from 'react';
import { Organization, FactoryGroup } from '../types';
import Icon from './Icon';

interface FactorySidebarProps {
  org: Organization;
  activeId: string | null;
  onSelect: (id: string) => void;
  onKill: (id: string) => void;
}

const FactorySidebar: React.FC<FactorySidebarProps> = ({ org, activeId, onSelect, onKill }) => {
  const [collapsedFactories, setCollapsedFactories] = useState<string[]>([]);

  const toggleFactory = (id: string) => {
    setCollapsedFactories(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-60 border-r border-black/5 dark:border-white/5 bg-slate-50/40 dark:bg-black/20 backdrop-blur-xl flex flex-col shrink-0 select-none">
      <div className="p-4 border-b border-black/5 dark:border-white/5">
         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Production Lines</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 no-scrollbar">
        {org.factories.map(factory => (
          <div key={factory.id} className="space-y-0.5">
            <div 
              onClick={() => toggleFactory(factory.id)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer group hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-xl transition-all"
            >
              <Icon 
                name={collapsedFactories.includes(factory.id) ? "chevron-right" : "chevron-down"} 
                size={12} 
                className="text-slate-400" 
              />
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-wider">
                {factory.name}
              </span>
            </div>

            {!collapsedFactories.includes(factory.id) && (
              <div className="ml-3 pl-2.5 border-l-2 border-slate-100 dark:border-white/5 space-y-0.5">
                {org.instances.filter(i => i.groupId === factory.id).map(instance => (
                  <div 
                    key={instance.id}
                    onClick={() => onSelect(instance.id)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
                      activeId === instance.id 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${instance.status === 'running' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                      <span className="text-[11px] font-semibold truncate tracking-tight">{instance.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-black/5 dark:border-white/5 bg-slate-100/30 dark:bg-black/20">
         <div className="space-y-3">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
               <span>System Usage</span>
               <span className="text-slate-900 dark:text-white">78%</span>
            </div>
            <div className="h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-[78%] transition-all duration-1000"></div>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default FactorySidebar;
