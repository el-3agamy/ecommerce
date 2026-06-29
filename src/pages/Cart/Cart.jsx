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

  useEffect(() => { getUserCart(); }, []);

  async function getUserCart() {
    setIsLoading(true);
    if(localStorage.getItem('token')){

      const { data } = await api.get('/cart');
      setCartId(data.cartId);
      setNumOfCartItem(data.numOfCartItems);
      setCartData(data.data);
    }
    setIsLoading(false);
  }

  async function deletSpecificProduct(productId, setLoadinRemove) {
    setLoadinRemove(true);
    const { data } = await api.delete('/cart/' + productId);
    setLoadinRemove(false);
    setCartData(data.data);
    setCartId(data.id);
    setNumOfCartItem(data.numOfCartItems);
  }

  async function updateProductCount(productId, count, setIncrementIsLoading, setDecrementIsLoading, currentCount) {
    if (count > currentCount) setIncrementIsLoading(true);
    if (count < currentCount) setDecrementIsLoading(true);
    const { data } = await api.put(`/cart/${productId}`, { count });
    setDecrementIsLoading(false);
    setIncrementIsLoading(false);
    setCartId(data.cartId);
    setNumOfCartItem(data.numOfCartItems);
    setCartData(data.data);
  }

  async function clearCart() {
    setClearCartLoading(true);
    await api.delete('/cart');
    setClearCartLoading(false);
    setCartData(null);
    setCartId(null);
    setNumOfCartItem(0);
  }

  if (isLoading) return <LoadingScreen />;

  if (localStorage.getItem("token") && numOfCartItem === 0) {
    return (
      <h1 className="text-red-500 text-3xl font-mono font-bold text-center h-[50vh] mt-14">
        No Products in Your Cart; Don't miss Sales.
      </h1>
    );
  }

  return (
    <>
      {
        localStorage.getItem('token') ?
         <div>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({numOfCartItem})</h1>
          <Button isLoading={clearCartLoading} color="danger" className="my-3" onPress={clearCart}>
            Clear All Items!
          </Button>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartData?.products.map((productCart, index) => (
                <ProductCart
                  key={index}
                  productCart={productCart}
                  deletSpecificProduct={deletSpecificProduct}
                  updateProductCount={updateProductCount}
                />
              ))}
            </div>
            {/* Sub total */}
            <div className="sticky top-20 mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${cartData?.totalCartPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">${cartData?.totalCartPrice + 4.99}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Link
                to={'/address/' + cartId}
                className="block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Check out
              </Link>
            </div>
          </div>
        </div>

          :
          <div>

            <h1>
              You Need To Login. 
              <br />
              <Link to="/login"><button className='bg-orange-400 p-3 text-center space-x-2 rounded-md'>Login</button></Link>
            </h1>

          </div>
      }
    </>
  );
}
