'use client';

import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import { X } from 'lucide-react';

export default function SettingsModal() {
  const { settingsOpen, setSettingsOpen, currentUser, showToast, checkUser } = useApp();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!supabaseClient) return showToast("Lỗi kết nối database");
    const newName = e.target.name.value.trim();
    const newPassword = e.target.password.value;
    try {
      let updates = {};
      if (newName) updates.data = { full_name: newName };
      if (newPassword) updates.password = newPassword;
      if (Object.keys(updates).length > 0) {
        const { error } = await supabaseClient.auth.updateUser(updates);
        if (error) throw error;
        await checkUser();
        showToast("Cập nhật thông tin thành công!");
        setSettingsOpen(false);
      } else {
        showToast("Không có thay đổi nào");
      }
    } catch (err) {
      showToast("Lỗi: " + err.message);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${settingsOpen ? '' : 'hidden'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${settingsOpen ? 'overlay-visible' : ''}`} onClick={() => setSettingsOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 rounded-[28px] p-6 md:p-8 border border-black/5 shadow-2xl modal-content-animate modal-center modal-center-sm ${settingsOpen ? 'open' : ''}`}>
        <button onClick={() => setSettingsOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press z-20">
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-6 mt-2">
          <h3 className="font-black text-2xl text-[#1d1d1f] tracking-tight">Cài đặt tài khoản</h3>
          <p className="text-sm text-gray-500 font-medium mt-1">Cập nhật thông tin cá nhân của bạn</p>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tên hiển thị</label>
            <input type="text" name="name" defaultValue={currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || ''} placeholder="Tên của bạn" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 transition-colors outline-none text-sm font-medium" />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Mật khẩu mới (Bỏ trống nếu không đổi)</label>
            <input type="password" name="password" autoComplete="new-password" placeholder="••••••••" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 transition-colors outline-none text-sm font-medium" />
          </div>
          <button type="submit" className="w-full bg-[#1d1d1f] text-white py-4 rounded-[16px] font-bold text-sm hover:scale-[0.98] transition-transform btn-press mt-2 shadow-lg shadow-black/10">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}
