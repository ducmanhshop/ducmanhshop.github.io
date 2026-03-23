'use client';

import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Star, Zap, Check, Sparkles, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const { products, addToCart, trackAction, setPaymentOpen, cart, setCart, isLoading } = useApp();
  const p = products.find(x => x.id === params.id);

  if (isLoading || products.length === 0) {
    return (
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-[20px] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">Đang tải sản phẩm...</p>
        </div>
      </main>
    );
  }

  if (!p) {
    return (
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#1d1d1f] mb-4">Không tìm thấy sản phẩm</h1>
          <Link href="/" className="px-6 py-3 bg-[#1d1d1f] text-white rounded-full font-bold btn-press shadow-md">Về trang chủ</Link>
        </div>
      </main>
    );
  }

  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const seed = p.id.charCodeAt(0) || 1;
  const sold = (seed * 17) % 900 + 100;
  const features = p.features || ['Bảo hành trọn thời gian sử dụng', 'Hỗ trợ nâng cấp tự động', 'Giao dịch an toàn & minh bạch'];

  const suggested = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const suggestedList = suggested.length > 0 ? suggested : products.filter(x => x.id !== p.id).sort(() => 0.5 - Math.random()).slice(0, 4);

  const buyNow = () => {
    const existing = cart.find(x => x.id === p.id);
    if (existing) {
      setCart(prev => prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCart(prev => [...prev, { ...p, qty: 1 }]);
    }
    setPaymentOpen(true);
  };

  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 transition-opacity duration-300 relative z-10">
      <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1d1d1f] mb-6 md:mb-8 btn-press font-bold transition-colors w-max">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></div>
        Quay lại trang chủ
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        <div className="bg-[#F8F8F9] border border-black/[0.02] rounded-[32px] p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-6 bg-[#1d1d1f] text-white text-[11px] md:text-xs font-black tracking-wider px-3 py-1.5 rounded-xl shadow-md z-10">-{discount}%</div>
          <img src={p.image} className="w-full max-w-[280px] md:max-w-md object-contain drop-shadow-2xl relative z-10 animate-fade-up" alt={p.name} />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-3 animate-fade-up delay-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">{p.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1d1d1f] leading-tight tracking-tighter mb-4 animate-fade-up delay-100">{p.name}</h1>
          <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
              <Star className="w-4 h-4 fill-current" /><span className="text-xs font-bold text-yellow-700 ml-1">5.0</span>
            </div>
            <div className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-black/5">Đã bán {sold}</div>
            <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Tự động
            </div>
          </div>
          <div className="flex items-baseline gap-4 mb-8 animate-fade-up delay-200">
            <span className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tighter">{formatPrice(p.price)}</span>
            <span className="text-xl text-gray-400 font-medium line-through">{formatPrice(p.oldPrice)}</span>
          </div>
          <div className="bg-gray-50 rounded-[24px] p-6 mb-8 border border-black/5 animate-fade-up delay-300">
            <h4 className="font-bold text-base text-[#1d1d1f] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> Tính năng nổi bật
            </h4>
            <ul className="space-y-3.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
            <button onClick={() => addToCart(p.id, true)} className="flex-1 bg-gray-100 text-[#1d1d1f] py-4 rounded-[20px] font-bold hover:bg-gray-200 transition-colors btn-press flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ
            </button>
            <button onClick={buyNow} className="flex-1 bg-[#1d1d1f] text-white py-4 rounded-[20px] font-bold shadow-lg shadow-black/10 btn-press flex items-center justify-center gap-2 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2.5s_infinite_linear]"></span>
              <span className="relative">Mua ngay</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-black/5 pt-12">
        <h3 className="text-2xl font-black text-[#1d1d1f] mb-8 tracking-tighter">Có thể bạn cũng thích</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {suggestedList.map(sp => <ProductCard key={sp.id} product={sp} />)}
        </div>
      </div>
    </main>
  );
}
