'use client';

import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { formatPrice, getCategoryBg } from '@/lib/utils';
import { X, ShoppingBag, Minus, Plus, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, changeQty, setPaymentOpen } = useApp();
  const { mounted, active } = useModalAnimation(cartOpen, 500);
  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const openPayment = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setTimeout(() => setPaymentOpen(true), 500);
  };

  if (!mounted) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setCartOpen(false)}></div>
      <div className={`fixed bg-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-black/5 modal-content-animate drawer-desktop ${active ? 'open' : ''}`}>
        <div className="md:hidden pt-2"><div className="sheet-handle"></div></div>
        <div className="px-5 py-4 md:px-6 md:py-5 border-b border-black/5 flex justify-between items-center bg-white/50 backdrop-blur">
          <h2 className="text-xl font-black text-[#1d1d1f] tracking-tight">Giỏ hàng</h2>
          <button onClick={() => setCartOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full btn-press text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-50 rounded-[24px] flex items-center justify-center mx-auto mb-5">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">Giỏ hàng trống</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={item.id} className="cart-item flex gap-4 p-4 rounded-[24px] bg-white border border-black/5 items-center shadow-sm modal-item-stagger" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className={`w-16 h-16 ${getCategoryBg(item.category)} rounded-[16px] flex items-center justify-center p-3 shrink-0`}>
                  <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base text-[#1d1d1f] truncate tracking-tight">{item.name}</h4>
                  <p className="text-sm text-gray-500 font-bold mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 rounded-[14px] p-1 border border-black/5">
                  <button onClick={() => changeQty(idx, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black btn-press rounded-[10px]">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-[#1d1d1f]">{item.qty}</span>
                  <button onClick={() => changeQty(idx, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black btn-press rounded-[10px]">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-5 md:p-6 border-t border-black/5 bg-gray-50/80 backdrop-blur safe-bottom">
          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-500 font-bold text-sm">Tổng cộng</span>
            <span className="text-3xl font-black text-[#1d1d1f] tracking-tighter">{formatPrice(total)}</span>
          </div>
          <button onClick={openPayment} disabled={cart.length === 0} className={`w-full py-4 rounded-[20px] font-bold text-lg flex items-center justify-center gap-2 ${cart.length > 0 ? 'bg-[#1d1d1f] text-white hover:scale-[0.98] transition-transform shadow-lg shadow-black/10 btn-press' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Thanh toán ngay <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
