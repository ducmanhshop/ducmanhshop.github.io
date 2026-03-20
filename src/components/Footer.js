'use client';

import { useApp } from '@/context/AppContext';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { navigateTo, setProfileOpen, setWarrantyOpen, setTermsOpen } = useApp();

  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-black/5 pt-8 md:pt-10 pb-24 md:pb-10 transition-colors duration-300 relative z-30 mt-6 md:mt-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-3 mb-8">
          <button onClick={() => navigateTo('home')} className="text-[13px] md:text-sm text-gray-500 hover:text-[#1d1d1f] font-bold transition-colors">Trang chủ</button>
          <button onClick={() => navigateTo('home')} className="text-[13px] md:text-sm text-gray-500 hover:text-[#1d1d1f] font-bold transition-colors">Sản phẩm</button>
          <button onClick={() => setProfileOpen(true)} className="text-[13px] md:text-sm text-gray-500 hover:text-[#1d1d1f] font-bold transition-colors">Tra cứu đơn</button>
          <button onClick={() => setWarrantyOpen(true)} className="text-[13px] md:text-sm text-gray-500 hover:text-[#1d1d1f] font-bold transition-colors">Bảo hành</button>
          <button onClick={() => setTermsOpen(true)} className="text-[13px] md:text-sm text-gray-500 hover:text-[#1d1d1f] font-bold transition-colors">Điều khoản</button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-5 md:pt-6 border-t border-black/5 gap-4 md:gap-5">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="MDM Store" className="w-7 h-7 object-contain drop-shadow-sm" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-7 h-7 bg-[#1d1d1f] rounded-[8px] flex items-center justify-center shadow-sm"><span class="text-white font-black text-xs">M</span></div>'; }} />
            <span className="font-black text-sm md:text-base text-[#1d1d1f] tracking-tight">MDM Store</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[12px] md:text-[13px] font-medium text-gray-500 bg-white shadow-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-black/5">
            <a href="https://zalo.me/0837065321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors whitespace-nowrap">
              <Phone className="w-3.5 h-3.5" /> 0837065321
            </a>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <a href="mailto:admin@mdmstore.com" className="flex items-center gap-1.5 hover:text-[#1d1d1f] transition-colors whitespace-nowrap">
              <Mail className="w-3.5 h-3.5" /> admin@mdmstore.com
            </a>
          </div>
          <div className="text-[12px] text-gray-400 font-medium text-center md:text-right">
            <p>&copy; 2026 MDM Store.</p>
            <p className="mt-0.5">By Nông Đức Mạnh.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
