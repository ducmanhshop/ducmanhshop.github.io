'use client';

import useScrollReveal from '@/lib/useScrollReveal';
import { ShieldCheck, BadgePercent, Zap, Headset } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Bảo hành chu đáo', desc: 'Hỗ trợ bảo hành tận tình, giải quyết mọi vấn đề nhanh chóng.' },
  { icon: BadgePercent, title: 'Giá cả tốt nhất', desc: 'Cam kết mức giá cạnh tranh nhất thị trường, nhiều ưu đãi hấp dẫn.' },
  { icon: Zap, title: 'Giao dịch tức thì', desc: 'Nhận tài khoản ngay sau khi thanh toán thành công tự động.' },
  { icon: Headset, title: 'Hỗ trợ 24/7', desc: 'Đội ngũ tư vấn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi nhanh chóng.' },
];

export default function WhyChooseUs() {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-12 md:py-20 scroll-reveal">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3 tracking-tighter">Tại sao chọn MDM Store?</h2>
        <div className="w-12 h-1.5 bg-[#1d1d1f] mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col items-center text-center feature-card group">
            <div className="mb-5 w-16 h-16 rounded-[20px] bg-gray-50 flex items-center justify-center text-[#1d1d1f] group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors duration-300">
              <f.icon className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-lg text-[#1d1d1f] mb-2 tracking-tight">{f.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
