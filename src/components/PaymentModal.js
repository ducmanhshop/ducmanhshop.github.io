'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { formatPrice, generateOrderId } from '@/lib/utils';
import { BANK_CONFIG } from '@/lib/config';
import { X, QrCode, Copy } from 'lucide-react';

export default function PaymentModal() {
  const { paymentOpen, setPaymentOpen, cart, clearCart, showToast, currentUser, trackAction } = useApp();
  const { mounted, active } = useModalAnimation(paymentOpen);
  const [orderId, setOrderId] = useState('');

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  useEffect(() => {
    if (paymentOpen) {
      setOrderId(generateOrderId());
    }
  }, [paymentOpen]);

  const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.BANK_ID}-${BANK_CONFIG.ACCOUNT_NO}-${BANK_CONFIG.TEMPLATE}.png?amount=${total}&addInfo=${orderId}&accountName=${encodeURIComponent(BANK_CONFIG.ACCOUNT_NAME)}`;

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Đã sao chép: ' + text)).catch(() => showToast('Không thể sao chép'));
    }
  };

  const confirmPayment = () => {
    const totalStr = formatPrice(total);
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} - ${now.toLocaleDateString('vi-VN')}`;
    const newOrder = { id: orderId, date: timeStr, total: totalStr, items: cart.map(i => `${i.name} x${i.qty}`), status: 'Đang xử lý' };

    if (currentUser) {
      const storageKey = `orders_${currentUser.email}`;
      let history = JSON.parse(localStorage.getItem(storageKey)) || [];
      history.unshift(newOrder);
      localStorage.setItem(storageKey, JSON.stringify(history));
    }

    trackAction('order', total);

    let msg = `Xin chào MDM Store!\n\nMình đã thanh toán đơn hàng: ${orderId}\n\n`;
    cart.forEach(item => { msg += `• ${item.name} x${item.qty}\n`; });
    msg += `\nTổng: ${totalStr}\n\nNhờ shop kiểm tra và kích hoạt giúp mình nhé. Cảm ơn!`;
    window.open(`https://zalo.me/0837065321?text=${encodeURIComponent(msg)}`, '_blank');

    setPaymentOpen(false);
    clearCart();
    showToast('Đã gửi xác nhận đơn hàng!');
  };

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setPaymentOpen(false)}></div>
      <div className={`bg-white w-full max-w-md relative z-10 flex flex-col md:rounded-[32px] border border-black/5 modal-content-animate modal-center modal-center-lg ${active ? 'open' : ''}`}>
        <div className="md:hidden pt-2"><div className="sheet-handle"></div></div>
        <div className="p-6 md:p-8 text-center relative border-b border-black/5 overflow-hidden rounded-t-[28px] md:rounded-t-[32px]">
          <button onClick={() => setPaymentOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press z-20">
            <X className="w-4 h-4" />
          </button>
          <div className="w-16 h-16 bg-gray-100 rounded-[20px] flex items-center justify-center mx-auto mb-4 text-[#1d1d1f]">
            <QrCode className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-[#1d1d1f] tracking-tight">Thanh toán QR</h3>
          <p className="text-gray-500 text-sm font-medium mt-1">Mở app ngân hàng để quét mã</p>
        </div>
        <div className="p-5 md:p-8 overflow-y-auto flex flex-col items-center bg-gray-50/50 max-h-[60vh]">
          <div className="bg-white p-3 rounded-[24px] shadow-sm border border-black/5 mb-6 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            {paymentOpen && <img src={qrUrl} alt="VietQR" className="w-full h-full object-contain rounded-xl" />}
          </div>
          <div className="w-full space-y-3 bg-white p-4 md:p-5 rounded-[24px] text-sm border border-black/5 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Ngân hàng</span>
              <span className="font-bold text-[#1d1d1f]">MB BANK</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Số tài khoản</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1d1d1f]">{BANK_CONFIG.ACCOUNT_NO}</span>
                <button onClick={() => copyToClipboard(BANK_CONFIG.ACCOUNT_NO)} className="text-gray-400 hover:text-black transition-colors btn-press">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Chủ tài khoản</span>
              <span className="font-bold text-[#1d1d1f]">NÔNG ĐỨC MẠNH</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-black/5 mt-1">
              <span className="text-gray-500 font-medium">Số tiền</span>
              <span className="font-black text-[#1d1d1f] text-lg">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Nội dung</span>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-[#1d1d1f]">{orderId}</span>
                <button onClick={() => copyToClipboard(orderId)} className="text-gray-500 hover:text-black transition-colors btn-press">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button onClick={confirmPayment} className="w-full mt-6 bg-[#1d1d1f] text-white py-4 rounded-[20px] font-bold text-base hover:scale-[0.98] transition-transform shadow-lg shadow-black/10 flex items-center justify-center gap-2 btn-press">
            Tôi đã thanh toán xong
          </button>
          <p className="text-xs text-center text-gray-400 mt-4 font-medium">Tự động kích hoạt sau 1-3 phút</p>
        </div>
      </div>
    </div>
  );
}
