'use client';

import { useApp } from '@/context/AppContext';
import { useModalAnimation } from '@/lib/useModalAnimation';
import { supabaseClient } from '@/lib/supabase';
import { X, ShoppingBag, User, Settings, LogOut, BarChart3, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfileModal() {
  const { profileOpen, setProfileOpen, currentUser, isAdmin, showToast, checkUser, setCurrentUser, setIsAdmin, setSettingsOpen } = useApp();
  const { mounted, active } = useModalAnimation(profileOpen);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const name = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'Người dùng';
  const email = currentUser?.email || '';
  const avatarUrl = currentUser?.user_metadata?.avatar_url || '';
  const joinDateRaw = currentUser ? new Date(currentUser.created_at) : null;
  const joinDate = joinDateRaw && !isNaN(joinDateRaw) ? joinDateRaw.toLocaleDateString('vi-VN') : 'Hôm nay';

  useEffect(() => {
    if (profileOpen && currentUser) {
      const storageKey = `orders_${currentUser.email}`;
      setOrders(JSON.parse(localStorage.getItem(storageKey)) || []);
    }
  }, [profileOpen, currentUser]);

  const handleSignOut = async () => {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    setCurrentUser(null);
    setIsAdmin(false);
    setProfileOpen(false);
    showToast("Đã đăng xuất");
    setTimeout(() => router.push('/login'), 600);
  };

  const goToAdmin = () => {
    setProfileOpen(false);
    setTimeout(() => router.push('/dashboard'), 300);
  };

  const openSettings = () => {
    setProfileOpen(false);
    setTimeout(() => setSettingsOpen(true), 300);
  };

  if (!currentUser || !mounted) return null;

  return (
    <div className={`fixed inset-0 z-[90] flex items-center justify-center p-4`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${active ? 'overlay-visible' : ''}`} onClick={() => setProfileOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 rounded-[28px] p-6 md:p-8 border border-black/5 shadow-2xl modal-content-animate modal-center modal-center-md ${active ? 'open' : ''}`}>
        <button onClick={() => setProfileOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press z-20">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-[20px] border border-black/5 mt-2">
          <div className="w-14 h-14 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center font-black text-xl shadow-inner overflow-hidden shrink-0">
            {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" alt="" /> : <span className="text-xl">{name.charAt(0).toUpperCase()}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-[#1d1d1f] truncate">{name}</h3>
            <p className="text-xs text-gray-500 truncate mb-1.5 font-medium">{email}</p>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isAdmin ? 'text-white bg-[#1d1d1f] border border-black' : 'text-green-600 bg-green-100 border border-green-200'}`}>{isAdmin ? 'Quản trị viên' : 'Thành viên'}</span>
              <span className="text-[10px] text-gray-400 font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">Tham gia: {joinDate}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="font-bold text-sm text-[#1d1d1f] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gray-400" /> Đơn hàng gần đây
            </h4>
            <span className="text-[11px] text-gray-400 font-medium">Tự động cập nhật</span>
          </div>
          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
            {orders.length === 0 ? (
              <div className="text-center py-6 text-[13px] text-gray-400 font-medium bg-gray-50 rounded-[16px] border border-black/5 border-dashed">Chưa có đơn hàng nào</div>
            ) : (
              orders.map((order, i) => (
                <div key={i} className="bg-white border border-gray-100 p-3.5 rounded-[16px] shadow-sm flex flex-col gap-2 relative overflow-hidden group hover:border-black/10 transition-colors modal-item-stagger" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#1d1d1f]">#{order.id}</span>
                    <span className="text-[9px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">{order.status}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium line-clamp-1 leading-snug">{order.items.join(' , ')}</div>
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {order.date}
                    </span>
                    <span className="font-black text-sm text-[#1d1d1f]">{order.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2.5 pt-4 border-t border-gray-100">
          {isAdmin && (
            <button onClick={goToAdmin} className="w-full py-3.5 px-4 rounded-[16px] bg-[#1d1d1f] text-sm font-bold flex items-center gap-3 text-white hover:bg-black/80 transition-colors btn-press mb-2.5 shadow-md">
              <BarChart3 className="w-4 h-4" /> Trang Quản Trị
            </button>
          )}
          <button onClick={openSettings} className="w-full py-3.5 px-4 rounded-[16px] bg-gray-50 text-sm font-bold flex items-center gap-3 text-[#1d1d1f] hover:bg-gray-100 transition-colors btn-press mb-2.5">
            <Settings className="w-4 h-4 text-gray-400" /> Cài đặt tài khoản
          </button>
          <button onClick={handleSignOut} className="w-full py-3.5 px-4 rounded-[16px] bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3 hover:bg-red-100 transition-colors btn-press">
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
