
import React from 'react';
import { ProjectFile } from '../types';
import Icon from './Icon';

interface SidebarProps {
  files: ProjectFile[];
  activeFileId: string | null;
  onFileSelect: (id: string) => void;
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({ files, activeFileId, onFileSelect, width }) => {
  return (
    <div style={{ width }} className="h-full flex flex-col bg-[#F9F9F9] border-r border-[#E5E5E5] select-none overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <span className="font-serif font-bold text-xs tracking-widest uppercase">Workspace</span>
        <div className="flex gap-2">
           <button className="p-1 hover:bg-black hover:text-white transition-colors"><Icon name="search" size={14}/></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-2">
          <div className="flex items-center gap-1 p-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            <Icon name="chevron-down" size={10} />
            <span>Project Sanctum</span>
          </div>
          <div className="space-y-0.5 ml-2">
            {files.map(file => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs transition-colors border-l-2 ${
                  activeFileId === file.id 
                    ? 'bg-white border-black text-black font-medium' 
                    : 'border-transparent text-neutral-500 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <Icon name={file.type} size={14} />
                <span className="truncate">{file.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 px-2">
          <div className="flex items-center gap-1 p-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            <Icon name="chevron-right" size={10} />
            <span>Agent Library</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#E5E5E5] bg-neutral-50 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
        System Protocol v4.0.1
      </div>
    </div>
  );
};

export default Sidebar;
