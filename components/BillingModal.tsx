
import React from 'react';
import Icon from './Icon';

interface BillingModalProps {
  onClose: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <header className="flex justify-between items-start mb-10">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl tracking-widest text-white uppercase">Financial Control</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Compute Credits & Resource Consumption</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-all p-3 bg-neutral-900 rounded-full">
            <Icon name="close" size={24} />
          </button>
        </header>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Available Credit</span>
            <div className="text-3xl font-mono text-white">$432.12</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">MTD Burn Rate</span>
            <div className="text-3xl font-mono text-white">$12.05 <span className="text-xs text-white/30">/day</span></div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Recent Invoices</h4>
          {[
            { id: 'INV-4402', date: 'Oct 12, 2025', amount: '$42.10', status: 'PAID' },
            { id: 'INV-3981', date: 'Sep 12, 2025', amount: '$38.00', status: 'PAID' }
          ].map(inv => (
            <div key={inv.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{inv.id}</span>
                <span className="text-[9px] font-mono text-white/30 uppercase">{inv.date}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-white">{inv.amount}</span>
                <span className="text-[8px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-widest">{inv.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex gap-4">
          <button className="flex-1 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all">
            Add Funds
          </button>
          <button className="flex-1 py-4 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all">
            Usage Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingModal;
