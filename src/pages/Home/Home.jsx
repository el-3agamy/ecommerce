import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import useFetchData from '../../hooks/useFetchData';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Product from '../../components/Product/Product';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ── Hero Section Slides Data ──
const HERO_SLIDES = [
  {
    id: 1,
    title: 'Fresh & Organic Groceries',
    subtitle: 'Daily Harvest',
    description: 'Get up to 30% off on fresh organic fruits, vegetables, and pantry essentials delivered directly to your doorstep.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
    actionText: 'Shop Groceries',
    link: '/categories/6439d5b1c6428a3b265268bb/Electronics', // Fallback or search page
    gradient: 'from-emerald-950 via-teal-900 to-slate-900',
    tag: 'Best Deals'
  },
  {
    id: 2,
    title: 'Modern Tech & Sound',
    subtitle: 'Uncompromising Sound',
    description: 'Immerse yourself in crystal clear audio. Explore premium wireless noise-canceling headphones and lifestyle gadgets.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    actionText: 'Explore Tech',
    link: '/categories/6439d5aba990422d34005178/Electronics',
    gradient: 'from-blue-950 via-slate-900 to-indigo-950',
    tag: 'New Arrivals'
  },
  {
    id: 3,
    title: 'Elevate Your Everyday Style',
    subtitle: 'Premium Apparel',
    description: 'Redefine your clothing selection. Discover stylish outerwear, designer accessories, and seasonal collections with exclusive discounts.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
    actionText: 'Discover Fashion',
    link: '/categories/6439d2e1c6428a3b265268b2/Women\'s%20Fashion',
    gradient: 'from-rose-950 via-purple-950 to-slate-900',
    tag: 'Trending Now'
  }
];

// ── Value Prepositions Data ──
const VAL_PROPS = [
  {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.208-3.32a3.375 3.375 0 0 0-2.87-3.149l-5.64-1.652a1.125 1.125 0 0 0-1.307.773L10.5 7.5H4.5M18 10.5h-5.25m5.25 0a8.217 8.217 0 0 1-3 3.65m3-3.65V7.5M10.5 7.5V3m0 0a1.5 1.5 0 0 0-3 0m3 0h3.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H10.5m-3 0h-3.375A1.125 1.125 0 0 1 3 5.625v-1.5c0-.621.504-1.125 1.125-1.125H7.5" fill="none" />
      </svg>
    ),
    title: 'Free Shipping',
    desc: 'On all orders above $100'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'Fully encrypted checkout'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Easy Returns',
    desc: '30-day money-back guarantee'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Dedicated support team'
  }
];

