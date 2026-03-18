
import { Organization } from './types';

export const COMPUTE_OPTIONS = [
  { 
    id: 'cf-worker-standard', 
    name: 'Cloudflare Worker AI', 
    vCPU: 'Shared CPU (Edge)', 
    ram: '128MB (Standard)', 
    price: 0.0001, 
    unit: 'req',
    tag: 'edge-worker'
  },
  { 
    id: 'e2-small', 
    name: 'GCP e2-small', 
    vCPU: '2 vCPU', 
    ram: '2 GB RAM', 
    price: 0.02, 
    unit: 'hr',
    tag: 'cloud-compute'
  },
  { 
    id: 'lambda-gpu', 
    name: 'Lambda H100 Instance', 
    vCPU: '8 vCPU', 
    ram: '32 GB RAM', 
    price: 2.50, 
    unit: 'hr',
    tag: 'gpu-accelerated'
  }
];

export const REGIONS = [
  { id: 'mad', name: 'MAD (Madrid, Spain)', tag: 'region-mad' },
  { id: 'lhr', name: 'LHR (London, UK)', tag: 'region-lhr' },
  { id: 'sfo', name: 'SFO (San Francisco, US)', tag: 'region-sfo' },
  { id: 'nrt', name: 'NRT (Tokyo, Japan)', tag: 'region-nrt' },
  { id: 'fra', name: 'FRA (Frankfurt, Germany)', tag: 'region-fra' }
];

export const AGENT_PROVIDERS = [
  { id: 'qwen-2.5-cf', name: 'Qwen 2.5 7B', provider: 'Cloudflare Workers AI', capabilities: 'High Performance Edge', tag: 'qwen-2.5' },
  { id: 'gemini-3.0-flash', name: 'Gemini 3.0 Flash', provider: 'Google Cloud', capabilities: 'Speed & Multimodality', tag: 'gemini-3.0' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'Groq/Meta', capabilities: 'High Reasoning', tag: 'llama-3.1' },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI', capabilities: 'Nuance & Logic', tag: 'mistral-large' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', capabilities: 'Coding Excellence', tag: 'claude-3.5' }
];

export const INITIAL_ORG: Organization = {
  id: 'org-1',
  name: 'Fractal Station',
  factories: [],
  instances: []
};

export const AVAILABLE_AGENTS = AGENT_PROVIDERS;
export const AVAILABLE_RESOURCES = [
  { id: 'res-1', name: 'Cloudflare KV', icon: 'CONFIG' },
  { id: 'res-2', name: 'D1 Database', icon: 'CONFIG' },
  { id: 'res-3', name: 'R2 Storage', icon: 'TOOL' }
];
