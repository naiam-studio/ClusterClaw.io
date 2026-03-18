
import React, { useState } from 'react';
import { User, AgentInstance, ChatSession } from './types';
import { GoogleGenAI } from "@google/genai";
import LandingView from './components/LandingView';
import LoginModal from './components/LoginModal';
import FactoryFloor from './components/FactoryFloor';
import BillingModal from './components/BillingModal';
import DeployModal from './components/DeployModal';
import WikiView from './components/WikiView';
import Background3D from './components/Background3D';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'entry' | 'active'>('entry');
  const [instances, setInstances] = useState<AgentInstance[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [pendingCount, setPendingCount] = useState(1);

  const handleLaunchRequest = (count: number) => {
    setPendingCount(count);
    if (!user) {
      setShowLogin(true);
    } else {
      setShowDeploy(true);
    }
  };

  const deployInstances = (distributions: any[]) => {
    const newInstances: AgentInstance[] = [];
    
    distributions.forEach(dist => {
      for (let i = 0; i < dist.count; i++) {
        const id = `node-${Math.random().toString(36).substr(2, 9)}`;
        const timestamp = new Date().toLocaleTimeString().slice(0, 5);
        const isCloudflare = dist.provider.provider.includes('Cloudflare');
        
        const initialMessage = { 
          role: 'agent' as const, 
          content: `Node established in ${dist.region.name}. Running ${dist.provider.name} engine. System integrity verified.`, 
          timestamp 
        };

        const tags = Array.from(new Set([
          dist.provider.tag,
          dist.compute.tag,
          dist.region.tag,
          isCloudflare ? 'edge' : 'cloud',
          'production-v4'
        ]));

        newInstances.push({
          id,
          name: `${isCloudflare ? 'WORKER' : 'NODE'}_${String(instances.length + newInstances.length + 1).padStart(3, '0')}`,
          status: 'booting',
          provider: dist.provider.name,
          vCPU: dist.compute.vCPU,
          ram: dist.compute.ram,
          region: dist.region.name,
          messages: [initialMessage],
          chats: [{
            id: 'chat-default',
            name: 'Primary Uplink',
            lastUpdate: timestamp,
            messages: [initialMessage]
          }],
          activeChatId: 'chat-default',
          tags: tags
        });
      }
    });

    setInstances(prev => [...prev, ...newInstances]);
    setView('active');
    setShowDeploy(false);

    newInstances.forEach(ni => {
      setTimeout(() => {
        setInstances(prev => prev.map(inst => inst.id === ni.id ? { ...inst, status: 'online' } : inst));
      }, 500 + Math.random() * 1000);
    });
  };

  const handleSendMessage = async (id: string, chatId: string, content: string) => {
    const timestamp = new Date().toLocaleTimeString().slice(0, 5);
    setInstances(prev => prev.map(inst => inst.id === id ? {
      ...inst,
      chats: inst.chats.map(chat => chat.id === chatId ? {
        ...chat,
        isThinking: true,
        messages: [...chat.messages, { role: 'user', content, timestamp }]
      } : chat)
    } : inst));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: content,
      });
      const aiText = response.text || "Connection failed. Please verify neural uplink.";
      setInstances(prev => prev.map(inst => inst.id === id ? {
        ...inst,
        chats: inst.chats.map(chat => chat.id === chatId ? {
          ...chat,
          isThinking: false,
          messages: [...chat.messages, { role: 'agent', content: aiText, timestamp: new Date().toLocaleTimeString().slice(0, 5) }]
        } : chat)
      } : inst));
    } catch (e) {
      setInstances(prev => prev.map(inst => inst.id === id ? {
        ...inst,
        chats: inst.chats.map(chat => chat.id === chatId ? { ...chat, isThinking: false } : chat)
      } : inst));
    }
  };

  const handleNewChat = (instanceId: string) => {
    const timestamp = new Date().toLocaleTimeString().slice(0, 5);
    const newChat: ChatSession = {
      id: `chat-${Math.random().toString(36).substr(2, 5)}`,
      name: `Stream ${Math.random().toString(36).substr(2, 2).toUpperCase()}`,
      lastUpdate: timestamp,
      messages: [{ role: 'agent', content: 'New context stream initialized. Waiting for input...', timestamp }]
    };
    setInstances(prev => prev.map(inst => inst.id === instanceId ? {
      ...inst,
      chats: [...inst.chats, newChat],
      activeChatId: newChat.id
    } : inst));
  };

  const handleBulkTag = (ids: string[], tag: string) => {
    const cleanTag = tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!cleanTag) return;
    setInstances(prev => prev.map(inst => ids.includes(inst.id) ? { ...inst, tags: Array.from(new Set([...inst.tags, cleanTag])) } : inst));
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      <Background3D />
      
      {view === 'entry' ? (
        <LandingView 
          onLaunch={handleLaunchRequest} 
          onShowDocs={() => setShowDocs(true)}
        />
      ) : (
        <FactoryFloor 
          instances={instances} 
          onSendMessage={handleSendMessage}
          onNewChat={handleNewChat}
          onSwitchChat={(id, chatId) => setInstances(prev => prev.map(i => i.id === id ? { ...i, activeChatId: chatId } : i))}
          onBulkMessage={(ids, msg) => ids.forEach(id => {
            const inst = instances.find(i => i.id === id);
            if (inst) handleSendMessage(id, inst.activeChatId || inst.chats[0].id, msg);
          })}
          onBulkTag={handleBulkTag}
          onBack={() => setView('entry')}
          onAddMore={() => setShowDeploy(true)}
          onShowBilling={() => setShowBilling(true)}
          onShowDocs={() => setShowDocs(true)}
        />
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onSuccess={(u) => { setUser(u); setShowLogin(false); setShowDeploy(true); }} />
      )}

      {showDeploy && (
        <DeployModal 
          onClose={() => setShowDeploy(false)} 
          onDeploy={deployInstances} 
          initialCount={pendingCount} 
        />
      )}

      {showBilling && <BillingModal onClose={() => setShowBilling(false)} />}
      
      {showDocs && <WikiView onClose={() => setShowDocs(false)} />}
    </div>
  );
}
