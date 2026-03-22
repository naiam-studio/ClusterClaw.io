
import React, { useState } from 'react';
import { AgentInstance, ChatSession } from './types';
import { GoogleGenAI } from "@google/genai";
import LandingView from './components/LandingView';
import FactoryFloor from './components/FactoryFloor';
import DeployModal from './components/DeployModal';
import WikiView from './components/WikiView';
import Background3D from './components/Background3D';

export default function App() {
  const [openRouterConfig, setOpenRouterConfig] = useState<{ key: string; model: string } | null>(null);
  const [view, setView] = useState<'entry' | 'active'>('entry');
  const [instances, setInstances] = useState<AgentInstance[]>([]);
  const [showDeploy, setShowDeploy] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [pendingCount, setPendingCount] = useState(1);

  const handleLaunchRequest = (count: number) => {
    setPendingCount(count);
    setShowDeploy(true);
  };

  const deployInstances = (config: { openRouterKey: string; model: string; distributions: any[] }) => {
    const newInstances: AgentInstance[] = [];
    setOpenRouterConfig({ key: config.openRouterKey, model: config.model });
    
    config.distributions.forEach(dist => {
      for (let i = 0; i < dist.count; i++) {
        const id = `node-${Math.random().toString(36).substr(2, 9)}`;
        const timestamp = new Date().toLocaleTimeString().slice(0, 5);
        
        const initialMessage = { 
          role: 'agent' as const, 
          content: `Node established. Model: ${config.model}. System integrity verified.`, 
          timestamp 
        };

        const tags = [...dist.tags, 'openrouter', 'production-v6'];

        newInstances.push({
          id,
          name: `NODE_${String(instances.length + newInstances.length + 1).padStart(3, '0')}`,
          status: 'booting',
          provider: 'OpenRouter',
          vCPU: 'Dynamic',
          ram: 'Dynamic',
          region: 'Global Edge',
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
      let aiText = "";
      
      if (openRouterConfig) {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openRouterConfig.key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "ClusterClaw"
          },
          body: JSON.stringify({
            model: openRouterConfig.model,
            messages: [{ role: "user", content }]
          })
        });
        const data = await response.json();
        aiText = data.choices?.[0]?.message?.content || "Error: No response from OpenRouter.";
      } else {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: content,
        });
        aiText = response.text || "Connection failed. Please verify neural uplink.";
      }

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
          onBulkMessage={(ids, msg) => ids.forEach(id => {
            const inst = instances.find(i => i.id === id);
            if (inst) handleSendMessage(id, inst.activeChatId || inst.chats[0].id, msg);
          })}
          onBulkTag={handleBulkTag}
          onBack={() => setView('entry')}
          onAddMore={() => handleLaunchRequest(1)}
          onShowDocs={() => setShowDocs(true)}
        />
      )}

      {showDeploy && (
        <DeployModal 
          onClose={() => setShowDeploy(false)} 
          onDeploy={deployInstances} 
          initialCount={pendingCount} 
          currentCount={instances.length}
        />
      )}

      {showDocs && <WikiView onClose={() => setShowDocs(false)} />}
    </div>
  );
}
