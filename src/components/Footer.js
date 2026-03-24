'use client';

import { useApp } from '@/context/AppContext';
import useScrollReveal from '@/lib/useScrollReveal';
import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { setProfileOpen, setWarrantyOpen, setTermsOpen } = useApp();
  const ref = useScrollReveal({ threshold: 0.1 });

  return (
    <footer ref={ref} className="scroll-reveal bg-[#09090b] text-white pt-12 md:pt-16 pb-28 md:pb-12 relative z-30 mt-10 md:mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 mb-10">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.webp" alt="MDM Store" className="w-8 h-8 object-contain" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-8 h-8 bg-white/10 rounded-[10px] flex items-center justify-center border border-white/5"><span class="text-white font-black text-sm">M</span></div>'; }} />
              <div>
                <span className="font-extrabold text-[15px] tracking-tight">MDM Store</span>
                <span className="text-[9px] text-white/30 font-semibold tracking-[0.15em] block">PREMIUM ACCOUNTS</span>
              </div>
            </div>
            <p className="text-[13px] text-zinc-500 font-medium leading-relaxed max-w-xs">
              Tài khoản Premium chính hãng, bảo hành trọn đời. Giao hàng tự động 24/7.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/" className="text-[13px] text-zinc-400 hover:text-white font-medium transition-colors duration-200">Trang chủ</Link>
            <Link href="/" className="text-[13px] text-zinc-400 hover:text-white font-medium transition-colors duration-200">Sản phẩm</Link>
            <button onClick={() => setProfileOpen(true)} className="text-[13px] text-zinc-400 hover:text-white font-medium transition-colors duration-200">Tra cứu đơn</button>
            <button onClick={() => setWarrantyOpen(true)} className="text-[13px] text-zinc-400 hover:text-white font-medium transition-colors duration-200">Bảo hành</button>
            <button onClick={() => setTermsOpen(true)} className="text-[13px] text-zinc-400 hover:text-white font-medium transition-colors duration-200">Điều khoản</button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-[12px] text-zinc-500 font-medium">
            <a href="https://zalo.me/0837065321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <Phone className="w-3.5 h-3.5" /> 0837065321
            </a>
            <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
            <a href="mailto:admin@mdmstore.com" className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <Mail className="w-3.5 h-3.5" /> admin@mdmstore.com
            </a>
          </div>
          <div className="text-[11px] text-zinc-600 font-medium text-center md:text-right">
            &copy; 2026 MDM Store · By Nông Đức Mạnh
          </div>
        </div>
      </div>
    </footer>
  );
}