export default function Home() {
  // Fetch site-wide data
  const { data: categories, isLoading: loadingCats } = useFetchData('categories', 1, 100);
  const { data: brands, isLoading: loadingBrands } = useFetchData('brands', 1, 100);
  const { data: products, isLoading: loadingProducts } = useFetchData('products', 1, 40);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep the flash sale alive / interactive
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter tab management for Trending section
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (activeTab === 'All') return products.slice(0, 8);

    // Attempt categories lookup
    return products
      .filter((p) => {
        const catName = p.category?.name?.toLowerCase() || '';
        if (activeTab === 'Fashion') {
          return catName.includes('fashion') || catName.includes('apparel') || catName.includes('clothing');
        }
        if (activeTab === 'Tech') {
          return catName.includes('electronics') || catName.includes('mobiles') || catName.includes('laptops');
        }
        return catName.includes(activeTab.toLowerCase());
      })
      .slice(0, 8);
  }, [products, activeTab]);

  // Flash Sale products (any product with discount)
  const flashSaleProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.priceAfterDiscount !== undefined && p.priceAfterDiscount !== null).slice(0, 10);
  }, [products]);

  // Carousel Slider Config (Hero Section)
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: 'slick-dots custom-dots',
  };

  // Carousel Config (Categories Quick Links)
  const categorySliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  // Carousel Config (Brands)
  const brandSliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  // State loader check
  if (loadingCats || loadingBrands || loadingProducts) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ── SECTION 1: HERO CAROUSEL ── */}
      <section className="relative overflow-hidden bg-slate-900">
        <Slider {...heroSliderSettings}>
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="relative outline-none">
              {/* Slide Background Gradient and Image combined */}
              <div className={`relative min-h-[500px] md:min-h-[600px] flex items-center bg-gradient-to-r ${slide.gradient} overflow-hidden`}>

                {/* Background image overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-30 md:opacity-75 h-full pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10 hidden md:block" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Animated content wrapper */}
                <div className="container relative z-20 px-4 md:px-12 flex flex-col items-start max-w-xl md:max-w-2xl text-white">
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    {slide.tag}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-4"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-300 text-sm md:text-lg mb-8 leading-relaxed font-light"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-green-500/20 hover:scale-105 transition-all duration-300"
                    >
                      {slide.actionText}
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── SECTION 2: VALUE PROPOSITIONS BAR ── */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VAL_PROPS.map((prop, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50/80 transition-colors duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-xl">
                  {prop.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{prop.title}</h4>
                  <p className="text-slate-500 text-xs mt-0.5">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: QUICK LINK CATEGORIES ── */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Departments</span>
              <h2 className="text-3xl font-extrabold text-slate-800 mt-1">Shop by Category</h2>
            </div>
            <Link
              to="/categories"
              className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 group mt-2 md:mt-0"
            >
              See all categories
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="categories-slider-wrapper">
            <Slider {...categorySliderSettings}>
              {categories?.map((cat) => (
                <div key={cat._id} className="px-3 outline-none">
                  <Link
                    to={`/categories/${cat._id}/${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-xl hover:border-green-200 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-slate-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/100x100?text=' + cat.name;
                        }}
                      />
                    </div>
                    <span className="font-bold text-slate-700 text-sm group-hover:text-green-600 transition-colors truncate w-full">
                      {cat.name}
                    </span>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FLASH SALE COUNTDOWN & PRODUCTS ── */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          {/* Decorative radial gradients */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500 opacity-20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 opacity-10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            {/* Header with Timer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  🔥 Limited Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold">Flash Deals of the Day</h2>
              </div>

              {/* Live Countdown */}
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm mr-2 hidden sm:inline-block">Ending in</span>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 w-14 py-2 rounded-xl">
                    <span className="text-lg md:text-xl font-bold font-mono text-green-400">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Hrs</span>
                  </div>
                  <span className="text-xl font-bold animate-pulse text-slate-500">:</span>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 w-14 py-2 rounded-xl">
                    <span className="text-lg md:text-xl font-bold font-mono text-green-400">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Min</span>
                  </div>
                  <span className="text-xl font-bold animate-pulse text-slate-500">:</span>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 w-14 py-2 rounded-xl">
                    <span className="text-lg md:text-xl font-bold font-mono text-red-400">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Sec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flash Sale Product list Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-slate-800">
              {flashSaleProducts.slice(0, 4).map((p) => (
                <Product key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5: TRENDING/FEATURED TABBED PRODUCTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Our Selection</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-1">Trending Products</h2>
            <p className="text-slate-500 text-sm max-w-lg mt-3">
              Explore our trending arrivals, top-reviewed favorites, and highly discount items, curated weekly.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 bg-slate-100 p-1.5 rounded-2xl max-w-lg w-full">
              {['All', 'Electronics', 'Fashion', 'Mobiles'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[70px] px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                      ? 'bg-white text-green-600 shadow-md shadow-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-tab-grid mt-4">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg className="w-12 h-12 mb-3 opacity-45" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <p className="font-semibold text-sm">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((prod) => (
                    <motion.div
                      key={prod._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Product product={prod} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-800 hover:bg-slate-800 hover:text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300"
            >
              Explore Full Shop
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PROMOTIONAL CREATIVE DOUBLE BANNER ── */}
      <section className="bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Banner 1: Organic Healthy Food */}
            <div className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-center bg-gradient-to-r from-emerald-900 to-green-950 text-white group shadow-md">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"
                  alt="Organic Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 px-8 py-6 max-w-sm">
                <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full">
                  100% Organics
                </span>
                <h3 className="text-2xl font-extrabold mt-3 leading-snug">Healthy Life, Fresh Harvests</h3>
                <p className="text-slate-300 text-xs mt-2 font-light">Organic vegetables & farm products packed with health benefits.</p>
                <div className="mt-5">
                  <span className="text-xs group-hover:underline font-bold text-green-400 cursor-pointer inline-flex items-center gap-1">
                    Shop collection <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Banner 2: Premium Audio/Gifts */}
            <div className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-center bg-gradient-to-r from-indigo-950 to-blue-900 text-white group shadow-md">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                  alt="Tech Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 px-8 py-6 max-w-sm">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full">
                  New Gadgets
                </span>
                <h3 className="text-2xl font-extrabold mt-3 leading-snug">Precision Hi-Fi Audio</h3>
                <p className="text-slate-300 text-xs mt-2 font-light">Experience the pure noise-canceling stereo power of elite acoustics.</p>
                <div className="mt-5">
                  <span className="text-xs group-hover:underline font-bold text-blue-400 cursor-pointer inline-flex items-center gap-1">
                    Shop electronics <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: BRANDS CAROUSEL ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Our Partners</span>
              <h2 className="text-3xl font-extrabold text-slate-800 mt-1">Shop by Popular Brands</h2>
            </div>
            <Link
              to="/brands"
              className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 group mt-2 md:mt-0"
            >
              Explore all brands
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="brands-slider-wrapper">
            <Slider {...brandSliderSettings}>
              {brands?.map((brand) => (
                <div key={brand._id} className="px-4 outline-none">
                  <Link
                    to={`/brands/${brand._id}/${encodeURIComponent(brand.name)}`}
                    className="flex items-center justify-center bg-slate-50 hover:bg-white border border-slate-100 hover:border-green-200 hover:shadow-lg rounded-2xl p-6 min-h-[110px] transition-all duration-300 group"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-h-12 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.target.placeholder = brand.name;
                      }}
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

    </div>
  );
}
