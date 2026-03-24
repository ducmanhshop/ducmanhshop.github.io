'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { Star, Shield, Zap, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { showToast, checkUser, currentUser } = useApp();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentUser) router.push('/');
  }, [currentUser, router]);

  if (currentUser) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!supabaseClient) return showToast("Lỗi kết nối database");
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if (!email || !password) return showToast("Vui lòng nhập đủ thông tin");
    if (password.length < 6) return showToast("Mật khẩu tối thiểu 6 ký tự");

    setLoading(true);
    try {
      if (isLoginMode) {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showToast("Đăng nhập thành công! 🎉");
      } else {
        const { error } = await supabaseClient.auth.signUp({ email, password });
        if (error) throw error;
        showToast("Đăng ký thành công! Kiểm tra email để xác nhận.");
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
    setGoogleLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      showToast("Lỗi: " + err.message);
      setGoogleLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* ===== LEFT — Dark Branding ===== */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] bg-[#08080a] relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[5%] right-[15%] w-[450px] h-[450px] rounded-full blur-[120px]" style={{background:'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)', animation:'floatOrb1 20s ease-in-out infinite'}}></div>
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{background:'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)', animation:'floatOrb2 25s ease-in-out infinite'}}></div>
          <div className="absolute top-[45%] left-[35%] w-[300px] h-[300px] rounded-full blur-[90px]" style={{background:'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', animation:'floatOrb3 18s ease-in-out infinite'}}></div>
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize:'32px 32px'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Top — Logo */}
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <img src="/logo.webp" alt="MDM Store" className="w-10 h-10 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" style={{color:'transparent'}} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-10 h-10 bg-white/10 rounded-[12px] flex items-center justify-center border border-white/5"><span class="text-white font-black text-lg">M</span></div>'; }} />
            <div>
              <div className="text-[14px] font-extrabold text-white/90 tracking-tight leading-none">MDM Store</div>
              <div className="text-[9px] text-white/30 font-semibold tracking-[0.2em] mt-0.5">PREMIUM</div>
            </div>
          </Link>

          {/* Center — Hero text */}
          <div className={`max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-[11px] font-bold text-violet-400/80 uppercase tracking-widest">Chào mừng đến MDM Store</span>
            </div>
            <h1 className="text-[42px] xl:text-[50px] font-black text-white tracking-tight leading-[1.05] mb-5">
              Trải nghiệm<br />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Premium</span> không{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">giới hạn</span>
            </h1>
            <p className="text-[15px] text-zinc-500 leading-relaxed font-medium max-w-sm">
              Tài khoản chính hãng, bảo hành trọn đời. Hơn 1000+ khách hàng đã tin tưởng sử dụng.
            </p>
          </div>

          {/* Bottom — Trust badges */}
          <div className={`flex gap-3 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { icon: Star, label: '5.0', sub: 'Đánh giá', color: 'amber' },
              { icon: Shield, label: 'Trọn đời', sub: 'Bảo hành', color: 'emerald' },
              { icon: Zap, label: 'Tự động', sub: 'Giao hàng', color: 'blue' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3 hover:bg-white/[0.06] transition-colors duration-300">
                <div className={`w-9 h-9 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}>
                  <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                </div>
                <div>
                  <div className="text-[13px] font-black text-white leading-none">{item.label}</div>
                  <div className="text-[10px] text-zinc-500 font-medium mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT — Login Form ===== */}
      <div className="flex-1 flex flex-col bg-[#fafafa] relative">
        {/* Mobile ambient */}
        <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-15%] right-[-15%] w-[350px] h-[350px] bg-violet-200/25 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-15%] left-[-15%] w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Top bar mobile */}
        <div className="lg:hidden flex items-center justify-between px-5 pt-5 relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.webp" alt="" className="w-8 h-8 object-contain" style={{color:'transparent'}} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div class="w-8 h-8 bg-[#1d1d1f] rounded-[10px] flex items-center justify-center"><span class="text-white font-black text-sm">M</span></div>'; }} />
            <span className="text-[14px] font-extrabold text-[#1d1d1f] tracking-tight">MDM Store</span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
          <div className={`w-full max-w-[400px] transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-[26px] md:text-[30px] font-black text-[#1d1d1f] tracking-tight leading-tight">
                {isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}
              </h2>
              <p className="text-[13px] md:text-[14px] text-gray-500 mt-2 font-medium">
                {isLoginMode ? 'Chào mừng trở lại! Đăng nhập để tiếp tục.' : 'Tạo tài khoản mới chỉ trong vài giây.'}
              </p>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={googleLoading}
              className="w-full bg-white border border-black/[0.08] text-[#1d1d1f] py-3.5 rounded-2xl font-bold text-[13px] hover:border-black/15 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm mb-6 disabled:opacity-60 active:scale-[0.98]"
            >
              {googleLoading ? (
                <svg className="animate-spin w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              )}
              {googleLoading ? 'Đang kết nối...' : 'Tiếp tục với Google'}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/[0.06]"></div></div>
              <div className="relative flex justify-center text-[11px]"><span className="bg-[#fafafa] px-4 text-gray-400 font-semibold uppercase tracking-wider">hoặc dùng email</span></div>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-black/[0.06] focus:border-black/15 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] transition-all duration-200 outline-none text-[13px] font-medium placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block ml-1">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-white border border-black/[0.06] focus:border-black/15 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] transition-all duration-200 outline-none text-[13px] font-medium placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLoginMode && (
                <div className="flex items-center justify-end px-0.5 pt-1">
                  <a href="#" className="text-[12px] font-bold text-[#1d1d1f] hover:underline underline-offset-2">Quên mật khẩu?</a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1d1d1f] text-white py-3.5 rounded-2xl font-bold text-[13px] hover:bg-black/80 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/10 disabled:opacity-60 disabled:pointer-events-none !mt-5"
              >
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

            <p className="text-center text-[13px] text-gray-500 font-medium mt-7">
              {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button type="button" onClick={switchMode} className="font-bold text-[#1d1d1f] ml-1.5 hover:underline underline-offset-2 transition-colors">{isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}</button>
            </p>

            <p className="text-center text-[11px] text-gray-400 mt-5 leading-relaxed">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <Link href="/" className="underline underline-offset-2 hover:text-gray-600 transition-colors">Điều khoản dịch vụ</Link>
              {' '}và{' '}
              <Link href="/" className="underline underline-offset-2 hover:text-gray-600 transition-colors">Chính sách bảo mật</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
