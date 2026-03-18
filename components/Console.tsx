
import React from 'react';
import { AgentLog } from '../types';
import Icon from './Icon';

interface ConsoleProps {
  logs: AgentLog[];
  height: number;
}

const Console: React.FC<ConsoleProps> = ({ logs, height }) => {
  return (
    <div style={{ height }} className="bg-black text-[#E5E5E5] flex flex-col font-mono text-[11px] overflow-hidden">
      <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Icon name="terminal" size={12} />
          <span className="font-bold tracking-widest uppercase">Sanctum Console</span>
        </div>
        <div className="flex gap-4 uppercase text-[9px] font-bold text-neutral-500">
          <span className="hover:text-white cursor-pointer transition-colors">Clear</span>
          <span className="hover:text-white cursor-pointer transition-colors">Wrap</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {logs.map(log => (
          <div key={log.id} className="flex gap-4 group">
            <span className="text-neutral-600 flex-shrink-0">[{log.timestamp}]</span>
            <span className={`flex-shrink-0 uppercase font-bold ${
              log.agentName === 'SYSTEM' ? 'text-white' : 'text-neutral-400'
            }`}>{log.agentName}:</span>
            <span className={`flex-1 ${
              log.status === 'error' ? 'text-red-400' : 
              log.status === 'warning' ? 'text-yellow-400' :
              log.status === 'success' ? 'text-green-400' :
              'text-[#E5E5E5]'
            }`}>{log.message}</span>
          </div>
        ))}
        <div className="flex gap-4 animate-pulse">
           <span className="text-neutral-600">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
           <span className="text-white">_</span>
        </div>
      </div>
    </div>
  );
};

export default Console;
