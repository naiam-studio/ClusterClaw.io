
import React from 'react';
import { 
  FileCode, 
  Workflow, 
  Wrench, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  Play, 
  Terminal, 
  Search,
  X,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Cloud
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 16, className = "" }) => {
  switch (name) {
    case 'AGENT': return <Cpu size={size} className={className} />;
    case 'FLOW': return <Workflow size={size} className={className} />;
    case 'TOOL': return <Wrench size={size} className={className} />;
    case 'CONFIG': return <Settings size={size} className={className} />;
    case 'chevron-right': return <ChevronRight size={size} className={className} />;
    case 'chevron-down': return <ChevronDown size={size} className={className} />;
    case 'play': return <Play size={size} className={className} />;
    case 'terminal': return <Terminal size={size} className={className} />;
    case 'search': return <Search size={size} className={className} />;
    case 'close': return <X size={size} className={className} />;
    case 'security': return <ShieldCheck size={size} className={className} />;
    case 'action': return <Zap size={size} className={className} />;
    case 'globe': return <Globe size={size} className={className} />;
    case 'database': return <Database size={size} className={className} />;
    case 'cloud': return <Cloud size={size} className={className} />;
    default: return <FileCode size={size} className={className} />;
  }
};

export default Icon;
