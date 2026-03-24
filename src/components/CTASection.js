'use client';

import useScrollReveal from '@/lib/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <section ref={ref} className="pb-10 md:pb-16 pt-4 scroll-reveal">
      <div className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/[0.06] shadow-2xl group">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#0f0f12] to-[#09090b]"></div>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-500/[0.08] blur-[80px] pointer-events-none rounded-full group-hover:bg-violet-500/[0.12] transition-all duration-700"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[300px] h-[200px] bg-blue-500/[0.06] blur-[60px] pointer-events-none rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 p-10 md:p-16 w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 text-[10px] md:text-[11px] font-medium mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Sẵn sàng phục vụ 24/7
          </div>
          <h2 className="text-[28px] md:text-[42px] font-black text-white tracking-tight mb-3 leading-tight">Nâng Tầm Trải Nghiệm</h2>
          <p className="text-zinc-500 text-[13px] md:text-[15px] font-medium mb-8 max-w-[440px] mx-auto leading-relaxed">
            Khám phá kho tài khoản Premium với mức giá tiết kiệm nhất. Tham gia cùng hàng ngàn khách hàng hài lòng.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-[#09090b] rounded-full font-bold text-[13px] md:text-[14px] hover:bg-gray-100 active:scale-[0.97] transition-all duration-200 shadow-lg group/btn">
            Khám phá ngay
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
