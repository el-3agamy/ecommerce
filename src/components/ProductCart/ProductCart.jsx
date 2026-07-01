import { Button } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCart({ productCart, deletSpecificProduct, updateProductCount }) {
  const [loadinRemove, setLoadinRemove] = useState(false);
  const [incrementIsLoading, setIncrementIsLoading] = useState(false);
  const [decrementIsLoading, setDecrementIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(productCart.count);

  useEffect(() => {
    setProductCount(productCart.count);
  }, [productCart.count]);

  const pid = productCart.product._id || productCart.product.id;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Product Image Cover */}
      <Link
        to={`/ProductDetails/${pid}`}
        className="w-28 h-28 bg-slate-50 flex items-center justify-center rounded-xl overflow-hidden shrink-0 border border-slate-50"
      >
        <img
          src={productCart.product.imageCover}
          alt={productCart.product.title}
          className="max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Info & Quantity controls wrapper */}
      <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">

        {/* Name, Brand, Unit Price */}
        <div className="text-center sm:text-left pt-1">
          <Link
            to={`/ProductDetails/${pid}`}
            className="font-bold text-slate-800 hover:text-green-500 transition-colors line-clamp-1"
          >
            {productCart.product.title}
          </Link>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            Brand:{' '}
            <span className="text-slate-650 font-bold hover:text-green-500 transition-colors">
              {productCart.product?.brand?.name || 'Generic'}
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Unit Price:{' '}
            <span className="text-slate-700 font-bold">${productCart.price}</span>
          </p>
        </div>

        {/* Stepper controls & Calculations & Delete */}
        <div className="flex items-center sm:items-end justify-between sm:justify-start gap-6 sm:flex-col shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50">

          {/* Stepper Count Input */}
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-0.5">
            <Button
              isLoading={decrementIsLoading}
              disabled={productCart.count <= 1}
              onPress={() =>
                updateProductCount(
                  pid,
                  productCart.count - 1,
                  setIncrementIsLoading,
                  setDecrementIsLoading,
                  productCount
                )
              }
              className="h-8 w-8 min-w-8 rounded-lg bg-white border border-slate-100/50 shadow-sm text-slate-600 hover:text-red-500 hover:bg-red-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center p-0"
              disableRipple
            >
              {decrementIsLoading === false && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              )}
            </Button>

            <span className="w-10 text-center text-sm font-bold text-slate-750 select-none">
              {productCount}
            </span>

            <Button
              isLoading={incrementIsLoading}
              onPress={() =>
                updateProductCount(
                  pid,
                  productCart.count + 1,
                  setIncrementIsLoading,
                  setDecrementIsLoading,
                  productCart.count
                )
              }
              className="h-8 w-8 min-w-8 rounded-lg bg-white border border-slate-100/50 shadow-sm text-slate-600 hover:text-green-500 hover:bg-green-50 transition cursor-pointer flex items-center justify-center p-0"
              disableRipple
            >
              {incrementIsLoading === false && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </Button>
          </div>

          {/* Subtotal calculation & Remove Triggers */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-medium tracking-wider">Subtotal</span>
              <span className="text-base font-extrabold text-green-600">
                ${productCart.price * productCart.count}
              </span>
            </div>

            {/* Remove button */}
            <Button
              isLoading={loadinRemove}
              onPress={() => deletSpecificProduct(pid, setLoadinRemove)}
              className="h-9 w-9 min-w-9 bg-red-50 text-red-500 hover:bg-red-550 hover:text-white border border-red-100 hover:border-red-550 rounded-xl transition flex items-center justify-center p-0"
              isIconOnly
            >
              {loadinRemove === false && (
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              )}
            </Button>
          </div>

        </div>
      </div>

    </div>
  );
}
