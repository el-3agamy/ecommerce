import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Brands() {
  const { data: brands, isLoading } = useFetchData('brands');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = useMemo(() => {
    if (!brands) return [];
    if (!search.trim()) return brands;
    return brands.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [brands, search]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

      {/* ── Hero / Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 text-white">
        {/* decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container py-16 flex flex-col items-center gap-6 text-center">
          {/* badge */}
          <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Our Partners
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Explore{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Top Brands
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
            Discover our curated collection of premium brands — quality you can
            trust, products you'll love.
          </p>

          {/* stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-2">
            {[
              { label: 'Partner Brands', value: brands?.length ?? '—' },
              { label: 'Categories', value: '20+' },
              { label: 'Products', value: '500+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-green-400">{s.value}</span>
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
              placeholder="Search brands..."
              className="w-full py-3 pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition"
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
            : `Showing all ${filtered.length} brands`}
        </p>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Verified Partners
        </div>
      </div>

      {/* ── Brand Grid ── */}
      <div className="container pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🔍</div>
            <p className="text-slate-500 text-lg font-medium">No brands found</p>
            <button
              onClick={() => setSearch('')}
              className="text-green-600 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4">
            {filtered.map((brand, idx) => (
              <Link
                to={`/brands/${brand._id}/${encodeURIComponent(brand.name)}`}
                key={brand._id}
                onMouseEnter={() => setHoveredId(brand._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-100 hover:border-green-200"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                {/* top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* image area */}
                <div className="relative flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white min-h-[120px]">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  />
                  {/* hover overlay tag */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                      Official
                    </span>
                  </div>
                </div>

                {/* footer */}
                <div className="px-4 pb-4 pt-2 border-t border-slate-50">
                  <h3 className="text-center text-sm font-semibold text-slate-700 group-hover:text-green-600 transition-colors duration-200 truncate">
                    {brand.name}
                  </h3>
                  <p className="text-center text-[10px] text-slate-400 mt-0.5 tracking-wide uppercase">
                    Verified Brand
                  </p>
                </div>

                {/* shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 py-14 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Want to see your brand here?
        </h2>
        <p className="text-green-100 text-sm mb-6">
          Partner with FreshCart and reach millions of shoppers.
        </p>
        <button className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 hover:scale-105 transition-all duration-200 shadow-lg">
          Become a Partner
        </button>
      </div>
    </div>
  );
}