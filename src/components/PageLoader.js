'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [phase, setPhase] = useState('loading'); // loading -> fadeOut -> hidden

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fadeOut'), 1200);
    const hideTimer = setTimeout(() => setPhase('hidden'), 1900);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#FAFAFC] flex flex-col items-center justify-center"
      style={{
        opacity: phase === 'fadeOut' ? 0 : 1,
        transform: phase === 'fadeOut' ? 'scale(1.04)' : 'scale(1)',
        filter: phase === 'fadeOut' ? 'blur(8px)' : 'blur(0px)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'fadeOut' ? 'none' : 'auto',
      }}
    >
      <div className="w-[84px] h-[84px] mb-8 flex items-center justify-center" style={{ animation: 'gentlePulse 2s ease-in-out infinite' }}>
        <img
          src="/logo.webp"
          alt="MDM Store"
          className="w-full h-full object-contain drop-shadow-xl"
          style={{ color: 'transparent' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.outerHTML = '<div class="w-[72px] h-[72px] bg-[#1d1d1f] rounded-[20px] flex items-center justify-center shadow-lg"><span class="font-black text-4xl text-white">M</span></div>';
          }}
        />
      </div>
      <div className="w-[140px] h-[4px] bg-gray-200/80 rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-full bg-[#1d1d1f] rounded-full origin-left animate-apple-load"></div>
      </div>
    </div>
  );
}
