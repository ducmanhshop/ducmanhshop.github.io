'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import { X } from 'lucide-react';

export default function AuthModal() {
  const { authOpen, setAuthOpen, showToast, checkUser } = useApp();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!supabaseClient) return showToast("Lỗi kết nối database");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) return showToast("Vui lòng nhập đủ thông tin");
    
    try {
      if (isLoginMode) {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showToast("Đăng nhập thành công!");
      } else {
        const { error } = await supabaseClient.auth.signUp({ email, password });
        if (error) throw error;
        showToast("Đăng ký thành công! Hãy kiểm tra email.");
      }
      setAuthOpen(false);
      checkUser();
    } catch (err) {
      showToast(err.message);
    }
  };

  const loginWithGoogle = async () => {
    if (!supabaseClient) return showToast("Lỗi kết nối database");
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
      if (error) throw error;
    } catch (err) {
      showToast("Lỗi: " + err.message);
    }
  };

  return (
    <div className={`fixed inset-0 z-[90] flex items-center justify-center p-4 ${authOpen ? '' : 'hidden'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-md overlay-base ${authOpen ? 'overlay-visible' : ''}`} onClick={() => setAuthOpen(false)}></div>
      <div className={`bg-white w-full relative z-10 flex flex-col border border-black/5 shadow-2xl p-8 modal-content-animate modal-center modal-center-sm ${authOpen ? 'open' : ''}`}>
        <button onClick={() => setAuthOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors btn-press z-20">
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-8 mt-2">
          <img src="/logo.webp" alt="MDM Store" className="w-12 h-12 object-contain mx-auto mb-4 drop-shadow-md" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-12 h-12 bg-[#1d1d1f] rounded-[14px] flex items-center justify-center mx-auto mb-4 shadow-lg"><span class="text-white font-black text-xl">M</span></div>'; }} />
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{isLoginMode ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Vui lòng nhập thông tin để tiếp tục</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <input type="email" name="email" autoComplete="username" placeholder="email@vi-du.com" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 transition-colors outline-none text-sm font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Mật khẩu</label>
            <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 transition-colors outline-none text-sm font-medium" />
          </div>
          <div className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
              <span className="text-xs text-gray-500 font-medium">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-xs font-bold text-[#1d1d1f] hover:underline">Quên mật khẩu?</a>
          </div>
          <button type="submit" className="w-full bg-[#1d1d1f] text-white py-4 rounded-[16px] font-bold text-sm hover:scale-[0.98] transition-transform btn-press shadow-lg shadow-black/10">
            {isLoginMode ? 'Đăng nhập bằng Email' : 'Đăng ký ngay'}
          </button>
          <div className="relative mt-6 mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-4 text-gray-400 font-medium">Hoặc tiếp tục với</span></div>
          </div>
          <button type="button" onClick={loginWithGoogle} className="w-full bg-white border border-gray-200 text-[#1d1d1f] py-3.5 rounded-[16px] font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 btn-press shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Đăng nhập bằng Google
          </button>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 font-medium">
              {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="font-bold text-[#1d1d1f] ml-1 hover:underline">{isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
