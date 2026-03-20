'use client';

import { useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

export default function TermsModal() {
  const { termsOpen, setTermsOpen } = useApp();

  const sections = [
    { title: '1. Điều khoản chung', items: ['Khi sử dụng dịch vụ MDM Store, bạn đồng ý tuân thủ các điều khoản dưới đây', 'MDM Store cung cấp các dịch vụ số (tài khoản premium, phần mềm bản quyền)'] },
    { title: '2. Quyền và trách nhiệm', items: ['Khách hàng có quyền sử dụng sản phẩm theo đúng mô tả', 'Không chia sẻ, bán lại tài khoản cho bên thứ ba', 'Không sử dụng sản phẩm cho mục đích vi phạm pháp luật'] },
    { title: '3. Thanh toán', items: ['Thanh toán qua chuyển khoản ngân hàng (Hệ thống tự động xác nhận)', 'Giao hàng tự động ngay sau khi thanh toán thành công', 'Hóa đơn điện tử được cung cấp sau khi giao dịch hoàn tất'] },
    { title: '4. Bảo mật thông tin', items: ['Thông tin cá nhân được bảo mật tuyệt đối', 'Không chia sẻ dữ liệu với bên thứ ba', 'Sử dụng kết nối bảo mật (HTTPS) cho mọi giao dịch'] },
  ];

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${termsOpen ? '' : 'hidden'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${termsOpen ? 'overlay-visible' : ''}`} onClick={() => setTermsOpen(false)}></div>
      <div className={`bg-white w-full max-w-2xl relative z-10 rounded-[28px] flex flex-col max-h-[90vh] border border-black/5 shadow-2xl overflow-hidden modal-content-animate modal-center modal-center-wide ${termsOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-black/5 bg-white/80 backdrop-blur shrink-0">
          <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f] tracking-tight">Điều khoản dịch vụ</h2>
          <button onClick={() => setTermsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#1d1d1f]">
          {sections.map((s, i) => (
            <div key={i} className="space-y-3">
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
