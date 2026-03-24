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
        <div className="flex items-center justify-between h-[64px] md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group shrink-0">
            <img
              src="/logo.webp"
              alt="MDM Store"
              className="w-9 h-9 md:w-10 md:h-10 object-contain mr-2.5 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              style={{ color: 'transparent' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.outerHTML = '<div class="w-9 h-9 md:w-10 md:h-10 bg-[#1d1d1f] text-white rounded-xl flex items-center justify-center mr-2.5"><span class="font-black text-lg">M</span></div>';
              }}
            />
            <div className="flex-col hidden sm:flex">
              <span className="text-[15px] md:text-[16px] font-extrabold tracking-tight leading-none text-[#1d1d1f]">MDM Store</span>
              <span className="text-[9px] text-gray-400 font-semibold tracking-[0.15em] mt-0.5">PREMIUM</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-100 border border-transparent hover:bg-gray-200/70 focus:bg-white focus:border-black/10 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[13px] font-medium transition-all duration-200 outline-none"
              onChange={handleDesktopSearch}
            />
          </div>

          {/* Nav buttons */}
          <nav className="flex items-center gap-2 shrink-0">
            <a href="https://zalo.me/0837065321" target="_blank" rel="noopener noreferrer" className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 active:scale-95 transition-transform">
              <MessageCircle className="w-3.5 h-3.5" /><span className="text-[11px] font-bold whitespace-nowrap">Zalo</span>
            </a>

            <button className="hidden md:flex relative w-10 h-10 items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-[18px] h-[18px] text-gray-700" />
              <span className={`absolute top-1 right-1 h-4 w-4 bg-[#1d1d1f] text-white text-[9px] font-bold flex items-center justify-center rounded-full transition-transform duration-200 ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span>
            </button>

            {currentUser ? (
              <button onClick={() => setProfileOpen(true)} className="hidden md:flex items-center gap-2 pl-1 pr-3.5 py-1 rounded-full bg-gray-50 border border-black/5 hover:bg-gray-100 transition-colors duration-200">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[#1d1d1f] overflow-hidden">
                  {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" alt="" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[12px] font-bold text-[#1d1d1f] max-w-[80px] truncate">{name}</span>
              </button>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1d1d1f] text-white hover:bg-black/80 transition-colors duration-200 shadow-sm">
                <User className="w-3.5 h-3.5" /><span className="text-[12px] font-bold">Đăng nhập</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
