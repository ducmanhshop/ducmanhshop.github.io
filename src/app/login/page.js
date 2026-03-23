'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const { showToast, checkUser, currentUser } = useApp();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (currentUser) {
    router.push('/');
    return null;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!supabaseClient) return showToast("Lỗi kết nối database");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) return showToast("Vui lòng nhập đủ thông tin");
    
    setLoading(true);
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
      await checkUser();
      router.push('/');
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
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
    <main className="min-h-screen flex relative z-10">
      {/* Left side — branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] bg-[#0a0a0a] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-emerald-600/8 rounded-full blur-[80px]"></div>
        </div>
        <div className="relative z-10 px-16 max-w-lg">
          <Link href="/">
            <img src="/logo.webp" alt="MDM Store" className="w-16 h-16 object-contain mb-10 drop-shadow-2xl hover:scale-105 transition-transform" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-16 h-16 bg-white/10 rounded-[18px] flex items-center justify-center mb-10 shadow-2xl border border-white/10"><span class="text-white font-black text-3xl">M</span></div>'; }} />
          </Link>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Trải nghiệm<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Premium</span> không giới hạn
          </h1>
          <p className="text-gray-400 text-base leading-relaxed font-medium mb-10">
            Tài khoản chính hãng, bảo hành trọn đời. Hơn 1000+ khách hàng đã tin tưởng sử dụng dịch vụ.
          </p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-black text-white">1K+</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Khách hàng</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">5.0</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Đánh giá</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">24/7</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/">
              <img src="/logo.webp" alt="MDM Store" className="w-14 h-14 object-contain mx-auto mb-4 drop-shadow-md" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-14 h-14 bg-[#1d1d1f] rounded-[16px] flex items-center justify-center mx-auto mb-4 shadow-lg"><span class="text-white font-black text-2xl">M</span></div>'; }} />
            </Link>
            <h2 className="text-xl font-black text-[#1d1d1f] tracking-tight">MDM Store</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] tracking-tight">{isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">{isLoginMode ? 'Chào mừng trở lại! Nhập thông tin để tiếp tục.' : 'Tạo tài khoản mới để bắt đầu mua sắm.'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <input type="email" name="email" autoComplete="username" placeholder="email@vi-du.com" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] transition-all outline-none text-sm font-medium" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Mật khẩu</label>
              <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className="w-full px-4 py-3.5 rounded-[16px] bg-gray-50 border border-transparent focus:bg-white focus:border-black/10 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] transition-all outline-none text-sm font-medium" />
            </div>
            {isLoginMode && (
              <div className="flex items-center justify-between pt-1 pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
                  <span className="text-xs text-gray-500 font-medium">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-xs font-bold text-[#1d1d1f] hover:underline">Quên mật khẩu?</a>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full bg-[#1d1d1f] text-white py-4 rounded-[16px] font-bold text-sm hover:scale-[0.98] transition-all btn-press shadow-lg shadow-black/10 disabled:opacity-60 disabled:pointer-events-none mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Đang xử lý...
                </span>
              ) : (
                isLoginMode ? 'Đăng nhập' : 'Đăng ký'
              )}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[#f8f8fa] lg:bg-white px-4 text-gray-400 font-medium">hoặc</span></div>
          </div>

          <button type="button" onClick={loginWithGoogle} className="w-full bg-white border border-gray-200 text-[#1d1d1f] py-3.5 rounded-[16px] font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2.5 btn-press shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Tiếp tục với Google
          </button>

          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="font-bold text-[#1d1d1f] ml-1.5 hover:underline underline-offset-2">{isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}</button>
          </p>
        </div>
      </div>
    </main>
  );
}
