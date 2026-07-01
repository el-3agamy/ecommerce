import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

// Emoji map for well-known category names (fallback to a default)
const categoryEmojis = {
  'Electronics': '⚡',
  'Laptops': '💻',
  "Women's Fashion": '👗',
  "Men's Fashion": '👕',
  'Mobiles': '📱',
  'Home & Kitchen': '🏠',
  'Sports & Outdoors': '🏋️',
  'Beauty & Personal Care': '💄',
  'Books': '📚',
  'Toys': '🧸',
  'Jewelry': '💍',
  'Automotive': '🚗',
  'Gaming': '🎮',
  'Music': '🎵',
  'Food': '🍎',
};
const getEmoji = (name) => categoryEmojis[name] ?? '🛍️';

// Gradient pairs by index
const gradients = [
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-green-600',
  'from-fuchsia-500 to-indigo-600',
  'from-teal-500 to-cyan-600',
  'from-red-500 to-rose-600',
];

export default function Categories() {
  const { data: categories, isLoading } = useFetchData('categories', 1, 100);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!categories) return [];
    if (!search.trim()) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">

      {/* ── Hero / Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 text-white">
        {/* decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container py-16 flex flex-col items-center gap-6 text-center">
          {/* badge */}
          <span className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Shop by Category
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Browse{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              All Categories
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
            Find exactly what you're looking for — explore our wide range of
            product categories handpicked for you.
          </p>

          {/* stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-2">
            {[
              { label: 'Categories', value: categories?.length ?? '—' },
              { label: 'Products', value: '500+' },
              { label: 'Brands', value: '30+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-violet-400">{s.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>

          {/* search */}
          <div className="relative w-full max-w-md mt-2">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full py-3 pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:border-violet-400 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white transition text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results bar ── */}
      <div className="container pt-8 pb-2 flex items-center justify-between">
        <p className="text-slate-500 text-sm">
          {search
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}"`
            : `Showing all ${filtered.length} categories`}
        </p>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          Click any category to explore products
        </div>
      </div>

      {/* ── Category Grid ── */}
      <div className="container pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🔍</div>
            <p className="text-slate-500 text-lg font-medium">No categories found</p>
            <button
              onClick={() => setSearch('')}
              className="text-violet-600 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filtered.map((category, idx) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}/${encodeURIComponent(category.name)}`}
                className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-violet-200"
              >
                {/* gradient top accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradients[idx % gradients.length]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                {/* image area */}
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* emoji pill (visible on hover) */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    {getEmoji(category.name)}
                  </div>

                  {/* "View Products" badge on hover */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      View Products
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* card footer */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors duration-200 truncate">
                      {category.name}
                    </h3>
                    <svg
                      className="w-4 h-4 text-slate-300 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2"
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 tracking-wide">
                    Tap to browse all products
                  </p>
                </div>

                {/* shimmer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 py-14 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Can't find what you're looking for?
        </h2>
        <p className="text-violet-100 text-sm mb-6">
          Use our smart search to discover any product across all departments.
        </p>
        <button className="bg-white text-violet-700 font-bold px-8 py-3 rounded-full hover:bg-violet-50 hover:scale-105 transition-all duration-200 shadow-lg">
          Search All Products
        </button>
      </div>
    </div>
  );
}
