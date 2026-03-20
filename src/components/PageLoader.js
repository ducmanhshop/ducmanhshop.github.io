'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#FAFAFC] flex flex-col items-center justify-center"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="w-[84px] h-[84px] mb-8 flex items-center justify-center">
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
