'use client';

import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { X, HeartHandshake, ArrowRight, MessageCircle } from 'lucide-react';

export default function WelcomeModal() {
  const { welcomeOpen, setWelcomeOpen } = useApp();
  const { mounted, active } = useModalAnimation(welcomeOpen);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-[80] flex items-center justify-center p-4`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setWelcomeOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 flex flex-col shadow-2xl overflow-y-auto border border-black/5 modal-content-animate modal-center modal-center-welcome ${active ? 'open' : ''}`}>
        <button onClick={() => setWelcomeOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press z-20">
          <X className="w-4 h-4" />
        </button>
        <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 relative">
            <img src="/logo.webp" alt="MDM Store" className="w-full h-full object-contain drop-shadow-lg" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-16 h-16 md:w-20 md:h-20 bg-[#1d1d1f] rounded-[20px] flex items-center justify-center shadow-lg"><span class="text-white font-black text-2xl">M</span></div>'; }} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f] mb-1 tracking-tight">Chào mừng đến với</h2>
          <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 mb-4 tracking-tighter">MDM Store</h2>
          <p className="text-sm md:text-base text-gray-500 font-medium mb-6 md:mb-8">Dịch vụ số Premium — Uy tín · Nhanh chóng · Tận tâm</p>
          <div className="w-full bg-gray-50 rounded-[24px] p-5 md:p-6 text-left border border-black/5">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <HeartHandshake className="w-5 h-5 text-[#1d1d1f]" />
              <span className="font-bold text-base text-[#1d1d1f]">Lời nhắn nhỏ từ MDM</span>
            </div>
            <div className="space-y-3.5 md:space-y-5">
              {['Tất cả sản phẩm đều là <strong>hàng chính hãng</strong>, bảo hành trọn thời gian sử dụng.',
                'Thông tin tài khoản sẽ được <strong>tự động giao ngay</strong> sau khi bạn hoàn tất thanh toán.',
                'Nếu cần hỗ trợ, hãy nhắn tin ngay cho đội ngũ CSKH 24/7 của chúng tôi.'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 modal-item-stagger" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
                  <div className="w-6 h-6 rounded-full bg-black/5 text-[#1d1d1f] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: text }}></p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-6 md:mt-8 flex flex-col gap-3">
            <button onClick={() => setWelcomeOpen(false)} className="w-full bg-[#1d1d1f] text-white py-3.5 md:py-4 rounded-[20px] font-bold text-sm md:text-base hover:scale-[0.98] transition-transform flex justify-center items-center gap-2 shadow-lg shadow-black/10 btn-press">
              Bắt đầu khám phá <ArrowRight className="w-5 h-5" />
            </button>
            <a href="https://zalo.me/0837065321" target="_blank" rel="noopener noreferrer" className="w-full bg-gray-50 border border-black/5 text-[#1d1d1f] py-3.5 md:py-4 rounded-[20px] font-bold text-sm md:text-base hover:bg-gray-100 transition-colors flex justify-center items-center gap-2 btn-press">
              <MessageCircle className="w-5 h-5" /> Liên hệ Zalo tư vấn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
