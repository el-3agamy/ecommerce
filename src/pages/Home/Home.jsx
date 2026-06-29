import React from 'react';
import Product from '../../components/Product/Product';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import useFetchData from '../../hooks/useFetchData';

export default function Home() {
  const { data: products, isLoading } = useFetchData('products');

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products?.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
}

