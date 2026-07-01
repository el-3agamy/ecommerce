import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import Product from '../../components/Product/Product';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function BrandProducts() {
    const { brandId, brandName } = useParams();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['brandProducts', brandId, page],
        queryFn: () =>
            api.get(`/products?brand=${brandId}&page=${page}&limit=12`),
        select: (res) => res.data,
        enabled: !!brandId,
    });

    const products = data?.data ?? [];
    const pagination = data?.metadata;

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">

            {/* ── Hero header ── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 text-white">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative container py-12 flex flex-col gap-4">
                    {/* breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-400">
                        <Link to="/brands" className="hover:text-green-400 transition-colors">Brands</Link>
                        <span>/</span>
                        <span className="text-white font-medium capitalize">{decodeURIComponent(brandName)}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Brand Collection
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold capitalize tracking-tight">
                                {decodeURIComponent(brandName)}
                            </h1>
                            <p className="text-slate-300 mt-2 text-sm">
                                Browse all products from this brand
                            </p>
                        </div>

                        {products.length > 0 && (
                            <div className="flex flex-col items-start md:items-end shrink-0">
                                <span className="text-3xl font-extrabold text-green-400">{products.length}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Products found</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="container py-10">

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl">📦</div>
                        <p className="text-slate-600 text-xl font-semibold">No products found</p>
                        <p className="text-slate-400 text-sm">This brand doesn't have any listed products yet.</p>
                        <Link
                            to="/brands"
                            className="mt-2 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
                        >
                            ← Back to Brands
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination?.numberOfPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-10">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="px-5 py-2 bg-slate-200 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-slate-300 transition-colors"
                                >
                                    ← Prev
                                </button>
                                <span className="px-4 py-2 text-sm font-semibold text-slate-700">
                                    Page {page} / {pagination.numberOfPages}
                                </span>
                                <button
                                    disabled={page === pagination.numberOfPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-5 py-2 bg-slate-200 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-slate-300 transition-colors"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
