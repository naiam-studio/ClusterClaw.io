
export interface Message {
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  name: string;
  lastUpdate: string;
  messages: Message[];
  isThinking?: boolean;
}

export interface AgentInstance {
  id: string;
  name: string;
  status: 'booting' | 'online' | 'error' | 'running';
  messages: Message[];
  isThinking?: boolean;
  provider: string;
  vCPU: string;
  ram: string;
  region: string;
  groupId?: string;
  activeChatId?: string;
  chats: ChatSession[];
  tags: string[]; // Identificadores lógicos (ej: "backend", "test")
}

export interface FactoryGroup {
  id: string;
  name: string;
  description: string;
  instances: string[];
}

export interface Organization {
  id: string;
  name: string;
  factories: FactoryGroup[];
  instances: AgentInstance[];
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  content: string;
  isOpen: boolean;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agentName: string;
  message: string;
  status: 'error' | 'warning' | 'success' | 'info';
}
