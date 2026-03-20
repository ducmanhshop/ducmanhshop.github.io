'use client';

import { useApp } from '@/context/AppContext';
import { formatPrice, getCategoryBg } from '@/lib/utils';
import { Zap, Star, ShoppingCart, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, navigateTo, trackAction } = useApp();
  const p = product;
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const seed = p.id.charCodeAt(0) || 1;
  const sold = (seed * 17) % 900 + 100;

  return (
    <div className="group bg-white rounded-[24px] md:rounded-[32px] p-3 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 flex flex-col product-card-hover transition-all duration-300 relative overflow-hidden">
      <div
        onClick={() => { trackAction('click'); navigateTo('product', p.id); }}
        className="relative aspect-square rounded-[20px] md:rounded-[24px] overflow-hidden mb-4 bg-[#F8F8F9] flex items-center justify-center p-8 md:p-10 cursor-pointer group-hover:scale-[1.02] transition-transform duration-500 block border border-black/[0.02]"
      >
        <img src={p.image} className="w-full h-full object-contain product-img drop-shadow-md transition-transform duration-500" alt={p.name} />
        <div className="absolute top-3 left-3 bg-[#1d1d1f] text-white text-[10px] md:text-[11px] font-black tracking-wider px-2.5 py-1 rounded-md shadow-sm">-{discount}%</div>
      </div>
      <div className="flex-1 flex flex-col px-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-md">{p.category}</span>
          <span className="flex items-center gap-0.5 text-[9px] md:text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md border border-green-100">
            <Zap className="w-3 h-3" /> Tự động
          </span>
        </div>
        <div
          onClick={() => { trackAction('click'); navigateTo('product', p.id); }}
          className="font-extrabold text-[#1d1d1f] text-[14px] md:text-[16px] leading-snug mb-1.5 cursor-pointer group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2"
        >
          {p.name}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 ml-1">5.0</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <span className="text-[11px] md:text-[12px] font-medium text-gray-500">Đã bán {sold}</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg md:text-xl font-black text-[#1d1d1f] tracking-tighter">{formatPrice(p.price)}</span>
          <span className="text-[12px] md:text-[13px] font-medium text-gray-400 line-through">{formatPrice(p.oldPrice)}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, true); }} className="w-11 md:w-12 h-11 md:h-12 flex-shrink-0 bg-[#F8F8F9] border border-black/5 text-[#1d1d1f] rounded-[14px] md:rounded-[16px] font-bold hover:bg-gray-100 transition-colors btn-press flex items-center justify-center group/cart" title="Thêm vào giỏ">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 group-hover/cart:scale-110 transition-transform duration-300" />
          </button>
          <button onClick={() => { trackAction('click'); navigateTo('product', p.id); }} className="flex-1 bg-[#1d1d1f] text-white h-11 md:h-12 rounded-[14px] md:rounded-[16px] font-bold text-[12px] md:text-[13px] hover:bg-black/80 hover:scale-[0.98] transition-all flex items-center justify-center gap-1.5 btn-press shadow-md">
            Xem chi tiết <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
