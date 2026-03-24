'use client';

import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import { Zap, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart, trackAction } = useApp();
  const p = product;
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const seed = p.id.charCodeAt(0) || 1;
  const sold = (seed * 17) % 900 + 100;

  return (
    <div className="group bg-white rounded-[20px] md:rounded-[24px] p-2.5 md:p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col product-card-hover relative overflow-hidden">
      <Link
        href={`/product/${p.id}`}
        onClick={() => trackAction('click')}
        className="relative aspect-square rounded-[16px] md:rounded-[20px] overflow-hidden mb-3 bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center p-6 md:p-8 cursor-pointer block"
      >
        <img src={p.image} className="w-full h-full object-contain product-img drop-shadow-sm" alt={p.name} loading="lazy" decoding="async" />
        <div className="absolute top-2.5 left-2.5 bg-[#1d1d1f] text-white text-[9px] md:text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md">-{discount}%</div>
      </Link>
      <div className="flex-1 flex flex-col px-0.5 md:px-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 rounded">{p.category}</span>
          <span className="flex items-center gap-0.5 text-[8px] md:text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100/50">
            <Zap className="w-2.5 h-2.5" /> Tự động
          </span>
        </div>
        <Link
          href={`/product/${p.id}`}
          onClick={() => trackAction('click')}
          className="font-bold text-[#1d1d1f] text-[13px] md:text-[15px] leading-snug mb-1 cursor-pointer group-hover:text-blue-600 transition-colors duration-200 tracking-tight line-clamp-2"
        >
          {p.name}
        </Link>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400 fill-current" />
          <span className="text-[10px] md:text-[11px] font-bold text-gray-600">5.0</span>
          <span className="text-[10px] md:text-[11px] text-gray-400">· Đã bán {sold}</span>
        </div>
        <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
          <span className="text-[16px] md:text-lg font-black text-[#1d1d1f] tracking-tight">{formatPrice(p.price)}</span>
          <span className="text-[11px] md:text-[12px] font-medium text-gray-400 line-through">{formatPrice(p.oldPrice)}</span>
        </div>
        <div className="flex gap-1.5">
          <button onClick={(e) => { e.stopPropagation(); addToCart(p.id, true); }} className="w-10 md:w-11 h-10 md:h-11 flex-shrink-0 bg-gray-50 border border-black/[0.04] text-[#1d1d1f] rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center active:scale-95" title="Thêm vào giỏ">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <Link href={`/product/${p.id}`} onClick={() => trackAction('click')} className="flex-1 bg-[#1d1d1f] text-white h-10 md:h-11 rounded-xl font-bold text-[11px] md:text-[12px] hover:bg-black/80 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1 shadow-sm">
            Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
