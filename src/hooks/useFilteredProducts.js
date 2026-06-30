/**
 * useFilteredProducts
 * Applies price range, category, and brand filters to a product list.
 */
const useFilteredProducts = (products = [], filters) => {
    const { minPrice, maxPrice, categories, brands } = filters;

    const filtered = products.filter((product) => {
        const effectivePrice = product.priceAfterDiscount ?? product.price;

        // Price range check
        if (effectivePrice < minPrice || effectivePrice > maxPrice) return false;

        // Category check (empty Set = all allowed)
        if (categories.size > 0 && !categories.has(product.category?._id)) return false;

        // Brand check (empty Set = all allowed)
        if (brands.size > 0 && !brands.has(product.brand?._id)) return false;

        return true;
    });

    return filtered;
};

export default useFilteredProducts;
