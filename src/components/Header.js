'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, ShoppingBag, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { cart, setCartOpen, setSearchTerm, currentUser, setProfileOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const name = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || '';
  const avatarUrl = currentUser?.user_metadata?.avatar_url || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDesktopSearch = (e) => {
    setSearchTerm(e.target.value);
    router.push('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-40 glass-effect ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] md:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group shrink-0">
            <img
              src="/logo.webp"
              alt="MDM Store"
              className="w-10 h-10 md:w-11 md:h-11 object-contain mr-3 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
              style={{ color: 'transparent' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.outerHTML = '<div class="w-10 h-10 md:w-11 md:h-11 bg-[#1d1d1f] text-white rounded-[12px] flex items-center justify-center mr-3 shadow-lg group-hover:scale-105 transition-transform duration-500"><span class="font-black text-lg md:text-xl">M</span></div>';
              }}
            />
            <div className="flex-col hidden sm:flex">
              <span className="text-[16px] md:text-[17px] font-extrabold tracking-tight leading-none text-gray-900 group-hover:opacity-80 transition-opacity duration-300">MDM Store</span>
              <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold tracking-widest mt-0.5">PREMIUM</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder="Tìm kiếm dịch vụ..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-black/5 border border-transparent hover:bg-black/10 focus:bg-white focus:border-black/10 text-sm font-medium search-input-glow transition-all duration-400 outline-none"
              onChange={handleDesktopSearch}
            />
          </div>

          {/* Nav buttons */}
          <nav className="flex items-center space-x-3 shrink-0">
            <a href="https://zalo.me/0837065321" target="_blank" rel="noopener noreferrer" className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 btn-press">
              <MessageCircle className="w-4 h-4" /><span className="text-[12px] font-bold whitespace-nowrap">Liên hệ Zalo</span>
            </a>

            <button className="hidden md:flex relative w-11 h-11 items-center justify-center hover:bg-black/5 rounded-full btn-press transition-colors duration-300" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <span className={`absolute top-1.5 right-1.5 h-4 w-4 bg-[#1d1d1f] text-white text-[9px] font-bold flex items-center justify-center rounded-full transition-transform duration-400 shadow-sm ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span>
            </button>

            {/* User nav */}
            {currentUser ? (
              <button onClick={() => setProfileOpen(true)} className="hidden md:flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white border border-black/5 hover:border-black/10 hover:shadow-md transition-all duration-300 btn-press shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1d1d1f] overflow-hidden">
                  {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" alt="" /> : <User className="w-4 h-4" />}
                </div>
                <span className="text-[13px] font-bold text-[#1d1d1f] max-w-[90px] truncate">{name}</span>
              </button>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black/80 hover:scale-[1.02] transition-all duration-300 btn-press shadow-md">
                <User className="w-4 h-4" /><span className="text-[13px] font-bold">Đăng nhập</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
