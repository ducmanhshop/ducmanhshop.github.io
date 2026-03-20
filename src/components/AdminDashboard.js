'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { supabaseClient } from '@/lib/supabase';
import { formatPrice, getTodayStr } from '@/lib/utils';
import { Store, Users, MousePointerClick, ShoppingBag, DollarSign, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  const { navigateTo, isAdmin, showToast } = useApp();
  const [todayData, setTodayData] = useState({ visits: 0, clicks: 0, orders: 0, revenue: 0 });
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      showToast("Bạn không có quyền truy cập trang này!");
      navigateTo('home');
      return;
    }

    const fetchData = async () => {
      if (!supabaseClient) return;
      try {
        const { data, error } = await supabaseClient.from('tracking_stats').select('*').order('date', { ascending: false }).limit(7);
        if (error) throw error;
        const today = getTodayStr();
        const result = {};
        (data || []).forEach(row => {
          result[row.date] = { visits: row.visits || 0, clicks: row.clicks || 0, orders: row.orders || 0, revenue: row.revenue || 0 };
        });
        setTodayData(result[today] || { visits: 0, clicks: 0, orders: 0, revenue: 0 });
        const sorted = Object.entries(result).sort((a, b) => new Date(b[0]) - new Date(a[0])).slice(0, 7);
        setWeekData(sorted);
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, [isAdmin, navigateTo, showToast]);

  const maxVisits = weekData.reduce((max, [, d]) => Math.max(max, d.visits), 0);
  const today = getTodayStr();

  return (
    <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 transition-opacity duration-300 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1d1d1f] tracking-tighter">Tổng Quan Quản Trị</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Dữ liệu thống kê hoạt động của website</p>
        </div>
        <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-[#1d1d1f] bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:bg-gray-50 btn-press font-bold transition-colors w-max shadow-sm">
          <Store className="w-4 h-4" /> Quay lại cửa hàng
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { icon: Users, label: 'Lượt Truy Cập', value: todayData.visits, color: 'blue' },
          { icon: MousePointerClick, label: 'Click Sản Phẩm', value: todayData.clicks, color: 'purple' },
          { icon: ShoppingBag, label: 'Đơn Hàng Mới', value: todayData.orders, color: 'orange' },
          { icon: DollarSign, label: 'Doanh Thu', value: formatPrice(todayData.revenue), color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="admin-stat-card p-6 rounded-[24px]">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Hôm nay</span>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-[#1d1d1f]">{typeof stat.value === 'number' ? new Intl.NumberFormat('vi-VN').format(stat.value) : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm mb-8">
        <h3 className="text-xl font-black text-[#1d1d1f] mb-6 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-gray-400" /> Thống kê 7 ngày gần nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-black/5">
                <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider w-32">Ngày</th>
                <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Lượt Truy Cập</th>
                <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Lượt Click</th>
                <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Đơn Hàng</th>
                <th className="pb-3 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Doanh Thu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {weekData.map(([date, row]) => {
                const d = new Date(date);
                const isToday = date === today;
                const displayDate = isToday ? 'Hôm nay' : `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                const visitPercent = maxVisits > 0 ? (row.visits / maxVisits) * 100 : 0;
                return (
                  <tr key={date}>
                    <td className="py-4">
                      <span className={`text-sm font-bold text-[#1d1d1f] ${isToday ? 'bg-[#1d1d1f] text-white px-2.5 py-1 rounded-md' : ''}`}>{displayDate}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3 w-40">
                        <span className="text-sm font-bold text-[#1d1d1f] w-8">{row.visits}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${visitPercent}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4"><span className="text-sm font-bold text-[#1d1d1f]">{row.clicks}</span></td>
                    <td className="py-4"><span className="text-sm font-bold text-[#1d1d1f]">{row.orders}</span></td>
                    <td className="py-4 text-right"><span className="text-sm font-black text-[#1d1d1f]">{formatPrice(row.revenue)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
