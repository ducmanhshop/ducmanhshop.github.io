'use client';

import { useApp } from '@/context/AppContext';
import { Check } from 'lucide-react';

export default function Toast() {
  const { toastMessage, toastVisible } = useApp();

  return (
    <div className={`fixed top-6 md:top-8 left-1/2 z-[200] w-max max-w-[90vw] toast-notification ${toastVisible ? 'visible' : ''}`}>
      <div className="bg-[#1d1d1f]/90 backdrop-blur-xl text-white px-4 py-2.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/10 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 text-green-400 stroke-[3]" />
        </div>
        <span className="text-[13px] md:text-sm font-bold tracking-wide pr-2">{toastMessage}</span>
      </div>
    </div>
  );
}
