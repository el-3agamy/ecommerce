import React, { useMemo } from "react";

/**
 * ShopSideBar
 * Props:
 *  - filters        : { minPrice, maxPrice, categories: Set<id>, brands: Set<id> }
 *  - setFilters     : state setter
 *  - allCategories  : [{ _id, name }]
 *  - allBrands      : [{ _id, name }]
 *  - priceRange     : { min, max } — absolute min/max from the product list
 */
export default function ShopSideBar({
  filters,
  setFilters,
  allCategories = [],
  allBrands = [],
  priceRange = { min: 0, max: 5000 },
}) {
  /* ── helpers ── */
  const toggleSet = (key, id) => {
    setFilters((prev) => {
      const next = new Set(prev[key]);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [key]: next };
    });
  };

  const clearFilters = () => {
    setFilters({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      categories: new Set(),
      brands: new Set(),
    });
  };

  const activeCount =
    filters.categories.size +
    filters.brands.size +
    (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max ? 1 : 0);

  return (
    <aside className="w-64 min-w-[16rem] flex-shrink-0 bg-white border-r border-gray-100 shadow-sm rounded-xl p-5 space-y-7 self-start sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          {/* filter icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 000 2h18a1 1 0 000-2H3zM7 10a1 1 0 000 2h10a1 1 0 000-2H7zM11 16a1 1 0 100 2h2a1 1 0 100-2h-2z" />
          </svg>
          Filters
          {activeCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* ── Price Range ── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="space-y-4">
          {/* Display values */}
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span className="bg-green-50 border border-green-200 rounded px-2 py-0.5 text-green-700">
              EGP {filters.minPrice}
            </span>
            <span className="bg-green-50 border border-green-200 rounded px-2 py-0.5 text-green-700">
              EGP {filters.maxPrice}
            </span>
          </div>

          {/* Min slider */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Min price</label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={filters.minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= filters.maxPrice) setFilters((p) => ({ ...p, minPrice: val }));
              }}
              className="w-full accent-green-500 cursor-pointer"
            />
          </div>

          {/* Max slider */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Max price</label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= filters.minPrice) setFilters((p) => ({ ...p, maxPrice: val }));
              }}
              className="w-full accent-green-500 cursor-pointer"
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* ── Categories ── */}
      <FilterSection
        title="Categories"
        items={allCategories}
        selected={filters.categories}
        onToggle={(id) => toggleSet("categories", id)}
      />

      <hr className="border-gray-100" />

      {/* ── Brands ── */}
      <FilterSection
        title="Brands"
        items={allBrands}
        selected={filters.brands}
        onToggle={(id) => toggleSet("brands", id)}
      />
    </aside>
  );
}

/* ── Reusable checkbox section ── */
function FilterSection({ title, items, selected, onToggle }) {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? items : items.slice(0, 6);

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        {title}
        {selected.size > 0 && (
          <span className="ml-2 text-green-500 font-bold text-xs">({selected.size})</span>
        )}
      </h3>
      <ul className="space-y-2">
        {visible.map((item) => (
          <li key={item._id}>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.has(item._id)}
                onChange={() => onToggle(item._id)}
                className="w-4 h-4 accent-green-500 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors capitalize">
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {items.length > 6 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-2 text-xs text-green-600 hover:text-green-800 font-medium"
        >
          {showAll ? "Show less ▲" : `Show all (${items.length}) ▼`}
        </button>
      )}
    </section>
  );
}
