import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import addToCart from '../../services/cartServices';
import api from '../../utils/api';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
export default function WishList() {
  // const { data: wishlistData, isLoading, refetch } = useFetchData('wishlist');
  const [removingId, setRemovingId] = useState(null);
  const [addLoadingId, setAddLoadingId] = useState(null);

/////////////////////////

 const [isLoading, setIsLoading] = useState(true);
  // const [cartId, setCartId] = useState(null);
  const [numOfWishlist, setNumOfWishlist] = useState(0);
  const [wishlistData, setWishlistData] = useState(null);
///////////////////////////

useEffect(
 ()=> {getUserCart()}
 , [])
  async function getUserCart() {
    setIsLoading(true);
    if(localStorage.getItem('token')){

      const { data } = await api.get('/wishlist');
      // setCartId(data.cartId);
      setNumOfWishlist(data.count);
      setWishlistData(data.data);
    }
    setIsLoading(false);
  }

  ////////////////////////////

  async function removeSpecificProduct(productId) {
    setRemovingId(productId);
    await api.delete(`/wishlist/${productId}`);
    setRemovingId(null);
    refetch();
  }

  if (isLoading) return <LoadingScreen />;

  const count = wishlistData?.length ?? 0;

  return (
   <>
    {
      localStorage.getItem("token")  ?
          <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="title font-serif hover:text-green-400 duration-700 font-bold text-4xl leading-10 mb-8 text-center text-slate-700">
          My WishList{' '}
          <span className="text-green-400 hover:text-slate-700">({count})</span>
        </h2>

        {wishlistData?.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl bg-gray-100 border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
          >
            <div className="col-span-12 lg:col-span-2 img box">
              <img
                src={product.imageCover}
                alt={product.title}
                className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
              />
            </div>

            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <div className="flex-col">
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-slate-700">{product.title}</h5>
                  <h5 className="font-manrope leading-9 text-gray-700">
                    Brand: <span className="text-slate-800 font-semibold font-mono">{product.brand.name}</span>
                  </h5>
                </div>

                <button
                  onClick={() => removeSpecificProduct(product.id)}
                  disabled={removingId === product.id}
                  className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                >
                  <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx={17} cy={17} r={17} />
                    <path
                      className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                      d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <p className="font-normal text-base leading-7 text-gray-500 mb-6">{product.description}</p>

              <div className="flex items-center justify-between">
                <h6 className="text-green-400 font-manrope font-bold text-2xl leading-9 text-center">
                  Price: {product.price} $
                </h6>
                <button
                  disabled={addLoadingId === product.id}
                  onClick={() => {
                    setAddLoadingId(product.id);
                    addToCart('cart', product.id, () => { });
                    setTimeout(() => setAddLoadingId(null), 2000);
                  }}
                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
      :
      <div>
        <h1>
            you need to login. 
            <br />
            <Link to="/login"><button className='p-3 bg-red-300 text-center'>Login</button></Link>
        </h1>
      </div>


    }
   </>
  );
}
