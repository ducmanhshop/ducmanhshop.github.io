'use client';

import { Home, Search, ShoppingBag, User, UserCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function MobileNav() {
  const { cart, setCartOpen, setSearchOpen, currentUser, setProfileOpen } = useApp();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 8px) + 12px)' }}>
      <div className="bg-white/95 backdrop-blur-xl rounded-full flex items-center px-5 py-1.5 gap-2 w-full max-w-[280px] justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/[0.04]">
        <Link href="/" className="nav-pill-item flex flex-col items-center justify-center w-[48px] h-[48px] rounded-full text-gray-400 hover:text-[#1d1d1f]">
          <Home className="w-5 h-5 stroke-[2.25] mb-0.5" />
          <span className="text-[9px] font-bold">Home</span>
        </Link>
        <button onClick={() => setSearchOpen(true)} className="nav-pill-item flex flex-col items-center justify-center w-[48px] h-[48px] rounded-full text-gray-400 hover:text-[#1d1d1f]">
          <Search className="w-5 h-5 stroke-[2.25] mb-0.5" />
          <span className="text-[9px] font-bold">Tìm</span>
        </button>
        <button onClick={() => setCartOpen(true)} className="nav-pill-item relative flex flex-col items-center justify-center w-[48px] h-[48px] rounded-full text-gray-400 hover:text-[#1d1d1f]">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2.25] mb-0.5" />
            <span className={`absolute -top-1 -right-2 min-w-[16px] h-[16px] bg-[#1d1d1f] text-white text-[8px] font-black flex items-center justify-center rounded-full px-0.5 border-2 border-white ${cartCount > 0 ? 'scale-100' : 'scale-0'} transition-transform duration-200`}>{cartCount}</span>
          </div>
          <span className="text-[9px] font-bold">Giỏ</span>
        </button>  
        
        {currentUser ? (
          <button onClick={() => setProfileOpen(true)} className="nav-pill-item flex flex-col items-center justify-center w-[48px] h-[48px] rounded-full text-[#1d1d1f]">
            <div className="relative">
              <UserCheck className="w-5 h-5 stroke-[2.25] mb-0.5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-[1.5px] border-white rounded-full"></span>
            </div>
            <span className="text-[9px] font-bold">Hồ sơ</span>
          </button>
        ) : (
          <Link href="/login" className="nav-pill-item flex flex-col items-center justify-center w-[48px] h-[48px] rounded-full text-gray-400 hover:text-[#1d1d1f]">
            <User className="w-5 h-5 stroke-[2.25] mb-0.5" />
            <span className="text-[9px] font-bold">Tài khoản</span>
          </Link>
        )}
      </div>
    </div>
  );
}
