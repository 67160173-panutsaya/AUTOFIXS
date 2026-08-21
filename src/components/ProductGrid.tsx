import { useEffect, useState, useMemo } from 'react';
import { supabase, type Part } from '@/lib/supabase';
import CategoryBar from '@/components/CategoryBar';
import ProductCard, { ProductGridSkeleton, EmptyResults } from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

type ProductGridProps = {
  searchQuery: string;
};

type SortOption = 'featured' | 'price_low' | 'price_high' | 'rating';

export default function ProductGrid({ searchQuery }: ProductGridProps) {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else if (data) {
          setParts(data as Part[]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let result = parts;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.compatibility.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    switch (sortBy) {
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
    return sorted;
  }, [parts, activeCategory, searchQuery, sortBy]);

  const sortLabels: Record<SortOption, string> = {
    featured: 'แนะนำ',
    price_low: 'ราคาต่ำ → สูง',
    price_high: 'ราคาสูง → ต่ำ',
    rating: 'คะแนนรีวิว',
  };

  return (
    <>
      <CategoryBar active={activeCategory} onChange={setActiveCategory} />

      <section id="featured" className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === 'all' ? 'สินค้าทั้งหมด' : activeCategory}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {loading ? 'กำลังโหลด...' : `${filtered.length} รายการ`}
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                เรียงตาม: {sortLabels[sortBy]}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-20">
                  {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt
                          ? 'bg-blue-600/20 text-blue-300'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sortLabels[opt]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center mb-6">
              <p className="text-red-300 text-sm">
                ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่อีกครั้ง
              </p>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <ProductGridSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyResults />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((part) => (
                <ProductCard key={part.id} part={part} onQuickView={setSelectedPart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selectedPart && (
        <ProductDetail part={selectedPart} onClose={() => setSelectedPart(null)} />
      )}
    </>
  );
}
