
import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { AgentInstance, ChatSession } from '../types';

interface TerminalPaneProps {
  instance: AgentInstance;
  onSend: (chatId: string, msg: string) => void;
  isSelected: boolean;
  onSelect: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const TerminalPane: React.FC<TerminalPaneProps> = ({ 
  instance, onSend, isSelected, onSelect, isFullscreen, onToggleFullscreen 
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = instance.chats[0];
  // Using light orange for brand Primary
  const brandPrimary = "orange-400";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat.messages, activeChat.isThinking]);

  return (
    <div className={`flex flex-col overflow-hidden transition-all duration-500 rounded-3xl ${
      isFullscreen ? 'h-full w-full bg-black border border-white/10 shadow-2xl' : 
      `h-[440px] bg-white/5 border ${isSelected ? `border-${brandPrimary} ring-1 ring-${brandPrimary}/50` : 'border-white/5 hover:border-white/20'}`
    }`}>
      {/* Header */}
      <div className={`h-14 px-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-black/30 backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          {!isFullscreen && (
            <button 
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                isSelected ? `bg-${brandPrimary} border-${brandPrimary}` : 'border-white/20 hover:border-white/40'
              }`}
            >
              {isSelected && <Icon name="action" size={10} className="text-white" />}
            </button>
          )}
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${instance.status === 'online' || instance.status === 'running' ? `bg-orange-400 shadow-[0_0_8px_#fb923c]` : 'bg-yellow-500'}`}></div>
              <span className={`text-[10px] font-mono font-bold tracking-widest text-white`}>{instance.name}</span>
            </div>
            <div className="flex gap-1 mt-0.5">
              <span className={`text-[6px] font-mono font-bold uppercase text-orange-400 bg-orange-400/10 px-1 rounded`}>CORE_NODE</span>
              {instance.tags.slice(0, 2).map(tag => (
                <span key={tag} className={`text-[6px] font-mono font-bold uppercase text-red-400 bg-red-400/5 px-1 rounded`}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onToggleFullscreen} className="p-2 text-white hover:text-orange-400 transition-all">
            <Icon name={isFullscreen ? "minimize" : "maximize"} size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar font-mono text-[11px] leading-relaxed">
          {activeChat.messages.map((m, i) => (
            <div key={i} className={`animate-in fade-in slide-in-from-left-2 duration-300 ${m.role === 'user' ? 'text-orange-300' : 'text-white'}`}>
              <div className="flex items-center gap-2 text-[8px] mb-1">
                <span className="uppercase text-white font-bold">{m.role === 'user' ? 'Operator' : 'Agent_Core'}</span>
                <span className="text-white">•</span>
                <span className="text-white">{m.timestamp}</span>
              </div>
              {m.content}
            </div>
          ))}
          {activeChat.isThinking && (
            <div className={`text-orange-400 flex items-center gap-2 animate-pulse font-bold tracking-widest text-[10px]`}>
              INDUSTRIAL_SYNTHESIS_ACTIVE_
            </div>
          )}
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); if (input.trim()) { onSend(activeChat.id, input); setInput(''); } }}
          className={`p-4 bg-black/60 border-t border-white/5 ${isFullscreen ? 'px-10 py-8' : ''}`}
        >
          <div className={`flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-2 transition-all ${isFullscreen ? 'max-w-4xl mx-auto py-4 rounded-2xl' : ''} border-white/5 focus-within:border-orange-400/40`}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send instruction..."
              className="flex-1 bg-transparent border-none outline-none text-[12px] font-mono text-white placeholder:text-white/40"
            />
            <button type="submit" className={`transition-all text-orange-400 hover:text-orange-300`}>
              <Icon name="terminal" size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalPane;
