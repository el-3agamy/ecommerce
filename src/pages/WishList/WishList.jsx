import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import addToCart from '../../services/cartServices';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

export default function WishList() {
  const [removingId, setRemovingId] = useState(null);
  const [addLoadingId, setAddLoadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    setIsLoading(true);
    if (localStorage.getItem('token')) {
      try {
        const { data } = await api.get('/wishlist');
        setWishlistData(data.data || []);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    }
    setIsLoading(false);
  }

  async function removeSpecificProduct(productId) {
    setRemovingId(productId);
    try {
      await api.delete(`/wishlist/${productId}`);
      // Re-fetch wishlist to synchronize status
      await getUserWishlist();
    } catch (error) {
      console.error('Failed to remove item', error);
    } finally {
      setRemovingId(null);
    }
  }

  if (isLoading) return <LoadingScreen />;

  const count = wishlistData?.length ?? 0;
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {isLoggedIn ? (
        <>
          {/* ── Hero / Header ── */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white">
            {/* decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-rose-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-rose-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative container py-16 flex flex-col items-center gap-6 text-center">
              {/* badge */}
              <span className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-405/30 text-rose-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Personal Boutique
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight flex items-center gap-3">
                My{' '}
                <span className="bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">
                  Wishlist
                </span>
              </h1>

              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Save your favorite items here, monitor price drops, and add them to your cart whenever you are ready.
              </p>

              {/* stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-rose-400">{count}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Saved Items</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-10 max-w-5xl">
            {count === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-4xl mb-4 text-rose-500">❤️</div>
                <h3 className="text-xl font-bold text-slate-800">Your wishlist is empty</h3>
                <p className="text-slate-400 text-sm max-w-xs mt-1">
                  Explore our products and tap the heart icon to save products you love here!
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-sm transition-all duration-200"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {wishlistData.map((product) => {
                  const pid = product.id || product._id;
                  return (
                    <div
                      key={pid}
                      className="group relative bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/30 hover:border-rose-100"
                    >
                      {/* Product image */}
                      <Link
                        to={`/ProductDetails/${pid}`}
                        className="relative w-36 h-36 bg-slate-50 flex items-center justify-center rounded-xl overflow-hidden shrink-0 border border-slate-50"
                      >
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* Details information */}
                      <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between h-full pt-1">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <Link
                                to={`/ProductDetails/${pid}`}
                                className="font-bold text-lg text-slate-800 hover:text-rose-500 transition-colors line-clamp-1"
                              >
                                {product.title}
                              </Link>
                              {product.brand && (
                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                                  Brand:{' '}
                                  <span className="text-slate-650 font-bold hover:text-green-500 transition-colors">
                                    {product.brand.name}
                                  </span>
                                </p>
                              )}
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeSpecificProduct(pid)}
                              disabled={removingId === pid}
                              title="Remove item"
                              className="self-center sm:self-auto p-2 bg-red-50 text-red-550 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl transition-all duration-200 disabled:opacity-50 shrink-0"
                            >
                              {removingId === pid ? (
                                <svg className="animate-spin h-5.5 w-5.5 text-current" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              )}
                            </button>
                          </div>
                          <p className="text-slate-550 text-sm mt-3 line-clamp-2 leading-relaxed max-w-3xl">
                            {product.description}
                          </p>
                        </div>

                        {/* Price and Cart Action */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-50">
                          <div className="text-xl font-bold bg-green-50 text-green-700 px-3 py-1 rounded-lg self-center sm:self-auto">
                            ${product.price}
                          </div>

                          <button
                            disabled={addLoadingId === pid}
                            onClick={() => {
                              setAddLoadingId(pid);
                              addToCart('cart', pid, (val) => {
                                if (!val) setAddLoadingId(null);
                              });
                            }}
                            className="bg-slate-900 border border-transparent shadow shadow-slate-950/10 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 w-full sm:w-auto transition duration-200 disabled:opacity-50"
                          >
                            {addLoadingId === pid ? (
                              <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                              </>
                            ) : (
                              <>
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-4 text-slate-400">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800">Please Log In</h2>
          <p className="text-slate-400 text-sm max-w-sm mt-1 mb-6">
            Log in to view your personalized wishlist, save items, and enjoy seamless shopping.
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
