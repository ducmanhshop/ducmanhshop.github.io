'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { Star, Shield, Zap } from 'lucide-react';

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
    <div className="min-h-screen flex relative overflow-hidden">
      {/* ===== LEFT — Dark Branding Panel ===== */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] bg-[#09090b] relative overflow-hidden items-end p-12 xl:p-16">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-violet-500/[0.07] rounded-full blur-[100px] animate-pulse" style={{animationDuration:'6s'}}></div>
          <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] bg-blue-500/[0.06] rounded-full blur-[100px] animate-pulse" style={{animationDuration:'8s'}}></div>
          <div className="absolute top-[50%] left-[40%] w-[250px] h-[250px] bg-emerald-500/[0.05] rounded-full blur-[80px] animate-pulse" style={{animationDuration:'7s'}}></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize:'60px 60px'}}></div>
        </div>

        <div className="relative z-10 max-w-md">
          <Link href="/" className="inline-block mb-12">
            <img src="/logo.webp" alt="MDM Store" className="w-12 h-12 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500" style={{ color: 'transparent' }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-12 h-12 bg-white/10 backdrop-blur rounded-[14px] flex items-center justify-center shadow-2xl border border-white/5"><span class="text-white font-black text-xl">M</span></div>'; }} />
          </Link>

          <h1 className="text-[40px] xl:text-[48px] font-black text-white tracking-tight leading-[1.08] mb-5">
            Nơi bạn trải nghiệm{' '}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Premium</span>
          </h1>
          <p className="text-[15px] text-zinc-400 leading-relaxed font-medium mb-12 max-w-sm">
            Tài khoản chính hãng, bảo hành trọn đời, giao hàng tự động 24/7.
          </p>

          {/* Trust badges */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-3 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-[13px] font-black text-white leading-none">5.0</div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">Đánh giá</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-3 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[13px] font-black text-white leading-none">Trọn đời</div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">Bảo hành</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-3 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[13px] font-black text-white leading-none">Tự động</div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">Giao hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT — Login Form ===== */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-[#fafafa] relative">
        {/* Mobile ambient */}
        <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-violet-200/30 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-blue-200/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="w-full max-w-[400px] relative z-10">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-12">
            <img src="/logo.webp" alt="" className="w-10 h-10 object-contain drop-shadow-md" style={{color:'transparent'}} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-10 h-10 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center shadow-md"><span class="text-white font-black text-lg">M</span></div>'; }} />
            <div>
              <div className="text-[15px] font-extrabold text-[#1d1d1f] tracking-tight leading-none">MDM Store</div>
              <div className="text-[9px] text-gray-400 font-semibold tracking-widest mt-0.5">PREMIUM</div>
            </div>
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-[28px] font-black text-[#1d1d1f] tracking-tight leading-tight">
              {isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h2>
            <p className="text-[14px] text-gray-500 mt-2 font-medium leading-relaxed">
              {isLoginMode ? 'Nhập thông tin tài khoản để tiếp tục mua sắm.' : 'Đăng ký tài khoản mới để bắt đầu trải nghiệm.'}
            </p>
          </div>

          {/* Google button first */}
          <button type="button" onClick={loginWithGoogle} className="w-full bg-white border border-black/[0.08] text-[#1d1d1f] py-3.5 rounded-2xl font-bold text-[13px] hover:bg-white hover:border-black/15 hover:shadow-md transition-all flex items-center justify-center gap-2.5 btn-press shadow-sm mb-6">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Tiếp tục với Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/[0.06]"></div></div>
            <div className="relative flex justify-center text-[11px]"><span className="bg-[#fafafa] px-4 text-gray-400 font-semibold uppercase tracking-wider">hoặc dùng email</span></div>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-3.5">
            <div>
              <input type="email" name="email" autoComplete="username" placeholder="Email" className="w-full px-4 py-3.5 rounded-2xl bg-white border border-black/[0.06] focus:border-black/15 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] transition-all outline-none text-[13px] font-medium placeholder:text-gray-400" />
            </div>
            <div>
              <input type="password" name="password" autoComplete="current-password" placeholder="Mật khẩu" className="w-full px-4 py-3.5 rounded-2xl bg-white border border-black/[0.06] focus:border-black/15 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] transition-all outline-none text-[13px] font-medium placeholder:text-gray-400" />
            </div>

            {isLoginMode && (
              <div className="flex items-center justify-between px-0.5 pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-[15px] h-[15px] cursor-pointer" />
                  <span className="text-[12px] text-gray-500 font-medium">Ghi nhớ</span>
                </label>
                <a href="#" className="text-[12px] font-bold text-[#1d1d1f] hover:underline underline-offset-2">Quên mật khẩu?</a>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-[#1d1d1f] text-white py-3.5 rounded-2xl font-bold text-[13px] hover:scale-[0.98] transition-all btn-press shadow-lg shadow-black/10 disabled:opacity-60 disabled:pointer-events-none !mt-5">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Đang xử lý...
                </span>
              ) : (
                isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 font-medium mt-8">
            {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="font-bold text-[#1d1d1f] ml-1.5 hover:underline underline-offset-2">{isLoginMode ? 'Đăng ký' : 'Đăng nhập'}</button>
          </p>

          <p className="text-center text-[11px] text-gray-400 mt-6">
            Bằng việc tiếp tục, bạn đồng ý với{' '}
            <Link href="/" className="underline underline-offset-2 hover:text-gray-600">Điều khoản dịch vụ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
