
import React from 'react';
import { ProjectFile } from '../types';
import Icon from './Icon';

interface EditorProps {
  files: ProjectFile[];
  activeFileId: string | null;
  onFileSelect: (id: string) => void;
  onFileClose: (id: string, e: React.MouseEvent) => void;
}

const Editor: React.FC<EditorProps> = ({ files, activeFileId, onFileSelect, onFileClose }) => {
  const openFiles = files.filter(f => f.isOpen);
  const activeFile = files.find(f => f.id === activeFileId);

  if (!activeFile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-neutral-300 pointer-events-none bg-white">
        <div className="font-serif text-4xl mb-4 opacity-10">REFLECTER</div>
        <div className="text-[10px] tracking-[0.2em] uppercase font-bold">Select a core to initialize</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Tabs */}
      <div className="flex bg-[#F9F9F9] border-b border-[#E5E5E5] overflow-x-auto no-scrollbar">
        {openFiles.map(file => (
          <div
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            className={`group flex items-center gap-2 px-4 py-2 text-xs cursor-pointer border-r border-[#E5E5E5] transition-all relative ${
              activeFileId === file.id 
                ? 'bg-white text-black font-semibold' 
                : 'bg-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Icon name={file.type} size={12} />
            <span>{file.name}</span>
            <button 
              onClick={(e) => onFileClose(file.id, e)}
              className="p-0.5 rounded hover:bg-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
            >
              <Icon name="close" size={10} />
            </button>
            {activeFileId === file.id && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-black" />
            )}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-[#E5E5E5] flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-neutral-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon name="security" size={12} className="text-black" />
            <span>Logical Integrity: Verified</span>
          </div>
          <div className="flex items-center gap-1">
             <Icon name="action" size={12} className="text-black" />
             <span>Active Nodes: 04</span>
          </div>
        </div>
        <button className="flex items-center gap-1 bg-black text-white px-3 py-1 hover:bg-neutral-800 transition-colors">
          <Icon name="play" size={10} />
          <span>Execute Flow</span>
        </button>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative">
        <textarea
          className="absolute inset-0 w-full h-full p-8 font-mono text-sm leading-relaxed outline-none resize-none spellcheck-false"
          value={activeFile.content}
          spellCheck={false}
          readOnly
        />
        {/* Line Numbers Simulation */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#FBFBFB] border-r border-neutral-100 flex flex-col items-center pt-8 text-[10px] text-neutral-300 font-mono select-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-[21px]">{i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
