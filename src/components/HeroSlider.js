'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowRight, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    badge: 'KHÁM PHÁ NGAY',
    badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    title: <>Kho Tài Khoản<br />Premium Đa Dạng</>,
    desc: 'Trải nghiệm các dịch vụ giải trí, thiết kế và công cụ AI hàng đầu thế giới với tài khoản chính hãng, hoạt động mượt mà và bảo mật cao.',
    btnText: 'Xem danh mục',
    btnIcon: <ArrowRight className="w-4 h-4" />,
    btnClass: 'bg-white text-black hover:scale-[1.03]',
    btnAction: 'scroll-category',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  },
  {
    badge: 'CAM KẾT CHẤT LƯỢNG',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    title: <>Giá Siêu Tốt<br />& Bảo Hành Trọn Đời</>,
    desc: 'Tiết kiệm chi phí tối đa so với giá gốc. Hỗ trợ bảo hành tận tâm 1 đổi 1 trong suốt thời gian sử dụng.',
    btnText: 'Xem chính sách',
    btnIcon: <ShieldCheck className="w-4 h-4" />,
    btnClass: 'bg-amber-500 text-white hover:scale-[1.03] hover:bg-amber-600 shadow-amber-500/30',
    btnAction: 'warranty',
    image: 'https://images.unsplash.com/photo-1614064641913-6b71f3bb61db?auto=format&fit=crop&q=80&w=1200',
  },
  {
    badge: 'TỰ ĐỘNG HOÁ 24/7',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    title: <>Thanh Toán Xong<br />Nhận Tài Khoản Liền</>,
    desc: 'Hệ thống xử lý thông minh giao tài khoản tự động ngay lập tức.',
    btnText: 'Mua sắm ngay',
    btnIcon: <Zap className="w-4 h-4" />,
    btnClass: 'bg-emerald-600 text-white hover:scale-[1.03] hover:bg-emerald-700 shadow-emerald-600/30',
    btnAction: 'scroll-products',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function HeroSlider() {
  const { setWarrantyOpen } = useApp();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (isTransitioning || idx === current) return;
    setIsTransitioning(true);
    setCurrent(idx);
  }, [current, isTransitioning]);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(p => (p + 1) % slides.length);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(p => (p - 1 + slides.length) % slides.length);
  }, [isTransitioning]);

  // Reset transitioning after animation
  useEffect(() => {
    if (isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(false), 650);
      return () => clearTimeout(t);
    }
  }, [isTransitioning, current]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const handleAction = (action) => {
    if (action === 'warranty') setWarrantyOpen(true);
    if (action === 'scroll-category') {
      document.getElementById('category-filter')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (action === 'scroll-products') {
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-10 md:mb-12 relative w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] group border border-black/5">
      {/* Slide Track */}
      <div
        className="flex h-full will-change-transform"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translate3d(-${current * (100 / slides.length)}%, 0, 0)`,
          transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full flex items-center" style={{ width: `${100 / slides.length}%` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
            <img
              src={slide.image}
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="relative z-20 px-8 md:px-16 max-w-2xl">
              <span className={`inline-block py-1 px-3.5 rounded-full text-[11px] font-bold border mb-5 backdrop-blur-md tracking-wider ${slide.badgeClass}`}>{slide.badge}</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-[1.1]">{slide.title}</h2>
              <p className="text-gray-300 text-sm md:text-lg mb-8 font-medium max-w-lg leading-relaxed">{slide.desc}</p>
              <button onClick={() => handleAction(slide.btnAction)} className={`px-8 py-3.5 rounded-full font-bold transition-transform shadow-lg flex items-center gap-2 btn-press ${slide.btnClass}`}>
                {slide.btnText} {slide.btnIcon}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute z-30 bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5 items-center">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`slide-dot rounded-full ${i === current ? 'w-8 h-2.5 bg-white shadow-md' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}></button>
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute z-30 top-1/2 -translate-y-1/2 left-4 md:left-6 w-12 h-12 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40 active:scale-90">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute z-30 top-1/2 -translate-y-1/2 right-4 md:right-6 w-12 h-12 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40 active:scale-90">
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
