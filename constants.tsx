
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

export const OPENROUTER_MODELS = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
  { id: 'meta-llama/llama-3.1-405b-instruct:free', name: 'Llama 3.1 405b (Free)' },
  { id: 'mistralai/mixtral-8x22b', name: 'Mixtral 8x22b' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1' },
  { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72b' },
  { id: 'nousresearch/hermes-3-llama-3.1-405b', name: 'Hermes 3 Llama 3.1 405b' },
  { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash' },
  { id: 'nvidia/nemotron-3-8b-instruct', name: 'Nemotron 3 8b' }
];

export const INITIAL_ORG: Organization = {
  id: 'org-1',
  name: 'Fractal Station',
  factories: [],
  instances: []
};

export const AVAILABLE_AGENTS = OPENROUTER_MODELS;
export const AVAILABLE_RESOURCES = [
  { id: 'res-1', name: 'Cloudflare KV', icon: 'CONFIG' },
  { id: 'res-2', name: 'D1 Database', icon: 'CONFIG' },
  { id: 'res-3', name: 'R2 Storage', icon: 'TOOL' }
];
