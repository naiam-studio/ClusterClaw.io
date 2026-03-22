
import React, { useState } from 'react';
import { AgentInstance } from '../types';
import Icon from './Icon';
import TerminalPane from './TerminalPane';

interface FactoryFloorProps {
  instances: AgentInstance[];
  onSendMessage: (id: string, chatId: string, content: string) => void;
  onBulkMessage: (ids: string[], content: string) => void;
  onBulkTag: (ids: string[], tag: string) => void;
  onBack: () => void;
  onAddMore: () => void;
  onShowDocs: () => void;
}

const FactoryFloor: React.FC<FactoryFloorProps> = ({ 
  instances, onSendMessage, onBulkMessage, onBulkTag, onBack, onAddMore, onShowDocs
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState<'message' | 'tag' | null>(null);
  const [bulkValue, setBulkValue] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [fullscreenId, setFullscreenId] = useState<string | null>(null);

  const allTags = Array.from(new Set(instances.flatMap(i => i.tags)));
  const visibleInstances = activeFilterTag 
    ? instances.filter(i => i.tags.includes(activeFilterTag)) 
    : instances;

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectVisible = () => {
    const visibleIds = visibleInstances.map(i => i.id);
    const allVisibleSelected = visibleIds.every(id => selectedIds.includes(id));
    if (allVisibleSelected) {
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleBulkAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkValue.trim()) return;
    if (bulkMode === 'message') onBulkMessage(selectedIds, bulkValue);
    else if (bulkMode === 'tag') onBulkTag(selectedIds, bulkValue);
    setBulkValue('');
    setBulkMode(null);
    setSelectedIds([]);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden animate-in fade-in duration-500 relative bg-[#050505]">
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-black/50 backdrop-blur-md z-30">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="group flex items-center gap-2 text-white hover:text-white transition-all">
              <Icon name="chevron-right" size={14} className="rotate-180" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Vault</span>
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[18px] font-heading font-bold uppercase tracking-[0.4em] factory-gradient-text">ClusterClaw</span>
              </div>
              <button 
                onClick={selectVisible}
                className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                  selectedIds.length > 0 ? 'bg-orange-600 border-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-white border-white/10 hover:border-white/30'
                }`}
              >
                {activeFilterTag ? `Select Visible (${visibleInstances.length})` : `Select Fleet (${instances.length})`}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => setActiveFilterTag(null)}
              className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded transition-all ${
                activeFilterTag === null ? 'bg-white text-black' : 'text-white hover:text-white'
              }`}
            >
              All_Nodes
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveFilterTag(tag)}
                className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded transition-all border ${
                  activeFilterTag === tag ? 'bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]' : 'text-white border-white/5 hover:border-white/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={onShowDocs} className="text-[9px] font-bold uppercase tracking-widest text-white hover:text-white px-4 py-1.5 transition-colors border border-transparent hover:border-white/10 rounded-full">DOCS</button>
          <button onClick={onAddMore} className="bg-white/5 hover:bg-white hover:text-black border border-white/10 px-6 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all text-white">ADD</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 no-scrollbar pb-32">
        {visibleInstances.map(instance => (
          <TerminalPane 
            key={instance.id} 
            instance={instance} 
            isSelected={selectedIds.includes(instance.id)}
            onSelect={() => toggleSelection(instance.id)}
            onSend={(chatId, msg) => onSendMessage(instance.id, chatId, msg)}
            onToggleFullscreen={() => setFullscreenId(instance.id)}
          />
        ))}
      </main>

      {/* Fullscreen Overlay */}
      {fullscreenId && (
        <div className="fixed inset-0 z-[100] bg-black p-4 md:p-10 animate-in zoom-in-95 duration-300">
          <TerminalPane 
            instance={instances.find(i => i.id === fullscreenId)!} 
            isSelected={false}
            onSelect={() => {}}
            onSend={(chatId, msg) => onSendMessage(fullscreenId, chatId, msg)}
            onToggleFullscreen={() => setFullscreenId(null)}
          />
        </div>
      )}

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && !fullscreenId && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-neutral-900 border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] factory-gradient-text">
                Bulk Action: {selectedIds.length} Nodes Selected
              </span>
              <div className="flex gap-2">
                <button onClick={() => setBulkMode('message')} className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${bulkMode === 'message' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}>Broadcast</button>
                <button onClick={() => setBulkMode('tag')} className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${bulkMode === 'tag' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}>Add Tag</button>
                <button onClick={() => { setSelectedIds([]); setBulkMode(null); }} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-red-500/20 text-red-400">Cancel</button>
              </div>
            </div>
            {bulkMode && (
              <form onSubmit={handleBulkAction} className="p-4 flex gap-4 animate-in fade-in duration-300">
                <input type="text" value={bulkValue} onChange={(e) => setBulkValue(e.target.value)} placeholder={bulkMode === 'message' ? "Command fleet..." : "Tag name..."} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-xs font-mono text-white outline-none focus:border-orange-400 transition-all" autoFocus />
                <button type="submit" className="bg-white text-black px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest">Execute</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FactoryFloor;
