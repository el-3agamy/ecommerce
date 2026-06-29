import React from 'react';

/**
 * Displays price — with or without a discount.
 * Props:
 *   price            — original price (always required)
 *   priceAfterDiscount — discounted price (optional)
 *   large            — if true, uses text-2xl; otherwise text-3xl
 */
export default function PriceDisplay({ price, priceAfterDiscount, large = false }) {
    const boldClass = large ? 'text-2xl font-bold' : 'text-3xl font-bold text-slate-900';
    const strikeClass = large ? 'text-gray-500 line-through' : 'text-sm text-slate-900 line-through';

    if (priceAfterDiscount) {
        return (
            <p>
                <span className={`${boldClass} mr-2`}>${priceAfterDiscount}</span>
                <span className={strikeClass}>${price}</span>
            </p>
        );
    }

    return <span className={boldClass}>${price}</span>;
}
