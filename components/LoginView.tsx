
import React from 'react';
import { User } from '../types';
import Icon from './Icon';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const handleGoogleLogin = () => {
    // Mock login
    onLogin({
      id: 'user-1',
      name: 'Professional User',
      email: 'user@reflecter.io'
    });
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:30px_30px] w-full h-full"></div>
      </div>

      <div className="w-full max-w-md space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-6">
           <div className="w-16 h-16 border-2 border-black dark:border-white flex items-center justify-center mx-auto mb-10 group hover:rotate-180 transition-all duration-700">
             <div className="w-2 h-2 bg-black dark:bg-white"></div>
           </div>
           <h1 className="font-serif text-4xl tracking-[0.5em] uppercase font-bold">Reflecter</h1>
           <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-neutral-400">Fleet Deployment System</p>
        </div>

        <div className="space-y-4">
           <button 
             onClick={handleGoogleLogin}
             className="w-full flex items-center justify-center gap-4 py-5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
           >
              <div className="w-5 h-5 flex items-center justify-center bg-black/[0.05] group-hover:bg-white/10 rounded-full">
                <Icon name="action" size={12} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Continue with Google</span>
           </button>
           <button className="w-full py-5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 cursor-not-allowed">
              Email & Password
           </button>
        </div>

        <div className="pt-10 flex flex-col items-center gap-6 opacity-40">
           <div className="w-10 h-px bg-black dark:bg-white"></div>
           <p className="text-[8px] font-mono uppercase tracking-[0.5em] text-center leading-loose">
              By continuing, you agree to the <br/> Reflecter Terms of Service and Protocol
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
