'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { formatPrice, getCategoryBg } from '@/lib/utils';
import { Search, SearchX, ChevronRight } from 'lucide-react';

export default function SearchModal() {
  const { searchOpen, setSearchOpen, products, navigateTo, trackAction } = useApp();
  const { mounted, active } = useModalAnimation(searchOpen);
  const [term, setTerm] = useState('');

  const filtered = term.trim() ? products.filter(p => p.name.toLowerCase().includes(term.toLowerCase())) : [];

  const goToProduct = (id) => {
    setSearchOpen(false);
    trackAction('click');
    setTimeout(() => navigateTo('product', id), 300);
  };

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-50`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setSearchOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 overflow-hidden flex flex-col shadow-2xl border border-black/5 modal-content-animate modal-search ${active ? 'open' : ''}`}>
        <div className="md:hidden pt-2"><div className="sheet-handle"></div></div>
        <div className="p-4 md:p-5 border-b border-black/5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" autoComplete="off" spellCheck="false" placeholder="Tìm kiếm dịch vụ..." className="w-full pl-12 pr-16 py-4 rounded-[20px] bg-gray-50 text-base font-medium focus:outline-none focus:bg-white search-input-glow transition-all" value={term} onChange={(e) => setTerm(e.target.value)} autoFocus />
            <button onClick={() => setSearchOpen(false)} className="absolute inset-y-0 right-0 pr-5 flex items-center btn-press">
              <span className="text-[#1d1d1f] font-bold text-sm bg-gray-200 px-3 py-1.5 rounded-full">Đóng</span>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
          {!term.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Search className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm font-medium">Nhập từ khoá để tìm kiếm</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <SearchX className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm font-medium">Không tìm thấy kết quả nào</p>
            </div>
          ) : (
            filtered.map((p, idx) => (
              <div key={p.id} onClick={() => goToProduct(p.id)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-[16px] cursor-pointer transition-colors border-b border-black/5 last:border-0 modal-item-stagger" style={{ animationDelay: `${idx * 40}ms` }}>
                <div className={`w-14 h-14 ${getCategoryBg(p.category)} rounded-[12px] p-2 shrink-0 flex items-center justify-center`}>
                  <img src={p.image} className="w-full h-full object-contain" alt={p.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-[#1d1d1f] truncate tracking-tight mb-0.5">{p.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] text-[#1d1d1f] font-black">{formatPrice(p.price)}</p>
                    <span className="text-[10px] text-gray-400 font-medium line-through">{formatPrice(p.oldPrice)}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
