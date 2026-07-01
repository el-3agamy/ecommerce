import React, { useEffect, useState } from 'react';
import ProductCart from '../../components/ProductCart/ProductCart';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [clearCartLoading, setClearCartLoading] = useState(false);

  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    setIsLoading(true);
    if (localStorage.getItem('token')) {
      try {
        const { data } = await api.get('/cart');
        setCartId(data.cartId);
        setNumOfCartItem(data.numOfCartItems);
        setCartData(data.data);
      } catch (error) {
        console.error('Failed to get user cart', error);
      }
    }
    setIsLoading(false);
  }

  async function deletSpecificProduct(productId, setLoadinRemove) {
    setLoadinRemove(true);
    try {
      const { data } = await api.delete('/cart/' + productId);
      setCartData(data.data);
      setCartId(data.id || data.cartId);
      setNumOfCartItem(data.numOfCartItems);
    } catch (error) {
      console.error('Failed to delete product', error);
    } finally {
      setLoadinRemove(false);
    }
  }

  async function updateProductCount(
    productId,
    count,
    setIncrementIsLoading,
    setDecrementIsLoading,
    currentCount
  ) {
    if (count > currentCount) setIncrementIsLoading(true);
    if (count < currentCount) setDecrementIsLoading(true);
    try {
      const { data } = await api.put(`/cart/${productId}`, { count });
      setCartId(data.cartId);
      setNumOfCartItem(data.numOfCartItems);
      setCartData(data.data);
    } catch (error) {
      console.error('Failed to update count', error);
    } finally {
      setDecrementIsLoading(false);
      setIncrementIsLoading(false);
    }
  }

  async function clearCart() {
    setClearCartLoading(true);
    try {
      await api.delete('/cart');
      setCartData(null);
      setCartId(null);
      setNumOfCartItem(0);
    } catch (error) {
      console.error('Failed to clear cart', error);
    } finally {
      setClearCartLoading(false);
    }
  }

  if (isLoading) return <LoadingScreen />;

  const isLoggedIn = !!localStorage.getItem('token');
  const isEmpty = isLoggedIn && numOfCartItem === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/20">
      {isLoggedIn ? (
        <>
          {/* ── Hero / Header ── */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-green-950 text-white">
            {/* decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-550 opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative container py-16 flex flex-col items-center gap-6 text-center">
              {/* badge */}
              <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Shopping Checkout
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                My{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Shopping Bag
                </span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Review your items, adjust quantities, and proceed to checkout to secure your transaction.
              </p>

              {/* stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-green-400">{numOfCartItem}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Total Items</span>
                </div>
                {cartData?.totalCartPrice && (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-green-400">${cartData.totalCartPrice}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Basket Value</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Main Content Container ── */}
          <div className="container py-10 max-w-7xl">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm max-w-xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-4xl mb-4 text-green-600">🛒</div>
                <h3 className="text-xl font-bold text-slate-800">Your shopping list is empty</h3>
                <p className="text-slate-400 text-sm max-w-xs mt-1">
                  You haven't added any products to your cart yet. Browse our store and catch the best discounts!
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-sm transition-all duration-200"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Left Section: List of Items */}
                <div className="flex-1 w-full lg:w-2/3">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-800">
                      Cart Products ({numOfCartItem})
                    </h3>
                    <Button
                      isLoading={clearCartLoading}
                      color="danger"
                      variant="light"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold text-sm rounded-xl px-4 py-2 flex items-center gap-2 transition"
                      onPress={clearCart}
                    >
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Clear All Items
                    </Button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {cartData?.products.map((productCart, index) => (
                      <ProductCart
                        key={index}
                        productCart={productCart}
                        deletSpecificProduct={deletSpecificProduct}
                        updateProductCount={updateProductCount}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Section: Sticky Summary Card */}
                <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md shadow-slate-100/50">
                    <h3 className="font-bold text-slate-800 text-lg mb-4 pb-3 border-b border-slate-50">
                      Order Summary
                    </h3>

                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="font-bold text-slate-800">${cartData?.totalCartPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Shipping</span>
                        <span className="font-bold text-slate-800">$4.99</span>
                      </div>
                      <div className="flex justify-between text-xs text-rose-500 font-medium">
                        <span>Discount Coupon</span>
                        <span>-$0.00</span>
                      </div>

                      <hr className="my-2 border-slate-100" />

                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-base text-slate-800">Total Price</span>
                        <span className="text-2xl font-black text-green-600">${cartData?.totalCartPrice + 4.99}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 text-right self-end -mt-2">
                        Includes VAT & local duties
                      </span>
                    </div>

                    <Link
                      to={'/address/' + cartId}
                      className="block text-center mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-extrabold rounded-xl shadow-md shadow-green-100 hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
                    >
                      Secure Checkout
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>

                    {/* features note */}
                    <div className="mt-6 flex flex-col gap-3.5 pt-6 border-t border-slate-50">
                      {[
                        { icon: '🔒', title: 'Secure transactions', desc: 'PCI-DSS certified protection' },
                        { icon: '✈️', title: 'Fast shipping', desc: 'Deliveries within 2-4 business days' },
                        { icon: '🔄', title: '30-day window returns', desc: 'Hassle-free shipping refunds' },
                      ].map((item) => (
                        <div key={item.title} className="flex gap-3 text-xs leading-relaxed">
                          <span className="text-base">{item.icon}</span>
                          <div>
                            <p className="font-bold text-slate-700">{item.title}</p>
                            <p className="text-slate-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-4 text-slate-400">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800">Please Log In</h2>
          <p className="text-slate-400 text-sm max-w-sm mt-1 mb-6">
            Log in to view your shopping cart, review items, and complete checkout.
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-3 rounded-full text-sm shadow-md transition-all duration-200"
          >
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
}
