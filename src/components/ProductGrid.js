'use client';

import { useApp } from '@/context/AppContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products, currentCategory, setCurrentCategory, searchTerm } = useApp();

  const categories = ['all', 'design', 'ai', 'entertainment', 'office'];
  const categoryLabels = { all: 'Tất cả', design: 'Thiết kế', ai: 'AI Tool', entertainment: 'Giải trí', office: 'Văn phòng' };

  const filtered = products.filter(p =>
    (currentCategory === 'all' || p.category === currentCategory) &&
    p.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <>
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] tracking-tighter">Sản phẩm nổi bật</h2>
      </div>

      <div className="flex justify-start md:justify-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar py-2 mb-8" id="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            className={`filter-btn whitespace-nowrap px-5 md:px-6 py-2.5 rounded-full text-sm font-bold transition-all btn-press ${
              currentCategory === cat
                ? 'bg-[#1d1d1f] text-white shadow-md'
                : 'bg-transparent text-gray-600 border border-black/10 hover:border-black/30'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m14.5 7.5-5 5"/><path d="m7.5 7.5 5 5"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2 tracking-tight">Không tìm thấy</h3>
          <p className="text-gray-500 mb-6 font-medium">Thử một từ khoá khác xem sao.</p>
          <button onClick={() => setCurrentCategory('all')} className="px-6 py-2.5 bg-gray-100 rounded-full text-[#1d1d1f] font-bold hover:bg-gray-200 transition-colors btn-press">Xem tất cả</button>
        </div>
      ) : (
        <div id="product-grid" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-16">
          {filtered.map((p, index) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
