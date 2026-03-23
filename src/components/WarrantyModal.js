'use client';

import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { X } from 'lucide-react';

export default function WarrantyModal() {
  const { warrantyOpen, setWarrantyOpen } = useApp();
  const { mounted, active } = useModalAnimation(warrantyOpen);

  const sections = [
    { title: '1. Phạm vi bảo hành', items: ['Tất cả sản phẩm mua tại MDM Store đều được bảo hành theo thời hạn ghi trên từng gói', 'Bảo hành bao gồm: lỗi đăng nhập, mất quyền truy cập do lỗi hệ thống', 'Không bảo hành nếu khách hàng tự ý thay đổi mật khẩu, email liên kết'] },
    { title: '2. Quy trình bảo hành', items: ['Liên hệ qua Zalo: 0837065321', 'Cung cấp mã đơn hàng hoặc thông tin tài khoản', 'Xử lý trong vòng 5–30 phút (giờ hành chính)'] },
    { title: '3. Thời gian bảo hành', items: ['Gói KBH (Không bảo hành): Không áp dụng bảo hành', 'Gói có bảo hành: Theo thời hạn ghi trên gói (1 tháng, 3 tháng, 1 năm...)'] },
    { title: '4. Chính sách đổi/trả', items: ['Hoàn tiền 100% nếu chưa giao sản phẩm', 'Đổi sản phẩm cùng giá trị nếu sản phẩm lỗi trong 24h đầu'] },
  ];

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setWarrantyOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 rounded-[28px] flex flex-col max-h-[90vh] border border-black/5 shadow-2xl overflow-hidden modal-content-animate modal-center modal-center-wide ${active ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-black/5 bg-white/80 backdrop-blur shrink-0">
          <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f] tracking-tight">Chính sách bảo hành</h2>
          <button onClick={() => setWarrantyOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#1d1d1f]">
          {sections.map((s, i) => (
            <div key={i} className="space-y-3 modal-item-stagger" style={{ animationDelay: `${i * 80}ms` }}>
              <h3 className="font-bold text-base">{s.title}</h3>
              <ul className="space-y-2.5 text-gray-600 text-sm font-medium">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
