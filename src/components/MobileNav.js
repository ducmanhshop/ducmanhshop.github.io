'use client';

import { useApp } from '@/context/AppContext';
import { Home, Search, ShoppingBag, User, UserCheck } from 'lucide-react';

export default function MobileNav() {
  const { cart, setCartOpen, setSearchOpen, navigateTo, currentUser, setAuthOpen, setProfileOpen } = useApp();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 12px) + 16px)' }}>
      <div className="capsule-nav rounded-full flex items-center px-6 py-2 gap-4 w-full max-w-[300px] justify-between shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <button onClick={() => navigateTo('home')} className="nav-pill-item flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full text-gray-400 hover:text-[#1d1d1f] hover:bg-black/5 transition-all">
          <Home className="w-6 h-6 stroke-[2.25] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </button>
        <button onClick={() => setSearchOpen(true)} className="nav-pill-item flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full text-gray-400 hover:text-[#1d1d1f] hover:bg-black/5 transition-all">
          <Search className="w-6 h-6 stroke-[2.25] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Tìm</span>
        </button>
        <button onClick={() => setCartOpen(true)} className="nav-pill-item relative flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full text-gray-400 hover:text-[#1d1d1f] hover:bg-black/5 transition-all">
          <div className="relative">
            <ShoppingBag className="w-6 h-6 stroke-[2.25] mb-0.5" />
            <span className={`absolute -top-1.5 -right-2.5 min-w-[20px] h-[20px] bg-[#1d1d1f] text-white text-[10px] font-black flex items-center justify-center rounded-full px-1 shadow-sm border-2 border-white ${cartCount > 0 ? 'scale-100' : 'scale-0'} transition-transform`}>{cartCount}</span>
          </div>
          <span className="text-[10px] font-bold tracking-tight">Giỏ</span>
        </button>  
        
        {currentUser ? (
          <button onClick={() => setProfileOpen(true)} className="nav-pill-item flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full text-[#1d1d1f] hover:bg-black/5 transition-all cursor-pointer">
            <div className="relative">
              <UserCheck className="w-6 h-6 stroke-[2.25] mb-0.5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-[2px] border-white rounded-full"></span>
            </div>
            <span className="text-[10px] font-bold tracking-tight">Hồ sơ</span>
          </button>
        ) : (
          <button onClick={() => setAuthOpen(true)} className="nav-pill-item flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full text-gray-400 hover:text-[#1d1d1f] hover:bg-black/5 transition-all cursor-pointer">
            <User className="w-6 h-6 stroke-[2.25] mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight">Tài khoản</span>
          </button>
        )}
      </div>
    </div>
  );
}
