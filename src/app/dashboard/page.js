'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import AdminDashboard from '@/components/AdminDashboard';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { currentUser, isAdmin, isLoading } = useApp();
  const router = useRouter();

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShieldAlert className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Đang kiểm tra quyền truy cập...</p>
        </div>
      </main>
    );
  }

  if (!currentUser || !isAdmin) {
    return (
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-50 rounded-[24px] flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-[#1d1d1f] tracking-tight mb-2">Truy cập bị từ chối</h1>
          <p className="text-gray-500 font-medium mb-8">Bạn cần đăng nhập bằng tài khoản quản trị viên để xem trang này.</p>
          <div className="flex flex-col gap-3">
            <Link href="/login" className="px-6 py-3.5 bg-[#1d1d1f] text-white rounded-[16px] font-bold text-sm hover:scale-[0.98] transition-transform btn-press shadow-lg shadow-black/10 text-center">
              Đăng nhập
            </Link>
            <Link href="/" className="px-6 py-3.5 bg-gray-100 text-[#1d1d1f] rounded-[16px] font-bold text-sm hover:bg-gray-200 transition-colors btn-press text-center">
              Về trang chủ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 relative z-10">
      <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1d1d1f] mb-6 md:mb-8 btn-press font-bold transition-colors w-max">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></div>
        Về trang chủ
      </Link>
      <AdminDashboard />
    </main>
  );
}
