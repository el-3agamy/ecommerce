import { Button } from '@heroui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import addToCart from '../../services/cartServices';


export default function Product({ product }) {

  const [isLoading, setIsLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);



  return (
    <>

      <div className="relative  flex  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" >
        <Link className="relative mx-3 mt-3 flex  overflow-hidden rounded-xl" to={"/ProductDetails/" + product._id}>
          <img className="object-contain w-full" src={product.imageCover} alt={product.tittle} />
          {product.priceAfterDiscount && <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}% OFF</span>}
        </Link>
        <div className="mt-4 px-5 pb-5  flex flex-col  justify-between grow">
          <div>
            <Link to={"/ProductDetails/" + product._id}>
              <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">{product.title}</h5>
            </Link>
            <div className="mt-2 mb-5">
              {
                product.priceAfterDiscount ?
                  <>
                    <p>
                      <span className="text-3xl font-bold text-slate-900">${product.priceAfterDiscount}</span>
                      <span className="text-sm text-slate-900 line-through">${product.price}</span>
                    </p>
                  </>

                  :

                  <span className="text-3xl font-bold text-slate-900">${product.price}</span>


              }

              <div className="flex items-center">

                {
                  [1, 2, 3, 4, 5].map((star, index) => {
                    return Math.round(product.ratingsAverage) >= star ? <svg aria-hidden="true" key={index} className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                      :
                      <svg aria-hidden="true" key={index} className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                  })
                }





                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratingsAverage}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Button isLoading={isLoading} onPress={_ => addToCart("cart", product._id, setIsLoading)} className="flex items-center justify-center rounded-md w-full bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
            </Button>
            <Button isLoading={wishlistLoading} onPress={() => addToCart("wishlist", product._id, setWishlistLoading)} className="bg-gray-200  flex gap-2 items-center w-full  text-gray-800 px-6 py-2 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              Wishlist
            </Button>
          </div>

        </div>
      </div>

    </>
  )
}
