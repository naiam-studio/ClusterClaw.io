
import React from 'react';
import { User } from '../types';
import Icon from './Icon';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const handleAuth = () => {
    onSuccess({ id: 'u1', name: 'Operator', email: 'op@reflecter.ai' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
      <div className="w-full max-w-sm space-y-10 animate-in fade-in zoom-in-95 duration-300 text-center">
        <header className="space-y-4">
          <div className="w-12 h-12 border border-white mx-auto flex items-center justify-center mb-6">
            <div className="w-1.5 h-1.5 bg-white"></div>
          </div>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-widest">Identify to Launch</h2>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Securing Production Uplink...</p>
        </header>

        <div className="space-y-3">
          <button 
            onClick={handleAuth}
            className="w-full py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
          >
            <Icon name="action" size={14} />
            Uplink with Google
          </button>
          <button 
            onClick={onClose}
            className="w-full py-5 border border-white/10 text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-500 hover:text-white transition-all"
          >
            Cancel
          </button>
        </div>

        <p className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest leading-loose">
          Authorized personnel only. <br/> All sessions are logged for integrity.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
