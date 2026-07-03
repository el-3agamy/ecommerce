import React, { useState, useMemo, useEffect } from "react";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import useFetchData from "../../hooks/useFetchData";
import ShopSideBar from "../../components/ShopSideBar/ShopSideBar";
import useFilteredProducts from "../../hooks/useFilteredProducts";

// Default filter state factory
const defaultFilters = (min = 0, max = 5000) => ({
  minPrice: min,
  maxPrice: max,
  categories: new Set(),
  brands: new Set(),
});

export default function Shop() {
  const [page, setPage] = useState(1);

  // Fetch products, categories, brands
  const { data: products, pagination, isLoading: productsLoading } = useFetchData("products", page, 12);
  const { data: allCategories, isLoading: catsLoading } = useFetchData("categories", 1, 100);
  const { data: allBrands, isLoading: brandsLoading } = useFetchData("brands", 1, 100);

  // Compute absolute price range from the current product page
  const priceRange = useMemo(() => {
    if (!products?.length) return { min: 0, max: 5000 };
    const prices = products.map((p) => p.priceAfterDiscount ?? p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // Filter state — initialised with safe defaults
  const [filters, setFilters] = useState(() => defaultFilters(0, 5000));

  // Sync price bounds whenever the product page changes (keeps sliders within valid range)
  useEffect(() => {
    if (products?.length) {
      setFilters((prev) => ({
        ...prev,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, priceRange.min, priceRange.max]);

  const filteredProducts = useFilteredProducts(products ?? [], filters);

  const isLoading = productsLoading || catsLoading || brandsLoading;

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex gap-6 items-start px-4 py-6">
      {/* Sidebar */}
      <ShopSideBar
        filters={filters}
        setFilters={setFilters}
        allCategories={allCategories ?? []}
        allBrands={allBrands ?? []}
        priceRange={priceRange}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing{" "}
          <span className="font-semibold text-gray-800">{filteredProducts.length}</span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
              />
            </svg>
            <p className="text-lg font-medium">No products match your filters</p>
            <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          <span className="flex items-center px-4 py-2 font-medium text-gray-700">
            Page {page}
          </span>
          <button
            disabled={page === pagination?.numberOfPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
