'use client';

import { useRef, useEffect, useCallback } from 'react';
import { FEEDBACKS } from '@/lib/config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

export default function FeedbackCarousel() {
  const trackRef = useRef(null);
  const autoScrollRef = useRef(null);

  const infiniteFeedbacks = Array(6).fill(FEEDBACKS).flat();

  const scrollFeedback = useCallback((direction) => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const cardWidth = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Center the scroll position
    requestAnimationFrame(() => {
      if (track.children.length > 1) {
        const cardWidth = track.children[1].offsetLeft - track.children[0].offsetLeft;
        track.scrollLeft = cardWidth * FEEDBACKS.length * 3;
      }
    });

    // Auto scroll
    autoScrollRef.current = setInterval(() => scrollFeedback(1), 4000);
    return () => clearInterval(autoScrollRef.current);
  }, [scrollFeedback]);

  const pauseAutoScroll = () => clearInterval(autoScrollRef.current);
  const resumeAutoScroll = () => { autoScrollRef.current = setInterval(() => scrollFeedback(1), 4000); };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-black text-[#1d1d1f] tracking-tighter">Khách hàng nói gì về chúng tôi</h2>
        <p className="text-gray-500 font-medium mt-2 text-sm">Hàng trăm khách hàng đã tin tưởng sử dụng dịch vụ của MDM Store</p>
        <div className="w-12 h-1 bg-[#1d1d1f] mx-auto rounded-full mt-4"></div>
      </div>

      <div className="relative group max-w-full mx-auto" onMouseEnter={pauseAutoScroll} onMouseLeave={resumeAutoScroll}>
        <button onClick={() => scrollFeedback(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 w-12 h-12 bg-white border border-black/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] items-center justify-center text-[#1d1d1f] opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div ref={trackRef} className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-2 px-4 md:px-2 scroll-smooth">
          {infiniteFeedbacks.map((f, i) => (
            <div key={i} className="snap-center snap-always shrink-0 w-[85vw] md:w-[calc(33.3333%-16px)] bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-black text-lg">{f.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-[#1d1d1f] text-sm tracking-tight">{f.name}</h4>
                    <p className="text-[11px] text-gray-500 font-semibold">{f.s}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-[#1d1d1f] mt-1" dangerouslySetInnerHTML={{ __html: starSVG.repeat(5) }}></div>
              </div>
              <p className="text-[#1d1d1f] text-[13px] md:text-[14.5px] leading-relaxed mb-4 font-medium">&quot;{f.t}&quot;</p>
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[11px] text-gray-400 font-semibold">Khách hàng thân thiết</span>
                <span className="text-[10px] font-bold text-[#1d1d1f] bg-gray-100 border border-black/10 px-2.5 py-1 rounded-full">Đã xác thực</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => scrollFeedback(1)} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 w-12 h-12 bg-white border border-black/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] items-center justify-center text-[#1d1d1f] opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-2 md:hidden">
        <button onClick={() => scrollFeedback(-1)} className="w-12 h-12 bg-white border border-black/5 rounded-full shadow-sm flex items-center justify-center text-[#1d1d1f] active:scale-95 transition-transform btn-press">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scrollFeedback(1)} className="w-12 h-12 bg-white border border-black/5 rounded-full shadow-sm flex items-center justify-center text-[#1d1d1f] active:scale-95 transition-transform btn-press">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
