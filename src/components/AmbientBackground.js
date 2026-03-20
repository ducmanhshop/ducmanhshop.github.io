'use client';

import { useApp } from '@/context/AppContext';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#FAFAFC] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(#d4d4d8 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[80vw] h-[50vw] min-w-[600px] min-h-[400px] rounded-full bg-white blur-[100px] animate-[float_20s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FAFAFC]"></div>
    </div>
  );
}
