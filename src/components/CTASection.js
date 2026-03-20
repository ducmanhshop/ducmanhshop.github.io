'use client';

import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="pb-10 md:pb-16 pt-4">
      <div className="relative w-full rounded-[24px] md:rounded-[32px] bg-[#09090b] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-full max-w-lg h-[300px] bg-blue-500/10 blur-[60px] pointer-events-none rounded-full transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>
        <div className="relative z-10 p-10 md:p-16 w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] md:text-xs font-medium mb-5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Sẵn sàng phục vụ 24/7
          </div>
          <h2 className="text-3xl md:text-[40px] font-black text-white tracking-tight mb-3 leading-tight drop-shadow-md">Nâng Tầm Trải Nghiệm</h2>
          <p className="text-gray-400 text-sm md:text-[15px] font-medium mb-8 max-w-[480px] mx-auto leading-relaxed">Khám phá kho tài khoản Premium với mức giá tiết kiệm. Tham gia cùng hàng ngàn khách hàng ngay hôm nay.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-[#09090b] rounded-full font-bold text-[14px] md:text-[15px] transition-transform btn-press hover:scale-[1.03] group/btn shadow-md">
            Khám phá ngay
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
